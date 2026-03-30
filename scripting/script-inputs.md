---
title: "脚本输入 (Script Inputs) - Rive 脚本"
description: "脚本 (Scripting) 在脚本中访问和操作状态机输入。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 脚本, 脚本输入
---

脚本 (Scripting)

# 脚本输入 (Script Inputs)

在脚本中访问和操作状态机输入。

## [​](#overview) 概览

脚本可以访问状态机的输入，允许你通过代码控制动画行为。

## [​](#accessing-inputs) 访问输入

```javascript
// 获取状态机
const stateMachine = artboard.stateMachine("State Machine 1");

// 访问输入
const boolInput = stateMachine.input("isActive");
const numInput = stateMachine.input("progress");
const triggerInput = stateMachine.input("onClick");
```

## [​](#modifying-inputs) 修改输入

```javascript
// 布尔输入
boolInput.value = true;

// 数字输入
numInput.value = 0.5;

// 触发器输入
triggerInput.fire();
```

## [​](#listening-to-changes) 监听变化

```javascript
function onInputChanged(input) {
  console.log("输入变化:", input.name, "->", input.value);
}
```

[脚本概览](/scripting/overview.md)[状态机输入](/editor/state-machine/inputs.md)
