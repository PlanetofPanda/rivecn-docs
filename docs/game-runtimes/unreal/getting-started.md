---
title: "入门指南 (Getting Started)"
description: "将 Rive 添加到您的 Unreal 项目中。"
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

::: info
rive-unreal 软件包目前在 macOS 和 Windows 上处于 **Alpha** 阶段。它目前支持 **Unreal 5.3, 5.4 和 5.5。**
:::

::: tip
小提示：为了避免编译 Rive 模块时出现问题，最好采取以下任一措施：

  1. 创建一个 C++ 项目，而不是蓝图（Blueprint）项目，或者
  2. 在创建蓝图项目后立即向其中添加一个 C++ 类（且必须在添加 Rive 插件之前完成）。
:::

**入门指南最佳实践**

> [观看视频](https://ucarecdn.com/a320730a-abb9-48cc-b945-7fb4ad65767c/)

## 构建要求 (Build requirements)

编译 Rive 插件需要特定平台的依赖项和构建工具。

::: info
这些步骤仅是在插件通过 **Fab** 分发之前的临时要求。
:::

### Unreal 版本

- 安装 _UE 5.3.2 或以上版本_ - [Epic Games Launcher。](https://store.epicgames.com/en-US/download)
- 确保将 _5.3.2 或以上版本_ 设置为当前版本：<img src="/images/game-runtimes/unreal/c75a2b18-7208-4b28-bfef-a998a9a0bf08.webp" alt="Image" />
- 确保在上述启动器的 **Options** 中勾选了 **Engine Source**：<img src="/images/game-runtimes/unreal/50bf5981-f34a-43cd-b149-09a84bb8b49b.webp" alt="Image" />

::: info
支持更新（以及更旧）版本的集成工作正在进行中。如果您需要支持特定版本的 Unreal，请通过我们的 [支持频道](https://community.rive.app/c/support/) 联系我们。
:::

### macOS

该插件设计为在 M 系列芯片和 Intel 芯片上均可运行。_如果您遇到困难，请_ [在 Github 上提交 Issue](https://github.com/rive-app/rive-unreal/issues) _并分享您的环境详情。_

**步骤：**

- 为 macOS [安装 Xcode](https://developer.apple.com/xcode/)。

### Windows

**步骤：**

1. 为 Windows [安装 Visual Studio](https://visualstudio.microsoft.com/)。
2. 按照[这些说明](https://dev.epicgames.com/documentation/en-us/unreal-engine/setting-up-visual-studio-development-environment-for-cplusplus-projects-in-unreal-engine?application_version=5.3)设置用于 Unreal C++ 开发的 Visual Studio。

**排错步骤：**

如果您在构建时遇到问题，请执行以下额外步骤。

- 在 **Visual Studio Installer** 的 **使用 C++ 的嬉戏开发 (Game development with C++)** 部分，请务必勾选：
  - Unreal Engine 安载器 (Unreal Engine installer)
  - Unreal Engine 测试适配器 (Unreal Engine Test Adapter)
  - Unreal Engine .uproject 支持 (预览版)
- 确保 Visual Studio 和工具链（toolchains）已更新至最新版本。
- 确保您使用的是受支持的 MSVC 版本。您可能会遇到 Windows 工具链禁用的问题，例如：

::: info
_“由于编译器问题，UnrealBuildTool 已禁用 MSVC 14.39.33519-14.39.99999 工具链。请通过打开生成的解决方案并安载推荐组件，或从 Visual Studio 安载器安载 14.38.33130 等其他工具链。”_
:::

## 演示项目 (Demo Project)

要快速上手 rive-unreal，请查看我们的 [演示项目](https://github.com/rive-app/rive-unreal-demos)。该示例项目展示了各种 Rive 功能及渲染 Rive 内容的方法。蓝图代码提供了有关在 Unreal 中使用 Rive 的额外说明和注释。

**请遵循以下步骤：**

1. 确保您已完成上述 **构建要求 (Build requirements)** 中列出的步骤。
2. 从 Github 下载最新的项目。
3. 解压项目并运行 **ShowDemo.uproject**。
4. 等待片刻，直到出现询问是否构建缺失模块的弹窗。选择 **Yes。** 请注意，模块名称可能与下图不同。<img src="/images/game-runtimes/unreal/4cf3df6f-9ce6-47d5-8368-8c51f3c7d995.webp" alt="Image" />
5. 首次打开项目可能需要一些时间，期间可能看起来毫无反应。通常这不会超过几分钟。
6. 播放 **MainMenu** 关卡 (`/Content/Levels/MainMenu/LV_MainMenu.umap`)。

**排错步骤：**

- 参见 **构建要求 (Build requirements)** 中的排错步骤。
- 如果您在编译时遇到困难，请 [在我们的 Github 上报告此问题](https://github.com/rive-app/rive-unreal/issues)。

## 将 Rive 添加到现有项目

::: info
我们计划将 Rive Unreal 插件作为免费资产在 Fab 上分发。在此之前，需要按照以下步骤将 Rive 添加到现有项目中。
:::

**步骤：**

1. 确保您已完成上述 **构建要求 (Build requirements)** 中列出的步骤。如果 Unreal 编辑器已打开，请将其关闭。
2. 从 Github [releases 选项卡](https://github.com/rive-app/rive-unreal/releases) 下载最新版本的插件（命名格式为版本号，如 **Rive-X.Y.Z.zip**）。
3. 解压该 zip 文件，并将内容复制到您 Unreal 项目文件系统中 `Your-Project-Name/Plugins/Rive/` 目录下。
4. 打开您项目的 `.uproject` 文件。
5. 等待片刻，直到出现询问是否构建缺失模块的弹窗。选择 **Yes。**
6. 首次打开项目可能需要一些时间。
7. 项目打开后，确保 Rive 插件已启用：前往 **Settings -> Plugins** 并搜索 **Rive。** <img src="/images/game-runtimes/unreal/1e6d9667-d43b-4948-abd1-7735c25cbecb.webp" alt="Image" />

现在您可以添加 Rive 内容了！

**排错步骤：**

- 参见 **构建要求 (Build requirements)** 中的排错步骤。
- 对于 Windows 用户，请确保 RHI 设置为 **DirectX 11。**
- 如果您在编译时遇到困难，请 [在我们的 Github 上报告此问题](https://github.com/rive-app/rive-unreal/issues)。

## 向 Unreal 添加 Rive 文件

请参阅我们关于[导出（Exporting）](/editor/exporting/exporting-for-runtime)实时内容的文档。

有了 `.riv` 文件后，您只需将其拖入 Unreal 的 Content Browser，系统会自动创建一个 **RiveFile** 对象、一个 **RiveTextureObject** 以及一个 **Widget Blueprint**。在我们的 [素材市场 (Marketplace)](https://rive.app/marketplace) 中，您可以找到许多可以二次创作并用于您项目的 Rive 内容。

有关如何使用 **RiveFile** 对象，请参阅后续章节。