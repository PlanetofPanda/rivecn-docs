---
title: '迁移指南 (Migration Guide)'
description: '了解在升级 Rive Flutter 运行时的主要版本时，如何迁移您的 Flutter 应用，包括破坏性变更和新功能。'
---

## 版本 0.14.0

这是 Rive Flutter 的一次重大更新。我们彻底移除了用于 Rive 运行时的所有 Dart 代码，并将其替换为底层的 [C++ 运行时](https://github.com/rive-app/rive-runtime)。有关更多详细信息，请参阅 [Flutter 版 Rive Native](/runtimes/flutter/rive-native) 页面。

这导致底层 API 发生了一些变化，以前可以通过 Dart 访问的大部分代码库现在通过 FFI 在 C++ 中实现。

### 0.14.0 的新功能

此版本的 Rive Flutter 增加了对以下功能的支持：

- [Rive 渲染器 (Rive Renderer)](https://rive.app/renderer)
- [数据绑定 (Data Binding)](/editor/data-binding/)
- [布局 (Layouts)](/editor/layouts/layouts-overview)
- [滚动 (Scrolling)](/editor/layouts/scrolling)
- [N-切片 (N-Slicing)](/editor/layouts/n-slicing)
- [矢量羽化 (Vector Feathering)](https://rive.app/blog/introducing-vector-feathering)
- 之前版本中未实现的 Rive 所有其他功能
- 包含 Rive C++ 运行时的最新修复和改进
- 增加了预构建库，并支持手动构建。有关更多信息，请参阅 [rive_native](https://pub.dev/packages/rive_native) 包
- 移除了 `rive_common` 包并将其替换为 `rive_native`

现在由于 Rive Flutter 使用核心的 Rive C++ 运行时，您可以期待未来新的 Rive 功能能更快地在 Rive Flutter 中得到支持。

::: info
您所有的 Rive 图形在外观和功能上仍将保持与以前一致。
:::

### 要求 (Requirements)

#### Dart 和 Flutter 版本

此版本将版本要求提升至：

```yaml
sdk: ">=3.5.0 <4.0.0"
flutter: ">=3.3.0"
```

#### 必要的设置

**重要提示**：您必须在应用启动时或在使用 Rive 之前调用 `RiveNative.init`。例如在 `main.dart` 中：

```dart
import 'package:rive/rive.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await RiveNative.init(); // 在使用 Rive 前调用 init
  runApp(const MyApp());
}
```

### 迁移指南 (Migration Guide)

#### 快速迁移清单

1. ✅ 更新 `pubspec.yaml` 依赖项以使用 `0.14.0` 或更高版本：
   ```yaml
      dependencies:
        rive: ^0.14.0-dev.8 # 或最新版本
   ```
2. ✅ 将 `RiveNative.init()` 添加到 `main()` 函数中，或在调用 Rive 前执行。
3. ✅ 用 [`RiveWidget`](/runtimes/flutter/flutter#rivewidget) 或 [`RiveWidgetBuilder`](/runtimes/flutter/flutter#rivewidgetbuilder) 替换 `Rive` 和 `RiveAnimation` widget。
4. ✅ 更新控制器以使用新 API，参见 [`RiveWidgetController`](/runtimes/flutter/flutter#rivewidgetcontroller)。
5. ✅ 审查并更新所有自定义资产加载代码。
6. ✅ 测试您的图形和交互。

#### 移除的类 (Removed Classes)

以下类已被彻底移除：

- `Rive` 和 `RiveAnimation` widget → 改用 `RiveWidget` 和 `RiveWidgetBuilder`
- `RiveAnimationController` 及其子类 → 改用 `RiveWidgetController`、`SingleAnimationPainter` 和 `StateMachinePainter`
- `OneShotAnimation` 和 `SimpleAnimation` → 改用 `SingleAnimationPainter` 播放单个动画
- `StateMachineController` → 改用 `StateMachine`（可以通过 `RiveWidgetController.stateMachine` 访问）
- `RiveEvent` → 替换为 `Event`
- `SMITrigger` → 替换为 `TriggerInput`
- `SMIBool` → 替换为 `BooleanInput`
- `SMINumber` → 替换为 `NumberInput`
- `FileAssetLoader` → 在创建 `File` 时替换为可选的回调函数

#### 加载 Rive 文件

`RiveFile` 已被移除并替换为 `File`。重要变更：

### 新 API

```dart
    final file = await File.decode(bytes, factory: Factory.rive);
    final artboard = file.defaultArtboard();
    final artboard = file.artboard('MyArtboard');
```

### 旧 API

```dart
    final file = await RiveFile.import(bytes);
    final artboard = file.mainArtboard;
    final artboard = file.artboardByName('MyArtboard');
```

提供的 `Factory` 决定了将使用的渲染器。使用 `Factory.rive` 表示 Rive 渲染器，使用 `Factory.flutter` 表示自带的 Flutter 渲染器（Skia 或 Impeller）。

::: warning
矢量羽化仅在 Rive 渲染器下工作。
:::

**主要变更：**

- 现在创建 Rive 文件需要一个 factory (`Factory.rive` 或 `Factory.flutter`)
- 用返回 `Future<File>` 的 `File.decode()` 替换 `RiveFile.import`
- 用 `defaultArtboard()` 替换 `mainArtboard`
- 用 `artboard(name)` 替换 `artboardByName(name)`
- 用 `File.url` 替换 `RiveFile.network`
- 用 `File.path` 替换 `RiveFile.file`

#### Widget 迁移

请参阅更新后的示例应用以获取完整的迁移指南，包括如何使用新的 `RiveWidget` 和 `RiveWidgetBuilder` API。

| 旧 Widget | 新 Widget | 说明 |
| --- | --- | --- |
| `Rive`/`RiveAnimation` | `RiveWidget`/`RiveWidgetBuilder` | 直接替换 |

### 新 API - 选项 1

```dart
    class SimpleAssetAnimation extends StatefulWidget {
        const SimpleAssetAnimation({Key? key}) : super(key: key);

        @override
        State<SimpleAssetAnimation> createState() => _SimpleAssetAnimationState();
    }

    class _SimpleAssetAnimationState extends State<SimpleAssetAnimation> {
        late final fileLoader = FileLoader.fromAsset(
            'assets/off_road_car.riv',
            riveFactory: Factory.rive,
        );

        @override
        void dispose() {
            fileLoader.dispose();
            super.dispose();
        }

        @override
        Widget build(BuildContext context) {
            return Scaffold(
                appBar: AppBar(
                    title: const Text('Simple Animation'),
                ),
                body: Center(
                    child: RiveWidgetBuilder(
                        fileLoader: fileLoader,
                        builder: (context, state) => switch (state) {
                            RiveLoading() => const CircularProgressIndicator(),
                            RiveFailed() => Text('Failed to load: ${state.error}'),
                            RiveLoaded() => RiveWidget(
                                controller: state.controller,
                                fit: Fit.cover,
                            ),
                        },
                    ),
                ),
            );
        }
    }
```

### 新 API - 选项 2

```dart
    class SimpleAssetAnimation extends StatefulWidget {
        const SimpleAssetAnimation({Key? key}) : super(key: key);

        @override
        State<SimpleAssetAnimation> createState() => _SimpleAssetAnimationState();
    }

    class _SimpleAssetAnimationState extends State<SimpleAssetAnimation> {
        File? file;
        RiveWidgetController? controller;
        bool isInitialized = false;

        @override
        void initState() {
            super.initState();
            initRive();
        }

        void initRive() async {
            file = (await File.asset('assets/off_road_car.riv', riveFactory: Factory.rive))!;
            controller = RiveWidgetController(file!);
            setState(() => isInitialized = true);
        }

        @override
        void dispose() {
            controller?.dispose();
            file?.dispose();
            super.dispose();
        }

        @override
        Widget build(BuildContext context) {
            return Scaffold(
                appBar: AppBar(
                    title: const Text('Simple Animation'),
                ),
                body: Center(
                    child: isInitialized && controller != null
                        ? RiveWidget(
                            controller: controller!,
                            fit: Fit.cover,
                        )
                        : const CircularProgressIndicator(),
                ),
            );
        }
    }
```

### 旧 API

```dart
    class SimpleAssetAnimation extends StatelessWidget {
        const SimpleAssetAnimation({Key? key}) : super(key: key);

        @override
        Widget build(BuildContext context) {
            return Scaffold(
                appBar: AppBar(
                    title: const Text('Simple Animation'),
                ),
                body: const Center(
                    child: RiveAnimation.asset(
                        'assets/off_road_car.riv',
                        fit: BoxFit.cover,
                    ),
                ),
            );
        }
    }
```

#### 控制器迁移 (Controller Migration)

| 旧控制器 | 新控制器 | 说明 |
| --- | --- | --- |
| `RiveAnimationController` | `RiveWidgetController` | Widget 的主要控制器 |
| `StateMachineController` | `StateMachine` | 直接访问状态机 |
| `OneShotAnimation` 和 `SimpleAnimation` | `SingleAnimationPainter` | 针对单个动画 |

使用新 `RiveWidgetController` 的示例：

```dart
final file = await File.asset('assets/off_road_car.riv', riveFactory: Factory.rive);
final controller = RiveWidgetController(file!);
final artboard = controller.artboard; // 访问加载的画板
final viewModelInstance = controller.dataBind(DataBind.auto()); // 自动数据绑定
```

（可选）指定要使用的画板和状态机：

```dart
final file = await File.asset('assets/off_road_car.riv', riveFactory: Factory.rive);
final controller = RiveWidgetController(
  file,
  artboardSelector: ArtboardSelector.byName('Main'),
  stateMachineSelector: StateMachineSelector.byName('State Machine 1'),
);
```

#### 处理状态机输入 (Handling State Machine Inputs)

::: tip
对于更高级的用例，请考虑使用 [数据绑定 (Data Binding)](editor/data-binding/overview)
:::

`StateMachineController` 已被移除并替换为 `StateMachine`。重要变更：

### 新 API

```dart
    stateMachine.trigger('myTrigger');
    stateMachine.boolean('myBool');
    stateMachine.number('myNumber');
```

### 旧 API

```dart
    controller.getTriggerInput('myTrigger');
    controller.getBooleanInput('myBool');
    controller.getNumberInput('myNumber');
```

您可以从 `RiveWidgetController` 中访问 `stateMachine`：

```dart
final controller = RiveWidgetController(file);
final stateMachine = controller.stateMachine;
```

::: info
建议在不再需要时手动释放输入：`input.dispose()`
:::

##### 嵌套输入

您可以通过提供可选的 `path` 参数来访问嵌套输入：

```dart
stateMachine.boolean('myBool', path: 'nested/path');
stateMachine.number('myNumber', path: 'nested/path');
stateMachine.trigger('myTrigger', path: 'nested/path');
```

#### 处理 Rive 事件 (Handling Rive Events)

::: tip
对于更高级的用例，请考虑使用 [数据绑定](/editor/data-binding/overview) 代替事件。
:::

`RiveEvent` 已移出并替换为 `Event`。`Event` 是一个密封类，有两种选项：

- `OpenUrlEvent`
- `GeneralEvent`

注册事件侦听器：

### 新 API

```dart
    // 新 API
    final controller = RiveWidgetController(_riveFile!);
    controller?.stateMachine.addEventListener(_onRiveEvent);

    void _onRiveEvent(Event event) {
        // 对事件进行处理
    }
```

### 旧 API

```dart
    // 旧 API
    final controller =
        StateMachineController.fromArtboard(artboard, 'State Machine 1')!;
    controller.addEventListener(_onRiveEvent);

    void _onRiveEvent(RiveEvent event) {
        // 对事件进行处理
    }
```

访问 `properties` 会返回 `Map<String, CustomProperty>`。`CustomProperty` 也是一个密封类，具有以下选项：

- `CustomNumberProperty`
- `CustomBooleanProperty`
- `CustomStringProperty`

所有这些都有一个 `value` 字段。在 `Event` 类上，有便捷的访问方法：

```dart
// 便捷访问方法
event.property(name);           // 返回 CustomProperty
event.numberProperty(name);     // 返回 CustomNumberProperty
event.booleanProperty(name);    // 返回 CustomBooleanProperty
event.stringProperty(name);     // 返回 CustomStringProperty
```

#### 布局变更 (Layout Changes)

##### BoxFit → Fit

之前我们使用 Flutter 的 `BoxFit` 类。现在我们使用自己的 `Fit` 类，它包含了一个额外的选项：

```dart
// 旧 API
BoxFit.contain

// 新 API
Fit.contain
Fit.layout  // 基于布局的填充新选项
```

#### 资产加载变更 (Asset Loading Changes)

`FileAssetLoader` 类及其所有子类已被移除：

- `CDNAssetLoader`
- `LocalAssetLoader`
- `CallbackAssetLoader`
- `FallbackAssetLoader`

##### 带外 (Out-of-band) 资产加载

### 新 API

```dart
    // 新 API
    assetLoader: (asset, bytes) { /* 仅限同步工作，但可以调用异步函数 */ }
    riveFactory.decodeImage(bytes) // 或 asset.decode(bytes)
    asset.renderImage(someImage) // 返回代表成功的布尔值
```

### 旧 API

```dart
    // 旧 API
    assetLoader: (asset, bytes) async { /* 异步工作 */ }
    ImageAsset.parseBytes(bytes)
    asset.image = someImage;
```

**主要变更：**

- `assetLoader` 不再能是异步 lambda。
- `ImageAsset.parseBytes(bytes)` → `riveFactory.decodeImage(bytes)` 或 `asset.decode(bytes)`。
- `FontAsset.parseBytes(bytes)` → `riveFactory.decodeFont(bytes)` 或 `asset.decode(bytes)`。
- `AudioAsset.parseBytes(bytes)` → `riveFactory.decodeAudio(bytes)` 或 `asset.decode(bytes)`。
- `ImageAsset.image = value` → `ImageAsset.renderImage(value)` (返回布尔值)。
- `FontAsset.font = value` → `FontAsset.font(value)` (返回布尔值)。
- `AudioAsset.audio = value` → `AudioAsset.audio(value)` (返回布尔值)。

#### Text Run 更新

::: tip
我们建议改用 [数据绑定](/editor/data-binding/overview) 在运行时更新文本。
:::

现在无法直接访问 `TextValueRun` 对象。请改用以下方法来访问字符串值：

```dart
final controller = RiveWidgetController(riveFile);
final artboard = controller.artboard;

// 获取 Text Run 值
artboard.getText(value)
artboard.getText(value, path: path)

// 设置 Text Run 值
artboard.setText(value)
artboard.setText(value, path: path)
```

### 已知的缺失功能

这些功能在 `v0.14.0` 中不可用，但可能会在未来的发布版本中添加：

- 自动 Rive CDN 资产加载
- `speedMultiplier`
- `useArtboardSize`
- `clipRect`
- `isTouchScrollEnabled`
- `dynamicLibraryHelper`

### 移除的代码路径

所有的 "runtime" Dart 代码已从这些路径中移除：

- `src/controllers`
- `src/core`
- `src/generated`
- `rive_core`
- `utilities`

### 获取帮助

如果您在迁移过程中遇到问题：

1. 查看 [Rive Flutter 文档](https://rive.app/docs/flutter)
2. 阅读 [数据绑定指南](/editor/data-binding/overview)
3. 访问 [Rive 社区论坛](https://community.rive.app)
4. 在 [GitHub 仓库](https://github.com/rive-app/rive-flutter) 提交问题
