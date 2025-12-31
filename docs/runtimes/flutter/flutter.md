---
title: "Flutter"
description: "Rive 的 Flutter 运行时。"
---

import NoteOnFeatureSupport from "/snippets/runtimes/rendering-feature-support.mdx";
import Interaction from "/snippets/runtimes/animation-control-and-interaction.mdx";

<NoteOnFeatureSupport />

## 概述 (Overview)

本指南介绍如何使用 Rive Flutter 运行时在您的 Flutter 应用中轻松集成 Rive 图形。

::: info
Rive Flutter 的最新版本目前发布为开发版 `0.14.0-dev.x`。这意味着该包虽然稳定并可用于生产环境，但我们仍在积极开发新功能和改进。我们建议使用最新的开发版本以利用最新的功能和修复。
:::

::: info
已经在用 Rive Flutter 了？请参阅我们的 [迁移指南](/runtimes/flutter/migration-guide)，了解有关采用最新 `0.14.x` 版本的信息。
:::

## 快速开始 (Quick start)

查看我们的 [示例应用](https://github.com/rive-app/rive-flutter/tree/master/example)。

## 入门 (Getting started)

按照以下步骤将 Rive 集成到您的 Flutter 应用中。

### 添加 Rive 包依赖

查看 Rive 的 [pub.dev](https://pub.dev/packages/rive) 页面获取最新版本。

```yaml
    # pubspec.yaml
    dependencies:
      rive: ^0.14.0-dev.6 # 或最新开发版
```

### 导入 Rive 包

在您要集成 Rive 动画的文件中导入 Rive 运行时库。

```dart
    import 'package:rive/rive.dart';
```

也可以考虑使用命名导入以避免与其他库冲突：

```dart
    import 'package:rive/rive.dart' as rive;
```

### 初始化 Rive

::: info
我们建议在应用启动时或在使用 Rive 之前调用 `await RiveNative.init()`。例如在 `main.dart` 中。虽然在您第一次加载 Rive 文件时这会自动被调用，但如果您想确保在显示第一个图形前 Rive 已加载完成，请手动调用它。
:::

```dart
    import 'package:rive/rive.dart';

    Future<void> main() async {
      WidgetsFlutterBinding.ensureInitialized();
      // 在使用 Rive 之前调用 init。
      await RiveNative.init();
      runApp(const MyApp());
    }
```

### 添加 Rive widget

在 Flutter 中渲染 Rive 图形有多种方式。我们推荐使用 `RiveWidget`，以及更高级的 `RiveWidgetBuilder` 或 `RivePanel`。

- `RiveWidget` 负责渲染图形并公开通用的视图配置。
- `RiveWidgetBuilder` 自动处理文件加载、错误状态以及资源管理。
- `RivePanel` 是一个更高级的继承 widget，它会创建一个共享纹理供多个 `RiveWidget` 绘制到其中。仅在使用 Rive 渲染器 (`Factory.rive`) 时可用。当同时显示许多 Rive 图形时，这可以通过减少纹理数量并规避 Web 端的 WebGL 上下文限制来大幅提高性能。

#### 使用 RiveWidgetBuilder

```dart
        class ExampleRiveBuilder extends StatefulWidget {
          const ExampleRiveBuilder({super.key});

          @override
          State<ExampleRiveBuilder> createState() => _ExampleRiveBuilderState();
        }

        class _ExampleRiveBuilderState extends State<ExampleRiveBuilder> {
          late final fileLoader = FileLoader.fromAsset("assets/vehicles.riv", riveFactory: Factory.rive);

          @override
          void dispose() {
            fileLoader.dispose();
            super.dispose();
          }

          @override
          Widget build(BuildContext context) {
            return RiveWidgetBuilder(
              fileLoader: fileLoader,
              builder: (context, state) => switch (state) {
                RiveLoading() => const Center(child: CircularProgressIndicator()),
                RiveFailed() => ErrorWidget.withDetails(
                    message: state.error.toString(),
                    error: FlutterError(state.error.toString()),
                  ),
                RiveLoaded() => RiveWidget(
                    controller: state.controller,
                    fit: Fit.cover,
                  )
              },
            );
          }
        }
```

#### 直接使用 RiveWidget

```dart
        class ExampleBasic extends StatefulWidget {
          const ExampleBasic({super.key});

          @override
          State<ExampleBasic> createState() => _ExampleBasicState();
        }

        class _ExampleBasicState extends State<ExampleBasic> {
          late File file;
          late RiveWidgetController controller;
          bool isInitialized = false;

          @override
          void initState() {
            super.initState();
            initRive();
          }

          void initRive() async {
            file = (await File.asset("assets/vehicles.riv", riveFactory: Factory.rive))!;
            controller = RiveWidgetController(file);
            setState(() => isInitialized = true);
          }

          @override
          void dispose() {
            file.dispose();
            controller.dispose();
            super.dispose();
          }

          @override
          Widget build(BuildContext context) {
            if (!isInitialized) {
              return const Center(child: CircularProgressIndicator());
            }
            return RiveWidget(
              controller: controller,
              fit: Fit.cover,
            );
          }
        }
```

#### 使用 RivePanel

步骤：

1. 用一个继承的 `RivePanel` 包裹需要绘制到同一纹理的 `RiveWidget`。
2. 在每个需要绘制到共享纹理的 `RiveWidget` 中设置 `useSharedTexture: true`。
3. （可选）在每个 `RiveWidget` 中设置 `drawOrder` 以控制绘制顺序。数值越小先绘制。

```dart
         class ExampleRivePanel extends StatelessWidget {
           const ExampleRivePanel({super.key});

           @override
           Widget build(BuildContext context) {
             return const RivePanel(
               backgroundColor: Colors.red,
               child: ListViewExample(),
             );
           }
        }
        class ListViewExample extends StatefulWidget {
          const ListViewExample({super.key});

          @override
          State<ListViewExample> createState() => _ListViewExampleState();
        }

        class _ListViewExampleState extends State<ListViewExample> {
          late final fileLoader = FileLoader.fromAsset(
            'assets/rating.riv',
            riveFactory: Factory.rive,
          );

          @override
          void dispose() {
            fileLoader.dispose();
            super.dispose();
          }

          @override
          Widget build(BuildContext context) {
            return ListView.builder(
              itemCount: 10,
              itemBuilder: (context, index) {
                return MyRiveWidget(fileLoader: fileLoader);
              },
            );
          }
        }
        class MyRiveWidget extends StatelessWidget {
          const MyRiveWidget({super.key, required this.fileLoader});
          final FileLoader fileLoader;

          @override
          Widget build(BuildContext context) {
            return RiveWidgetBuilder(
              fileLoader: fileLoader,
              builder: (context, state) => switch (state) {
                RiveLoading() => const Center(
                    child: Center(child: CircularProgressIndicator()),
                  ),
                RiveFailed() => ErrorWidget.withDetails(
                    message: state.error.toString(),
                    error: FlutterError(state.error.toString()),
                  ),
                RiveLoaded() => RiveWidget(
                    controller: state.controller,
                    fit: Fit.contain,
                    // 将此项设置为 true 以绘制到最近的 RivePanel
                    useSharedTexture: true,
                  )
              },
            );
          }
        }
```

### 从不同来源加载

**从 Asset Bundle 加载：**

确保已将 Rive 文件添加到您的资源束中并在 `pubspec.yaml` 中引用它们：

```yaml
    # pubspec.yaml
    assets:
        - assets/vehicles.riv
```

```dart
    // 使用 FileLoader (配合 RiveWidgetBuilder)
    final fileLoader = FileLoader.fromAsset("assets/vehicles.riv", riveFactory: Factory.rive);

    // 直接使用 File
    final file = await File.asset("assets/vehicles.riv", riveFactory: Factory.rive);
```

**从 URL 加载：**

```dart
    // 使用 FileLoader (配合 RiveWidgetBuilder)
    final fileLoader = FileLoader.fromUrl("https://cdn.rive.app/animations/vehicles.riv", riveFactory: Factory.rive);

    // 直接使用 File
    final file = await File.url("https://cdn.rive.app/animations/vehicles.riv", riveFactory: Factory.rive);
```

**从已有的 Rive 文件加载：**

```dart
    // 使用 FileLoader (配合 RiveWidgetBuilder)
    final fileLoader = FileLoader.fromFile(existingFile, riveFactory: Factory.rive);
```

## 关键组件 (Key components)

### `RiveWidget`

`RiveWidget` 负责显示 Rive 图形。

**属性：**

- `controller` [**必填**]：管理 Rive 图形的 `RiveWidgetController`。
- `fit`：画板在 widget 内的填充方式（默认：`contain`）。
- `alignment`：画板在 widget 内的对齐方式（默认：`center`）。
- `hitTestBehavior`：如何处理指针事件（默认：`opaque`）。
- `cursor`：悬停在 widget 上时显示的指针样式（默认：`defer`）。
- `layoutScaleFactor`：使用 `Fit.layout` 时的缩放因子（默认：`1.0`）。
- `useSharedTexture`：是否使用共享纹理 ([RivePanel](#rivepanel)) 来绘制画板。默认为 false。设置为 true 时，会绘制到最近的继承 widget [RivePanel](#rivepanel)。
- `drawOrder`：画板的绘制顺序。仅在 `useSharedTexture` 为 true 且绘制到 [RivePanel](#rivepanel) 并使用 `Factory.rive` 时有效。默认为 1。

### `RiveWidgetBuilder`

`RiveWidgetBuilder` 是一个高级 widget，自动处理文件加载、错误状态以及资源管理。

**属性：**

- `fileLoader` [**必填**]：用于加载 Rive 文件的 `FileLoader`。
- `builder` [**必填**]：根据状态构建 widget 的函数。
- `artboardSelector`：选择哪个画板（默认：`ArtboardDefault()`）。
- `stateMachineSelector`：选择哪个状态机（默认：`StateMachineDefault()`）。
- `dataBind`：如何绑定 View Model 数据（可选）。
- `controller`：可选的自定义 controller 构建器。
- `onLoaded`：Rive 状态加载完成时的回调。
- `onFailed`：Rive 状态加载失败时的回调。

### `RivePanel`

`RivePanel` 是一个 widget，它会创建一个共享纹理供多个 `RiveWidget` 绘制。在使用 `Factory.rive` 时非常有用，且在某些条件下能显著提高性能。

**何时使用 RivePanel：**

- 当你的应用显示多个 `RiveWidget` 且它们可以绘制到同一纹理时。
- 当你想通过编程方式组合包含多个 Rive 图形（来自多个 Rive 文件/画板）的场景时。
- 当使用 `Factory.rive`（在使用 `Factory.flutter` 时会报错）并希望提高性能时。
- 当你想减少正在绘制的纹理数量时。
- 当针对 Web 平台时，为了通过 `Factory.rive` 规避 WebGL 上下文限制。

**性能考虑：**

- **收益**：将多个 `RiveWidget` 绘制到同一纹理可以通过减少纹理分配开销来大幅提高性能。
- **内存成本**：分配一个更大的纹理会产生内存成本，但这可能被单个纹理数量的减少所抵消。
- **渲染限制**：在同一表面绘制意味着你无法将 Rive 绘制指令与 Flutter 的绘制指令交错执行。
- **建议进行基准测试**：性能特征因用例而异 —— 适用于某场景的方案可能不适用于另一场景。

**用法：**

```dart
RivePanel(
  backgroundColor: Colors.red, // 可选的背景颜色
  child: YourWidgetWithMultipleRiveWidgets(),
)
```

**重要说明：**

- 仅适用于 `Factory.rive` —— 对 `Factory.flutter` 无效。
- 在您的 `RiveWidget` 中设置 `useSharedTexture: true` 以开启共享纹理渲染。
- 如果需要交错 Rive 内容与 Flutter 内容，请考虑使用独立的 `RivePanel` 或 `Factory.flutter`。
- 对于复杂的场景，请对两种方法进行基准测试以确定最佳性能策略。

### `RiveWidgetController`

`RiveWidgetController` 管理图形。

**创建一个 Controller：**

```dart
// 使用默认画板和状态机
final controller = RiveWidgetController(file);

// 指定画板和状态机
final controller = RiveWidgetController(
  file,
  artboardSelector: ArtboardSelector.byName("MyArtboard"),
  stateMachineSelector: StateMachineSelector.byName("MyStateMachine"),
);
```

**数据绑定：**

```dart
// 使用默认 View Model 实例进行自动绑定
final viewModelInstance = controller.dataBind(DataBind.auto());

// 通过特定实例绑定
final viewModelInstance = controller.dataBind(DataBind.byInstance(myInstance));

// 通过名称绑定
final viewModelInstance = controller.dataBind(DataBind.byName("MyViewModel"));
```

### 文件加载 (File loading)

`FileLoader` 类提供了一种统一的方法来加载来自不同来源的 Rive 文件。

**从 Assets 加载：**

```dart
final fileLoader = FileLoader.fromAsset(
  "assets/vehicles.riv",
  riveFactory: Factory.rive,
);
```

**从 URL 加载：**

```dart
final fileLoader = FileLoader.fromUrl(
  "https://example.com/animation.riv",
  riveFactory: Factory.rive,
);
```

**从已有文件加载：**

```dart
final fileLoader = FileLoader.fromFile(
  existingFile,
  riveFactory: Factory.rive,
);
```

或者您可以直接使用 `File` 类加载文件：

```dart
// 从 asset 加载
final file = await File.asset("assets/vehicles.riv", riveFactory: Factory.rive);
// 从 URL 加载
final file = await File.url("https://example.com/animation.riv", riveFactory: Factory.rive);
// 从路径加载
final file = await File.path("/path/to/animation.riv", riveFactory: Factory.rive);
// 从字节加载
final file = await File.decode(bytes, riveFactory: Factory.rive);
```

## 错误处理 (Error handling)

Rive Flutter 包为不同的错误场景提供了特定的异常类型：

- `RiveFileLoaderException`：文件加载失败时抛出。
- `RiveArtboardException`：画板选择失败时抛出。
- `RiveStateMachineException`：状态机选择失败时抛出。
- `RiveDataBindException`：数据绑定失败时抛出。

## 资源管理 (Resource management)

### 手动资源管理 (`RiveWidget`)

直接使用 `RiveWidget` 时，您负责管理所有资源：

```dart
@override
void dispose() {
  // 按创建顺序的逆序释放资源
  viewModelInstance.dispose();
  controller.dispose();
  file.dispose();
  super.dispose();
}
```

### 自动资源管理 (`RiveWidgetBuilder`)

使用 `RiveWidgetBuilder` 时，该 widget 会自动管理大多数资源。您只需要释放 File Loader：

```dart
@override
void dispose() {
  fileLoader.dispose();
  super.dispose();
}
```

::: info
由于资源是由 `RiveWidgetBuilder` 管理的，在 widget 被释放 (dispose) 后，您将无法访问 `RiveWidgetController`（和其他状态）。如果需要在 widget 释放后访问 controller，请考虑自行创建文件和 controller。

唯一的例外是 `FileLoader`，它由您控制。该 loader 可以在多个 `RiveWidgetBuilder` 实例中重用。底层的 `File` 只会被加载一次。当 `FileLoader` 被释放时，`File` 才会被释放。
:::

## 指定渲染器 (Specifying a renderer)

在创建 Rive `File` 或 `FileLoader` 时，您需要指定要使用的工厂 (factory)：

- `Factory.rive` 使用 Rive 渲染器。
- `Factory.flutter` 使用 Flutter 渲染器（Skia 或 Impeller）。

您可以为应用中的不同图形使用不同的渲染器。

选择渲染器时的一些考虑因素：

- 如果预见会显示许多全部绘制到不同 Rive widget 的 Rive 图形，请考虑使用 [RivePanel](#rivepanel) 与 `Factory.rive` 将多个图形绘制到同一纹理，以减少分配原生渲染目标和纹理的开销。或者使用 `Factory.flutter`。
- 如果显示的是一个复杂的图形，请考虑使用 `Factory.rive` 以利用 Rive 渲染器的优化。
- 矢量羽化仅在 `Factory.rive` 中可用，因此如果需要该功能，请使用 Rive 渲染器。

更多信息请参阅 [选择渲染器](/runtimes/choose-a-renderer/)。

::: warning
目前通过 Flutter 在 Linux 平台上尚未支持 Rive 渲染器。在 Linux 上，它会自动回退到 `Factory.flutter`。
:::

### 关于 Flutter 渲染的说明 (Note on Flutter Rendering)

[Impeller](https://docs.flutter.dev/perf/impeller) 正在取代 [Skia](https://skia.org/) 成为所有平台的默认渲染器。因此，在使用 Rive Flutter 运行时与使用 Impeller 渲染器的平台时，可能会出现渲染和 [性能](https://github.com/flutter/flutter/issues/134432) 差异。如果您在运行时遇到与 Rive 编辑器预期行为相比的视觉或性能错误，我们建议尝试以下步骤进行排查：

1. 尝试使用 `--no-enable-impeller` 标志运行 Flutter 应用以使用 Skia 渲染器。如果在由 Skia 渲染时没有出现视觉差异，则可能是 Impeller 上的渲染错误。但是，在向 Flutter 团队提交错误之前，请先尝试下方的第二点 👇

```bash
flutter run --no-enable-impeller
```

2. 尝试在最新的 `master` 频道上运行 Flutter 应用。视觉错误可能已在最新的 Flutter commit 中修复，但尚未在 `beta` 或 `stable` 频道中发布。
3. 如果您在最新的 master 分支上仅在 Impeller 渲染器中仍看到视觉差异，我们建议向 [Flutter](https://github.com/flutter/flutter) Github 仓库提交详细的 issue，并提供可重现的示例以及其他有助于团队调试可能问题的细节。

## 故障排查 (Troubleshooting)

如果在 Flutter 中使用 Rive 遇到问题，请考虑以下事项：

- 确保在使用任何 Rive 功能之前已经调用了 `await RiveNative.init()`。
- 检查控制台中是否有与 Rive 相关的错误信息。
- 确保您的 Rive 文件已在 `pubspec.yaml` 中正确引用，且存在于指定路径。
- 如果使用 `RiveWidgetBuilder`，请确保在 builder 函数中处理了所有可能的状态（正在加载、加载成功、加载失败）。

### 构建错误 (Build errors)

如果遇到与 Rive 相关的构建错误，请确保：

- 您的 `pubspec.yaml` 中使用的是正确版本的 Rive 包。
- 您已运行 `flutter pub get` 以获取最新的依赖项。

如果问题仍然存在，请参阅 Rive Native 文档中的 [故障排查章节](/runtimes/flutter/rive-native#troubleshooting)。

## 手动构建 Rive 原生库

作为 `rive_native` 插件的一部分，Rive 会自动为您下载原生库。

但是，如果您需要手动构建原生库，请参阅 Rive Native 文档中的 [构建章节](/runtimes/flutter/rive-native#building-rive-native)。

## 后续步骤 (Next steps)

现在您已将 Rive 集成到 Flutter 应用中，可以探索更多高级功能，如：

<Interaction />

## 资源 (Resources)

Rive Flutter：

- [GitHub](https://github.com/rive-app/rive-flutter)
- [pub.dev](https://pub.dev/packages/rive)
- [示例应用](https://github.com/rive-app/rive-flutter/tree/master/example/)

Rive Native：

- [Rive Native 概述](/runtimes/flutter/rive-native)
- [pub.dev](https://pub.dev/packages/rive_native)