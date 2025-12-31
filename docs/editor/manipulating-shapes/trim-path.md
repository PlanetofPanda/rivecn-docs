---
title: '修剪路径 (Trim Path)'
description: ''
---

"修剪路径"功能允许您只绘制矢量形状描边（stroke）的一部分。这可以用于创建各种线条沿路径移动的动画。您为形状创建的每一个描边都可以拥有其独立的修剪路径。

![Image](https://ucarecdn.com/996191bd-6394-4aa3-be85-1a5a46150220/)

## 启用修剪路径 (Enable trim path)

要激活修剪路径，请选择一个带有描边的形状，并在检查器中点击描边选项。现在，使用 "Trim Path" 下拉菜单并选择 "Sequential"（顺序）或 "Synced"（同步）模式。两种模式都会启用修剪路径，但在包含多个路径的形状上表现不同。

### 顺序 (Sequential)

当修剪路径设置为 "Sequential" 时，各路径会按顺序制作动画。它们动画的顺序由它们在形状图层下的排列顺序决定。

![Image](https://ucarecdn.com/b1e23052-84c2-4b55-8653-9af6253953a4/)

### 同步 (Synced)

"Synced" 模式会同时在所有路径上执行修剪路径动画。

![Image](https://ucarecdn.com/fba474d1-ab60-444f-a89c-fa5fedda0f77/)

## 起点与终点 (Start and end)

描边的修剪发生在起点（Start point）和终点（End point）之间。默认情况下，所有形状的描边起点为 0%，终点为 100%。更改这些数值可以修改修剪起点和终点的位置（这些位置由路径总长度的百分比表示）。

![Image](https://ucarecdn.com/e5c990dd-278f-4f41-b2d7-5d95fa46127d/)

## 偏移 (Offset)

使用 "Offset"（偏移）可以轻松移动路径上被修剪出来的部分。

![Image](https://ucarecdn.com/50b672cd-610a-4829-a46d-5f106dcad0e9/)

# 虚线描边 (Dashed Stroke)

与修剪路径非常相似，"虚线描边"选项允许您动态更改并制作路径部分的动画。虚线描边允许您自定义虚线的尺寸以及在路径周围偏移虚线。请注意，您可以为一个路径添加多个虚线尺寸和间距。

![Image](https://ucarecdn.com/56fa4778-555d-460e-8133-809e73c7746a/)

## 虚线长度 (Dash)

"Dash" 属性控制虚线段的大小。此选项可以使用像素值，也可以使用路径长度的百分比。

![Image](https://ucarecdn.com/34d7c4d3-3f92-4140-9a12-bc83b67f8e0d/)

## 偏移 (Offset)

"Offset" 属性使虚线沿路径移动。此选项可以使用像素值，也可以使用百分比。

![Image](https://ucarecdn.com/1b2bf36f-940e-4e56-a1ef-4d98c6cbd8b7/)