---
title: '运行时大小 (Runtime Sizes)'
description: '最后更新：2025 年 10 月'
---

### Web (JS)

| 运行时 (Runtime) | 未压缩 (Uncompressed) | 压缩后 (Compressed) |
| ---------------- | --------------------- | ------------------- |
| canvas-lite      | 550KB                 | 175KB               |
| canvas           | 1300KB                | 550KB               |
| webgl2           | 1650KB                | 650KB               |

### React

参见 `Web (JS)` 了解更多详情。

### React Native

参见 `Android` 和 `Apple` 了解更多详情。

### Apple

| 目标 (Target)           | 下载大小 (Download Size) | 安装大小 (Install Size) |
| ----------------------- | ------------------------ | ----------------------- |
| Framework               |                          | 3.8MB                   |
| iOS App + RiveRuntime   | 1.4MB                    | 3.9MB                   |
| macOS App + RiveRuntime | 1.4MB                    | 4.0MB                   |

[![Emerge badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fwww.emergetools.com%2Fapi%2Fv2%2Fpublic_new_build%3FexampleId%3Drive.app.ios.runtime.RiveRuntime%26platform%3Dios%26badgeOption%3Dversion_and_max_install_size%26buildType%3Drelease&query=%24.badgeMetadata&logo=apple&label=RiveRuntime)](https://www.emergetools.com/app/example/ios/rive.app.ios.runtime.RiveRuntime/release)

### Android

| 目标 (Target) | 下载大小 (Download Size) | 安装大小 (Install Size) |
| ------------- | ------------------------ | ----------------------- |
| ARM-v8a       | 2.39MB                   | 6.58MB                  |
| ARM-v7a       | 2.31MB                   | 5.67MB                  |

#### 组件 (Components)
Rive Android 的二进制大小由多个部分组成：
- 编译为 DEX 文件的 Kotlin 代码
- Rive Android 原生共享库 (`librive-android.so`)
    - 由 Rive Android C++ 绑定、Rive C++ 运行时和 Rive 渲染器组成。
    - 此外还包含[下述第三方静态依赖关系](#第三方依赖项-third-party-dependencies)（目前不包含 Luau）。
- C++ 标准库（共享 .so 文件 - ARM-v8a 的下载大小为 394KB，安装大小为 1.2MB）
- 以下 Android 依赖项：

| 依赖项 (Dependency)                        | 原因 (Reason)             |
| ------------------------------------------ | ------------------------- |
| Compose: runtime, ui, ui-android           | Compose 支持              |
| Lifecycle: runtime-ktx and runtime-compose | Compose 中的生命周期感知  |
| Startup: startup-runtime                   | 自动初始化                |
| ReLinker                                   | Rive 原生库加载           |
| Volley                                     | 网络加载                  |

#### 摊销与 R8 (Amortization and R8)
上述列出的尺寸反映了将 Rive 添加到原本为空的应用程序中时的情况。某些上述依赖项可能已经存在于您的应用程序中，因此添加 Rive 时不会增加体积。例如，如果您的应用已经使用了 Jetpack Compose，则 Compose 依赖项很可能已经包含在您的应用二进制文件中。

C++ 标准库也是如此，它将在所有具有原生代码的依赖项之间共享。

此外，在编译发布版本 (release build) 时，R8 将对您的应用程序进行缩减，删除未使用的代码和资源。这可以进一步减少将 Rive 添加到应用程序中所带来的尺寸影响。请确保您的 Gradle 文件包含 [`isMinifyEnabled = true`](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization)。

#### 未来计划 (Future Work)
目前有一些减少库二进制大小的方案可在未来考虑，包括：
- 使用 Oboe 代替 Miniaudio 来支持音频
    - 目前可以通过使用 `-PnoAudio` Gradle 标志[自行编译 Rive Android](https://github.com/rive-app/rive-android#no-audio-engine) 来移除 Miniaudio。
- 将运行时模块化，以便仅在需要时包含 Compose 支持，并将 Compose API 与旧版 API 分离开来。
- 将 Volley 设置为网络加载的可选依赖项。
- 更改 C++ 编译标志以优先考虑体积而非速度（需要进行性能测试）。

# 第三方依赖项 (Third Party Dependencies)
通用的 Rive C++ 运行时包含多个开源第三方依赖项，这些依赖项贡献了其二进制大小。它们包括：

| 依赖项 (Dependency)                                   | 原因 (Reason)              |
| ----------------------------------------------------- | -------------------------- |
| [HarfBuzz](https://github.com/harfbuzz/harfbuzz)      | 文本渲染                   |
| [Miniaudio](https://github.com/mackron/miniaudio)     | 音频支持                   |
| [SheenBidi](https://github.com/Tehreer/SheenBidi)     | 双向文本支持               |
| [Yoga](https://github.com/facebook/yoga)              | 布局                       |
| [Luau Interpreter](https://github.com/luau-lang/luau) | 脚本支持                   |

::: info
Luau 目前未包含在大多数运行时中。一旦脚本功能普遍可用，预计运行时大小将相应增加。
:::
