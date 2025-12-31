---
title: '导出视频或静态设计'
description: ''
---

::: info
导出视频和图像功能仅在付费方案中提供。[了解更多关于我们的方案和定价](https://rive.app/pricing)。
:::

Rive 的核心是交互式动画，但有时您也需要 MP4、GIF 或 PNG 序列等传统格式。我们的云渲染器（Cloud Renderer）可以将任何设备变成超级计算机，让您在生成视频或设计文件时可以继续工作。

# 支持的格式

- H.264
- GIF
- PNG 序列
- SVG 序列
- WebM
- PNG
- SVG

# 如何进行渲染

所有渲染工作都是通过创建"渲染预设"（Rendering Presets），然后将这些预设添加到"渲染队列"（Render Queue）中来完成的。

## 创建预设

在选中画板的状态下，您会看到 "Render Presets"（渲染预设）选项。点击加号按钮将创建一个新的渲染预设。这可以在设计模式或动画模式下完成。

![Image](/images/editor/exporting/36d52cd8-b10b-444f-8231-a1dc74e7511c.webp)

在设计模式下创建渲染预设，您可以选择渲染 SVG 或 PNG。选中预设后，可以使用下拉菜单更改此选项。

![Image](/images/editor/exporting/d002a7fd-0c64-4adf-8ed9-bdd886c4ef6a.webp)

在动画模式下创建渲染预设，您可以选择渲染多种视频格式，包括 H.264、GIF、PNG/SVG 序列和 WebM。选中预设后，可以使用下拉菜单更改此选项。

![Image](https://ucarecdn.com/e826d407-8977-4ed7-9c02-f35a8a30441b/)

在渲染预设名称的左侧，您会发现额外的设置，允许您更改以下选项：

- 动画 (Animation)
- 格式 (Format)
- 帧率 (FPS)
- 时长 (Duration)
- 比特率 (Bit rate)
- 尺寸 (Size)

## 将预设添加到渲染队列

完成预设创建后，您需要将其添加到渲染队列。

可以通过点击渲染预设下方的 "Queue All"（全部入队）按钮，或者在单个渲染预设中找到 "Add to Render Queue"（添加到渲染队列）选项来完成此操作。

![Image](/images/editor/exporting/af23a14f-9a85-4bf6-af36-10a867fd8ca8.webp)

将项目添加到渲染后，您会看到一个新窗口出现。这个窗口就是"渲染队列"。在这里，您可以更改渲染选项，并开始渲染过程。

您始终可以通过文件菜单找到渲染器。

要开始渲染动画，请使用预设名称旁边的播放按钮，或者点击渲染队列顶部的双播放按钮。

![Image](/images/editor/exporting/137a5d20-809e-4344-9d92-8e41519c7b45.webp)

文件渲染完成后，您可以在云渲染器的 "Completed"（已完成）选项卡中下载它。

![Image](/images/editor/exporting/67a9f6ab-7738-4f6e-bce4-21518e01ca2a.webp)