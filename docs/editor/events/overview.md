---
title: '事件概览 (Events Overview)'
description: ''
---

::: info
如果您正在使用[数据绑定 (Data Binding)](/editor/data-binding)，您可以直接从代码中监听触发器或数值变化，无需使用"事件"。
:::

"事件"（Events）是一种向运行时代码发送信号，以便在合适的时机执行代码块的方式。它们通过传递有用的信息来加强设计师和开发者之间的沟通。利用它们，我们可以执行诸如跳转到某个 URL、播放声音、显示某些 HTML 元素，或者完成任何我们想通过代码实现的其它功能。

在设计阶段和运行时协调好 Rive 事件，对于确保在应用、游戏等场景中成功集成至关重要。

## 创建事件

要创建事件，请使用工具栏中的"事件"（Events）工具。激活该工具后，在画板上的任意位置点击即可添加一个新事件。

![Adding a new event](https://ucarecdn.com/4ed6c563-4c59-42c8-b40c-f502d5a8e1a4/)

您会注意到事件已显示在画板和层级结构中。

## 配置事件

添加事件后，我们需要使用检查器（Inspector）来配置该事件。

![Inspector view for the Event](/images/editor/events/45fd9a33-3b9f-4e29-bc82-c0a8dca96abd.webp)

### 名称 (Name)

"名称"字段是我们可以为事件指定特定名称的地方。这样做非常重要，以便在运行时，我们可以将正确的代码片段与其对应的事件连接起来。

![Renaming an Event](https://ucarecdn.com/4558fb61-4649-4210-9ec6-c828c48ab2b2/)

您也可以直接在画板上重命名事件。

### 类型 (Type)

"类型"下拉菜单允许您在"常规"（General）和 "URL" 之间更改事件类型。

![Image](https://ucarecdn.com/9621c007-de2e-428c-95d7-837615a37caa/)

### 属性 (Properties)

"属性"允许我们定义传递给运行时的额外信息。例如，您可能希望在运行时报告事件时传递要播放的音频文件的名称，或者用于数据分析的一些其它元数据。

要添加新属性，请点击 "Properties" 旁边的加号按钮。

![Add New Property](https://ucarecdn.com/d4cd3b8f-3765-4c28-9204-e5daf7fff0d8/)

首先，我们需要将属性名称更改为一个可识别的名称。接下来，我们需要选择该属性将跟踪的值类型，如数字（Number）、布尔值（Boolean）或字符串（String）。

![Rename and select input](https://ucarecdn.com/73d05fb1-7c9c-4c9c-a17c-51781ef30d0e/)

### URL

当选择 "Open URL"（打开 URL）事件时，我们会有额外的配置选项。

"打开 URL" 事件的属性：

![Image](https://1159711764-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2FrDR98sXAUkNZXqBbv0sy%2FCleanShot%202023-09-18%20at%2013.06.14%402x.png?alt=media&token=0c681b87-2667-48d3-aa24-3b550732032e)

在文本框中，我们将添加希望组件引导我们前往的 URL。

::: info
如果您想链接到一个新域名，请确保包含 URL 协议（即 "http://" 或 "https://"）。
:::

"目标"（Target）告诉用户的浏览器该 URL 应该在哪里打开。我们有几个选项：Blank（新窗口/标签页）、Parent（父窗口）、Self（当前窗口）和 Top（顶层窗口）。

- `Blank` - 通常在新标签页中打开链接，但用户可以配置浏览器改为在新窗口中打开。**注意：** 如果事件不是由 Rive 监听器触发的，浏览器可能会阻止该操作并通知用户弹窗已被拦截。
- `Parent` - 在当前上下文的父浏览上下文中打开。如果没有父级，表现与 `Self` 一致。
- `Self` - 在当前浏览上下文中打开。
- `Top` - 在最顶层的浏览上下文中打开（即当前上下文祖先中"最高"的那个）。如果没有祖先，表现与 `Self` 一致。

::: info
目前，由于安全考虑，当此类事件在共享链接或市场帖子中被报告时，Rive 默认不会打开 URL。不过，未来这种情况可能会发生变化。
:::

## 发送（报告）事件信号

我们可以通过三种方式发送事件信号：通过时间轴、在状态上或在过渡上。

### 时间轴 (Timeline)

通过时间轴发送事件信号允许我们精确控制一段代码启动的时刻，比如音效。

首先，选择您想要添加事件的时间轴。接下来，使用检查器中的 "Report Event"（报告事件）按钮。请注意，此关键帧将放置在播放头所在的位置。

![Keying an Event on the timeline](https://ucarecdn.com/bd8d36f9-9cd1-4eec-9c37-85d4a0a19643/)

此外，您可以为属性设置关键帧，让运行时知道某个特定的布尔值、数字或字符串属性有了新值。

### 过渡 (Transition) 和状态 (State)

您可以在"过渡"或"状态"上报告事件。我们通常这样做是为了在运行时发送关于状态机中正在发生什么的上下文信息。例如，如果我们希望某个元素在过渡结束时出现，我们会使用绑定到该过渡的事件来发出信号。

要报告事件，请选择所需的"状态"或"过渡"，并使用检查器中 "Events" 部分旁边的加号按钮。

![Signaling an Event via State or Transition](https://ucarecdn.com/d1a63666-0cce-408f-9364-826eed66b241/)

下拉菜单允许我们选择已定义的任何事件。选定事件后，我们可以决定它是在过渡或状态的开始还是结束时发出信号。

## 运行时中的事件

欲了解更多关于如何在运行时监听事件的信息，请查看 [Rive 事件 (Runtimes)](/runtimes/rive-events) 部分。