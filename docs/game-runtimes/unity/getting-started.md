---
title: '入门指南 (Getting Started)'
description: '将 Rive 添加到您的 Unity 嬉戏中。'
---

::: info
rive-unity 软件包目前处于适用于 macOS 和 Windows 的技术预览版（Technical Preview）。随着我们扩展平台支持，我们希望收集有关 API 和功能集的反馈。​
:::

## 示例项目 (Example Projects)

想要快速上手 rive-unity，请运行我们的 [示例项目](https://github.com/rive-app/rive-unity-examples) 之一。

## 安装 (Installation)

[rive-unity 软件包](https://github.com/rive-app/rive-unity) 可从 GitHub 安装。

您需要一个支持 OpenGL 或 D3D11（Windows 情况）的 Unity 编辑器，或者一台采用 ARM64（M1, M2 等）架构的 Mac 电脑。

在采用 ARM64 的 Mac 上，您无需进行任何配置。若要手动更新，请在 Unity 中通过 **Edit -> Project Settings -> Player** 将 D3D11/OpenGL（Windows）或 Metal（Mac/iOS）选为图形 API（Graphics API）。

您可以打开 Package Manager，通过添加 Git 依赖项的方式安装 Rive Unity 软件包，例如（将 `0.0.0` 替换为[最新版本](https://github.com/rive-app/rive-unity/releases)）：

```bash
git@github.com:rive-app/rive-unity.git?path=package#v0.0.0
```

或者通过 HTTP 方式（将 `0.0.0` 替换为[最新版本](https://github.com/rive-app/rive-unity/releases)）：

```bash
https://github.com/rive-app/rive-unity.git?path=package#v0.0.0
```

- 打开 **Window -> Package Manager**。
- 选择 **Add package from git URL...**。
- 输入带版本标签的 URL。
  ![Image](/images/game-runtimes/unity/929bb6b6-2e4a-45c0-a09b-0c3d4f7c5361.webp)

::: info
由于 Rive API 的变动以及 Unity 重新加载软件包的方式，Unity 在升级软件包过程中可能会崩溃。为了避免这种情况，请使用以下方法手动升级软件包版本。
:::

您也可以手动在项目的 `Packages/manifest.json` 文件中添加和更新它（将 `0.0.0` 替换为最新版本）：

```json
"app.rive.rive-unity": "git@github.com:rive-app/rive-unity.git?path=package#v0.0.0",
```

## 向 Unity 添加 Rive 文件

请参阅我们关于[导出（Exporting）](/editor/exporting/)实时内容的文档。

有了 `.riv` 文件后，您只需将其拖入 Unity 的项目窗口（Project window），系统会自动创建一个 Asset 对象。在我们的 [素材市场 (Marketplace)](https://rive.app/marketplace) 中，您可以找到许多可以二次创作并用于您项目的 Rive 内容。

## 显示 Rive 文件

**拖放操作 (Drag-and-Drop)**

要显示 `.riv` 文件，您可以直接将该资产拖入场景层级（Scene hierarchy），这将在 uGUI Canvas 中创建一个配置完备的屏幕空间面板。

> [观看视频](https://ucarecdn.com/c6749dc5-66bb-4125-925c-363c32357881/)

::: info
必须安装 `com.unity.ugui` 软件包才能使用这些组件。新的 Unity 项目通常默认已包含该包。
:::

若要在网格（Mesh）上显示 Rive 文件，您可以将资产拖放到层级中带有 MeshRenderer 组件的现有 GameObject 上。这会自动在场景中创建一个 **Rive Panel**，并向网格 GameObject 添加 **a Rive Texture Renderer** 组件。

> [观看视频](https://ucarecdn.com/433ea352-657b-4ebb-bb90-9c228423e018/)

**快速创建菜单 (Quick Creation Menu)**

在场景层级中点击右键，可以快速创建以下内容：

- `Rive > Rive Panel` - 创建一个独立面板。
- `Rive > Rive Panel (Canvas)` - 创建一个适用于 UI 的面板。
- `Rive > Widgets > Rive Widget` - 添加一个标准 Rive 挂件。
- `Rive > Widgets > Procedural Rive Widget` - 添加一个过程化挂件。
