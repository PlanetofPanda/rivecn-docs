---
title: '平移约束 (Translation Constraint)'
description: ''
---

"平移约束"（Translation Constraint）允许您为对象的位位置设置限制和/或从目标对象复制位置属性。这些属性可以独立激活。

<YouTube videoId="i6OAPcqcPBw" />

## 如何创建平移约束

### 给对象添加平移约束

使用检查器（Inspector）中的"约束"（Constraints）部分给对象添加平移约束。

![Image](https://ucarecdn.com/e5e35967-8cc9-4ee1-b2c3-77a676685a12/)

### 选择目标

使用新约束的弹出菜单为此约束选择一个目标。

![Image](https://ucarecdn.com/2ace484c-661f-4481-8a3c-c3f4b8cd7e42/)

### 测试平移约束是否生效

操作目标对象，现在会自动导致受约束的对象复制位置属性。

![Image](https://ucarecdn.com/61b05061-5636-419a-9d83-2c54a34837d8/)

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

![Image](https://ucarecdn.com/caac6969-e4b6-4bdb-877d-fe548833fd90/)

## 复制 X 和 Y

允许您决定约束所有者是否将在 X 和 Y 方向上复制平移。此外，使用数值来定义其复制该值的比率。

## 最小/最大 (Max/Min)

使用数值来定义约束的最小和最大限制。