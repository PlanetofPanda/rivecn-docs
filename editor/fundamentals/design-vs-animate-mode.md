---
title: "设计模式对比动画模式 (Design vs Animate Mode) - Rive 编辑器"
description: "基础概念 (Fundamentals) Rive 编辑器具有两种截然不同的模式：设计 (Design) 和动画 (Animate)。在不同模式间切换会改变界面显示的工具和选项。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 基础概念, 设计模式对比动画模式
---

基础概念 (Fundamentals)

# 设计模式对比动画模式 (Design vs Animate Mode)

Rive 编辑器具有两种截然不同的模式：设计 (Design) 和动画 (Animate)。在不同模式间切换会改变界面显示的工具和选项。

## [​](#design-mode) 设计模式 (Design Mode)

使用设计模式为动画准备图形。在这里，你可以使用 Rive 的[工具](../interface-overview/toolbar.md)设计图形、[导入外部素材](./importing-assets.md)，或者是通过[骨骼](../manipulating-shapes/bones.md)、[变换空间](./origin-freeze.md)、[布局](/editor/layouts/overview.md)、[摇杆](/editor/manipulating-shapes/joysticks.md)及[约束](/editor/constraints/overview.md)进行绑定。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 设计模式界面)
设计模式是任何尚未创建动画的文件的默认模式。该模式存在的原因是 Rive 允许在一个画板上添加多个动画，因此你需要一个地方来统一设置和创建图形基础。

## [​](#animate-mode) 动画模式 (Animate Mode)

使用 [动画模式](/editor/animate-mode/overview.md) 为你的画板创建所有的 [状态 (States)](/editor/state-machine/states.md) 和 [状态机 (State Machine)](/editor/state-machine/overview.md)。
当你切换到动画模式时，UI 会更新并显示与[活动画板](/editor/fundamentals/artboards.md#active-artboard)相关联的时间轴列表和状态机。同时，[检查器 (Inspector)](/editor/interface-overview/inspector.md) 也会在所有可动画化的属性旁显示关键帧按钮。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 动画模式界面)
在动画列表中选择任何“时间轴动画 (Animation)”将调出时间轴视图，而选择“状态机 (State Machine)”则会将时间轴替换为图表(Graph)视图。

## [​](#creating-assets-in-animate-mode) 在动画模式下创建素材 (Creating Assets in Animate Mode)

尽管存在不同的模式，但在两种模式下都可以创建和更改图形，但请务必记住以下几点：
1. **时间轴选中时**：如果选中了具体的时间轴，任何对路径、形状或属性的更改都将**自动在时间轴上生成关键帧**。因此，我们建议不要在选中时间轴时创建素材。
2. **状态机选中时**：如果选中了状态机，其表现与设计模式一致。创建素材、绑定或其他设计更改**不会**自动产生关键帧。这让你无需切换模式即可进行设计调整。我们建议在设计模式下进行重大改动，而仅在动画模式下添加如碰撞体 (hitboxes) 或布局调整等快速微调。

[概览 (Overview)](/editor/fundamentals/overview.md)[画板 (Artboards)](/editor/fundamentals/artboards.md)