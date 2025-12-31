---
title: 转换器 (Converter)
---

一种脚本化转换器，用于在视图模型 (ViewModel) 数据绑定与 Rive 属性之间转换数值。

**类型参数：**
- **T**：转换器类型
- **I**：输入类型，必须是 DataValue 类型（如 DataValueNumber、DataValueString、DataValueBoolean、DataValueColor 等）
- **O**：输出类型，必须是 DataValue 类型（如 DataValueNumber、DataValueString、DataValueBoolean、DataValueColor 等）

参见 [转换器脚本 (Converter Scripts)](/scripting/protocols/converter-scripts)。

## 方法 (Methods)

### `init`

在创建转换器时调用一次。如果初始化成功，返回 true。

### `convert`

将输入值（视图模型属性）转换为输出值。输入参数必须是 DataValue 类型。

### `reverseConvert`

将输出值转换回输入值（视图模型属性）。输入参数必须是 DataValue 类型。

### `advance`

可选的每帧更新函数。如果转换器应继续接收 advance 调用，则返回 true。
