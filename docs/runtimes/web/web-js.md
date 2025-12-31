---
title: "Web (JS)"
description: "Rive 的 JavaScript/WASM 运行时。"
---

<NoteOnFeatureSupport />

## 概述 (Overview)

本指南介绍如何开始使用 Rive Web 运行时库。该运行时是开源的，可在其 [GitHub 仓库](https://github.com/rive-app/rive-wasm) 中找到。此库提供了一个高级 JavaScript API（支持 TypeScript）以及一个用于加载 WebAssembly (WASM) 并自行控制渲染循环的低级 API。该运行时允许您：

- 快速将 Rive 集装到所有 Web 应用程序（如 Webflow、WordPress 网站等）中。
- 为构建其他基于 Web 的 Rive 运行时封装库（如 React、Svelte 封装等）提供基础 API。
- 通过控制渲染循环来支持高级用例（例如基于 Web 的游戏引擎）。

## 入门 (Getting started)

按照以下步骤将 Rive 集装到您的 Web 应用中。

::: info
以下说明描述了如何使用 `@rive-app/canvas` 包。Rive 提供了基于 Web 的各种包，例如 WebGL 版、Canvas 版和 Lite (精简) 版。

请参阅 [Canvas vs WebGL](/runtimes/web/canvas-vs-webgl)，以获取有关哪个包最符合您用例的指导。
:::

### 安装依赖

::: warning
我们建议始终使用 [最新版本](https://www.npmjs.com/package/@rive-app/canvas)。下面列出的版本以及示例中的版本可能与最新版本不同。
:::

#### 脚本标签 (Script Tag)

```html
        // 在您的网页中添加以下脚本标签以获取最新版本：

        <script src="https://unpkg.com/@rive-app/canvas"></script>

        // 您也可以固定到特定版本（请查看 [此处](https://www.npmjs.com/package/@rive-app/canvas) 获取最新版本号）：

        <script src="https://unpkg.com/@rive-app/canvas@2.24.0"></script>

        // 这将使全局 `rive` 对象可用，允许您通过 `rive` 入口点访问 Rive API：

        new rive.Rive({});
```

#### 包管理器 (Package Manager)

```bash npm
        npm install @rive-app/canvas
```
```bash pnpm
        pnpm add @rive-app/canvas
```
```bash yarn
        yarn add @rive-app/canvas
```
```bash bun
        bun add @rive-app/canvas
```
```javascript 导入方式 (Importing)
        // 将整个模块导入到全局标识符 `rive` 下
        import * as rive from "@rive-app/canvas";

        // 或者，仅导入您需要的特定部分
        import { Rive } from "@rive-app/canvas";
```

::: info
没有使用 [Rive 文本 (Rive Text)](/editor/text/) 和 [Rive 音频 (Rive Audio)](/editor/events/audio-events)？可以考虑使用 [@rive-app/canvas-lite](/runtimes/web/canvas-vs-webgl#rive-app-canvas-lite)，这是一个体积更小的包。
:::

### 创建画布 (Canvas)

在 HTML 中您想要显示 Rive 图形的地方添加一个 canvas 元素：

```html
    <canvas id="canvas" width="500" height="500"></canvas>
```

### 创建 Rive 实例 (Rive instance)

要创建一个 Rive 对象的新实例，请提供以下属性：

- `src`：表示托管的 `.riv` 文件 URL 的字符串（如下例所示），或者指向公开的 `.riv` 资产文件的路径。有关如何正确使用此属性的更多详细信息，请参考 [Rive 参数](/runtimes/web/rive-parameters)。
- `artboard` —— (可选) 表示要显示的画板名称的字符串。如果未提供，则选择默认画板。
- `stateMachines` —— 表示您希望运行的状态机名称的字符串。
- `canvas` —— 渲染动画的画布元素。
- `autoplay` —— 表示动画是否应自动播放的布尔值。

```javascript
    <script>
        const r = new rive.Rive({
            src: "https://cdn.rive.app/animations/vehicles.riv",
            // 或者可公开访问的 Rive 资产路径
            // src: '/public/example.riv',
            canvas: document.getElementById("canvas"),
            autoplay: true,
            // artboard: "Artboard", // 可选。如果未提供，则选择默认值
            stateMachines: "bumpy",
            onLoad: () => {
              r.resizeDrawingSurfaceToCanvas();
            },
        });
    </script>
```

::: info
`resizeDrawingSurfaceToCanvas` 方法确保 Rive 动画被正确缩放，以适应指定的画布元素的尺寸。默认情况下，画布渲染表面可能与 HTML 中定义的 `<canvas>` 元素的实际大小不匹配，这会导致图形模糊或缩放不正确，尤其是在高 DPI 或 Retina 显示屏上。

调用此方法会调整内部绘图表面，使动画渲染精细，并与画布的像素密度匹配。这在以下情况下尤为重要：

- 画布的大小会动态变化（例如，由于响应式布局调整了大小）。
- 您希望确保无论设备或屏幕分辨率如何，动画都能保持清晰。

<br />

**最佳实践：**

- **在加载后调用**：建议在 `onLoad` 回调函数中调用 `resizeDrawingSurfaceToCanvas`，以确保在调整绘图表面之前，Rive 资源已完全加载。这可以防止出现任何渲染问题。
- **处理窗口大小调整**：如果您的画布大小在用户交互期间发生变化（例如调整浏览器窗口大小时），您还应该监听窗口 resize 事件并调用 `resizeDrawingSurfaceToCanvas` 来重新调整渲染表面：

```javascript
      window.addEventListener("resize", () => {
          r.resizeDrawingSurfaceToCanvas();
      });
```

这样，随着画布大小的变化，Rive 动画将继续保持清晰且缩放正确。
:::

### 完整示例 (Complete example)

综合以上内容，以下是如何在单个 HTML 文件中加载 Rive 图形的示例。

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rive Hello World</title>
  </head>
  <body>
    <canvas id="canvas" width="500" height="500"></canvas>

    <script src="https://unpkg.com/@rive-app/canvas"></script>
    <script>
      const r = new rive.Rive({
        src: "https://cdn.rive.app/animations/vehicles.riv",
        canvas: document.getElementById("canvas"),
        autoplay: true,
        // artboard: "Arboard", // 可选。如果未提供，则选择默认值
        stateMachines: "bumpy",
        onLoad: () => {
          // 确保绘图表面匹配画布尺寸和设备像素比 (device pixel ratio)
          r.resizeDrawingSurfaceToCanvas();
        },
      });
    </script>
  </body>
</html>
```

### 加载 Rive 文件 (Loading Rive files)

[参考此示例](https://codesandbox.io/p/sandbox/rive-quick-start-js-xmwcm6?file=%2Fsrc%2Findex.ts) 了解加载 `.riv` 文件的不同方式，选项包括：

1. **托管 URL**：使用表示托管 `.riv` 文件 URL 的字符串。在创建新的 Rive 实例时将其设置为 `src` 属性。
2. **捆绑中的静态资源**：提供 Web 项目中公开可访问的 `.riv` 文件的路径字符串。像对待项目中的任何其他静态资源（如图像或字体）一样处理 `.riv` 文件。
3. **获取 (Fetching) 文件**：与其使用 `src` 属性，不如在获取文件时使用 `buffer` 属性来加载 `ArrayBuffer`。当跨多个 Rive 实例重用同一个 `.riv` 文件时，这非常有用，因为您只需加载一次。
4. **重用已加载的文件**：使用 `rivFile` 参数来重用先前加载过的 Rive 运行时文件对象，从而避免需要再次通过 `src` URL 获取或从 `buffer` 重新加载。通过消除冗余的网络请求和加载时间，这可以显著提高性能，尤其是在从同一源创建多个 Rive 实例时。与需要底层解析以创建运行时文件对象的 `src` 和 `buffer` 参数不同，`riveFile` 参数使用一个已经解析好的对象，包括任何已加载的资产。参见 [缓存 Rive 文件](/runtimes/caching-a-rive-file)。

有关更多详细信息，请参考 [Rive 参数](/runtimes/web/rive-parameters) 章节中关于 `src` 属性的部分。

## 4. 清理 Rive 资源 (Clean up Rive)

在使用 Rive 实例时，当不再需要它时，对其进行妥善清理非常重要。这在以下情况下尤为必要：

- 包含 Rive 动画的 UI 不再需要（例如，关闭了一个带有 Rive 图形的模态框）。
- 动画或状态机已经运行完毕，且不会再次显示或运行。

在底层，Rive 在 C++ 中创建了各种低级对象（如画板实例、动画实例和状态机实例），这些对象需要手动删除以防止内存泄漏。如果不进行清理，这些对象可能会消耗不必要的资源，从而影响应用程序的性能。

幸运的是，高级 JavaScript API 简化了这一过程。您不需要跟踪 Rive 实例生命周期中创建的每一个对象。相反，您可以通过单次方法调用清理所有相关对象。

要清理 Rive 实例并释放资源，只需在您的 Rive 实例上调用以下方法：

```javascript
const riveInstance = new rive.Rive({...));
...
// 准备好清理时
riveInstance.cleanup();
```

# Rive 运行时概念 (Rive runtime concepts)

了解如何在运行时与您的 Rive 图形进行交互。

<Interaction />

# 更多 Rive Web 资源 (Additional Rive web resources)

更深入的 Rive Web 文档和高级用例。

**[Rive 参数 (Rive Parameters)](/runtimes/web/rive-parameters)**

Rive 实例的 API 文档。

**[Canvas vs WebGL](/runtimes/web/canvas-vs-webgl)**

关于 Rive 不同 Web 包的指南。

**[常见问题 (FAQ)](/runtimes/web/faq)**

常见问题解答。

**[预加载 WASM (Preloading WASM)](/runtimes/web/preloading-wasm)**

关于如何预加载和自托管 Rive WASM 库的说明。

**[低级 API 用法 (Low-level API Usage)](/runtimes/web/low-level-api-usage)**

掌握 Rive 渲染循环和布局，并在同一个画布上绘制多个画板。

# 示例 (Examples)

- [基础图库应用](https://github.com/rive-app/rive-wasm/tree/master/js/examples/_frameworks/parcel_example_canvas)
- [追踪鼠标光标](https://codesandbox.io/p/sandbox/tracking-mouse-cursor-n38gdd?file=%2Fsrc%2Findex.ts)
- [连接页面滚动](https://codesandbox.io/p/sandbox/rive-page-scroll-h4msqw?file=%2Fsrc%2Findex.ts%3A27%2C45)
- [仅在进入用户视口时播放状态机](https://codesandbox.io/p/sandbox/rive-wait-for-scroll-into-view-y9wg8d?file=%2Fsrc%2Findex.ts)