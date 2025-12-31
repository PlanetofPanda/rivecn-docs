---
title: 渐变 (Gradient)
---

代表用于填充或描边形状的渐变。渐变由一组颜色停靠点 ([渐变停靠点 (GradientStop)](/scripting/api-reference/gradient-stop)) 以及线性或径向配置定义。

## 构造函数 (Constructors)

### `linear`

创建一个线性渐变，沿从 `from` 到 `to` 的直线在该组指定的颜色停靠点之间进行过渡。

```lua
local g = Gradient.linear(Vector.xy(0, 0), Vector.xy(100, 0), {
  { position = 0, color = Color.rgb(255, 0, 0) },
  { position = 1, color = Color.rgb(0, 0, 255) },
})
```

### `radial`

创建一个径向渐变，以 `from` 为中心向外延伸至给定的半径，并使用指定的颜色停靠点。

```lua
local g = Gradient.radial(Vector.xy(50, 50), 40, {
  { position = 0, color = Color.white },
  { position = 1, color = Color.black },
})
```
