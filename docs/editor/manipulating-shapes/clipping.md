---
title: "剪裁 (Clipping)"
description: "剪裁允许您从一个形状中切割出另一个形状。"
---

<YouTube videoId="bxmipy1Gv6Y" />

## 如何使用剪裁

选中您想要剪裁的形状或组，然后点击检查器中 "Clipping"（剪裁）选项旁边的加号按钮。点击加号后，您会看到舞台周围出现蓝色边框，这表示您可以选择一个形状作为剪裁源。现在，选中您想要用作剪裁路径的路径。请记住，剪裁源必须是路径（Path），而不是组或其它对象。

![Clipping Gi](/images/editor/manipulating-shapes/Clipping.gif)

您可以根据需要为一个形状添加任意数量的剪裁路径。

## 剪裁与路径方向

如果您发现形状没有被剪裁，或者只有部分被剪裁，请务必检查该形状的缠绕方向（winding）。在大多数情况下，反转路径的方向可以解决此问题。

![Reverse Direction Gi](/images/editor/manipulating-shapes/ReverseDirection.gif)

## 反向剪裁 (Inverse Clipping)

剪裁通常用于隐藏图形的一部分。在下面的示例中，我们使用一个椭圆来仅显示珠宝图形的一部分。

![Image](/images/editor/manipulating-shapes/cb6d8e76-41f9-4ef3-81db-80db5ef37412.webp)

有时您可能想要反转剪裁，以便只渲染剪裁路径之外的图形。

![Image](/images/editor/manipulating-shapes/7d83b2ef-77de-4c9d-9220-12977d137fef.webp)

这可以通过使用下图中灰色形状所示的剪裁路径来实现。

![Image](/images/editor/manipulating-shapes/b71b9c54-7d99-43d9-9614-29ada59bf6cc.webp)

要创建此形状，请绘制一个与画板大小相同的矩形。在层级结构中，将矩形路径和椭圆路径都添加到同一个形状层（Shape layer）中。

![Image](/images/editor/manipulating-shapes/2c9721d3-a003-47c4-b0b8-e8da713831da.webp)

请注意，您的形状可能不会像我们显示的那样出现孔洞。那是因为您需要将形状的 "Fill Rule"（填充规则）设置为 "Even-Odd"（奇偶规则）。此设置本身不会影响您的剪裁路径效果，但它有助于直观理解奇偶运算的工作原理，这在以后会很有用！

![Image](/images/editor/manipulating-shapes/4e35e170-b0e0-470b-8d2c-53bf74388fd7.webp)

选中包含珠宝的组，点击检查器中 "Clipping" 部分的加号图标。接着，选择该剪裁形状作为目标。

![Image](/images/editor/manipulating-shapes/a5b01f21-4757-435b-8a6b-f822cc519005.webp)

打开剪裁选项（Clip Options）并将 "Operation"（运算）设置为 "Even-Odd"。

![Image](/images/editor/manipulating-shapes/c38910e3-9b33-4fef-a69f-5a2154aa6eec.webp)

请务必隐藏剪裁形状的可见性，以免它遮挡您的图形。