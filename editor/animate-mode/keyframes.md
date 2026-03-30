---
title: "关键帧 (Keyframes) - Rive 编辑器"
description: "关键帧允许你定义对象属性随时间的变化。这些变化在 Rive 引擎中被内插（Interpolated），从而产生平滑的运动。 你可以通过在动画模式 (Animate Mode) 下操作对象，或者使用检查器 (Inspector) 来设置关键帧。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 动画模式, 关键帧
---

动画模式

# 关键帧 (Keyframes)

关键帧允许你定义对象属性随时间的变化。这些变化在 Rive 引擎中被内插（Interpolated），从而产生平滑的运动。
![关键帧 Pn](https://help.rive.app/images/keyframes-overview.png)

## [​](#setting-keys) 设置关键帧

你可以通过在动画模式 (Animate Mode) 下操作对象，或者使用检查器 (Inspector) 来设置关键帧。

在使用创建工具、变换工具或钢笔工具在舞台上操作对象时，任何更改都会自动在时间轴上设置关键帧。
![在舞台设置关键帧 Pn](https://help.rive.app/images/setting-keys-stage.gif)

你也可以通过点击检查器中属性右侧的菱形图标来设置关键帧。带有蓝色外框的菱形图标表示当前属性已在当前播放头位置设置了关键帧。
![在检查器设置关键帧 Pn](https://help.rive.app/images/setting-keys-inspector.gif)

## [​](#interpolation) 插值 (Interpolation)

插值决定了属性在两个关键帧之间如何变化。通过点击并拖拽时间轴上的关键帧，或在检查器中进行设置，你可以调整插值类型（如：线性、贝塞尔、保持等）。
![插值示例 Pn](https://help.rive.app/images/interpolation-example.gif)

## [​](#copy-and-paste) 复制与粘贴关键帧

你可以选中一个或多个关键帧，使用快捷键（`Cmd/Ctrl + C` 和 `Cmd/Ctrl + V`）在同一个时间轴或不同的时间轴之间进行复制粘贴。

[时间轴 (Timeline)](/editor/animate-mode/timeline.md)[动画设置 (Settings)](/editor/animate-mode/settings.md)