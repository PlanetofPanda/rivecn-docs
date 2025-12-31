---
title: "输入 (Inputs)"
description: ""
---

import LegacyDataBindingNotice from '/snippets/unity/legacy-databinding-notice.mdx';

<LegacyDataBindingNotice subject="Inputs" />

## 访问输入 (Accessing Inputs)

状态机共有三种输入类型，每种都继承自 `SMIInput`（State Machine Input）：

- `SMIBool`：包含一个 `.Value` 属性，一个可以设置为 true 或 false 的布尔值。
- `SMITrigger`：一个特殊的布尔值，通过调用 `.Fire()` 方法在单一帧内被设置为 true。
- `SMINumber`：包含一个 `.Value` 属性，一个可以设置为任何数值的浮点数。

可以通过多种不同方式访问状态机输入。

#### 按名称访问

根据名称和类型检索状态机输入。

**触发器 (Trigger)：**
```csharp
SMITrigger someTrigger = m_stateMachine.GetTrigger("icon_02_press_trig");
if (someTrigger != null)
{
    someTrigger.Fire();
}
```

**布尔值 (Bool)：**
```csharp
SMIBool someBool = m_stateMachine.GetBool("centerHover");
if (someBool == null) return;
Debug.Log(someBool.Value);
someBool.Value = !someBool.Value;
Debug.Log(someBool.Value);
```

**数值 (Number)：**
```csharp
SMINumber someNumber = m_stateMachine.GetNumber("rating");
if (someNumber == null) return;
Debug.Log(someNumber.Value);
someNumber.Value = 4;
Debug.Log(someNumber.Value);
```

#### 按索引访问

获取输入总数（长度）并按索引检索：
```csharp
Debug.Log(m_stateMachine.InputCount());
SMIInput input = m_stateMachine.Input(1);
```

#### 访问所有输入

检索所有 `SMIInputs` 的列表：
```csharp
var inputs = m_riveStateMachine.Inputs();
foreach (var input in inputs)
{
    switch (input)
    {
        case SMITrigger smiTrigger:
        {
            // 处理触发器逻辑
            break;
        }
        case SMIBool smiBool:
        {
            // 处理布尔逻辑
            break;
        }
        case SMINumber smiNumber:
        {
            // 处理数值逻辑
            break;
        }
    }
}
```

## 访问嵌套输入 (Accessing Nested Inputs)

有关访问组件中嵌套输入的更多信息，请查看此[示例](/runtimes/inputs#nested-inputs)。

### 额外资源

要查看详细示例，请参考 [示例库](https://github.com/rive-app/rive-unity-examples) 中的 **getting-started** 项目，并打开 **StateMachineInputScene** 场景。进入 **Play** 模式，您可以在检查器的 **Main Camera** 组件上，与该动画所有可用的状态机输入进行交互。
