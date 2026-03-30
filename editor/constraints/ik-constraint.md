---
title: "IK 约束 (IK Constraint) - Rive 编辑器"
description: "约束 (Constraints) 学习如何在 Rive 中使用反向动力学 (Inverse Kinematics)。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 约束, IK 约束
---

约束 (Constraints)

# IK 约束 (IK Constraint)

学习如何在 Rive 中使用反向动力学 (Inverse Kinematics)。

## [​](#about-inverse-kinematics-ik) 关于反向动力学 (IK)

### [​](#forward-kinematics) 正向动力学 (Forward Kinematics)

Rive 中的大部分骨骼动画通过旋转骨骼的角度来完成。子级骨骼的位置会随着父级骨骼的旋转而变化。要让链条末端的骨骼到达特定位置，需要依次旋转多个父级骨骼。这种模式称为"正向动力学"。

### [​](#inverse-kinematics) 反向动力学 (Inverse Kinematics)

反向动力学允许你在骨骼链的末端放置一个目标点，系统会自动反推计算父级骨骼需要如何旋转才能使末端到达该目标。
![IK 示意图](https://help.rive.app/images/image_0.png)
常见应用包括：让角色用手指向某个物体，或让角色的脚"踩"在地面上。

## [​](#how-to-create-an-ik-constraint) 如何创建 IK 约束

使用 IK 需要一条骨骼链和一个目标对象。目标可以是任何对象，但通常使用 [样式设为 Target 的分组](/editor/fundamentals/groups.md#group-style)。

1. **创建骨骼链和目标**：按 `B` 创建[骨骼链](/editor/manipulating-shapes/bones.md)，按 `G` 创建一个[分组](/editor/fundamentals/groups.md)，并将分组样式设为 Target。
2. **添加 IK 约束**：选中你希望受影响的最后一根骨骼，在检查器的 Constraints 部分添加 IK Constraint。
3. **选择目标**：展开约束菜单，点击 Target 按钮选择步骤 1 中创建的空分组。
4. **测试 IK 系统**：移动目标分组，观察骨骼链是否按预期跟随。

## [​](#bone-count) 骨骼数量 (Bone Count)

使用 Bone Count 属性设置 IK 系统向上影响多少根骨骼。当目标被选中时，受影响的骨骼会高亮显示。

## [​](#invert-direction) 反转方向 (Invert Direction)

使用 Invert Direction 开关可以翻转 IK 系统求解的弯曲方向（例如：肘部向内弯还是向外弯）。

## [​](#strength) 强度 (Strength)

Strength 属性控制受影响骨骼跟随目标的程度。0% 表示目标不影响骨骼。
*提示：Strength 可以设置动画，用于混合多个 IK 约束或创建独特效果。*

## [​](#constraints-order) 约束顺序

约束的顺序很重要。例如，如果一根骨骼有两个 IK 约束且强度都是 100%，则最后添加的约束（最底部）会覆盖前一个。你可以拖放来调整约束顺序。

## [​](#multiple-ik-constraints-and-nested-targets) 多重 IK 约束与嵌套目标

你可以为复杂的绑定设置多个 IK 约束。常见做法是为角色的脚设置一个 IK（影响 1 根骨骼），为腿部设置另一个 IK（影响 2 根骨骼）。腿部目标作为脚部目标的子级，这样移动脚就会带动腿。

[概览 (Overview)](/editor/constraints/overview.md)[距离约束 (Distance Constraint)](/editor/constraints/distance-constraint.md)