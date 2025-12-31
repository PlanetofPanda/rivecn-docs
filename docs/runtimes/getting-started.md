---
title: 'Rive 运行时入门 (Getting Started with the Rive Runtimes)'
description: '在您选择的平台上运行 Rive。'
---

Rive 运行时是开源库，允许您在应用、游戏和网站中加载和控制动画。深入了解各子页面以开始使用！

<NoteOnFeatureSupport/>

## 如何使用本指南

在本节中，您将找到运行时的子页面，其中包含在您选择的平台上开始使用所需的所有信息和资源。请参见下文的 [安装与入门](#安装与入门)。

您还将找到专门讨论在运行时控制 Rive 图形的页面。例如，更新数据绑定属性和外部加载资源。请参见下文的 [图形控制与交互](#图形控制与交互)。

### 安装与入门

::: info
请务必查看每个运行时章节下提供的其他文档。这些文档提供了平台相关的注意事项、迁移指南和高级用法信息。
:::

**[Web (JS)](/runtimes/web)**

    本指南介绍了如何开始使用 Web 运行时库。

**[React](/runtimes/react)**

    本指南介绍了如何开始使用 React 运行时库。

**[React Native](/runtimes/react-native)**

    本指南介绍了如何开始使用 React Native 运行时库。

**[Apple](/runtimes/apple)**

    本指南介绍了如何开始使用 Apple 运行时库。

**[Android](/runtimes/android)**

    本指南介绍了如何开始使用 Android 运行时库。

**[Flutter](/runtimes/flutter)**

    本指南介绍了如何开始使用 Flutter 运行时库。

**[Unity](/game-runtimes/unity)**

    本指南介绍了如何开始使用 Unity 运行时库。

**[Unreal](/game-runtimes/unreal)**

    本指南介绍了如何开始使用 Unreal 运行时库。

## 图形控制与交互

这些章节详细介绍了如何在运行时与 Rive 图形进行交互。在这里，您可以找到 Rive 所有官方运行时的文档和代码示例。

<Interaction/>

## 其他章节

**[选择渲染器 (Choose a Renderer)](/runtimes/choose-a-renderer)**

    指定要在运行时使用的渲染器。每个运行时提供不同的选项。我们建议使用 Rive 渲染器 (Rive Renderer)。

**[文件格式 (Format)](/runtimes/advanced-topic/format)**

    Rive 文件格式。

**[功能支持 (Feature Support)](/feature-support)**

    运行时对 Rive 功能的支持情况。

## 版本控制 (Versioning)

随着 Rive 编辑器的更新发布，我们会偶尔推送更新的运行时以支持新功能。有关特定功能所需的最低运行时版本，请参见 [功能支持 (Feature Support)](/feature-support)。

在大多数情况下，最新的运行时也将支持旧版本的 Rive 资产，因此您无需重新导出资产即可更新到最新的运行时。

在需要重新导出以利用最新功能的情况下，有多种导出 Rive 文件的方法。查看我们的 [导出 (Exporting)](/editor/exporting) 文档以获取更多信息。

## 官方运行时

查看运行时子页面以了解如何入门！

<Accordion title="Web">
  所有 Web 运行时均通过 npm 分发：

  - [GitHub](https://github.com/rive-app/rive-wasm)
  - [canvas](https://www.npmjs.com/package/@rive-app/canvas)
  - [canvas-lite](https://www.npmjs.com/package/@rive-app/canvas-lite)
  - [canvas (advanced)](https://www.npmjs.com/package/@rive-app/canvas-advanced)
  - [webgl](https://www.npmjs.com/package/@rive-app/webgl)
  - [webgl (advanced)](https://www.npmjs.com/package/@rive-app/webgl-advanced)

  **有关这些依赖项之间差异的更多信息，请参阅 [Canvas vs WebGL](#)。**
</Accordion>

<Accordion title="React">
  所有 React 运行时均通过 npm 分发：

  - [GitHub](https://github.com/rive-app/rive-react)
  - [canvas](https://www.npmjs.com/package/@rive-app/react-canvas)
  - [canvas-lite](https://www.npmjs.com/package/@rive-app/react-canvas-lite)
  - [webgl](https://www.npmjs.com/package/@rive-app/react-webgl)

</Accordion>

<Accordion title="Apple">
  Apple 运行时通过以下方式分发：

  - [Swift Package Manager](https://swiftpackageregistry.com/rive-app/rive-ios)
  - Cocoapods

  [GitHub](https://github.com/rive-app/rive-ios)
</Accordion>

<Accordion title="Android">

  - [Maven](https://search.maven.org/artifact/app.rive/rive-android)
  - [GitHub](https://github.com/rive-app/rive-android)
</Accordion>

<Accordion title="Flutter">

  - [pub.dev](https://pub.dev/packages/rive)
  - [GitHub](https://github.com/rive-app/rive-flutter)
</Accordion>

<Accordion title="C++ (Mac/Linux/Windows)">

  - [GitHub](https://github.com/rive-app/rive-cpp)
</Accordion>

<Accordion title="C#">

  - [UWP (推荐)](https://dev.azure.com/dotnet/CommunityToolkit/_artifacts/feed/CommunityToolkit-Labs/NuGet/CommunityToolkit.Labs.Uwp.RivePlayer/overview/0.0.1)
  - [WinUI](https://dev.azure.com/dotnet/CommunityToolkit/_artifacts/feed/CommunityToolkit-Labs/NuGet/CommunityToolkit.Labs.WinUI.RivePlayer/overview/0.0.1)
  - (高级 API) [RivePlayer Github](https://github.com/CommunityToolkit/Labs-Windows/blob/main/labs/RivePlayer/samples/RivePlayer.Samples/RivePlayer.md)
  - (低级 API) [RiveSharp Github](https://github.com/rive-app/rive-sharp)

  **高级 API**:

  - [WinUI (高级)](https://dev.azure.com/dotnet/CommunityToolkit/_artifacts/feed/CommunityToolkit-Labs/NuGet/CommunityToolkit.Labs.WinUI.RivePlayer/overview/0.0.1)
</Accordion>
<Accordion title="React Native">
  - [npm](https://www.npmjs.com/package/rive-react-native)
  - [GitHub](https://github.com/rive-app/rive-react-native)

</Accordion>

## 社区运行时 (Community runtimes)

| **运行时** | **作者** | **链接** |
| --- | --- | --- |
| QtQuick | [basysKom](https://github.com/basysKom) | [Github](https://github.com/basysKom/RiveQtQuickPlugin) |
| UWP (C#) | Windows Community Toolkit | [Github](https://github.com/CommunityToolkit/Labs-Windows/blob/main/components/RivePlayer/samples/RivePlayer.md) |

## 处理 .riv 文件

在使用 Git 签入 `.riv` 文件时，请考虑添加 `.gitattributes` 文件并将 `.riv` 文件标记为 `binary`（二进制）文件，以防止 Git 在签入这些文件时更改行尾。否则，某些平台可能会在有换行符的地方（即 Windows CRLF 行尾 vs LF 行尾）意外损坏 `.riv` 文件，并在运行时读取该文件时导致问题。

```text
.gitattributes

*.riv binary
```

## 许可协议 (Licensing)

我们的官方运行时均已开源并根据 [MIT 许可协议](https://choosealicense.com/licenses/mit/) 进行许可。您可以自由地将它们用于个人和商业应用。

## 贡献 (Contributing)

由于所有运行时都是开源的，我们鼓励您深入研究并看看！如果您发现某些内容缺失或觉得您可以改进它，请 fork 它们！