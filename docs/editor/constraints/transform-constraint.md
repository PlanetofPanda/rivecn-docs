---
title: '变换约束 (Transform Constraint)'
description: '变换约束允许其所有者从目标对象复制所有变换属性，无论其层级关系如何。这些属性包括位置、旋转和缩放。'
---

<YouTube videoId="pJfWNtVBrvM" />

## 如何创建变换约束

### 给对象添加变换约束

使用检查器（Inspector）中的"约束"（Constraints）部分给对象添加变换约束。

![Image](https://ucarecdn.com/17a0bf31-0430-46cd-9980-2650a08a27cb/)

### 选择目标

使用新约束的弹出菜单为此约束选择一个目标。

![Image](https://ucarecdn.com/c5320720-2332-4c4a-8784-cda0aee1423b/)

### 测试变换约束是否生效

操作目标对象，现在会自动导致受约束的对象复制位置、旋转和缩放属性。

![Image](https://ucarecdn.com/ced5a14f-0add-4300-bdee-2738983c46b3/)

## 强度 (Strength)

"强度"属性决定了受约束对象受影响的程度。

强度为 0% 意味着该约束不会产生任何效果。

强度为 50% 意味着将应用目标值的一半。

![50% Strength](https://ucarecdn.com/73b4a724-6707-4cd0-80a0-5e6813327a5a/)

## 变换空间 (Transform Space)

### 源空间 (Source Space)

选择此约束在源空间中应使用"世界"（World）坐标还是"本地"（Local）坐标。

### 目标空间 (Destination Space)

选择此约束在目标空间中应使用"世界"（World）坐标还是"本地"（Local）坐标。

## 示例：机械臂

考虑下图中放在桌子上的包裹和下方的机械臂。

![Image](/images/editor/constraints/6c362145-62a9-4af2-8986-5751d1846cc7.webp)

为包裹添加一个变换约束，并为机械臂末端的组添加一个目标。

![Image](https://ucarecdn.com/86ac428d-ed87-4846-b448-4504214ed127/)

目标组是机械臂层级结构的子级，因此它随机械臂一起移动。

当强度（Strength）为 100% 时，包裹的所有变换属性都与目标匹配。观察包裹如何随着机械臂的移动正确地移动和旋转。

![Image](https://ucarecdn.com/411ce58c-031c-4f34-88c4-a7f40a5efbc0/)

将强度设置为 0% 即可让机械臂放下包裹。