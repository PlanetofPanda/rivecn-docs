---
title: '音频 (Audio)'
description: ''
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

根据您在 Unreal 中使用 Rive 的方式，启用 Rive 资产中的音频可能需要一些额外的设置。

- 直接从 Content Browser 将 **RiveFile** 拖入关卡时，系统会自动创建一个 **RiveAudioEngine** 组件并将其分配给 **RiveWidgetActor**。*无需进一步配置。*
- 向自定义的 **Actor** 蓝图中添加 **RiveActor** 组件时，您需要手动添加一个 **RiveAudioEngine** 组件。**RiveActor** 会自动检测并使用此音频引擎。
- 如果您直接使用 **RiveTextureObject** 或 **RiveWidget**，则需要在 **OnRiveReady** 事件中调用 **SetAudioEngine** 来关联音频引擎。以下示例展示了如何在动态创建的 **RiveWidget** 中执行此操作。

  ![Image](/images/game-runtimes/unreal/d74ca6d0-068f-4457-a53e-f8af4b5da232.webp)