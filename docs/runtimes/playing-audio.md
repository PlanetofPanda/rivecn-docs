---
title: "播放音频 (Playing Audio)"
description: "播放 Rive 音频事件"
---

要了解有关如何将音频添加到 Rive 文件的更多信息，请参阅：[音频事件 (Audio Events)](/editor/events/audio-events)。

::: warning
在 Web 端，某些浏览器会限制音频播放，直到网页被交互。这适用于任何音频，不只是 Rive 音频。
  网页在播放声音之前需要接收某种交互（触摸/点击）。这种交互可以是浏览器上的任何操作，不一定必须是 Rive 特定的交互。
:::

## 嵌入资源 (Embedded Assets)

嵌入资源不需要额外的工作即可播放音频。但在某些平台上，可能需要额外的工作来设置音频混音、避让 (ducking) 或以其他方式更改音频播放的全局设置。见下文的 **音频设置**。

## 引用资源 (Referenced Assets)

引用资源需要多一点工作来播放音频。音频仍将自动播放，但在 Rive 运行时尝试播放音频时必须已加载音频文件。更多信息请参阅 [资源加载 (Loading Assets)](/runtimes/loading-assets)。

### Apple

```swift IOS
    // 加载一个引用的音频文件，其名称和扩展名与编辑器中添加的一致
    let viewModel = RiveViewModel(fileName: "my_rive_file") { asset, data, factory -> Bool in
        guard let audioAsset = asset as? RiveAudioAsset else {
            return false
        }
    
        guard let url = Bundle.main.url(
            forResource: audioAsset.uniqueName(),
            withExtension: audioAsset.fileExtension()
        ) else {
            print("未能从 bundle 加载资产 \(asset.uniqueFilename())。")
            return false
        }
    
        guard let data = try? Data(contentsOf: url) else {
            print("未能从 bundle 加载 \(url)。")
            return false
        }
    
        audioAsset.audio(factory.decodeAudio(data))
        return true
    }
```

## 音频设置 (Audio Settings)

### Apple

在 iOS 上，播放音频将遵循您的 `AVAudioSession` 共享实例设置。有关更多信息，请参阅 Apple 关于 [`AVAudioSession`](https://developer.apple.com/documentation/avfaudio/avaudiosession) 的文档。使用此功能，您可以选择混音、避让音频等。如果您希望确保所有 Rive 音频都以正确的设置播放，可以在应用生命周期的早期更新您的共享实例。

```swift IOS
    // 示例：忽略静音开关，并与其他音频混音
    let category: AVAudioSession.Category = .playback
    let options: AVAudioSession.CategoryOptions = [.mixWithOthers]
    AVAudioSession.sharedInstance().setCategory(category, options: options)
```

## 设置音量 (Setting Volume)

画板能够设置其音量。父画板将设置所有组件实例的音量；然而，设置组件的音量 **不会** 更新父画板的音量。

```swift IOS
// 将当前画板的音量设置为 50%
let viewModel = RiveViewModel(fileName: "my_rive_file")
viewModel.riveModel?.volume = 0.5
```