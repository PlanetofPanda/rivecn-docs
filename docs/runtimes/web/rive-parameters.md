---
title: 'Rive 参数 (Rive Parameters)'
description: 'Rive 实例的 API 文档。'
---

## 参数 (Parameters)

在实例化 Rive 对象时，您可以设置以下任何参数：

```typescript
export interface RiveParameters {
  canvas: HTMLCanvasElement | OffscreenCanvas, // 必填
  src?: string, // src 或 buffer 必填其一
  buffer?: ArrayBuffer, // src 或 buffer 必填其一
  riveFile?: RiveFile,
  artboard?: string,
  animations?: string | string[],
  stateMachines?: string | string[],
  layout?: Layout,
  autoplay?: boolean,
  useOffscreenRenderer?: boolean,
  enableRiveAssetCDN?: boolean,
  shouldDisableRiveListeners?: boolean,
  isTouchScrollEnabled?: boolean,
  automaticallyHandleEvents?: boolean,
  onLoad?: EventCallback,
  onLoadError?: EventCallback,
  onPlay?: EventCallback,
  onPause?: EventCallback,
  onStop?: EventCallback,
  onLoop?: EventCallback,
  onStateChange?: EventCallback,
  onAdvance?: EventCallback,
  assetLoader?: AssetLoadCallback,
}
```

- `canvas` —— *(必填)* 用于绘制 Rive 动画的画布 (Canvas) 元素。
- `src?` —— *(可选)* 有两种可选方式：通过 `.riv` 文件的 URL，或者通过项目中的公共资源路径。`src` 或 `buffer` 必须提供其中一个。
  - **URL**：如果您的 `.riv` 文件托管在公开的存储桶或 CDN 上（如 AWS、GCS 等），可以在此处传入 URL。
    - 或者，使用 ES6 时，您可以将 `.riv` 文件作为 Data URI 导入。根据您的构建工具，您可能需要使用插件（例如 Webpack 的 `url-loader`）来正确解析并加载 `.riv` 文件为 Data URI 字符串。
  - **静态资源路径**：如果 `.riv` 文件包含在您的应用程序包中，这是一个指向该资源的字符串路径。请注意，这 **不是** 相对于当前 JS 文件的相对路径，而应将其视为应用程序中捆绑的任何其他资源（如图像或字体）。如果您的 JS 在 Web 应用的根目录下运行，则必须指定从根目录到该资源的路径。例如资源在 `/public/foo.riv`，JS 在 `/` 运行，则应指定 `src: '/public/foo.riv'`。
- `buffer?` —— *(可选)* 包含来自 `.riv` 文件原始字节的 `ArrayBuffer`。`src` 或 `buffer` 必填其一。
- `riveFile?` —— *(可选)* 允许您重用之前加载过的 Rive 运行时文件对象，无需从 `src` 或 `buffer` 再次获取或加载。通过消除冗余的网络请求和加载时间，这可以提高性能，尤其是在从同一源创建多个 Rive 实例时。与仍需底层解析的 `buffer` 和 `src` 不同，`riveFile` 使用的是一个已经解析过的对象。
- `artboard?` —— *(可选)* 要使用的画板名称。
- `animations?` —— *(可选)* 要播放的动画名称或名称列表。

::: info
目前，如果没有提供 `stateMachines` 或 `animations` 参数，Rive 将播放它找到的第一个时间轴动画。但在 `rive-wasm` 的未来主版本中，默认将播放找到的第一个状态机。
:::

- `stateMachines?` —— *(可选)* 要加载的状态机名称或名称列表。

::: info
注意：您应该只为 `stateMachines` 提供单个状态机字符串。同时运行同一画板的多个状态机可能会导致意想不到的结果。在 `rive-wasm` 的未来大版本中，`stateMachines` 将作为单个字符串传入。
:::

- `layout?` —— *(可选)* 布局对象，定义动画在画布上的显示方式。
- `autoplay?` —— *(可选)* 如果为 true，动画加载后将自动开始播放。默认为 false。
- `useOffscreenRenderer?` —— *(可选)* 布尔标志，决定是否使用共享的离屏 WebGL 上下文，而不是为此 Rive 实例创建自己的 WebGL 上下文。这仅适用于 `@rive-app/webgl` 包。如果您要显示多个 Rive 动画，强烈建议将此标志设置为 `true`。默认为 `false`。
- `enableRiveAssetCDN?` —— *(可选)* 允许运行时自动加载托管在 Rive CDN 上的资源。默认开启。
- `shouldDisableRiveListeners?` —— *(可选)* 布尔标志，用于禁止在 `<canvas>` 元素上设置 Rive 监听器 (Listeners)，从而防止设置任何事件监听器。
  - **注意**：如果当前没有正在播放的状态机，或者状态机本身没有配置 Rive 监听器，默认情况下不会在 `<canvas>` 元素上设置监听器。
