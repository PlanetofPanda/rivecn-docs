---
title: "Unreal"
description: "Rive 的 Unreal 运行时。"
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

::: info
请参阅下方的 “**功能支持 (Feature Support)**” 部分以查看 Unreal 中 Rive 功能的更新列表。
:::

## 渲染支持 (Rendering Support)

rive-unreal 运行时使用的是 [Rive 渲染器 (Rive Renderer)](https://rive.app/renderer)，并支持以下平台/技术：

- Mac 上的 Metal
- iOS 上的 Metal
- Windows 上的 Vulkan、DirectX11 和 DirectX12
- Android 支持即将推出！

计划支持：

- Linux 和 Android 上的 Vulkan。

## 错误报告 (Bug Reports)

如果您在集成 Rive Unreal 运行时遇到任何错误或意外崩溃，我们建议您直接在 [rive-unreal](https://github.com/rive-app/rive-unreal/issues) 仓库中提交详细的 Issue。

## 功能支持 (Feature Support)

rive-unreal 运行时采用 [Rive C++ 运行时 (Rive C++ runtime)](https://github.com/rive-app/rive-cpp)。有关运行时支持的更多细节，请查看 [功能支持](/feature-support) 页面。