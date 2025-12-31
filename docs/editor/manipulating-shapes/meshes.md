---
title: "网格 (Meshes)"
description: "网格是为位图图形添加自然且有机的变形效果的绝佳方式。让皮肤更有弹性、让织物泛起涟漪、让头发飘动等等。"
---

## 添加网格 (Add Mesh)

在您可以创建任何变形之前，您需要添加一个网格。

选中图像后，按 **Enter** 键，或者导航到检查器的 "Deform"（变形）部分，点击加号按钮，然后选择 "Mesh"（网格）。您会注意到系统为您自动生成了一个简单的网格。

![New Mesh Gi](/images/editor/manipulating-shapes/NewMesh.gif)

使用检查器中的 "New Contour"（新轮廓）按钮开始为您的对象创建自定义网格。使用钢笔（Pen）工具为网格放置顶点。在钢笔工具激活状态下连续点击可创建"强制边缘"（由连接两个顶点的蓝线表示），或者在点击之间按下 `Esc` 键以取消顶点间的链接。

![New Contour Gi](/images/editor/manipulating-shapes/NewContour.gif)

## 编辑网格 (Edit Mesh)

您可以随时通过检查器中的 "Edit Mesh" 按钮或在选中资产时按回车键来编辑网格。使用钢笔工具添加、删除或移动顶点。

![Edit Mesh Gi](/images/editor/manipulating-shapes/EditMesh.gif)

## 网格变形 (Mesh Deform)

在"设计"和"编辑"模式下，您都可以通过进入编辑网格模式并使用选择工具移动顶点来使网格变形。为了获得更自然的体验，请考虑使用[骨骼 (Bones)](/editor/manipulating-shapes/bones)。

![Mesh Deform Gi](/images/editor/manipulating-shapes/MeshDeform.gif)