---
title: "单元测试 (Unit Testing)"
description: "使用测试脚本为您的工具脚本编写并运行单元测试。"
---

测试脚本允许您为 [工具脚本 (Util Scripts)](/scripting/protocols/util-scripts) 编写单元测试，并直接在 Rive 编辑器中运行它们。
使用它们来验证数学辅助函数、字符串实用程序或脚本所依赖的任何其他纯逻辑。

除了验证代码外，测试还可以作为 [AI 编程助手 (AI Coding Agent)](/scripting/ai-agent) 的精确指令，帮助它生成行为完全符合您预期的代码。

## 创建测试脚本 (Creating a Test Script)

[创建一个新脚本](/scripting/creating-scripts) 并选择 **Test** 作为类型。

### 测试脚本的结构 (Anatomy of a Test Script)

测试脚本公开一个 `setup(test: Tester)` 函数。`Tester` 对象为您提供了定义和分组测试的辅助工具：

- `test.case(name, fn)` – 定义单个测试用例。
- `test.group(name, fn)` – 对相关测试进行分组。组可以嵌套。
- `expect(value)` – 创建一个期望对象以对值进行断言。

在 `case` 内部，`expect` 函数将作为参数传递给您的测试回调。

### 示例 (Example)
```lua
-- 加载您想要创建测试的工具脚本
local MyUtil = require('MyUtil')

function setup(test: Tester)
  local case = test.case
  local group = test.group

  -- 创建包含多个测试的单个用例
  case('加法', function(expect)
    local result = MyUtil.add(2, 3)
    expect(result).is(5)
    expect(result).greaterThanOrEqual(5)
  end)

  -- 使用组来组织您的测试
  group('数学', function()
    case('减法', function(expect)
      local result = MyUtil.subtract(2, 3)
      expect(result).is(-1)
    end)

    case('乘法', function(expect)
      local result = MyUtil.multiply(2, 3)
      expect(result).greaterThanOrEqual(6)
    end)

    group('三角学', function()

      case('角度转弧度', function(expect)
        local result = MyUtil.deg2rad(180)
        expect(result).is(math.pi)
      end)
    end)
  end)
end
```

::: tip
提示：为您的组和用例使用具有描述性的名称。它们会显示在测试结果面板中，让您更容易看到失败的原因。
:::

### 匹配器/断言 (Matchers (expectations))

`expect` 辅助工具返回一个带有匹配器方法的对象，您可以在测试中使用，例如：
```lua
expect(value).is(expected)
expect(value).greaterThan(number)
expect(value).greaterThanOrEqual(number)
expect(value).lessThan(number)
expect(value).lessThanOrEqual(number)
```

有关匹配器和测试实用程序的完整列表，请参阅“测试 API 参考”（TODO：链接）。

### 使用 never 反转匹配器

您可以通过在任何匹配器之前链式调用 `.never` 来反转它。
这意味着：仅当匹配器通常会失败时，测试才会通过。
```lua
case('never 示例', function(expect)
  -- 此测试通过，因为 2 + 2 不是 3
  expect(2 + 2).never.is(3)

  -- 此测试通过，因为 4 不是 >= 6
  expect(4).never.greaterThanOrEqual(6)
end)
```

## 运行测试 (Running Tests)

1. 在资产面板 (Assets panel) 中，右键点击您的测试脚本。
2. 选择 **Run Tests** (运行测试)。

测试结果将按以下方式显示：

- 通过和失败的用例会列在资产面板中该脚本的下方
- 通过和失败的用例会在脚本编辑器中高亮显示

![测试结果面板](/images/scripting/debugging/test-results.png)
