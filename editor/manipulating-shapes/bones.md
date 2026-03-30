---
title: "骨骼 (Bones) - Rive 编辑器"
description: "操控形状 (Manipulating Shapes) 骨骼允许你为图稿创建骨架。这是一种直观自然的方式，用于动画化多个相互连接的部位，例如手臂、旗帜或树枝。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 形状操控, 骨骼
---

操控形状 (Manipulating Shapes)

# 骨骼 (Bones)

骨骼允许你为图稿创建骨架。这是一种直观自然的方式，用于动画化多个相互连接的部位，例如手臂、旗帜或树枝。

## [​](#creating-bones) 创建骨骼 (Creating Bones)

要创建骨骼，请从工具栏中选择**骨骼工具 (Bone Tool)**，或按快捷键 `B`。激活工具后，在画板上点击并拖动，绘制出第一根骨骼。松开鼠标确认第一根骨骼后，可以继续拖动来创建子骨骼，形成完整的骨骼链。

要回到父级骨骼，请按 `Esc` 键。要在其它骨骼下创建兄弟骨骼，请在层级面板中选中目标骨骼并重新绘制。

## [​](#binding-bones) 绑定骨骼 (Binding Bones)

骨骼创建后需要与形状或网格关联。将形状拖放到骨骼下方，使其成为子级，骨骼的变换就会继承给形状。

对于更复杂的变形，可以为形状添加**网格 (Mesh)**，然后使用权重工具（Weight Tool）将骨骼绑定到网格的特定顶点上。这让你能实现柔软、有机的弯曲效果（如角色身体或飘动的布料）。

## [​](#bone-hierarchy) 骨骼层级 (Bone Hierarchy)

骨骼天然具有父子层级结构。移动父骨骼时，其所有子骨骼会一同跟随。这种"前向运动学 (Forward Kinematics, FK)"是理解骨骼动画的基础。

如果你希望通过移动链条的末端来反推整个链条的姿态（例如抓取物体时手的位置驱动手臂），可以使用**反向动力学约束 (IK Constraint)**。

[裁剪 (Clipping)](/editor/manipulating-shapes/clipping.md)[骨骼技巧 (Bone Tips)](/editor/manipulating-shapes/bone-tips.md)