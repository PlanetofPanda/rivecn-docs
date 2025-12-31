---
title: '备选 Widget 设置 (Alternative Widget Setup)'
description: '在 Flutter 中缓存 Rive 文件的技术和注意事项。'
---

在应用程序中集成 Rive 动画和状态机最简单的方法是使用整个运行时帮助文档中提到的 `RiveAnimation` widget。然而，在某些情况下，您可能希望在渲染画板 (Artboard) 之前，设置与 Rive widget 关联的动画或状态机控制器。请查看下方在 Flutter 应用中集成 Rive 的其他方法：

## 备选方法 (Alternative Methods)

### 文件加载 (File loading)

如果您想从 `rootBundle` 加载 `.riv` 文件，您需要手动导入数据。主要模式如下：

### 1. 加载 `.riv` 文件的字节流

### 2. 使用 `RiveFile` 类解析数据并获取文件引用

### 3. 从该文件中创建您想要显示的画板 (Artboard) 引用

### 4. （可选）将控制器（如 `StateMachineController`）关联到画板

### 5. 使用画板引用渲染 `Rive` widget

---

### 加载 .riv 字节流

```dart
    rootBundle.load('assets/new_file.riv').then(
      (data) async {
        ...
      }
    );
```

### 使用 RiveFile 解析字节

```dart
    (data) async {
        // 从二进制数据加载 RiveFile。
        final file = RiveFile.import(data);
    },
```

### 创建画板引用

```dart
    // 画板是动画的根源，会被绘制到 Rive widget 中
    final riveArtboard = file.mainArtboard;
```

### 将控制器关联到画板

如果您只想播放特定动画：

```javascript
    var controller =
      StateMachineController.fromArtboard(riveArtboard, 'SomeStateMachineName');
    if (controller != null) {
      riveArtboard.addController(controller);
    }
```

如果您想运行状态机：

```javascript
    var controller =
      StateMachineController.fromArtboard(riveArtboard, 'SomeStateMachineName');
    if (controller != null) {
      riveArtboard.addController(controller);
    }
```

### 渲染 Rive widget

```javascript
    Widget build(BuildContext context) {
      return Center(
        child: riveArtboard == null
          ? const SizedBox()
          : SizedBox(
              width: 250,
              height: 250,
              child: Rive(
                artboard: riveArtboard!.instance(),
              ),
            )
      );
    }
```

::: info
**重要提示**：请注意上方，将画板连接到 `Rive` widget 时，您需要对其调用 `.instance()`。这将允许所有组件实例在画布空间内得以正确渲染。
:::

### 完整示例 (Complete Example)

总之，这种模式可能如下面的代码片段所示：

```javascript
class _ExampleStateMachineState extends State<ExampleStateMachine> {
  Artboard? _riveArtboard;

  @override
  void initState() {
    super.initState();

    rootBundle.load('assets/rocket.riv').then(
      (data) async {
        final file = RiveFile.import(data);

        final artboard = file.mainArtboard;
        var controller =
            StateMachineController.fromArtboard(artboard, 'Button');
        if (controller != null) {
          artboard.addController(controller);
        }
        setState(() => _riveArtboard = artboard);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 250,
      height: 250,
      child: Rive(
        artboard: _riveArtboard!.instance(),
      ),
    );
  }
}
```