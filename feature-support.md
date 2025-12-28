# 功能支持 (Feature Support)

随着我们的 Rive 编辑器增加用于制作 Rive 资产的功能，有时我们的运行时需要更新以支持这些改进。这可能意味着新的或更改的 API。
请查看下面以了解你的 Rive 资产使用的给定功能是否已在运行时受支持。我们通常建议你的项目使用最新版本的运行时，以利用后续的错误修复和新功能。

某些功能需要在运行时使用 Rive 渲染器。请参阅我们关于 [选择渲染器](/runtimes/choose-a-renderer) 的文档。
目前，唯一需要 Rive 渲染器的功能是 **[矢量羽化 (Vector Feathering)](https://rive.app/blog/introducing-vector-feathering)**。

如果新功能需要最近的 API 更改，我们可能会包含有关迁移到较新版本的说明。

## 数据绑定 - 列表、图像和画板 (Data Binding - Lists, Images, and Artboards)

数据绑定列表、图像和画板是在初始数据绑定支持之后添加的。请参阅 [数据绑定概览](/editor/data-binding/overview.md) 和 [运行时的数据绑定](/runtimes/data-binding)。

| **Runtime** | **Version** |
| --- | --- |
| Web | ✅ `2.30.3+` |
| React | ✅ `4.22.0+` |
| React Native | Not yet supported |
| Flutter | ✅ `0.14.0-dev.1` |
| Flutter (rive\_native) | ✅ `0.0.4` |
| Apple | ✅ `v6.11.0+` |
| Android | ✅ `v10.4.0+` |
| C++ | ✅ Supported |
| Unity | ✅ `v0.3.7-canary.142` |
| Unreal | Not yet supported |

## 从右到左布局和文本 (Right to Left Layouts & Text)

| **Runtime** | **Version** |
| --- | --- |
| Web | ✅ `2.26.7+` |
| React | ✅ `4.18.6+` |
| React Native | ✅ `9.2.1+` |
| Flutter | ✅ `0.14.0-dev.1` |
| Flutter (rive\_native) | ✅ `v0.0.1-dev.7+` |
| Apple | ✅ `6.7.4+` |
| Android | ✅ `10.0.4` |
| C++ | ✅ Supported |
| Unity | ✅ `0.3.5+` |
| Unreal | ✅ `0.3.0a-gh` |

## 文本沿路径跟随 (Text Follow Path)

| **Runtime** | **Version** |
| --- | --- |
| Web | ✅ `2.26.7+` |
| React | ✅ `4.18.6+` |
| React Native | ✅ `9.2.1+` |
| Flutter | ✅ `0.14.0-dev.1` |
| Flutter (rive\_native) | ✅ `v0.0.1-dev.7+` |
| Apple | ✅ `6.7.4+` |
| Android | ✅ `10.0.4` |
| C++ | ✅ Supported |
| Unity | ✅ `0.3.5+` |
| Unreal | ✅ `0.3.0a-gh` |

## 数据绑定 (Data Binding)

请参阅 [数据绑定概览](/editor/data-binding/overview.md) 和 [运行时的数据绑定](/runtimes/data-binding)。

| **Runtime** | **Version** |
| --- | --- |
| Web | ✅ `2.26.6+` |
| React | ✅ `4.20.0+` |
| React Native | ✅ `9.3.0+` |
| Flutter | ✅ `0.14.0-dev.1` |
| Flutter (rive\_native) | ✅ `0.0.1-dev.8+` |
| Apple | ✅ `6.8.0+` |
| Android | ✅ `10.1.0+` |
| C++ | ✅ Supported |
| Unity | ✅ `0.3.6-canary.27` |
| Unreal | ✅ `0.3.0a-gh` |

## 矢量羽化 (Vector Feathering)

此功能仅在使用 Rive 渲染器时受支持。请参阅 [选择渲染器](/runtimes/choose-a-renderer)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/webgl2`) | ✅ `2.26.0+` |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | Not supported |
| React (`@rive-app/react-webgl2`) | ✅ `4.18.0+` |
| React (`@rive-app/react-canvas` and `@rive-app/react-webgl`) | Not supported |
| React Native | ✅ `9.0.0+` |
| Flutter | ✅ `0.14.0-dev.1` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `6.6.0+` |
| Android | ✅ `10.0.0+` |
| C++ | ✅ Supported |
| Unity | ✅ `0.3.3-canary.72+` |
| Unreal | ✅ `0.3.0a-gh` |

## N-Slicing

请参阅 [N-Slicing](/editor/layouts/n-slicing.md)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.23.11+` |
| React | ✅ `4.16.7+` |
| React Native | ✅ `8.2.0+` |
| Flutter | ✅ `0.14.0-dev.1` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `6.4.0+` |
| Android | ✅ `9.12.0+` |
| C++ | ✅ Supported |
| Unity | ✅ `0.2.2-canary.22+` |
| Unreal | ✅ `0.2.2+` |

## 布局 (Layouts)

允许 Rive 随着底层视图/画布/组件/纹理大小的变化自动更新画板大小。请参阅 [布局](/editor/layouts/overview.md)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.23.3+` |
| React | ✅ `4.16.0+` |
| React Native | ✅ `8.1.0+` |
| Flutter | ✅ `0.14.0-dev.1` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `6.3.0+` |
| Android | ✅ `9.10.0+` |
| C++ | ✅ Supported |
| Unity | ✅ `0.2.1+` |
| Unreal | ✅ `0.2.1+` |

## 回退字体 (Fallback Fonts)

允许 Rive 在字形不可用时使用回退字体。默认字体会自动选择，或者你可以根据各种选项选择配置所需的回退字体。请参阅 [回退字体](/runtimes/text#fallback-fonts)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | Not yet supported |
| React | Not yet supported |
| React Native | Not yet supported |
| Flutter | Not yet supported |
| Flutter (rive\_native) | Not yet supported |
| Apple | ✅ `6.1.0+` |
| Android | ✅ `9.7.0+` |
| C++ | ✅ Supported |
| Unity | Not supported |
| Unreal | Not Supported |

## 嵌套文本 (Nested Text)

启用在组件实例上设置文本。请参阅 [嵌套文本](/runtimes/text#read-update-nested-text-runs-at-runtime).

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.21.0+` |
| React | ✅ `4.14.0+` |
| React Native | ✅ `5.8.2+` |
| Flutter | ✅ `0.13.7+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `6.1.0+` |
| Android | ✅ `9.8.0+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ `0.1.14+` |

## 嵌套输入 (Nested Inputs)

启用在组件实例上设置输入。请参阅 [嵌套输入](/runtimes/inputs#nested-inputs)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.17.3+` |
| React | ✅ `4.11.3+` |
| React Native | ✅ `7.2.0+` |
| Flutter | ✅ `0.13.7+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `5.13.2+` |
| Android | ✅ `9.4.2+` |
| C++ | ✅ Supported |
| Unity | ✅ `0.1.174+` |
| Unreal | ✅ Supported |

## 随机化 (Randomization)

启用动画之间过渡的随机化并自定义概率。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.15.6+` |
| React | ✅ `4.9.5+` |
| React Native | ✅ `7.0.3+` |
| Flutter | ✅ `0.13.4+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `5.11.5+` |
| Android | ✅ `9.3.5+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 音频 (Audio)

请参阅 [Rive 事件](/runtimes/rive-events) 和 [音频事件](/editor/events/audio-events)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.15.6+` |
| React | ✅ `4.9.5+` |
| React Native | ✅ `7.0.3+` |
| Flutter | ✅ `0.13.4+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `5.11.5+` |
| Android | ✅ `9.3.5+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 嵌套输入和嵌套事件 (Nested Inputs and Nested Events)

请参阅 [组件](/editor/fundamentals/components.md)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.7.0+` |
| React | ✅ `4.5.0+` |
| React Native | ✅ `6.2.0+` |
| Flutter | ✅ `0.12.3+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `5.6.0+` |
| Android | ✅ `8.7.0+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |

## 带外资产 (Out-of-band Assets)

请参阅 [加载资产](/runtimes/loading-assets.md)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.7.0+` |
| React | ✅ `4.5.0+` |
| React Native | ✅ `8.4.0+` |
| Flutter | ✅ `0.12.0+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `5.7.0+` |
| Android | ✅ `8.6.1+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ `0.1.14+` |

## 事件 (Events)

请参阅 [Rive 事件](/runtimes/rive-events)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.4.3+` |
| React | ✅ `4.3.3+` |
| React Native | ✅ `6.1.0+` |
| Flutter | ✅ `0.11.17+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `5.3.1+` |
| Android | ✅ `8.4.0+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 文本 (Text)

请参阅 [文本](/runtimes/text)。

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `2.1.3+` |
| React | ✅ `4.1.3+` |
| React Native | ✅ `6.0.3+` |
| Flutter | ✅ `0.11.14+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `5.1.5+` |
| Android | ✅ `8.1.3+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

请注意，我们会主动更新上述版本，因为运行时上的其他 API 提供了动态设置文本（高级和低级）以及其他相关功能的方法。

## 跟随路径 (Follow Path)

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `1.2.4+` |
| React | ✅ `3.0.55+` |
| React Native | ✅ `5.0.0+` |
| Flutter | ✅ `0.11.6+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `4.0.5+` |
| Android | ✅ `6.0.1+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 状态插值 (Interpolation on States)

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `1.2.1+` |
| React | ✅ `3.0.54+` |
| React Native | ✅ `4.1.2+` |
| Flutter | ✅ `0.11.4+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `4.0.4+` |
| Android | ✅ `5.1.5+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 操纵杆 (Joysticks)

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `1.1.9+` |
| React | ✅ `3.0.49+` |
| React Native | ✅ `4.1.0+` |
| Flutter | ✅ `0.11.1+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `4.0.1+` |
| Android | ✅ `5.0.0+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## Solos

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `1.1.2+` |
| React | ✅ `3.0.42+` |
| React Native | ✅ `4.0.4+` |
| Flutter | ✅ `0.10.4+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `3.1.9+` |
| Android | ✅ `4.4.0+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 状态速度 (Speed on States)

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas`) | ✅ `1.0.102+` |
| Web (`@rive-app/webgl`) | ✅ `1.0.98+` |
| React | ✅ `3.0.38+` |
| React Native | ✅ `4.0.1+` |
| Flutter | ✅ `0.10.3+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `3.1.7+` |
| Android | ✅ `4.2.7+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 图形编辑器 (Graph Editor)

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas`) | ✅ `1.0.97+` |
| Web (`@rive-app/webgl`) | ✅ `1.0.93+` |
| React | ✅ `3.0.34+` |
| React Native | ✅ `4.0.1+` |
| Flutter | ✅ `0.10.0+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `3.1.3+` |
| Android | ✅ `4.2.2+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 监听器 (Listeners)

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas`) | ✅ `1.0.65+` |
| Web (`@rive-app/webgl`) | ✅ `1.0.62+` |
| React | ✅ `3.0.6+` |
| React Native | ✅ `3.0.38+` |
| Flutter | ✅ `0.9.0+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `2.0.21+` |
| Android | ✅ `3.0.8+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

无需额外代码即可支持监听器，也无需在运行时通过事件监听器/检测器代码调用监听器。如果 Rive 文件在设计时将监听器作为状态机的一部分，则运行时库具有隐式事件监听器/检测器代码，可以在适当的时间触发监听器。

## 备注 (Notes)

-   `rive-react` - 从 `v3.0.0` 开始，React 运行时已拆分为两个不同的已发布包：`@rive-app/react-canvas` 和 `@rive-app/react-webgl`，分别包装各自的 `@rive-app/canvas` 和 `@rive-app/webgl` Web 运行时。我们建议使用 `@rive-app/react-canvas`。
-   `@rive-app/webgl` - 这里有一个新标志 `useOffscreenRenderer`，默认情况下为关闭。此标志将允许你解决浏览器对创建的 WebGL 上下文数量的各种限制。在高级 API 中实例化 Rive 时，我们 **强烈建议** 将此选项设置为 `true`。在此处查看更多信息：[https://github.com/rive-app/rive-wasm#other-notes](#nested-inputs-and-nested-events)。
-   `rive-react-native` - 从 `v3.0.0` 开始，它将最低支持 iOS `14.0`。

## 网格变形 (Mesh Deformation)

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas`) | ✅ `1.0.47+` |
| Web (`@rive-app/webgl`) | ✅ `1.0.44+` |
| React | ✅ `3.0.1+` |
| React Native | ✅ `2.1.37+` |
| Flutter | ✅ `0.8.4+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `1.0.18+` |
| Android | ✅ `2.0.24+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 备注 (Notes)

