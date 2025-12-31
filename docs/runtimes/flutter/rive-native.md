---
title: "Flutter 版 Rive Native"
description: "一个集成了 Rive 渲染器和核心 Rive C++ 运行时的 Flutter 插件。由 Rive Flutter 运行时使用。"
---

import NoteOnFeatureSupport from "/snippets/runtimes/rendering-feature-support.mdx";

## Rive Native 与 Rive (Rive Native vs Rive)

[Rive Native](https://pub.dev/packages/rive_native) (`rive_native`) 是一个集成了 Rive 渲染器和核心 Rive C++ 运行时的 Flutter 插件。

[Rive Flutter 运行时](https://pub.dev/packages/rive) (`rive`) 则构建在 `rive_native` 之上。我们建议将 `rive` 包作为依赖项引入，因为它会自动包含 `rive_native`，同时为在 Flutter 中使用 Rive 资源提供更友好的 API。

::: info
Rive Native 取代了 Rive Flutter 之前用于原生操作的 [Rive Common](https://pub.dev/packages/rive_common) (`rive_common`) 插件。
:::

### 理解 Rive Native (Understanding Rive Native)

Rive Native 充当了 Flutter 与 Rive C++ 运行时之间的桥梁，让您能在 Flutter 应用中使用 Rive 图形。

- **C++ 运行时集成**：
  `rive_native` 通过 FFI 构建在 Rive 的 [C++ 运行时](https://github.com/rive-app/rive-runtime) 之上。这确保了跨平台以及与 Rive 编辑器的一致体验，同时释放了 C++ 运行时独有的性能改进和新功能，例如：

  - [数据绑定 (Data Binding)](/editor/data-binding/)
  - [响应式布局 (Responsive Layouts)](/editor/layouts/)
  - [滚动 (Scrolling)](/editor/layouts/scrolling)
  - [N-切片 (N-Slicing)](/editor/layouts/n-slicing)
  - [矢量羽化 (Vector Feathering)](https://rive.app/blog/introducing-vector-feathering)

- **Rive 渲染器支持**：
  `rive_native` 将 [Rive 渲染器 (Rive Renderer)](https://rive.app/renderer) 引进到 Flutter 中。虽然您仍可以使用基于 Flutter 的渲染器（Dart/Impeller），但对于性能关键型的用例，推荐使用 Rive 渲染器。更多信息请参阅 [选择渲染器概览](/runtimes/choose-a-renderer/overview)。

  某些功能（如矢量羽化）仅在 Rive 渲染器下受支持。详情请参阅 [功能支持页面](/feature-support)。

---

## 入门 (Getting Started)

`rive_native` 尚未在 GitHub 上公开，但很快会发布。目前，您可以通过运行以下命令来获取源代码和示例：

```bash
dart pub unpack rive_native # 解压包源代码和示例应用
cd rive_native/example      # 进入示例文件夹
flutter create .            # 创建平台文件夹
flutter pub get             # 获取依赖项
flutter run                 # 运行示例应用
```

有关具体实现示例，请参阅 `rive_native/example/rive_player.dart` 文件。

---

## 平台支持 (Platform Support)

| 平台 | Flutter 渲染器 | Rive 渲染器 |
| -------- | ---------------- | ------------- |
| iOS      | ✅               | ✅            |
| Android  | ✅               | ✅            |
| macOS    | ✅               | ✅            |
| Windows  | ✅               | ✅            |
| Linux    | ❌               | ❌            |
| Web      | ✅               | ✅            |

---

## 功能支持 (Feature Support)

详情请参阅 [功能支持页面](/feature-support)。

---

## 故障排查 (Troubleshooting)

所需的原生库应在构建步骤（`flutter run` 或 `flutter build`）中自动下载。如果遇到问题，请尝试以下操作：

1. 运行 `flutter clean`
2. 运行 `flutter pub get`
3. 运行 `flutter run`

或者，您可以手动运行 `rive_native` 设置脚本。在 Flutter 应用的根目录下执行：

```bash
dart run rive_native:setup --verbose --clean --platform macos
```

这将清理 `rive_native` 设置，并下载通过 `--platform` 标志指定的平台特定库。详情请参考上方的 **平台支持** 部分。

### Android

如果您遇到了自动设置问题（例如 issue [555](https://github.com/rive-app/rive-flutter/issues/555) 和 [515](https://github.com/rive-app/rive-flutter/issues/515)），您可以通过在应用的 `gradle.properties` 中设置 `rive.native.skipSetup=true` 来跳过设置。

启用该设置后，您必须手动运行 `dart run rive_native:setup --verbose --clean --platform android` 来下载所需的库。

---

## 构建 `rive_native`

默认情况下，会下载并使用预构建的原生库。如果您更愿意自己构建库，请在设置脚本中使用 `--build` 标志：

```bash
flutter clean # 重要
dart run rive_native:setup --verbose --clean --build --platform macos
```

> **注意**：构建这些库需要在您的机器上安装特定工具。后续将提供补充文档。

---

## 测试 (Testing)

共享库已包含在下载/构建过程中。如果您在测试中使用 `rive_native` 时遇到问题，请联系我们寻求帮助。
