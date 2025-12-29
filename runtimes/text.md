运行时 (Runtimes)

# 文本 (Text)

> [!WARNING]
> **⚠️ 已弃用：请使用数据绑定 (Data Binding) 替代直接操作文本串**
>
> 对于新项目，我们建议使用 [数据绑定](/runtimes/data-binding.md) 来动态更新文本内容。
> 直接文本串操作仍然可用，但数据绑定提供了更强大和灵活的解决方案。

## [​](#overview) 概览

本页介绍如何在运行时读取和更新 Rive 文件中的文本内容。

有关在编辑器中设计和动画文本的信息，请参阅 [文本概览](/editor/text/overview.md)。

## [​](#read-update-text-runs-at-runtime) 在运行时读取/更新文本串

### Web (JS) - 高级 API

```javascript
const r = new rive.Rive({
  src: "my-file.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  stateMachines: "State Machine 1",
  onLoad: () => {
    // 获取文本串
    const textRun = r.getTextRunValue("MyTextRun");
    console.log("当前文本:", textRun);
    
    // 设置新文本
    r.setTextRunValue("MyTextRun", "新的文本内容");
  },
});
```

### Flutter

```dart
// 使用 RiveWidgetController
controller.artboard?.textRun("MyTextRun")?.text = "新的文本内容";

// 读取文本
final currentText = controller.artboard?.textRun("MyTextRun")?.text;
```

### iOS/macOS (Swift)

```swift
// 设置文本
riveViewModel.setTextRun("MyTextRun", value: "新的文本内容")

// 读取文本
let currentText = riveViewModel.getTextRun("MyTextRun")
```

### Android (Kotlin)

```kotlin
// 设置文本
riveAnimationView.setTextRunValue("MyTextRun", "新的文本内容")

// 读取文本
val currentText = riveAnimationView.getTextRunValue("MyTextRun")
```

## [​](#read-update-nested-text-runs-at-runtime) 读取/更新嵌套文本串

如果文本串位于嵌套的画板（组件）中，你需要指定路径：

### Web (JS)

```javascript
// 获取嵌套画板中的文本串
const nestedText = r.getTextRunValue("MyTextRun", "NestedArtboardName");

// 设置嵌套文本
r.setTextRunValue("MyTextRun", "新文本", "NestedArtboardName");
```

### Flutter

```dart
// 获取嵌套组件实例
final nestedArtboard = controller.artboard?.component("NestedComponent");
nestedArtboard?.textRun("MyTextRun")?.text = "新的文本内容";
```

## [​](#fallback-fonts) 备用字体

如果你的 Rive 文件使用了用户设备上可能不存在的字体，你可以指定备用字体：

### Web (JS)

```javascript
// 在加载时设置备用字体
const r = new rive.Rive({
  src: "my-file.riv",
  canvas: document.getElementById("canvas"),
  assetLoader: (asset, bytes) => {
    if (asset.isFont) {
      // 加载自定义字体
      fetch("/fonts/my-fallback-font.ttf")
        .then(res => res.arrayBuffer())
        .then(buffer => {
          asset.decode(new Uint8Array(buffer));
        });
      return true;
    }
    return false;
  },
});
```

## [​](#semantics-for-accessibility) 无障碍语义

在 Flutter 中，你可以为 Rive 文本添加无障碍语义：

```dart
Semantics(
  label: "欢迎标题",
  child: RiveWidget(controller: controller),
)
```

[数据绑定 (Data Binding)](/runtimes/data-binding.md)[加载资源 (Loading Assets)](/runtimes/loading-assets.md)
