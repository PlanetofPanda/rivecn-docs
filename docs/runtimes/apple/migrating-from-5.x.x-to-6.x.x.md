---
title: '从 5.x.x 迁移到 6.x.x'
description: '从 6.x 以下版本迁移的指南'
---

::: warning
包含破坏性变更
:::

## Rive 渲染器 (Rive Renderer)

### RendererType (渲染器类型)

`riveRenderer` 现在是新的默认渲染器类型，且 `skiaRenderer` 已被移除。如果您之前显式将渲染器类型设置为 Skia，那么您将不得不 [指定一个新的渲染器](/runtimes/choose-a-renderer/)，或者使用新的默认 Rive 渲染器（我们的建议）。

## 包大小 (Package Size)

Rive 的 iOS 运行时现在减小了约 57%，约为 3.3mb，而 v6.0.0 之前约为 7.6mb。