---
title: "布局 (Layout) - Rive 运行时"
description: "运行时 (Runtimes) 在运行时控制 Rive 画板的布局和适配。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 运行时, 布局
---

运行时 (Runtimes)

# 布局 (Layout)

在运行时控制 Rive 画板的布局和适配。

## [​](#overview) 概览

Rive 运行时提供了灵活的布局选项，让你控制动画如何适应其容器。

## [​](#fit-options) 适应选项 (Fit)

| 选项 | 描述 |
|------|------|
| `contain` | 保持宽高比，确保整个画板可见 |
| `cover` | 保持宽高比，填满容器（可能裁剪） |
| `fill` | 拉伸填满容器（可能变形） |
| `fitWidth` | 适应宽度，高度按比例缩放 |
| `fitHeight` | 适应高度，宽度按比例缩放 |
| `none` | 不缩放，使用原始尺寸 |
| `scaleDown` | 仅在需要时缩小，不放大 |

## [​](#alignment-options) 对齐选项 (Alignment)

| 选项 | 描述 |
|------|------|
| `center` | 居中对齐 |
| `topLeft` | 左上角对齐 |
| `topCenter` | 顶部居中 |
| `topRight` | 右上角对齐 |
| `centerLeft` | 左侧居中 |
| `centerRight` | 右侧居中 |
| `bottomLeft` | 左下角对齐 |
| `bottomCenter` | 底部居中 |
| `bottomRight` | 右下角对齐 |

## [​](#examples) 示例

### Web (JS)

```javascript
const r = new rive.Rive({
  src: "my-file.riv",
  canvas: document.getElementById("canvas"),
  layout: new rive.Layout({
    fit: rive.Fit.Contain,
    alignment: rive.Alignment.Center,
  }),
});
```

### Flutter

```dart
RiveWidget(
  controller: controller,
  fit: Fit.contain,
  alignment: Alignment.center,
)
```

### iOS/macOS (Swift)

```swift
riveViewModel.fit = .contain
riveViewModel.alignment = .center
```

### Android (Kotlin)

```xml
<app.rive.runtime.kotlin.RiveAnimationView
    app:riveFit="CONTAIN"
    app:riveAlignment="CENTER" />
```

## [​](#responsive-layouts) 响应式布局

对于需要响应不同屏幕尺寸的场景，建议使用 Rive 的 [布局功能](/editor/layouts/overview.md)：

- 使用 `Fit.layout` 让 Rive 画板响应容器大小变化
- 在编辑器中设置约束和布局参数
- 运行时自动适配不同尺寸

[状态机播放](/runtimes/state-machines.md)[数据绑定](/runtimes/data-binding.md)
