---
title: "导入资源 (Importing Assets) - Rive 编辑器"
description: "基础概念 (Fundamentals) 通过将素材拖放到 Rive 编辑器中来导入你的资源。你可以导入 SVG、JSON、PNG、PSD 和 JPG 格式。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 基础概念, 导入资源
---

基础概念 (Fundamentals)

# 导入资源 (Importing Assets)

通过将素材拖放到 Rive 编辑器中来导入你的资源。你可以导入 SVG、JSON、PNG、PSD 和 JPG 格式。

## [​](#assets-panel) 资产面板 (Assets Panel)

拖入图形后，它们会出现在编辑器界面左侧的“资产面板 (Assets Panel)”中。将它们拖放到画板上即可开始使用。

## [​](#importing-custom-font) 导入自定义字体 (Importing Custom Font)

对于专业版 (Pro) 客户，你可以添加自定义字体以配合文本工具使用。将 `.OTF` 或 `.TTF` 文件拖入编辑器，或者点击“字体 (Font)”部分旁边的加号按钮。

## [​](#updating-image-assets) 更新图像资源 (Updating image assets)

你可以在图像导入后对其进行更新。
在资产面板中选择该图像；资产属性将显示在检查器 (Inspector) 中，对于位图资产（PNG, JPG, PSD），会显示一个“替换 (Replace)”按钮。
点击替换按钮，根据提示选择更新后的图像。你会发现这会更新文件中使用该图像的所有实例。

## [​](#supported-formats) 支持的格式 (Supported formats)

Rive 支持导入 SVG（见下文限制）、JSON、PNG、PSD 和 JPG 格式。

#### [​](#copy-and-paste-directly-from-figma) 直接从 Figma 复制并粘贴

你可以使用 Figma 的“copy as SVG”功能并将其直接粘贴到 Rive 编辑器中。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: Figma 粘贴示例)

#### [​](#import-lottie-file) 导入 Lottie 文件

导入 Lottie 文件功能在企业版 (Enterprise) 方案中提供。[了解更多关于我们的方案和定价的信息](https://rive.app/pricing)。

你可以将 Lottie 动画导入到 Rive 中。开始前，将 Lottie JSON 文件拖入 Rive 编辑器。这会将其添加到你的资产面板。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: Lottie 资产面板示例)
然后，你可以将其拖入现有的画板，或者拖入空白区域以创建一个新画板。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: Lottie 拖入舞台示例)

如果你在运行时遇到问题，可能需要将任何 `Plus`、`Add` 或 `Hard Mix` 图层混合模式更改为 Rive 运行时支持的混合模式。

## [​](#svg-tips) SVG 技巧 (SVG Tips)

SVG 是一种非常灵活且功能丰富的格式。我们致力于尽可能地支持 SVG；然而，目前阶段仍有一些功能不受支持。
- 导出带有内联样式 (inline style) 而非 CSS 的 SVG 文件对我们的导入器效果最好。
- 从其他设计工具导出时，请勾选保留形状 ID 和名称的选项。这能确保导入的文件保留相同的结构和图层名称。大多数工具（如 Figma）都有此选项。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: Figma 导出设置)

### [​](#photoshop) Photoshop

从 Photoshop 导出时，请确保仅使用矢量图层。不要将任何内容转换或拼合为位图。

### [​](#illustrator) Illustrator

在使用“另存为”从 Illustrator 导出 SVG 时，请将 SVG 选项中的 CSS 属性设置为“呈现属性 (Presentation Attributes)”而非默认设置。同样，使用“导出为”时也要进行此设置。请注意，Illustrator 在直接复制时也会使用“导出为”的设置。
此外，请禁用“保留 Illustrator 编辑能力”选项，因为它会使文件体积大大增加并添加导入器无法识别的多余数据。

### [​](#known-issues) 已知问题 (Known Issues)

- **嵌入图像**会被忽略。我们计划在未来实现此支持。
- **渐变变换 (Gradient transforms)** 会被忽略。
  - 目前我们无法在所有运行时中提供同等支持，因此暂不支持。
  - 但我们支持线性 (linear) 和径向 (radial) 渐变，这可以覆盖大部分使用场景。
- Rive 没有点 (pt) 或毫米 (mm) 的概念。使用 pt 或 mm 尺寸的 SVG 将被转换为像素 (px) 值。点转换为 1.33 px，毫米转换为 3.78 px。
- SVG 提供的 `inherit`（继承）属性不受支持，任何继承的颜色默认为白色。
- 其他不受支持的 SVG 功能：
  - `stroke-dasharray` - 你可能会看到实线。
  - `mask` (遮罩) - 我们将其视为裁剪 (clipping)。
  - `filter` (滤镜)
  - `skew` (倾斜)

[原点与冻结 (Freeze and Origin)](/editor/fundamentals/origin-freeze.md)[版本历史 (Revision History)](https://help.rive.app/editor/fundamentals/revision-history)