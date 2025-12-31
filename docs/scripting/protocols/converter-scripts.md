---
title: "转换器脚本 (Converter Scripts)"
description: "使用 Rive 脚本创建自定义转换器"
---

Rive 包含几个内置转换器，如 **转换为字符串 (Convert to String)** 和 **进位 (Round)**。
当内置转换器无法满足您的需求时，可以使用脚本创建自定义转换器。

有关转换器和数据绑定的背景知识，请参阅 [数据转换器 (Data Converters)](/editor/data-binding/overview#converter)。

## 示例 (Examples)

## 创建转换器 (Creating a Converter)

[创建一个新脚本](/scripting/creating-scripts) 并选择 **Converter** 作为类型。

## 转换器脚本的结构 (Anatomy of a Converter Script)
```lua
type MyConverter = {}

-- 在脚本初始化时调用一次。
function init(self: MyConverter): boolean
  return true
end

-- 将绑定的属性值从源转换为目标。
function convert(self: MyConverter, input: DataValueNumber): DataValueNumber
  local dv: DataValueNumber = DataValue.number()
  if input:isNumber() then
    -- 将输入的数值加 1
    dv.value = (input :: DataValueNumber).value + 1
  end
  return dv
end

-- 从目标转换回源（用于目标到源和双向数据绑定）。
function reverseConvert(self: MyConverter, input: DataValueNumber): DataValueNumber
  local dv: DataValueNumber = DataValue.number()
  if input:isNumber() then
    dv.value = (input :: DataValueNumber).value - 1
  end
  return dv
end

-- 返回一个构建转换器实例的工厂函数。
-- Rive 在创建脚本时会调用此函数，并返回一个包含其生命周期函数和任何默认值的表。
return function(): Converter<MyConverter, DataValueNumber, DataValueNumber>
  return {
    init = init,
    convert = convert,
    reverseConvert = reverseConvert,
  }
end
```

## 使用脚本创建转换器 (Creating a Converter using your Script)

使用您的新转换器脚本创建一个新转换器：

1. 在“数据 (Data)”面板中，点击 `+` 按钮。
2. 选择 **Converters → Script → MyConverter**。

![使用脚本创建转换器](/images/scripting/create-converter-with-script.png)

## 添加输入 (Adding Inputs)

请参阅 [脚本输入 (Script Inputs)](/scripting/script-inputs)。