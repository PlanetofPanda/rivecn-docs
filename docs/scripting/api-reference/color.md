---
title: 颜色 (Color)
---

## 构造函数 (Constructors)

### `lerp`

使用参数 t 在两种颜色之间进行线性插值。当 t = 0 时返回 `from` 颜色，当 t = 1 时返回 `to` 颜色。

```lua
self.color = Color.lerp(color1, color2, t)
```

### `rgb`

返回一个由红、绿、蓝通道构建的颜色。Alpha 默认值为 255（完全不透明）。通道值的范围被限制在 [0, 255] 之间。

```lua
-- 红色
self.color = Color.rgb(255, 0, 0)
```

### `rgba`

返回一个由红、绿、蓝和 alpha 通道构建的颜色。通道值的范围被限制在 [0, 255] 之间。

```lua
-- 50% 透明度的红色
self.color = Color.rgba(255, 0, 0, 128)
```

## 静态函数 (Static Functions)

### `red`

返回颜色的红色通道值。如果提供了数值，则返回一个该通道已更新的新颜色。

```lua
print("红色值:", Color.red(myColor))
```

### `green`

返回颜色的绿色通道值。如果提供了数值，则返回一个该通道已更新的新颜色。

```lua
print("绿色值:", Color.green(myColor))
```

### `blue`

返回颜色的蓝色通道值。如果提供了数值，则返回一个该通道已更新的新颜色。

```lua
print("蓝色值:", Color.blue(myColor))
```

### `alpha`

返回颜色的 alpha 通道值，或者返回一个 alpha 通道设置为指定值的新颜色。数值范围限制在 [0, 255] 之间。

```lua
print("Alpha 值:", Color.alpha(myColor))
```

### `opacity`

以 [0.0, 1.0] 范围内的归一化值返回颜色的不透明度，或者返回一个 alpha 通道根据指定不透明度设置的新颜色。

```lua
print("不透明度:", Color.opacity(myColor))
```
