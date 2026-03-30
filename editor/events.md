---
title: "事件概览 (Events Overview) - Rive 编辑器"
description: "事件 (Events) 如果你正在使用 数据绑定 (Data Binding)，你可以直接从代码中监听触发器或值变化，而无需额外使用“事件”。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 事件概览
---

事件 (Events)

# 事件概览 (Events Overview)

如果你正在使用 [数据绑定 (Data Binding)](/editor/data-binding/overview.md)，你可以直接从代码中监听触发器或值变化，而无需额外使用“事件”。

**事件**是一种在精确时刻向运行时代码发送信号的方法。它们通过传递有用信息来增强设计师与开发者之间的沟通。利用事件，我们可以触发诸如：打开网页（URL）、播放音效、显示特定的 HTML 元素，或者任何可以通过代码实现的逻辑。

在设计阶段和运行时协调好 Rive 事件，对于在应用、游戏等场景下的成功集成至关重要。

## [​](#creating-an-event) 创建事件 (Creating an Event)

要创建事件，请使用位于工具栏中的 **事件工具 (Events tool)**。激活工具后，点击画板上的任意位置即可添加一个新事件。
![添加新事件示例](https://help.rive.app/images/image_0.png)
你会发现事件会同时显示在舞台画板上和层级面板 (Hierarchy) 中。

## [​](#configuring-an-event) 配置事件 (Configuring an Event)

添加事件后，我们需要在检查器 (Inspector) 中进行配置。
![检查器中的事件配置](https://help.rive.app/images/45fd9a33-3b9f-4e29-bc82-c0a8dca96abd.webp)

### [​](#name) 名称 (Name)

名称字段用于给事件指定唯一标识。这非常重要，因为在运行时，开发者需要根据这个名称来挂载代码逻辑。
![重命名事件](https://help.rive.app/images/image_2.png)
你也可以直接在画板上点击名称进行修改。

### [​](#type) 类型 (Type)

类型下拉菜单允许你在这两种事件类型间切换：**General (通用)** 和 **URL**。

### [​](#properties) 属性 (Properties)

属性允许你向运行时传递额外的信息。例如，你可能想传递一个音频文件的名称，以便在事件上报时播放对应的声音，或者传递一些用于数据分析的元数据。
点击属性旁边的“加号”按钮即可添加新属性。
![添加新属性](https://help.rive.app/images/image_4.png)
你需要为属性重命名，并选择其跟踪的值类型（数字、布尔值或字符串）。

### [​](#url) URL

当选择 `Open URL` 事件时，会出现额外的配置：
![URL 配置示例](https://help.rive.app/images/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2FrDR98sXAUkNZXqBbv0sy%2FCleanShot%202023-09-18%20at%2013.06.14%402x.png)
- **URL**：在文本框中输入目标网址（确保包含 `http://` 或 `https://`）。
- **Target (目标)**：告诉浏览器在哪里打开 URL。
  - `Blank`：通常在**新页签**打开。
  - `Parent`：在父浏览上下文中打开。
  - `Self`：在当前页面打开。
  - `Top`：在顶层浏览上下文中打开。

## [​](#signaling-an-event) 发射信号 (Signaling an Event)

我们可以通过三种方式触发（发射）事件：通过时间轴、在状态上、或在过渡上。

### [​](#timeline) 时间轴 (Timeline)

在时间轴上触发事件允许你控制代码执行的精确时间点（例如配合音效）。
选中目标时间轴，将播放头移至特定时间，点击检查器中的 **“Report Event”** 按钮。
![在时间轴关键帧上报告事件](https://help.rive.app/images/image_7.png)

### [​](#transition-&-state) 过渡与状态 (Transition & State)

你可以在**过渡 (Transition)** 或 **状态 (State)** 上报告事件。这通常用于向运行时提供关于状态机所处位置的状态上下文信息。
选中目标状态或过渡，点击检查器中 Events 区域的加号。
![在状态或过渡中报告事件](https://help.rive.app/images/image_8.png)
下拉菜单允许你选择之前定义的任何事件。你可以决定是在状态/过渡的**开始 (Start)** 还是**结束 (End)** 时发出信号。

## [​](#events-at-runtime) 运行时中的事件

有关如何在运行时监听事件的更多信息，请查阅 [Rive 事件 (Runtimes)](/runtimes/rive-events) 章节。

[图层 (Layers)](/editor/state-machine/layers.md)[音频事件](/editor/events/audio-events)