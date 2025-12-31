---
title: "数据绑定概览 (Data Binding Overview)"
description: "Unreal 数据绑定基础"
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

::: info
如果您对 Rive 的数据绑定功能尚不熟悉，请参阅[数据绑定 (Data Binding)](runtimes/data-binding) 以了解其基本概念。
:::

## 🔧 数据绑定概览

Rive Unreal 插件将 Rive ViewModel 架构集成到了 Unreal Engine 中，实现了动态的数据驱动内容和交互。通过**数据绑定**，您可以使用声明式模型将嬉戏变量、用户输入或 UI 状态直接暴露给您的 Rive 动画。

### 🔩 核心组件

- `URiveViewModel`：代表在 Rive 中定义的架构（Schema），包含属性和实例模板。
- `URiveViewModelInstance`：持有 ViewModel 的运行时值。它包装了 `rive::ViewModelInstanceRuntime` 并提供类型化的属性访问器。
- `URiveViewModelInstanceValue`：所有运行时属性的基类。派生类型包括：
  - `URiveViewModelInstanceBoolean`
  - `URiveViewModelInstanceNumber`
  - `URiveViewModelInstanceString`
  - `URiveViewModelInstanceColor`
  - `URiveViewModelInstanceEnum`
  - `URiveViewModelInstanceTrigger`
  - 嵌套 ViewModels：`URiveViewModelInstance`
- **绑定目标 (Binding Targets)**：实例可以绑定到：
  - `URiveArtboard` – 为 Rive 画板及其关联的状态机设置数据上下文。
  - `FRiveStateMachine` – 将 ViewModel 数据与状态机输入/输出同步，并将其绑定到状态机的画板。

### 🔄 生命周期 (Lifecycle)

1. **通过 `URiveFile` 加载 ViewModel**：
```cpp
   URiveViewModel* ViewModel = RiveFile->GetViewModelByName("MyData"); 
```
2. **创建实例**：
```cpp
   URiveViewModelInstance* Instance = ViewModel->CreateInstance(); 
```
3. **绑定到画板**：
```cpp
   Artboard->SetViewModelInstance(Instance);
```
4. **与属性交互**（例如触发状态或更新文本）：
```cpp
   Instance->SetStringPropertyValue("Username", "RiveUser");
   Instance->FireTriggerProperty("Login"); 
```
5. **响应变更**：
```cpp
   NameProperty->BindToValueChange(MyCallback); 
```

### ⚙️ 架构亮点

- 属性和 ViewModel 实例在 C++ 和蓝图中均暴露了**类型化的 Getter/Setter**。
- ViewModel 实例可以包含**嵌套的 ViewModel 实例**。
- 回调通过 `HandleCallbacks()`（由 `URiveArtboard::AdvanceStateMachine()` 每帧调用）进行**安全跟踪和调用**。