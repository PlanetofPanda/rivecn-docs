---
title: 路径数据 (PathData)
---

路径数据 (PathData) 是 [路径命令 (PathCommand)](/scripting/api-reference/path-command) 对象的索引集合。路径 (Path) 和路径数据 (PathData) 的行为都类似于命令数组，并支持通过 `ipairs` 进行遍历。

## 方法 (Methods)

### `__len`

每一项都是一个描述路径中一个分段或动作的 [路径命令 (PathCommand)](/scripting/api-reference/path-command)。
返回路径中的命令数量。

### `contours`

返回路径中第一个轮廓的 [轮廓测量 (ContourMeasure)](/scripting/api-reference/contour-measure)。轮廓是 `moveTo` 操作之间的一系列路径段。使用返回的轮廓测量对象上的 `next` 属性来遍历后续轮廓。如果路径没有轮廓，则返回 nil。

### `measure`

返回一个 [路径测量 (PathMeasure)](/scripting/api-reference/path-measure)，用于测量跨越所有轮廓的整个路径。它提供了总长度，并允许对路径整体进行操作。
