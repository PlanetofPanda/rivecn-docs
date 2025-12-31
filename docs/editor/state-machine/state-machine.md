---
title: "状态机概览 (State Machine Overview)"
description: "为您动画注入智慧。"
---

## 概览 (Overview)

状态机是一种可视化的方式，用于将动画连接在一起并定义驱动过渡（Transitions）的逻辑。它们允许您构建交互式的动效图形，并可以随时实现在您的产品、应用、游戏或网站中。

状态机为设计师和开发者之间建立了一个全新的协作层面，允许双方在开发过程中进行深度迭代，而无需复杂的交接过程。

<YouTube videoId="0Hb7SlEW6MI" />

使用状态机需要设计师和动画师以更接近开发者的方式去思考问题，但这种方式是直接且可视化的。

默认情况下，每个画板至少有一个状态机，但您可以根据需要创建任意多个。要创建新状态机，请点击动画列表（Animations List）中的加号按钮并选择 "State Machine" 选项。

### 状态机的组成 (Anatomy of a State Machine)

一个基础的状态机包含图表（Graph）、[状态 (States)](/editor/state-machine/states)、[过渡 (Transitions)](/editor/state-machine/transitions)、[输入 (Inputs)](/editor/state-machine/inputs) 和 [图层 (Layers)](/editor/state-machine/layers)。我们将在此章节中深入探讨这些组成要素及更多内容。

**图表 (Graph)** 是您添加状态和连接过渡的控件空间。当在动画列表中选中一个状态机时，它会替代时间轴出现。

![State Machine Graph](/images/editor/state-machine/307461c0-2006-4fdf-bdc3-61875d40f422.webp)

**状态 (States)** 本质上就是可以在状态机中播放的时间轴动画。通常，它们代表了动画内容的某种特定状态。例如，一个按钮通常会有 "Idle"（空闲，按钮静止）、"Hovered"（悬停，鼠标滑过时的样子）和 "Clicked"（点击，被点击时的样子）这些状态。

![Preview of States](https://ucarecdn.com/ca93f148-a38c-4eac-a166-8399065315c2/)

一旦定义了内容的各个状态，我们就可以用过渡将它们联系起来，为状态机在这些不同时间轴之间建立一条逻辑路径。我们正在为状态机从一个动画跳转到下一个动画创建一张地图。

![Creating Transitions](https://ucarecdn.com/cf0f53e3-abc9-43a9-b43a-e18483fe2613/)

::: warning
**弃用通知：** 此部分涉及旧版的输入系统（Inputs system）。\
  **对于新项目：** 请改用 [数据绑定 (Data Binding)](/editor/data-binding)。\
  **对于现有项目：** 请计划尽快从 Inputs 迁移到 Data Binding。\
  **提供此内容仅用于支持旧版。**
:::

"输入"（Inputs）是用于在状态机中控制过渡的旧版工具。虽然目前仍可以使用 Inputs 来控制过渡，但"数据绑定"被认为是最佳实践，因为视图模型（View Models）在运行时功能更强大且更易于控制。

Inputs 的最佳用途是进行快速、原型的交互设计，且不打算将其迁移到生产环境运行时。

Inputs 是设计师与开发者之间的契约。作为设计师，我们将其作为过渡发生的规则。例如，我们可以有一个名为 `isHovered` 的布尔值，该布尔值控制着空闲状态与悬停状态之间的过渡：当布尔值为 true 时，状态机进入悬停状态；当为 false 时，回到空闲状态。开发者在运行时接入这些输入，并定义控制状态机输入的各种动作（例如定义可以改变 `isHovered` 布尔值的命中区域）。

![Adding Inputs and Conditions](/images/editor/state-machine/state-machine-overview-inputs.gif)

最后，所有状态机都至少有一个**图层 (Layer)**。由于给定的图层一次只能播放一个动画，因此如果我们想要混合不同的动画或添加额外的交互，就可以添加多个图层。例如，下图中这个状态机就有多个图层，每个图层都包含控制该菜单中其中一个按钮的逻辑。

![Image](https://ucarecdn.com/9b454ffc-1e08-495c-a4b7-b6ba71a7cbd2/)