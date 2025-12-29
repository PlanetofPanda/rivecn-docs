布局 (Layouts)

# 布局概览 (Layouts Overview)

布局 (Layouts) 让你能够在 Rive 中构建响应式 UI 组件。你可以根据可用空间让设计适应 (Fit)、填充 (Fill) 或重排 (Reflow) 内容。

## [​](#why-use-layouts) 为什么使用布局？

传统的固定尺寸设计在不同屏幕或容器大小下可能会出现问题。通过布局，你可以创建：
- 能够自适应窗口大小的**响应式界面**。
- 当内容变化时（如文本长度改变）**自动调整**的组件。
- 类似 Web 开发中 Flexbox 的**流式排版**效果。

## [​](#layout-types) 布局类型

布局容器有几种类型，主要决定了子元素的排列方向：
- **Row (行)**：子元素水平排列。
- **Column (列)**：子元素垂直排列。
- **Stack (堆叠)**：子元素在同一位置叠加（类似绝对定位）。

## [​](#getting-started) 快速开始

1. 选中你想要放入布局的对象。
2. 在检查器 (Inspector) 中点击 **Layout** 按钮，将其转换为布局容器。
3. 调整布局属性，如**方向 (Direction)**、**间距 (Gap)**、**对齐 (Alignment)** 等。

布局可以嵌套（布局内含布局），以创建复杂的响应式结构。

## [​](#key-concepts) 核心概念

- **Fit 内容 (Hug)**：布局容器的尺寸收缩以包裹其子元素。
- **Fill 空间**：子元素扩展以填满布局容器的可用空间。
- **Reflow 重排**：当容器尺寸改变时，子元素自动重新定位。

## [​](#advanced-features) 高级特性

布局还支持：
- **[N轴切片 (N-Slicing)](/editor/layouts/n-slicing.md)**：让位图或矢量设计可伸缩而不失真。
- **[滚动 (Scrolling)](/editor/layouts/scrolling.md)**：为溢出内容提供触摸滚动功能。
- **[布局动画 (Animation)](/editor/layouts/layout-animation.md)**：定义内容重排时的过渡插值。

[N轴切片 (N-Slicing)](/editor/layouts/n-slicing.md)[布局参数 (Parameters)](/editor/layouts/layout-parameters.md)