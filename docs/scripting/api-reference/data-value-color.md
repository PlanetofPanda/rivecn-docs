---
title: DataValueColor
---

存储颜色值的 [数据值 (DataValue)](/scripting/api-reference/data-value) 对象。颜色值被编码为包含红、绿、蓝和 alpha 分量的数值。

```lua
local dv: DataValueColor = DataValue.color()
dv.value = Color.rgba(255, 0, 0, 155)
```

## 字段 (Fields)

### `value`

存储颜色值。

```lua
local dv: DataValueColor = DataValue.color()
dv.value = Color.rgba(255, 0, 0, 155)
```
编码为数值的完整颜色值。

### `red`

颜色分量，范围为 [0, 255]。

### `green`

颜色分量，范围为 [0, 255]。

### `blue`

颜色分量，范围为 [0, 255]。

### `alpha`

Alpha 分量，范围为 [0, 255]。
