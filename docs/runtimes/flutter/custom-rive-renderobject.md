---
title: '自定义 Rive RenderObject (Custom Rive RenderObject)'
description: '扩展 RiveRenderObject 以执行更高级的操作。'
---

通过扩展 `RiveRenderObject`，可以在运行时对 Rive 动画进行更精细的控制。这允许您覆盖 `advance`、`beforeDraw` 和 `draw` 等低级方法，从而获得更多控制权并可选地执行额外操作。有关用法示例，请参见下文。

::: info
请注意，这是一个低级 API。在大多数情况下，首选使用 `RiveAnimation` 或 `Rive` widget。
:::

### 示例代码 (Example Code)

以下是一个基础示例，展示了如何使用自定义 [RenderObject](https://api.flutter.dev/flutter/rendering/RenderObject-class.html) 绘制 Rive 动画并推进状态机。

```javascript
import 'package:flutter/material.dart';
import 'package:rive/math.dart';
import 'package:rive/rive.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MyRiveWidget(),
    );
  }
}

class MyRiveWidget extends StatefulWidget {
  const MyRiveWidget({Key? key}) : super(key: key);

  @override
  State<MyRiveWidget> createState() => _MyRiveWidgetState();
}

class _MyRiveWidgetState extends State<MyRiveWidget> {
  Artboard? _riveArtboard;

  Future<void> _load() async {
    // 您需要自己管理将控制器添加到画板，
    // 而不像 RiveAnimation widget 那样可以通过简单提供状态机（或动画）名称来自动处理逻辑。
    final file = await RiveFile.asset('assets/little_machine.riv');
    final artboard = file.mainArtboard;
    final controller = StateMachineController.fromArtboard(
      artboard,
      'State Machine 1',
    );
    artboard.addController(controller!);
    setState(() => _riveArtboard = artboard);
  }

  @override
  void initState() {
    super.initState();
    _load();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _riveArtboard == null
            ? const SizedBox()
            : CustomRiveRenderObjectWidget(
                artboard: _riveArtboard!,
                fit: BoxFit.contain,
              ),
      ),
    );
  }
}

class CustomRiveRenderObjectWidget extends LeafRenderObjectWidget {
  final Artboard artboard;
  final BoxFit fit;
  final Alignment alignment;

  const CustomRiveRenderObjectWidget({
    super.key,
    required this.artboard,
    this.fit = BoxFit.contain,
    this.alignment = Alignment.center,
  });

  @override
  RenderObject createRenderObject(BuildContext context) {
    return CustomRiveRenderObject(artboard as RuntimeArtboard)
      ..artboard = artboard
      ..fit = fit
      ..alignment = alignment;
  }

  @override
  void updateRenderObject(
      BuildContext context, covariant CustomRiveRenderObject renderObject) {
    renderObject
      ..artboard = artboard
      ..fit = fit
      ..alignment = alignment;
  }

  @override
  void didUnmountRenderObject(covariant CustomRiveRenderObject renderObject) {
    renderObject.dispose();
  }
}

class CustomRiveRenderObject extends RiveRenderObject {
  CustomRiveRenderObject(super.artboard) {
    _artboardReference = artboard;
  }

  late final RuntimeArtboard _artboardReference;

  @override
  bool advance(double elapsedSeconds) {
    // 父类方法（super）将更新动画并推进画板。
    // 您可以自己推进画板，也可以调用父类方法。
    return _artboardReference.advance(elapsedSeconds, nested: true);
    // 示例展示如何以两倍速推进画板。
    // return super.advance(elapsedSeconds * 2);
  }

  @override
  void beforeDraw(Canvas canvas, Offset offset) {
    // 在 `draw` 之前调用。例如，可用于执行裁剪。
    super.beforeDraw(canvas, offset);
  }

  @override
  void draw(Canvas canvas, Mat2D viewTransform) {
    // 在这里，您可以切入 draw 方法并执行自定义操作。
    super.draw(canvas, viewTransform);
  }
}
```

画板可以像往常一样通过 `StateMachineController`（或任何其他动画控制器）进行控制和配置。

### 用法示例 (Example Usage)

- [在运行时动态更新组件颜色](https://github.com/HayesGordon/rive_flutter_runtime_color_change_example) - 利用自定义 Rive 渲染对象通过名称访问并更改形状的填充颜色。这对于颜色的不透明度正在播放动画但需要在运行时更改颜色的场景非常有用。
- [在 Flutter 中跟踪 Rive 组件](https://github.com/luigi-rosso/rive_flutter_painting_context/) - 在运行时跟踪 Rive 组件的位置，并在其上叠加 Flutter widget 或执行额外的绘画操作。

### 补充文档 (Additional Documenation)

有关 RenderObject 的更多信息，请参阅官方 Flutter 示例：

- [RenderObject 文档](https://api.flutter.dev/flutter/rendering/RenderObject-class.html)
- [如何构建 RenderObject (视频)](https://www.youtube.com/watch?v=cq34RWXegM8)