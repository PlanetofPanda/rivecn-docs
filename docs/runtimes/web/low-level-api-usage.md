---
title: '低级 API 用法 (Low-level API Usage)'
description: '使用低级 JS API 构建 Rive 场景。'
---

## 背景 (Background)

虽然 JS 运行时提供了一个高级 API 以快速将 Rive 集装到 Web 应用中，但运行时还提供了一个更小、更先进的低级 API，允许您在自己的渲染循环中构建和控制 Rive。使用此低级 API 有几个原因和好处：

- 在一个 `<canvas>` 元素中构建由多个 Rive 文件、画板、线性动画和状态机组成的场景。如果您正在制作游戏，这将非常有用！
- 控制渲染循环，包括如何随时间推进每个画板、动画和状态机（包括速度控制）。
- 能够获取绘制层级结构中节点 (nodes) / 骨骼 (bones) 的多个变换属性值。
- 更小的依赖包体积。
- ……以及更多！

## 前提 (Premise)

以下是使用低级 API 渲染 Rive 的基本渲染流程：

### 1. 加载 Rive WebAssembly (WASM) 文件，其中包含具有低级 API 的模块

### 2. 加载 Rive 文件

### 3. 为画板 (Artboards)、线性动画 (LinearAnimations) 和状态机 (StateMachines) 创建实例

### 4. 构建渲染循环函数以操作上述创建的实例

   - **推进并应用任何动画实例**
   - **推进任何状态机实例**
   - **推进画板**
   - **在画布上渲染更新后的画板**
   - **请求下一帧动画**

### 5. 完成后清理创建的实例

## 入门 (Getting Started)

如果您决定应用需要低级 JS API，请阅读以下指南了解如何设置一切，或者您可以直接跳到最后查看实际运行的示例。

### 加载 WASM (Loading in WASM)

