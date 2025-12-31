---
title: 路径测量 (PathMeasure)
---

## 字段 (Fields)

### `length`

跨越所有轮廓的路径总长度。
```lua
local measure = path:measure()
local pathLength = measure.length
```

### `isClosed`

仅当路径恰好包含一个轮廓且该轮廓已闭合时返回 true。具有多个轮廓的路径始终返回 false，即使所有轮廓都已闭合也是如此。

## 方法 (Methods)

### `positionAndTangent`

返回沿路径给定距离处的位置和切向量。该距离被限制在有效范围 [0, length] 内。返回两个 [向量 (Vector)](/scripting/api-reference/vector) 值：位置和归一化后的切向量。

### `warp`

将一个点扭曲到路径上。源点的 x 坐标被解释为沿路径的距离，y 坐标被用作沿切线方向的偏移量。以 [向量 (Vector)](/scripting/api-reference/vector) 形式返回扭曲后的位置。

### `extract`

提取路径中从 startDistance 到 endDistance 的子部分，并将其追加到目标路径。距离被限制在有效范围 [0, length] 内。如果 startWithMove 为 true（默认值），提取的片段将以 `moveTo` 操作开始。如果为 false，它将从目标路径中的上一个点继续。
