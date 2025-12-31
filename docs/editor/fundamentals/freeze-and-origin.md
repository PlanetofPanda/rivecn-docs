---
title: "冻结与原点 (Freeze and Origin)"
---

<YouTube videoId="nA15ZXkMb_c" />

当您对对象进行变换时，它们的子对象会继承相同的变换。这些变换发生的起始点（有时称为原点 Origin、锚点 Anchor Point 或中心点 Pivot）会影响对象的动画方式。

例如，如果缩放的起始点位于中心或底部，那么调整组的缩放将产生完全不同的结果。

您需要重新定位父级组，以改变这些变换的起始点。然而，移动父级通常会导致所有子对象随之移动。"冻结"（Freeze）功能使得在不重新调整层级结构的情况下实现这一点成为可能。

# 过程路径的原点 (Origin of a Procedural Path)

过程式对象（如画板和过程路径）具有原点属性。过程路径的原点决定了其属性的起始位置。例如，更改一个原点位于中心（X:50%, Y:50%）的矩形的宽度，会导致它从中心向外扩展。

![Origin in the center](/images/editor/fundamentals/freeze-origin-center.gif)

更改一个原点位于左侧（X:0%）的矩形的宽度，则会导致它从左侧向外扩展。

![Origin on the left](/images/editor/fundamentals/freeze-origin-left.gif)

在为启用了圆角等其它过程属性的路径制作动画时，这一点特别有用。

您可以使用"冻结"功能在舞台上改变原点位置。或者，也可以在检查器（Inspector）中设置精确数值。

# 自定义路径与组的原点 (Origin of a Custom Path and Group)

### 冻结模式 (Freeze Mode)

"冻结"功能允许您移动任何父级对象（组、形状、骨骼）而不影响其子对象的位置。可以在[变换工具菜单](../interface-overview/toolbar)中激活"冻结"，或使用快捷键 **Y**。

当冻结模式处于活动状态时，您会注意到舞台被蓝色的边框包裹。此时您可以自由移动原点，而不会影响到子对象。

务必再次按下 **Y** 键来关闭冻结模式。

# 使用对齐工具更改原点

您可以使用对齐工具快速更改原点的位置。

首先选中形状，然后在 Mac 上按住 **Option** 键，或在 Windows 上按住 **Alt** 键。

现在，对齐工具可以允许您将原点重新定位到各种不同的位置。