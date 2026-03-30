---
title: "布局动画 (Animation) - Rive 编辑器"
description: "布局 (Layouts) 通过向布局容器添加动画，你可以定义内容在重新排版 (Reflow) 时的插值方式。当布局容器调整大小时，其子元素可能需要改变位置。添加布局动画可以让子元素的重排随时间平滑过渡，并配合你选择的缓动曲线。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 布局, 布局动画
---

布局 (Layouts)

# 布局动画 (Animation)

通过向布局容器添加动画，你可以定义内容在重新排版 (Reflow) 时的插值方式。当布局容器调整大小时，其子元素可能需要改变位置。添加布局动画可以让子元素的重排随时间平滑过渡，并配合你选择的缓动曲线。

## [​](#adding-layout-animation) 添加布局动画

首先选中一个布局组件，点击检查器中 `Layout Animation` 旁的 `+` 按钮。通常建议在父布局上进行设置。

接下来，从 3 种模式中选择：
- **无 (None)**：不使用动画。
- **继承 (Inherit)**：从父布局继承动画参数。
- **自定义 (Custom)**：为选中的布局定义独立的动画参数。

选择自定义选项后，你可以设置持续时间 (Duration) 和插值类型 (Interpolation)，类似于状态机的过渡设置。所有插值类型（除了三次方插值）均受支持。

[样式 (Styles)](https://help.rive.app/editor/layouts/layout-styles)[N轴切片 (N-Slicing)](/editor/layouts/n-slicing.md)