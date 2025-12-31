---
title: "检查器 (Inspector)"
description: "检查器位于编辑器的右侧。它显示了 Rive 编辑器中所有对象的所有可编辑属性。"
---

# 检查器 (Inspector)

对象的所有可编辑属性都可以在检查器中找到。检查器会根据您选择的对象以及您在编辑器中所处的位置动态变化。

![Inspector Pn](/images/inspector.png)

## 背景颜色、标签、默认插值

当没有选中任何内容时，检查器包含三个部分：背景（Backgrounds）、标签（Tags）和默认插值（Default Interpolation）。

**背景颜色 (Background color)**

该部分位于检查器顶部，允许您更改编辑器在"动画"和"设计"模式下的背景颜色。这是一个帮助您记起当前处于哪种模式的有效方式。

![Backgrounds Pn](/images/backgrounds.png)

**标签 (Tags)**

在背景颜色下方，您可以查看、编辑并为您的文件添加新标签。在[这里](/editor/tagging)了解更多关于标签的信息。

![Tags Pn](/images/tags.png)

**默认插值 (Default Interpolation)**

标签下方是文件的默认插值设置。

![Default Int Pn](/images/default_Int.png)

当您在时间轴上设置关键帧时，它将使用文件的默认插值，直到在时间轴上对其进行手动修改。通过更改默认插值，您可以控制应用于新关键帧的插值曲线。

## 对齐与分布工具 (Align and Distribute tools)

当选中一个或多个对象（如形状或组）时，对齐工具会出现在检查器顶部。使用它们可以对选定对象进行对齐或分布。在[这里](/editor/interface-overview/toolbar#align-tools)了解更多关于对齐工具的信息。

![Align Pn](/images/Align.png)

## 布局与 N-Slicing

当选中一个或多个对象（如形状或组）时，检查器提供了对当前选择进行布局（layout）或 N-slice 的选项。

![L Oand N Pn](/images/LOandN.png)

**[布局 (Layouts)](/editor/layouts/layouts-overview)**

    布局让您构建响应式设计。

**[N-Slicing](/editor/layouts/n-slicing)**

    N-slicing 让您拉伸或重复位图和矢量设计的某些部分。

## 变换属性 (Transform properties)

对象的变换属性出现在对齐工具下方。通常，这些属性包括位置（position）、缩放（scale）和旋转（rotation），但如果您选中了路径层，还可能包括宽度（width）和高度（height）。

![Transform Pn](/images/Transform.png)

## 图层属性 (Layer properties)

在变换属性下方，您会发现几个允许您自定义舞台上某些对象外观的属性。这些属性包括混合模式（blend mode）、不透明度（opacity）、填充（fill）和描边（stroke）。

![Layer Pn](/images/Layer.png)

## 额外属性 (Additional properties)

在图层属性下方，您可以找到许多可以添加的额外属性，例如剪裁（Clipping）、约束（Constraints）、自定义绘制顺序（Custom Draw Order）和已选颜色（Selection Colors）。

![Additional Pn](/images/additional.png)

**[操控形状 (Manipulating Shapes)](../manipulating-shapes/manipulating-shapes)**

    Rive 编辑器为您提供了多种操控图形的方式，以创建您想要的动画。

**[约束 (Constraints)](../constraints/)**

    约束是通过另一个目标对象来控制某个对象属性的方法。

**[动画模式 (Animate Mode)](../animate-mode/)**

    Rive 具有两种明显的模式：设计（Design）和动画（Animate）。

### 运动与状态属性 (Motion and State Properties)

当选中关键帧（Keys）、过渡（Transitions）或状态（States）时，此部分将显示可自定义的属性。

![Motioninspector Pn](/images/motioninspector.png)

**[插值面板](/editor/animate-mode/interpolation-easing)**

    选择关键帧将调出插值面板。

**[过渡属性](/editor/state-machine/transitions)**

    选择过渡将显示可自定义的过渡属性。

**[状态属性](/editor/state-machine/states)**

    选择状态后可自定义状态属性。
