---
title: '文本 (Text)'
description: ''
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

有关 Rive 文本的更多信息，请查阅相应的[运行时](/runtimes/text)及[编辑器](/editor/text/)文档。

## 在 Unreal 中更新 Rive 文本

可以通过提供 **Text Run 名称** 和 **新数值**，在画板实例中更新 Text Run：

![Image](/images/game-runtimes/unreal/288c27f0-2b60-421e-bc9f-8a3d6f00762b.webp)

在上述示例中，我们将名为 `username` 的 **Text Run** 设置为 "Gordon"。

::: info
必须在编辑器中设置唯一的 Text Run 名称，以便于在运行时被发现。详情请参阅文本运行时文档。
:::

该画板包含一个名为 `username` 的 **Text Run**。唯一的名称使其可以在运行时被发现。

![Image](/images/game-runtimes/unreal/81779164-134c-4a3d-b64b-2f52a46af776.webp)

使用 **SetTextValueAtPath** 节点来设置组件（component）内的 **Text Run**。

![Image](/images/game-runtimes/unreal/2c67d331-0e45-41fc-9782-50df8f2f3ce9.webp)