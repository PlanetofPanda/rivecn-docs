---
title: 指针事件 (PointerEvent)
---

代表一个包含位置和指针 ID 的指针交互事件。

## 字段 (Fields)

### `position`

指针在本地坐标系中的位置。

### `id`

指针的唯一标识符。

## 构造函数 (Constructors)

### `new`

使用给定的 ID 和位置创建一个新的 [指针事件 (PointerEvent)](/scripting/api-reference/pointer-event)。

## 方法 (Methods)

### `hit`

将事件标记为已处理。如果 `isTranslucent` 为 true，则事件可能会继续穿过半透明的击中目标进行传播。
