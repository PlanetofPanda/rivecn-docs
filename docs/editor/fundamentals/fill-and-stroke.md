---
title: "填充和描边 (Fill and Stroke)"
description: "检查器中的'填充和描边'部分允许您添加和修改当前选定对象的填充和描边属性。您可以根据需要创建任意数量的填充或描边。"
---

<YouTube videoId="4ZRzKScvJbQ" />

# 填充 (Fill)

### 创建新填充

要创建填充，请选择一个形状，然后使用检查器（Inspector）中"填充和描边"（Fill and Stroke）部分的加号按钮。请确保从弹出菜单中选择 "Fill"（填充）。您可以通过查看左侧的颜色框来判断一个图层是否为填充。

![New Fill Gi](/images/newFill.gif)

### 更改填充颜色

要更改填充的颜色，请点击填充图层左侧的颜色框。这将打开调色板（Color Picker）。在这里，您可以使用各种滑块为您选择喜欢的填充颜色。

![Changecolor Gi](/images/changecolor.gif)

### 更改填充类型

创建一个新形状时，默认情况下它会带有纯色（Solid）填充。当添加一个新填充时，默认的填充类型是线性渐变（Linear）。我们经常需要在不同填充类型之间进行切换。这可以通过点击颜色框操作。

![Changefilltype Gi](/images/changefilltype.gif)

打开填充设置后，您会在选项框顶部找到填充选择器下拉菜单。

可以选择的填充类型包括：

- **纯色 (Solid)**
- **线性渐变 (Linear Gradient)**
- **径向渐变 (Radial Gradient)**

### 更改填充颜色 (渐变)

要更改填充的颜色，请点击填充图层左侧的颜色框。这将打开调色板。

![Changestopper Gi](/images/changestopper.gif)

选择渐变时，您会注意到调色板上方出现了一个新条状区域。这代表了渐变在不同位置的颜色。

默认情况下，渐变有两个关键点（stopper）。

### 更改渐变点的颜色

要更改特定渐变点的颜色，首先选中您想要更改的那个点。

接下来，使用各种滑块来选择该渐变点应呈现的颜色。

### 添加和删除渐变点

要添加一个新的颜色渐变点，请点击条状区域中当前未被其它点占用的任何空间。这将生成一个额外的颜色渐变点。

![Add Remove Gi](/images/add_remove.gif)

要删除一个渐变点，选中您想要删除的点，然后按 Delete 或 Backspace 键。

### 更改填充顺序

填充在层级中的组织顺序决定了它们的渲染顺序，排在顶部的填充会渲染在最前面，而排在底部的填充渲染在最背面。

![Fill Order Gi](/images/fillOrder.gif)

您可以随时通过点击并拖拽图层内的空白区域来更改此顺序。

### 填充属性

每个填充都有自己的属性，可以在时间轴上进行编辑和设置关键帧。其中一些属性可以通过点击填充选项按钮找到。

![Fill Prop Pn](/images/fillProp.png)

**填充名称 (Fill Name) -** 您可以使用此属性编辑填充的名称。

**混合 (Blend) -** 此选项可用于更改单个填充的"混合模式"（Blend Mode）。默认情况下，此模式将设置为 "Inherit"（继承），它会继承形状图层的混合模式。

**填充规则 (Fill Rule) -** 此选项可用于更改填充的填充规则。如果您希望填充能够羽化（feathered），则必须设置为 "顺时针"（clock-wise）。

**羽化 (Feather) -** 此选项可以切换所选填充的羽化效果。在下文详阅关于"羽化"的更多信息。

### 删除和隐藏填充

我们经常需要删除或隐藏某个特定的填充。可以通过选中形状，然后使用"眼睛"图标隐藏填充，或者是点击"减号"图标删除填充。

![Delete Gi](/images/delete.gif)

### 填充规则 (Fill Rule)

<YouTube videoId="3GUh1Rl6hgY" />

填充规则决定了形状中重叠路径的填充方式：

- **非零 (Non-Zero)：** 给顺时针路径分配 +1 值，给逆时针路径分配 -1 值。计算结果不等于 0 的区域将被填充。
- **奇偶 (Even-Odd)：** 给顺时针路径分配 +1 值，给逆时针路径分配 -1 值。计算结果为偶数的区域将被填充，奇数区域则不被填充。
- **顺时针 (Clockwise)：** 专门属于 Rive 的填充规则。此填充规则支持手动减去路径，该操作可在编辑顶点模式下找到。如果您想在形状上启用矢量羽化（vector feathering），也需要使用此填充规则。

# 描边 (Stroke)

### 创建新描边

要创建描边，请选择一个形状，然后使用检查器中"填充和描边"部分的加号按钮。请确保从菜单中选择 "Stroke"（描边）。您可以通过查看左侧的颜色框来判断一个图层是否为描边。描边由带轮廓的方框表示。

![New Stroke Gi](/images/NewStroke.gif)

### 更改描边颜色 (纯色)

要更改描边的颜色，请点击描边图层左侧的颜色框。这将打开调色板。在这里，您可以使用各种滑块选择喜欢的颜色。

