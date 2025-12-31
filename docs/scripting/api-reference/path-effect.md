---
title: 路径效果 (PathEffect)
---

一种应用于路径的脚本化效果。

## 方法 (Methods)

### `init`

在创建或附加效果时调用一次。返回 `true` 以保持效果激活，或者返回 `false` 以禁用它。

### `update`

每当输入项发生变化时调用。您将接收到原始的 [路径数据 (PathData)](/scripting/api-reference/path-data)，并且必须返回用于渲染的路径。

### `advance`

每一帧都会被调用，用于随着时间的推移推进效果。`seconds` 是自上一帧以来的时间增量。返回 `true` 以保持效果激活，或者返回 `false` 以禁用它。
