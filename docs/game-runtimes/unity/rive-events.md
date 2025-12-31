---
title: 'Rive 事件 (Rive Events)'
description: '在 Unity 中访问 Rive 事件。'
---

import LegacyDataBindingNotice from '/snippets/unity/legacy-databinding-notice.mdx';
import LegacyApiNotice from '/snippets/unity/legacy-api-notice.mdx';

<LegacyDataBindingNotice subject="Events" />

有关 Rive 事件的更多信息，请查阅相应的运行时及编辑器文档。

**[Rive 事件 (Rive Events)](/runtimes/rive-events)**

    利用 Rive 事件，您可以订阅从动画、状态机以及 Rive 监听器中发出的重要信号，所有这些事件均在设计阶段由 Rive 编辑器创建。

**[事件 (Events)](/editor/events/overview)**

    事件是一种向运行时代码发送信号的方法，用于在恰当的时机执行一段代码。通过传递有用的信息，它们增强了设计师与开发者之间的沟通。

## 访问事件 (Accessing Events)

以下代码展示了如何访问从当前活跃状态机中报告的所有 Rive 事件。

### 组件 API (Components)

通过引用 **Rive Widget**，您可以在脚本中订阅 `OnRiveEventReported` 事件：

```csharp
...

private void OnEnable()
{
    m_riveWidget.OnRiveEventReported += HandleRiveEventReported;
}

private void OnDisable()
{
    m_riveWidget.OnRiveEventReported -= HandleRiveEventReported;
}
```

### 旧版 API (Legacy API)

::: warning
**旧版 API 通知**
:::

```csharp
...

foreach (var reportedEvent in m_stateMachine?.ReportedEvents() ?? Enumerable.Empty<ReportedEvent>())
{
    Debug.Log($"收到事件，名称: \"{reportedEvent.Name}\", 延迟秒数: {reportedEvent.SecondsDelay}");
}

// 重要！在访问事件后调用 advance。
m_stateMachine?.Advance(Time.deltaTime);
```

`ReportedEvents()` 方法将返回一个 `ReportedEvents` 列表。

让我们来看一个星级评分 Rive 文件的代码片段。如果报告的事件名称为 **Star**，则系统会从事件数据（自定义属性）中检索类型为 `float` 的 **rating** 属性和类型为 `string` 的 **message** 属性。

```csharp
private void HandleRiveEventReported(ReportedEvent reportedEvent)
{
    Debug.Log($"收到事件，名称: \"{reportedEvent.Name}\", 延迟秒数: {reportedEvent.SecondsDelay}");
    
    if (reportedEvent.Name == "Star")
    {
           // 您可以直接访问属性并进行强制类型转换
           if (reportedEvent.Properties.TryGetValue("rating", out object rating))
           {
               float ratingValue = (float)rating;
               Debug.Log($"评分: {ratingValue}");
           }

           if (reportedEvent.Properties.TryGetValue("message", out object message))
           {
               string messageValue = message as string;
               Debug.Log($"消息: {messageValue}");
           }

            /*
            // 若要以类型安全的方式访问属性，请使用 TryGet* 系列方法
            for (uint i = 0; i < reportedEvent.PropertyCount; i++)
            {
                ReportedEvent.Property property = reportedEvent.GetProperty(i);

                if (property.Name == "rating" && property.TryGetNumber(out float ratingValue))
                {
                    Debug.Log($"评分: {ratingValue}");
                }
                else if (property.Name == "message" && property.TryGetString(out string messageValue))
                {
                    Debug.Log($"消息: {messageValue}");
                }
            }
             */
    }
}
```

- 可以读取的属性类型包括 **bool**、**string** 和 **float**。
- 可以使用 `reportedEvent.Properties` 访问所有属性的字典。

### 额外资源

要查看详细示例，请参考 [示例库](https://github.com/rive-app/rive-unity-examples) 中的 **getting-started** 项目，并打开 **EventsScene** 场景。