Flutter

# Flutter

Rive 的 Flutter 运行时。

请注意，某些 Rive 功能可能尚未在特定运行时中受支持，或者可能需要使用 Rive 渲染器。有关更多详细信息，请参阅 [功能支持](/feature-support.md) 和 [选择渲染器](/runtimes/choose-a-renderer) 页面。

## [​](#overview) 概览

本指南记录了如何使用 Rive Flutter 运行时在你的 Flutter 应用中轻松集成 Rive 图形。

Rive Flutter 的最新版本目前作为开发版本 `0.14.0-dev.x` 发布。这意味着虽然该包是稳定的并可用于生产，但我们仍在积极开发新功能和改进。我们建议使用最新的开发版本以利用最新的功能和修复。

已经在用 Rive Flutter 了？请参阅我们的 [迁移指南](/runtimes/flutter/migration-guide) 以获取有关采用最新 `0.14.x` 版本的信息。

## [​](#quick-start) 快速开始

查看我们的 [示例应用](https://github.com/rive-app/rive-flutter/tree/master/example)。

## [​](#getting-started) 快速开始

按照以下步骤将 Rive 集成到你的 Flutter 应用中。

1.  **添加 Rive 包依赖**

    查看 Rive 的 [pub.dev](https://pub.dev/packages/rive) 页面以获取最新版本。

    ```yaml
    # pubspec.yaml
    dependencies:
      rive: ^0.14.0-dev.6 # or latest dev version
    ```

2.  **导入 Rive 包**

    在你想要集成 Rive 动画的文件中导入 Rive 运行时库。

    ```dart
    import 'package:rive/rive.dart';
    ```

    考虑使用命名导入以避免与其他库冲突：

    ```dart
    import 'package:rive/rive.dart' as rive;
    ```

3.  **初始化 Rive**

    鼓励你在应用启动时或使用 Rive 之前调用 `await RiveNative.init()`。例如，在 `main.dart` 中。当你第一次加载 Rive 文件时，这会自动调用，但如果你想确保在显示第一个图形之前加载 Rive，请手动调用它。

    ```dart
    import 'package:rive/rive.dart';

    Future<void> main() async {
      WidgetsFlutterBinding.ensureInitialized();
      // Call init before using Rive.
      await RiveNative.init();
      runApp(const MyApp());
    }
    ```

4.  **添加 Rive Widget**

    在 Flutter 中有几种渲染 Rive 图形的方法。我们建议使用 `RiveWidget`，并可选择使用 `RiveWidgetBuilder` 或 `RivePanel`。

    -   `RiveWidget` 负责渲染图形并暴露常用的视图配置。
    -   `RiveWidgetBuilder` 自动处理文件加载、错误状态和资源管理。
    -   `RivePanel` 是一个更高级别的 Inherited Widget，它创建一个共享纹理供多个 `RiveWidget` 绘制。仅在使用 Rive 渲染器 (`Factory.rive`) 时可用。当通过减少纹理数量并避免 Web 上的 WebGL 上下文限制来一次显示许多 Rive 图形时，这可以大大提高性能。

    -   **使用 RiveWidgetBuilder**
    -   **直接使用 RiveWidget**
    -   **使用 RivePanel**

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

    **步骤：**

    1.  用单个继承的 `RivePanel` 包裹应该绘制到同一纹理的 `RiveWidget`。
    2.  在每个应该绘制到共享纹理的 `RiveWidget` 中设置 `useSharedTexture: true`。
    3.  (可选) 在每个 `RiveWidget` 中设置 `drawOrder` 以控制它们的绘制顺序。较小的数字先绘制。

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
                // Set this to true to draw to the nearest RivePanel
                // 将此设置为 true 以绘制到最近的 RivePanel
                useSharedTexture: true,
              )
          },
        );
      }
    }
    ```

5.  **从不同来源加载**

    **从 Asset Bundle:**
    确保将 Rive 文件添加到你的 asset bundle 并在 `pubspec.yaml` 中引用它们：

    ```yaml
    # pubspec.yaml
    assets:
        - assets/vehicles.riv
    ```

    ```dart
    // Using FileLoader (with RiveWidgetBuilder)
    final fileLoader = FileLoader.fromAsset("assets/vehicles.riv", riveFactory: Factory.rive);

    // Using File directly
    final file = await File.asset("assets/vehicles.riv", riveFactory: Factory.rive);
    ```

    **从 URL:**

    ```dart
    // Using FileLoader (with RiveWidgetBuilder)
    final fileLoader = FileLoader.fromUrl("https://cdn.rive.app/animations/vehicles.riv", riveFactory: Factory.rive);

    // Using File directly
    final file = await File.url("https://cdn.rive.app/animations/vehicles.riv", riveFactory: Factory.rive);
    ```

    **从 Rive 文件:**

    ```dart
    // Using FileLoader (with RiveWidgetBuilder)
    final fileLoader = FileLoader.fromFile(existingFile, riveFactory: Factory.rive);
    ```

## [​](#key-components) 关键组件

### [​](#rivewidget) `RiveWidget`

`RiveWidget` 负责显示 Rive 图形。
**属性:**

-   `controller` [**必需**]: 管理 Rive 图形的 `RiveWidgetController`
-   `fit`: 画板应如何适应组件（默认：`contain`）
-   `alignment`: 画板应如何在组件内对齐（默认：`center`）
-   `hitTestBehavior`: 指针事件应如何处理（默认：`opaque`）
-   `cursor`: 悬停在组件上时显示的光标（默认：`defer`）
-   `layoutScaleFactor`: 使用 `Fit.layout` 时的缩放因子（默认：`1.0`）
-   `useSharedTexture`: 是否使用共享纹理 ([RivePanel](#rivepanel)) 来绘制画板。默认为 false。当设置为 true 时，它将绘制到 [RivePanel](#rivepanel) 类型的最近继承组件。
-   `drawOrder`: 画板的绘制顺序。仅当 `useSharedTexture` 为 true 且绘制到 [RivePanel](#rivepanel) 并使用 `Factory.rive` 时使用。默认为 1。

### [​](#rivewidgetbuilder) `RiveWidgetBuilder`

`RiveWidgetBuilder` 是一个更高级别的组件，它自动处理文件加载、错误状态和资源管理。
**属性:**

-   `fileLoader` [**必需**]: 用于加载 Rive 文件的 `FileLoader`
-   `builder` [**必需**]: 根据状态构建组件的函数
-   `artboardSelector`: 使用哪个画板（默认：`ArtboardDefault()`）
-   `stateMachineSelector`: 使用哪个状态机（默认：`StateMachineDefault()`）
-   `dataBind`: 如何绑定视图模型数据（可选）
-   `controller`: 可选的自定义控制器构建器
-   `onLoaded`: Rive 状态加载时的回调
-   `onFailed`: Rive 状态加载失败时的回调

### [​](#rivepanel) `RivePanel`

`RivePanel` 是一个用于创建共享纹理以供多个 `RiveWidget` 绘制的组件。这在使用 `Factory.rive` 时非常有用，并且可以在某些条件下显著提高性能。
**何时使用 RivePanel:**

-   当在你的应用中显示多个 `RiveWidget` 并且它们可以绘制到同一纹理时
-   当你想要通过编程方式合成一个包含多个 Rive 图形（来自多个 Rive 文件/画板）的场景时
-   当使用 `Factory.rive`（使用 `Factory.flutter` 时会报错）并希望提高性能时
-   当你想要减少正在绘制的纹理数量时
-   当目标是 Web 平台以通过 `Factory.rive` 避免 WebGL 上下文限制时

**性能注意事项:**

-   **优点**: 将多个 `RiveWidget` 绘制到同一纹理可以通过减少纹理分配开销来显着提高性能
-   **内存成本**: 分配更大的纹理会产生内存成本，但这可能会被减少的单个纹理数量所抵消
-   **渲染限制**: 绘制到同一表面意味着你不能将 Rive 绘制命令与 Flutter 的绘制命令交错
-   **建议进行基准测试**: 性能特征因用例而异 - 适用于一种场景的方法可能不适用于另一种场景

**用法:**

```dart
RivePanel(
  backgroundColor: Colors.red, // Optional background color
  child: YourWidgetWithMultipleRiveWidgets(),
)
```

**重要说明:**

-   仅适用于 `Factory.rive` - 对 `Factory.flutter` 无效
-   在你的 `RiveWidget` 中设置 `useSharedTexture: true` 以启用共享纹理渲染
-   如果你需要将 Rive 内容与 Flutter 内容交错，请考虑使用单独的 `RivePanel` 或 `Factory.flutter`
-   对于复杂场景，请对两种方法进行基准测试以确定最佳性能策略

### [​](#rivewidgetcontroller) `RiveWidgetController`

`RiveWidgetController` 管理图形。
**创建控制器:**

```dart
// Using default artboard and state machine
// 使用默认画板和状态机
final controller = RiveWidgetController(file);

