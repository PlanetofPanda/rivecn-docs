---
title: '过渡 (Transitions)'
description: ''
---

过渡（Transitions）为状态机提供了逻辑路径。过渡包含许多需要考虑的配置属性，我们将在下文详细介绍。请注意，我们也会简要讨论"输入"（Inputs），因此请务必在[这里](/editor/state-machine/inputs)了解更多相关信息。

## 创建新过渡 (Creating a new Transition)

要创建过渡，请将鼠标悬停在您想要离开的状态节点附近，直到看到一个椭圆出现。点击并拖动该椭圆到您想要过渡到的目标状态。连接两个状态后，您会看到一个带有箭头图标的椭圆，表示过渡的方向。

![Creating a transition](https://ucarecdn.com/4838deb6-8760-468a-b798-f33e1f0e3b2e/)

请注意，您可以从一个状态向另一个状态创建多个过渡。每个过渡都可以要求满足不同的条件，从而触发过渡，这使您能够创建"或"（or）逻辑的辅助条件。

![Creating an "or" transition](https://ucarecdn.com/373c16da-c3b4-4da8-bd01-bb153fea6c2a/)

## 配置过渡 (Configuring a Transition)

添加过渡后，选中方向指示器即可配置该过渡。过渡面板分为三个不同部分：过渡属性、条件和插值。

### 过渡属性 (Transition properties)

过渡属性允许您自定义过渡发生的具体方式。

![Transition properties](/images/editor/state-machine/9b35e6bf-8e06-4df9-b211-10d3e1150435.webp)

### 时长 (Duration)

时长属性描述了完成一次过渡所需的时间。

默认情况下时长设置为 0，这意味着过渡是瞬间发生的。因此当我们在这两个动画之间切换时，物体看起来像是从画板的一边瞬间移动到了另一边。

![Duration of 0ms](https://ucarecdn.com/1e341e26-ece2-466e-b19f-5fa03b34c3b9/)

如果我们增加时长，数值越高，过渡所需的时间就越长。

![Duration of 500ms](https://ucarecdn.com/9a1c524a-2179-4385-8765-5ab0eb75ffec/)

在某种程度上，过渡本身也表现为一个动画：起始属性（来自状态机离开的前一个状态）将向结束属性（状态机进入的新状态的起始属性）进行插值。如果起始属性是时间轴上的第一个关键帧，结束属性是第二个关键帧，那么时长就是这两个关键帧之间的时间间隔。实际上过渡比这更复杂，但这样理解有助于您诊断状态机出现的问题。

![Interpolation on a Transition](https://ucarecdn.com/c1801cb1-13bf-44be-9da0-dc2eb7f5e404/)

就像时间轴上的关键帧一样，我们可以更改插值方式，我们将在下文进一步讨论。

### 退出时间 (Exit Time)

退出时间告诉状态机在过渡之前必须播放多少当前状态的内容。

默认情况下，退出时间是不勾选的。如果您想启用退出时间，请点击复选框。启用后，您可以使用具体的时间值或百分比。

![Using Exit Time](https://ucarecdn.com/4424da18-50d8-4aea-9371-7b57b176a12e/)

例如，如果您希望状态机在完整播放完当前动画后再进行过渡，您可以输入动画的时长或使用 100%。

### 退出时暂停 (Pause when exiting)

"Pause When Exiting" 选项在过渡期间暂停您正在离开的前一个状态动画。

![Pause when exiting](https://ucarecdn.com/6584d924-13f7-4012-b590-d16549791638/)

正如我们在时长部分讨论的，当过渡发生时，第一个状态的属性会与下一个状态的第一个关键帧混合。实际上，在过渡发生的同时，状态机离开的那个动画仍在继续播放。

### 条件 (Conditions)

条件是过渡的规则。如果没有条件，我们的过渡将一直触发，状态机可能会看起来闪烁不定，或者只播放一个动画。条件要求我们定义一些输入，您可以在[这里](/editor/state-machine/inputs)了解更多。

![Conditions](/images/editor/state-machine/a5336985-e1d4-4892-a04a-deee93e6a8b1.webp)

#### 添加新条件 (Adding a new condition)

要为过渡添加新条件，请点击 "Conditions" 部分旁边的加号按钮。

![Image](https://ucarecdn.com/7a2b887e-c69d-4dd4-943b-de85d76b3a42/)

添加新条件：

每个新条件都会有一个下拉菜单，显示您添加到状态机的所有输入。配置选项将根据您选择的输入类型而有所不同。

请注意，您可以为一个过渡添加多个条件，以创建"且"（and）逻辑。

**配置布尔值 (Boolean)**

配置布尔值时，您可以决定在布尔值为 true 或 false 时发生过渡。

![Configure a boolean](https://ucarecdn.com/8443963d-69c7-44a7-9ced-b01d28210b5e/)

**配置数值 (Number)**

配置数值输入时，您可以指示在满足数值条件时发生过渡，例如等于某个数、大于或小于某个数。

![Configure number input](https://ucarecdn.com/3b6da0a7-b56f-4cb1-89f0-831af97fdbce/)

**配置触发器 (Trigger)**

当您向过渡添加触发器输入时，表示告诉状态机在该触发器触发时执行过渡。

![Configuring triggers](https://ucarecdn.com/c8c6a924-f62a-4e3a-80cb-83c758a37343/)

### 插值 (Interpolation)

您可以在过渡面板的底部为过渡添加插值。默认设置为线性（linear），但您也可以使用三次贝塞尔（cubic）和保持（hold）插值。

请注意，过渡时长越长，状态之间的插值效果越明显。

如果您不熟悉插值的基本知识，请参阅[插值 (缓动)](/editor/animate-mode/interpolation-easing)。