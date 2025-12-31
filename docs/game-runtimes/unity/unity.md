---
title: "Unity"
description: "Rive 的 Unity 运行时。"
---

::: info
Rive Unity 运行时目前在 Mac 和 Windows 版本的 Unity 中处于 **技术预览版 (Technical Preview)** 阶段。随着我们扩展平台支持，我们希望收集有关 API 和功能集的反馈。请通过我们的 [社区 (Community)](https://community.rive.app/c/support/) 或 [支持频道 (Support Channel)](https://rive.atlassian.net/servicedesk/customer/portals) 联系我们。
:::

::: info
请参阅下方的 [功能支持](#feature-support) 部分以查看 Unity 中 Rive 功能的更新列表。
:::

## Unity 版本支持

软件包支持 Unity 2021 及以上的所有 LTS 版本（包括 Unity 6）。

## 渲染支持 (Rendering Support)

rive-unity 运行时使用的是 [Rive 渲染器 (Rive Renderer)](https://rive.app/renderer)，并与 Rive 最新的 C++ 运行时版本保持同步。

- [WebGL](https://github.com/rive-app/rive-unity/blob/main/WEBGL.md)
- Mac 上的 Metal
- iOS 上的 Metal
- Windows 上的 D3D11
- Windows 上的 OpenGL
- Android 上的 OpenGL
- Windows 上的 Vulkan
- Android 上的 Vulkan
- Ubuntu 24.04+ (x86_64) 上的 Vulkan

计划支持：

- D3D12

### 错误报告 (Bug Reports)

如果您在集成 Rive Unity 运行时遇到任何错误或意外崩溃，我们建议您直接在 [rive-unity](https://github.com/rive-app/rive-unity/issues) 仓库提交详细的 Issue，并附带 **Editor.log** 文件，以便提供有关发生情况的更多细节和背景。

有关如何查找 Editor.log 文件的更多详情，请参阅 [Unity 文档](https://docs.unity3d.com/Manual/LogFiles.html)。

::: info
请注意，最好在崩溃发生后立即提取 Editor.log 文件。
:::

## 功能支持 (Feature Support)

rive-unity 运行时采用最新的 Rive C++ 运行时。有关运行时支持的更多细节，请查看 [功能支持](/feature-support) 页面。下表列出了 Unity 运行时中目前支持的功能。

| **功能**                                           | **支持情况** |
| -------------------------------------------------- | ------------- |
| [动画播放](/runtimes/animation-playback)           | ✅             |
| [适配与对齐​](/runtimes/layout#fit)               | ✅             |
| [监听器​](/game-runtimes/unity/listeners)          | ✅             |
| [设置状态机输入​](/runtimes/inputs)                | ✅             |
| [监听事件](/runtimes/rive-events)                  | ✅             |
| [运行时更新文本](/runtimes/text)                   | ✅             |
| [带外资产（Out-of-band assets）](/runtimes/loading-assets) | ✅             |
| [过程化渲染](/game-runtimes/unity/procedural-rendering) | ✅             |
| PNG 图像                                           | ✅             |
| JPEG 图像                                          | ✅             |
| WEBP 图像                                          | ✅             |