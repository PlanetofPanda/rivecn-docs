---
title: "过程形状 (Procedural Shapes)"
---

<YouTube videoId="vU5SrgymGD8" />

## 创建过程形状

![Procedural Shapes Menu](/images/editor/fundamentals/procedural-shapes-menu.png)

在"创建工具"菜单下，您可以找到由宽度（width）、高度（height）、圆角半径（corner radius）、顶点数量（number of points）等过程属性定义的形状工具。

![Create Shape](/images/editor/fundamentals/procedural-shapes-create.gif)

选择工具，然后在画板内的任意位置点击并拖拽。按住 **Shift** 键可约束形状的比例。

### 将过程路径转换为自定义路径

![Convert a procedural path to a custom path](/images/editor/fundamentals/procedural-shapes-convert.gif)

要编辑过程式路径的顶点，请按键盘上的 **Enter** 键。这将把路径转换为自定义路径，允许您修改每个顶点的位置。转换后，过程属性（如宽度、高度、顶点数）将不再可用。请记住，一旦过程路径转换为自定义路径，任何应用在这些过程属性上的动画也将会被移除。

### 过程路径的原点

过程路径的[原点 (Origin)](/editor/fundamentals/freeze-and-origin) 决定了其属性的变化基准。例如，更改一个原点位于中心（X:50%, Y:50%）的矩形的宽度，会导致它从中心向外扩展。

![Change size of procedura shape](/images/editor/fundamentals/procedural-shapes-size.gif)

将原点设在左侧（X:0%）更改矩形宽度，则会使其从左侧向外扩展。

![Origin in procedural shapes](/images/editor/fundamentals/procedural-shapes-origin.gif)

在为启用了圆角等其它过程属性的路径制作动画时，这会非常有用。