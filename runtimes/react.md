---
title: "React - Rive 运行时"
description: "Rive 的 React 运行时。 请注意，某些 Rive 功能可能尚未在特定运行时中受支持，或者可能需要使用 Rive 渲染器。有关更多详细信息，请参阅 功能支持 和 选择渲染器 页面。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 运行时, React
---

React

# React

Rive 的 React 运行时。

请注意，某些 Rive 功能可能尚未在特定运行时中受支持，或者可能需要使用 Rive 渲染器。有关更多详细信息，请参阅 [功能支持](/feature-support.md) 和 [选择渲染器](/runtimes/choose-a-renderer) 页面。

## [​](#overview) 概览

本指南记录了如何开始使用 React 运行时库。Rive 运行时库是开源的。源代码可在 [GitHub 仓库](https://github.com/rive-app/rive-react) 中找到。
该库包含一个 React 组件，以及帮助将 Rive 集成到你的 Web 应用程序中的自定义 Hooks（包含类型）。在底层，此运行时是 `@rive-app/canvas` 运行时的 React 友好封装，暴露了类型和 Rive 实例功能。

## [​](#getting-started) 快速开始

按照以下步骤快速在你的 React 应用中集成 Rive。

1.  **安装依赖**

    Rive React 运行时主要提供了两个选项，具体取决于你需要的底层渲染器。

    -   **(推荐)** `@rive-app/react-canvas` - 封装了 `@rive-app/canvas` 依赖项。除非你特别需要 `WebGL` 底层渲染器，否则我们建议你在应用中使用此依赖项以通过 Rive 进行快速便捷的使用。
    -   `@rive-app/react-canvas-lite` - 类似于 `@rive-app/react-canvas`，但 [更小](https://help.rive.app/runtimes/web/canvas-vs-webgl)。如果 Rive 图形不使用 [Rive 文本](/editor/text/overview.md)，建议使用此选项。
    -   `@rive-app/react-webgl` - 封装了 `@rive-app/webgl` 依赖项。未来，我们可能会有仅在使用 `WebGL` 时才支持的高级渲染功能。但在目前，由于依赖项的大小（带有 Skia），除非你有特定需求，否则我们不建议使用它。我们目前正在致力于通过 [Rive 渲染器](https://rive.app/renderer) 提高性能和减小体积。
    -   `@rive-app/react-webgl2` - 封装了 `@rive-app/webgl2` 依赖项。它使用带有 WebGL2 上下文的 Rive 渲染器，构建体积比 `rive-app/react-webgl` 小得多。在未来的主要版本中，此包可能会被弃用，而 `@rive-app/react-webgl` 将完全使用 Rive 渲染器，而无需额外的 Skia 依赖。

    要尝试使用 `react-webgl2` 的 Rive 渲染器，你应该 [启用草案](https://www.wikihow.tech/Enable-WebGL-Draft-Extensions-in-Google-Chrome) `WEBGL_shader_pixel_local_storage` Chrome 扩展（通过添加 WebGL Draft Extensions），否则，Rive 将在不支持扩展的浏览器上回退到 MSAA 解决方案（同样使用 WebGL2）。目前正在与主要浏览器合作，以便在普通用户的浏览器中默认支持此扩展。

    ```bash
    npm i --save @rive-app/react-canvas
    ```

2.  **渲染 Rive 组件**

    Rive React 作为一个默认导入，提供了一个基本组件，用于显示简单的动画，并你可以设置一些属性，如画板 (artboard) 和布局 (layout)。在你的 React 项目中包含以下代码以测试 Rive 动画示例。

    ```javascript
    import Rive from '@rive-app/react-canvas';

    export const Simple = () => (
      <Rive
        src="https://cdn.rive.app/animations/vehicles.riv"
        stateMachines="bumpy"
      />
    );
    ```

    有关 `<Rive />` 组件参数和返回值的更多信息，请参阅 [参数和返回值](https://help.rive.app/runtimes/react/parameters-and-return-values)。

3.  **使用 useRive Hook**

    在许多情况下，你可能不仅需要 React 组件来渲染动画，还需要控制它的 `rive` 对象实例。Rive 对象实例允许你接入 API 以实现：

    -   动态设置 Rive 文本值
    -   使用你自己的回调订阅 Rive 事件
    -   控制动画播放（例如暂停和播放）
    -   ... 以及 [更多](https://github.com/rive-app/rive-wasm)

    `useRive` Hook 返回此 `rive` 实例，以及挂载 Rive 将绘制到的底层 `<canvas>` 元素的 React 组件。

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

    **注意：** Rive 只有在 `<RiveComponent />` 被渲染后才会实例化，因为底层的 `<canvas>` 元素需要存在于 DOM 中。

    此外，请记住，canvas 的大小取决于它所在的容器。最初，它是 0x0。请向 `RiveComponent` 传递 `className` 或用适当大小的容器包裹 `RiveComponent`。有关 `useRive` 的参数和返回值的更多信息，请参阅 [此处](https://help.rive.app/runtimes/react/parameters-and-return-values)。此外，浏览后续运行时页面以了解如何控制动画播放、状态机等。

## [​](#rendering-considerations-with-userive) 使用 useRive 的渲染注意事项

目前，如果你计划有条件地渲染从 `useRive` Hook 返回的 `<RiveComponent />`，我们强烈建议将 `useRive` 的使用隔离到它自己的封装组件中。这是因为 Rive 是在组件挂载时实例化的，并且渲染上下文与特定的底层 `<canvas>` 元素相关联。当 React 尝试卸载/重新渲染时，你可能会遇到动画重新开始或当新的 `<canvas>` 挂载时不显示的问题。
通过将 `useRive` 隔离到其自己的封装组件中，Rive 将有机会正确清理，并使用新的 canvas 重新开始动画。在父组件中，你可以根据任何状态或基于 prop 的逻辑有条件地渲染封装组件。
查看 [此 CodeSandbox 示例](https://codesandbox.io/p/sandbox/rive-react-swapping-skins-with-solos-ctcnlx?file=%2Fsrc%2FApp.tsx) 以了解此模式的使用。

## [​](#resources) 资源

**GitHub**: <https://github.com/rive-app/rive-react>
**类型**: <https://github.com/rive-app/rive-react/blob/main/src/types.ts>
**示例**

-   简单换肤示例: [https://codesandbox.io/p/sandbox/rive-react-swapping-skins-with-solos-ctcnlx](https://codesandbox.io/p/sandbox/rive-react-swapping-skins-with-solos-ctcnlx?file=%2Fsrc%2FApp.tsx)
-   Storybook 演示: <https://rive-app.github.io/rive-react/>
-   动画登录表单:
    -   演示: [https://rive-app.github.io/rive-use-cases/?path=/story/example-loginformcomponent—primary](https://rive-app.github.io/rive-use-cases/?path=/story/example-loginformcomponent--primary)

[从 v1 迁移到 v2](https://help.rive.app/runtimes/web/migrating-from-v1-to-v2)[参数和返回值](https://help.rive.app/runtimes/react/parameters-and-return-values)