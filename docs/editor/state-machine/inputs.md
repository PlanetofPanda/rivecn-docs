---
title: "输入 (Inputs)"
description: "⚠️ 已弃用：控制 Rive 图形请使用数据绑定（Data Binding）而非输入（Inputs）"
---

::: warning
**弃用通知：** 此页面记录的是旧版的输入系统（Inputs system）。
  **对于新项目：** 请改用 [数据绑定 (Data Binding)](/editor/data-binding)。**对于现有项目：** 请计划尽快从 Inputs 迁移到 Data Binding。**提供此内容仅用于支持旧版项目。**
:::

"输入"（Inputs）是用于在状态机中控制过渡动画的旧版工具。虽然目前仍可以使用 Inputs 来控制过渡，但"数据绑定"被认为是最佳实践，因为视图模型（View Models）在运行时功能更强大且更易于控制。

Inputs 的最佳用途是进行快速、原型的交互设计，且不打算将其迁移到生产环境运行时。

<YouTube videoId="rJVfBs6VA0I" />

### 创建新输入 (Creating a new Input)

要创建一个新输入，请使用输入面板中的加号按钮。点击加号后，系统将提示您选择要创建的输入类型。共有三种类型的输入：布尔值（booleans）、触发器（triggers）和数值（numbers）。

![Image](https://ucarecdn.com/11d24273-9c87-4adb-963a-fd45f8e667b6/)

## 输入类型 (Input Types)

我们可以根据交互内容的情况和类型使用三种类型的输入。我们将分别讨论这些输入。

### 布尔值 (Boolean)

布尔值可以持有 true（正确）或 false（错误）中的任意一个值。

![Boolean for a switch](https://ucarecdn.com/4886ec99-ad57-4ae7-9709-5f028c6cbaab/)

### 触发器 (Trigger)

触发器类似于布尔值，但它只能在短时间内变为 true。

![Trigger for attack animation](https://ucarecdn.com/29401ecd-875b-4925-bb1e-b48518786c42/)

### 数值 (Number)

数值输入为您提供一个数值框，可以是任何整数。

![Number input for rating animation](https://ucarecdn.com/dbd19760-02e4-4d37-a3a8-627ce8e0b65c/)
