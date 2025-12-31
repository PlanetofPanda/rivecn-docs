---
title: '从 2.x.x 迁移到 3.x.x'
description: '从 3.x 以下版本迁移的指南'
---

迁移到 Apple 运行时的 v3 版本应该是相当直接的。如果您进行升级，请查看以下各节，了解可能需要对您的应用进行的更改。

## 枚举命名 (Enums Naming)

从 v3 开始，为了保持一致性，布局选项枚举已更改为与其他运行时的枚举命名约定相匹配。请参阅下文，了解应将 `Fit` 和 `Alignment` 选项更改为何样。此外，还有一些关于循环模式和方向的参数枚举也略有变化。

| 缩放 (Fit) | 之前 | 之后 |
| --- | --- | --- |
| 填充 (Fill) | `.fitFill` | `.fill` |
| 包含 (Contain) | `.fitContain` | `.contain` |
| 覆盖 (Cover) | `.fitCover` | `.cover` |
| 适配宽度 (Fit Width) | `.fitFitWidth` | `.fitWidth` |
| 适配高度 (Fit Height) | `.fitFitHeight` | `.fitHeight` |
| 等比缩小 (Scale Down) | `.fitScaleDown` | `.scaleDown` |
| 无 (None) | `.fitNone` | `.noFit` |

| 对齐 (Alignment) | 之前 | 之后 |
| --- | --- | --- |
| 左上 (Top Left) | `.alignmentTopLeft` | `.topLeft` |
| 中上 (Top Center) | `.alignmentTopCenter` | `.topCenter` |
| 右上 (Top Right) | `.alignmentTopRight` | `.topRight` |
| 左中 (Center Left) | `.alignmentCenterLeft` | `.centerLeft` |
| 正中 (Center) | `.alignmentCenter` | `.center` |
| 右中 (Center Right) | `.alignmentCenterRight` | `.centerRight` |
| 左下 (Bottom Left) | `.alignmentBottomLeft` | `.bottomLeft` |
| 中下 (Bottom Center) | `.alignmentBottomCenter` | `.bottomCenter` |
| 右下 (Bottom Right) | `.alignmentBottomRight` | `.bottomRight` |

| 循环模式 (Loop Mode) | 之前 | 之后 |
| --- | --- | --- |
| 单次 (One Shot) | `loopOneShot` | `oneShot` |
| 循环 (Loop) | `loopLoop` | `loop` |
| 往复 (Ping Pong) | `loopPingPong` | `pingPong` |
| 自动 (Auto) | `loopAuto` | `autoLoop` |

| 方向 (Direction) | 之前 | 之后 |
| --- | --- | --- |
| 后退 (Backwards) | `directionBackwards` | `backwards` |
| 前进 (Forwards) | `directionForwards` | `forwards` |
| 自动 (Auto) | `directionAuto` | `autoDirection` |

## 默认播放行为 (Default playing behavior)

v3 中更改的一个默认行为是在 Rive 画板中播放的内容。在 v3 之前，如果在设置 `RiveViewModel` 时未指定状态机或特定动画，则会播放 Rive 文件中创建的第一个动画。

在 v3 中，如果未指定状态机或特定动画，系统将播放 Rive 文件中的第一个状态机（如果已创建）。因此，如果您希望保持现有的播放第一个动画的默认行为，只需在创建 `RiveViewModel` 时设置 `animationName` 属性即可。