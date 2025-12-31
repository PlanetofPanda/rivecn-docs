---
title: '导入资产 (Importing Assets)'
description: '通过将资产拖放到 Rive 编辑器中来导入它们。您可以导入 SVG、JSON、PNG、PSD 和 JPG 格式。'
---

<YouTube videoId="vH9UHmdVwx4" />

<YouTube videoId="hPbgPGJNE78" />

## 资产面板 (Assets Panel)

将图形拖入后，它们会出现在编辑器 UI 左侧的"资产面板"中。将它们拖放到画板上即可开始使用。

## 导入自定义字体

对于 Pro 客户，您可以添加自定义字体以配合常用的文本工具。将您的 `.OTF` 或 `.TTF` 文件拖入编辑器，或者点击"字体"（Font）部分旁边的加号按钮。

## 更新图像资产

图像导入后，您仍可以对其进行更新。

操作方法是在资产面板中选中该图像，其属性将显示在检查器中。对于位图资产（PNG, JPG, PSD），会显示一个 "Replace"（替换）按钮。

点击替换按钮，根据提示选择更新后的图像。您会发现这将更新文件中该图形的所有实例。

## 支持的格式

Rive 支持导入 SVG（见下文限制）、JSON、PNG、PSD 和 JPG 格式。

#### 直接从 Figma 复制粘贴

您可以使用 "Copy as SVG"（复制为 SVG），然后直接将其粘贴到 Rive 编辑器中。

![Image](https://ucarecdn.com/ec7e980c-ea0a-4147-96df-f29b7dc2be2c/)

#### 导入 Lottie 文件

::: info
导入 Lottie 文件功能仅在 Enterprise 方案中提供。[了解更多关于我们的方案和定价](https://rive.app/pricing)。

此工作流可能会引入因客户设置而异的风险。在没有我们指导的情况下实施这些功能可能会导致性能、安全或可靠性方面的问题。帮助客户评估和降低这些风险需要大量的时间和精力，因此这种级别的支持仅在 Enterprise 方案中提供。
:::

您可以将 Lottie 动画导入到 Rive 中。首先，将您的 Lottie JSON 文件拖放到 Rive 编辑器中，它将被添加到您的资产面板。

![Image](/images/editor/fundamentals/12a13a71-d5d0-4ed2-a1b1-2fe49bbbb9df.webp)

之后，您可以将其拖入现有的画板，或拖入空白区域以创建一个新画板。

![Image](/images/editor/fundamentals/49c02a1d-18d9-4937-8ea1-bad52ba9ce4e.webp)

::: info
如果您在运行时遇到问题，可能需要将任何 `Plus`、`Add` 或 `Hard Mix` 图层混合模式转换为 Rive 运行时支持的混合模式。
:::

## SVG 使用技巧

SVG 是一种非常灵活且功能丰富的格式。我们的目标是尽力支持 SVG，但目前仍有一些功能不支持。

将文件导出为带有"内联样式"（inline style）而非 CSS 的 SVG，对我们的导入器效果最好。

从其它设计工具导出时，请寻找在导出时保留形状 ID 和名称（Include ID / Name）的选项。这将确保您导入的文件保留相同的结构和图层名称。大多数工具都有此选项，如下面的 Figma 示例所示。

![Image](/images/editor/fundamentals/9a2b2c37-c330-4323-a4c6-9928fbac8d94.webp)

### Photoshop

从 Photoshop 导出时，请确保只使用矢量图层。不要将任何内容转换或拼合为位图。

### Illustrator

从 Illustrator 使用 "Save As"（另存为）导出 SVG 时，请在 SVG 选项中将 CSS 属性（CSS Properties）设置为 "Presentation Attributes"（呈现场景属性），而不是默认设置。同样，使用 "Export As"（导出为）导出时，也要将样式（Styling）设置为 "Presentation Attributes"。请注意，直接从 Illustrator 复制时使用的是 "Export As" 的 SVG 选项，因此如果您要从 Illustrator 复制粘贴到 Rive，请务必在 SVG 选项中将样式设置为 "Presentation Attributes"。

此外，禁用 "Preserve Illustrator Editing Capabilities"（保留 Illustrator 编辑功能）选项，因为这会使您的文件变得非常大，并添加了一些导入器无法识别的数据。

### 已知问题

- 内嵌图像会被忽略。我们计划在未来实现此功能。
- 渐变变换（Gradient transforms）会被忽略。
  - 目前我们无法在各个运行时提供相同程度的支持，因此不支持此类变换。
  - 但我们支持线性和径向渐变，这可以涵盖大多数用例。
- Rive 没有点 (pt) 或毫米 (mm) 的尺寸概念。使用 pt 或 mm 单位的 SVG 会将其值转换为像素 (px)。点（Points）转换为 1.33 px，毫米（Millimeters）转换为 3.78 px。
- SVG 提供了 `inherit` 关键字让描边和填充继承祖先的颜色。Rive 目前不支持此项，任何继承的颜色将默认为白色。
- 其它不支持的 SVG 特性：
  - `stroke-dasharray` - 您可能会看到实线描边。
  - `mask` - 我们会将其视为剪裁（clipping）。
  - `filter`（滤镜）
  - `skew`（倾斜）