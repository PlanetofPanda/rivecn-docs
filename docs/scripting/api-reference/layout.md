---
title: 布局 (Layout)
---

一种脚本化的布局 (Layout)，其功能与 [节点 (Node)](/scripting/api-reference/node) 类似，但还具有通过 `resize` 适应所提供的布局框 (layout box) 的能力。它还可以进行固有尺寸探测 (intrinsically sized)，允许宿主布局通过使用 `measure` 函数报告所需的维度，从而尝试适应其大小。

参见 [布局脚本 (Layout Scripts)](/scripting/protocols/layout-scripts)。

## 方法 (Methods)

### `measure`

提供此方法后，可以探测布局的固有尺寸或请求特定大小。这并不保证一定生效，因为布局可能具有最小/最大维度限制。在测量后，将以授予的大小调用 `resize`。

### `resize`

保证会被调用以设置初始大小，并且每当大小发生变化时也会被调用。
