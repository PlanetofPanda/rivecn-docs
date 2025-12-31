---
title: "数据绑定用法 (Data Binding Usage)"
description: "将 Rive 数据绑定到 Unreal"
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

本指南介绍了在 Unreal 中使用 ViewModel 系统的各种方式。通过使用动态的 ViewModelInstance，该系统实现了在 Unreal 嬉戏逻辑与 Rive 动画之间绑定并同步数据的功能。

### 1. **加载 ViewModel**

从 `.riv` 文件中获取 ViewModel：
```cpp
URiveViewModel* ViewModel = RiveFile->GetViewModelByName(TEXT("PlayerData"));
```

您也可以通过索引获取 ViewModel，或者使用 `GetInstanceNames()` 列出所有 ViewModel 实例的名称。

### 2. **创建 ViewModel 实例 (Instance)**

创建一个 ViewModel 实例来保存运行时的属性值：
```cpp
URiveViewModelInstance* Instance = ViewModel->CreateInstance();
```

您也可以创建一个默认的预定义实例：
```cpp
URiveViewModelInstance* Default = ViewModel->CreateDefaultInstance();
```

或者根据名称创建特定的实例：
```cpp
URiveViewModelInstance* Instance = ViewModel->CreateInstanceFromName(TEXT("MyInstance"));
```

### 3. **将实例绑定到画板**

将 ViewModel 实例绑定到 `URiveArtboard` 以建立数据上下文：
```cpp
Artboard->SetViewModelInstance(Instance);
```

此操作会将实例传播到画板及其关联的 `FRiveStateMachine`，从而确保行为同步。同样地，在状态机上设置 ViewModel 实例也会将其设置到该状态机的画板上。\
\
这些操作也可以通过蓝图（Blueprints）来完成：\
![Databindinginit Pn](/images/unreal/databindinginit.png)

### 4. **通过 ViewModel 实例访问或修改属性**

`URiveViewModelInstance` 暴露了强类型的辅助访问器（Accessors），无需直接访问底层属性即可更改或读取值：

#### ✅ 布尔值 (Boolean)
```cpp
Instance->SetBooleanPropertyValue("IsAlive", true);
bool bIsAlive = Instance->GetBooleanPropertyValue("IsAlive");
```

#### 🔢 数值 (Number)
```cpp
Instance->SetNumberPropertyValue("Health", 95.0f);
float CurrentHealth = Instance->GetNumberPropertyValue("Health");
```

#### 📝 字符串 (String)
```cpp
Instance->SetStringPropertyValue("Username", TEXT("PlayerOne"));
FString Name = Instance->GetStringPropertyValue("Username");
```

#### 🎨 颜色 (Color)
```cpp
Instance->SetColorPropertyValue("Background", FColor::Cyan);
FColor Color = Instance->GetColorPropertyValue("Background");
```

#### 🧩 枚举 (Enum)
```cpp
Instance->SetEnumPropertyValue("Team", TEXT("Blue"));
FString SelectedTeam = Instance->GetEnumPropertyValue("Team");
TArray<FString> ValidValues = Instance->GetEnumPropertyValues("Team");
```

#### 🚀 触发器 (Trigger)
```cpp
Instance->FireTriggerProperty("OnDamage");
```

#### 📦 嵌套 ViewModel
```cpp
URiveViewModelInstance* WeaponInstance = Instance->GetNestedInstanceByName("Weapon");
```

这些访问器已暴露给**蓝图**，允许您通过所属的 **ViewModel** 实例获取和设置属性值：

![Vm Accessorrs Pn](/images/unreal/vm_accessorrs.png)

### 5. 🧪 在属性对象上使用访问器

每个 `URiveViewModelInstanceValue` 子类都暴露了 `GetValue()` 和 `SetValue()`（或等效方法），可以进行直接操作。如果您想缓存某个属性以便稍后使用，这非常有用。

### ✅ 布尔值 (Boolean)
```cpp
URiveViewModelInstanceBoolean* BoolProp = Instance->GetBooleanProperty("IsReady");

if (BoolProp)
{
    BoolProp->SetValue(true);
    bool bValue = BoolProp->GetValue();
}
```

### 🔢 数值 (Number)
```cpp
URiveViewModelInstanceNumber* HealthProp = Instance->GetNumberProperty("Health");

if (HealthProp)
{
    float Old = HealthProp->GetValue();
    HealthProp->SetValue(Old - 10.f);
}
```

### 📝 字符串 (String)
```cpp
URiveViewModelInstanceString* NameProp = Instance->GetStringProperty("DisplayName");

if (NameProp)
{
    NameProp->SetValue(TEXT("RiveBot"));
    FString Value = NameProp->GetValue();
}
```

### 🎨 颜色 (Color)
```cpp
URiveViewModelInstanceColor* ColorProp = Instance->GetColorProperty("PrimaryColor");

if (ColorProp)
{
    ColorProp->SetColor(FColor::Green);
    FColor Current = ColorProp->GetColor();
}
```

### 🧩 枚举 (Enum)
```cpp
URiveViewModelInstanceEnum* RankProp = Instance->GetEnumProperty("Rank");

if (RankProp)
{
    TArray<FString> Options = RankProp->GetValues();
    RankProp->SetValue(TEXT("Gold"));
    FString Selected = RankProp->GetValue();
}
```

### 🚀 触发器 (Trigger)
```cpp
URiveViewModelInstanceTrigger* JumpProp = Instance->GetTriggerProperty("Jump");

if (JumpProp)
{
    JumpProp->Trigger(); // 激活触发器
}
```

这些访问器已暴露给**蓝图**，允许您直接获取或设置属性的值：

![Setpropertyvalue Pn](/images/unreal/setpropertyvalue.png)

### 5. 响应属性变更

每个属性值子类（例如 `URiveViewModelInstanceString`）都支持变更检测。

```cpp
URiveViewModelInstanceString* NameProp = Instance->GetStringProperty("Username");

FOnValueChangedDelegate OnChanged;
OnChanged.BindLambda([] {
    UE_LOG(LogTemp, Log, TEXT("用户名已更新！"));
});

NameProp->BindToValueChange(OnChanged);
```

在需要时取消绑定：
```cpp
NameProp->UnbindFromValueChange(OnChanged);
```

或者清除所有绑定：
```cpp
NameProp->UnbindAllFromValueChange();
```

这些方法也已暴露给**蓝图**，允许 UI 挂件无缝响应数值的变化。

![Bindtoonchange Pn](/images/unreal/bindtoonchange.png)