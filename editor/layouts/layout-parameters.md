---
title: "布局参数 (Parameters) - Rive 编辑器"
description: "布局 (Layouts) 布局参数大致可以分为两类：影响父布局的参数和影响子布局的参数。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 布局, 布局参数
---

布局 (Layouts)

# 布局参数 (Parameters)

布局参数大致可以分为两类：影响父布局的参数和影响子布局的参数。

在 Rive 中，请记住布局参数通常只影响其他布局容器。这通常会导致布局的嵌套以实现所需效果，但也为与 Rive 更自由的画布进行创意混合提供了机会。

---

## [​](#absolute-vs-relative) 绝对布局与相对布局

要控制行 (Row) 或列 (Column) 中子布局的流向，需要子布局为**相对 (Relative)** 模式。你可以在检查器右上角切换。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 模式切换 Pn)

- **绝对布局 (Absolute)**：在画板或父布局容器中定位自己。可以将 2 条或更多边缘固定 (Pinned) 到容器。
- **相对布局 (Relative)**：位置由父级定义。更改父级的 flex 属性将决定子布局的行为。

## [​](#scale-types) 缩放类型

布局的宽度和高度可以使用 3 种不同的缩放行为：
- **固定 (Fixed)**：宽度或高度为固定值（点或百分比）。
- **包裹 (Hug)**：宽度/高度缩小以适应其子元素。例如，让布局包裹文本对象，随文本长度自动调整大小。
- **填充 (Fill)**：扩展宽度/高度以填满整个父布局或画板的可用空间。

## [​](#size-constraints) 尺寸约束

由于可以设置最小 (Min) 和最大 (Max) 宽度/高度。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 尺寸约束 Pn)

## [​](#clip) 裁剪 (Clip)
开启后会隐藏布局边界之外的所有子元素。

## [​](#position-absolute-layouts-only) 位置 (仅限绝对布局)
绝对布局允许你将边缘固定 (Pin) 到容器。你可以设置至少 2 个固定边缘（一横一纵）。

## [​](#padding-and-margin) 内边距 (Padding) 与外边距 (Margin)
- **内边距 (Padding)**：布局边界与相对子布局之间的内部空间。
- **外边距 (Margin)**：布局边界与父布局之间的外部空间。

---

## [​](#layout-children) 布局子项
布局的 flex 参数仅应用于其内部包含的其他布局。为了生成自动流向的行、列和网格，内容项目本身必须被包裹在额外的布局容器中。

## [​](#row/column) 行/列
- **行 (Row)**：沿水平轴排列子项。
- **列 (Column)**：沿垂直轴排列子项。
- 支持反向排布 (Reverse)。

## [​](#wrap) 换行 (Wrap)
- **不换行 (No Wrap)**：内容超出边界时继续延伸。
- **换行 (Wrap)**：内容到达边界时，下一个项目将放在下方或旁边。

## [​](#alignment) 对齐 (Alignment)
在检查器的小窗口中选择对齐点。

## [​](#justify) 对齐方式 (Justify)
使内容填满可用空间。

## [​](#gap) 间距 (Gap)
可以设置水平和垂直方向的间距。

[工具 (Tools)](/editor/layouts/layout-tools.md)[样式 (Styles)](https://help.rive.app/editor/layouts/layout-styles)