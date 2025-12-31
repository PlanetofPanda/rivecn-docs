---
title: "状态机 (State Machines)"
---

import LegacyApiNotice from '/snippets/unity/legacy-api-notice.mdx';

在 Unity 中与 Rive 状态机进行交互。

有关 Rive 状态机的更多信息，请查阅相应的[运行时](/runtimes/state-machines)及[编辑器](/editor/state-machine)文档。

**[状态机 (State Machines)](/runtimes/state-machines/)**

    （运行时）Rive 的状态机提供了一种将一组动画组合在一起并管理它们之间切换的方式。这种切换是通过一系列可以编程控制的输入（Inputs）来实现的。

**[状态机 (State Machines)](/editor/state-machine/)**

    （编辑器）状态机是一种可视化地连接动画并定义驱动过渡逻辑的方式。

## 概览 (Overview)

状态机（StateMachine）在画板（Artboard）中推进（播放）动画。

### 组件 API (Components)

**Rive Widget** 会根据 [您的画板配置设置](/game-runtimes/unity/fundamentals#artboards) 自动加载并推进状态机。以下是在脚本中访问已加载状态机的方法：

```csharp
[SerializeField] private RiveWidget m_riveWidget;

...

void OnEnable()
{
    m_riveWidget.OnWidgetStatusChanged += OnWidgetStatusChanged;
}

private void OnWidgetStatusChanged()
{
    // 在访问状态机之前，先等待 Rive Widget 加载完成。
    if (m_riveWidget.Status == WidgetStatus.Loaded)
    {
        StateMachine m_stateMachine = m_riveWidget.StateMachine;
    }
}

void OnDisable()
{
    m_riveWidget.OnWidgetStatusChanged -= OnWidgetStatusChanged;
}
```

### 旧版 API (Legacy API)

::: warning
**旧版 API 通知**
:::

 状态机是从画板（Arboard）实例中实例化的：

```csharp
private StateMachine m_stateMachine;

...

m_stateMachine = m_artboard?.StateMachine(); // 默认状态机
m_stateMachine = m_artboard?.StateMachine(0); // 按索引获取状态机
m_stateMachine = m_artboard?.StateMachine("Name"); // 按名称获取状态机
```

 通过调用 `Advance` 并传入增量时间（delta time）来播放状态机：

```csharp
private void Update()
{
    m_stateMachine?.Advance(Time.deltaTime);
}
```
