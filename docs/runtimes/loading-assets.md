---
title: "资源加载 (Loading Assets)"
description: "在运行时动态加载和替换资源"
---

import { YouTube } from "/snippets/youtube.mdx";
import { Demos } from "/snippets/demos.jsx";

::: info
如果您想要动态替换图像，请使用 [图像数据绑定 (Image Data Binding)](/runtimes/data-binding#images)。
:::

某些 Rive 文件中包含可以嵌入到实际文件二进制文件中的资源，例如字体、图像或音频文件。Rive 运行时可以在加载 Rive 文件时加载这些资源。虽然这使得 Rive 文件和运行时的使用非常简单，但也有机会在运行时加载这些资源，甚至替换它们，而不是将它们嵌入到文件二进制文件中。

这种方法有几个好处：

- 保持 `.riv` 文件极小，避免由于大型资源导致的潜在溢出
- 出于任何原因动态加载资源，例如，如果 `.riv` 在移动设备上运行，则加载分辨率较低的图像，而在桌面设备上运行则加载分辨率较高的图像
- 预加载资源，以便在显示 `.riv` 时立即可用
- 使用已随应用程序捆绑的资源，例如字体文件
- 在多个 `.riv` 之间共享同一资源

## 资源加载方法 (Methods for Loading Assets)

目前有三种不同的方式可以为您的 Rive 文件加载资源。

在 Rive 编辑器中，从 **Assets (资源)** 选项卡中选择所需的资源，然后在检视器 (inspector) 中选择所需的导出选项：

![图像](/images/runtimes/df455228-a712-4cff-a24d-0771b8575e9d.webp)

有关详细信息，请参阅编辑器文档中的 **导出选项 (Export Options)** 章节。

### 嵌入资源 (Embedded Assets)

在 Rive 编辑器中，可以通过选择 "Embedded" (嵌入) 导出类型，将静态资源包含在 `.riv` 文件中。如本页开头所述，加载 Rive 文件时，运行时将隐式尝试加载嵌入在 `.riv` 中的资源，您无需担心手动加载任何资源。

**缺点：** 嵌入资源可能会增大文件大小，尤其是使用 Rive 文本 ([文本概述](/editor/text/text-overview)) 时的字体资源。

::: info
**嵌入 (Embedded) 是默认选项。**
:::

### 通过 Rive 的 CDN 加载 (Loading via Rive's CDN)

在 Rive 编辑器中，您可以将导入的资源标记为 "Hosted" (托管) 导出类型。这意味着当您导出 `.riv` 文件时，资源将不会被嵌入到文件二进制文件中，而是托管在 Rive 的 CDN 上。这意味着在加载文件的运行时，运行时会发现资源被标记为 "Hosted"，并从 Rive CDN 加载资源，因此您无需担心手动加载任何内容，并且文件仍然可以保持极小。

**缺点：** 应用程序将额外调用 Rive CDN 来检索您的资源。

::: info
托管资源 (Hosted assets) 在 Voyager 和 Enterprise 方案中可用。[了解更多关于我们的方案和定价](https://rive.app/pricing)。
:::

### 图像 CDN (Image CDNs)

一些图像 CDN 允许进行即时图像转换，包括缩放、裁剪以及根据浏览器和设备的能力进行自动格式转换。这些 CDN 可以托管您的 Rive 图像资源。请注意，对于这些 CDN，您可能需要指定接受的格式，例如作为 HTTP 标头请求的一部分：

```html
... headers: { Accept: 'image/png,image/webp,image/jpeg,*/*', } ...
```

更多信息请参见您的 CDN 提供商文档。

::: warning
Rive 支持以下图像格式：**jpeg**, **png**, 和 **webp**。
:::

### 引用资源 (Referenced Assets)

在 Rive 编辑器中，您可以将导入的资源标记为 "Referenced" (引用) 导出类型。这意味着当您导出 `.riv` 文件时，资源将不会被嵌入到文件二进制文件中，加载该资源的责任将由您的应用程序在运行时处理。此选项允许您在运行时开始加载 `.riv` 文件时，通过处理程序 API 动态加载资源。如果您需要根据任何应用/游戏逻辑动态加载特定资源，特别是如果您希望保持文件大小较小时，此选项是首选。

导出动画时，所有引用的资源（包括 `.riv`）都将打包为一个 zip 文件。

**缺点：** 在加载 Rive 时，您需要提供一个资产处理程序 API，该 API 应执行自己加载资源的工作。请参见下文的“资源处理”。

## 资源处理 (Handling Assets)

以下是关于如何使用各种运行时在运行期间为 Rive 文件加载资源的文档。

### Web (JS)

#### 示例 (Examples)

- [指定要加载的字体资源](https://codesandbox.io/p/devbox/rive-out-of-band-fonts-js-forked-kml2wd?file=%2Fsrc%2Findex.ts)
- [指定要加载的图像资源](https://codesandbox.io/p/sandbox/rive-out-of-band-images-js-forked-23jx8m?file=%2Fsrc%2Findex.ts)
- [带外资源 (字体) - webgl2 高级版](https://codesandbox.io/p/sandbox/rive-canvas-advanced-out-of-band-assets-fonts-3q4zzy?file=%2Fsrc%2Findex.ts)

#### 使用资源加载器 API (Using the Asset Handler API)

在实例化新的 Rive 实例时，将 `assetLoader` 回调属性添加到参数列表中。运行时在加载时从 `.riv` 文件检测到的每个资源都会调用此回调，并负责在运行时处理资源的加载，或者将其责任传递，让运行时有机会以其他方式加载它。

如果您想要处理加载资源，一个例子是如果文件中的资源被标记为 **Referenced (引用)**，并且您需要为图形渲染提供实际资源，因为 Rive 不会将其嵌入在 `.riv` 中，因此无法加载它。

如果您想要让运行时有机会加载资源，一个例子是如果文件中的资源被标记为 **Hosted (托管)**，并且想要将加载它的责任传递给运行时（它将调用 Rive CDN 来执行此操作）。

```javascript
        assetLoader: (asset: rc.FileAsset, bytes: Uint8Array) => boolean;
```

您提供的回调将接收到 `asset` 和 `bytes`。

- `asset` - 对来自 WASM 的 `FileAsset` 对象的引用。您可以从该对象中获取许多属性，例如名称、资源类型等。您还可以使用它为要设置的动态加载资源设置新的 Rive 特定资源（即图像使用 `RenderImage`，字体使用 `Font`，音频使用 `Audio`）。
- `bytes` - 资产的字节数组（如果可能，例如它是嵌入式资产）

**重要提示**：请注意返回值为 `boolean`。如果您打算自己处理和加载资源，则需要返回 `true`；如果您不想自己处理给定资源的加载，并尝试让运行时尝试加载资源，则返回 `false`。

解码资源时，请务必在不再需要时调用 `unref` 以避免内存泄漏。这允许引擎在不再被任何动画使用时清理它。

**用法示例：**

```javascript
        import {
        Rive,
        Fit,
        Alignment,
        Layout,
        decodeFont,
        ImageAsset, // 可选用于类型检查
        FontAsset, // 可选用于类型检查
        FileAsset, // 可选用于类型检查
        } from "@rive-app/canvas";

        // 通过使用 decodeFont API 提供给由 assetLoader 提供的资源的 setFont API 来加载随机字体资源
        const randomFontAsset = (asset) => {
        const urls = [
            "https://cdn.rive.app/runtime/flutter/IndieFlower-Regular.ttf",
            "https://cdn.rive.app/runtime/flutter/comic-neue.ttf",
            "https://cdn.rive.app/runtime/flutter/inter.ttf",
            "https://cdn.rive.app/runtime/flutter/inter-tight.ttf",
            "https://cdn.rive.app/runtime/flutter/josefin-sans.ttf",
            "https://cdn.rive.app/runtime/flutter/send-flowers.ttf",
        ];
        let randomIndex = Math.floor(Math.random() * urls.length);
        fetch(urls[randomIndex]).then(
            async (res) => {
            // decodeFont 会创建一个 Rive 特定的 Font 对象，用于传递给 assetLoader 提供的 asset 的 `setFont()`
            const font = await decodeFont(new Uint8Array(await res.arrayBuffer()));
            asset.setFont(font);

            // 务必在不再需要字体时调用 unref。这使得引擎在没有任何动画使用时可以其清理掉。
            font.unref();
            }
        );
        };

        const riveInstance = new Rive({
        src: "acqua_text.riv",
        stateMachines: "State Machine 1", // 要播放的状态机名称
        canvas: document.getElementById("rive-canvas"),
        layout: new Layout({
            fit: Fit.Cover,
            alignment: Alignment.Center,
        }),
        autoplay: true,
        // 传入的回调处理程序，指示如何处理在正在加载的 Rive 文件中发现的资源
        assetLoader: (asset, bytes) => {
            console.log("查询资源属性", {
            name: asset.name,
            fileExtension: asset.fileExtension,
            cdnUuid: asset.cdnUuid,
            isFont: asset.isFont,
            isImage: asset.isImage,
            isAudio: asset.isAudio,
            bytes,
            });

            // 如果资产具有 `cdnUuid`，返回 false 让运行时处理从 CDN 加载。
            // 或者如果资产有字节发现（即它是嵌入的），返回 false，因为这里不需要处理。
            if (asset.cdnUuid.length > 0 || bytes.length > 0) {
            return false;
            }

            // 在此，我们在 Rive 文件加载时加载具有随机字体的字体资源并返回 true，
            // 因为此回调处理程序负责加载资源，而不是由运行时负责
            if (asset.isFont) {
                randomFontAsset(asset);
                return true;
            }
        },
        onLoad: () => {
            // 通过使用设备像素比，防止画布模糊
            riveInstance.resizeDrawingSurfaceToCanvas();
        }
        });
```

### React

#### 示例 (Examples)

- [指定要加载的字体资源](https://codesandbox.io/p/sandbox/peaceful-water-2chg77?file=%2Fsrc%2FApp.tsx%3A20%2C38)
- [本地化 - 根据语言切换字体 (TypeScript & i18n)](https://codesandbox.io/p/sandbox/rive-react-i18n-localization-and-font-swapping-kfsqsl?file=%2Fsrc%2FRiveDemo.tsx)
- [指定要加载的图像资源](https://codesandbox.io/p/sandbox/rive-out-of-band-images-react-forked-gstq2w?file=%2Fsrc%2FApp.tsx%3A14%2C30)

#### 使用资源加载器 API (Using the Asset Handler API)

在使用 `useRive` hook 实例化新的 Rive 实例时，将 `assetLoader` 回调属性添加到参数列表中。运行时在加载时从 `.riv` 文件检测到的每个资源都会调用此回调，并负责在运行时处理资源的加载，或者将其责任传递，让运行时有机会以其他方式加载它。

::: info
请注意，您只能在 `useRive` hook 中使用 `assetLoader` 回调，而不能在 React 运行时默认导出的 `<Rive />` 组件中使用。
:::

```javascript
    assetLoader: (asset: rc.FileAsset, bytes: Uint8Array) => boolean;
```

有关更多 API 详细信息，请参阅本表格中的 Web (JS) 选项卡。

### Flutter

#### 示例 (Examples)

- [动态切换字体](https://zapp.run/edit/rive-out-of-band-assets-fonts-zva0062lva10)
- [动态切换图像](https://zapp.run/edit/rive-out-of-band-assets-image-z09q06hl09r0?entry=lib/main.dart&file=pubspec.yaml:2865-2888)

#### 使用资源加载器 API (Using the Asset Handler API)

实例化 `File` 时，将 `assetLoader` 回调添加到参数列表中。运行时在加载时从 `.riv` 文件检测到的每个资源都会调用此回调，并负责在运行时处理资源的加载，或者将其责任传递，让运行时有机会以其他方式加载它。

```dart 字体资源示例
        final fontFile = await File.asset(
            'assets/acqua_text_out_of_band.riv',
            riveFactory: Factory.rive,
            assetLoader: (asset, bytes) {
                // 替换未嵌入到 rive 文件中的字体资源
                if (asset is FontAsset && bytes == null) {
                    final urls = [
                        'https://cdn.rive.app/runtime/flutter/IndieFlower-Regular.ttf',
                        'https://cdn.rive.app/runtime/flutter/comic-neue.ttf',
                        'https://cdn.rive.app/runtime/flutter/inter.ttf',
                        'https://cdn.rive.app/runtime/flutter/inter-tight.ttf',
                        'https://cdn.rive.app/runtime/flutter/josefin-sans.ttf',
                        'https://cdn.rive.app/runtime/flutter/send-flowers.ttf',
                    ];

                    // 从字体列表中随机选择一个 URL
                    http.get(Uri.parse(urls[Random().nextInt(urls.length)])).then((res) {
                        if (mounted) {
                            asset.decode(
                                Uint8List.view(res.bodyBytes.buffer),
                            );
                            setState(() {
                                // 强制重新构建，以防 Rive 图形不再推进
                            });
                        }
                    });
                    return true; // 告知运行时不要自动加载资源
                } else {
                    // 告知运行时在资源存在的情况下继续加载资源
                    return false;
                }
            },
        );
```

您提供的回调将接收到 `asset` 和 `bytes`。

- `asset` - 对 `FileAsset` 对象的引用。您可以从该对象获取许多属性，例如名称、资产类型等。您还将使用它为动态加载的内容设置新的 Rive 特定资源。类型有：`FontAsset`, `ImageAsset`, 和 `AudioAsset`。
- `bytes` - 资源的字节数组（如果作为嵌入式资源可用）

**用法示例**
- 请参阅 Rive Flutter 示例 App，它展示了如何预缓存字体和图像，并在运行时动态切换它们。

::: info
**重要提示**：请注意返回值为 `boolean`。在这种情况下您需要返回：
- `true`：如果您打算自己处理和加载资源
- `false`：如果您不想自己处理该给定资源的加载，并尝试让运行时尝试加载该资源
:::

::: warning
一旦 `File` 被销毁，`FileAsset` 将不再有效，使用它将非常危险。
:::

### Apple

#### 示例 (Examples)

- [(SwiftUI) 切换图像和字体](https://github.com/rive-app/rive-ios/blob/main/Example-iOS/Source/Examples/SwiftUI/SwiftSimpleAssets.swift)
- [(UIKit) 切换并缓存图像和字体](https://github.com/rive-app/rive-ios/blob/main/Example-iOS/Source/Examples/Storyboard/CachedAssets.swift)

#### 使用资源加载器 API (Using the Asset Handler API)

在实例化 `RiveViewModel`（或直接实例化 `RiveFile`）时，将 `customLoader` 回调属性添加到参数列表中。运行时在加载时从 `.riv` 文件检测到的每个资源都会调用此回调，此回调负责在运行时处理资源的加载，或者将其责任传递，让运行时有机会以其他方式加载它。

如果您想要处理加载资源，一个例子是如果文件中的资源被标记为 **Referenced (引用)**，并且您需要为图形渲染提供实际资源，因为 Rive 不会将其嵌入在 `.riv` 中，因此无法加载它。

如果您想要让运行时有机会加载资源，一个例子是如果文件中的资源被标记为 **Hosted (托管)**，并且想要将加载它的责任传递给运行时（它将调用 Rive CDN 来执行此操作）。

```swift
        RiveViewModel(fileName: "simple_assets", loadCdn: false, customLoader: { (asset: RiveFileAsset, data: Data, factory: RiveFactory) -> Bool in
            // 一个简单的检查具有单个资源的 Rive 文件
            if (asset is RiveImageAsset){
                // picture-47982.jpeg 可以与 Rive 编辑器导出的 .riv 文件配套。
                // 随后它将包含在项目的主捆绑资源 (main bundle resources) 中。
                guard let url = (.main as Bundle).url(forResource: "picture-47982", withExtension: "jpeg") else {
                    fatalError("未能在 bundle 中找到 'picture-47982'")
                }
                guard let data = try? Data(contentsOf: url) else {
                    fatalError("未能从 bundle 加载 \(url)")
                }
                (asset as! RiveImageAsset).renderImage(
                    factory.decodeImage(data)
                )
                return true;
            }
            return false;
        }).view()
```

您提供的回调将接收到 `asset`、`data` 和一个 `factory`。

- `asset` - 对 `RiveFileAsset` 对象的引用。您将使用此引用为动态加载的内容设置新的 Rive 特定资源。如果您希望在视图的生命周期内动态交换给定的图像/字体，您可能需要缓存此对象。您可以从该对象中获取许多属性，例如：
  - `name()` - 不带唯一文件标识符后缀的资产名称（即 `picture` 而不是 `picture.webp`）
  - `uniqueFilename()` - 带唯一文件标识符的资产名称（即 `picture-47982.webp`）
  - `fileExtension()` - 文件扩展名（即 `"png"`）
  - `cdnBaseUrl()` - CDN 的基础 URL 名称
  - `cdnUuid()` - Rive CDN 中的资源标识符。用于查看其是否有长度，从而判断资产是否标记为从 Rive CDN 获取（在这种情况下，您可以让 Rive 运行时检索资产，而不是由您的应用逻辑检索）
- `data` - 资源的字节数组。这对于确定资源是否已经嵌入在 Rive 文件中非常有用（即编辑器中未标记为 "referenced"）
- `factory` - 含有将资源的字节转换为 `RiveRenderImage`、`RiveFont` 或 `RiveAudio` 方法的实用程序，`asset` 对象使用这些对象通过 `.renderImage(your-rive-render-image)`、`.font(your-rive-font)` 或 `.audio(your-rive-audio)` 进行渲染。这些资源是通过调用 `factory.decodeImage(data)`、`factory.decodeFont(data)` 或 `factory.decodeAudio(data)` 创建的。

**重要提示**：请注意回调的返回值为 `boolean`。在这种情况下您需要返回：
- `true`：如果您打算自己处理和加载资源，或者
- `false`：如果您不想自己处理给定资源的加载，并尝试让运行时尝试加载该资源。

**用法示例：**

```swift
        import SwiftUI
        import RiveRuntime

        struct SimpleAssetReplacement: View {
            @StateObject private var riveInstance = RiveViewModel(fileName: "simple_assets", autoPlay: false, loadCdn: false, customLoader: { (asset: RiveFileAsset, data: Data, factory: RiveFactory) -> Bool in
                if (asset is RiveImageAsset) {
                    guard let url = (.main as Bundle).url(forResource: "picture-47982", withExtension: "jpeg") else {
                        fatalError("未能在 bundle 中找到 'picture-47982'")
                    }
                    guard let data = try? Data(contentsOf: url) else {
                        fatalError("未能从 bundle 加载 \(url)")
                    }
                    (asset as! RiveImageAsset).renderImage(
                        factory.decodeImage(data)
                    )
                    return true;
                } else if (asset is RiveFontAsset) {
                    guard let url = (.main as Bundle).url(forResource: "Inter-45562", withExtension: "ttf") else {
                        fatalError("未能在 bundle 中找到 'Inter-45562'")
                    }
                    guard let data = try? Data(contentsOf: url) else {
                        fatalError("未能从 bundle 加载 \(url)")
                    }
                    (asset as! RiveFontAsset).font(
                        factory.decodeFont(data)
                    )
                    return true;
                }
                return false;
            })

            var body: some View {
                riveInstance.view()
            }
        }
```

#### 字体 (Fonts)

使用自定义加载器时，引用的字体可以通过以下两种方式之一进行加载：原始数据（来自文件，如上所示）或 `UIFont` / `NSFont`。
使用 `UIFont` / `NSFont` 时，所提供字体的尺寸、粗细和宽度将被忽略。字体将按照文本运行（text run）中的定义使用，而不是被所提供字体的样式覆盖。

```swift
        import SwiftUI
        import RiveRuntime

        struct SimpleFontReplacement: View {
            @StateObject private var riveInstance = RiveViewModel(fileName: "simple_assets", autoPlay: false, loadCdn: false, customLoader: { (asset: RiveFileAsset, data: Data, factory: RiveFactory) -> Bool in
                if (asset is RiveFontAsset) {
                    (asset as! RiveFontAsset).font(
                        factory.decodeFont(UIFont.systemFont(ofSize: 12))
                    )
                    return true;
                }
                return false;
            })

            var body: some View {
                riveInstance.view()
            }
        }
```

#### 图像 (Images)

为引用图像加载资源时，您可能需要将本地资源缩放为 Rive 文件中定义的图像资源大小。使用自定义加载器时，您可以通过 `RiveImageAsset` 的 `size` 属性访问引用图像的大小。

```swift
        import SwiftUI
        import RiveRuntime

        struct SimpleImageSizeReplacement: View {
            @StateObject private var riveInstance = RiveViewModel(fileName: "simple_assets", autoPlay: false, loadCdn: false, customLoader: { (asset: RiveFileAsset, data: Data, factory: RiveFactory) -> Bool in
                guard let imageAsset = asset as? RiveImageAsset else { return false }
                    let requestedSize = imageAsset.size
                    let image = UIImage(...)
                    let resizedImage = resize(image, to: requestedSize)
                    guard let pngData = resizedImage.pngData() else { return false }
                    imageAsset.renderImage(
                        factory.decodeImage(pngData)
                    )
                    return true
                }
                return false;
            }

            var body: some View {
                riveInstance.view()
            }
```

### Android

#### 示例 (Examples)

- https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/AssetLoaderFragment.kt

#### 使用资源加载器 API (Using the Asset Handler API)

在实例化新的 `RiveAnimationView` 时，设置一个名为 `riveAssetLoaderClass` 的新属性，其值是一个指向某类的完整路径字符串，该类将负责在运行期间处理资源的加载，或者将其责任传递，让运行时有机会以其他方式加载它。

**通过 XML：**

```kotlin
        <app.rive.runtime.kotlin.RiveAnimationView
            android:id="@+id/rive_font_load_simple"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            app:riveStateMachine="State Machine 1"
            app:riveAssetLoaderClass="app.rive.runtime.example.HandleRiveFontAsset"
            app:riveResource="@raw/acqua_text" />
```

在相关的 activity 中，使用提供给 `riveAssetLoaderClass` 的名称创建一个新类，该类应实现 Rive 运行时中的 `ContextAssetLoader` 抽象类。在这里您可以重写 `loadContents` 函数，该函数将执行确定要加载哪些资源（如果有）的工作：

- `asset` - 对 `FileAsset` 对象的引用。您可以从该对象中获取许多属性，例如名称、资源类型等。您还可以使用它为要设置的动态加载资源设置新的 Rive 特定资源。
- `bytes` - 资产的字节数组（如果可能，例如它是嵌入式资产）。

```kotlin
        override fun loadContents(asset: FileAsset, inBandBytes: ByteArray): Boolean
```

**重要提示**：请注意返回值为 `boolean`。如果您打算自己处理和加载资源，则需要返回 `true`；如果您不想自己处理给定资源的加载，并尝试让运行时尝试加载该资产，则返回 `false`。

**用法示例：**

配合上面的 XML 片段，下面是相关 activity 可能样子的示例：

```kotlin

        package app.rive.runtime.example

        import android.content.Context
        import android.os.Bundle
        import android.widget.FrameLayout
        import androidx.appcompat.app.AppCompatActivity
        import app.rive.runtime.kotlin.core.ExperimentalAssetLoader
        import app.rive.runtime.kotlin.core.FileAsset

        import app.rive.runtime.kotlin.core.ContextAssetLoader
        import kotlin.random.Random

        class FontLoadActivity : AppCompatActivity() {
            override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
                setContentView(R.layout.rive_font_load_simple)
            }
        }

        open class HandleSimpleRiveAsset(context: Context) : ContextAssetLoader(context) {
            private val fontPool = arrayOf(
                R.raw.montserrat,
                R.raw.opensans,
            )
            /**
            * 重写此方法以自定义资产加载过程。
            */
            override fun loadContents(asset: FileAsset, inBandBytes: ByteArray): Boolean {
                val randFontIndex = Random.nextInt(fontPool.size)
                val fontToLoad = fontPool[randFontIndex]
                context.resources.openRawResource(fontToLoad).use {
                    // 将字体字节加载到资产中
                    return asset.decode(it.readBytes())
                }
            }
        }
```

### React Native

### 新版运行时 (推荐)

#### 使用资源加载器 API (Using the Asset Handler API)

要加载带外资源，在加载 Rive 文件时，请提供一个键值对对象，将预期的资产映射到它们的源。

**键 (key)** 是名称 + 唯一标识符的组合，是从 Rive 编辑器导出的。

```javascript
                const { riveFile, isLoading, error } = useRiveFile(
                    require('path/to/file.riv'),
                    {
                        referencedAssets: {
                            'Inter-594377': {
                                source: require('../../assets/fonts/Inter-594377.ttf'),
                            },
                            'referenced-image-2929282': {
                                source: { uri: 'https://picsum.photos/id/372/500/500' },
                            },
                            'referenced_audio-2929340': {
                                source: require('../../assets/audio/referenced_audio-2929340.wav'),
                            },
                        },
                    }
                );
```

::: info
您可以选择不包含唯一标识符。例如，您可以使用 `Inter` 而不是 `Inter-594377`。但是，建议使用完整标识符以避免潜在的命名冲突。仅使用资产名称可以让您无需知道唯一标识符，并让您对命名有更多的控制。
:::

#### 使用 Suspense (Using Suspense)

您可以自己管理资产解码，并在多个 Rive 视图中共享该资源。

::: info
目前我们仅支持图像，但其他资产类型的工作正在进行中。
:::

```ts
                function getImagePromise(url: string): Promise<RiveImage> {
                    return RiveImages.loadFromURLAsync(url);
                }
```

```ts
                <ErrorBoundary key={errorBoundaryKey} fallback={renderErrorFallback}>
                    <React.Suspense
                        fallback={
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" />
                            <Text style={styles.loadingText}>正在加载图像 (Loading image)...</Text>
                        </View>
                        }
                    >
                        <RiveContent imageUrl={uri} />
                    </React.Suspense>
                </ErrorBoundary>
```

```ts
                function RiveContent({ imageUrl }: { imageUrl: string }) {
                    const imagePromise = React.useMemo(
                        () => getImagePromise(imageUrl),
                        [imageUrl]
                    );
                    const riveImage = React.use(imagePromise);

                    const { riveFile, isLoading, error } = useRiveFile(
                        require('../../assets/rive/out_of_band.riv'),
                        {
                            referencedAssets: {
                                'Inter-594377': {
                                source: require('../../assets/fonts/Inter-594377.ttf'),
                                },
                                'referenced-image-2929282': riveImage,
                                'referenced_audio-2929340': {
                                source: require('../../assets/audio/referenced_audio-2929340.wav'),
                                },
                            },
                        }
                    );

                    if (isLoading) {
                        return <ActivityIndicator />;
                    } else if (error != null) {
                        return (
                            <View style={styles.safeAreaViewContainer}>
                                <Text>加载 Rive 文件出错: {error}</Text>
                            </View>
                        );
                    }

                    return (
                        <RiveView
                            file={riveFile}
                            fit={Fit.Contain}
                            style={styles.rive}
                            stateMachineName="State Machine 1"
                            artboardName="Artboard"
                        />
                    );
                }
```

有关更多信息，请参阅 [此示例](https://github.com/rive-app/rive-nitro-react-native/blob/main/example/src/pages/OutOfBandAssetsWithSuspense.tsx)。

### 旧版运行时

#### 示例 (Examples)
- [带外资源示例 (Out of bands example)](https://github.com/rive-app/rive-react-native/blob/main/example/app/(examples)/OutOfBandAssets.tsx)

#### 使用引用资产 API (Using the Referenced Assets API)

::: info
与其他运行时相比，React Native 处理带外资产的 API 有所不同。
:::

`referencedAssets` 属性接受一个键值对对象。`key` 是资产的唯一标识符（由编辑器导出），它结合了资产名称及其唯一标识符。`value` 指定如何加载资源：
- 直截从 JavaScript 加载的源 (source)。
- 指向从 Web 下载的资源的 URI。
- 原生平台（iOS 和 Android）上捆绑的资源，分别通过 Xcode 和 Android Studio 包含。

::: info
您可以选择不包含唯一标识符。例如，您可以使用 `Inter` 而不是 `Inter-594377`。但是，建议使用完整标识符以避免潜在的命名冲突。仅使用资产名称可以让您无需知道唯一标识符，并让您对命名有更多的控制。
:::

下面的代码示例说明了加载资产的三种不同方式：

```javascript
                <Rive
                    autoplay={true}
                    stateMachineName="State Machine 1"
                    referencedAssets={{
                        'Inter-594377': {
                            source: require('./assets/Inter-594377.ttf'), // 直接从 JavaScript 加载
                        },
                        'referenced-image-2929282': {
                            source: {
                                uri: 'https://picsum.photos/id/270/500/500' // 从 URI 加载
                            },
                        },
                        'referenced_audio-2929340': {
                            source: {
                                fileName: 'referenced_audio-2929340.wav', // 从捆绑资源加载
                                path: 'audio', // 仅 Android 资源需要
                            },
                        },
                    }}
                    artboardName="Artboard"
                    resourceName={'out_of_band'}
                    onError={(riveError: RNRiveError) => {
                        console.log(riveError);
                    }}
                />
```

## 其他资源 (Additional Resources)

<YouTube videoId="BrWBmZwouQQ" />