- `isTouchScrollEnabled?` —— *(可选)* 对于 Rive 监听器，允许在触控设备上执行触摸/拖动操作时仍能触发画布元素的滚动行为。否则，默认情况下画布上的触摸/拖动操作可能会阻止滚动。
- `automaticallyHandleEvents?` —— *(可选)* 允许运行时自动处理 Rive 事件 (Rive Events)。这意味着任何特殊的 Rive 事件都可能产生隐式的副作用。例如，如果在渲染循环中检测到 `OpenUrlEvent`，浏览器可能会尝试打开载荷中指定的 URL。为了防止任何意外行为，此标志默认为 `false`。这意味着任何特殊的 Rive 事件都必须通过订阅 `EventType.RiveEvent` 进行手动处理。
- `onLoad?` —— *(可选)* 当 `.riv` 文件加载完成时触发的回调。
- `onLoadError?` —— *(可选)* 当加载 `.riv` 文件发生错误时触发的回调。
- `onPlay?` —— *(可选)* 当动画开始播放时触发的回调。
- `onPause?` —— *(可选)* 当动画暂停时触发的回调。
- `onStop?` —— *(可选)* 当动画停止播放时触发的回调。
- `onLoop?` —— *(可选)* 当动画完成一次循环时触发的回调。
- `onStateChange?` —— *(可选)* 当状态发生改变时触发的回调。
- `onAdvance?` —— *(可选)* 在画板推进的每一帧都会触发的回调。
- `assetLoader?` —— *(可选)* 针对 Rive 文件中检测到的每个资产（无论是包含的还是排除的）调用的回调。回调会收到一个指向 Rive **FileAsset** 的引用以及相关的文件 **bytes**（如果资产嵌入在文件中）。在此回调中，您可以决定是由应用自行加载资产，还是让 Rive 为您加载。更多详情和示例请参阅 [加载资产 (Loading Assets)](/runtimes/loading-assets)。

## API

实例化 Rive 后可使用以下 API：

### play()

`play(names?: string | string[], autoplay?: true): void`

播放指定的线性时间轴动画或状态机。如果您通过编程方式调用了 `pause()`、`stop()`，或在实例化时设置了 `autoplay: false`，则此方法非常有用。如果未传入名称，它将播放所有已实例化的动画或状态机（如果都未实例化，则播放默认动画）。

**示例**：
```typescript
import {Rive} from '@rive-app/canvas';

const riveInstance = new Rive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
  autoplay: false,
  canvas: document.querySelector("canvas"),
});

const buttonEl = document.querySelector("button");
buttonEl.onclick = function() {
  // 播放名为 'bumpy' 的状态机
  riveInstance.play("bumpy");
};
```

### pause()

`pause(names?: string | string[]): void`

暂停指定的线性时间轴动画或状态机。如果您想通过编程暂停播放中的动画并暂停渲染循环，此方法很有用。如果关联的 Rive 实例的 `<canvas>` 元素滚动到了视口之外，您可能也想使用此 API。如果未传入名称，它会暂停所有已实例化的动画或状态机。

### stop()

`stop(names?: string | string[]): void`

停止指定的线性时间轴动画或状态机。如果您想通过编程停止播放中的动画和渲染循环，此方法很有用。如果状态机已“运行完毕”或处于退出状态，您可能也想使用此 API。如果未传入名称，它会停止所有已实例化的动画或状态机。

### reset()
```typescript
interface RiveResetParameters {
  artboard?: string;
  animations?: string | string[];
  stateMachines?: string | string[];
  autoplay?: boolean;
}

reset(params?: RiveResetParameters): void
```

根据传入的参数，从头（或进入状态）开始重置 Rive 画板、线性时间轴动画和/或状态机。隐式地，此方法还会在创建新实例之前清理已经创建的任何现有实例。

### on()

`on(type: EventType, callback: EventCallback): void`

类似于 DOM 元素的 `addEventListener` 功能，您可以订阅渲染循环周期中的特定“事件”。

`EventType` 包含以下枚举值：
```typescript
export enum EventType {
  Load = "load", // Rive 成功加载文件时
  LoadError = "loaderror", // Rive 无法加载文件时
  Play = "play", // 开始播放或恢复渲染循环时
  Pause = "pause", // 暂停渲染循环和播放时
  Stop = "stop", // 停止渲染循环和播放时
  Loop = "loop", // (仅限单个动画) 动画循环时
  Advance = "advance", // 每一帧推进时
  StateChange = "statechange", // 检测到状态更改时
  RiveEvent = "riveevent", // 报告 Rive 事件时
}
```

