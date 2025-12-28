Web (JS)

# Web (JS)

Rive 的 JavaScript/WASM 运行时。

请注意，某些 Rive 功能可能尚未在特定运行时中受支持，或者可能需要使用 Rive 渲染器。有关更多详细信息，请参阅 [功能支持](/feature-support.md) 和 [选择渲染器](/runtimes/choose-a-renderer) 页面。

## [​](#overview) 概览

本指南记录了如何开始使用 Rive web 运行时库。该运行时是开源的，可在 [GitHub 仓库](https://github.com/rive-app/rive-wasm) 中找到。该库具提供高级 JavaScript API（支持 TypeScript）和低级 API，用于加载 Web Assembly (WASM) 并自行控制渲染循环。此运行时允许你：

-   快速将 Rive 集成到所有 Web 应用程序（Webflow、WordPress 等）中
-   提供基础 API 来构建其他基于 Web 的 Rive 运行时封装（React、Svelte 等）
-   通过控制渲染循环来支持高级用例（基于 Web 的游戏引擎）

## [​](#getting-started) 快速开始

按照以下步骤将 Rive 集成到你的 Web 应用程序中。

以下说明描述了如何使用 `@rive-app/canvas` 包。Rive 提供了基于 Web 的包，如 WebGL、Canvas 和 Lite 版本。请参阅 [Canvas vs WebGL](/runtimes/web/canvas-vs-webgl) 以获取有关哪种包是适合你用例的指导。

1.  **安装依赖**

    我们建议始终使用 [最新版本](https://www.npmjs.com/package/@rive-app/canvas)。下面列出的版本和示例中的版本可能与最新版本不同。

    -   **Script 标签**

        ```html
        // Add the following script tag to your web page to get the latest version:
        // 将以下 script 标签添加到你的网页以获取最新版本：
        <script src="https://unpkg.com/@rive-app/canvas"></script>

        // You can also pin to a specific version (See [here](https://www.npmjs.com/package/@rive-app/canvas) for the latest):
        // 你也可以指定特定版本（查看 [此处](https://www.npmjs.com/package/@rive-app/canvas) 获取最新版本）：
        <script src="https://unpkg.com/@rive-app/[email protected]"></script>

        // This will make a global `rive` object available, allowing you to access the Rive API via the `rive` entry point:
        // 这将使全局 `rive` 对象可用，允许你通过 `rive` 入口点访问 Rive API：
        new rive.Rive({});
        ```

    -   **包管理器**

        **npm**
        ```bash
        npm install @rive-app/canvas
        ```

        **pnpm**
        ```bash
        pnpm add @rive-app/canvas
        ```

        **yarn**
        ```bash
        yarn add @rive-app/canvas
        ```

        **bun**
        ```bash
        bun add @rive-app/canvas
        ```

    **导入**

    ```javascript
    // Import the entire module under the global identifier `rive`
    // 在全局标识符 `rive` 下导入整个模块
    import * as rive from "@rive-app/canvas";

    // Alternatively, import only the specific parts you need
    // 或者，仅导入你需要的特定部分
    import { Rive } from "@rive-app/canvas";
    ```

    不使用 [Rive 文本](/editor/text/overview.md) 和 [Rive 音频](/editor/events/audio-events)？考虑使用 [@rive-app/canvas-lite](/runtimes/web/canvas-vs-webgl#rive-app-canvas-lite)，这是一个更小的包变体。

2.  **创建 Canvas**

    在你希望显示 Rive 图形的 HTML 中添加一个 canvas 元素：

    ```html
    <canvas id="canvas" width="500" height="500"></canvas>
    ```

3.  **创建 Rive 实例**

    要创建 Rive 对象的新实例，请提供以下属性：

    -   `src`: 代表托管的 `.riv` 文件 URL 的字符串（如下例所示）或公共资产 `.riv` 文件的路径。有关如何正确使用此属性的更多详细信息，请参阅 [Rive 参数](/runtimes/web/rive-parameters)。
    -   `artboard`: (可选) 代表你要显示的画板的字符串。如果未提供，则选择默认画板。
    -   `stateMachines`: 代表你希望播放的状态机名称的字符串。
    -   `canvas`: 将渲染动画的 canvas 元素。
    -   `autoplay`: 指示动画是否应自动播放的布尔值。

    ```html
    <script>
        const r = new rive.Rive({
            src: "https://cdn.rive.app/animations/vehicles.riv",
            // OR the path to a discoverable and public Rive asset
            // 或者可发现的公共 Rive 资产的路径
            // src: '/public/example.riv',
            canvas: document.getElementById("canvas"),
            autoplay: true,
            // artboard: "Artboard", // Optional. If not supplied the default is selected
            // artboard: "Artboard", // 可选。如果未提供，则选择默认画板
            stateMachines: "bumpy",
            onLoad: () => {
              r.resizeDrawingSurfaceToCanvas();
            },
        });
    </script>
    ```

    `resizeDrawingSurfaceToCanvas` 方法确保 Rive 动画正确缩放以适应指定 canvas 元素的尺寸。默认情况下，canvas 渲染表面可能与 HTML 中定义的 `<canvas>` 元素的实际大小不匹配，这可能导致图形模糊或缩放不正确，尤其是在高 DPI 或视网膜显示器上。调用此方法会调整内部绘图表面，以便动画以清晰的细节渲染，匹配 canvas 的像素密度。这在以下情况下尤为重要：

    -   Canvas 的大小动态变化（例如，由于响应式布局而调整大小）。
    -   你希望确保无论设备或屏幕分辨率如何，动画均保持清晰。

    **最佳实践：**

    -   **加载后调用**：建议在 `onLoad` 回调中调用 `resizeDrawingSurfaceToCanvas`，以确保在调整绘图表面之前已完全加载 Rive 资产。这可以防止任何渲染问题。
    -   **处理窗口调整大小**：如果 canvas 大小在用户交互期间发生变化（例如调整浏览器窗口大小时），你也应该监听窗口调整大小事件并调用 `resizeDrawingSurfaceToCanvas` 以重新调整渲染表面：

    ```javascript
    window.addEventListener("resize", () => {
        r.resizeDrawingSurfaceToCanvas();
    });
    ```

    通过这种方式，随着 canvas 大小的变化，Rive 动画将继续看起来清晰且缩放正确。

### [​](#complete-example) 完整示例

综上所述，这是如何在单个 HTML 文件中加载 Rive 图形的方法。

```html
<!DOCTYPE html>
<html lang="en">
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
        // artboard: "Arboard", // Optional. If not supplied the default is selected
        stateMachines: "bumpy",
        onLoad: () => {
          // Ensure the drawing surface matches the canvas size and device pixel ratio
          // 确保绘图表面匹配 canvas 大小和设备像素比
          r.resizeDrawingSurfaceToCanvas();
        },
      });
    </script>
  </body>
</html>
```

### [​](#loading-rive-files) 加载 Rive 文件

[查看此示例](https://codesandbox.io/p/sandbox/rive-quick-start-js-xmwcm6?file=%2Fsrc%2Findex.ts) 了解加载 .riv 文件的不同方法，选项包括：

1.  **托管 URL**: 使用代表托管 `.riv` 文件位置的 URL 字符串。在创建新 Rive 实例时将其设置为 `src` 属性。
2.  **包中的静态资产**: 提供指向 Web 项目中可公开访问的 `.riv` 文件的路径字符串。像处理项目中的任何其他静态资产（如图像或字体）一样处理 `.riv` 文件。
3.  **获取文件**: 不使用 `src` 属性，而是在获取文件时使用 `buffer` 属性加载 `ArrayBuffer`。当在多个 Rive 实例中复用同一个 `.riv` 文件时，这非常有用，允许你只加载一次。
4.  **复用已加载文件**: 使用 `rivFile` 参数复用先前加载的 Rive 运行时文件对象，避免通过 `src` URL 再次获取或从 `buffer` 重新加载。这可以通过消除冗余的网络请求和加载时间来显着提高性能，尤其是在从同一源创建多个 Rive 实例时。与需要底层解析以创建运行时文件对象的 `src` 和 `buffer` 参数不同，`rivFile` 参数使用已解析的对象，包括任何已加载的资产。请参阅 [缓存 Rive 文件](/runtimes/caching-a-rive-file)。

有关更多详细信息，请参阅 [Rive 参数](/runtimes/web/rive-parameters) 中关于 `src` 属性的部分。

## [​](#4-clean-up-rive) 4. 清理 Rive

使用 Rive 实例时，很重要的一点是当不再需要它时正确清理它。在以下场景中这尤其必要：

-   包含 Rive 动画的 UI 不再需要（例如，当关闭带有 Rive 图形的模态框时）。
-   动画或状态机已完成，并且不会再次显示或运行。

在底层，Rive 在 C++ 中创建各种低级对象（如画板实例、动画实例和状态机实例），需要手动删除这些对象以防止内存泄漏。如果不清理，这些对象会消耗不必要的资源，可能会影响应用程序的性能。
幸运的是，高级 JavaScript API 简化了此过程。你不需要跟踪 Rive 实例生命周期中创建的每个对象。相反，你可以通过单次方法调用清理所有关联对象。
要清理 Rive 实例并释放资源，只需在你的 Rive 实例上调用以下方法：

```javascript
const riveInstance = new Rive({...));
...
// When ready to cleanup
// 准备清理时
riveInstance.cleanup();
```

# [​](#rive-runtime-concepts) Rive 运行时概念

了解如何在运行时与 Rive 图形进行交互。

[## 画板 (Artboards)

[在运行时控制显示哪个画板。](/runtimes/artboards)[## 布局 (Layout)

[在运行时控制画板的布局（适应和对齐）。](/runtimes/layout)[## 状态机播放 (State Machine Playback)

[在运行时控制状态机播放并与状态机输入交互。](/runtimes/state-machines.md)[## 数据绑定 (Data Binding)

[在运行时使用双向数据绑定动态更新文本、颜色、图像、列表等内容。](/runtimes/data-binding)[## 加载资产 (Loading Assets)

[在运行时加载引用的资产（图像、字体、音频）。也称为带外资产 (out-of-band assets)。](/runtimes/loading-assets.md)[## 缓存 Rive 文件 (Caching a Rive File)

[在多个 Rive 实例之间缓存并复用 Rive 文件对象以提高性能。](/runtimes/caching-a-rive-file)

# [​](#additional-rive-web-resources) 其他 Rive Web 资源

更深入的 Rive Web 文档和高级用例。

[## Rive 参数 (Rive Parameters)

[Rive 实例的 API 文档。](/runtimes/web/rive-parameters)[## Canvas vs WebGL

[Rive Web 包及其不同版本的指南](/runtimes/web/canvas-vs-webgl)[## 常见问题 (FAQ)

[常见问题](/runtimes/web/faq)[## 预加载 WASM (Preloading WASM)

[关于如何预加载和自托管 rive WASM 库的说明。](/runtimes/web/preloading-wasm)[## 低级 API 使用 (Low-level API Usage)

[控制 Rive 渲染循环和布局，并将多个画板绘制到同一个 canvas。](/runtimes/web/low-level-api-usage)

# [​](#examples) 示例

-   [基础图库应用](https://github.com/rive-app/rive-wasm/tree/master/js/examples/_frameworks/parcel_example_canvas)
-   [追踪鼠标光标](https://codesandbox.io/p/sandbox/tracking-mouse-cursor-n38gdd?file=%2Fsrc%2Findex.ts)
-   [连接到页面滚动](https://codesandbox.io/p/sandbox/rive-page-scroll-h4msqw?file=%2Fsrc%2Findex.ts%3A27%2C45)
-   [仅当滚动到用户视口时播放状态机](https://codesandbox.io/p/sandbox/rive-wait-for-scroll-into-view-y9wg8d?file=%2Fsrc%2Findex.ts)

[Rive 事件](/runtimes/rive-events)[Rive 参数](/runtimes/web/rive-parameters)