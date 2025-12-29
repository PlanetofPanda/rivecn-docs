基础概念 (Fundamentals)

# 组件 (Components，原名为嵌套画板)

组件通过允许复用画板和动画来精简你的工作流程。对源组件所做的更改将反映在其所有的实例中。

## [​](#creating-a-component) 创建组件 (Creating a Component)

任何画板都可以转换为组件。要执行此操作，请在舞台上选中一个画板，然后在检查器 (Inspector) 中点击组件图标来切换其状态。
此外，你也可以在选中画板的情况下使用 `Shift` + `N` 快捷键。如果你习惯使用 Figma，那么 `Cmd/Ctrl` + `Alt/Option` + `K` 快捷键同样有效。
再次点击检查器中的组件开关，或使用 `Shift` + `Alt/Option` + `N` 快捷键，可将其转换回普通画板。
目前，只有被标记为组件的画板会被导出的 `.riv` 文件包含。如果你希望在运行时动态访问某个画板，应将其标记为组件。

## [​](#using-components) 使用组件 (Using Components)

使用 **组件工具 (Component Tool)**（原名为嵌套画板工具）在舞台上选择并放置组件实例。通过工具栏选择该工具或按下快捷键 `N` 激活它。
点击舞台上的任何位置即可放置组件。界面会弹出一个菜单，显示所有可用的组件以供实例化。如果没有显示，可能是因为你的文件中没有被标记为组件的画板。
![添加组件示例](images/components-add.gif)

## [​](#configuring-a-component-instance) 配置组件实例 (Configuring a Component Instance)

添加组件实例后，选择对应的时间轴 (Timeline) 或状态机 (State Machine) 即可进行回放。

### [​](#state-machines) 状态机 (State Machines)

分配实例后，检查器中会显示默认状态机。
![组件状态机设置](images/components-statemachine.gif)
如果你在源组件中暴露了任何“输入 (Inputs)”，你可以通过选项面板或是在选中状态机时的输入面板中访问它们。
![组件嵌套输入示例](images/components-nested_inputs.gif)

### [​](#adding-an-animation) 添加动画 (Adding an Animation)

你可以播放与组件关联的任何动画。你需要点击检查器中的“加号”按钮将所需动画添加到实例。
![组件添加动画示例](images/components-animations.gif)
这些动画可以单独使用，与状态机混合使用，或者与其他动画进行层叠。
注意：在添加动画之前，你必须选择是使用 **Simple (简单)** 还是 **Remap (重映射)** 动画。

#### [​](#simple) 简单 (Simple)

简单动画是播放组件时间轴的一种便捷方式。
![简单动画示例](images/components-animation-simple.gif)
简单动画允许你在当前时间轴上通过关键帧设定其起始点。你还可以调整动画的播放速度。

#### [​](#remap) 重映射 (Remap)

重映射动画允许你在时间轴上为动画的时间值设置关键帧。这让你可以拉伸、收缩，甚至倒放动画。
![重映射动画示例](images/components-animation-remap.gif)
注意：时间值为百分比，0% 代表时间轴起始，100% 代表结束。

### [​](#mix-value) 混合值 (Mix Value)

当你向同一个组件添加多个动画时，它们会开始相互混合。这种混合非常重要，特别是当多个动画共用关键帧属性时。
默认情况下，添加到组件的每个动画的混合值均为 100%。你可以在设计模式或特定的动画中调整关键帧。
**注意：只要一个动画的混合值不为零，它就始终在与其他动画混合，无论其是否设置了播放关键帧。**
为了确保正确的动画在播放，请务必将目标动画的混合值设为 100%，并将其他动画设为 0%。

## [​](#instance-modes) 实例模式 (Instance Modes)

组件实例可以设置为 3 种模式之一，它们根据其内容和使用上下文表现不同。Leaf 和 Layout 模式通常用于父级画板需要响应式布局内容的场景。

### [​](#node) 节点 (Node)

这是默认模式，用于非响应式场景。其内容将始终根据“缩放 (Scale)”属性表现。

### [​](#leaf) 叶子 (Leaf)

![叶子模式示例](images/components-leaf.png)
Leaf 模式会使组件的大小和位置始终相对于其包含的“布局 (Layout)”或“画板”进行。当你希望组件随容器缩放，但组件本身不包含内部布局逻辑时，这非常有用。

#### [​](#leaf-fit) 叶子填充方式 (Leaf Fit)

Fit 类型决定了组件内容在分配区域内如何缩放。
- **Fill (填充)**：内容填满视图。如果宽高比不一致，内容会被拉伸。
- **Contain (包含)**：内容在视图内等比缩放，确保内容显示完全，可能留白。
- **Cover (覆盖)**：内容等比缩放以覆盖整个视图，多余部分会被裁剪。
- **Fit Width (适应宽度)**：内容缩放至宽度填满视图。
- **Fit Height (适应高度)**：内容缩放至高度填满视图。
- **None (无)**：内容按原画板尺寸渲染。
- **Scale Down (缩小)**：仅在内容大于视图时执行等比缩小。

#### [​](#leaf-alignment) 叶子对齐方式 (Leaf Alignment)

Alignment 类型决定了内容在分配区域内的对齐位置。提供 3x3 网格对齐选项：**居中 (默认)**、**左下**、**底部中央**、**右下**、**左侧中央**、**右侧中央**、**左上**、**顶部中央**、**右上**。

### [​](#layout) 布局 (Layout)

![布局模式示例](images/components-layout.png)
Layout 模式用于当你的组件包含需要随父级尺寸变化而保持响应的内部布局时。这是唯一一种组件内容不会被等比缩放的模式，而是通过改变画板尺寸来让内容“重新排版 (Reflow)”。

#### [​](#layout-scale-type) 布局缩放类型 (Layout Scale Type)

- **Fixed (固定)**：固定的宽度或高度，可以使用像素或百分比。
- **Hug (包裹)**：布局的宽高会自动收缩以适应其子级（如文本或其他自动定义大小的对象）。
- **Fill (填充)**：自动扩展以填充父级布局或画板的剩余空间。

## [​](#exposing-inputs-and-events) 暴露输入与事件 (Exposing Inputs and Events)

暴露组件的“输入”或“事件”，以便从父级/主画板对其进行控制。这允许你通过状态机让一个组件去控制另一个组件。

### [​](#how-to-expose-an-input) 如何暴露输入

暴露输入后，父画板即可访问并操纵它。操作方法：选中目标输入，在检查器中勾选 **“Expose to main artboard”**。
![暴露输入示例](images/image_8.png)

### [​](#using-inputs-on-a-parent-artboard) 在父级画板上使用输入

暴露的输入会出现在输入面板中，你可以通过监听器 (Listeners)、事件 (Event) 或在时间轴上设置关键帧来驱动它们。
![在父级使用输入](images/image_9.png)

#### [​](#via-a-listener) 通过监听器

创建监听器时，你会发现所有暴露的输入都可作为“设置输入”属性。这让你能一键改变多个组件实例的属性。
![监听器操作组件](images/image_10.png)

#### [​](#using-events) 使用事件

我们可以使用监听器来监听组件发出的事件，并据此改变输入值。
要看到与画板关联的事件，你需要将画板设为监听器的目标。

[画板 (Artboards)](/editor/fundamentals/artboards.md)[钢笔工具概览 (Pen Tool Overview)](/editor/fundamentals/pen-tool-overview.md)