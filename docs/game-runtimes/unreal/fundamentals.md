---
title: "基础知识 (Fundamentals)"
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

## 添加 Rive 文件

要将 `.riv` 文件添加到 Unreal 项目中，只需将其拖入 Unreal 的 Content Browser（内容浏览器）。放置后，系统会自动创建一个 **Rive File**、**Rive Texture Object** 和 **Widget Blueprint** 资产。**RiveFile** 是一个包装器组件，它使用底层 `.riv` 文件的原始数据来配置要显示的 Rive 图形。它包含以下属性：

- **Artboard name (画板名称)**：要加载的[画板](/editor/fundamentals/artboards)。
- **State machine name (状态机名称)**：要播放的[状态机](/runtimes/state-machines)。
- **Rive fit type (Rive 适配类型)**：图形在可用空间中的适配方式（参见 [Fit](/runtimes/layout#fit)）。
- **Size (尺寸)**：绘制图形的底层渲染目标的大小。默认值等于在 Rive 编辑器中设置的画板尺寸。
- 其他纹理相关的属性。

需要理解的一个重要概念是，**RiveFile** 包含了 Rive 运行时使用的底层**画板**和**状态机**数据。

您可以在内容浏览器中双击 **RiveFile**，在 Details（细节）面板中查看其详细信息。您可以查看到文件中包含的所有**画板**、**状态机**、**触发器**和**输入**。

![Image](/images/game-runtimes/unreal/e1a414a2-6b5c-4b44-b5df-902867b329cf.webp)

## RiveTextureObjects

如果说 **RiveFile** 包含的是 Rive 资产的数据，那么 **RiveTextureObject** 则是负责运行动画和处理状态机的主体。每个 **RiveTextureObject** 都是独立运行的，即使它们是同一个 **RiveFile** 创建的。双击 **RiveTextureObject**，您可以检查并更改与其关联的各种数值：

![Image](/images/game-runtimes/unreal/23f34841-ad81-4388-b13b-5f0c115e5166.webp)

如果画板名称或状态机名称留空，将使用默认值。

::: info
请注意，**size (尺寸)** 属性决定了底层渲染纹理的宽度和高度。尺寸越大，质量越好，但内存占用也越高。
:::

> [观看视频](https://ucarecdn.com/b8a68ecf-dfee-45f6-be7e-81a67d5992f8/)

## 创建 Rive 挂件、创建 Rive 纹理对象以及重新导入

右键点击 **RiveFile** 可以访问常用操作：

![Image](/images/game-runtimes/unreal/5c8cc8e5-751b-4f80-a8c9-10566fc7255a.webp)

选择 **"Spawn Rive Widget Actor"** 将会在您的关卡（Level）中创建一个 Actor。运行关卡时，Rive 文件将以 UMG Widget 的形式显示。或者，您也可以通过将 **RiveFile** 资产直接拖放到关卡中来生成一个 Widget Actor。请注意，该 Actor 在场景中的位置并不影响其 UI 显示。

如果您需要默认之外的更多 **Rive Widget** 或 **Rive Texture Object**，可以从该菜单中创建。
您也可以**重新导入 (Reimport)** 您的 Rive 文件，以获取在 Unreal 之外对文件所做的更新。

## 创建材质资产

您可以轻松地从 **RiveTextureObject** 创建材质资产：

- **右键点击**并选择 **"Create Material"**。

创建的材质资产将使用所选的 **RiveTextureObject** 作为纹理。

![Image](/images/game-runtimes/unreal/27fe9af0-7bdb-46d9-bd5c-a07fadaca1fe.webp)

### 显示

该材质可以被添加到 3D 网格（mesh）上以在场景中渲染，就像其他任何材质一样。

![Image](/images/game-runtimes/unreal/30c746c2-42bc-4cb8-b4f0-c68c2a4d07e6.webp)

## 在 UMG 中添加 Rive

您可以轻松从 **RiveFile** 创建 Widget Blueprint（控件蓝图）：

- **右键点击** **RiveFile** 并选择 **"Create Rive Widget"**。

这将自动使用所选的 **RiveFile** 创建一个控件蓝图。

或者，可以从 **UMG Palette (调色板)** 中添加 **Rive Widget**，然后在 Details 面板的 "Rive Descriptor" 部分选择底层 **RiveFile** 作为引用。如果画板名称或状态机名称留空，将使用文件中的默认值。

::: info
请务必点击 **Compile (编译)** 以使图形可见。
:::

![Image](/images/game-runtimes/unreal/be465fa4-8531-4258-af51-55fe05f306cf.webp)

::: info
在此视图中，监听器（指针事件）是禁用的。这意味着 Rive 图形在 UMG 编辑器内是不可交互的。
:::

### 在蓝图中访问 RiveWidget

如果设置了 **Is Variable** 开关（默认已勾选），则可以通过蓝图访问 **RiveWidget**。

![Image](/images/game-runtimes/unreal/b7c73431-6c84-4597-aeea-75e3b76ecddb.webp)

### 显示

控件蓝图配置完成后，只需将其添加到视口（Viewport）即可。在这个示例中，我们创建了一个新的 Actor 并添加了以下内容。

![Image](/images/game-runtimes/unreal/1213cdfc-ef95-40a7-95f1-6a9fd071e764.webp)

一旦 Actor 被添加到嬉戏中并进入运行模式，动画将表现得与在 Rive 编辑器中完全一致。

有关高级用法，请参阅后续章节。

## 实例化 RiveTextureObject

例如，如果您的 `.riv` 文件包含多个不同的画板，或者您想要创建同一组画板和状态机组合的多个独立实例，您可以通过编辑器轻松实例化新的 **RiveTextureObject**：

- **右键点击** **RiveTextureObject** 并选择 **"Duplicate (复制)"**。

这些新实例使用相同的底层 `.riv` 文件数据；但它们是独立的实例，可以配置不同的可用属性，如画板、状态机、尺寸等。每个 **RiveTextureObject** 实例都包含一个唯一的**画板**和**状态机**实例，可以被独立推进和使用。

画板和状态机也可以通过蓝图手动实例化。后面的章节将演示如何执行此操作。

**如何在 Unreal 中使用导入的 Rive 对象**

> [观看视频](https://ucarecdn.com/346aeddd-db08-411d-903e-8d450b09f5bf/)
