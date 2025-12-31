---
title: '从 0.x.x 迁移到 1.x.x'
description: '迁移到 1.x.x 的指南'
---

在 `rive-react` 的 v1.0.0 版本之前，React 运行时封装了 `@rive-app/canvas` 运行时依赖，使用底层的 `CanvasRenderingContext2D`。为了让 React 运行时能够支持即将推出的一些高级绘图功能（如网格变形，Mesh Deformations），它需要使用 `@rive-app/webgl` 运行时。

向 v1.0.0 的主版本升级不涉及任何破坏性的 API 变更，而是在内部使用了 WebGL 作为底层的渲染上下文。如果您遇到问题，请在 `rive-react` 运行时的 [issues 页面](https://github.com/rive-app/rive-react/issues) 记录并反馈。