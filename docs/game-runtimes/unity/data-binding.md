---
title: '数据绑定'
description: '在 Unity 代码与 Rive 数据之间建立绑定联系'
---

import LegacyApiNotice from '/snippets/unity/legacy-api-notice.mdx';

数据绑定允许您在 Unity 代码与 Rive 图形之间建立连接。这创建了一个双向的响应式系统：代码中的更改会影响 Rive 设计，而设计中的更改则可以触发代码中的逻辑响应。

### 组件 API（推荐）

## 在检查器中进行自动绑定

使用数据绑定最简单的方法是通过 Unity 检查器（Inspector）。**Rive Widget** 组件包含一个 **Data Binding Mode**（数据绑定模式）设置，提供三个选项：

![Data Binding Mode dropdown in Unity Inspector showing Auto Bind options](/images/unity/widget-db-binding-mode-dropdown.jpg)

- **Auto Bind Default (自动绑定默认)**：自动绑定默认的视图模型实例（在 Rive 编辑器中被标记为 "Default" 的实例）。
- **Auto Bind Selected (自动绑定选定)**：允许您通过下拉菜单选择一个特定的实例。
- **Manual (手动)**：需要您通过代码手动设置绑定（详情请参阅[数据绑定文档](/runtimes/data-binding)）。

## 使用示例

一旦您的 **Rive Widget** 绑定到了视图模型实例，您就可以在 Unity 脚本中访问并修改其属性。以下示例展示了如何获取、设置以及观察不同类型的原始属性。

要更深入地了解数据绑定概念及其高级用法（例如数据绑定[列表](/runtimes/data-binding#lists)或[画板](/runtimes/data-binding#artboards)），请参阅通用[数据绑定文档](/runtimes/data-binding)。

```csharp
using UnityEngine;
using Rive;
using Rive.Components;

public class DataBindingExample : MonoBehaviour
{
    [SerializeField] private RiveWidget riveWidget;

    private ViewModelInstanceNumberProperty numberProperty;
    private ViewModelInstanceStringProperty stringProperty;
    private ViewModelInstanceBooleanProperty boolProperty;
    private ViewModelInstanceColorProperty colorProperty;
    private ViewModelInstanceEnumProperty enumProperty;
    private ViewModelInstanceTriggerProperty triggerProperty;

    private void OnEnable()
    {
        riveWidget.OnWidgetStatusChanged += HandleWidgetStatusChanged;
    }

    private void OnDisable()
    {
        riveWidget.OnWidgetStatusChanged -= HandleWidgetStatusChanged;
    }

    private void HandleWidgetStatusChanged()
    {
        // 在访问视图模型实例前，检查挂件是否已加载完成
        if (riveWidget.Status == WidgetStatus.Loaded)
        {
            ViewModelInstance viewModelInstance = riveWidget.StateMachine.ViewModelInstance;

            //==========================================================================
            // 字符串属性 (STRING PROPERTIES)
            //==========================================================================
            stringProperty = viewModelInstance.GetStringProperty("title");
            Debug.Log($"String value: {stringProperty.Value}");
            stringProperty.Value = "New Text";
            stringProperty.OnValueChanged += OnStringPropertyChanged;

            //==========================================================================
            // 数值属性 (NUMBER PROPERTIES)
            //==========================================================================
            numberProperty = viewModelInstance.GetNumberProperty("count");
            Debug.Log($"Number value: {numberProperty.Value}");
            numberProperty.Value = 42.5f;
            numberProperty.OnValueChanged += OnNumberPropertyChanged;

            //==========================================================================
            // 布尔属性 (BOOLEAN PROPERTIES)
            //==========================================================================
            boolProperty = viewModelInstance.GetBooleanProperty("isActive");
            Debug.Log($"Boolean value: {boolProperty.Value}");
            boolProperty.Value = true;
            boolProperty.OnValueChanged += OnBoolPropertyChanged;

            //==========================================================================
            // 颜色属性 (COLOR PROPERTIES)
            //==========================================================================
            colorProperty = viewModelInstance.GetColorProperty("backgroundColor");
            // 使用 Unity Color (浮点值 0-1)
            Color currentColor = colorProperty.Value;
            colorProperty.Value = UnityEngine.Color.red;
            // 或者使用 Color32 (字节值 0-255)
            Color32 currentColor32 = colorProperty.Value32;
            colorProperty.Value32 = new Color32(0, 255, 0, 255); // 绿色
            colorProperty.OnValueChanged += OnColorPropertyChanged;

            //==========================================================================
            // 枚举属性 (ENUM PROPERTIES)
            //==========================================================================
            enumProperty = viewModelInstance.GetEnumProperty("category");
            Debug.Log($"Enum current value: {enumProperty.Value}");
            Debug.Log($"Enum available values: {string.Join(", ", enumProperty.EnumValues)}");
            enumProperty.Value = "option_name";
            enumProperty.OnValueChanged += OnEnumPropertyChanged;

            //==========================================================================
            // 触发器属性 (TRIGGER PROPERTIES)
            //==========================================================================
            triggerProperty = viewModelInstance.GetTriggerProperty("onSubmit");
            triggerProperty.Trigger(); // 激活触发器
            triggerProperty.OnTriggered += OnTriggerPropertyFired;
        }
    }

    private void OnNumberPropertyChanged(float newValue)
    {
        Debug.Log($"数值变更为: {newValue}");
    }

    private void OnStringPropertyChanged(string newValue)
    {
        Debug.Log($"字符串变更为: {newValue}");
    }

    private void OnBoolPropertyChanged(bool newValue)
    {
        Debug.Log($"布尔值变更为: {newValue}");
    }

    private void OnColorPropertyChanged(UnityEngine.Color newValue)
    {
        Debug.Log($"颜色变更为: {ColorUtility.ToHtmlStringRGBA(newValue)}");
    }

    private void OnEnumPropertyChanged(string newValue)
    {
        Debug.Log($"枚举变更为: {newValue}");
    }

    private void OnTriggerPropertyFired()
    {
        Debug.Log("触发器已激活!");
    }

    private void OnDestroy()
    {
        // 移除属性监听器
        if (numberProperty != null) numberProperty.OnValueChanged -= OnNumberPropertyChanged;
        if (stringProperty != null) stringProperty.OnValueChanged -= OnStringPropertyChanged;
        if (boolProperty != null) boolProperty.OnValueChanged -= OnBoolPropertyChanged;
        if (colorProperty != null) colorProperty.OnValueChanged -= OnColorPropertyChanged;
        if (enumProperty != null) enumProperty.OnValueChanged -= OnEnumPropertyChanged;
        if (triggerProperty != null) triggerProperty.OnTriggered -= OnTriggerPropertyFired;
    }
}
```

您可以探索 [示例嬉戏项目](https://github.com/rive-app/rive-unity-examples) 中的 **RewardsDataBinding** 场景，查看 Unity 中的实际应用。

### 旧版 API (Legacy API)

::: warning
**旧版 API 通知**
:::

 如果您选择使用低级 API 来控制渲染循环，则需要在脚本中手动设置数据绑定。

 作为参考，您可以查看此 [RiveScreen 示例](https://github.com/rive-app/rive-unity/blob/main/examples/basic/Assets/GameRuntime/RiveScreen.cs)，它展示了在自定义渲染循环中实现自动绑定的一种方式。

::: info
使用低级 API 需要额外的实现工作，并需要对 Rive 运行时有深入理解。除非您有设置自定义渲染循环的特定需求，否则我们强烈建议使用组件 API。
:::
