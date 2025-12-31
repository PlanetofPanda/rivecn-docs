---
title: "画板 (Artboards)"
description: "画板是文件的基石。"
---

画板是您在设计模式和动画模式下创建作品的基石。它们是每一个层级结构的根节点，允许您定义场景的尺寸和背景颜色。您可以点击[舞台 (Stage)](../interface-overview/stage) 来创建无限个画板，但每个 Rive 文件至少包含一个画板。

![Artboard Pn](/images/artboard.png)

## 活动画板 (Active artboard)

活动画板在舞台上其名称旁边会显示一个 "Active"（动态）标签。您可以通过点击舞台上的某个画板或其任何子对象来激活该画板。请注意，编辑器的各个部分只会显示与活动画板相关联的内容。例如，树状图中只显示活动画板的层级结构。同样，时间轴中只显示属于活动画板的动画。

<img
  src="/images/active.gif"
  alt="Active Gi"
  title="Active Gi"
  style="width: 100%"
/>

活动画板在舞台上其名称旁边标有一个小点。您可以通过点击舞台上的画板或其子对象来切换活动状态。编辑器只会展示与当前活动画板相关的内容：例如，左侧树状区域仅展示活动画板的层级，时间轴区域也仅展示与该画板关联的动画列表。

## 默认状态机 (Default State Machine)

默认状态机是在使用工具栏中的播放按钮时将播放的状态机。除了设置默认状态机外，这还设置了开发者在 Rive 之外使用此文件时将看到的默认画板。

![Default SM Gi](/images/defaultSM.gif)

要更改默认状态机，请使用下拉菜单选择您想要使用的一个。

您可以通过按住 Shift 并按空格键，从设计模式下快速运行选定的状态机。

![Play Default Gi](/images/playDefault.gif)

## 创建画板

在创建任何图形之前，您首先需要创建一个画板。有两种创建画板的方法。

在新文件中，您会在舞台上看到用于定义画板尺寸或从预设中进行选择的选项。确定好属性后，点击 "Create Artboard"（创建画板）按钮。

![Create AB Gi](/images/create_AB.gif)

或者，您可以使用画板菜单中的"画板工具"，或使用快捷键 **A**。激活该工具后，在舞台上点击并拖拽以定义边界。您可以随时通过在[层级结构 (Hierarchy)](../interface-overview/hierarchy) 中选中画板并在[检查器 (Inspector)](../interface-overview/inspector) 中调整其属性来修改其大小和位置。

## 画板属性

每个画板在[检查器 (Inspector)](../interface-overview/inspector) 中都有各种可更改的属性。可以修改的属性包括在[舞台 (Stage)](../interface-overview/stage) 上的位置、大小、布局属性、填充颜色、原点（Origin）以及渲染预设（Render Presets）。

![Artboard Prop Pn](/images/artboard_prop.png)

## 位置 (Position)

画板在舞台上的位置由画板的位置属性控制。

## 尺寸和尺寸类型 (Size and Size Type)

默认情况下，画板被设置为由"宽度"（Width）和"高度"（Height）属性确定的固定大小。

![Wand H Pn](/images/WandH.png)

**链接图标 (Link Icon)**

与其他带有链接图标的属性类似，它可以用来锁定当前大小属性的比例。

![Link Pn](/images/link.png)

**尺寸类型 (Size Type)**

画板有两种尺寸模式：固定（Fixed）和抱合（Hug）。可以通过宽度和高度属性下方的下拉菜单切换它们。

![Size Type Pn](/images/size_type.png)

顾名思义，"固定"（Fixed）类型允许您手动定义画板尺寸并为其制作动画。

"抱合"（Hug）类型会让画板自动调整高度、宽度或两者，以适应其子内容。请注意，此选项仅在画板至少包含一个子布局对象时可用。

## 原点 (Origin)

画板的原点决定了画板内所有对象的坐标基准点。默认情况下，画板的原点为 X:0%, Y:0%。这些值将原点放置在画板的左上角。

![Origin Pn](/images/origin.png)

当您增加 X 或 Y 的值时，原点会向右（X轴）和向下（Y轴）偏移。

您通常不需要更改画板的原点，但如果您计划更改原点，最好在进行任何动画制作之前完成。在添加了动画关键帧之后更改原点，可能会因为原点位置的偏移而导致对象出现在错误的位置。

**组件原点 (Component Origin)**

重要的是要记住，"组件"会共享其源画板的原点。如果您计划对组件进行缩放或旋转等操作，更改原点将有助于使过程更简单。

如果您在添加动画后才想起更改原点，也始终可以将组件放入一个组中，这会为您提供同等级别的控制。

## 布局设置 (Layout Settings)

由于画板是所有其它对象都会被添加到其上的根对象，画板允许您添加和调整其布局属性。在[这里](/editor/layouts/layouts-overview)了解更多关于布局的信息。

![Layout Pn](/images/layout.png)

请注意，只有在向画板添加了一个或多个布局时，这些属性才会生效。

## 填充和描边 (Fill and Stroke)

与 Rive 中的其它对象一样，画板可以添加一个或多个填充或描边。为画板和为层级结构中的对象添加及自定义填充/描边的过程是完全相同的。

![Fillandstroke Pn](/images/fillandstroke.png)

在[这里](/editor/fundamentals/fill-and-stroke)了解更多关于填充和描边的信息。

## 渲染预设 (Render Presets)

选中画板允许您创建"渲染预设"，这些预设可用于渲染出 PNG 和 SVG 等静态图形，以及 PNG 序列和 MP4 等视频和动效文件。

![Render Pn](/images/render.png)

在[这里](/editor/exporting/exporting-for-video-and-static-design)了解更多关于创建渲染预设的信息。

## 已选颜色 (Selected Colors)

选中画板后，您可以查看、选择并调整与画板上每个对象关联的所有颜色。

![Select Color Pn](/images/selectColor.png)
