---
title: "Node 脚本 (Node Scripts) - Rive 脚本"
description: "协议 (Protocols) Node 脚本可用于渲染形状、图像、文本、画板等。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 脚本, Node 脚本
---

协议 (Protocols)

# Node 脚本 (Node Scripts)

Node 脚本可用于渲染形状、图像、文本、画板等。

## [​](#creating-a-node-script) 创建 Node 脚本

1.  [创建一个新脚本](/scripting/creating-scripts) 并选择 **Node** 作为类型。
2.  [将其添加到场景中](/scripting/creating-scripts#adding-scripts-to-your-scene)。

## [​](#anatomy-of-a-node-script) Node 脚本剖析

```lua
-- Define the script's data and inputs.
-- 定义脚本的数据和输入。
type MyNode = {}

-- Called once when the script initializes.
-- 脚本初始化时调用一次。
function init(self: MyNode): boolean
  return true
end

-- Called every frame to advance the simulation.
-- 'seconds' is the elapsed time since the previous frame.
-- 每一帧调用以推进模拟。
-- 'seconds' 是自上一帧以来经过的时间。
function advance(self: MyNode, seconds: number): boolean
  return false
end

-- Called when any input value changes.
-- 当任何输入值改变时调用。
function update(self: MyNode) end

-- Called every frame (after advance) to render the content.
-- 每一帧（在 advance 之后）调用以渲染内容。
function draw(self: MyNode, renderer: Renderer) end

-- Return a factory function that Rive uses to build the Node instance.
-- 返回 Rive 用来构建 Node 实例的工厂函数。
return function(): Node<MyNode>
  return {
    init = init,
    advance = advance,
    update = update,
    draw = draw,
  }
end
```

## [​](#node) 节点 (Node)

Node 脚本允许你绘制形状并在你的场景中渲染它们。

```lua
function rectangle(self: Rectangle)
  -- Update the path with current width and height
  -- 使用当前的宽度和高度更新路径
  self.path:reset()

  local halfWidth = self.width / 2
  local halfHeight = self.height / 2

  -- Draw rectangle centered at origin
  -- 绘制以原点为中心的矩形
  self.path:moveTo(Vec2D.xy(-halfWidth, -halfHeight))
  self.path:lineTo(Vec2D.xy(halfWidth, -halfHeight))
  self.path:lineTo(Vec2D.xy(halfWidth, halfHeight))
  self.path:lineTo(Vec2D.xy(-halfWidth, halfHeight))
  self.path:close()

  -- Update paint color
  -- 更新颜料颜色
  self.paint.color = self.color
end

function draw(self: Rectangle, renderer: Renderer)
  renderer:drawPath(self.path, self.paint)
end
```

查看 [API 参考](/scripting/api-reference/path) 获取完整的绘图工具列表。

## [​](#common-patterns) 常见模式 (Common Patterns)

### [​](#instantiating-components) 实例化组件 (Instantiating Components)

为了能够在运行时实例化组件，你需要对 [数据绑定](/editor/data-binding/overview.md)、[组件](/editor/fundamentals/components.md) 和 [脚本输入](/scripting/script-inputs) 有基本的了解。
请看下面的例子，展示了如何设置你的组件、视图模型和脚本：

```lua
type Enemy = {
  artboard: Artboard<Data.Enemy>,
  position: Vec2D,
}

export type MyGame = {
  -- This is the component that we will dynamically add to our scene
  -- 这是我们将动态添加到场景中的组件
  -- See: http://rive.org.cn/docs/#/scripting/script-inputs
  enemy: Input<Artboard<Data.Enemy>>,
  enemies: { Enemy },
}

function createEnemy(self: MyGame)
  -- Create an instance of the artboard
  -- 创建画板的实例
  local enemy = self.enemy:instance()

  -- Keep track of all enemies in self.enemies
  -- 在 self.enemies 中追踪所有敌人
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
  -- Advance the artboard of each enemy
  -- 推进每个敌人画板的模拟
  for _, enemy in self.enemies do
    enemy.artboard:advance(seconds)
  end

  return true
end

function draw(self: MyGame, renderer: Renderer)
  -- draw each enemy
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

### [​](#fixed-step-advance) 固定步长推进 (Fixed-Step Advance)

不同设备和场景的帧率可能会有所不同。如果你的脚本直接根据帧时间移动或动画化对象，较快的设备每秒会移动得更远，而较慢的设备则会显得滞后。
为了保持运动和计时的一致性，你可以以固定的时间步长推进模拟，而不是依赖可变的帧率。这种技术称为固定步长更新 (fixed-step update) 或固定时间步长 (fixed timestep)。

```lua
--- Fixed Timestep Advance
--- Keeps movement consistent across different frame rates
--- by advancing the simulation in fixed time steps.
--- 固定时间步长推进
--- 通过以固定时间步长推进模拟，保持不同帧率下的运动一致性。
export type CarGame = {
  speed: Input<number>,
  accumulator: number,
  fixedStep: Input<number>,
  direction: number,
  currentX: number,
  currentY: number,
}

-- Prevent the script from running too many catch-up steps
-- after a long pause or frame drop.
-- 防止脚本在长时间暂停或丢帧后运行过多的追赶步骤。
local MAX_STEPS = 5

function advance(self: CarGame, seconds: number): boolean
  -- Add the time since the last frame to the accumulator.
  -- 将自上一帧以来的时间添加到累加器。
  self.accumulator += seconds

  local dt = self.fixedStep
  local steps = 0

  -- Run the simulation in small, fixed steps.
  -- If the frame took longer than one step, multiple steps may run this frame.
  -- 以小的、固定的步骤运行模拟。
  -- 如果帧耗时超过一个步长，该帧可能会运行多个步骤。
  while self.accumulator >= dt and steps < MAX_STEPS do
    -- Move forward by speed * time.
    -- Using a fixed dt keeps movement stable even if the frame rate changes.
    -- 以 速度 * 时间 向前移动。
    -- 使用固定的 dt 可以保持运动稳定，即使帧率发生变化。
    self.currentX += self.speed * math.cos(self.direction) * dt
    self.currentY += self.speed * math.sin(self.direction) * dt

    -- Subtract one fixed step from the accumulator
    -- and repeat until we've caught up to real time.
    -- 从累加器中减去一个固定步长
    -- 并重复直到我们赶上实时时间。
    self.accumulator -= dt
    steps += 1
  end

  return true
end

-- Create a new instance of the CarGame script with default values.
-- The simulation runs 60 fixed steps per second.
-- 使用默认值创建 CarGame 脚本的新实例。
-- 模拟每秒运行 60 个固定步骤。
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