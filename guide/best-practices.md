---
title: "最佳实践 (Best Practices) - Rive 入门指南"
description: "编辑器与运行时性能及使用注意事项。 Rive 旨在应用和游戏中高效地播放编辑器内创建的交互式图形。然而，优化不佳的动画可能会消耗大量资源并导致性能下降，特别是在低端设备上。在接下来的章节中，我们将概述在 Rive 编辑器中进行设计/动画制作以及在应用程序运行时保持最佳性能和最小化资源占用的重要..."
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 入门指南, 最佳实践
---

入门

# 最佳实践 (Best Practices)

编辑器与运行时性能及使用注意事项。

Rive 旨在应用和游戏中高效地播放编辑器内创建的交互式图形。然而，优化不佳的动画可能会消耗大量资源并导致性能下降，特别是在低端设备上。在接下来的章节中，我们将概述在 Rive 编辑器中进行设计/动画制作以及在应用程序运行时保持最佳性能和最小化资源占用的重要注意事项和提示。

我们建议在你的目标设备/平台持续测试你的动画。

## [​](#design-time-considerations) 设计时注意事项 (Design-time Considerations)

以下是在 Rive 编辑器中保持 Rive 高性能的一些常用技巧：

### [​](#asset-optimizations) 资产优化 (Asset Optimizations)

图像、音频和字体资产通常是 .riv 文件臃肿的最大来源。未优化的资产会增加下载大小，并且必须加载到内存中，这可能导致运行缓慢，尤其是在低端设备上。

只有在画板 (Artboards) 中使用的资产才会被编译到运行时。资产面板 (Assets panel) 中未在画板中使用的项不会增加 .riv 文件的大小。

#### [​](#fonts) 字体 (Fonts)

