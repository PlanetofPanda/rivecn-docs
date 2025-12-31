---
title: '加载资产 (Loading Assets)'
description: 'Rive Unity 中的带外资产（Out-of-band assets）。'
---

更多有关带外加载资产的信息，请参阅运行时文档。

- [加载资产 (Loading Assets)](/runtimes/loading-assets)
  - 在运行时动态加载并替换资产。

::: info
目前 Rive Unity 仅支持**嵌入 (embedded)** 和**引用 (referenced)** 资产；目前不支持**托管 (hosted)** 资产。
:::

::: info
目前仅支持 **png** 和 **jpeg** 格式的图像资产。对 **webp** 的支持正在开发中。
:::

## 资产导出选项 (Asset export options)

在 Rive 编辑器中，您可以在**资产面板 (Asset Panel)** 中选择一个资产（例如图像或字体），并为该资产配置导出选项。一个 Rive 文件可以包含**嵌入**、**引用**和**托管**资产的混合。

![Image](/images/game-runtimes/unity/a108fa8e-df31-43fb-aabc-5e74afbda52d.webp)

**嵌入 (Embedded)** 资产直接包含在导出的 `.riv` 二进制文件中，而**引用 (Referenced)** 资产则单独打包，必须在运行时进行链接。使用引用资产可以支持您在多个动画文件或嬉戏的其他部分重用同一个资产。这减小了单个 `.riv` 文件的体积，并减少了运行使用共享资产的动画所需的资源开销。

### 嵌入资产 (Embedded Assets)

任何被标记为嵌入的资产都会在加载时自动包含在内，您无需进行任何额外配置。

![Image](/images/game-runtimes/unity/56437853-0d8b-4e62-87ec-3205da02ea52.webp)

通过在 Unity 中选择 `.riv` 文件，您可以在 **Unity Inspector** 中看到该文件的资产信息。上图显示了一个名为 "Roboto Flex" 的嵌入字体，其大小为 1MB。

### 引用资产 (Referenced Assets)

引用资产需要在运行时进行链接。rive-unity 软件包会自动通过尝试在同一目录下寻找符合正确的 **名称 (Name)** + **ID** 组合的文件来处理链接。如果找到了符合条件的资产，该资产会自动转换为 Rive 资产并完成链接。

::: info
为了让资产能被发现并链接，`.riv` 文件和资产文件必须位于同一个 Unity 目录中。
:::

#### 让我们看一个例子

从 Rive 编辑器导出运行时文件时，`.riv` 文件和引用的资产会被打包在一个 zip 文件中。

![Image](/images/game-runtimes/unity/212a16d7-6686-4722-9d9a-f32a49e4cbd2.webp)

解压后的文件中包含一个 `acqua_text.riv` 文件和一个名为 `Roboto Flex-887377.ttf` 的引用资产。引用资产的文件名拆解如下：

- **名称 (Name)：** Roboto Flex
- **ID：** 887377

同时选中这两个文件（或整个文件夹）并拖入 **Unity Assets** 文件夹，如果 **名称** + **ID** 与 `.riv` 文件的预期相符，系统将自动链接该嵌入字体文件。

![Image](/images/game-runtimes/unity/0bb5c521-b8dc-4ac7-9cd1-6fdffb121750.webp)

在 Rive 文件的 **Unity Inspector** 中，您可以注意到 "Roboto Flex" 字体的 **Asset** 已经链接成功，并且 **Roboto Flex** 字体文件也已被转换为 Rive 资产。

由于动画文件和字体文件是同时添加的，此例中自动完成了转换和链接。或者，您也可以先添加资产文件再添加 `.riv` 文件，结果是一样的。

如果资产是在 `.riv` 文件之后添加的，您可能需要手动重新导入 `.riv` 文件：通过**右键点击**它并选择 **Reimport**（重新导入）。

![Image](/images/game-runtimes/unity/04ba8d2c-80cc-41ef-9cdd-f940d6897fbc.webp)

#### 选择导入器 (Selecting an importer)

或者，您也可以通过在检查器中选择对应的选项，为资产手动设置所需的导入器（Importer）。这意味着您可以手动将一个资产转成 Rive 资产，或者将错误转换的资产改回原样。

![Image](/images/game-runtimes/unity/d65592e9-22a4-433f-b4f3-4ca8e72577aa.webp)

#### 共享资产 (Sharing Assets)

在多个 Rive 文件中重用同一个资产，在大导出时应该会产生一致的 **名称** + **ID**。

如果在 Unity 中导入时未找到完全匹配的资产，系统会回退到仅匹配**名称**的文件转换和链接。如果您想对资产导入有更多控制，可以选择使用这种方法，因为资产名称在 Rive 编辑器中是可以重命名的。

![Image](/images/game-runtimes/unity/a7618b96-a123-4bb9-b604-57ec2c3adc1d.webp)