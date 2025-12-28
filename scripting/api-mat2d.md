脚本 API

# Mat2D

表示一个 2D 变换矩阵，包含缩放、旋转、剪切和平移分量。

## [​](#fields) 字段 (Fields)

### [​](#xx) `xx`

矩阵的 xx 分量。

### [​](#xy) `xy`

矩阵的 xy 分量。

### [​](#yx) `yx`

矩阵的 yx 分量。

### [​](#yy) `yy`

矩阵的 yy 分量。

### [​](#tx) `tx`

沿 x 轴的平移。

### [​](#ty) `ty`

沿 y 轴的平移。

### [​](#withtranslation) `withTranslation`

从给定的 x 和 y 值或从 [向量 (Vector)](/scripting/api-reference/vector) 位置创建一个平移矩阵。

### [​](#withscale) `withScale`

从给定的 x 和 y 值或从 [向量 (Vector)](/scripting/api-reference/vector) 创建一个缩放矩阵。

### [​](#withscaleandtranslation) `withScaleAndTranslation`

从数值或向量创建一个缩放和平移矩阵。

## [​](#constructors) 构造函数 (Constructors)

### [​](#values) `values`

使用指定的分量创建一个矩阵。

### [​](#identity) `identity`

返回单位矩阵。

### [​](#withrotation) `withRotation`

从给定的弧度角创建一个旋转矩阵。

## [​](#methods) 方法 (Methods)

### [​](#invert) `invert`

提供对矩阵分量的索引访问。
返回矩阵的逆矩阵，如果矩阵不可逆，则返回 nil。

### [​](#isidentity) `isIdentity`

如果矩阵是单位变换，则返回 true。

### [​](#eq) `__eq`

如果两个矩阵的所有分量都相等，则返回 true。

### [​](#mul) `__mul`

通过矩阵变换给定的向量并返回结果。

### [​](#mul-2) `__mul`

返回此矩阵与给定矩阵的矩阵乘积。