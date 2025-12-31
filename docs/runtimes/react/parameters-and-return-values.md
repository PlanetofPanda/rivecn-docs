---
title: '参数和返回值 (Parameters and Return Values)'
description: 'Rive React API 详解。'
---

## Hook

### useRive

`useRive` hook 是推荐的接入 Rive 运行时的方案，能实现完全的控制，特别是在使用 Rive 状态机时。有关要传入的参数和返回值，请参见下文。

`useRive(riveParams: UseRiveParameters, opts: UseRiveOptions): RiveState`

- `riveParams` - 参见下方，这是一组在实例化时从 Web 运行时传递给 `Rive` 对象的参数。可以传递 `null` 或 `undefined` 以有条件地显示 .riv 文件。
- `opts` - *(可选)* 参见下方，这是一组特定于 `rive-react` 的选项。

#### 参数 (Parameters)

**UseRiveParameters**

这些参数中的大部分来自 Rive 对象的底层 Web 运行时配置项，但提供 `canvas` 元素除外。有关您可以在此对象中提供的所有参数，请参阅 [Rive 参数](/runtimes/web/rive-parameters)。

::: info
如果您在参数中提供了 `onLoad` 回调，您可能还无法访问 `rive` 实例。React 运行时在内部使用 `onLoad` 通过 `rive` 实例执行 `setState`，因此在到达用户提供的回调时，实例可能尚未填充。如果您正在寻找类似的方法，我们建议使用 `useEffect` 代替 `onLoad` 以可靠地使用 `rive` 实例。在 Web 运行时的未来版本中，我们可能会在您的回调参数中提供 `rive` 实例，以便您在此处提供 `onLoad`。
:::

**UseRiveOptions**

- `useDevicePixelRatio` - *(可选)* 如果为 `true`，hook 将根据 [devicePixelRatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio) 缩放动画分辨率。默认为 `true`。注意：需要将 `setContainerRef` ref 回调传递给包裹 canvas 元素的元素。如果您使用 `RiveComponent`，这将自动完成。
- `fitCanvasToArtboardHeight` - *(可选)* 如果为 `true`，画布将根据画板的高度调整大小。默认为 `false`。
- `useOffscreenRenderer` - *(可选)* 如果为 `true`，Rive 实例将共享（如果不存在则创建一个）离屏 `WebGL` 上下文。这允许您在一个屏幕上显示多个 Rive 动画，以规避某些浏览器关于多个并发 WebGL 上下文的限制。如果为 `false`，每个 Rive 实例将拥有自己的专用 `WebGL` 上下文，您可能需要注意刚才提到的浏览器限制。我们建议 **不要** 更改此默认属性，这样您就不必管理 WebGL 上下文。销毁 React 组件并不保证浏览器会清理挂载画布时创建的 WebGL 上下文。仅在使用 `@rive-app/react-webgl` 时相关。默认为 `true`。

#### 返回值 (Return Values)

**RiveState**

- `canvas` - 渲染 Rive 实例的画布 (Canvas) 元素。
- `container` - 渲染 Rive 实例的画布所在的容器元素。
- `setCanvasRef` - 传递给画布元素的 ref 回调。
- `setContainerRef` - 传递给画布容器元素的 ref 回调。这是可选的，但如果不使用，且在窗口缩放时，hook 将不会负责自动根据其外部容器调整画布大小。
- `rive` - 从 Web 运行时新创建的 Rive 实例。
- `RiveComponent` - 在 DOM 中渲染 Rive 实例的 JSX 元素。

::: info
在大多数情况下，您只需要从 `useRive` hook 中获取 `RiveComponent` 和 `rive` 返回值。只有在您需要自己控制画布/容器元素时，才需要设置画布 ref 和容器 ref。
:::

### useStateMachineInput

`useStateMachineInput` hook 是获取 Rive 状态机输入引用的推荐方式，既可以读取输入值，也可以设置（或触发）它们。有关要传入的参数和返回值，请参见下文。

`useStateMachineInput(rive: Rive | null, stateMachineName?: string, inputName?: string, initialValue?: number | boolean): StateMachineInput | null`

::: info
由于需要先解析 `rive` 实例，返回值（即状态机输入）可能不会立即生效。您可能需要使用 `useEffect` 来监测 `rive` 实例和 `useStateMachineInput` hook 的返回值何时生效。
:::

#### 参数 (Parameters)

- `rive` - 第一个参数是实例化的 Rive 对象 —— 可以通过 `useRive` hook 检索。
- `stateMachineName?` - *(可选)* 要从中获取输入的状态机名称。
- `inputName?` - *(可选)* 要获取引用的单个状态机输入的名称。
- `initialValue?` - *(可选)* 要在输入上设置的初始值。

#### 返回值 (Return Values)

此 hook 返回一个 `StateMachineInput` 的默认实例。

**StateMachineInput**

- `name` (getter) - 访问输入的名称。
- `value` (getter 和 setter) - 访问输入的值，并通过此属性设置输入的值。
- `fire()` - 触发 trigger 类型的输入。

有关此 hook 的更多用法，请参阅 [输入页面](/runtimes/inputs)。

### useResizeCanvas

`useResizeCanvas` hook 是一个可选的工具 hook，用于将 `<canvas>` 元素的大小调整为其父容器元素的大小，同时重新设置画布适当的表面区域大小。当您不想使用 `useRive` hook 来渲染 Rive，且可能在 React 应用中使用 Web JS 运行时，但仍希望能够将 `<canvas>` 适当地缩放到其父级时，这非常有用。