-   `rive-react` - 从 `v3.0.0` 开始，React 运行时已拆分为两个不同的已发布包：`@rive-app/react-canvas` and `@rive-app/react-webgl`，分别包装各自的 `@rive-app/canvas` 和 `@rive-app/webgl` Web 运行时。我们建议使用 `@rive-app/react-canvas`。
-   `@rive-app/webgl` - 这里有一个新标志 `useOffscreenRenderer`，默认情况下为关闭。此标志将允许你解决浏览器对创建的 WebGL 上下文数量的各种限制。在高级 API 中实例化 Rive 时，我们 **强烈建议** 将此选项设置为 `true`。在此处查看更多信息：[https://github.com/rive-app/rive-wasm#other-notes](#nested-inputs-and-nested-events)。
-   关于基于 Web 的运行时和网格：
    -   请记住，随着网格在更大的屏幕区域中增长，它们在某些设备上会变得更加耗费资源。
    -   避免在显示 Rive 动画的 `<canvas>` 元素（或 React 运行时中的 `<RiveComponent />`）上重复进行复杂的变换。
    -   我们建议使用 `@rive-app/webgl` 在 Firefox 上显示网格以获得最佳性能。

## 缓存 Rive 文件 (Caching a Rive File)

| **Runtime** | **Version** |
| --- | --- |
| Web | ✅ Supported |
| React | ✅ Supported |
| React Native | Not yet supported |
| Flutter | ✅ Supported |
| Flutter (rive\_native) | ✅ Supported |
| Apple | ✅ Supported |
| Android | ✅ Supported |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | Not yet supported |

## 光栅资产 (Raster Assets)

| **Runtime** | **Version** |
| --- | --- |
| Web (`@rive-app/canvas` and `@rive-app/webgl`) | ✅ `1.0.2+` |
| React | ✅ `0.0.28+` |
| React Native | ✅ `2.1.36+` |
| Flutter | ✅ `0.8.1+` |
| Flutter (rive\_native) | ✅ `>= 0.0.1-dev.6` |
| Apple | ✅ `1.0.1+` |
| Android | ✅ `2.0.5+` |
| C++ | ✅ Supported |
| Unity | ✅ Supported |
| Unreal | ✅ Supported |

## 备注 (Notes)

-   对于 Web 运行时，我们已弃用 `rive-js` 并转为多包设置，用于针对 `context2d` 和 `webgl` 渲染器运行的 JS 运行时：
-   请注意，新的 Web 运行时包都支持光栅资产，并且高级 JS API 在此次迁移中没有更改。
    -   `@rive-app/canvas` - 使用 `CanvasRenderingContext2D` 渲染器渲染 Rive
    -   `@rive-app/webgl` - 使用 `WebGLRenderingContext` 渲染器渲染 Rive
    -   我们建议使用 `@rive-app/canvas` 依赖项，但 [请查看此处](https://github.com/rive-app/rive-wasm/blob/master/WEB_RUNTIMES.md) 以了解哪种可能更适合你的需求。