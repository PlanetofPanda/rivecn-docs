---
title: "Defold - Rive 游戏运行时"
description: "Game Runtimes Defold 是一个免费的、跨平台的游戏引擎，它内置了对 Rive 图形的支持，允许你轻松地将 Rive 集成到你的 Defold 游戏中。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 游戏运行时, Defold
---

Game Runtimes

# Defold

[Defold](https://defold.com/) 是一个免费的、跨平台的游戏引擎，它内置了对 Rive 图形的支持，允许你轻松地将 Rive 集成到你的 Defold 游戏中。

Rive 集成由 Defold 团队管理。

有关在 Defold 中使用 Rive 的更多信息，请参阅 [官方 Defold 文档](https://defold.com/extension-rive/)。在那里，你将找到有关设置 Rive 图形以及在 Defold 引擎中使用它们的最佳实践的综合指南。

### [​](#rendering) 渲染 (Rendering)

Defold 原生继承了 [Rive 渲染器](https://rive.app/renderer)，这意味着 Defold 中的 Rive 图形由 Rive 编辑器中使用的同一渲染器渲染。这种原生集成提供了几个好处：

-   **性能**: Rive 渲染器是为 Rive 内容、动画和运行时定制的。允许你以极快的速度绘制前所未有数量的矢量图形。[阅读更多](https://rive.app/blog/rive-renderer-now-open-source-and-available-on-all-platforms)。
-   **质量**: 无论缩放、分辨率或设备如何，图形都保持清晰。
-   **一致性**: 你的图形在编辑器和运行时的外观完全相同。
-   **功能支持**: 你还将受益于即将推出的 Rive 功能，例如只有通过 Rive 渲染器才能实现的模糊和阴影。

### [​](#support) 支持 (Support)

如果你对 Defold 中的 Rive 有任何疑问，请随时探索他们的 [社区论坛](https://forum.defold.com/) 或联系他们的支持团队。如果你认为问题出在 Rive，请通过 [我们的社区](https://community.rive.app/c/support/) 联系我们。

[Rive 事件](https://help.rive.app/game-runtimes/unity/rive-events)