---
title: '缓存 Rive 文件 (Caching a Rive File)'
description: '在 Flutter 中缓存 Rive 文件的技术和注意事项。'
---

在大多数情况下，`.riv` 文件加载很快，并不需要您自行管理 `RiveFile`。但是，如果您打算在应用程序的多个部分，甚至在同一个屏幕上使用同一个 `.riv` 文件，那么加载该文件一次并将其保留在内存中可能会更有优势。

### 用法示例

以下是一个基础示例，演示了如何预加载 Rive 文件，并将数据直接传递给 `RiveAnimation.direct()` 构造函数：

```javascript
class PreloadRive extends StatefulWidget {
  const PreloadRive({super.key});

  @override
  State<PreloadRive> createState() => _PreloadRiveState();
}

class _PreloadRiveState extends State<PreloadRive> {
  RiveFile? _file; // 您可以维护此引用以获得缓存版本

  @override
  void initState() {
    super.initState();
    preload();
  }

  Future<void> preload() async {
    rootBundle.load('assets/little_machine.riv').then(
      (data) async {
        // 从二进制数据加载 RiveFile。
        setState(() {
          _file = RiveFile.import(data);
        });
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return (_file == null)
        ? const SizedBox.shrink()
        : RiveAnimation.direct(_file!);
  }
}
```

### 其他注意事项

#### 状态管理 (Managing State)

如何保持 `RiveFile` 的状态存活并与其他 widget 共享，取决于您以及您偏好的状态管理方案。一种方法是在 `main` 函数或启动屏幕期间等待 Rive 文件加载，并使用 [Provider](https://pub.dev/packages/provider) 包将数据公开给整个应用。

或者，如果动画仅在应用的嵌套部分中需要，那么将动画加载延迟到必要时可能更为合适。

#### 内存 (Memory)

通过自行管理 RiveFile，您可以对应用程序使用的内存进行更精细的控制。如果同一个 Rive 文件在应用的多个部分中使用，或者在多个 `RiveAnimation` widget 中同时使用，这将特别有益。

如果需要或愿意进行深入调查，您可以利用 Flutter DevTools 的 [内存工具](https://docs.flutter.dev/tools/devtools/memory#memory-view-guide)。

#### 网络资源 (Network Assets)

通过互联网加载 Rive 动画最简单的方法是使用 `RiveAnimation.network(url)`。但是，关于内存和跨多个 widget/页面共享 Rive 文件，网络资源也存在类似的考虑。

以下代码可用于通过网络加载 Rive 文件：

```javascript
final riveFile = await RiveFile.network('YOUR:URL');
```

随后可以将引用保留在内存中，并将 `riveFile` 传递给 `RiveAnimation.direct`。