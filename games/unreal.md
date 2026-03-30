---
title: "Unreal - Rive 游戏运行时"
description: "Rive 的 Unreal 运行时。 我们要重写我们的 Unreal Engine 集成以提供显着更好的性能，并且它已经显示出 4 倍的速度提升。为了专注于这项工作，我们暂时暂停支持，并且不再推荐当前版本的 Rive Unreal 插件（作为实验性预览版发布）。更多详细信息 在此。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 游戏运行时, Unreal
---

Unreal

# Unreal

Rive 的 Unreal 运行时。

我们要重写我们的 Unreal Engine 集成以提供显着更好的性能，并且它已经显示出 4 倍的速度提升。为了专注于这项工作，我们暂时暂停支持，并且不再推荐当前版本的 Rive Unreal 插件（作为实验性预览版发布）。更多详细信息 [在此](https://community.rive.app/c/announcements/rive-x-unreal)。

此页面适用于使用插件旧版本的用户。

请参阅下面的“**功能支持**”以获取 Unreal 中 Rive 功能的更新列表。

## [​](#rendering-support) 渲染支持

rive-unreal 运行时使用 [Rive 渲染器](https://rive.app/renderer) 并支持以下内容：

-   Metal on Mac
-   Metal on iOS
-   Windows 上的 Vulkan, DirectX11, 和 DirectX12
-   Android 支持即将推出！

计划支持：

-   Linux 和 Android 上的 Vulkan。

## [​](#bug-reports) 错误报告

如果你在集成 Rive Unreal 运行时时遇到任何错误或意外崩溃，我们建议直接在 [rive-unreal](https://github.com/rive-app/rive-unreal/issues) 仓库中记录详细问题。

## [​](#feature-support) 功能支持

rive-unreal 运行时使用 [Rive C++ 运行时](https://github.com/rive-app/rive-cpp)。有关运行时支持的更多详细信息，请参阅 [功能支持](/feature-support.md) 页面。

[快速开始](https://help.rive.app/game-runtimes/unreal/getting-started)