::: info
此 hook 已经在 Rive React 运行时内部使用，因此如果您使用 `useRive` hook 或默认导出的 `<RiveComponent />` 来渲染 Rive，则不需要自己调用此 hook。
:::

`useResizeCanvas(resizeProps: UseResizeCanvasProps): void`

- `resizeProps` - 参见下方，要在该对象参数上设置的一组属性。

#### 参数 (Parameters)

**UseResizeCanvasProps**

- `riveLoaded: boolean` - 如果为 `true`，则 Rive 实例已创建且 Rive 文件已解析。这确保了 hook 不会过早缩放 `<canvas>` 元素。默认为 `false`。
- `canvasRef: MutableRefObject<HTMLCanvasElement | null>` - Rive 渲染所在 `<canvas>` 元素的 React `Ref`。
- `containerRef: MutableRefObject<HTMLElement | null>` - 画布父容器元素的 React `Ref`。
- `onCanvasHasResized?: () => void` (可选) 画布因其父容器调整大小而调整大小后调用的回调。在此处，您可能想要重置 Rive 渲染器的布局维度，以指示画布的新最小/最大边界。
  - 使用高级 JS 运行时，这可能只是对 `rive.resizeToCanvas()` 的简单调用。
  - 使用低级 JS 运行时，这可能是调用渲染器的 `.align()` 方法，并传入布局以及画布的最小/最大 X/Y 值。
- `options?: Partial` - (可选) 传递给 useRive hook 的选项（参见文档上方的 `UseRiveOptions`）。
- `artboardBounds?: Bounds` - (可选) 画板的 AABB 边界。只有在 `options.fitCanvasToArtboardHeight` 设置为 `true` 时，才需要提供此项。

### useRiveFile

`useRiveFile` hook 旨在用于在组件内初始化和管理 `RiveFile` 实例。它根据提供的源参数（URL 或 ArrayBuffer）设置 `RiveFile`，并确保在组件卸载或输入更改时正确清理，以避免内存泄漏。

此 hook 的主要优点是它允许您创建一个可以在多个组件中重复使用的 `RiveFile` 实例，而无需从 `src` URL 再次获取或从 `buffer` 重新加载。通过消除冗余的网络请求和加载时间，这提高了性能，特别是在从同一源创建多个 Rive 实例时。与直接向 `useRive` hook 传递 `buffer` 和 `src` 参数不同（后者在底层仍需要解析以创建 `RiveFile` 对象），此 hook 返回一个已经解析好的 `RiveFile` 对象，包含了所有已加载的资产。

`useRiveFile(params: UseRiveFileParameters): RiveFileState`

#### 参数 (Parameters)

**UseRiveFileParameters**

- `src?` - *(可选)* 使用 `src` 有两种可选方式：通过指向 `.riv` 文件的 URL，或者指向要使用的公共 `.riv` 资产的路径。必须提供 `src` 或 `buffer` 之一。
  - URL - 如果您将 `.riv` 托管在某些可公开访问的存储桶/CDN 上（例如 AWS、GCS 等），可以在此处传入 URL。
    - 或者，使用 ES6，您可以将 `.riv` 文件作为 data URI 导入。根据您的 bundle 加载器，您可能需要使用插件（如 Webpack 的 `url-loader`）来正确解析并将 `.riv` 文件作为 data URI 字符串加载。参见[这个项目](https://github.com/zplata/rive-nextjs/blob/main/next.config.js#L8)作为一个基础设置示例。
  - 指向公共资产的路径 - 如果 `.riv` 公共资产捆绑在您的应用中，这是指向该资产的字符串路径。请注意，这 **不是** 相对于当前 JS 文件所在位置的相对路径。应将 `.riv` 视为应用中捆绑的任何其他资产，如图像或字体。如果您的 JS 在 Web 应用的根目录下编译运行，则必须指定从根目录到资产位置的路径。例如，如果您的资产位于 `/public/foo.riv`，而您的 JS 在根目录 `/` 运行，则应在此属性中指定：`src: '/public/foo.riv'`。
- `buffer?` - *(可选)* 包含 .riv 文件原始字节的 ArrayBuffer。必须提供 `src` 或 `buffer` 之一。
- `enableRiveAssetCDN?` - *(可选)* 允许运行时自动加载托管在 Rive CDN 中的资产。默认启用。

**返回值**

**RiveFileState**

- `riveFile` - `RiveFile` 实例。在文件加载完成前为 `null`。
- `status` - 文件加载过程的状态，可以是 `idle` (空闲)、`loading` (正在加载)、`failed` (失败) 或 `success` (成功)。

## 组件 (Components)

### `<RiveComponent />`

默认导出的 `RiveComponent` 和从 `useRive` hook 返回的 `RiveComponent` 都要在组件的 JSX 中进行渲染。如前所述，可以传递给 `canvas` 元素的所有属性和事件处理程序也可以传递给 `Rive` 组件，并以同样的方式使用。

需要注意的一点是，在组件上设置的 `style`/`className` prop 将传递给容器 `<div>` 元素，而不是底层的 `<canvas>` 本身。原因在于容器 `<div>` 元素为您处理了大小调整和布局，因此，所有样式都应传递给此元素。

`<canvas>` 元素仍将接收传递给组件的所有其他 prop，例如 `aria-*` 属性、`role` 等。您还可以在组件内部设置子内容，作为无法显示 `<canvas>` 元素时的回退方案。