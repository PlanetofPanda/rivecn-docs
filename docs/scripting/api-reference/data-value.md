---
title: 数据值 (DataValue)
---

可存储在输入项中的数值的基类型。提供检查底层数值类型的函数。

## 静态函数 (Static Functions)

### `number`

[数据值 (DataValue)](/scripting/api-reference/data-value) 类型的构造函数。每个函数返回一个对应底层类型的可变 DataValue 容器。
创建一个存储数值的 [DataValueNumber](/scripting/api-reference/data-value-number)。

### `string`

创建一个存储字符串的 [DataValueString](/scripting/api-reference/data-value-string)。

### `boolean`

创建一个存储布尔值的 [DataValueBoolean](/scripting/api-reference/data-value-boolean)。

### `color`

创建一个存储 [颜色 (Color)](/scripting/api-reference/color) 的 [DataValueColor](/scripting/api-reference/data-value-color)。

## 方法 (Methods)

### `isNumber`

如果值为数值，则返回 true。
```lua
local dv: DataValueNumber = DataValue.number()
print(dv.isNumber) -- true
```

### `isString`

如果值为字符串，则返回 true。
```lua
local dv: DataValueNumber = DataValue.number()
print(dv.isString) -- false
```

### `isBoolean`

如果值为布尔值，则返回 true。
```lua
local dv: DataValueNumber = DataValue.number()
print(dv.isBoolean) -- false
```

### `isColor`

如果值为颜色，则返回 true。
```lua
local dv: DataValueNumber = DataValue.number()
print(dv.isColor) -- false
```