设置低级 Rive API 的第一步是从 `@rive-app/canvas-advanced` 或 `@rive-app/webgl2-advanced` 库中加载 Rive WASM 文件（默认情况下，除非您需要使用 WebGL2，否则我们推荐使用依赖更小的 `@rive-app/canvas-advanced`）。当 WASM 文件加载到应用中后，您将获得必要的 API，如用于 Canvas/WebGL 的渲染器，以及通过 [rive-cpp](https://github.com/rive-app/rive-cpp)（作为多个其他 Rive 运行时基础的核心 C++ 运行时）生成的 JS 类。您将使用这些类在下方的画布中构建您的渲染场景。

您可以通过 [unpkg](https://unpkg.com/) 加载 Rive WASM 文件（它托管了我们的 JS 运行时 NPM 模块），这将向 CDN 发起网络请求，或者您也可以选择将 WASM 文件托管在自己的服务器上。使用 `unpkg` 时，URL 如下所示：

https://unpkg.com/@rive-app/canvas-advanced@2.26.1/rive.wasm

::: info
您需要确保 `@rive-app/canvas-advanced@` 或 `@rive-app/webgl2-advanced@` 结尾的版本号与您在应用中安装的依赖版本相匹配。例如，如果您在 `package.json` 中安装了 `@rive-app/canvas-advanced@2.26.1`，那么您从 unpkg 请求的 Rive WASM 文件应为 `https://unpkg.com/@rive-app/canvas-advanced@2.26.1/rive.wasm`。
<br>
参阅 [预加载 WASM](/runtimes/web/preloading-wasm) 了解如何预加载 WASM。
:::

首先，从库中导入默认模块，然后调用它并传入一个对象，您只需设置一个参数 `locateFile`。该参数是一个返回 WASM 文件 URI 的函数，可以是 `unpkg` URL 或是您自托管版本的 URI。只需 `await` 调用解析完成，您就会获得对低级 Rive 运行时 API 的引用。

```javascript
import RiveCanvas from '@rive-app/canvas-advanced';

async function main() {
  const rive = await RiveCanvas({
    locateFile: (_) => 'https://unpkg.com/@rive-app/canvas-advanced@2.26.1/rive.wasm'
  });
}
main();
```

### 创建渲染器 (Creating the Renderer)

加载 WASM 后，下一步是使用 `makeRenderer()` API 创建渲染器，并传入 Rive 应在其上渲染的画布元素。渲染器通过渲染上下文将 Rive 绘制到 `<canvas>` 元素上。如果您使用的是 `@rive-app/canvas-advanced`，它将创建一个 Canvas2D 渲染上下文；如果您使用的是 `@rive-app/webgl2-advanced`，它将创建一个 WebGL 渲染上下文。

```javascript
const canvas = document.getElementById('your-canvas-element');
const renderer = rive.makeRenderer(canvas);
```

### 加载 Rive 文件 (Loading in Rive Files)

创建渲染器后，您还可以开始将 Rive 文件加载为 `ArrayBuffer`，并将其输入到运行时的 `load()` API 中。您可以从 URL 或项目中的某个位置获取此文件。

```typescript
const bytes = await (
  await fetch(new Request('basketball.riv'))
).arrayBuffer();

// 从 Rive 依赖中作为命名导出导入 File
const file = (await rive.load(new Uint8Array(bytes))) as File;
```

::: info
确保 `await` 这个 `.load()` 调用，因为它会同步尝试从 `File` 中加载资产。此外，在将 `ArrayBuffer` 作为参数发送给 `.load()` 之前，请先将其转换为 `Uint8Array` 视图。
:::

### 设置实例 (Setting up the Instances)

获得加载的 `File` 对象引用后，您可以开始从 Rive 文件中实例化所有的画板、状态机和线性动画。实例化会创建一个底层 C++ 引用，并允许您控制每个实体随时间推进的方式。本指南后面会有更多相关内容。

您最可能想要实例化的主要组件有：

- `Artboard` —— 从您想要绘制的 Rive 文件中实例化 1 个或多个画板。
- `StateMachineInstance` —— 从给定画板实例化一个状态机。
- `LinearAnimationInstance` —— 从给定画板实例化一个单一时间轴动画。

首先实例化一个画板，然后您可以从画板引用中创建状态机和线性动画实例，如下所示。

```javascript
const artboard = file.artboardByName('New Artboard');
const animation = new rive.LinearAnimationInstance(
  artboard.animationByName('idle'),
  artboard
);
const stateMachine = new rive.StateMachineInstance(
  artboard.stateMachineByName('your-state-machine-name'),
  artboard
);
```

在这里最棒的一点是，如果您想在画布上显示多个画板，甚至是同一个画板的多个副本，您可以轻松实现（相比之下，高级 API 一次只能显示一个）。

除了为渲染循环实例化相关片段外，您还可以提取绘图层级结构中节点 (nodes)、目标 (targets) 和骨骼 (bones) 的引用。如果您需要跟踪给定节点的任何变换属性值用于计算，甚至是获取世界空间或父级变换（例如在动画生命周期内跟踪节点的 x, y 坐标或旋转值），这将非常有用。请参阅指南底部的示例来查看实际应用。

### 构建渲染循环 (Constructing the Render Loop)

您可能熟悉使用 `requestAnimationFrame` (rAF) 在浏览器重绘周期之间逐帧构建动画。如果不熟悉，可以参考 [此指南](https://developer.mozilla.org/en-US/docs/Games/Anatomy#building_a_main_loop_in_javascript) 作为构建渲染循环的起点。

在 Rive 渲染循环的情况下，您将使用封装了 rAF 的自定义 Rive API，因此需要使用 `rive.requestAnimationFrame()` 以及 `rive.cancelAnimationFrame()`。其结构应与您为其他动画构建的任何 rAF 循环类似，但您将通过推进上述创建的实例并根据需要将画板对齐到画布。

首先，为 rAF 周期创建回调循环，并记录自上一次 rAF 回调以来的时间，以秒为单位获取流逝时间。然后，使用渲染器的 `.clear()` API 清除画布。

```javascript
let lastTime = 0;
function renderLoop(time) {
  if (!lastTime) {
    lastTime = time;
  }
  const elapsedTimeMs = time - lastTime;
  const elapsedTimeSec = elapsedTimeMs / 1000;
  lastTime = time;

  renderer.clear();

  // ...

  rive.requestAnimationFrame(renderLoop);
}
rive.requestAnimationFrame(renderLoop);
```

#### 推进动画 (Advancing Animations)

`LinearAnimationInstance` 具有一组应用于画板中对象的关键帧。在渲染循环中，您需要对创建的动画实例调用 `.advance()`，以获取这些关键帧，并按照 API 名称所示，将动画推进一定的时间量（以秒为单位）。

::: info
通常，您会希望按照上面计算的流逝时间来推进动画，以便以“正常”速度播放（或者更确切地说，是以该时间轴动画设置的任何速度播放）。通过低级 API 控制渲染循环，您可以按自定义时间值推进实例，例如流逝时间的一半（以 0.5 倍速播放）甚至流逝时间的两倍（以 2 倍速播放）。您甚至可以将流逝时间乘以 -1 来反向运行动画。
:::

除了推进线性动画外，您还需要将关键帧值应用到该动画在画板中相关对象的属性上，并通过 `.apply()` 调用指定动画的混合 (mix) 值。当动画应用关键帧的插值时，它会将这些值与画板对象上的当前值混合。这允许您“混合”动画，如果您有两个动画实例在同一个对象的相同属性上应用关键帧值，这将非常有用。用新关键帧值替换旧属性值的默认混合值应为 `1`。

将动画值应用到画板后，推进画板（详见下文）以更新画板对象并解析属性值的更改。

综上所述，推进线性动画的操作顺序如下：
```css
推进动画 -> 应用动画值 -> 推进画板
```

参考以下代码片段：
```typescript
function renderLoop(time) {
  if (!lastTime) {
    lastTime = time;
  }
  const elapsedTimeMs = time - lastTime;
  const elapsedTimeSec = elapsedTimeMs / 1000;
  lastTime = time;

  renderer.clear();
  animation.advance(elapsedTimeSec);
  animation.apply(1);
  artboard.advance(elapsedTimeSec);
}
```

#### 推进状态机 (Advancing State Machines)

`StateMachineInstance` 与上述 `LinearAnimationInstance` 流程类似，但有几点不同。使用状态机时，您不需要应用混合值，因为对应于一个画板您应该只有一个状态机实例，并且混合值由时间轴动画之间设置的过渡决定。此外，`.advance()` 方法会直接更新画板上对象的属性。因此，推进状态机的操作顺序简化为：
```css
推进状态机 -> 推进画板
```

参考以下代码示例：
```javascript
function renderLoop(time) {
  if (!lastTime) {
    lastTime = time;
  }
  const elapsedTimeMs = time - lastTime;
  const elapsedTimeSec = elapsedTimeMs / 1000;
  lastTime = time;

  renderer.clear();
  stateMachine.advance(elapsedTimeSec);
  artboard.advance(elapsedTimeSec);
}
```

#### 推进画板 (Advancing the Artboard)

如前所述，推进画板将在通过动画和/或状态机应用值后，完成更新层级结构中相关对象的工作。如果您同时控制多个动画，则只需在渲染循环中推进一次画板。如果您在画布中为场景控制多个画板，则根据需要在渲染循环中推进每个画板。

#### 对齐与渲染 (Align and Render)

渲染循环中最后要考虑的部分是设置画板的对齐方式，设置绘图区域和画板的边界，最后将渲染上下文传递给画板，以便在画布中绘制画板。

推进画板后，在渲染上下文上调用 `save()` API 以保存画布状态。然后对上下文调用 `align()` API，提供以下内容：

1. `Fit` (填充模式) 和 `Alignment` (对齐方式) 的值。
2. 要绘制到的画布空间边界。
3. 在该空间内绘制 Rive 内容的边界。

关于 `Fit` 和 `Alignment` 的选项请 [参阅此处](/runtimes/layout)。对于后两个参数，请提供一个轴对齐包围盒 (AABB)。参考下方有关 `align()` API 的代码片段。

最后，在调用 `align()` 之后，通过 `draw()` 方法将渲染器传递给画板以在画布上绘制画板，最后在渲染器上调用 `restore()` API 以恢复保存的画布状态。

::: info
如果您使用的是 `@rive-app/webgl2-advanced`，则需要调用 `renderer.flush()` 来清空不同的缓冲指令。
:::

最后要做的是通过此回调调用 Rive 的 `requestAnimationFrame`，以排队等待下一帧的回调。

完整代码如下所示：
```javascript
function renderLoop(time) {
  if (!lastTime) {
    lastTime = time;
  }
  const elapsedTimeMs = time - lastTime;
  const elapsedTimeSec = elapsedTimeMs / 1000;
  lastTime = time;

  // ...

  renderer.clear();
  stateMachine.advance(elapsedTimeSec);
  artboard.advance(elapsedTimeSec);
  renderer.save();
  renderer.align(
    rive.Fit.contain,
    rive.Alignment.center,
    {
      minX: 0,
      minY: 0,
      maxX: canvas.width,
      maxY: canvas.height
    },
    artboard.bounds,
  );
  artboard.draw(renderer);
  renderer.restore();
  // 如果使用 WebGL，可选调用下方函数
  // renderer.flush()
  rive.requestAnimationFrame(renderLoop);
}
rive.requestAnimationFrame(renderLoop);
```

至此，您应该能够在画布上渲染 Rive 了！

### 清理实例 (Cleaning Up Instances)

对于创建的每个 C++ 实例，当您完成使用后都需要将其删除，以免应用程序出现内存泄漏。不幸的是，这是一项手动操作，因为我们还不能依赖浏览器中新的终结器 (finalizer) API 来进行垃圾回收。当不再需要从 Rive 运行时创建的任何实例时，请对其调用 `.delete()` API。示例如下：

```javascript
// 创建的实例
const renderer = rive.makeRenderer(canvas);
const bytes = await (
  await fetch(new Request('basketball.riv'))
).arrayBuffer();
const file = (await rive.load(new Uint8Array(bytes))) as File;
const artboard = file.artboardByName('New Artboard');
const animation = new rive.LinearAnimationInstance(
  artboard.animationByName('idle'),
  artboard
);
const stateMachine = new rive.StateMachineInstance(
  artboard.stateMachineByName('your-state-machine-name'),
  artboard
);

// ...

renderer.delete();
file.delete();
artboard.delete();
animation.delete();
stateMachine.delete();
```

## 示例 (Examples)

请参阅下方链接，了解演示低级 JS API 用法的示例：

- [@rive-app/canvas-advanced 的简单用法](https://codesandbox.io/p/sandbox/canvas-advance-api-example-s6dz3m?file=%2Fsrc%2Findex.ts)
- [@rive-app/webgl2-advanced 的简单用法](https://codesandbox.io/p/sandbox/rive-webgl-advanced-57lczl?file=%2Fsrc%2Findex.ts)
- [带外资源（字体）的使用 @rive-app/canvas-advanced](https://codesandbox.io/p/sandbox/rive-canvas-advanced-out-of-band-assets-fonts-3q4zzy?file=%2Fsrc%2Findex.ts)

## API 参考 (API References)

请参阅我们的 [类型文件](https://github.com/rive-app/rive-wasm/blob/master/js/src/rive_advanced.mjs.d.ts) 以了解高级 API，从而掌握 API 签名和返回类型。

## 注意事项 (Caveats)

高级 JS 运行时 API 是使用上述低级 API 构建的。除此之外，高级 JS 运行时还具有额外的功能，方便用户执行以下操作：

- 通过 `.play()`、`.pause()`、`.stop()` 等 API 轻松控制播放。
- 提供 `onStateChange`、`onLoad` 等回调，允许您挂钩到特定的 Rive 生命周期事件。
- 将手势事件挂钩到 [Rive 监听器 (Rive Listeners)](/editor/state-machine/listeners)。

当使用 Rive 的高级 JS API 自定义 Rive 的使用方式时，您需要自己设置其中一些功能。请查看 [此处的高级 Rive API 构建方式](https://github.com/rive-app/rive-wasm/blob/master/js/src/rive.ts)，以了解在需要时如何复制这些高级功能。

## 将 Rive 集装到现有的 rAF 循环中

如果您希望将 Rive 添加到现有的渲染循环（JS API `requestAnimationFrame()`）中，并且不想使用 Rive 封装的 `requestAnimationFrame()` API，可以通过在渲染循环末尾额外调用一个 API 来实现。在重新调用 `requestAnimationFrame()` 之前，在渲染循环末尾调用 `rive.resolveAnimationFrame()` API。

更多用法请参阅 [Rive 参数 (Rive Parameters)](/runtimes/web/rive-parameters) 文档。