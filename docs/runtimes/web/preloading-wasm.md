---
title: '预加载 WASM (Preloading WASM)'
description: '关于如何预加载和自托管 Rive WASM 库。'
---

## 背景 (Background)

当您使用 `@rive-app/*` 包中的 `new Rive()` 实例，或者 `@rive-app/react-*` 包中的 `<RiveComponent />` 时，浏览器会向 `https://unpkg.com/@rive-app/canvas@x.x.x/rive.wasm` 发起网络请求。该请求获取一个包含 Rive 特定 API 的 [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly) (WASM) 文件，用于构建渲染循环。[unpkg](https://unpkg.com/) 是一个全球 CDN，允许快速加载 NPM 包，在这种情况下是 WASM 文件。这使得引入基于 JS 的 Rive 运行时时包体积更小，且仅在创建 Rive 实例时才加载 WASM。

虽然 `unpkg` 应该能快速提供 WASM 且支持跨站缓存，但由于以下原因，您可能希望自己预加载并托管该 WASM 文件：

- 增强驱动 Rive 动画的 WASM 的可靠性。
- 缩短动画加载时间。
- 控制 Web 应用资源加载的时机。

## 步骤 (Steps)

根据您使用的基于 JS 的运行时（如纯 JS、React 等），请参考以下章节来手动托管从基础 JS 运行时加载的 WASM。

### 纯 JS (JS)

如果您使用的是基础的 `@rive-app/canvas` 或 `@rive-app/webgl`，或者是任何纯 JS 变体的 Rive 运行时，请在您的应用中导入 WASM 资源以及 `RuntimeLoader` API：

```javascript
import riveWASMResource from '@rive-app/canvas/rive.wasm';
import { Rive, RuntimeLoader } from '@rive-app/canvas';

RuntimeLoader.setWasmUrl(riveWASMResource);
// ...
const riveInstance = new Rive({
  src: 'foo.riv',
  // ...
});
```

`RuntimeLoader` 是一个单例，负责在加载 `Rive` 实例时在后台管理 WASM 文件的加载。通过调用 `setWasmUrl` API，您可以使用直接导入的 WASM 文件的 Data URI 来为 Rive 运行时加载 WASM。请在任何包含 Rive 动画待加载的页面上运行此 API。

::: info
您可能需要在构建工具中进行配置，以支持导入 WASM 文件并将其内联为 Data URI。可以参考启发我们添加本指南的 [原始博客文章](https://dev.to/alex_barashkov/optimization-techniques-for-rive-animations-in-react-apps-1a8p) 获取指导。
:::

### React

如果您使用的是 `@rive-app/react-canvas` 或 `@rive-app/react-webgl`，请在应用中导入 WASM 资源以及 `RuntimeLoader` API：

```javascript
import riveWASMResource from '@rive-app/canvas/rive.wasm';
import { useRive, RuntimeLoader } from '@rive-app/react-canvas';

RuntimeLoader.setWasmUrl(riveWASMResource);

const MyComponent = () => {
  const { rive, RiveComponent } = useRive({
    src: 'foo.riv',
    // ...
  });
};
```

`RuntimeLoader` 是一个单例，负责在后台管理 WASM 文件的加载。通过调用 `setWasmUrl` API，您可以使用直接导入的 WASM 文件的 Data URI 来加载 WASM。

::: info
您可能需要在构建工具中进行配置才能导入 WASM 文件。请参考启发我们添加本指南的 [原始博客文章](https://dev.to/alex_barashkov/optimization-techniques-for-rive-animations-in-react-apps-1a8p) 以获取相关指导。
:::

如果您在构建工具中设置了为应用加载 WebAssembly，您还可以在创建 Rive 实例的相关页面中预加载 WASM 模块，从而快速实例化 Rive 动画。

例如在 Next.js 中，您可以在主页面布局中添加以下内容：

```javascript
import { Html, Head } from "next/document";
import riveWASMResource from '@rive-app/canvas/rive.wasm';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="preload" href={riveWASMResource} as="fetch" crossOrigin="anonymous" />
      </Head>
    </Html>
  );
}
```

您可能需要安装与 `@rive-app/react-canvas` 中所绑定的 JS 版本一致的 `@rive-app/canvas`，否则可能会在运行时遇到问题。例如，`@rive-app/react-canvas@3.0.33` 绑定的 JS 依赖版本为 `@rive-app/canvas@1.0.95`；因此，您应安装该特定版本的 JS 运行时以确保兼容性。

## 特别鸣谢 (Special Thanks)

特别鸣谢 Alex Barashkov 撰写的 [原始博客文章](https://dev.to/alex_barashkov/optimization-techniques-for-rive-animations-in-react-apps-1a8p)，它启发我们添加了此技巧。
