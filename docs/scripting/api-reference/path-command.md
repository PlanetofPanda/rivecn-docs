---
title: 路径命令 (PathCommand)
---

路径命令 (PathCommand) 代表路径 (Path) 内部的一条绘图指令。每条命令都有一个类型，并根据该类型具有不同数量的点。

## 字段 (Fields)

### `type`

命令类型。参见 [命令类型 (CommandType)](/scripting/api-reference/command-type)。

## 方法 (Methods)

### `__len`

点数量因命令而异。`moveTo` 和 `lineTo` 只有两个点，`cubicTo` 有 6 个点，而 `close` 则没有点。
返回此命令中存储的点数。
