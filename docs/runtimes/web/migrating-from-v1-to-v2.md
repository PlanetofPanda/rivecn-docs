---
title: '从 v1 迁移到 v2 (Migrating from v1 to v2)'
description: 'JS 运行时从 v1 版本升级到 v2 版本的迁移说明。'
---

从 Web (JS) 运行时的 v2 版本开始，Rive 将在运行时支持 Rive 文本 (Rive Text) 功能。这涵盖了以下包：

- Web (JS) / WASM
  - `@rive-app/canvas`
  - `@rive-app/canvas-advanced`
  - `@rive-app/webgl`
  - `@rive-app/webgl-advanced`
  - ……以及其他 `@rive-app/*-single` 变体

## 主要变更 (Major Changes)

::: info
API 没有破坏性的变更！
:::

虽然运行时发布了新的大版本且没有 API 层面的破坏性变更，但发布 v2 是因为包的 **构建体积 (bundle size)** 增加了。这是因为为了支持强大的 Rive 文本功能，我们在驱动 Rive 的 WebAssembly (WASM) 构建中添加了新的内部依赖项。您可能会发现，截至 `v2.0.0`，加载 Rive 时请求的 WASM 文件在 brotli 压缩后约为 *\~261kb*。

如果您在寻找不含 Rive 文本功能的轻量版，可以参考 `@rive-app/canvas-lite` 和 `@rive-app/canvas-advanced-lite`。