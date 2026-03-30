---
title: "运行时入门 (Getting Started with Runtimes) - Rive 运行时"
description: "运行时 (Runtimes) Rive 运行时是将你在 Rive 编辑器中创建的动画集成到应用程序、网站或游戏中的桥梁。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 运行时, 运行时入门
---

运行时 (Runtimes)

# 运行时入门 (Getting Started with Runtimes)

Rive 运行时是将你在 Rive 编辑器中创建的动画集成到应用程序、网站或游戏中的桥梁。

## [​](#overview) 概览

Rive 为各种平台提供官方运行时库，让开发者可以轻松地在产品中嵌入和控制 Rive 动画。所有运行时都是开源的，你可以在 [GitHub](https://github.com/rive-app) 上找到源代码。

## [​](#choosing-a-runtime) 选择运行时

根据你的目标平台选择合适的运行时：

### Web 应用
- **[Web (JS/TS)](/runtimes/web.md)** - 适用于原生 JavaScript 或任何前端框架
- **[React](/runtimes/react.md)** - 专为 React 应用优化的封装
- **[React Native](/runtimes/react-native.md)** - 用于跨平台移动应用

### 移动应用
- **[Flutter](/runtimes/flutter.md)** - 支持 iOS、Android、Web 和桌面
- **[Apple (iOS/macOS)](/runtimes/apple.md)** - 原生 Swift/SwiftUI 支持
- **[Android](/runtimes/android.md)** - 原生 Kotlin 支持

### 游戏引擎
- **[Unity](/games/unity.md)** - C# 运行时
- **[Unreal Engine](/games/unreal.md)** - C++ 运行时
- **[Defold](/games/defold.md)** - Lua 运行时

## [​](#core-concepts) 核心概念

无论使用哪个运行时，你都需要了解以下核心概念：

- **[状态机播放](/runtimes/state-machines.md)** - 控制状态机的播放和输入
- **[数据绑定](/runtimes/data-binding.md)** - 在运行时动态更新文本、颜色、图像等
- **[加载资产](/runtimes/loading-assets.md)** - 动态加载图像、字体和音频
- **[选择渲染器](/runtimes/choose-a-renderer.md)** - 根据需求选择合适的渲染器

## [​](#feature-support) 功能支持

不同运行时对 Rive 功能的支持程度可能有所不同。请参阅 [功能支持页面](/feature-support.md) 了解详细的兼容性信息。

[Web 运行时](/runtimes/web.md)[Flutter 运行时](/runtimes/flutter.md)
