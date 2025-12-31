---
title: '日志记录 (Logging)'
description: ''
---

某些 Rive 运行时包含日志记录功能，以帮助调试。这些日志 *仅* 用于调试目的；不会通过网络发送任何内容，也不会记录任何个人身份信息 (PII)。下表展示了支持日志记录的运行时。

### Apple

#### Swift

```swift
RiveLogger.isEnabled = true // 启用日志；默认为 false
RiveLogger.levels = [.debug] // 过滤日志级别；默认为所有级别
RiveLogger.categories = [.viewModel] // 过滤分类；默认为所有分类
RiveLogger.isVerbose = true // 包含详细日志；默认为 false
```

#### 级别 (Levels)

日志将以各种级别记录，类似于 `OSLogType`。这些级别可用于额外过滤仅在某些级别记录的日志。可用级别为：

- Debug (调试)：最常用，用于辅助调试
- Info (信息)：提供附加信息的日志
- Default (默认)：默认日志级别；但许多日志为 `debug` 级别
- Error (错误)：发生错误时使用
- Fault (故障)：发生严重（致命）错误时使用

#### 分类 (Categories)

日志按分类拆分；运行时的各个部分被拆分为独立的日志，以支持过滤。可用分类为：

- State machine (状态机)：活跃状态机内发生的操作，例如接收事件
- Artboard (画板)：活跃画板内发生的操作，例如步进 (advancing)（详细模式）
- View model (视图模型)：加载的 `RiveViewModel` 内发生的操作，例如触发/设置输入
- Model (模型)：加载的 `RiveModel` 内发生的操作，例如设置状态机/画板
- File (文件)：加载的 `RiveFile` 内发生的操作，例如资源加载
- View (视图)：`RiveView` 内发生的操作，例如播放器事件（播放/暂停/停止/重置）

#### 详细日志 (Verbose Logs)

某些日志是详细的 (verbose)，意味着它们会持续流式传输日志。这些日志的示例包括视图前进和绘图验证。详细日志默认禁用；请参阅上文了解如何启用详细日志记录。
