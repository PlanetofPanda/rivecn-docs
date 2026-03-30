---
title: "摇杆控制 (Joysticks) - Rive 编辑器"
description: "摇杆控制 (Joysticks) 允许你通过一个简单的二维控制柄来驱动复杂的蒙皮和变形动画。 与其手动为成百上千个顶点设置复杂的关键帧，你可以将这些变形状态映射到一个摇杆上。通过移动摇杆，系统会自动在这些预设状态之间进行线性插值。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 形状操控, 摇杆控制
---

操控形状

# 摇杆控制 (Joysticks)

摇杆控制 (Joysticks) 允许你通过一个简单的二维控制柄来驱动复杂的蒙皮和变形动画。

## [​](#the-power-of-joysticks) 摇杆的核心威力

与其手动为成百上千个顶点设置复杂的关键帧，你可以将这些变形状态映射到一个摇杆上。通过移动摇杆，系统会自动在这些预设状态之间进行线性插值。

> *[原文档演示图由于官方服务器迁移已失效]* (描述: 摇杆示例 Pn)

## [​](#setting-up) 设置摇杆

1. 创建一个摇杆对象。
2. 定义四个极值方向（上、下、左、右）的对象状态。
3. 摇杆会根据控制柄的位置自动计算中间状态。

[路径裁剪 (Trim Path)](/editor/manipulating-shapes/trim-path.md)[文本概览 (Text Overview)](/editor/text/overview.md)