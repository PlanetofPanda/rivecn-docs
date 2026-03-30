---
title: "画板 (Artboards) - Rive 编辑器"
description: "基础概念 (Fundamentals) 画板是在设计模式和动画模式下进行创作的基础。它们是每一个层级结构的根节点，允许你定义场景的尺寸和背景颜色。你可以在 舞台 (Stage) 上创建无数个画板，但每个 Rive 文件至少包含一个画板。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 基础概念, 画板
---

基础概念 (Fundamentals)

# 画板 (Artboards)

画板是文件的基石。

画板是在设计模式和动画模式下进行创作的基础。它们是每一个层级结构的根节点，允许你定义场景的尺寸和背景颜色。你可以在 [舞台 (Stage)](../interface-overview/stage.md) 上创建无数个画板，但每个 Rive 文件至少包含一个画板。
![画板示例](https://help.rive.app/images/artboard.png)

## [​](#​active-artboard) 活动画板 (Active artboard)

活动画板在舞台上其名称旁带有一个“Active”标签。你可以通过点击画板本身或其在舞台上的任何子级来激活它。请注意，编辑器的各个面板只会显示与当前活动画板关联的内容。例如，层级树中仅显示活动画板的层级；同样，时间轴中也仅显示引用了活动画板的动画。
![活动画板 GIF](https://help.rive.app/images/active.gif)
舞台上活动画板的名称旁边会显示一个点（或 Active 标签）。点击画板或其子级即可激活。

## [​](#default-state-machine) 默认状态机 (Default State Machine)

默认状态机是使用工具栏中的“播放 (Play)”按钮时将运行的状态机。除了设置默认状态机外，这还设定了开发者在 Rive 之外使用此文件时将看到的默认画板。
![默认状态机 GIF](https://help.rive.app/images/defaultSM.gif)
要更改默认状态机，请使用下拉菜单进行选择。
你可以在设计模式下通过按住 `Shift` 并按 `空格键` 来快速播放所选的状态机。
![快速播放 GIF](https://help.rive.app/images/playDefault.gif)

## [​](#​creating-an-artboard) 创建画板 (Creating an artboard)

在创建任何图形之前，你首先需要创建一个画板。有两种创建画板的方法：
1. 在新文件中，你会看到舞台上的选项，可以手动定义画板尺寸，或者从预设中选择。确定属性后，点击 **Create Artboard** 按钮。
![创建画板示例 GIF](https://help.rive.app/images/create_AB.gif)
2. 此外，你可以使用画板工具（位于画板菜单中，或使用快捷键 `A`）。在工具激活状态下，点击并拖动以定义边界。你可以随时通过在 [层级面板 (Hierarchy)](../interface-overview/hierarchy.md) 中选择画板，并在 [检查器 (Inspector)](../interface-overview/inspector.md) 中调整其大小和位置。

## [​](#artboard-properties) 画板属性 (Artboard properties)

每个画板都有各种可以在 [检查器 (Inspector)](../interface-overview/inspector.md) 中更改的属性。属性包括画板在 [舞台 (Stage)](../interface-overview/stage.md) 上的位置、尺寸、布局属性、填充颜色、原点和渲染预设。
![画板属性面板](https://help.rive.app/images/artboard_prop.png)

## [​](#position) **位置 (Position)**

画板在舞台上的位置由画板的位置属性控制。

## [​](#size-and-size-type) 尺寸与尺寸类型 (Size and Size Type)

默认情况下，画板被设置为固定尺寸，该尺寸由“宽度 (Width)”和“高度 (Height)”属性决定。
![宽高属性](https://help.rive.app/images/WandH.png)
**链接图标 (Link Icon)**
与其他带链接图标的属性类似，它可以用来锁定当前的宽高比。
![链接图标](https://help.rive.app/images/link.png)
**尺寸类型 (Size Type)**
画板有两种尺寸模式：固定 (Fixed) 和包裹 (Hug)。可以通过宽高属性下的下拉菜单进行切换。
![尺寸类型下拉框](https://help.rive.app/images/size_type.png)
- **固定 (Fixed)** 类型允许你定义并为画板的尺寸属性制作动画。
- **包裹 (Hug)** 类型将使画板自动根据其子级的大小来调整其宽度、高度或两者。请注意，此选项仅在画板至少包含一个子级“布局 (Layout)”对象时才可用。

## [​](#origin) 原点 (Origin)

画板的原点决定了与该画板关联的所有对象的测量起点。默认情况下，画板的原点为 X:0%, Y:0%。这些值将原点置于画板的左上角。
![原点设置](https://help.rive.app/images/origin.png)
当你增加 X 或 Y 的值时，原点会向右（X 轴）和向下（Y 轴）偏移。
通常情况下你不需要更改画板的原点，但如果你打算更改，最好在开始任何动画工作之前完成。在添加动画关键帧后更改原点可能会导致对象由于原点偏移而偏移出原有位置。

**组件原点 (Component Origin)**
重要的是要记住，组件 (Component) 会继承其源画板的原点。如果你打算对组件进行缩放或旋转等操作，提前更改原点会使过程更简单。

## [​](#layout-settings) 布局设置 (Layout Settings)

由于画板是所有其他对象的根级对象，因此画板允许你添加和调整其布局属性。在 [此处](/editor/layouts/overview.md) 阅读有关布局的更多信息。
![布局设置面板](https://help.rive.app/images/layout.png)

## [​](#fill-and-stroke) 填充与描边 (Fill and Stroke)

与 Rive 中的其他对象一样，画板可以添加一个或多个填充或描边。添加和自定义填充/描边的过程与层级中的其他对象完全相同。
![画板填充与描边](https://help.rive.app/images/fillandstroke.png)
在 [此处](/editor/fundamentals/fill-and-stroke.md) 阅读有关填充与描边的更多信息。

## [​](#render-presets) 渲染预设 (Render Presets)

选择画板后，你可以创建“渲染预设”，用于渲染出静态图像（如 PNG 和 SVG）以及视频和动图文件（如 PNG 序列和 MP4）。
![渲染按钮面板](https://help.rive.app/images/render.png)
在 [此处](https://help.rive.app/editor/exporting/exporting-for-video-and-static-design) 阅读有关创建渲染预设的更多信息。

## [​](#selected-colors) 选定颜色 (Selected Colors)

选中画板后，你可以查看、定位并调整与该画板上所有对象关联的所有颜色。
![选定颜色面板](https://help.rive.app/images/selectColor.png)

[设计与动画模式 (Design vs Animate Mode)](/editor/fundamentals/design-vs-animate-mode.md)[组件 (Components)](/editor/fundamentals/components.md)