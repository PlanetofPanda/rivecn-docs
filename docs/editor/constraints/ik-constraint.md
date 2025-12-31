---
title: 'IK 约束 (IK Constraint)'
description: '了解如何在 Rive 中使用反向动力学 (Inverse Kinematics)。'
---

## 关于反向动力学 (IK)

<YouTube videoId="8FK5E5WBUpM" />

### 正向动力学 (Forward Kinematics)

Rive 中大多数骨骼动画都是通过旋转骨骼的角度来完成的。子骨骼的位置根据其父骨骼的旋转而改变。由于要将链末端的骨骼放置在特定位置，通常需要旋转多个父骨骼（链上的骨骼）以达到所需的姿势。这种类型的骨骼摆放过程被称为正向动力学（Forward Kinematics）。

### 反向动力学 (Inverse Kinematics)

反向动力学允许您在骨骼链的末端放置一个目标，系统会自动向回推算，为其上方的父骨骼找到有效的方向。

![Image](https://ucarecdn.com/ffcfbb2c-ad3a-49d4-a4ef-ec83a7e2780c/)

这项技术有很多应用场景，一些比较常见的例子包括让角色指向某个物品，或者让角色的脚踩在地面上。

## 如何创建 IK 约束

要使用 IK，您需要一个骨骼链和一个目标。目标可以使任何对象，但在大多数情况下，您会希望使用一个[样式设置为目标 (Target)](/editor/fundamentals/groups#group-style) 的组。

### 创建骨骼链和目标

使用快捷键 **B** 来创建一个[骨骼链](/editor/manipulating-shapes/bones#how-to-create-bones)。然后使用快捷键 **G** 来创建一个[组](/editor/fundamentals/groups)。在检查器（Inspector）中将该组的样式选项设置为"目标"（Target）。

![Image](https://ucarecdn.com/efde9d84-1364-4cf7-b7a4-16c4834f14f9/)

使用 B 和 G 快捷键分别激活骨骼和组工具。

### 添加 IK 约束

选择您想要受影响的骨骼链中最后的那个骨骼，并使用检查器中的"约束"（Constraints）部分添加一个 IK 约束。

![Image](https://ucarecdn.com/9b320235-1cfb-4a11-9e02-f64d2149cf11/)

### 选择目标

打开约束弹出菜单，并使用目标选择按钮选择在步骤 1 中创建的空组。

![Image](https://ucarecdn.com/9646ddc3-b452-41a8-894f-635ccd12df09/)

### 测试 IK 系统

移动目标组以测试系统是否正常工作。

![Image](https://ucarecdn.com/d646176c-f782-4b04-acf2-2c69ae495e36/)

## 骨骼数量 (Bone Count)

使用"骨骼数量"（Bone Count）属性来设置 IK 系统应该向链条上方影响多少个骨骼。请注意，当选中目标时，受 IK 系统影响的骨骼会以高亮显示。

![Image](https://ucarecdn.com/de7b0c48-49b2-4c6b-8935-1530fef7bffa/)

## 反向方向 (Invert Direction)

使用"反转方向"（Invert Direction）开关来切换 IK 系统求解的角度方向。

![Image](https://ucarecdn.com/c25849b6-b06f-4bd4-a921-fa16fa8de3a9/)

## 强度 (Strength)

使用"强度"（Strength）属性来控制受影响的骨骼跟随目标的程度。强度为 0% 意味着目标完全不会影响受控骨骼。

请注意，强度可以像 Rive 中的大多数属性一样制作动画。利用这一点可以创造独特的视觉效果，或者在两个或多个 IK 约束（每个都有自己的目标）之间进行混合。

![Image](https://ucarecdn.com/b6d8a9bf-c604-4f91-86fe-1c1223aedd89/)

## 约束顺序 (Constraints order)

约束的顺序非常重要。例如，如果一个骨骼有两个 IK 约束，且强度均为 100%，则第二个约束（最下方的那个）将抵消第一个约束。如果它们的强度不是 100%，那么 IK 系统将在两者之间进行混合。使用拖拽操作可以更改约束的顺序。

![Image](https://ucarecdn.com/4751a9cd-f2c8-4b4a-9043-bd71276315f6/)

使用拖拽操作来更改约束的顺序。

## 多个 IK 约束和嵌套目标

您可以为更复杂的骨架设置多个 IK 约束。一个常见的设置是在角色的脚上设置一个 IK 约束（注意在下面的示例中它只影响 1 根骨骼），并为腿部骨骼设置另一个 IK 约束（影响两根骨骼）。腿部目标是脚目标的子级，这样移动脚部也会带动腿部移动。

![Image](https://ucarecdn.com/553313ae-136c-456f-9a72-d756904fa823/)