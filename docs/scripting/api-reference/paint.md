---
title: 画笔 (Paint)
---

描述形状如何绘制，包括填充或描边样式、厚度、颜色、渐变和混合行为。

## 字段 (Fields)

### `style`

[绘制样式 (PaintStyle)](/scripting/api-reference/paint-style) 类型的绘制样式。

### `join`

描边在拐角处的连接行为。参见 [描边连接样式 (StrokeJoin)](/scripting/api-reference/stroke-join)。

### `cap`

描边用于线端的线帽样式。参见 [描边线帽样式 (StrokeCap)](/scripting/api-reference/stroke-cap)。

### `thickness`

描边路径的厚度。

### `blendMode`

合成时使用的混合模式。参见 [混合模式 (BlendMode)](/scripting/api-reference/blend-mode)。

### `feather`

羽化程度。

### `gradient`

应用于填充的 [渐变 (Gradient)](/scripting/api-reference/gradient)（如果存在）。

### `color`

颜色。参见 [颜色 (Color)](/scripting/api-reference/color)。

## 构造函数 (Constructors)

### `new`

创建一个具有默认设置的新 [画笔 (Paint)](/scripting/api-reference/paint) 对象。

示例：
```lua
local paint = Paint.new()
paint.style = 'fill'
paint.color = Color.rgb(255, 200, 80)
```

### `with`

根据提供的 [绘制定义 (PaintDefinition)](/scripting/api-reference/paint-definition) 初始化并创建一个新 Paint。

示例：
```lua
local strokePaint = Paint.with({
  style = 'stroke',
  thickness = 3,
  color = Color.hex('#FF0066'),
  join = 'round',
  cap = 'round',
})
```

## 方法 (Methods)

### `copy`

返回一个从此 Paint 拷贝的新 Paint，可以选择使用提供的 [绘制定义 (PaintDefinition)](/scripting/api-reference/paint-definition) 中的值覆盖部分属性。

示例：
```lua
local base = Paint.with({
  style = 'fill',
  color = Color.rgb(255, 0, 0),
})

local outline = base:copy({
  style = 'stroke',
  thickness = 4,
})
```

- `@param values` 可选的覆盖值。
- `@return` 具有合并值的新 [画笔 (Paint)](/scripting/api-reference/paint) 实例。
