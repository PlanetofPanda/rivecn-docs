---
title: 'Canvas vs WebGL'
description: 'Rive Web 运行时的包选择指南。'
---

### 背景 (Background)

JS/WASM 运行时提供了发布到 npm 的各种包。对于简单的使用场景和更小的包体积，我们推荐从 `@rive-app/canvas` 开始（详见下文）。在 Web 上，Rive 能够关联 `<canvas>` 元素，并使用底层的 `CanvasRenderingContext2D` 上下文或 `WebGL` 上下文来进行渲染。

**注意：** 对于 `@rive-app/webgl` 和 `@rive-app/canvas` 包，用于在脚本中创建 Rive 实例的高级 API 和逻辑保持一致。这意味着如果您发现某个运行时的包比另一个更适合您的用例，您只需切换依赖项即可，而无需更改代码用法。请参阅下文以了解 JS/WASM 的不同运行时包及其适用场景。

### (推荐) @rive-app/canvas
```bash
npm install @rive-app/canvas
```

这是一个简单易用的高级 Rive API，使用底层的 [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 渲染器。这使得 Rive 可以利用浏览器原生的、高效的矢量图形渲染器。该包的一些优点包括：

- 下载体积小，没有体积庞大的独立渲染器依赖。
- 支持 [Rive 文本 (Rive Text)](/editor/text/)。
- 非常适合在屏幕上并发显示多个动画画布。当您想在页面上渲染 Rive 动画列表或网格时，这是理想选择，因为浏览器对此没有上下文数量限制（而 WebGL 则有限制）。
- 支持基础矢量图形动画和位图。
- 自动为您请求 WebAssembly (WASM) 运行依赖。

::: info
想要一个包含更少功能的 **体积更小** 的 Rive 依赖？考虑使用下方的 `@rive-app/canvas-lite` 👇
:::

### @rive-app/canvas-lite
```bash
npm install @rive-app/canvas-lite
```

这是一个体积比 `@rive-app/canvas` 更小的包，API 和底层的 [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 均相同。它为了尽可能保持体积小巧，在构建 WASM 时剔除了一些依赖项。

如果您 **不需要** 以下功能，此方案将是首选：

- [Rive 文本 (Rive Text)](/editor/text/)
  - 如果您的 Rive 文件包含 Rive 文本组件，渲染该图形时不会导致应用出错或停止渲染，但文本将不会在图形中显示。
  - 您仍可以通过将文本外部导入为 SVG 来在图形中使用文本。

### @rive-app/webgl

这是一个简单易用的高级 Rive API，使用 WebGL2 上下文。该包的一些优点包括：

- 与编辑时的体验保持最高的一致性。
- 自动为您请求 WebAssembly (WASM) 运行依赖。
- 目前使用 Skia 进行渲染，但在未来的主版本发布中将被新的 Rive 渲染器取代。

**关于 WebGL 的注意事项：** 大多数浏览器对每页或每域的并发 WebGL 上下文数量有限制。在使用 Rive 时，这意味着浏览器的限制会影响创建 `new Rive({...})` 实例的数量。

如果您计划在列表/网格中或同一页面上多次显示 Rive 内容，则需要由您自行管理上下文和 `canvas` 元素的生命周期。如果您需要显示大量动画（如网格/列表），请考虑使用 `@rive-app/canvas` 包，它使用 `CanvasRenderingContext2D` 渲染器且没有上下文数量限制；或者考虑使用 `@rive-app/webgl-advanced` 包，它允许您全权控制渲染循环并在一个画布上显示多个 Rive 图形。

::: info
建议在创建 `new Rive({...})` 对象时，在 Rive 参数中设置 `useOffscreenRenderer: true` 属性，特别是在页面上渲染多个 Rive 对象时。
:::

### @rive-app/webgl2

::: info
这是使用 [Rive 渲染器 (Rive Renderer)](https://rive.app/renderer) 配合 WebGL2 上下文的预览版本。在未来的主版本发布中，此包可能会被弃用，届时 `@rive-app/webgl` 将完全使用 Rive 渲染器，而无需额外的 Skia 依赖。
:::

这是一个简单易用的高级 Rive API，使用 WebGL2 上下文。该包的一些优点包括：

- 与编辑时的体验保持最高的一致性。
- 自动为您请求 WebAssembly (WASM) 运行依赖。
- 使用新的 Rive 渲染器以获得最佳性能。
- 体积远小于目前的 `@rive-app/webgl`（后者包含体积较大的 Skia 依赖）。

::: info
要尝试体验 Rive 渲染器的优势，您应该[启用 draft](https://www.wikihow.tech/Enable-WebGL-Draft-Extensions-in-Google-Chrome) `WEBGL_shader_pixel_local_storage` Chrome 扩展（在上方链接中添加 WebGL Draft 扩展），否则 Rive 在不支持该扩展的浏览器上将回退到 MSAA 方案（同样使用 WebGL2）。目前各大浏览器厂商正努力使其在用户的浏览器中默认支持此扩展。
:::

**关于 WebGL 的注意事项：** 大多数浏览器对每页或每域的并发 WebGL 上下文数量有限制。在使用 Rive 时，这意味着浏览器的限制会影响创建 `new Rive({...})` 实例的数量。

如果您计划在同一个页面上显示大量 Rive 内容，请考虑使用无上下文限制的 `@rive-app/canvas`，或者考虑使用 `@rive-app/webgl2-advanced` 包，它允许您在同一个画布上绘制多个 Rive 图形。

::: info
建议在创建 `new Rive({...})` 对象时，设置 `useOffscreenRenderer: true`。
:::

有关 Rive 渲染器的更多信息，请参阅 [选择渲染器 (Choose a Renderer)](/runtimes/choose-a-renderer/) 章节。

### @rive-app/webgl2-advanced

::: info
这是使用 [Rive 渲染器 (Rive Renderer)](https://rive.app/renderer) 配合 WebGL2 上下文的预览版本。在未来的主版本发布中，此包可能会被弃用，届时 `@rive-app/webgl-advanced` 将完全使用 Rive 渲染器。
:::

这是一个低级 Rive API，使用 WebGL2 上下文。它具备普通 `@rive-app/webgl2` 包的所有优点，外加：

- 对更新和渲染循环的完全控制。
- 允许在同一个画布上渲染多个 Rive 图形。
- 使用新的 Rive 渲染器以获得最佳性能。
- 体积远小于现在的 `@rive-app/webgl-advanced`。
- 允许对 Rive 层级结构中的组件进行更深入的控制和操作。

::: info
要利用 Rive 渲染器，您应该启用 draft 版的 `WEBGL_shader_pixel_local_storage` Chrome 扩展，否则在不支持该扩展的浏览器上将回退到 MSAA 方案。
:::

此包是利用 Rive 渲染器性能的最佳方式，能够在一个画布上绘制大量的 Rive 图形。

### @rive-app/canvas-advanced

这是一个低级 Rive API，使用 [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 渲染器。它具备普通 `@rive-app/canvas` 包的所有优点，外加：

- 对更新和渲染循环的完全控制。
- 允许在同一个画布上渲染多个 Rive 画板 (artboards)。
- 允许对 Rive 层级结构中的组件进行更深入的控制和操作。

在此查看用法示例：[https://codesandbox.io/p/sandbox/canvas-advance-api-example-s6dz3m?file=%2Fsrc%2Findex.ts](#background)

::: info
想要一个 **体积更小** 且包含更少功能的 Rive 依赖？考虑使用下方的 `@rive-app/canvas-advanced-lite` 👇
:::

### @rive-app/canvas-advanced-lite
```bash
npm install @rive-app/canvas-advanced-lite
```

这是一个体积比 `@rive-app/canvas-advanced` 更小的包，具备相同的 API 和底层的 `CanvasRenderingContext2D`，但在构建 WASM 时剔除了一些依赖项以保持最小体积。

如果您不需要以下功能，此方案是首选：

- [Rive 文本 (Rive Text)](/editor/text/)

### @rive-app/webgl-advanced

这是一个低级 Rive API，使用 WebGL2 上下文。它具备普通 `@rive-app/webgl` 包的所有优点，外加：

- 对更新和渲染循环的完全控制。
- 允许在同一个画布上渲染多个 Rive 图形。
- 允许对 Rive 层级结构中的组件进行更深入的控制和操作。

### *-single 版本 (single versions)

上述每个 NPM 包都包含了 `rive.wasm` 文件。在高级 API（`@rive-app/canvas` 和 `@rive-app/webgl`）中，运行时会为您请求该文件，而 `-advanced` 版本则不然。我们还为上述每个包提供了 NPM 上的替代版本（不包括 `lite` 版本），这些版本直接在 JS 束中编码了 WASM。这意味着您不需要为驱动 Rive 动画的 WASM 发起网络请求，因为它全部包含在一个主 JS 文件中。如果您的应用在从 CDN 加载 WASM 时遇到问题，这是一个解决方案。

- [@rive-app/canvas-single](https://www.npmjs.com/package/@rive-app/canvas-single)
- [@rive-app/canvas-advanced-single](https://www.npmjs.com/package/@rive-app/canvas-advanced-single)
- [@rive-app/webgl-single](https://www.npmjs.com/package/@rive-app/webgl-single)
- [@rive-app/webgl-advanced-single](https://www.npmjs.com/package/@rive-app/webgl-advanced-single)

虽然此处不需要请求 WASM，但 JS 束会比上述包更大。非 single 版本在 Web 应用中可能有更好的缓存效果，因为如果从多个页面加载，WASM 会从同一个 CDN 源加载。