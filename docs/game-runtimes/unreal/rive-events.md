---
title: 'Rive 事件 (Rive Events)'
description: '在 Unreal 中访问 Rive 事件。'
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

有关 Rive 事件的更多信息，请查阅相应的[运行时](/runtimes/rive-events)及[编辑器](/editor/events/)文档。

## 概览 (Overview)

Rive 事件提供了一种将信息从图形传递给运行时代码的方法，例如按钮点击。一个事件可以包含任意数量的以下属性：**布尔值 (boolean)**、**数值 (number)** 或 **字符串 (string)**。

## 访问事件 (Accessing Events)

要访问 Rive 事件，请将 **Event Name (事件名称)** 绑定到 **Artboard (画板)** 的一个 **Custom Event (自定义事件)** 上。在此示例中，每当名为 `Rating` 的事件被报告时，`CustomRiveEvent` 都会被触发。

![Image](/images/game-runtimes/unreal/ca25bf3f-bd2f-4e95-8fd1-e84de3d287db.webp)

::: info
通过字符串名称从 **Artboard**（从 **RiveFile** 获取）访问 **Event**。
:::

函数 `Print to Texts` 接收 **Rive Event** 并遍历该事件的所有属性。

## 示例 (Example)

让我们来看一个例子。下方的视频演示了使用“星级评分”示例的 Rive 文件。每当其中一颗星星被点击时，该示例就会报告一个事件。该事件名为 `Rating`，并包含一个名为 `value` 的**数值**属性，其值与被点击的星星相匹配。

> [观看视频](https://ucarecdn.com/eab0a89d-afad-481f-be56-3cd876ea00f8/)

在蓝图中，我们执行以下操作：

1. **Bind Named Rive Event (绑定命名 Rive 事件)**：`Rating`

2. 中断（Break） **RiveEvent**，并遍历其 **数值 (number)** 属性

3. 中断每个 **RiveEventNumberProperty**

4. 找到名为 `value` 的**数值**属性

5. 打印该**数值**属性的值

![Image](/images/game-runtimes/unreal/46ccbabe-68d5-4486-bc04-83e5459c397c.webp)