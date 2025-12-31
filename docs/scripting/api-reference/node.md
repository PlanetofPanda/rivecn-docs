---
title: 节点 (Node)
---

一种脚本化的节点，可以附加到任何节点 (Node) 上。该节点在宿主节点的本地变换空间中进行渲染。

参见 [节点脚本 (Node Scripts)](/scripting/protocols/node-scripts)。

## 方法 (Methods)

### `init`

在创建节点时调用一次。如果初始化成功，返回 true。

### `advance`

可选的每帧更新函数。如果节点应继续接收 advance 调用，则返回 true。

### `update`

当输入值 (input value) 发生变化时调用。

### `draw`

调用以使用提供的渲染器绘制节点。

### `pointerDown`

指针按下 (pointer down) 事件处理程序。

```lua
function handlePointerDown(self: MyGame, event: PointerEvent)
  print('指针位置: ', event.position.x, event.position.y)

  event:hit()
end

return function(): Node<MyGame>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerDown = handlePointerDown,
    }
end
```

### `pointerMove`

指针移动 (pointer move) 事件处理程序。

```lua
function handlePointerMove(self: MyGame, event: PointerEvent)
  print('指针位置: ', event.position.x, event.position.y)

  event:hit()
end

return function(): Node<MyGame>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerMove = handlePointerMove,
    }
end
```

### `pointerUp`

指针抬起 (pointer up) 事件处理程序。

```lua
function handlePointerUp(self: MyGame, event: PointerEvent)
  print('指针位置: ', event.position.x, event.position.y)

  event:hit()
end

return function(): Node<MyGame>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerUp = handlePointerUp,
    }
end
```

### `pointerExit`

指针退出 (pointer exit) 事件处理程序。

```lua
function handlePointerExit(self: MyGame, event: PointerEvent)
  print('指针位置: ', event.position.x, event.position.y)

  event:hit()
end

return function(): Node<MyGame>
    return {
        init = init,
        advance = advance,
        draw = draw,
        pointerExit = handlePointerExit,
    }
end
```