字体文件通常包含数千个你可能不需要的字形，如希腊字母、数学运算符和图标。为了减小导出的字体或 .riv 文件的大小，可以 [选择包含哪些字形](/editor/text/fonts.md#glyph-%2F-script-selection)。

#### [​](#raster-image-sizes-&-dimensions) 位图大小与尺寸 (Raster Image Sizes & Dimensions)

确保图像资产的大小适合其用途至关重要。例如，如果图像只会在画板的一个小区域显示（如 100 x 100），则应避免使用大尺寸图像（如 8192 x 7022）。
使用大图像会迅速消耗设备内存。在内存受限的移动设备应用程序中尤其如此。即使这些图像经过压缩，它们的尺寸仍会影响应用程序内存的使用量。
如果你有一张非常大的图像，且在任何给定时间只有一部分可见（例如滚动背景），请考虑将图像拆分为较小的块，或混合使用位图并将其一部分重新创建为矢量。
![图像](https://help.rive.app/images/breaking-up-raster-images.webp)

#### [​](#raster-image-compression) 位图压缩 (Raster Image Compression)

压缩涉及通过使用各种算法丢弃某些图像数据来减小文件大小。你可以直接在 Rive 编辑器中压缩图像，这意味着你保留了原始图像，但为运行时使用压缩了图像。如果资产嵌入在动画中，这将减小导出的 riv 的文件大小。
为了获得最小的图像文件大小和最佳性能，我们建议使用 WebP 格式导出资产。

#### [​](#vector-images) 矢量图像 (Vector Images)

对矢量图像中的顶点数量保持高效使用。虽然多出几个顶点影响不大，但数千个顶点可能会有显著影响。在导入由 AI 生成、从位图转换或在绘图应用中创建的矢量时要特别小心。

### [​](#importing-lottie-files) 导入 Lottie 文件 (Importing Lottie Files)

虽然 Rive 提供了 Lottie 转换器以便于导出 .riv 文件，但直接在 Rive 中重新创建图形和动画通常会产生明显更小的文件大小。如果你正在导入 Lottie 文件，可以通过将图像从 PNG 转换为 WebP 并为字体文件选择仅导出必要的字形来进一步减小 .riv 文件的大小。此外，你可以 [带外加载资产 (load assets out of band)](#out-of-band-assets)，以便在多个 .riv 文件中复用字体和图像，从而优化存储。
通常首选直接在 Rive 中工作，因为它允许根据动画要求进行文件优化。例如，使用骨骼 (Bones) 和约束 (Constraints) 创建绑定 (Rigs)，与直接从 Lottie 转换相比，会导致动画中的关键帧更少。

### [​](#layer-blend-modes-for-web) Web 平台图层混合模式 (Layer Blend Modes for Web)

混合模式在 Web 上特别消耗资源，因为 WebGL 没有公开访问帧缓冲区的机制。为了应用混合模式，Rive 必须在合成之前将渲染的像素复制到单独的纹理中，这引入了显著的性能和内存开销。
虽然正在努力通过新的 WebGL 功能来改善这一点，但这些解决方案仍有待更广泛的支持。在此之前，最好在 Web 项目中谨慎使用混合模式，以确保最佳性能。

### [​](#artboard-considerations) 画板注意事项 (Artboard Considerations)

#### [​](#clipped-artboards) 剪裁画板 (Clipped Artboards)

剪裁画板通常没问题，但如果你遇到性能问题，值得尽量减少其使用。剪裁在计算上可能很昂贵，因为渲染器必须评估每个对象（包括组件实例）以确定像素可见性。相反，可以考虑将剪裁应用于画板内的特定对象或分组。
在大多数情况下，你可以安全地移除主画板本身的剪裁，因为在运行时，Rive 实例之外的任何内容都不会被渲染。

#### [​](#unused-artboards) 未使用的画板 (Unused Artboards)

未使用的画板仍会包含在编译后的 .riv 文件中，并会在文件首次加载时进行解析。这可能导致不必要的内存占用和性能开销，尤其是当未使用的画板包含复杂的动画或大型资产时。为了保持文件的精简和高效，最佳实践是移除任何未使用的画板。

### [​](#idle-animations) 空闲动画 (Idle Animations)

如果在状态机 (State Machine) 的给定状态下图形保持静态，请考虑使用“一次性 (one-shot)”动画并确保时间轴 (Timeline) 动画不会过长。在状态机的运行时中，如果没有正在播放的循环动画或活动的混合状态，运行时将先发制人地“暂停”自身，直到状态机输入或 Rive 监听器 (Listener) 触发状态机中的下一个过渡。这很有用，因为资源消耗（即 CPU 使用率）可能会降低到使 Rive 对应用程序资源的影响微乎其微的程度。
场景：图标、按钮、仅根据用户交互进行动画处理的图形等。

### [​](#using-solos) 使用 Solo (Using Solos)

[Solo](/editor/manipulating-shapes/solos.md) 类似于分组合 (Group)，但增加了切换嵌套对象渲染的功能。它的功能类似于单选按钮，会禁用同一层级上的其他对象。
Solo 的一个常见用法是为角色创建可以轻松切换的不同皮肤。使用 Solo 比单独为每个对象的不透明度制作动画要快得多。此外，它允许编辑器和运行时通过不计算/渲染禁用的 Solo 来优化你的动画。

### [​](#blend-states) 混合状态 (Blend States)

类似于“空闲动画”中的建议，确保混合状态过渡到其他状态，或者如果可能的话，在完成后移动到退出状态。当混合状态在运行时激活时，Rive 将持续播放状态机，即使它不再是必要的。在完成后提供一些远离混合状态的过渡，可确保 Rive 在考虑是否在播放状态机期间随时自动暂停时少了一个“活动”动画要追踪。

## [​](#runtime-considerations) 运行时注意事项 (Runtime Considerations)

以下是在应用程序中使用 Rive 运行时以保持 Rive 高性能的一些技巧：

### [​](#out-of-band-assets) 带外资产 (Out-of-band Assets)

参阅我们的 [加载资产 (Loading Assets)](/runtimes/loading-assets.md) 文档。此功能允许你在运行时通过代码动态加载和替换资产（如字体、图像和音频），并将资源提供给你的 Rive 图形。这具有以下好处：

- 减小导出的 `.riv` 二进制文件大小。
- 资产可以在多个 Rive 文件或应用程序的其他区域复用。
- 资产可以预加并缓存，以便在显示 Rive 图形之前随时可用。
- 资产可以根据屏幕大小和分辨率进行更换，如这个 [Web JS 示例](https://codesandbox.io/p/sandbox/cool-dewdney-hlk5xl?file=%2Fsrc%2Findex.ts) 所示。

### [​](#caching-your-riv) 缓存你的 .riv (Caching your .riv)

如果你在页面或应用程序的多处使用相同的 Rive 文件，可以 [缓存 .riv 文件](/runtimes/caching-a-rive-file) 以提高性能。缓存的关键好处是文件只需要解析和解码一次。从已缓存、已解码的文件中创建新的画板实例，比每次实例化画板前都解码文件要快得多。

### [​](#pausing-programmatically) 通过编程方式暂停 (Pausing Programmatically)

在几种情况下，你可能希望通过程序暂停配置了 Rive 的状态机。通过在运行时暂停 Rive 图形，你可能会注意到 Rive 对应用程序的影响（即 CPU 占用）微乎其微。

1. Rive 图形在屏幕外
   a. 如果一个 Rive 图形滚动到屏幕外且不需要继续播放，请在相应的运行时调用 `pause` API，以防止 Rive 在不需要时继续播放动画并消耗资源。
   b. 当图形回到屏幕内需要继续动画时，调用 `play` API。
2. 无障碍 (Accessibility)
   - 如果用户在设备设置中设置了更倾向于减少动画，你可能希望在运行时读取此属性，并通过程序调用 `pause` 或在 Rive 运行时设置 `autoplay: false`，以确保这些用户在浏览应用程序时减少动画。或者，可以创建并加载在运行时功能不同的其他画板或状态机。
3. 状态机在静态图形下空闲
   a. 当 Rive 图形在等待用户交互、数据处理等引发的状态机过渡时处于空闲状态，请执行 `Pause`。

### [​](#low-end-devices) 低端设备 (Low-end devices)

Rive 将尝试在所有浏览器/设备上高效运行，但如果可以，请在特定 Rive 图形运行时，测试你的应用程序在资源受限设备上的表现。你可能会发现，对于给定的屏幕，包含重度动画图形的 Rive 文件可能超出了实际需求，并决定显示静态 Rive 图形（即 `autoplay: false`）或减少任何给定点正在动画的 Rive 实体数量。
针对低端设备的一种策略是创建具有减少使用/动画的备用画板或状态机，以便在旧设备上运行时动态加载。