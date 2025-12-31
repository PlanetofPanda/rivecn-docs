---
title: 路径 (Path)
---

## 构造函数 (Constructors)

### `new`

创建一个新的路径对象。

## 方法 (Methods)

### `moveTo`

将当前点移动到指定位置，开始一个新的轮廓。
```lua
path:moveTo(Vector.xy(0, 0))
```

### `lineTo`

添加从当前点到指定点的直线段。
```lua
path:lineTo(Vector.xy(10, 0))
```

### `quadTo`

添加从当前点到指定点的二次贝塞尔曲线，使用控制点来定义曲线形状。
```lua
path:quadTo(
  Vector.xy(-50, -50), -- 控制点
  Vector.xy(0, 0)      -- 结束点
)
```

### `cubicTo`

添加从当前点到指定点的三次贝塞尔曲线，使用 `controlOut` 作为起始切线，`controlIn` 作为结束切线。
```lua
path:cubicTo(
  Vector.xy(25, -40),  -- 控制点 1 (out)
  Vector.xy(75, 40),   -- 控制点 2 (in)
  Vector.xy(100, 0)    -- 结束点
)
```

### `close`

通过添加一条从当前点返回轮廓起点（最后一次 `moveTo` 的位置）的线段来闭合当前轮廓。
```lua
-- 绘制一个矩形
path:moveTo(Vector.xy(-10, -10))
path:lineTo(Vector.xy(10, -10))
path:lineTo(Vector.xy(10, 10))
path:lineTo(Vector.xy(-10, 10))
-- 闭合路径
path:close()
```

### `__len`

每一项都是一个描述路径中一个分段或动作的 [路径命令 (PathCommand)](/scripting/api-reference/path-command)。
返回路径中的命令数量。

### `reset`

路径在进行渲染处理时不应被重置或进行任何更改。如果您已经调用过 `Renderer.drawPath` 使用了该路径，请仅在后续帧中调用重置。
```lua
path:reset()
```

### `add`

当指定变换时，使用给定的变换将一条路径添加到另一条路径中。

### `contours`

返回路径中第一个轮廓的 [轮廓测量 (ContourMeasure)](/scripting/api-reference/contour-measure)。轮廓是 `moveTo` 操作之间的一系列路径段。使用返回的轮廓测量对象上的 `next` 属性来遍历后续轮廓。如果路径没有轮廓，则返回 nil。

### `measure`

返回一个 [路径测量 (PathMeasure)](/scripting/api-reference/path-measure)，用于测量跨越所有轮廓的整个路径。它提供了总长度，并允许对路径整体进行操作。
```lua
local pathLength = path:measure()
```
