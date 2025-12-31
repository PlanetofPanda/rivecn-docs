---
title: "监听器 (Listeners)"
description: "监听器允许设计师在无需代码的情况下创建交互行为。"
---

监听器（Listeners）允许设计师直接在 Rive 中创建交互行为——如点击、悬停和拖拽——而无需编写代码。例如，您可以为一个按钮附加 "Pointer Enter"（指针进入）、"Pointer Exit"（指针退出）和 "Click"（点击）监听器。触发时，这些监听器可以更新数据绑定、设置输入（Inputs）、触发事件等，从而在运行时实现动态且互动的体验。

<YouTube videoId="25uQiqdmT9c" />

#### 创建新监听器 (Creating a new Listener)

1. 在 "Animations"（动画）选项卡中，选择您的状态机。
2. 在 "Listeners"（监听器）选项卡中，点击加号图标。

::: info
如果在创建监听器时选中了某个对象，该对象将被自动指定为目标（Target）。
:::

![Clean Shot2025 06 12at14 46 58 Gi](/images/CleanShot2025-06-12at14.46.58.gif)

选中新监听器后，您会在状态机图表底部和图表右侧的新面板中看到它的属性选项。

# 监听器的组成要素 (Elements of a Listener)

一个监听器由三部分组成：目标（Target）、用户动作（User Action）和监听器动作（Listener Action）。

### 目标 (Target)

目标决定了在哪里监听用户动作。

**命中区域 (Hit Areas)**

在大多数情况下，目标定义了响应用户动作的交互区域——类似于游戏开发中的"碰撞框"（hitbox）。当用户与该区域交互（例如点击或悬停）时，相关的监听器就会被触发。

通常最好使用形状作为目标——例如，不透明度设置为 0% 的椭圆或矩形。如果您使用一个"组"（Group）作为目标，那么该组内的形状将共同作为交互区域。

要选择目标，点击 "Target" 图标并从画板或层级面板中选择一个对象。

![Clean Shot2025 06 12at14 52 27 Gi](/images/CleanShot2025-06-12at14.52.27.gif)

请注意，在创建监听器时若已选中某个对象，系统会自动将该选中对象指定为该监听器的目标。

**在组件上监听事件 (Listening to Events on Components)**

::: info
我们强烈建议使用**数据绑定 (Data Binding)** 在画板之间进行通信，而不是依赖嵌套事件（nested Events）。
:::

将画板或组件设置为目标，允许您监听该画板发出的事件（Events）。

**不透明目标 (Opaque Target)**

"Opaque Target" 选项决定了指针事件是否会穿过该命中区域。如果关闭此选项，可能会同时触发多个监听器。

![Clean Shot2025 06 12at15 11 08 Gi](/images/CleanShot2025-06-12at15.11.08.gif)

# 用户动作 (User Action)

用户动作是监听器正在监听的特定交互。目标按钮下方的下拉菜单允许您更改监听器检查的用户动作。

![Clean Shot2025 06 12at15 14 19 Gi](/images/CleanShot2025-06-12at15.14.19.gif)

可选动作包括：

**Pointer Down (指针按下)** – 鼠标点击或手指按下。

**Pointer Up (指针抬起)** – 释放鼠标点击或手指。

**Pointer Enter (指针进入)** – 鼠标或手指进入目标区域。

**Pointer Exit (指针退出)** – 鼠标或手指离开目标区域。

**Pointer Move (指针移动)** – 鼠标或手指在目标区域内移动。

**Click (点击)** – 在同一目标区域内完成指针按下和抬起的组合动作。

**Listen for Event (监听事件)** – 仅当目标是画板或组件时可见。如果存在多个事件，请使用下拉菜单选择特定的事件。

# 监听器动作 (Listener Action)

监听器动作定义了当用户交互发生时会发生什么。

要添加监听器动作，请点击状态机图表下方面板中的加号图标。您可以为一个监听器添加多个动作。

![Clean Shot2025 06 12at15 16 20 Gi](/images/CleanShot2025-06-12at15.16.20.gif)

## **视图模型更改 (View Model Change)**

更新您的"视图模型实例"（View Model Instance）中的值。这是从 Rive 文件与运行时代码通信的首选方式。默认情况下，监听器被设置为 "View Model Change"，除非监听器的目标是一个画板或组件实例。

### **视图模型下拉菜单**

视图模型下拉菜单让您选择希望该监听器更改的"视图模型属性"（View Model Property）。

![Clean Shot2025 06 12at15 18 21 Gi](/images/CleanShot2025-06-12at15.18.21.gif)

请注意，监听器可以更改文件中**任何**视图模型的属性，即使该视图模型并未分配给当前的画板。

### **数值 (Value) vs 属性 (Property)**

选择您想要监听器修改的属性后，您可以将其设置为一个具体的数值（Value），或者使其等于另一个视图模型的属性（Property）。

**数值 (Value)**

如果选择 "Value"，您可以使用输入框来更改您希望该属性被设置成的特定数值。数值类型会根据属性的不同而变化。

![Clean Shot2025 06 12at15 24 51 Gi](/images/CleanShot2025-06-12at15.24.51.gif)

**视图模型属性 (View Model Property)**

选择一个属性，将使监听器中的视图模型属性等于另一个属性的值。

![Clean Shot2025 06 12at15 31 06 Gi](/images/CleanShot2025-06-12at15.31.06.gif)

请注意，我们可以将视图模型属性设置为等于其自身。

**添加转换器 (Adding a Converter)**

如果我们选择将一个视图模型属性设置为等于另一个视图模型属性，该属性右侧会出现转换器图标。这允许我们对属性应用转换逻辑。

![Clean Shot2025 06 12at15 37 13 Gi](/images/CleanShot2025-06-12at15.37.13.gif)

例如，我们可以设置数值对数值（Number to Number），但附加一个 "Add One"（加一）转换器。每次该监听器触发时，我们的数值属性都会加 1。

## **报告事件 (Report Event)**

每次触发用户动作时触发一个事件（Event）。当画板或组件实例是监听器目标时，这是默认选项。

## **对齐目标 (Align Target)**

"Align Target" 动作使目标对象在监听区域内发生指定用户动作时，跟随指针。

使用目标选择器选中您想要对齐的对象。

启用 "Preserve Offset"（保留位移）以保持动作触发时对象与指针之间的原始距离。如果不勾选，对象将直接对齐到指针的中心。

<YouTube videoId="Zfvb9jy6VRY" />

## **输入更改 (Input Change)**

允许监听器更改已定义的输入（Input）——例如切换布尔值、触发触发器或将数值输入设置为特定值。

这对于在画板上直接创建诸如悬停状态或点击效果等交互行为非常有用。