---
title: 'React'
description: 'Rive 的 React 运行时。'
---

<NoteOnFeatureSupport/>

## 概述 (Overview)

本指南介绍如何开始使用 React 运行时库。Rive 运行时库是开源的。源代码可在 [GitHub 仓库](https://github.com/rive-app/rive-react) 中找到。

该库包含一个 React 组件以及用于帮助将 Rive 集成到 Web 应用中的自定义 hook（包含类型定义）。在底层，该运行时是对 `@rive-app/canvas` 运行时的 React 友好封装，公开了类型和 Rive 实例功能。

## 入门 (Getting Started)

按照以下步骤，快速开始将 Rive 集成到您的 React 应用中。

### 安装依赖

Rive React 运行时根据您需要的底层渲染器，提供了两个主要选项：

- **(推荐)** `@rive-app/react-canvas` - 封装了 `@rive-app/canvas` 依赖。除非您特别需要 `WebGL` 后端渲染器，否则我们建议在应用中使用此依赖，以便快速便捷地使用 Rive。
- `@rive-app/react-canvas-lite` - 与 `@rive-app/react-canvas` 类似，但[体积更小](/runtimes/web/canvas-vs-webgl)。如果 Rive 图形不使用 [Rive 文本 (Rive Text)](/editor/text/)，建议使用此依赖。
- `@rive-app/react-webgl` - 封装了 `@rive-app/webgl` 依赖。未来，我们可能会推出仅支持 `WebGL` 渲染的高级渲染功能。但在目前，由于该依赖项（包含 Skia）的体积较大，除非您有特定的需求，否则我们不推荐使用。我们目前正致力于通过 [Rive 渲染器 (Rive Renderer)](https://rive.app/renderer) 来提高性能并减小体积。
- `@rive-app/react-webgl2` - 封装了 `@rive-app/webgl2` 依赖。它使用带有 WebGL2 上下文的 Rive 渲染器，并且其构建大小远小于 `rive-app/react-webgl`。在未来的主版本更新中，该包可能会被弃用，而 `@rive-app/react-webgl` 将完全使用 Rive 渲染器，而无需额外的 Skia 依赖。

::: info
要利用通过 react-webgl2 试用 Rive 渲染器的优势，您应该[启用 draft](https://www.wikihow.tech/Enable-WebGL-Draft-Extensions-in-Google-Chrome) `WEBGL_shader_pixel_local_storage` Chrome 扩展（通过添加 WebGL Draft 扩展），否则 Rive 在不支持扩展的浏览器上将回退到 MSAA 方案（也是 WebGL2）。目前，各大浏览器厂商正努力使其在用户的浏览器中默认支持此扩展。
:::

```bash
    npm i --save @rive-app/react-canvas
```

### 渲染 Rive 组件

Rive React 提供了一个基础组件作为其默认导入，用于显示简单的动画，您可以设置 artboard 和 layout 等几个 prop。在您的 React 项目中包含以下代码以测试 Rive 动画示例。

```javascript
    import Rive from '@rive-app/react-canvas';

    export const Simple = () => (
      <Rive
        src="https://cdn.rive.app/animations/vehicles.riv"
        stateMachines="bumpy"
      />
    );
```

有关 `<Rive />` 组件的参数和返回值的更多信息，请参阅 [参数和返回值 (Parameters and Return Values)](/runtimes/react/parameters-and-return-values)。

### 使用 useRive hook

在许多情况下，您可能不仅需要用 React 组件来渲染动画，还需要控制它的 `rive` 对象实例。Rive 对象实例允许您调用以下 API：

- 动态设置 Rive 文本值
- 使用您自己的回调函数订阅 Rive 事件
- 控制动画播放（例如暂停和播放）
- 以及[更多功能](https://github.com/rive-app/rive-wasm)

`useRive` hook 会同时返回该 `rive` 实例以及挂载 Rive 将绘制到的底层 `<canvas>` 元素的 React 组件。

```javascript
    import { useRive } from '@rive-app/react-canvas';

    export default function Simple() {
      const { rive, RiveComponent } = useRive({
        src: 'https://cdn.rive.app/animations/vehicles.riv',
        stateMachines: "bumpy",
        autoplay: false,
      });

      return (
        <RiveComponent
          onMouseEnter={() => rive && rive.play()}
          onMouseLeave={() => rive && rive.pause()}
        />
      );
    }
```

::: info
**注意：** Rive 直到 `<RiveComponent />` 被渲染出来才会实例化，因为 DOM 中必须存在底层的 `<canvas>` 元素。
:::

此外，请记住画布大小取决于其所在的容器。最初大小为 0x0。请给 `RiveComponent` 传递 `className` 或用适当大小的容器包裹 `RiveComponent`。

有关 `useRive` 的参数和返回值的更多信息，请参阅[此处](/runtimes/react/parameters-and-return-values)。

此外，请浏览后续的运行时页面以了解如何控制动画播放、状态机等。

## 使用 useRive 时的渲染考虑因素

目前，如果您计划根据条件渲染从 `useRive` hook 返回的 `<RiveComponent />`，我们强烈建议将 `useRive` 的使用隔离到其自己的封装组件中。这是因为 Rive 会在组件挂载时实例化，并且渲染上下文与特定的底层 `<canvas>` 元素关联。当 React 尝试卸载/重新渲染时，如果挂载了新的 `<canvas>`，您最终可能会遇到动画重新启动或无法显示的情况。

通过将 `useRive` 隔离到其自己的封装组件中，Rive 将有机会进行正确的清理，并使用新的画布重新启动动画。随后在父组件中，您可以根据任何状态或基于 prop 的逻辑条件性地渲染该封装组件。

查看[此 CodeSandbox 示例](https://codesandbox.io/p/sandbox/rive-react-swapping-skins-with-solos-ctcnlx?file=%2Fsrc%2FApp.tsx)以了解此模式的使用。

## 资源 (Resources)

**GitHub**: [https://github.com/rive-app/rive-react](https://github.com/rive-app/rive-react)

**类型定义**: [https://github.com/rive-app/rive-react/blob/main/src/types.ts](https://github.com/rive-app/rive-react/blob/main/src/types.ts)

**示例**
- 简单的换肤示例：[https://codesandbox.io/p/sandbox/rive-react-swapping-skins-with-solos-ctcnlx](https://codesandbox.io/p/sandbox/rive-react-swapping-skins-with-solos-ctcnlx?file=%2Fsrc%2FApp.tsx)
- Storybook 演示：[https://rive-app.github.io/rive-react/](https://rive-app.github.io/rive-react/)
- 动画登录表单：
  - 演示：[https://rive-app.github.io/rive-use-cases/?path=/story/example-loginformcomponent--primary](https://rive-app.github.io/rive-use-cases/?path=/story/example-loginformcomponent--primary)
