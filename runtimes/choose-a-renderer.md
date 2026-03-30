---
title: "选择渲染器 (Choose a Renderer) - Rive 运行时"
description: "运行时 (Runtimes) 在运行时指定要使用的渲染器。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 运行时, 选择渲染器
---

运行时 (Runtimes)

# 选择渲染器 (Choose a Renderer)

在运行时指定要使用的渲染器。

## [​](#renderer-options-and-default) 渲染器选项与默认设置

不同的 Rive 运行时支持不同的渲染器。选择正确的渲染器可以影响性能、功能支持和文件大小。

| 平台 | 默认渲染器 | 可选渲染器 |
|------|-----------|-----------|
| Web | Canvas 2D | WebGL, WebGL2 (Rive Renderer) |
| iOS/macOS | Core Graphics | Rive Renderer |
| Android | Canvas | Rive Renderer |
| Flutter | Skia/Impeller | Rive Renderer |
| React Native | 平台原生 | Rive Renderer |

## [​](#rive-renderer) Rive 渲染器 (Rive Renderer)

[Rive 渲染器](https://rive.app/renderer) 是 Rive 团队开发的高性能渲染引擎，专为 Rive 图形优化。

### 优势
- **矢量羽化 (Vector Feathering)**：仅在 Rive 渲染器中支持，提供更平滑的边缘效果
- **更高性能**：针对复杂图形进行了优化
- **一致性**：跨平台渲染结果更一致

### 功能支持
某些高级功能仅在使用 Rive 渲染器时可用。详情请参阅 [功能支持页面](/feature-support.md)。

## [​](#specifying-a-renderer) 指定渲染器

### Web (JS)

```javascript
// 使用 Canvas 渲染器 (默认)
import * as rive from "@rive-app/canvas";

// 使用 WebGL2 渲染器 (Rive Renderer)
import * as rive from "@rive-app/webgl2";
```

### Flutter

```dart
// 使用 Flutter 渲染器 (Skia/Impeller)
final file = await File.asset("assets/animation.riv", riveFactory: Factory.flutter);

// 使用 Rive 渲染器
final file = await File.asset("assets/animation.riv", riveFactory: Factory.rive);
```

### iOS/macOS (Swift)

```swift
// 使用 Rive 渲染器
let riveView = RiveViewModel(fileName: "animation", preferredRenderer: .rive)
```

### Android (Kotlin)

```kotlin
// 通过 XML 属性指定
app:riveRenderer="Rive"
```

## [​](#performance) 性能考虑

- **简单图形**：使用平台默认渲染器通常足够
- **复杂图形**：考虑使用 Rive 渲染器获得更好性能
- **Web 平台**：WebGL2 渲染器在显示多个 Rive 图形时性能更好
- **移动平台**：Rive 渲染器可以减少 CPU 占用

[运行时入门 (Overview)](/runtimes/overview.md)[功能支持 (Feature Support)](/feature-support.md)
