---
title: "形状与路径概览 (Shapes and Paths Overview)"
description: "Rive 允许您使用过程形状或自定义形状来创建、编辑矢量图形并为其制作动画。这些图形通过形状层（shape layers）和路径层（path layers）结合来定义，Rive 将这些层级公开，以便为您的设计和动画提供更大的灵活性和控制力。"
---

要了解更多关于形状层和路径层的信息，请观看我们的视频，或阅读下文。

<YouTube videoId="KunkCnbkTsg" />

## 形状层 (Shape layer)

![Shape Layer](/images/editor/fundamentals/shape-and-path-shapelayer.png)

Rive 中的矢量图形是在形状层上渲染的。形状层定义了形状的风格，允许您自定义填充（Fill）和描边（Stroke）。

![Fill and Stroke](/images/editor/fundamentals/shape-and-path-fill.png)

## 路径层 (Path layer)

![Path Layer](/images/editor/fundamentals/shape-and-path-pathlayer.gif)

矢量图形的实际形状是由路径（或多个路径）定义的。在 Rive 中展开形状层将显示它所使用的路径。

![Move Path](/images/editor/fundamentals/shape-and-path-move.gif)

您可以通过将现有路径拖放到目标形状层上，从而向该形状添加新路径。

### 路径层属性

路径层会显示与其类型相关的属性。了解更多关于[过程形状 (Procedural Shapes)](/editor/fundamentals/procedural-shapes)的信息。

![Path layer Properties](/images/editor/fundamentals/shape-and-path-properties.png)

## Enter 与 Esc 快捷键

使用 **Enter** 键可在层级结构中快速向下导航。如果您选中了一个形状，这可以让您快速选中其子级路径层。

使用 **Esc** 键可在层级结构中快速向上导航。如果您选中了一个路径，这可以让您快速选中其父级形状层。