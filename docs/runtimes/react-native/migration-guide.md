---
title: '迁移指南 (Migration Guide)'
description: '本文档提供了逐步指南，帮助您从旧版本迁移到 Rive React Native 运行时的最新版本。'
---

## 从 8.x.x 迁移到 9.x.x

此版本将底层的 [Rive Android](https://github.com/rive-app/rive-android) 运行时从 v9.x.x 更新到 v10.x.x，其中包含以下更改：

- [Rive 渲染器 (Rive Renderer)](https://rive.app/blog/rive-renderer-now-open-source-and-available-on-all-platforms) 现在是 Android 上的默认渲染器。对于 iOS，Rive 渲染器此前已经是默认渲染器。
- 移除了针对 Android 的 Skia 渲染器。对于 iOS，Skia 渲染器已在 v8.0.0 中移除。
- 支持[矢量羽化 (Vector Feathering)](https://rive.app/blog/introducing-vector-feathering)。
- 在 Android 上，APK 体积更小且性能有所提升。

### 破坏性变更 (Breaking Changes)

由于移除了 Skia 渲染器，`RiveRendererAndroid` 枚举中也删除了 `Skia` 选项。

此更改仅在您于代码中手动指定渲染器时才相关。有关更多详细信息，请参阅[选择渲染器 (Choosing a Renderer)](/runtimes/choose-a-renderer/overview)。

不需要进行其他 API 更改。