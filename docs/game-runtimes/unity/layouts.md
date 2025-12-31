---
title: '布局 (Layouts)'
description: '在 Unity 中控制 Rive 动画的布局'
---

import LegacyApiNotice from '/snippets/unity/legacy-api-notice.mdx';

有关 Rive 布局的更多信息，请参阅[运行时文档](/runtimes/layout)。

**[布局 (Layout)](/runtimes/layout)**

    Rive 提供了多种方式来控制动画在用于显示它们的画布或视图中的布局方式。Rive 允许您控制渲染内容的适配模式（fit）、对齐方式（alignment）和偏移量（offset）。

## 适配与对齐 (Fit and Alignment)

### 组件 API (Components)

使用 **Rive Widget** 组件，您可以从 **Fit** 和 **Alignment** 选项列表中进行选择。

![The Fit and Alignment dropdowns in the Unity inspector](/images/game-runtimes/unity/03086bad-8cd9-4cfc-8d23-03579ff93a00.webp)

### 旧版 API (Legacy API)

::: warning
**旧版 API 通知**
:::

 适配和对齐可以通过 **Rive.Renderer** 的 `.Align()` 方法进行控制：
```csharp
 public Fit fit = Fit.contain;
 public Alignment alignment = Alignment.Center;
 public RenderTexture renderTexture;
 private Rive.Renderer m_riveRenderer;

 ...

 m_renderQueue = new Rive.RenderQueue(renderTexture);
 m_riveRenderer = m_renderQueue.Renderer();
 ...

 if (m_artboard != null && renderTexture != null)
 {
     m_riveRenderer.Align(fit, alignment, m_artboard);
     m_riveRenderer.Draw(m_artboard);
 }
```

## 响应式布局 (Responsive Layout)

`Layout` 适配模式允许您显示具有内置响应式行为的可调尺寸画板，这些行为直接在图形中配置。在运行时设置 **Fit** 类型为 **Layout**，画板将自动调整大小。此外，您还可以提供一个 **Layout Scale Factor**（布局缩放因子）来进一步调整内容的缩放。

### 组件 API (Components)

当 **Fit** 设置为 `Layout` 时，**Rive Widget** 会执行以下操作：

• 从其 RectTransform 中测量可用空间。

• 根据 `Layout Scaling Mode`（布局缩放模式）和 `Layout Scale Factor` 计算新的画板尺寸。

• 动态调整画板大小以匹配计算出的维度。

## 布局缩放模式 (Layout Scaling Modes)

您可以从以下三种布局缩放模式中进行选择：

**Reference Artboard Size (默认)**

• 根据画板的原始（参考）尺寸进行等比缩放，在不同分辨率下保持相对一致的大小。

• 画板始终表现为"相对于屏幕而言的大小相同"，保持一致的、与分辨率无关的视觉效果。

• 使用 "Layout Scale Factor" 可以微调或放大/缩小该比例（1x 为基准）。

**Constant Pixel Size (固定像素大小)**

• 无论屏幕分辨率或 DPI 如何，画板都保持其确定的像素大小。

• Layout Scale Factor 是应用于原始画板像素大小的直接乘数。

• 在低分辨率屏幕上画板看起来会较大，而在高分辨率屏幕上看起来会较小。

**Constant Physical Size (固定物理大小)**

• 尝试根据 DPI 缩放在不同设备上保持画板的物理尺寸相近。

• DPI 较高的设备将应用较大的像素缩放，从而使画板在不同设备间的物理尺寸保持一致。

• 在 RiveWidget 中需要配置两个额外属性：

    - Fallback DPI：当 `Screen.dpi` 不可用时使用的备用值。
    - Reference DPI：UI 设计的基准 DPI（例如，如果您针对标准桌面端，则设为 96）。

## 布局缩放因子 (Layout Scale Factor)

无论选择哪种 `Layout Scaling Mode`，您都可以通过 `Layout Scale Factor` 进一步缩放画板。1.0 表示没有额外缩放；大于 1.0 的值会放大画板，小于 1.0 的值会缩小画板。

在实践中，即便选定了特定的缩放模式，此因子也能为您提供灵活调整的空间。例如，如果您发现移动端上的内容略大，可以将 Layout Scale Factor 设置为 0.9（即缩放后尺寸的 90%）。

### 旧版 API (Legacy API)

::: warning
**旧版 API 通知**
:::

 **在自定义脚本中实现 Layout**

 在自定义脚本中实现 `Fit.Layout` 时，请考虑以下几个方面：

 1. **屏幕分辨率与缩放**
    - 监听屏幕分辨率的变化。
    - 处理 DPI。
    - 为不同显示密度实现正确的缩放。

 2. **输入处理**
    - 将输入坐标转换（Transform）以匹配已缩放的布局。
    - 在处理触摸/鼠标输入时考虑不同的 DPI。
    - 考虑对已缩放元素进行点击测试（hit-testing）的调整。

 此 [脚本](https://github.com/rive-app/rive-unity/blob/main/examples/basic/Assets/GameRuntime/RiveScreen.cs) 展示了在考虑上述各点的情况下，如何实现对 `Fit.Layout` 支持的一种方式。
