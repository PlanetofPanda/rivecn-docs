---
title: '组件 (Components)'
description: ''
---

Rive Unity 软件包包含了一些组件，旨在帮助您快速、轻松地将 Rive 集成到项目中。这些组件是对[低级 API](/game-runtimes/unity/fundamentals) 的高级抽象，负责处理渲染和指针输入，并在不同渲染管线之间为 Rive 提供统一的使用方式。

我们建议大多数情况下使用这些组件，除非您有特定的渲染需求，或是需要对 Rive 在图形管线中的位置进行更精细的控制，在这种情况下您可以使用低级 API。

## Rive 面板 (Rive Panel)

Rive 面板（Rive Panel）是在 Unity 中显示 Rive 图形的基础。它作为一个视口（viewport），负责管理一组 Rive 挂件（Widgets）并将其渲染到渲染纹理（Render Texture）上，面板的尺寸决定了渲染目标的大小。

该面板可以将多个挂件渲染到单个渲染纹理中，这意味着您可以通过在同一个面板下放置多个 Rive 挂件，将不同的 Rive 文件和画板绘制到同一张纹理上。这比使用多个面板性能更好，因为默认情况下每个面板都会渲染到独立的纹理。

#### 设置 (Setup)

创建一个实例：在场景层级点击右键 `→ Rive → Rive Panel`。

