---
title: '距离约束 (Distance Constraint)'
description: '距离约束使对象保持靠近、远离另一个对象，或与另一个对象保持精确的特定距离。'
---

## 如何创建距离约束 (Distance Constraint)

<YouTube videoId="Nvwf27EIvdw" />

### 给对象添加距离约束

使用检查器（Inspector）中的"约束"（Constraints）部分给对象添加距离约束。

![Image](https://ucarecdn.com/b6ad1d9b-706a-4090-9585-cb2954bfc45a/)

### 选择目标

使用新约束的弹出菜单为此约束选择一个目标。

![Image](https://ucarecdn.com/ce97fabc-04ab-463c-bd77-0c75a37f43a1/)

### 测试距离约束是否生效

移动目标对象，现在会自动导致受约束的对象保持靠近（这是默认模式）。

![Image](https://ucarecdn.com/0cf99e7d-b1e1-4a0a-988d-9235c28e5868/)

## 强度 (Strength)

"强度"属性决定了受约束对象受影响的程度。

强度为 0% 意味着该约束不会产生任何效果。

## 距离 (Distance)

对象相对于目标对象的约束距离。在舞台上会绘制一个红色的约束圆圈来表示这个数值。

## 模式 (Mode)

### 更近 (Closer)

所有者被约束在比"距离"（Distance）设置更近的位置。换句话说，所有者被约束在约束球体的内部。

### 更远 (Further)

所有者被约束在比"距离"（Distance）设置更远的位置。换句话说，所有者被约束在约束球体的外部。

### 精确 (Exactly)

所有者被精确地约束在约束球体的距离上。