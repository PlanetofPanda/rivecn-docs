---
title: '状态 (States)'
description: ''
---

状态（States）本质上是可以在状态机中的任何时刻播放的时间轴动画。一个状态可以简单到只是改变一个对象的颜色和位置，也可以复杂到将多个时间轴混合在一起。

在处理状态机时，您最终会使用到几种类型的状态，包括默认状态（Default States）、单动画状态（Single animations）和混合状态（Blend States）。我们将逐一探讨。

## 默认状态 (Default States)

默认状态是默认添加到每个状态机的基础状态。

![Default States](/images/editor/state-machine/42815967-dd47-4da1-ba8a-4fc12f64d972.webp)

### 入口状态 (Entry State)

入口状态是状态机开始运行的起点。您会注意到，默认情况下，您的状态机已经有一个连接到入口状态的动画，但您可以随时更改。请注意，如果需要，您可以将多个动画连接到入口状态。例如，如果您想构建一个可以从"开启"或"关闭"状态开始的开关。

![Using the Entry state](https://ucarecdn.com/9d359af8-f3c3-4d57-8f88-7ba8dcad4847/)

### 退出状态 (Exit State)

退出状态告诉状态机图层停止播放。这个特殊状态在涉及多个图层协作时非常有用。

### 任意状态 (Any State)

与普通状态不同，连接到 "Any State" 的状态可以随时被播放，无论您的状态机当前处于哪个状态。当您想创建一系列可以随时激活的状态（例如更改角色的皮肤）时，Any State 非常好用。

![Rating system using the Any state](https://ucarecdn.com/6c4401fc-1b7c-4748-901d-a6e237f57e51/)

## 动画状态 (Animation States)

动画状态包括除默认状态之外添加到状态机的所有状态。这些状态控制交互内容的视觉表现和动作。共有三种类型的动画状态：单动画状态（Single Animation）、1D 混合状态（1D blend）和直接混合状态（Direct blend）。

要向图表（Graph）添加状态，您可以将时间轴（Animations List）中的动画直接拖放到图表上。请注意，这会创建一个单动画状态。您可以使用检查器更改状态类型。

![Drop and drop State onto the Graph](https://ucarecdn.com/f99e2294-1915-4449-8632-71227dc4f87f/)

此外，您也可以在图表上右键点击，创建一个没有任何关联时间轴的、任何类型的空白状态。

![Image](https://ucarecdn.com/34662198-6e61-43bd-83dd-d4d8e1ee8012/)

右键点击添加状态：

要为状态分配时间轴，请使用检查器中的时间轴下拉菜单。

### 单动画状态 (Single animation state)

我们创建的任何时间轴都可以用作单动画状态。根据我们使用的动画类型，单动画状态可以是一个单次播放、循环播放或往复（ping-pong）播放的状态。在大多数情况下，您将主要使用单动画状态来构建状态机。

### 混合状态 (Blend states)

混合状态是将两个或多个时间轴动画混合在一起的状态。我们将这些状态用于加载条、生命值系统、滚动交互和动态表情绑定等场景。

混合状态有两种类型：1D 混合和直接混合（Direct Blend）。

#### 1D 混合状态 (1D Blend state)

1D 混合状态允许我们通过一个单一的数值输入来混合多个时间轴。该状态的工作原理是：当您增加或减少数值输入时，一个动画逐渐增强而另一个逐渐减弱。请注意，这种混合不是线性的，而是叠加式的，有时可能会产生意想不到的效果。

![Health bar using Blend state](https://ucarecdn.com/875b9ed6-41c7-4023-aaad-f38d2042dca7/)

**配置 1D 混合状态：**

首先为您的混合状态创建几个时间轴。请记住，通常最好使用只为少数属性设置了关键帧的时间轴。在这个生命值条示例中，只有 X 缩放设置了关键帧。

![Image](https://ucarecdn.com/a2e08c89-388b-4b21-b31b-3d5fb6e94cd7/)

生命值条的时间轴：

将 1D 混合状态添加到图表后，使用检查器配置该状态。

![Add Blend state](https://ucarecdn.com/266c2c6d-6719-4b65-b06a-b1ca35d2eb86/)

首先，在下拉菜单中选择要驱动混合的数值输入。如果您尚未创建数值输入，这里将不会显示任何内容。

![Create and add number input to Blend state](https://ucarecdn.com/baf39e65-5bf1-44ed-bd2e-b0f0afa24ded/)

数值输入下方的加号按钮允许您向混合状态添加时间轴。使用下拉菜单分配特定的时间轴。请注意，您可以根据需要添加任意多个时间轴。

![Add timelines to the Blend state](https://ucarecdn.com/fe5d4505-8290-4be9-b0d6-58f13d1df553/)

接下来，您需要定义混合状态工作的数值范围。本例中的混合工作范围在 0 到 100 之间。

![Image](https://ucarecdn.com/6a92f242-2979-44c7-bb95-fc51ebeeda5d/)

请注意，一旦定义了范围，输入下拉菜单上方就会出现一个图形，直观地呈现动画的混合方式。当状态机处于活动状态时，随着您在定义的范围内增加或减少输入，您会看到一个视觉指示在该图形上移动，显示时间轴的混合比例。

![Blend State in action](https://ucarecdn.com/44a40cb9-90d9-4aca-920f-6042cc52340f/)

#### 叠加混合状态 (Additive Blend state)

叠加混合状态允许您使用多个数值输入来混合多个时间轴。这使我们能够通过混合多个动画来创建独特的姿态和面部表情。在处理叠加混合时，您可以选择按数值（Value）或输入（Input）来混合动画。请看下文。

![Using Additive Blend for facial animations](https://ucarecdn.com/71cf4345-b728-47a4-946c-e08de2eb86dd/)

**按数值混合 vs 按输入混合 (Value vs Input blend)**

向叠加混合状态添加动画时，系统会提示您选择 "Blend by Value"（按数值混合）或 "Blend by Input"（按输入混合）。

![Adding timeline to Additive Blend](https://ucarecdn.com/8e2c7380-85cf-4e41-8dd8-82e98f34d1bd/)

"Blend by Value" 时间轴可以看作是基准动画或默认姿态。此值不与输入绑定，因此不能通过它控制状态机。相反，此数值描述了它的混合权重比例。

"Input blend" 是通过数值输入与默认姿态或动作进行混合的动画。您的每个不同的输入混合都应有其自己的数值输入。

## 额外状态选项 (Additional State Options)

当您在状态机图表上选中一个状态时，会有多个选项可供修改。

**更改状态类型**

顶部的三个图标允许您更改状态类型。您可以从单动画（single animation）、1D 混合（1D blend）和叠加混合（Additive blend）中选择。

![Convert state type](https://ucarecdn.com/185c56c3-4d69-4526-95c9-62af59675f18/)

**更改动画**

您可以使用下拉菜单更改分配给当前状态的动画。

![Changing animation on a state](https://ucarecdn.com/e8a8e540-b5ed-4947-b2cc-45ba793f0ea0/)

**播放速度 (Speed)**

您可以通过更改此数值来修改状态的播放速度。请注意，正值表示正向播放，负值表示反向播放。

![Change animation speed](https://ucarecdn.com/5ada4e3d-bbba-412d-8bc3-6b4417717e16/)

**过渡 (Transitions)**

您可以查看从选定状态出发的所有过渡。您还可以通过点击眼睛图标来忽略（ignore）特定的过渡。