![Stroke Color Gi](/images/StrokeColor.gif)

### 更改描边类型

默认情况下描边被设置为纯色，但也可以从调色板菜单中选择其它的描边类型。

![Change Stroke Type Gi](/images/ChangeStrokeType.gif)

可以选择的描边类型包括：

- **纯色 (Solid)**
- **线性渐变 (Linear Gradient)**
- **径向渐变 (Radial Gradient)**

### 更改描边颜色 (渐变)

要更改描边的颜色，请选中描边图层左侧的颜色框。这将打开调色板。

选择渐变后，调色板上方会出现一个新条状区域。它代表了渐变在各点的颜色。

默认情况下，渐变有两个关键点。

### 更改渐变点的颜色

要更改特定渐变点的颜色，首先选中您想要更改的对应点。

![Change Gradient Color Gi](/images/ChangeGradientColor.gif)

接下来，使用滑块来选择颜色。

### 添加和删除渐变点

要添加新点，点击条状区域内的空白位置即可。

![Add Remove Stroke Stopper Gi](/images/add_removeStroke_Stopper.gif)

删除点时，选中目标点并按 Delete 或 Backspace 键。

### 删除和隐藏描边

选中形状后，使用"眼睛"图标隐藏描边，或使用"减号"图标将其删除。

# 描边属性 (Stroke Properties)

每个描边都有自己的属性，可在时间轴上设置关键帧。这些属性可以通过描边选项按钮找到。

**描边名称 (Stroke Name) -** 编辑描边的名称。

**混合 (Blend) -** 更改单个描边的混合模式。默认为继承形态。

**末端 (Cap) -** 更改描边的末端样式。详见下文。

- **平头 (Butt)：** 描边末端是平直的，且不会延伸到端点顶点之外。在长度为零的路径上，描边根本不会被渲染。
- **圆头 (Round)：** 描边末端是圆形的。在长度为零的路径上，描边呈现为一个完整的圆。
- **方头 (Square)：** 描边末端是方形的，且延伸超过了端点顶点。在长度为零的路径上，描边呈现为一个正方形。

**连接 (Join) -** 更改描边拐角的渲染方式。详见下文。

- **圆角 (Round)：** 创建圆滑的拐角。
- **斜切 (Bevel)：** 创建倾斜的拐角。
- **尖角 (Miter)：** 创建尖锐的拐角。

**应用变换 (Apply Transformations) -** 切换此项决定形状图层的"缩放"是否会影响描边的粗细。关闭时，描边粗细将不受缩放影响而保持恒定。

**羽化 (Feather) -** 切换所选描边的羽化效果。

**描边类型 (Stroke Type)** - 在描边选项面板底部，您可以将描边在纯色（solid）、修剪（trim）和虚线（dashed）之间进行切换。

- **纯色 (Solid)：** 将描边渲染为实线。这是创建新描边时的默认类型。
- **修剪 (Trim)：** 允许您为线段的起点、终点和偏移量制作动画。在[这里](https://rive.app/docs/editor/manipulating-shapes/trim-path)详阅。
- **虚线 (Dashed)：** 允许您创建带有虚线段长度和偏移的可动画属性的虚线。在[这里](https://rive.app/docs/editor/manipulating-shapes/trim-path)详阅。

# 矢量羽化 (Vector Feathering)

矢量羽化是为填充和描边添加羽化效果的一种新方式。矢量羽化是 Rive 发明的一项技术，它可以软化矢量路径的边缘，而不会像传统模糊（blur）效果那样产生严重的性能影响。

### 启用矢量羽化

有两种主要方法可以为任何描边或填充启用矢量羽化。

![Enable Feather Gi](/images/EnableFeather.gif)

- **羽化图标 (Feather Icon)：** 可点击任何填充或描边图层上的羽化图标来开启。
- **羽化开关 (Feather Toggle)：** 可以在填充/描边的选项面板中找到。

### 羽化选项

羽化可以进行多种方式的自定义。一旦在填充或描边上启用了羽化，可以在选项面板中找到具体设置。

**方向 (Direction)** - 当您增加羽化量时，此选项决定路径羽化的方向。

![Direction Gi](/images/Direction.gif)

- **外部 (Outer)：** 设置羽化从路径向外扩散。
- **内部 (Inner)：** 设置羽化从路径向内扩散。

**数值 (Amount)** - 增加或减少应用的羽化程度。

![Amount Gi](/images/amount.gif)

**空间 (Space) -** 决定当羽化存在任何"偏移"（offset）时，羽化后的填充或描边如何应用父级的变换。

![Space Gi](/images/space.gif)

- **世界 (World)：** 变换将从世界变换（World transform）应用。在这种模式下，羽化将表现得像投影（drop shadow）一样。
- **本地 (Local)：** 变换将从本地变换（Local transform）应用。此模式下羽化将按您预期的方式随对象变换而动。

**偏移 (Offset)** - 通过增加或减少 X 和 Y 数值，将羽化效果从原始路径位置移开。

![Amount Gi](/images/amount.gif)