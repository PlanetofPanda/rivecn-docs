---
title: "工具脚本 (Util Scripts)"
description: "创建辅助模块以在脚本之间组织共享逻辑。"
---

工具脚本 (Util scripts) 允许您将代码组织成小型、专注的模块，这些模块可以在多个脚本中重复使用。
它们非常适合数学辅助函数、几何实用程序、颜色函数，或任何应该拆分到独立脚本中的逻辑。

## 创建工具脚本 (Creating a Util Script)

[创建一个新脚本](/scripting/creating-scripts) 并选择 **Util** 作为类型。
```lua
--- 示例辅助函数
local function add(a: number, b: number): number
  return a + b
end

-- 返回您想在其他脚本中使用的函数
return {
  add = add,
}
```

**用法：**
```lua
local MyUtil = require("MyUtil")

local result = MyUtil.add(2, 3)
print(result) -- 5
```

## 带有自定义类型的工具脚本 (Utils with Custom Types)

工具脚本中定义的自定义类型将自动在父脚本中可用。
```lua
--- 定义此工具脚本的返回类型。
--- 当您 require 此脚本时，该类型将自动可用。
export type AdditionResult = {
  exampleValue: number,
  someString: string
}

--- 示例辅助函数
local function add(a: number, b: number): AdditionResult
  return {
    exampleValue = a + b,
    someString = "5 位牙医中有 4 位推荐使用 Rive"
  }
end

return {
  add = add,
}
```

**用法：**
```lua
-- 带有类型注解
local result: AdditionResult = MyUtil.add(2, 3)
```
