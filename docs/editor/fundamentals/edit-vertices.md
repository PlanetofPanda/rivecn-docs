---
title: "编辑顶点"
description: "无论您创建何种类型的矢量，都可以在设计和动画模式下通过更改其位置或控制柄来编辑顶点。"
---

## 编辑顶点模式 (Edit Vertices mode)

要进入"编辑顶点"模式，可以选中形状并连按两次回车键（Enter），或者选中路径并按一次回车键。

![EVM Gi](/images/EVM.gif)

激活编辑顶点模式后，您可以选择任何顶点、重新定位它并编辑贝塞尔控制柄。

### 深度选择 (Deep Selection)

在处理一组形状（Group）时，您可能希望选择并编辑特定的路径。您既可以在层级结构中找到该路径，也可以使用"深度选择"直接在舞台上选择它。

要在舞台上选择组内的某个路径，请按住 `⌘` (Mac) 或 `ctrl` (Windows) 并点击目标路径。或者，您也可以双击想要选择的路径。

### 路径选项 (Path Options)

在编辑顶点模式下，每个路径在检查器（Inspector）顶部都有一组路径选项。

**完成编辑按钮 (Done Editing Button)**

"完成编辑"按钮可用于退出编辑顶点模式。

![Done Edit Pn](/images/DoneEdit.png)

**开放路径 (Open Path)**

"开放路径"按钮将断开最后一个顶点与第一个顶点的连接。

![Open Path Pn](/images/OpenPath.png)

**反转方向 (Reverse Direction)**

"反转方向"按钮可用于反转路径的方向。根据填充规则（Fill-Rule），这可以通过改变选定路径的数学值来消除形状中的孔洞。

**转换圆角顶点 (Convert Radial Corners)**

带有圆角半径的直线顶点在对形状或路径层进行缩放变换时会发生变形。您可以将圆角属性转换为一组定义的顶点，这个过程将消除拐角的变形。

![Convert Gi](/images/convert.gif)

## 贝塞尔控制柄 (Bezier Handles)

**直线 (Straight)**

默认控制柄设置为直线，这会在顶点之间创建直边。

![Straight Pn](/images/Straight.png)

**圆角半径 (Corner Radius)**

"圆角半径"属性允许您将直角变为圆角。此属性仅出现在设置为直线的顶点上。

**镜像 (Mirrored)**

通过点击并拖动创建顶点时，"镜像"是默认的控制柄。这些控制柄始终保持相同的旋转角度和长度。

![Mirriored Gi](/images/mirriored.gif)

**脱离 (Detached)**

"脱离"控制柄允许每个控制柄拥有自己独立的旋转角度和长度。

![Detached Gi](/images/detached.gif)

**非对称 (Asymmetric)**

"非对称"控制柄共享相同的旋转角度，但长度可以相互独立。

![Asem Gi](/images/asem.gif)