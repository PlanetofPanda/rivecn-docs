---
title: '缩放约束 (Scale Constraint)'
description: "缩放约束允许您为对象的缩放设置限制和/或从目标对象复制缩放属性。这些属性可以独立激活。"
---

<YouTube videoId="4fFuGQHAiIQ" />

## 如何创建缩放约束

### 给对象添加缩放约束

使用检查器（Inspector）中的"约束"（Constraints）部分给对象添加缩放约束。

![Image](https://ucarecdn.com/ae4a6d01-89b4-423d-988d-73a7094e4d8a/)

### 选择目标

![Image](https://ucarecdn.com/dde72565-7f0f-447b-a98a-3cc33c55c79a/)

使用新约束的弹出菜单为此约束选择一个目标。

![Image](https://ucarecdn.com/52454a24-75d9-464b-8c8e-29de2e620b8a/)

### 测试缩放约束是否生效

操作目标对象，现在会自动导致受约束的对象产生缩放属性变化。

## 强度 (Strength)

"强度"属性决定了受约束对象受影响的程度。

强度为 0% 意味着该约束不会产生任何效果。

强度为 50% 意味着将应用目标值的一半。

## 变换空间 (Transform Space)

### 源空间 (Source Space)

选择此约束在源空间中应使用"世界"（World）坐标还是"本地"（Local）坐标。

### 目标空间 (Destination Space)

选择此约束在目标空间中应使用"世界"（World）坐标还是"本地"（Local）坐标。

### 最小/最大空间 (Min/Max Space)

选择此约束在最小/最大空间中应使用"世界"（World）坐标还是"本地"（Local）坐标。