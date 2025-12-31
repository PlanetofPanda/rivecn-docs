---
title: '自定义 Painter (Custom Painter)'
description: '在 Flutter 中手动前进并绘制 Rive 画板。'
---

您可以通过使用 [CustomPainter](https://api.flutter.dev/flutter/rendering/CustomPainter-class.html) 自行管理画板的前进 (advance) 和绘制 (draw)。这将为您在绘图层面提供更多控制权，允许您：

- 将多个 Rive 画板绘制到同一个 [Flutter Canvas](https://api.flutter.dev/flutter/dart-ui/Canvas-class.html) 上。
- 手动推进画板并控制流逝的时间。
- 重用同一个画板实例并多次重绘它。
- 在画布上应用更复杂的裁剪、变换或其他绘画/渲染。

[Flame 游戏引擎](https://docs.flame-engine.org/latest/) 正是利用了下面讨论的技术来渲染 Rive 动画。本示例中的某些代码取自 [flame_rive 包](https://pub.dev/packages/flame_rive)。

::: info
**请注意，这是一个低级 API。在大多数情况下，首选使用 `RiveAnimation` 或 `Rive` widget。**
:::

### 示例代码 (Example Code)

以下是一个完整的示例，演示了如何手动推进单个画板，并在同一个 Flutter 画布上以网格形式多次绘制它。

您可以查看 [在线 IDE 示例](https://zapp.run/edit/rive-custom-painter-example-zao06inbp06) 直接运行。

![图像](/images/runtimes/flutter/d88d3230-4bb6-4ca6-b3a8-7715737c3ead.webp)

```dart
import 'dart:math';

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
      debugShowCheckedModeBanner: false,
      home: MyRiveWidget(),
    );
  }
}

class MyRiveWidget extends StatefulWidget {
  const MyRiveWidget({Key? key}) : super(key: key);

  @override
  State<MyRiveWidget> createState() => _MyRiveWidgetState();
}

class _MyRiveWidgetState extends State<MyRiveWidget>
    with SingleTickerProviderStateMixin {
  late final AnimationController _animationController =
      AnimationController(vsync: this, duration: const Duration(seconds: 10));
  RiveArtboardRenderer? _artboardRenderer;

  Future<void> _load() async {
    // 您需要自己管理将控制器添加到画板，
    // 而不像 RiveAnimation widget 那样通过提供状态机（或动画）名称就能自动处理。
    final file = await RiveFile.asset('assets/little_machine.riv');
    final artboard = file.mainArtboard.instance();
    final controller = StateMachineController.fromArtboard(
      artboard,
      'State Machine 1',
    );
    artboard.addController(controller!);
    setState(
      () => _artboardRenderer = RiveArtboardRenderer(
        antialiasing: true,
        fit: BoxFit.cover,
        alignment: Alignment.center,
        artboard: artboard,
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    _animationController.repeat();
    _load();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _artboardRenderer == null
            ? const SizedBox()
            : CustomPaint(
                painter: RiveCustomPainter(
                  _artboardRenderer!,
                  repaint: _animationController,
                ),
                child: const SizedBox.expand(), // 使用所有可用空间
              ),
      ),
    );
  }
}

class RiveCustomPainter extends CustomPainter {
  final RiveArtboardRenderer artboardRenderer;

  RiveCustomPainter(this.artboardRenderer, {super.repaint}) {
    _lastTickTime = DateTime.now();
    _elapsedTime = Duration.zero;
  }

  late DateTime _lastTickTime;
  late Duration _elapsedTime;

  void _calculateElapsedTime() {
    final currentTime = DateTime.now();
    _elapsedTime = currentTime.difference(_lastTickTime);
    _lastTickTime = currentTime;
  }

  @override
  void paint(Canvas canvas, Size size) {
    _calculateElapsedTime(); // 计算自上次 tick 以来流逝的时间。

    // 按流逝的时间前进画板。
    artboardRenderer.advance(_elapsedTime.inMicroseconds / 1000000);

    final width = size.width / 3;
    final height = size.height / 2;
    final artboardSize = Size(width, height);

    // 第一行
    canvas.save();
    artboardRenderer.render(canvas, artboardSize);
    canvas.restore();
    canvas.save();
    canvas.translate(width, 0);
    artboardRenderer.render(canvas, artboardSize);
    canvas.restore();
    canvas.save();
    canvas.translate(width * 2, 0);
    artboardRenderer.render(canvas, artboardSize);
    canvas.restore();

    // 第二行
    canvas.save();
    canvas.translate(0, height);
    artboardRenderer.render(canvas, artboardSize);
    canvas.restore();
    canvas.save();
    canvas.translate(width, height);
    artboardRenderer.render(canvas, artboardSize);
    canvas.restore();
    canvas.save();
    canvas.translate(width * 2, height);
    artboardRenderer.render(canvas, artboardSize);
    canvas.restore();

    // 绘制整个画布尺寸
    // artboardRenderer.render(canvas, size);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return true;
  }
}

/// 保留一个 `Artboard` 实例并将其渲染到 `Canvas`。
///
/// 这是 `RiveAnimation` widget 及其 RenderObject 的简化版本。
///
/// 这考虑了 `fit` 和 `alignment` 属性，类似于 `RiveAnimation` 的工作方式。
class RiveArtboardRenderer {
  final Artboard artboard;
  final bool antialiasing;
  final BoxFit fit;
  final Alignment alignment;

  RiveArtboardRenderer({
    required this.antialiasing,
    required this.fit,
    required this.alignment,
    required this.artboard,
  }) {
    artboard.antialiasing = antialiasing;
  }

  void advance(double dt) {
    artboard.advance(dt, nested: true);
  }

  late final aabb = AABB.fromValues(0, 0, artboard.width, artboard.height);

  void render(Canvas canvas, Size size) {
    _paint(canvas, aabb, size);
  }

  final _transform = Mat2D();
  final _center = Mat2D();

  void _paint(Canvas canvas, AABB bounds, Size size) {
    const position = Offset.zero;

    final contentWidth = bounds[2] - bounds[0];
    final contentHeight = bounds[3] - bounds[1];

    if (contentWidth == 0 || contentHeight == 0) {
      return;
    }

    final x = -1 * bounds[0] -
        contentWidth / 2.0 -
        (alignment.x * contentWidth / 2.0);
    final y = -1 * bounds[1] -
        contentHeight / 2.0 -
        (alignment.y * contentHeight / 2.0);

    var scaleX = 1.0;
    var scaleY = 1.0;

    canvas.save();
    canvas.clipRect(position & size);

    switch (fit) {
      case BoxFit.fill:
        scaleX = size.width / contentWidth;
        scaleY = size.height / contentHeight;
        break;
      case BoxFit.contain:
        final minScale =
            min(size.width / contentWidth, size.height / contentHeight);
        scaleX = scaleY = minScale;
        break;
      case BoxFit.cover:
        final maxScale =
            max(size.width / contentWidth, size.height / contentHeight);
        scaleX = scaleY = maxScale;
        break;
      case BoxFit.fitHeight:
        final minScale = size.height / contentHeight;
        scaleX = scaleY = minScale;
        break;
      case BoxFit.fitWidth:
        final minScale = size.width / contentWidth;
        scaleX = scaleY = minScale;
        break;
      case BoxFit.none:
        scaleX = scaleY = 1.0;
        break;
      case BoxFit.scaleDown:
        final minScale =
            min(size.width / contentWidth, size.height / contentHeight);
        scaleX = scaleY = minScale < 1.0 ? minScale : 1.0;
        break;
    }

    Mat2D.setIdentity(_transform);
    _transform[4] = size.width / 2.0 + (alignment.x * size.width / 2.0);
    _transform[5] = size.height / 2.0 + (alignment.y * size.height / 2.0);
    Mat2D.scale(_transform, _transform, Vec2D.fromValues(scaleX, scaleY));
    Mat2D.setIdentity(_center);
    _center[4] = x;
    _center[5] = y;
    Mat2D.multiply(_transform, _transform, _center);

    canvas.translate(
      size.width / 2.0 + (alignment.x * size.width / 2.0),
      size.height / 2.0 + (alignment.y * size.height / 2.0),
    );

    canvas.scale(scaleX, scaleY);
    canvas.translate(x, y);

    artboard.draw(canvas);
    canvas.restore();
  }
}
```

`RiveArtboardRenderer` 类取自 Flame Rive 包，可以作为了解 Rive 如何使用 [Alignment](https://api.flutter.dev/flutter/painting/Alignment-class.html) 和 [BoxFit](https://api.flutter.dev/flutter/painting/BoxFit.html) 将画板布局到画布的起点。

关键步骤如下：

1. 从 `RiveFile` 访问画板并附加任何 Rive 动画控制器 (`StateMachineController`)。动画可以像往常一样通过控制器进行控制。
2. 创建一个 Flutter `CustomPaint` widget 以访问 Flutter 画布。
3. 利用 `AnimationController`（或 Ticker/Listener）强制 `RiveCustomPainter` 每一帧重绘。
4. 计算动画 tick 之间的流逝时间。
5. 通过 `artboard.advance(dt, nested: true);` 前进画板，其中 `dt` 是流逝的时间（增量时间）。
6. 通过 `artboard.draw(canvas);` 在画布上绘制画板。

其余代码负责布局和尺寸设置。

### 其他示例 (Other Examples)

在此示例中使用了单个画板，但也可以在同一个画布上绘制多个画板实例（来自同一或不同的 Rive 文件）。

请参阅 [此可编辑示例](https://zapp.run/edit/rive-multiple-artboards-painter-z8lk06zr8ll0?file=lib/main.dart)，它展示了如何在同一个画布上绘制两个不同的画板（为每个僵尸创建了一个唯一的画板实例）。每个画板都有一个数字输入，用于在不同的皮肤之间切换：

Rive Flutter Custom Painter - 多个画板：

![图像](/images/runtimes/flutter/1fc55311-9c05-44b2-86b3-3ce836c7733e.webp)

::: info
请注意，画板上会调用 `.instance()` 以创建一个可以独立前进的唯一实例。
:::
