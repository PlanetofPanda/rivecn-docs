---
title: '旋转约束 (Rotation Constraint)'
description: "旋转约束允许您为对象的旋转设置限制和/或从目标对象复制旋转属性。这些属性可以独立激活。"
---

<YouTube videoId="YrQeUrzYoi8" />

## 如何创建旋转约束

### 给对象添加旋转约束

使用检查器（Inspector）中的"约束"（Constraints）部分给对象添加旋转约束。

![Image](https://ucarecdn.com/22a86fbf-4171-4d1e-b18a-f099b6d89aad/)

### 选择目标

使用新约束的弹出菜单为此约束选择一个目标。

![Image](https://ucarecdn.com/c18c068a-c500-4f87-8f32-726a04776daf/)

### 测试旋转约束是否生效

操作目标对象，现在会自动导致受约束的对象复制旋转属性。

![Image](https://ucarecdn.com/9961824a-a435-48d6-9366-b9f24f8bb730/)

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

## 偏移 (Offset)

允许约束所有者相对于约束源进行手动偏移。

![Image](https://ucarecdn.com/d58cee7e-20cd-4586-b1c3-f1a807e94e84/)

## 复制 (Copy)

定义复制旋转属性的比率。

## 最小/最大 (Min/Max)

使用数值来定义约束的最小和最大限制。