### off()

`off(type: EventType, callback: EventCallback): void`

类似于 DOM 元素的 `removeEventListener` 功能，您可以取消订阅特定事件。

### removeAllEventListeners()

`removeAllEventListeners(type?: EventType): void`

移除特定 `EventType` 的所有事件订阅。

### scrub()

`scrub(animationNames?: string | string[], value?: number): void`

将线性时间轴动画推进指定的时间量（秒）。

::: info
注意：如果您正在播放状态机，此操作将不起作用。它仅适用于通过 `animations` 属性使用的动画。
:::

### cleanup()

`cleanup(): void`

此 API **非常重要**。它会停止动画渲染循环，并清理为 Rive 文件、画板、动画、状态机和渲染器创建的所有实例。之所以需要手动调用 cleanup，是因为这些实体在后台通过 WASM 持有 C++ 引用，因此不会像普通 JS 对象那样自动被垃圾回收。

### cleanupInstances()

类似于 `cleanup()`，但仅清理画板、动画和/或状态机实例，从而允许您重新初始化同一 Rive 文件中的不同画板、不同时间轴动画或不同状态机。

### load()
```typescript
interface RiveLoadParameters {
  src?: string;
  buffer?: ArrayBuffer;
  autoplay?: boolean;
  artboard?: string;
  animations?: string | string[];
  stateMachines?: string | string[];
  useOffscreenRenderer?: boolean;
  shouldDisableRiveListeners?: boolean;
}

load(params: RiveLoadParameters): void
```

用新参数（包含新的 `src` 文件）替换现有 Rive 实例，同时隐式清理旧的引用。

### resizeToCanvas()

`resizeToCanvas(): void`

将布局边界设置为当前画布尺寸。如果画布大小发生变化，您可能需要调用此方法。

### resizeDrawingSurfaceToCanvas()

`resizeDrawingSurfaceToCanvas(): void`

将 `<canvas>` 的 width 和 height 属性重置为当前 CSS 渲染尺寸，并考虑浏览器的 `devicePixelRatio`。这可以防止在高分辨率屏幕上出现模糊。

### stateMachineInputs()
```typescript
class StateMachineInput {
  // 输入的名称
  public get name: string
  // 输入的值（针对数值或布尔输入）
  public get value: number | boolean
  // 直接设置输入值（针对数值或布尔输入）
  public set value: number | boolean
  // 触发 Trigger 类型输入的方法调用
  public fire(): void
}

stateMachineInputs(stateMachineName: string): StateMachineInput[]
```

根据给定的状态机名称返回其输入对象列表。

### stopRendering()

`stopRendering(): void`

停止渲染循环。仅可通过 `startRendering()` 恢复。

### startRendering()

`startRendering()`

恢复先前停止的渲染循环。

### getTextRunValue()

`getTextRunValue(textRunName: string): string | undefined`

获取文本运行 (text run) 组件的文本值。

### setTextRunValue()

`setTextRunValue(textRunName: string, textValue: string): void`

设置指定的文本运行组件的文本值。

### resolveAnimationFrame()

`resolveAnimationFrame(): void`

如果您手动构建渲染循环（[低级 API](/runtimes/web/low-level-api-usage)）并使用原生的 `requestAnimationFrame()`，则需要调用此方法。它会通过渲染器解析延迟的绘制命令。

## 调试工具 (Debugging Tools)

### contents

`contents` 是 Rive 实例的一个属性，您可以将其打印到控制台，以查看从 Rive 文件加载的完整对象层级结构（画板、动画、状态机、输入等）。

### enableFPSCounter()

报告运行时的每秒帧数 (FPS)。如果不提供回调，它将在页面右上角显示一个固定的 `<div>`。

### disableFPSCounter()

禁用 FPS 计数报告。

## 其他 (Other)

- `source`: 获取 Rive 实例的 `src` 属性。
- `activeArtboard`: 获取当前活动画板的名称。
- `animationNames`: 获取加载的画板上所有动画名称的数组。
- `stateMachineNames`: 获取加载的画板上所有状态机名称的数组。
- `playingAnimationNames`: 获取所有正在播放的时间轴动画名称。
- `playingStateMachineNames`: 获取所有正在播放的状态机名称。
- `isPlaying`: 如果有任何动画正在播放，返回 `true`。
- `isPaused`: 如果所有实例化的动画都已暂停，返回 `true`。
- `isStopped`: 如果没有实例化的动画正在播放或暂停，返回 `true`。
- `bounds`: 获取画板的边界。
- `layout`: 获取或设置 Rive `Layout`。
