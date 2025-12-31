---
title: "加载资产 (Loading Assets)"
description: "Rive Unreal 中的带外资产 (Out-of-band assets)。"
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

更多有关带外加载资产的信息，请参阅[运行时文档](/runtimes/loading-assets)。

::: info
目前 Rive Unreal 仅支持**嵌入 (embedded)** 和**引用 (referenced)** 资产；目前不支持**托管 (hosted)** 资产。
:::

::: info
目前仅支持 **png** 格式的图像资产。对 **webp** 和 **jpeg** 的支持正在开发中。
:::

## 资产导出选项 (Asset export options)

在 Rive 编辑器中，您可以在**资产面板 (Asset Panel)** 中选择一个资产（例如图像或字体），并为该资产配置导出选项。一个 Rive 文件可以包含**嵌入**、**引用**和**托管**资产的混合。

![Image](/images/game-runtimes/unreal/e716e2a5-b846-4140-b2a3-5675a1318f0b.webp)

**嵌入 (Embedded)** 资产直接包含在导出的 `.riv` 二进制文件中，而**引用 (Referenced)** 资产则单独打包，必须在运行时进行链接。使用引用资产可以支持您在多个 Rive 文件中重用同一个资产。这减小了单个 `.riv` 文件的体积，并减少了运行使用共享资产的动画所需的资源开销。

### 嵌入资产 (Embedded Assets)

任何被标记为嵌入的资产都会包含在 `.riv` 二进制文件内并自动加载。您无需在 Unreal 中进行任何额外配置。

### 引用资产 (Referenced Assets)

引用资产需要在运行时进行链接。rive-unreal 软件包会自动处理链接过程。

当您导入 Rive 文件时，插件会自动扫描磁盘，寻找符合正确的 **名称 (Name)** + **ID** 组合的任何引用资产，自动包含它们，并将其作为特殊资产以“原始（raw）”形式存储在 Unreal 内部并完成链接。通过这种方式，多个 `.riv` 文件可以共用同一组底层资产（字体、图像和音频）。

**让我们看一个例子**

下方是一个解压出来的 Rive 文件文件夹。文件名为 `rive_1.riv`，它使用了一个引用的字体 `inter-594377.ttf`。

![Image](/images/game-runtimes/unreal/14b577a8-6fb9-4360-a421-756e77934f78.webp)

这是另一个名为 `rive_2.riv` 的 Rive 文件，它使用了相同的字体。

![Image](/images/game-runtimes/unreal/afd7051b-ad61-4c17-be87-898eae995c05.webp)

首先，将 `rive_1.riv` 拖入 Unreal：

::: warning
仅拖入 `riv` 文件。不要拖入资产文件。<br />
  资产会自动从磁盘导入。
:::

![Image](/images/game-runtimes/unreal/fb796a61-17d8-47f5-9357-97a49da0e35a.webp)

该引用资产被导入为一个 `RiveAsset`，且 `RiveFile` 可以像往常一样使用。

接着，拖入 `rive_2.riv`：

![Image](/images/game-runtimes/unreal/d151f7f7-d3d6-42e3-9119-7b263eb976ed.webp)

现在我们有了两个指向同一个字体资产的 `RiveFile` 资产。

如果在 Unreal 导入时未找到匹配的资产（**名称** + **ID**），系统会回退到仅匹配**名称**的文件转换和链接。如果您想对资产导入有更多控制，可以选择使用这种方法，因为资产名称在 Rive 编辑器中是可以重命名的。

![Image](/images/game-runtimes/unreal/69c62b2a-2a82-4422-ba5c-60df9f792574.webp)