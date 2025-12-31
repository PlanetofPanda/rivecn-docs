---
title: "状态机 (State Machines)"
description: "在 Unreal 中与 Rive 状态机进行交互。"
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

有关 Rive 状态机的更多信息，请查阅相应的[运行时](/runtimes/state-machines)及[编辑器](/editor/state-machine/)文档。

## 概览 (Overview)

要选择一个状态机，请双击 **RiveTextureObject** 资产并输入状态机名称。如果名称留空，系统将使用默认状态机。

![Image](/images/game-runtimes/unreal/199aa4b2-e87a-435e-8bcf-dfa8f3edfc1c.webp)

::: info
一个 Rive 文件可能包含许多画板，而一个画板又可能包含许多状态机。
:::

## 设置输入 (Setting Inputs)

Rive 状态机可以拥有以下输入类型：

- **布尔值 (boolean)**：可以设置为 true 或 false。
- **数值 (number)**：可以设置为任何值。
- **触发器 (trigger)**：一个在单帧内被设置为 true 的特殊布尔值。

在 Rive 编辑器中选择状态机时，可以查看所有可用的输入，例如：

![Image](/images/game-runtimes/unreal/8d480bb7-f471-4130-acb5-9b90ad2aed4a.webp)

在上面的示例中：`effectsVolume` 是**数值**，`continueAvailable` 是**布尔值**，而 `back` 是**触发器**。

::: info
通过字符串名称从 **Artboard**（从 **RiveFile** 获取）访问 **Input（输入）**。
:::

### 布尔值输入 (Boolean Input)

要更新布尔值，请在画板上调用 `Set Bool Value`。

在下方的示例中，我们将名为 `isOpen` 的布尔输入设置为与本地变量 `Is Open` 相等。

![Image](/images/game-runtimes/unreal/102d3616-45dd-41b8-a3eb-d2af71dfa54d.webp)

要读取布尔值，请在画板上调用 `Get Bool Value` 并获取返回值。

![Image](/images/game-runtimes/unreal/8f9616c7-1d72-4a67-b2a1-ae60aea52fa8.webp)

### 数值输入 (Number Input)

要更新数值，请在画板上调用 `Set Number Value`。

在下方的示例中，我们将名为 `health` 的数值输入设置为与本地变量 `Health` 相等。

![Image](/images/game-runtimes/unreal/0a398356-bb41-4bae-815f-3c0011786eda.webp)

要读取数值，请在画板上调用 `Get Number Value` 并获取返回值。

![Image](/images/game-runtimes/unreal/3bfd0671-e6a1-445a-927b-2e311d8b4308.webp)

### 触发器输入 (Trigger Input)

要激活触发器，请在画板上调用 `Fire Trigger`。

在下方的示例中，我们触发了名为 `openMenu` 的触发器。

![Image](/images/game-runtimes/unreal/986c4ea0-2f2c-47e7-91a0-2858e9bee42f.webp)

### 嵌套输入 (Nested Inputs)

您可以通过使用以 "at Path" 结尾的等效节点来调用嵌套输入的函数。有关使用组件的更多细节，请参阅[组件基础](/editor/fundamentals/components)文档。

![Image](/images/game-runtimes/unreal/5ac579c6-7d8f-4875-a54f-7716e95f1098.webp)

## 示例 (Example)

让我们来看一个例子。下方的视频展示了一个带有简单状态机的 Rive 文件，其中包含一个名为 `numExpression` 的数值输入。

> [观看视频](https://ucarecdn.com/1b7e2073-8fc4-4ae5-b8f0-c7e3a6d68923/)

该数值输入决定了当前播放的动画，而状态机在转换过程中会在不同动画之间实现平滑融合。

在运行时，我们可以通过蓝图设置 `numExpression` 来切换机器人正确的表情。

> [观看视频](https://ucarecdn.com/e1d5226b-ad09-4f41-8352-6d7b369eb641/)

在这个例子中，数值输入是在按下相应的数字键时被设置的：

![Image](/images/game-runtimes/unreal/eb1c728c-0451-4ecf-9f2f-0832a598c568.webp)
