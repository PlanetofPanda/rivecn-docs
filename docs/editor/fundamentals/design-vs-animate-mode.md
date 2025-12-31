---
title: "设计模式对比动画模式"
description: "Rive 编辑器具有设计（Design）和动画（Animate）两种不同的模式。在模式之间切换会改变界面，以显示相应的工具和选项。"
---

## 设计模式 (Design Mode)

使用设计模式来为动画准备图形。在这里，您可以使用 Rive 的[工具](../interface-overview/toolbar)设计您自己的图形，从[其他软件导入图形](./importing-assets)，或者使用[骨骼](../manipulating-shapes/bones)、[变换空间](./transform-spaces)、[布局](https://rive.app/docs/editor/layouts/layouts-overview)、[摇杆 (Joysticks)](https://rive.app/docs/editor/manipulating-shapes/joysticks) 和[约束](../constraints/)来绑定您的图形。

![Image](/images/editor/fundamentals/Design_Mode.png)

设计模式是任何未创建动画的文件的默认模式。之所以存在这种模式，是因为 Rive 允许您为单个画板附加多个动画，因此您需要一个地方来设置和创建这些图形基础。

## 动画模式 (Animate Mode)

使用[动画模式](../animate-mode/)来为您的画板创建所有[状态 (States)](https://rive.app/docs/editor/state-machine/states)和[状态机 (State Machine)](../state-machine/)。

当您切换到动画模式时，UI 会更新以显示与[活动画板](./artboards#active-artboard)相关联的时间轴和状态机列表。[检查器 (Inspector)](https://rive.app/docs/editor/interface-overview/inspector) 也会更新，在任何可以制作动画的属性旁边显示关键帧按钮。

![Animate Mode Pn](/images/editor/fundamentals/Animate_Mode.png)

从动画列表中选择任何动画将调出时间轴视图，而选择状态机则会将时间轴替换为图表视图。

![State Machine Pn](/images/editor/fundamentals/State_Machine.png)

## 在动画模式下创建资产

虽然模式是分开的，但图形可以在两种模式下创建和修改，但记住以下几点很重要：

1. 如果选中了某个时间轴，则可以创建图形（无论是过程形状还是自定义路径）。虽然可以创建图形，但对路径、形状或其属性的任何更改都会自动在时间轴上设置关键帧。因此，我们建议不要在选中时间轴时创建任何资产。
2. 如果选中了状态机，动画模式的工作方式就会像设计模式一样。资产创建、绑定和其他设计更改不会自动设置关键帧。这让您可以进行任何您想要的涉及设计的更改而无需在不同模式间切换，不过由于图表占用了空间，您会损失一些屏幕视野。我们建议在设计模式下进行大规模更改，而在动画模式下仅添加命中区域或布局等快速调整。