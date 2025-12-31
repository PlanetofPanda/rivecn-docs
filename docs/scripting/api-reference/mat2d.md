---
title: 2D 矩阵 (Mat2D)
---

代表一个 2D 变换矩阵，包含用于缩放、旋转、倾斜和平移的分量。

## 字段 (Fields)

### `xx`

矩阵的 xx 分量。

### `xy`

矩阵的 xy 分量。

### `yx`

矩阵的 yx 分量。

### `yy`

矩阵的 yy 分量。

### `tx`

沿 x 轴的平移量。

### `ty`

沿 y 轴的平移量。

### `withTranslation`

基于给定的 x 和 y 值或 [向量 (Vector)](/scripting/api-reference/vector) 位置创建一个平移矩阵。

### `withScale`

基于给定的 x 和 y 值或 [向量 (Vector)](/scripting/api-reference/vector) 创建一个缩放矩阵。

### `withScaleAndTranslation`

基于数值或向量创建一个缩放并平移的矩阵。

## 构造函数 (Constructors)

### `values`

使用指定的分量创建一个矩阵。

### `identity`

返回单位矩阵。

### `withRotation`

基于给定的弧度角创建一个旋转矩阵。

## 方法 (Methods)

### `invert`

返回矩阵的逆矩阵，如果矩阵不可逆，则返回 nil。

### `isIdentity`

如果矩阵是单位变换矩阵，则返回 true。

### `__eq`

如果两个矩阵的所有分量都相等，则返回 true。

### `__mul`

使用矩阵对给定向量进行变换并返回结果。

### `__mul`

返回此矩阵与给定矩阵的矩阵乘积。
