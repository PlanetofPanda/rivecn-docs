状态机 (State Machines)

# 状态机概览 (State Machine Overview)

为你的动画增添智能逻辑。

## [​](#overview) 概览

状态机是一种可视化地连接动画并定义驱动过渡逻辑的方式。它允许你构建可交互的动态图形，以便直接集成到产品、应用、游戏或网站中。
状态机为设计师和开发者之间创造了新的协作层级，让双方都可以在开发过程的深处进行迭代，无需繁复的交接。使用状态机需要设计师和动画师以开发者的思维方式思考，但以一种直观、可视化的方式呈现。
每个画板默认至少有一个状态机，但你可以根据需要创建更多。要创建新的状态机，请在动画列表中点击加号按钮，并选择 State Machine 选项。

### [​](#anatomy-of-a-state-machine) 状态机的构成

一个基本的状态机由以下部分组成：图表 (Graph)、[状态 (States)](/editor/state-machine/states.md)、[过渡 (Transitions)](/editor/state-machine/transitions.md)、[输入 (Inputs)](/editor/state-machine/inputs.md) 和 [图层 (Layers)](/editor/state-machine/layers.md)。
**图表 (Graph)** 是你添加状态并连接过渡的空间。当在动画列表中选中状态机时，它会替代时间轴显示。
![状态机图表](images/307461c0-2006-4fdf-bdc3-61875d40f422.webp)
**状态 (States)** 本质上就是可以在状态机中播放的时间轴动画。它们通常代表你的动画内容所处的某种"状态"。例如，一个按钮通常有：Idle（静止）、Hovered（悬停）和 Clicked（点击）三种状态。
![状态预览](images/image_1.png)
定义好状态后，我们可以用 **过渡 (Transitions)** 将它们连接起来，创建一条状态机可以遵循的逻辑路径——这就像一张地图，指引状态机如何从一个动画切换到下一个。
![创建过渡](images/image_2.png)

> [!WARNING]
> **弃用提示：** 本节涉及旧版"输入 (Inputs)"系统。
> - **新项目**：请改用 [数据绑定 (Data Binding)](/editor/data-binding/overview.md)。
> - **现有项目**：请尽早规划从 Inputs 迁移到 Data Binding。
> - **本内容仅为向后兼容提供支持。**

**输入 (Inputs)** 是控制状态机过渡的一种旧式工具。虽然仍可使用，但数据绑定 (Data Binding) 是当前的最佳实践，因为视图模型 (View Models) 更强大且在运行时更易控制。
输入是设计师与开发者之间的"契约"。设计师用它们作为过渡发生的条件规则，开发者在运行时对其进行操控。
![添加输入和条件](images/state-machine-overview-inputs.gif)

最后，所有状态机至少有一个 **图层 (Layer)**。由于每个图层同一时间只能播放一个动画，如果需要混合不同动画或添加额外交互，我们可以添加多个图层。
![多图层状态机](images/image_4.png)

[绘制顺序动画](/editor/animate-mode/animating-draw-order)[状态 (States)](/editor/state-machine/states.md)