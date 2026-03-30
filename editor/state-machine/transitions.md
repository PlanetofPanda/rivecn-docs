---
title: "过渡 (Transitions) - Rive 编辑器"
description: "状态机 (State Machines) 过渡为状态机提供逻辑路线图。本节将介绍过渡的配置属性和注意事项。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 状态机, 过渡
---

状态机 (State Machines)

# 过渡 (Transitions)

过渡为状态机提供逻辑路线图。本节将介绍过渡的配置属性和注意事项。

## [​](#creating-a-new-transition) 创建过渡

将鼠标移到某个状态附近，当出现椭圆图标时，点击并拖动到目标状态即可创建过渡。连接完成后会显示一个带箭头的椭圆，指示过渡方向。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 创建过渡)
你可以在两个状态之间创建多条过渡，每条设置不同的条件，实现"或 (OR)"逻辑。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 创建"或"过渡)

## [​](#configuring-a-transition) 配置过渡

选中过渡的方向指示器后，可以配置三个部分：过渡属性、条件和插值。

### [​](#transition-properties) 过渡属性
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 过渡属性面板)

### [​](#duration) 持续时间 (Duration)
描述过渡完成所需的时间。默认为 0（立即切换），增加该值会让过渡更平滑。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 持续时间效果对比)
过渡本质上是一种动画：起始属性来自离开的状态，结束属性来自进入的状态，Duration 就是两者之间的插值时间。

### [​](#exit-time) 退出时间 (Exit Time)
指定在过渡之前，当前状态必须播放多长时间或多少百分比。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 退出时间设置)
例如：希望动画播放完整再过渡，可设置为 100%。

### [​](#pause-when-exiting) 退出时暂停 (Pause when exiting)
过渡发生时，离开的状态是否暂停播放。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 暂停效果)

### [​](#conditions) 条件 (Conditions)
条件是触发过渡的规则。没有条件，过渡会持续触发导致混乱。条件需要定义输入 (Inputs)。
> *[原文档演示图由于官方服务器迁移已失效]* (描述: 条件面板)

#### 添加条件
点击 Conditions 旁的加号，选择输入类型（布尔值、数字或触发器）。
- **布尔值 (Boolean)**：设置 true 或 false 时触发。
- **数字 (Number)**：等于、大于或小于某值时触发。
- **触发器 (Trigger)**：触发时执行过渡。

多个条件构成"与 (AND)"逻辑。

### [​](#interpolation) 插值 (Interpolation)
可在过渡面板底部设置插值曲线（线性、三次方或定格）。持续时间越长，插值效果越明显。
了解更多：[插值与缓动](https://help.rive.app/editor/animate-mode/interpolation-easing)。

[输入 (Inputs)](/editor/state-machine/inputs.md)[监听器 (Listeners)](/editor/state-machine/listeners.md)