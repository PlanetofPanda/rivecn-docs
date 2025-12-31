---
title: '常见问题 (FAQ)'
description: 'Rive Web 运行时的常见问题及解决方法。'
---

## 关注点 (Concerns)

我们整理了一份使用 Web 运行时时的常见问题清单。请参阅以下各节，了解如何在您的应用程序中解决这些问题。

### 为什么在获取 Rive 文件时会遇到 CORS 错误？

在某些情况下，您可能会决定通过 CDN 托管您的 `.riv` 文件，例如将它们存储在 AWS S3 中。在运行时，一些用户会遇到 CORS 问题，导致无法在 Web 运行时中加载 `.riv` 文件。发生这种情况时，请务必在托管平台上设置 CORS 标头，以便在 Web 应用/站点中访问 Rive 文件内容时，浏览器不会阻止数据的拉取。

点击了解更多关于 [什么是 CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) 的信息。以 AWS S3 为例，可以[查看此处](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ManageCorsUsing.html#cors-example-1)了解如何配置 CORS。

### 有没有更小的依赖包可以使用？我的 Rive 图形不需要 Rive 的所有功能。

有的！您可能已经注意到，从 Web 运行时的 `v2.0.0` 版本开始，浏览器请求的 `rive.wasm` 文件体积有所增加。这是因为我们在 WASM 构建中包含了一个新的文本引擎依赖项，用以支持强大且灵活的 [Rive 文本 (Rive Text)](/editor/text/) 功能。

但是，如果您不需要使用原生的 Rive 文本功能（或者更倾向于使用导入的 SVG 文本），您可以使用 [@rive-app/canvas-lite](/runtimes/web/web-js#canvas-vs-webgl)。它提供与 `@rive-app/canvas` 相同的 API 和类似的渲染能力，但包体积更小。

### 为什么 canvas 的 width/height 属性值发生了变化？

您可能已经注意到，DOM 中的 `<canvas>` width/height 属性可能比您最初设置的大了几倍。在内部，高级 API 会尝试通过考虑 `window.devicePixelRatio` 来调整最初设置（或默认）的画布宽高属性。通过这种内部计算，我们能够兼顾高分辨率 (High-DPI) 屏幕，从而使 Rive 动画输出不会出现“模糊”。但是，我们不会尝试相对于 DOM 调整画布元素的实际 CSS 大小。这最终取决于您的配置。

### 为什么我的动画在运行时很模糊？

这可能是因为 `<canvas>` 元素上没有设置 width/height 属性来确定画布的绘图尺寸，或者是默认值不够大，无法涵盖动画的画板边界。我们建议至少在画布上设置一些 CSS style 的 width/height 属性来确定画布在页面上的框体大小，因为运行时会根据这些值，尝试为画布元素设置一个最佳拟合的绘图尺寸估算。

此外，您可以在实例化 `Rive` 对象后，利用其公开的方法 `resizeDrawingSurfaceToCanvas`。该方法会自动根据用户的 `devicePixelRatio` 调整 DOM 中画布的 width/height 属性。（**注意：** 这适用于画布的绘图表面，而不是画布元素的框体大小）。

```html
<canvas
    id="some-canvas-element-id"
    style="width: 400px; height: 400px;"
></canvas>
```
```javascript
const canvasElement = document.getElementById('some-canvas-element-id');

const r = new rive.Rive({
  src: 'some-file.riv',
  canvas: canvasElement,
  autoplay: true,
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
  },
});
```

::: info
如果您使用 `resizeDrawingSurfaceToCanvas` 函数，请确保已将画布的实际样式尺寸（style size）限制为您期望的值，否则画布可能会变成原来的两倍大。
:::

### 画布上的 width/height 属性与 CSS 中的 width/height 有什么区别？

好问题！对于 `<canvas>` 元素，有两种空间大小需要考虑。

第一种是页面上画布元素本身的大小，这通常是大多数人设置元素 width/height 样式时想到的。这涉及到设置元素的 CSS width/height 属性。

```html
<canvas style="width: 400px; height: 400px;"></canvas>
```

![图像](/images/runtimes/web/166b48f5-9893-4371-8655-b69d987a2235.webp)

第二种是 `<canvas>` 元素上的 width/height 属性，它决定了画布的绘图表面大小。在某些情况下，如果元素上没有设置 CSS 样式，这些属性值可能也会影响实际的画布大小。但主要来说，这些 width/height 属性有助于确定画布元素内部有多少可用的绘图空间。与 CSS 的属性不同，这些值是不带单位的。

```html
<canvas width="800" height="800"></canvas>
```

![图像](/images/runtimes/web/4fd1465b-97e3-4542-9e47-7babfb27c400.webp)

理想情况下，您要确保画布上的 width/height 属性至少等于或大于画布上的 CSS 宽高属性，否则可能会出现模糊的输出（参见上文了解如何解决模糊动画）。

### 为什么我的状态机没有播放？

请确保在实例化 Rive 时，通过 `stateMachines` 属性指定了您的状态机名称。如果要自动播放状态机，请不要忘记在实例化 Rive 对象时设置 `autoplay: true`。

### 如何让其他 Web 框架支持 Rive？

除了此处纯粹的 JS/TS 运行时外，目前我们官方还支持 React 运行时。社区已经创建了一些驱动封装，以支持其他的 Web 库/框架。我们建议查看 [rive-react](https://github.com/rive-app/rive-react) 开源项目，了解它是如何将此 JS 运行时封装进 React 友好的组件和 hook 中，从而在基于 React 的应用中更好地使用 Rive。我们鼓励您为您感兴趣的其他任何 Web 框架/库进行类似的探索。

### 我设置了禁止 `unsafe-eval` 的内容安全策略 (CSP)，现在 Rive 无法加载，该怎么办？

我们的 Web (JS) 运行时建立在一个提供渲染抽象的 C++ 运行时层之上。Web 运行时使用 WebAssembly (WASM) 将 C++ 层绑定到 JS API。我们使用 [Emscripten](https://emscripten.org/) 工具进行编译。作为该工具源代码和绑定技术的一部分，它可能会使用某些会被 `unsafe-eval` 策略拦截的技术来生成 JS API。因此，运行时可能无法成功加载 WebAssembly，从而导致 Rive 加载失败，因为 WebAssembly 对于在 Web 中运行 Rive 至关重要。有关该问题的更多信息，请参阅[此处](https://github.com/WebAssembly/content-security-policy/issues/7)。

为了解决这个问题，您可以设置一个新的 CSP 选项，该选项既允许阻止 `unsafe-eval`，又允许 WASM 执行：即 `wasm-unsafe-eval`。虽然这不是最完美的解决方案，但它比允许任何不安全的 JS 评估要更好，同时能让 Web 应用程序支持 WASM 构建。