---
title: '常见问题 (FAQ)'
description: ''
---

# 如何开启 ProMotion 显示屏支持？

在 iOS 上支持 ProMotion 需要做两件事：

1. 使用 Apple 运行时中的 API 设置所需的 FPS（范围）
2. 在应用的 `Info.plist` 文件中添加额外条目

## 用法示例

```swift
let preferredFPS = UIScreen.main.maximumFramesPerSecond
// 或者
let preferredFPSRange = CAFrameRateRange(minimum: 60, maximum: Float(preferredFPS))
let viewModel = {
    let viewModel = RiveViewModel(fileName: "...")
    viewModel.setPreferredFramesPerSecond(preferredFramesPerSecond: preferredFPS)
    // 或者
    viewModel.setPreferredFrameRateRange(preferredFPSRange)
    return viewModel
}()
```

此外，在应用的 `Info.plist` 文件中添加以下内容：

`<key>CADisableMinimumFrameDurationOnPhone</key><true/>`

您可以在 [此处](https://developer.apple.com/documentation/quartzcore/cadisplaylink/1648421-preferredframespersecond) 查看有关首选 FPS 的更多信息，在 [此处](https://developer.apple.com/documentation/quartzcore/cadisplaylink/3875343-preferredframeraterange) 查看有关首选 FPS 范围的更多信息。

# 为什么资源占用与其他库不同？

请参阅我们的 [资源占用 (Resource Usage)](/runtimes/apple/resource-usage) 文档了解更多详情。
