状态机 (State Machines)

# 输入 (Inputs)

> [!WARNING]
> **⚠️ 已弃用：请使用数据绑定 (Data Binding) 控制 Rive 图形**
>
> **弃用提示：** 本页介绍的是旧版 Inputs 系统。
> - **新项目**：请使用 [数据绑定 (Data Binding)](/editor/data-binding/overview.md) 替代。
> - **现有项目**：请尽早规划迁移。
> - **本内容仅为向后兼容提供。**

输入是控制状态机过渡的旧式工具。虽然仍可使用，但数据绑定是最佳实践，因为视图模型 (View Models) 更强大且在运行时更易控制。
输入最适合用于快速原型交互，不打算迁移到运行时的场景。

### [​](#creating-a-new-input) 创建新输入

在输入面板中点击加号按钮，选择输入类型。有三种类型：布尔值、触发器和数字。
![创建输入](images/image_0.png)

## [​](#input-types) 输入类型

### [​](#boolean) 布尔值 (Boolean)
布尔值只有两种状态：true 或 false。
![开关的布尔输入](images/image_1.png)

### [​](#trigger) 触发器 (Trigger)
触发器类似布尔值，但只能短暂变为 true（一次性脉冲）。
![攻击动画的触发器](images/image_2.png)

### [​](#number) 数字 (Number)
数字输入提供一个可以是任意整数的数值框。
![评分动画的数字输入](images/image_3.png)

[状态 (States)](/editor/state-machine/states.md)[过渡 (Transitions)](/editor/state-machine/transitions.md)