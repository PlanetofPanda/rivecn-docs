基础知识

# 设计 vs 动画模式 (Design vs Animate Mode)

Rive 编辑器有两种不同的模式：设计 (Design) 和动画 (Animate)。在模式之间切换会更改界面，以显示相应的工具和选项。

## [​](#design-mode) 设计模式 (Design Mode)

使用设计模式为动画准备图形。在这里，你可以使用 Rive 的 [工具](../interface-overview/toolbar.md) 设计自己的图形、[从其他软件导入图形](./importing-assets.md)，或者使用 [骨骼 (Bones)](../manipulating-shapes/bones.md)、[变换空间 (Transform Spaces)](./transform-spaces)、[布局 (Layouts)](/editor/layouts/overview.md)、[摇杆 (Joysticks)](/editor/manipulating-shapes/joysticks.md) 和 [约束 (Constraints)](../constraints/) 来绑定 (Rig) 你的图形。
![设计模式示例](images/Design_Mode.png)
设计模式是任何尚未创建动画的文件的默认模式。该模式存在的原因是 Rive 允许你为一个画板附加多个动画，因此你需要一个地方来设置和创建这些图形。

## [​](#animate-mode) 动画模式 (Animate Mode)

使用 [动画模式](../animate-mode/) 为你的画板创建所有的 [状态 (States)](/editor/state-machine/states.md) 和 [状态机 (State Machine)](../state-machine/)。
当你切换到动画模式时，UI 会更新以显示与 [活动画板 (Active Artboard)](./artboards.md#active-artboard) 关联的时间轴 (Timelines) 和状态机列表。[检查器 (Inspector)](/editor/interface-overview/inspector.md) 也会更新，在任何可以制作动画的属性旁边显示关键帧按钮。
![动画模式 Pn](images/Animate_Mode.png)
从动画列表中选择任何动画将调出时间轴视图，而选择状态机将用图表视图取代时间轴。
![状态机视图 Pn](images/State_Machine.png)

## [​](#creating-assets-in-animate-mode) 在动画模式下创建资产

虽然模式是分开的，但图形可以在两种模式下创建和修改，但记住以下几点很重要：

1. 如果选中了“时间轴 (Timeline)”，则可以创建图形（包括参数化路径和自定义路径）。虽然可以创建图形，但对路径、形状或其属性的任何更改都会在时间轴上自动记录关键帧。因此，我们建议在选中时间轴时不要创建任何资产。
2. 如果选中了“状态机 (State Machine)”，动画模式的工作方式就像设计模式一样。资产创建、绑定和其他设计更改不会自动记录关键帧。这让你可以直接进行任何想要的更改，而不必在不同模式之间切换，尽管由于图表的存在，你会损失一些屏幕空间。我们建议在设计模式下进行大规模更改，而仅在动画模式下添加诸如点击区域 (Hitboxes) 或布局等快速调整。