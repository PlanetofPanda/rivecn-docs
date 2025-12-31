---
title: "指针事件 (Pointer Events)"
description: "了解如何在 Rive 脚本中处理交互事件。"
---

您可以在任何实现了 `pointerDown`、`pointerMove`、`pointerUp` 或 `pointerExit` 的脚本中监听指针事件。这些函数可以在 [节点脚本 (Node Scripts)](/scripting/protocols/node-scripts) 和 [布局脚本 (Layout Scripts)](/scripting/protocols/layout-scripts) 中定义。

```lua
-- 指针事件回调具有 `self` 和 `PointerEvent` 类型的参数。
function handlePointerDown(self: MyNode, event: PointerEvent)
  -- 相对于脚本的本地坐标系中的指针位置。
  print(event.position.x, event.position.y)

  -- 指针标识符 (在多点触控中很有用)
  print(event.id)

  -- 将事件标记为已处理，并阻止其继续传播。
  event:hit()
  -- event:hit(true) -- 已处理，但允许穿透半透明元素
end

-- 通过在脚本返回的表中将函数赋值给 pointerDown、pointerUp、pointerMove
-- 或 pointerExit 来注册您的指针处理程序。
return function(): Node<MyScript>
  return {
    init = init,
    draw = draw,
    advance = advance,
    pointerDown = myPointerDownFunction,
  }
end
```

## 多点触控 (Multi-touch)

通过使用 `event.id`，您可以追踪多个活动的指针。

```lua
type ActiveId = {
  position: Vec2D,
}

export type TrackPointers = {
  -- 记录每个指针的位置
  activePointers: { ActiveId },
}

function onPointerDown(self: TrackPointers, event: PointerEvent)
  -- 每次指针按下时在表中保存一项
  self.activePointers[event.id] = {
    position = event.position,
  }

  print('新的指针按下: ' .. event.id)
  print('位置: ' .. event.position.x .. event.position.y)

  event:hit()
end

function onPointerMove(self: TrackPointers, event: PointerEvent)
  if self.activePointers[event.id] then
    self.activePointers[event.id].position = event.position

    -- 打印当前所有活动的指针 ID
    print('活动指针 ID:')
    for id, pointer in self.activePointers do
      print('  id: ', id)
      print('    x:', pointer.position.x)
      print('    y:', pointer.position.y)
    end
  end

  event:hit()
end

function onPointerUp(self: TrackPointers, event: PointerEvent)
  self.activePointers[event.id] = nil

  print('指针抬起: ' .. event.id)
  print('位置: ' .. event.position.x .. event.position.y)

  event:hit()
end

return function(): Node<TrackPointers>
  return {
    init = init,
    advance = advance,
    draw = draw,
    pointerDown = onPointerDown,
    pointerMove = onPointerMove,
    pointerUp = onPointerUp,
    activePointers = {},
  }
end
```

## 嵌套指针事件 (Nested Pointer Events)

Rive 仅在主画板上监听指针事件。如果您需要在 [实例化的画板](/scripting/protocols/node-scripts#instanting-components) 中监听指针事件，必须手动进行转发。

```lua
-- 在主脚本中处理指针事件
function handlePointerDown(self: MyScript, event: PointerEvent)
  -- self.enemy.pointerDown(self.enemy, event)
  for _, enemy in self.enemies do
    -- 将传入的指针位置转换为敌人的本地空间。
    -- 本示例假设 enemy.position 处于相同的坐标系中。
    local localEvent = PointerEvent.new(
      event.id,
      Vec2D.xy(
        -- 根据画板位置规范化指针位置
        event.position.x - enemy.position.x,
        event.position.y - enemy.position.y
      )
    )

    -- 将事件转发到实例化的画板中
    self.enemy:pointerDown(localEvent)
  end
end
```