// Specifying artboard and state machine
// 指定画板和状态机
final controller = RiveWidgetController(
  file,
  artboardSelector: ArtboardSelector.byName("MyArtboard"),
  stateMachineSelector: StateMachineSelector.byName("MyStateMachine"),
);
```

**数据绑定:**

```dart
// Auto-bind with default view model instance
// 使用默认视图模型实例自动绑定
final viewModelInstance = controller.dataBind(DataBind.auto());

// Bind by specific instance
// 按特定实例绑定
final viewModelInstance = controller.dataBind(DataBind.byInstance(myInstance));

// Bind by name
// 按名称绑定
final viewModelInstance = controller.dataBind(DataBind.byName("MyViewModel"));
```

### [​](#file-loading) 文件加载

`FileLoader` 类提供了一种统一的方式从不同来源加载 Rive 文件。
**从 Assets 加载:**

```dart
final fileLoader = FileLoader.fromAsset(
  "assets/vehicles.riv",
  riveFactory: Factory.rive,
);
```

**从 URL 加载:**

```dart
final fileLoader = FileLoader.fromUrl(
  "https://example.com/animation.riv",
  riveFactory: Factory.rive,
);
```

**从现有文件加载:**

```dart
final fileLoader = FileLoader.fromFile(
  existingFile,
  riveFactory: Factory.rive,
);
```

或者你可以直接使用 `File` 类加载文件：

```dart
// Load from asset
final file = await File.asset("assets/vehicles.riv", riveFactory: Factory.rive);
// Load from URL
final file = await File.url("https://example.com/animation.riv", riveFactory:
Factory.rive);
// Load from path
final file = await File.path("/path/to/animation.riv", riveFactory: Factory.rive);
// Load from bytes
final file = await File.decode(bytes, riveFactory: Factory.rive);
```

## [​](#error-handling) 错误处理

Rive Flutter 包针对不同的错误场景提供了特定的异常类型：

-   `RiveFileLoaderException`: 文件加载失败时抛出
-   `RiveArtboardException`: 画板选择失败时抛出
-   `RiveStateMachineException`: 状态机选择失败时抛出
-   `RiveDataBindException`: 数据绑定失败时抛出

## [​](#resource-management) 资源管理

### [​](#manual-resource-management-rivewidget) 手动资源管理 (`RiveWidget`)

当直接使用 `RiveWidget` 时，你需要负责管理所有资源：

```dart
@override
void dispose() {
  // Dispose resources in reverse order of creation
  // 按创建的相反顺序释放资源
  viewModelInstance.dispose();
  controller.dispose();
  file.dispose();
  super.dispose();
}
```

### [​](#automatic-resource-management-rivewidgetbuilder) 自动资源管理 (`RiveWidgetBuilder`)

当使用 `RiveWidgetBuilder` 时，组件会自动管理大多数资源。你只需要释放文件加载器：

```dart
@override
void dispose() {
  fileLoader.dispose();
  super.dispose();
}
```

因为资源由 `RiveWidgetBuilder` 管理，所以在组件被释放后，你将无法访问 `RiveWidgetController`（和其他状态）。如果你需要在组件释放后访问控制器，请考虑自己创建文件和控制器。`FileLoader` 是个例外，你可以控制它。此加载器可以在多个 `RiveWidgetBuilder` 实例之间复用。底层的 `File` 只会被加载一次。`File` 将在 `FileLoader` 被释放时释放。

## [​](#specifying-a-renderer) 指定渲染器

当创建 Rive `File` 或 `FileLoader` 时，你需要指定要使用的工厂：

-   `Factory.rive` 用于 Rive 渲染器
-   `Factory.flutter` 用于 Flutter 渲染器 (Skia 或 Impeller)

你可以在应用中为不同的图形使用不同的渲染器。
选择渲染器时的一些注意事项：

-   如果你计划显示许多都绘制到不同 Rive 组件的 Rive 图形，请考虑使用带有 `Factory.rive` 的 [RivePanel](#rivepanel)，将多个图形绘制到同一纹理，以减少分配本机渲染目标和纹理的开销。或者使用 `Factory.flutter`。
-   如果你要显示复杂的图形，请考虑使用 `Factory.rive` 以利用 Rive 渲染器的优化。
-   矢量羽化 (Vector Feathering) 仅在 `Factory.rive` 中可用，因此如果你需要该功能，请使用 Rive 渲染器。

有关更多信息，请参阅 [选择渲染器](/runtimes/choose-a-renderer)。

Rive 渲染器目前尚未通过 Flutter 在 Linux 上受支持。在 Linux 上，它会自动回退到 `Factory.flutter`。

### [​](#note-on-flutter-rendering) 关于 Flutter 渲染的说明

[Impeller](https://docs.flutter.dev/perf/impeller) 正在取代 [Skia](https://skia.org/) 成为所有平台的默认渲染器。因此，当在通过 Impeller 渲染器使用 Rive Flutter 运行时，可能会出现以前未出现的渲染和 [性能](https://github.com/flutter/flutter/issues/134432) 差异。如果你在运行时遇到与 Rive 编辑器中的预期行为相比的任何视觉或性能错误，我们建议尝试以下步骤进行分类：

1.  尝试使用 `--no-enable-impeller` 标志运行 Flutter 应用以使用 Skia 渲染器。如果使用 Skia 时未出现视觉差异，则可能是 Impeller 上的渲染错误。但是，在向 Flutter 团队提交错误之前，请尝试下面的第二点👇

    ```bash
    flutter run --no-enable-impeller
    ```

2.  尝试在最新的 `master` 通道上运行 Flutter 应用。视觉错误可能已在最新的 Flutter 提交中解决，但尚未发布到 `beta` 或 `stable` 通道。
3.  如果你在最新的 master 分支上仅使用 Impeller 渲染器时仍然看到视觉差异，我们建议向 [Flutter](https://github.com/flutter/flutter) Github 仓库提交详细的问题，并提供可重现的示例和其他相关详细信息，以帮助团队调试可能存在的任何问题。

## [​](#troubleshooting) 故障排除

如果你在 Flutter 中使用 Rive 时遇到问题，请考虑以下事项：

-   确保在使用任何 Rive 功能之前调用了 `await RiveNative.init()`。
-   检查控制台是否有任何与 Rive 相关的错误消息。
-   确保你的 Rive 文件在 `pubspec.yaml` 中被正确引用并且存在于指定路径中。
-   如果使用 `RiveWidgetBuilder`，请确保在构建器函数中处理所有可能的状态（加载中、已加载、失败）。

### [​](#build-errors) 构建错误

如果你遇到与 Rive 相关的构建错误，请确保：

-   你的 `pubspec.yaml` 中有正确版本的 Rive 包。
-   你已经运行 `flutter pub get` 来获取最新的依赖项。

如果你仍然遇到问题，请参阅 Rive Native 文档中的 [故障排除部分](/runtimes/flutter/rive-native#troubleshooting)。

## [​](#manually-building-rive-native-libraries) 手动构建 Rive 原生库

Rive 会自动为你下载原生库作为 `rive_native` 插件的一部分。
但是，如果你需要手动构建原生库，请参阅 Rive Native 文档中的 [构建部分](/runtimes/flutter/rive-native#building-rive-native)。

## [​](#next-steps) 下一步

既然你已经将 Rive 集成到你的 Flutter 应用中，你可以探索更高级的功能，例如：

[## 画板 (Artboards)

在运行时控制显示哪个画板。](/runtimes/artboards)[## 布局 (Layout)

在运行时控制画板的布局（适应和对齐）。](/runtimes/layout)[## 状态机播放 (State Machine Playback)

在运行时控制状态机播放并与状态机输入交互。](/runtimes/state-machines.md)[## 数据绑定 (Data Binding)

在运行时使用双向数据绑定动态更新文本、颜色、图像、列表等内容。](/runtimes/data-binding)[## 加载资产 (Loading Assets)

在运行时加载引用的资产（图像、字体、音频）。也称为带外资产 (out-of-band assets)。](/runtimes/loading-assets.md)[## 缓存 Rive 文件 (Caching a Rive File)

在多个 Rive 实例之间缓存并复用 Rive 文件对象以提高性能。](/runtimes/caching-a-rive-file)

## [​](#resources) 资源

Rive Flutter:

-   [GitHub](https://github.com/rive-app/rive-flutter)
-   [pub.dev](https://pub.dev/packages/rive)
-   [示例应用](https://github.com/rive-app/rive-flutter/tree/master/example/)

Rive Native:

-   [Rive Native 概览](/runtimes/flutter/rive-native)
-   [pub.dev](https://pub.dev/packages/rive_native)

[迁移指南](/runtimes/react-native/migration-guide)[Rive Native for Flutter](/runtimes/flutter/rive-native)