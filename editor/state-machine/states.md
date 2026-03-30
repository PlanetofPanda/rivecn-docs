---
title: "状态 (States) - Rive 编辑器"
description: "状态机 (State Machines) 状态本质上就是可以在状态机中任意时刻播放的时间轴动画。一个状态可以简单到只是改变对象的颜色和位置，也可以复杂到混合多条时间轴动画。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 状态机, 状态
---

状态机 (State Machines)

# 状态 (States)

状态本质上就是可以在状态机中任意时刻播放的时间轴动画。一个状态可以简单到只是改变对象的颜色和位置，也可以复杂到混合多条时间轴动画。

## [​](#default-states) 默认状态 (Default States)

默认状态是每个状态机创建时自动添加的状态。
![默认状态](https://help.rive.app/images/42815967-dd47-4da1-ba8a-4fc12f64d972.webp)

### [​](#entry-state) 入口状态 (Entry State)
入口状态是状态机的起始点。默认已关联一个动画，但你可以随时更换。你也可以将多个动画连接到入口状态（例如：需要一个开关可以从"开"或"关"任一状态启动）。

### [​](#exit-state) 退出状态 (Exit State)
退出状态用于告诉状态机图层停止播放。在使用多图层时有特殊用途。

### [​](#any-state) 任意状态 (Any State)
与普通状态不同，连接到 Any State 的状态可以在状态机处于任何状态时被激活。非常适合用于"随时可触发"的场景，如更换角色皮肤。
![使用 Any State 的评分系统](https://help.rive.app/images/image_2.png)

## [​](#animation-states) 动画状态 (Animation States)

动画状态包括除默认状态外的所有状态类型。有三种动画状态：**单动画 (Single Animation)**、**1D 混合 (1D Blend)** 和 **加性混合 (Additive Blend)**。

你可以将动画从动画列表直接拖放到图表上来添加状态（默认创建单动画状态）。也可以右键点击图表创建空白状态。

### [​](#single-animation-state) 单动画状态
任何时间轴都可以作为单动画状态。根据动画类型，可以是一次性播放、循环或乒乓模式。这是最常用的状态类型。

### [​](#blend-states) 混合状态 (Blend States)

混合状态可以将两条或更多时间轴动画混合在一起。常用于进度条、血条、滚动交互和动态面部绑定。

#### [​](#1d-blend-state) 1D 混合状态
通过单个数字输入控制多条时间轴的混合。当数值变化时，一条动画淡入同时另一条淡出。
![血条混合状态](https://help.rive.app/images/image_5.png)
配置步骤：
1. 创建多条时间轴动画（建议只关键帧少量属性）。
2. 添加 1D Blend State 到图表。
3. 使用下拉菜单关联数字输入。
4. 添加时间轴并定义数值范围（如 0-100）。

#### [​](#additive-blend-state) 加性混合状态
允许通过多个数字输入混合多条时间轴，适用于创建独特姿态（如面部表情）。
可选择 **Blend by Value**（固定混合比）或 **Blend by Input**（输入驱动混合）。

## [​](#additional-state-options) 其他状态选项

选中状态后可调整的选项：
- **状态类型**：单动画、1D 混合或加性混合。
- **动画**：更改关联的时间轴。
- **速度 (Speed)**：正值正向播放，负值倒放。
- **过渡**：查看并禁用/启用离开该状态的过渡。

[概览 (Overview)](/editor/state-machine/overview.md)[输入 (Inputs)](/editor/state-machine/inputs.md)