::: warning
Rive 面板仅负责将图形绘制到纹理。您需要将 Rive 面板**配合**一个[面板渲染器 (Panel Renderer)](/game-runtimes/unity/components#panel-renderers) 使用，才能在屏幕上显示纹理。
:::

**配置项**

| 属性 | 描述 |
| --- | --- |
| Custom Render Target Strategy | 用于渲染面板的策略。默认情况下，每个面板渲染到与其尺寸匹配的单个 RenderTexture。您可以提供不同的策略，例如渲染到纹理池或在面板间共享纹理。 |
| Update Mode | 控制面板如何更新挂件：`Auto` 为每帧自动更新，`Manual` 则需要通过调用 `Tick()` 进行显式控制。 |
| Disable Editor Preview | 使用此选项防止面板在 Unity 编辑器的编辑模式（Edit mode）下进行渲染。 |

**属性**

| 属性 | 描述 |
| --- | --- |
| Widget Container | 持有面板下挂件的 RectTransform。 |
| Widgets | 由该面板管理的挂件只读列表。 |
| Render Texture | 当前绘制挂件的渲染纹理。 |
| Scale In RenderTexture | 面板在其渲染纹理中的缩放比例。如果未设置渲染策略，返回 `Vector2.one`。 |
| Offset In Render Texture | 面板在其渲染纹理中的偏移量。如果未设置渲染目标策略，返回 `Vector2.one`。 |
| Is Rendering | 描述面板是否当前已注册到渲染目标策略并正在活跃地渲染。 |

**公共方法**

| 名称 | 描述 |
| --- | --- |
| Tick(float deltaTime) | 更新面板中的所有挂件。在 Auto 模式下自动调用。<br>仅当 `Update Mode` 设置为 `Manual` 时才需要手动调用此方法。 |
| StartRendering() | 如果面板尚未渲染到渲染纹理，则开始渲染。 |
| StopRendering() | 如果面板正在渲染到渲染纹理，则停止渲染。 |
| SetDimensions(Vector2 dimensions) | 设置面板的宽度和高度。 |
| RegisterInputProvider(IPanelInputProvider provider) | 注册一个自定义输入提供者，用于处理指针事件。 |
| UnregisterInputProvider(IPanelInputProvider provider) | 移除之前注册的输入提供者。 |

## Rive 挂件 (Rive Widget)

Rive 挂件（Rive Widget）是在 Unity 中显示 Rive 画板的主要组件。它负责加载 Rive 文件，既可以是在编辑时从资产（Assets）加载，也可以是在运行时加载的文件（适用于从服务器或 Addressables 加载内容）。该组件管理画板和状态机的设置，自动配置显示图形所需的一切。

#### 设置 (Setup)

创建一个实例：在场景层级点击右键 `→ Rive → Widgets → RiveWidget`。

::: info
Rive 挂件必须放置在 RivePanel 下才能被显示。
:::

**配置项**

| 字段 | 描述 |
| --- | --- |
| Asset | 要加载的 Rive 资产 (.riv)。 |
| Artboard Name | 从 Rive 文件中加载的画板名称。 |
| State Machine Name | 从所选画板中加载的状态机名称。 |
| Hit Test Behaviour | 指针事件的处理方式（Opaque, Translucent, Transparent, None）。 |
| Fit | 画板在其挂件边界内的适配模式。详见 [适配文档](/runtimes/layout#fit)。 |
| Alignment | 画板在挂件边界内的对齐方式。 |
| Layout Scale Factor | 使用 Layout 适配模式时的缩放乘数。 |
| Layout Scaling Mode | 挂件在 Layout 模式下的缩放模式（`ReferenceArtboardSize`, `ConstantPhysicalSize` 和 `ConstantPixelSize`）。 |
| Fallback DPI | 当屏幕 DPI 不可用时使用的备用 DPI 值。 |
| Reference DPI | 用于缩放计算的目标参考 DPI 值。 |

**属性**

| 名称 | 描述 |
| --- | --- |
| File | 当前加载的 Rive 文件实例。 |
| Artboard | 当前加载的画板实例。 |
| State Machine | 当前加载的状态机实例。 |
| Status | 挂件当前的状态（Uninitialized, Loading, Loaded, Error）。 |
| BindingMode | 决定挂件如何处理与 ViewModel 实例的绑定：Auto Bind Default（自动绑定默认）、Auto Bind Selected（自动绑定选定）或 Manual（手动）。 |
| ViewModelInstanceName | 当 BindingMode 设置为自动绑定选定时，要绑定的 ViewModel 实例名称。 |

**事件**

| 名称 | 描述 |
| --- | --- |
| OnRiveEventReported | 当 Rive 图形报告 Rive 事件时触发。 |
| OnWidgetStatusChanged | 当挂件状态改变时触发（例如从 Loading 变为 Loaded 或 Error）。 |

**公共方法**

| 名称 | 描述 |
| --- | --- |
| Load(File file) | 使用默认画板和状态机加载一个 Rive 文件。 |
| Load(File file, string artboardName, string stateMachineName) | 指定画板和状态机加载一个 Rive 文件。 |
| Load(Asset asset) | 使用资产加载，使用默认画板和状态机。Rive Widget 会管理加载文件的生命周期，并在组件销毁或新资产传入时进行清理。 |
| Load(Asset asset, string artboardName, string stateMachineName) | 指定画板和状态机从资产加载。Rive Widget 负责管理底层文件的生命周期。 |

::: warning
如果您使用了任何接受 `File` 实例的 Load 方法，您需要负责在不再需要时手动销毁（dispose）该 File 实例。而从 `Asset` 加载时则无需担心，因为 Rive Widget 会自动管理底层文件（加载和销毁）。
:::

## 过程化 Rive 挂件 (Procedural Rive Widget)

过程化 Rive 挂件（Procedural Rive Widget）支持使用 Rive 渲染器在运行时生成图形。此组件允许您通过编程方式，使用 Rive 的绘图原语（路径、填充等）来创建图形。
可以参考[此示例](https://github.com/rive-app/rive-unity/blob/0765c81e1b68e77fcbf0e62afee7290eff400d17/tests/package/PlayModeTests/Components/Goldens/TestPanels/TestProceduralDrawing.cs)了解过程化绘图的实际实现。

#### 设置 (Setup)

创建一个实例：在场景层级点击右键 `→ Rive → Widgets → Procedural Rive Widget`。

::: info
过程化 Rive 挂件必须放置在 RivePanel 下才能被显示。
:::

**配置项**

| 属性 | 描述 |
| --- | --- |
| Procedural Drawing | 定义绘图内容的 ProceduralDrawing 实例。 |
| Hit Test Behavior | 指针事件的处理方式（Opaque, Translucent, Transparent, None）。 |

**属性**

| 名称 | 描述 |
| --- | --- |
| Status | 挂件当前的状态（Uninitialized, Loading, Loaded, Error）。 |

**事件**

| 名称 | 描述 |
| --- | --- |
| OnWidgetStatusChanged | 当挂件状态改变时触发。 |

**公共方法**

| 名称 | 描述 |
| --- | --- |
| Load(ProceduralDrawing proceduralDrawing) | 向挂件加载一个新的过程化绘图实例。 |

## 面板渲染器 (Panel Renderers)

面板渲染器将 RivePanel 的渲染纹理连接到 Unity 的显示系统。通过将渲染逻辑与显示层面解耦，我们可以在保持核心 Rive 功能一致的同时，支持不同的渲染上下文（UI、世界空间等）。

每种渲染器类型都专门针对特定的 Unity 渲染路径，自动处理输入系统和渲染顺序等细节。

### Rive 画布渲染器 (Rive Canvas Renderer)

Rive 画布渲染器在 Unity UI 系统（uGUI）中显示 Rive 内容。它会自动配置必要的 Canvas 组件，并处理 UI 相关的特定问题，如正确的渲染顺序和射线检测（raycasting）。

::: info
Rive 画布渲染器会根据其所在的 uGUI Canvas 来控制 Rive 面板的大小。
:::

您也可以通过在场景层级点击右键并导航到 `Rive > Rive Panel (Canvas)` 来创建一个已自动配置此组件的 Rive 面板。

#### 要求

- 场景中需要有 EventSystem 以处理指针输入。
- Canvas 上需要有 GraphicRaycaster 以处理指针输入。
- Rive 面板必须位于 uGUI canvas 之下。
- 此组件必须与 Rive 面板放置在同一个游戏对象（GameObject）上。

#### 配置项

| 属性 | 描述 |
| --- | --- |
| Pointer Input Mode | 控制渲染器是否接受指针输入（启用/禁用）。 |
| Custom Material | 渲染 Rive 图形时使用的自定义 UI 材质。 |
| Match Canvas Resolution | 是否将画布分辨率与 RivePanel 分辨率匹配。当使用 `Canvas Scaler` 时，这对于保持 Rive 图形清晰非常有用。默认情况下，RivePanel 的分辨率由其 rect transform 的宽高决定。开启此项后，如果需要，RivePanel 的渲染分辨率将高于其 rect transform 的大小。目前仅在 RivePanel 使用 `SimpleRenderTargetStrategy`（默认策略）时支持此功能。 |

#### 属性

| 名称 | 描述 |
| --- | --- |
| Rive Panel | 正在被渲染的面板。 |

### Rive 纹理渲染器 (Rive Texture Renderer)

Rive 纹理渲染器将 Rive 内容投影到 3D 场景中的材质。它在 Rive 的 2D 渲染系统与 Unity 的 3D 材质系统之间架起桥梁，让您可以轻松地将 Rive 内容应用到场景中的任何网格（mesh）上。

#### 要求

- 必须放置在带有 MeshRenderer 的游戏对象上。例如：Cube, Plane, Quad 或 Capsule。
- 场景中需要有 EventSystem 以处理指针输入。
- 相机上需要有 PhysicsRaycaster 以处理 3D 空间中的指针输入。
- 目标游戏对象需要有 MeshCollider 以处理指针输入。

#### 配置项

| 字段 | 描述 |
| --- | --- |
| Renderer | 负责显示 Rive 内容的 Unity 渲染器组件（例如 MeshRenderer）。 |
| Material Texture Assignment Mode | 控制将 Rive 面板的渲染纹理设置到哪些材质属性：MainTexture 设置材质的 `_MainTex` 属性；`TextureProperties` 选项允许您选择多个特定的纹理属性。 |
| Visibility Optimization | 决定当网格对相机不可见时，RivePanel 是否应停止渲染。 |
| Pointer Input Mode | 控制渲染器是否接受指针输入（启用/禁用）。 |

#### 属性

| 名称 | 描述 |
| --- | --- |
| Rive Panel | 正在渲染到材质的面板。 |

**公共方法**

| 名称 | 描述 |
| --- | --- |
| SetPanel(IRivePanel panel) | 分配一个新面板进行渲染。 |
| RefreshMaterials() | 在材质更改后更新材质引用。 |

## 渲染目标策略 (Render Target Strategies)

渲染目标策略控制 **Rive 面板** 如何渲染到纹理。它们决定面板是拥有独立的纹理还是共享同一个纹理图集，并处理纹理创建、面板排列和内存管理等细节。

### 简单渲染目标策略 (Simple Render Target Strategy)

`Simple Render Target Strategy` 是 **Rive 面板** 的默认渲染方式，它为每个面板创建一个专用的渲染纹理。如果未提供自定义策略，它会自动添加到 Rive 面板中。

这种面板与纹理之间一对一的映射提供了非常直接的内存管理方式。

::: info
该组件必须与它的 RivePanel 附加在同一个游戏对象上。
:::

**配置项**

| 字段 | 描述 |
| --- | --- |
| Panel | 此策略管理的 RivePanel（在同一个游戏对象上时会自动设置）。 |
| Draw Timing | 渲染发生的时机：`Batched`（每帧一次）或 `Immediate`（立即更新）。 |

**属性**

| 名称 | 描述 |
| --- | --- |
| DrawTiming | 当前的绘制时机模式。 |

### 图集渲染目标策略 (Atlas Render Target Strategy)

图集渲染目标策略（Atlas Render Target Strategy）支持多个面板共享单个纹理图集（texture atlas），以优化内存使用和减少绘制调用（draw calls）。

默认情况下，它使用简单的货架包装（shelf-packing）算法在图集中高效排列面板，在遵守最大尺寸限制的前提下根据需要自动扩大纹理。

#### 设置 (Setup)

1. 创建一个实例：在场景层级点击右键 `→ Rive → Render Target Strategies → Atlas Render Target Strategy`。
2. 分配给面板：将该策略拖入目标面板上的 `Custom Render Target Strategy` 字段。
3. （可选）配置图集参数，如初始大小和分辨率限制。

#### 备注

- 共享同一策略实例的面板将共用同一个图集纹理。
- 创建多个策略实例可以将面板分组到不同的图集中。

> [观看视频](https://ucarecdn.com/c29cc703-05c1-49c5-ba0d-4dad985b5221)

**配置项**

| 字段 | 描述 |
| --- | --- |
| Starting Size | 图集纹理的初始尺寸（例如 1024x1024）。 |
| Max Atlas Size | 图集可以扩大的最大尺寸（例如 2048x2048）。 |
| Max Resolution Per Panel | 任何单个面板的最大分辨率。更大的面板会被等比缩小显示。 |
| Padding | 图集中面板之间的间距，防止纹理溢出干扰。 |
| Draw Timing | 渲染发生的时机：`Batched`（每帧一次）或 `Immediate`（立即更新）。 |
| Custom Atlas Packing Provider | （可选）自定义包装算法（默认为货架包装）。 |

**属性**

| 名称 | 描述 |
| --- | --- |
| Packing Strategy | 当前用于在图集中排列面板的策略。 |
| Draw Timing | 当前的绘制时机模式。 |

**公共方法**

| 名称 | 描述 |
| --- | --- |
| Configure(Vector2Int startingSize, Vector2Int maxSize, int maxResPerPanel, int padding) | 在初始化前设置图集参数。 |

### 纹理池渲染目标策略 (Pooled Render Target Strategy)

**Pooled Render Target Strategy** 通过维护一个可重用的渲染纹理池来优化内存。此策略不为每个面板创建新纹理或共享单个图集，而是从管理的池中抽取纹理绘制面板，并根据需要回收。

这种方法对于具有频繁出现和消失的动态 UI 元素的场景特别有用。例如，在包含大量弹出菜单或带有 Rive 图形的工具提示的嬉戏中，该策略可以在 UI 元素显示和隐藏时重用纹理，避免不断的纹理分配和释放。

#### 配置项

| 字段 | 描述 |
| --- | --- |
| Pooled Texture Size | 池中纹理的大小（所有池化纹理共享此尺寸）。如果某个 Rive 面板与纹理的宽高比不匹配，面板将被调整大小以适应纹理，并保持其宽高比。 |
| Initial Pool Size | 池的初始分配的大小。 |
| Max Pool Size | 池可以包含的最大纹理数量。 |
| Pool Overflow Behavior | 当池满时如何处理请求：`Flexible`（创建临时纹理）或 `Fixed`（拒绝新面板）。 |
| Draw Timing | 渲染发生的时机：`Batched`（每帧一次）或 `Immediate`（立即更新）。 |

#### 属性

| 名称 | 描述 |
| --- | --- |
| Pool Overflow | 当前的溢出行为设置。 |
| Pooled Texture Size | 池使用的当前纹理尺寸。 |
| Initial Pool Size | 当前的初始池容量。 |
| Max Pool Size | 当前的最大池尺寸。 |
| Draw Timing | 当前的绘制时机模式。 |

#### 公共方法

| 名称 | 描述 |
| --- | --- |
| Configure(Vector2Int textureSize, int initialSize, int maxSize, PoolOverflowBehavior behavior) | 设置池参数（必须在注册第一个 Rive 面板之前调用）。 |
