---
title: "约束类型 (Constraint Types) - Rive 编辑器"
description: "约束 (Constraints) Rive 提供了多种约束类型，用于控制对象之间的关系。每种约束都有其特定的用途和配置选项。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 约束, 约束类型
---

约束 (Constraints)

# 约束类型 (Constraint Types)

Rive 提供了多种约束类型，用于控制对象之间的关系。每种约束都有其特定的用途和配置选项。

## [​](#available-constraints) 可用的约束类型

### [IK 约束 (IK Constraint)](/editor/constraints/ik-constraint.md)
反向动力学约束。通过在骨骼链末端放置目标点，系统自动计算父级骨骼的旋转角度。常用于角色的手臂、腿部动画，让脚"踩"在地面上或让手指向某个物体。

### [距离约束 (Distance Constraint)](/editor/constraints/distance-constraint.md)
限制两个对象之间的距离。可以设置最小距离（防止过近）、最大距离（防止过远）或固定距离（保持恒定间隔）。

### [位移约束 (Translation Constraint)](/editor/constraints/translation-constraint.md)
让一个对象跟随另一个对象的位置移动。可以单独控制 X 轴、Y 轴或两者的跟随行为。

### [旋转约束 (Rotation Constraint)](/editor/constraints/rotation-constraint.md)
让一个对象跟随另一个对象的旋转角度。常用于让多个齿轮同步转动或让眼睛跟随目标。

### [缩放约束 (Scale Constraint)](/editor/constraints/scale-constraint.md)
让一个对象跟随另一个对象的缩放比例。可以实现联动缩放效果。

### [变换约束 (Transform Constraint)](/editor/constraints/transform-constraint.md)
综合约束，同时复制目标对象的位移、旋转和缩放。让一个对象完全镜像另一个对象的所有变换属性。

### [路径跟随约束 (Follow Path Constraint)](/editor/constraints/follow-path-constraint.md)
让对象沿着一条路径移动。非常适合创建沿轨道运动的动画，如过山车、行星轨道或自定义运动路径。

### [滚动约束 (Scroll Constraint)](/editor/constraints/scroll-constraint.md)
专为布局 (Layout) 对象设计的特殊约束，允许其子元素进行滚动。支持构建可滚动内容区域和滚动条。

---

## [​](#common-properties) 通用属性

所有约束都共享一些通用属性：

- **强度 (Strength)**：控制约束的影响程度（0% = 无影响，100% = 完全影响）。可以设置动画来平滑地启用/禁用约束或混合多个约束。
- **目标 (Target)**：指定约束参照的对象。
- **约束顺序**：当一个对象有多个约束时，顺序会影响最终结果。可以拖放来调整顺序。

[约束概览 (Overview)](/editor/constraints/overview.md)[IK 约束 (IK Constraint)](/editor/constraints/ik-constraint.md)