---
title: '从 v3 迁移到 v4'
description: '从 React 运行时 v3 迁移到 v4 的说明'
---

从我们的 React 运行时的 v4 版本开始，Rive 将支持运行时文本 (Rive Text)，涉及以下包：

- React
  - `@rive-app/react-canvas`
  - `@rive-app/react-webgl`

## 主要变更 (Major Changes)

::: info
API 没有破坏性变更！
:::

尽管发布了没有任何破坏性 API 变更的新主版本，但之所以发布 v4，是因为核心 Web (JS) 运行时依赖项导致了包的 **构建体积增加**。参见[此处](/runtimes/react/migrating-from-v1-to-v3)的迁移指南。

未来，如果您不需要文本功能，我们可能会推出一个没有这些较大依赖项的 "lite" (精简版) 包，但目前，主要 Web 运行时包将依然默认包含这些依赖项。