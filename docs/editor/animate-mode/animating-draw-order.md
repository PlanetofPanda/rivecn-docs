---
title: '动画绘制顺序'
description: ''
---

您可以在设计时通过在[层级结构 (Hierarchy)](/editor/interface-overview/hierarchy) 中上下移动项目来更改图形的绘制顺序——但如果您想在动画过程中更改绘制顺序呢？或者，如果您想在不破坏当前层级结构的情况下更改绘制顺序呢？Rive 允许您通过"绘制顺序规则"（Draw Order Rules）来实现这一点。

<YouTube videoId="6J3JIwgUwe0" />

## 绘制顺序规则 (Draw Order Rules)

要为组或形状的绘制顺序制作动画，首先请选中它。使用检查器（Inspector）中的"绘制顺序"（Draw Order）部分来创建绘制顺序规则。

![Image](/images/editor/animate-mode/426adab7-b1d3-47bc-bc42-c5cc397fa9d6.webp)

"常规"（Normal）规则是默认顺序（基于[层级结构 (Hierarchy)](/editor/interface-overview/hierarchy) 顺序）。当该规则旁边的单选按钮处于活动状态时，形状将以其默认绘制顺序显示。

绘制顺序规则允许您选择一个目标（注意这必须是一个可绘制项目，而不是组），并选择是在该目标的上方还是下方绘制。

::: info
目标必须是一个可绘制项目，例如形状。它不能是一个组。
:::

在动画模式下，使用绘制顺序规则旁边的单选按钮来设置关键帧。请注意，这些是[保持关键帧 (Hold keys)](/editor/animate-mode/interpolation-easing#hold)，因为绘制顺序无法进行插值。

![Image](https://ucarecdn.com/32925768-cbcf-461c-9fe1-b745bf90a34d/)