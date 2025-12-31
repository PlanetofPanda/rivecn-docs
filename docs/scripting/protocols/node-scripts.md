---
title: "节点脚本 (Node Scripts)"
description: ""
---

节点脚本可用于渲染形状、图像、文本、艺术板等。

## 创建节点脚本 (Creating a Node Script)

1. [创建一个新脚本](/scripting/creating-scripts) 并选择 **Node** 作为类型。
2. [将其添加到场景中](/scripting/creating-scripts#adding-scripts-to-your-scene)。

## 节点脚本的结构 (Anatomy of a Node Script)
```lua
-- 定义脚本的数据和输入。
type MyNode = {}

-- 在脚本初始化时调用一次。
function init(self: MyNode): boolean
  return true
end

-- 每一帧调用，用于推进模拟进度。
-- 'seconds' 是自上一帧以来经过的时间。
function advance(self: MyNode, seconds: number): boolean
  return false
end

-- 当任何输入值发生变化时调用。
function update(self: MyNode) end

-- 每一帧（在 advance 之后）调用，用于渲染内容。
function draw(self: MyNode, renderer: Renderer) end

-- 返回一个 Rive 用来构建节点实例的工厂函数。
return function(): Node<MyNode>
  return {
    init = init,
    advance = advance,
    update = update,
    draw = draw,
  }
end
```

## 节点 (Node)

节点脚本允许您绘制形状并在场景中渲染它们。

```lua
function rectangle(self: Rectangle)
  -- 使用当前的宽度和高度更新路径
  self.path:reset()

  local halfWidth = self.width / 2
  local halfHeight = self.height / 2

  -- 绘制以原点为中心的矩形
  self.path:moveTo(Vec2D.xy(-halfWidth, -halfHeight))
  self.path:lineTo(Vec2D.xy(halfWidth, -halfHeight))
  self.path:lineTo(Vec2D.xy(halfWidth, halfHeight))
  self.path:lineTo(Vec2D.xy(-halfWidth, halfHeight))
  self.path:close()

  -- 更新画笔颜色
  self.paint.color = self.color
end

function draw(self: Rectangle, renderer: Renderer)
  renderer:drawPath(self.path, self.paint)
end
```

有关绘图工具组件的完整列表，请参阅 [API 参考](/scripting/api-reference/path)。

## 常见模式 (Common Patterns)

### 实例化组件 (Instantiating Components)

为了能够在运行时实例化组件，您需要对 [数据绑定 (Data Binding)](/editor/data-binding/overview)、[组件 (Components)](/editor/fundamentals/components) 和 [脚本输入 (Script Inputs)](/scripting/script-inputs) 有一个基本的了解。

请看以下示例，它展示了如何设置您的组件、视图模型和脚本：

```lua
type Enemy = {
  artboard: Artboard<Data.Enemy>,
  position: Vec2D,
}

export type MyGame = {
  -- 这是我们将动态添加到场景中的组件
  -- 参见: https://help.rive.app/scripting/script-inputs
  enemy: Input<Artboard<Data.Enemy>>,
  enemies: { Enemy },
}

function createEnemy(self: MyGame)
  -- 创建艺术板的实例
  local enemy = self.enemy:instance()

  -- 在 self.enemies 中跟踪所有敌人
  local entry: Enemy = {
    artboard = enemy,
    position = Vec2D.xy(0, 0),
  }
  table.insert(self.enemies, entry)
end

function init(self: MyGame)
  createEnemy(self)

  return true
end

function advance(self: MyGame, seconds: number)
  -- 推进每个敌人的艺术板进度
  for _, enemy in self.enemies do
    enemy.artboard:advance(seconds)
  end

  return true
end

function draw(self: MyGame, renderer: Renderer)
  -- 绘制每个敌人
  for _, enemy in self.enemies do
    renderer:save()
    enemy.artboard:draw(renderer)
    renderer:restore()
  end
end

return function(): Node<MyGame>
  return {
    init = init,
    advance = advance,
    draw = draw,
    enemy = late(),
    enemies = {},
  }
end
```

### 固定步长更新 (Fixed-Step Advance)

帧率在不同设备和场景之间可能会有所变化。如果您的脚本直接根据帧时间移动或制作对象动画，速度较快的设备每秒移动的距离会更远，而速度较慢的设备则会显得迟钝。

为了保持移动和计时的一致性，您可以按固定的时间步长推进模拟，而不是依赖于波动的帧率。这种技术被称为“固定步长更新” (fixed-step update) 或“固定时间步长” (fixed timestep)。

```lua
--- 固定步长更新
--- 通过按固定的时间步长推进模拟，
--- 保持在不同帧率下移动的一致性。
export type CarGame = {
  speed: Input<number>,
  accumulator: number,
  fixedStep: Input<number>,
  direction: number,
  currentX: number,
  currentY: number,
}

-- 防止脚本在长时间暂停或掉帧后
-- 运行过多的补帧步长。
local MAX_STEPS = 5

function advance(self: CarGame, seconds: number): boolean
  -- 将自上一帧以来经过的时间添加到累加器中。
  self.accumulator += seconds

  local dt = self.fixedStep
  local steps = 0

  -- 以细小的固定步长运行模拟。
  -- 如果渲染一帧的时间超过了一个步长，则该帧可能会运行多个步长。
  while self.accumulator >= dt and steps < MAX_STEPS do
    -- 以 速度 * 时间 的方式向前移动。
    -- 使用固定的 dt 可以保持移动的稳定性，即使帧率发生了变化。
    self.currentX += self.speed * math.cos(self.direction) * dt
    self.currentY += self.speed * math.sin(self.direction) * dt

    -- 从累加器中减去一个固定步长，
    -- 并重复此过程直到追上实时进度。
    self.accumulator -= dt
    steps += 1
  end

  return true
end

-- 创建一个具有默认值的 CarGame 脚本新实例。
-- 该模拟以每秒 60 个固定步长运行。
return function(): Node<CarGame>
  return {
    speed = 100,
    accumulator = 0,
    direction = 0,
    fixedStep = 1 / 60,
    currentX = 0,
    currentY = 0,
  }
end
```
