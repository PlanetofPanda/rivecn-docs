---
title: '从 1.x.x 迁移到 3.x.x'
description: '迁移到 v3.x.x 的指南'
---

在大多数情况下，如果您使用的是 `rive-react` 的 v1.x.x 版本，您应该能够直接升级到 v3.x.x 中的新依赖项，而无需进行太多更改。

::: info
**注意**：从 v2.x.x 迁移到 3.x.x 可以在您不进行任何更改的情况下安全完成。
:::

## 依赖关系变更 (Dependency Change)

在 v2.x.x 之前，您可以通过 `rive-react` 包在 React 中使用 Rive。该包是对 `@rive-app/webgl` 依赖项的封装。在 v2.x.x+ 版本中，我们通过两个主要的新 React 包，使 React 运行时能够同时封装 `@rive-app/webgl` 和 `@rive-app/canvas` 依赖项：

- **(推荐)** `@rive-app/react-canvas`
- `@rive-app/react-webgl`

`rive-react` 包仍将与上述包同步定期发布，但它将上述两个 Web 运行时依赖项都设为了 `dependencies`，这可能会导致构建体积变大。因此，我们建议从 `rive-react` 切换到 `@rive-app/react-canvas`；如果您需要使用 WebGL 备份上下文，则切换到 WebGL 版本。

**升级前：**
```bash
npm i rive-react
```

**升级后：**
```bash
npm i @rive-app/react-canvas
```

::: info
从 React 运行时导入的方式在 `rive-react` 和 `@rive-app/react-canvas` 之间没有任何变化。
:::

## Prop 穿透 (Prop Spreading)

无论您使用默认导出还是提供的 `useRive` hook，React 运行时都会提供一个 `RiveComponent`。该组件应被传递到 JSX 中以渲染画布。DOM 结构中包含一个包裹画布的 `div`，用于处理画布的样式和尺寸。以往传递给 `RiveComponent` 的大多数 prop 都会传递到该包裹 `<div>` 元素上。从 v2.x.x 开始，某些涉及样式的 prop（即 `className` 和 `style`）将继续传递到包裹 `<div>` 上，但所有其他 prop 现在都将传递到 `<canvas>` 元素上，以便您可以设置 `role`、`aria-*` 属性等。

**升级前：**
```javascript
<RiveComponent class="foo" aria-label="Label" /> 
```

将渲染出（简化后的）DOM：
```javascript
<div class="foo" aria-label="Label">
  <canvas></canvas>
</div>
```

**升级后：**
```javascript
<RiveComponent class="foo" aria-label="Label" />
```

现在将产生以下（简化后的）DOM：
```javascript
<div class="foo">
  <canvas aria-label="Label"></canvas>
</div>
```