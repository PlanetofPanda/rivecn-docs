---
title: '选择渲染器概览 (Choose a Renderer Overview)'
description: '指定在运行时使用的渲染器。'
---

Rive 根据平台和运行时的不同使用各种不同的渲染器。我们正努力通过 [Rive 渲染器 (Rive Renderer)](https://rive.app/renderer) 统一所有平台/运行时使用的默认渲染器。

::: warning
某些功能，如 [矢量羽化 (Vector Feathering)](https://rive.app/blog/introducing-vector-feathering)，仅通过 Rive 渲染器支持。有关更多信息，请参阅我们的 [功能支持 (Feature Support)](/feature-support) 页面。
:::

## 渲染器选项与默认值 (Renderer Options and Default)

您可以选择使用特定的渲染器，请参阅 [指定渲染器](#指定渲染器-specifying-a-renderer)。

下表概述了 Rive 运行时可用的默认渲染器：

| 运行时 | 默认渲染器 | 选项 |
| --- | --- | --- |
| Android | Rive | Rive / Canvas / Skia (自 v10.0.0 起移除) |
| Apple | Rive | Rive / Core Graphics / Skia (v6.0.0 中弃用) |
| React Native | Rive | 见 Apple 和 Android |
| Web (Canvas) | Canvas2D | Canvas2D |
| Web (WebGL) | Skia | Skia |
| Web (WebGL2) | Rive | Rive |
| Flutter | 无默认值 | Rive / Flutter (Skia / Impeller) |

## Rive 渲染器 (Rive Renderer)

[Rive 渲染器](https://rive.app/renderer) 是一款全新的渲染引擎，旨在提供所有平台上更好的性能和视觉保真度。它利用现代图形 API 和技术为 Rive 图形提供高质量渲染。

它还允许 Rive 创新推出新功能，例如 [矢量羽化](https://rive.app/blog/introducing-vector-feathering)，这些功能仅通过 Rive 渲染器支持。有关更多信息，请参阅我们的 [功能支持](/feature-support) 页面。

### Apple

#### 起始版本 (Starting Version)

从 **v6.0.0** 开始，Rive 渲染器成为 Apple 运行时的默认渲染器，但我们建议安装依赖项的最新版本以获取最新的更新。有关最新版本的详细信息，请参阅 [CHANGELOG](https://github.com/rive-app/rive-ios/blob/main/CHANGELOG.md)。

#### 性能 (Performance)

与之前的默认渲染器相比，Rive 渲染器在动画播放期间的内存占用方面在 Apple 运行时上表现最出色。

使用 UIKit 时，通过在单个 `RiveView` 上多次绘制，而不是创建多个 `RiveView` 实例或多个 `RiveViewModel`，您将能看到最明显的性能差异。

**示例**：查看此 [压力测试示例](https://github.com/rive-app/rive-ios/blob/main/Example-iOS/Source/Examples/Storyboard/StressTest.swift)，了解如何覆盖 `RiveView` 上的绘图函数以在同一视图上绘制多次，并且每个图形都有偏移。您可以使用上述配置切换渲染器并亲自测试性能！

### Android

#### 起始版本 (Starting Version)

从 **v10.0.0** 开始，Rive 渲染器成为 Android 运行时的默认渲染器。但是，我们建议安装依赖项的最新版本以获取最新的更新。有关最新版本的详细信息，请参阅 [CHANGELOG](https://github.com/rive-app/rive-android/blob/master/CHANGELOG.md)。

### Web(JS)

#### 起始版本 (Starting Version)

从 **v2.11.1** 开始，Web (JS)/WASM 运行时引入了 Rive 渲染器，并包含以下新包：

- `@rive-app/webgl2`
- `@rive-app/webgl2-advanced`

但是，我们建议安装依赖项的最新版本以获取最新的更新。

这些包不捆绑任何笨重的渲染依赖项（如 Skia），这使得包的大小比以前的 `@rive-app/webgl` 包小得多。

#### 启用 Draft 扩展 (Enabling the Draft Extension)

目前，Web 上的 Rive 渲染器依赖于一个 WebGL2 扩展，该扩展目前正在所有主流浏览器中实现。要立即试用 Rive 渲染器，您可以在 Google Chrome 上进行。只需在 Chrome 上 [启用 WebGL draft 扩展](https://www.wikihow.tech/Enable-WebGL-Draft-Extensions-in-Google-Chrome) 并重启浏览器即可。

启用扩展后，您必须使用 `@rive-app/webgl2` 包（随 `v2.11.1` 引入）以默认使用 Rive 渲染器。如果您没有启用 draft 扩展或使用的是其他浏览器，该包将回退到一个仍使用 WebGL2 上下文来支持 `<canvas>` 元素的 MSAA 方案。

API 的用法与使用任何其他 Web (JS)/WASM 运行时相比没有变化。

### React Native

#### 起始版本 (Starting Version)

在 `v7.1.0` 中引入了轻松配置默认渲染器的选项。对于 React Native，需要为 **iOS** 和 **Android** 设置默认渲染器。

选项：

- **Apple**: `Rive` (默认), 和 `CoreGraphics`
- **Android**: `Rive` (默认), `Canvas`

有关渲染器和回退的更多信息，请参阅 **Apple** 和 **Android** 部分。

### Flutter

::: warning
Flutter 上的 Linux 平台尚未支持 Rive 渲染器。
:::

#### 起始版本 (Starting Version)

Flutter 运行时从 `0.14.0` 版本开始添加了 Rive 渲染器。但是，我们建议安装依赖项的最新版本以获取最新的更新。它通过 `rive_native` 包公开，该包是主 `rive` 包的依赖项。在 [此处](/runtimes/flutter/rive-native) 详细了解 Rive Native。

## 指定渲染器 (Specifying a Renderer)

请参阅下文，了解启用特定渲染器的运行时说明。

### Apple

#### 入门 (Getting Started)

选项：`Rive (默认) / Core Graphics / Skia (v6.0.0 中弃用)`

以下是有关在 UIKit 和 SwiftUI 中配置渲染器的一些说明。

#### UIKit

在应用程序启动期间设置全局渲染器类型：

```swift
        @UIApplicationMain
        class AppDelegate: UIResponder, UIApplicationDelegate {

            func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
                // 应用程序启动后的自定义覆盖点。
                RenderContextManager.shared().defaultRenderer = RendererType.riveRenderer
                return true
            }

            ...
        }
```

#### SwiftUI

新的 SwiftUI 应用程序使用 `App` 协议启动，但您仍然可以添加 `UIApplicationDelegate` 功能。

**iOS**

创建一个名为 `AppDelegate` 的新文件和类，如下所示，包括一行将 `defaultRenderer` 设置为 `RendererType.riveRenderer` 的代码：

```swift
        import UIKit
        import Foundation
        import RiveRuntime

        class AppDelegate: NSObject, UIApplicationDelegate {
            func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
                RenderContextManager.shared().defaultRenderer = RendererType.riveRenderer
                return true
            }
        }
```

接下来，在应用程序的入口点，使用 `UIApplicationDelegateAdaptor` 为应用程序委托设置上面创建的 `AppDelegate`。

```swift
        @main
        struct MyRiveRendererApp: App {
            @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
            
            var body: some Scene {
                WindowGroup {
                    ContentView()
                }
            }
        }
```

**macOS**

创建一个名为 `AppDelegate` 的新文件和类，如下所示，包括一行将 `defaultRenderer` 设置为 `RendererType.riveRenderer` 的代码：

```swift
        import Foundation
        import RiveRuntime

        class AppDelegate: NSObject, NSApplicationDelegate {
            func application(_ application: NSApplication, applicationDidFinishLaunching notification: Notification) -> Bool {
                RenderContextManager.shared().defaultRenderer = RendererType.riveRenderer
                return true
            }
        }
```

接下来，在应用程序的入口点，使用 `NSApplicationDelegateAdaptor` 为应用程序委托设置上面创建的 `AppDelegate`。

```swift
        @main
        struct MyRiveRendererApp: App {
            @NSApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
            
            var body: some Scene {
                WindowGroup {
                    ContentView()
                }
            }
        }
```

### Android

#### 入门 (Getting Started)

选项：`Rive (默认) / Canvas / Skia (自 v10.0.0 起移除)`

在 XML 中指定渲染目标：

```kotlin
        <app.rive.runtime.kotlin.RiveAnimationView
        app:riveRenderer="Rive"
        … />
```

或者，在初始化 Rive 时：

```kotlin
        Rive.init(applicationContext, defaultRenderer = RendererType.Rive)
```

### Web(JS)

`@rive-app/webgl2` 和 `@rive-app/webgl2-advanced` 包仅使用 Rive 渲染器，因此默认情况下不需要任何配置。

要开始使用，请参阅上面关于启用 draft 扩展的部分。

### React Native

对于 React Native，需要通过 `RiveRenderer.defaultRenderer` 分别为 **iOS** 和 **Android** 设置默认渲染器，并传入 `RiveRendererIOS` 和 `RiveRendererAndroid` 的枚举。

- iOS 选项：`Rive (默认) / CoreGraphics`
- Android 选项：`Rive (默认) / Canvas`

```javascript
        export default function Main() {
        useEffect(() => {
            RiveRenderer.defaultRenderer(
            RiveRendererIOS.Rive,
            RiveRendererAndroid.Rive
            );
        }, []);

        return <App />;
        }
```

### Flutter

在创建 Rive `File` 或 `FileLoader` 时，您需要指定要使用的工厂 (factory)：

- `Factory.rive` 使用 Rive 渲染器
- `Factory.flutter` 使用 Flutter 渲染器（Skia 或 Impeller）

```dart
        // Rive 渲染器
        File.asset("assets/vehicles.riv", riveFactory: Factory.rive)
        // Flutter 渲染器
        File.asset("assets/vehicles.riv", riveFactory: Factory.flutter)
```

您可以为应用中的不同图形使用不同的渲染器。

选择渲染器时的一些考虑因素：

- 如果您计划显示许多全部绘制到不同 Rive widget 的 Rive 图形，请考虑使用 [RivePanel](/runtimes/flutter/flutter#rivepanel) 与 `Factory.rive`，将多个图形绘制到同一纹理上，以减少分配原生渲染目标和纹理的开销。或者使用 `Factory.flutter`。
- 如果您在显示一个复杂的图形，请考虑使用 `Factory.rive` 以利用 Rive 渲染器的优化。
- 矢量羽化仅在 `Factory.rive` 中可用，因此如果您需要该功能，请使用 Rive 渲染器。

#### 关于 Flutter 渲染的说明 (Note on Flutter Rendering)

[Impeller](https://docs.flutter.dev/perf/impeller) 正在取代 [Skia](https://skia.org/) 成为所有平台的默认渲染器。因此，在使用 Rive Flutter 运行时与使用 Impeller 渲染器的平台时，可能会出现渲染和 [性能](https://github.com/flutter/flutter/issues/134432) 差异。如果您在运行时遇到与 Rive 编辑器预期行为相比的视觉或性能错误，我们建议尝试以下步骤进行排查：

1. 尝试使用 `--no-enable-impeller` 标志运行 Flutter 应用以使用 Skia 渲染器。如果在由 Skia 渲染时没有出现视觉差异，则可能是 Impeller 上的渲染错误。但是，在向 Flutter 团队提交错误之前，请先尝试下方的第二点 👇

```bash
        flutter run --no-enable-impeller
```

2. 尝试在最新的 `master` 频道上运行 Flutter 应用。视觉错误可能已在最新的 Flutter commit 中修复，但尚未在 `beta` 或 `stable` 频道中发布。
3. 如果您在最新的 master 分支上仅在 Impeller 渲染器中仍看到视觉差异，我们建议向 [Flutter](https://github.com/flutter/flutter) Github 仓库提交详细的 issue，并提供可重现的示例以及其他有助于团队调试可能问题的细详情。
