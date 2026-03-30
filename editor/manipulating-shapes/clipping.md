---
title: "裁剪 (Clipping) - Rive 编辑器"
description: "操控形状 (Manipulating Shapes) 裁剪 (Clipping) 允许你用一个形状的轮廓来'切除'或'遮罩'另一个形状。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 形状操控, 裁剪
---

操控形状 (Manipulating Shapes)

# 裁剪 (Clipping)

裁剪 (Clipping) 允许你用一个形状的轮廓来"切除"或"遮罩"另一个形状。

## [​](#how-clipping-works) 裁剪的工作原理

当你将一个对象设置为另一个对象的"裁剪源 (Clipper)"时，只有裁剪源覆盖的区域内的内容才会被渲染。这与图形软件中的"遮罩 (Mask)"概念类似。

例如：
- 将一个**圆形**设为**图片**的裁剪源，图片就会呈现为圆形头像。
- 将一个**窗户形状**设为**背景**的裁剪源，可以创建透过窗户看外面的视觉效果。

## [​](#setting-up-clipping) 设置裁剪

1. 选中被裁剪的对象（即你要显示的内容）。
2. 在 [检查器 (Inspector)](/editor/interface-overview/inspector.md) 中找到 **Clipping** 选项。
3. 点击加号，选择作为裁剪源的形状。

裁剪源可以是任何矢量形状，包括程序化图形和自定义路径。

## [​](#inverted-clipping) 反向裁剪 (Inverted Clipping)

默认情况下，裁剪只显示裁剪源**内部**的区域。如果你希望只显示裁剪源**外部**的区域，可以在裁剪设置中启用"反向 (Invert)"选项。

这对于创建"挖孔"效果非常有用（例如：在地面上挖出一个洞，露出下方的隐藏内容）。

## [​](#animating-clips) 动画化裁剪

裁剪源形状本身可以像其他形状一样进行动画化。通过动画化裁剪源的位置、缩放或顶点，你可以创建动态的遮罩效果，如：
- 进度条填充
- 角色从门后走出
- 聚光灯跟随移动

[骨骼 (Bones)](/editor/manipulating-shapes/bones.md)[单独显示 (Solos)](/editor/manipulating-shapes/solos.md)