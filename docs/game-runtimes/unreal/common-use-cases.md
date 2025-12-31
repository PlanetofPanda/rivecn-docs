---
title: "常见用例 (Common Use Cases)"
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

## 使用 OnRiveReady 事件

访问 Rive 对象之前需要先进行初始化。这是由于 Rive 底层实现的多线程特性决定的。**OnRiveReady** 事件可用于确定 Rive 何时准备好投入使用。

例如，您可能希望在 Rive 组件初次创建时设置数据。比如在创建 **RiveWidget** 时，在 **Text Run** 中填入用户的名字。

下方的蓝图展示了如何绑定到 **RiveWidget** 的 **OnRiveReady** 事件，并在嬉戏开始且 **RiveWidget** 准备就绪时设置文本。

![Image](/images/game-runtimes/unreal/7bb2da03-269e-4e7d-844d-7dd69d05b0ed.webp)

## 将鼠标事件转换为 Rive 画板事件

::: info
如果您使用的是世界空间挂件（例如添加到 Actor 的 Widget 组件），只需在该组件上启用 "Receive Hardware Input"（接收硬件输入），它就会自动响应鼠标事件。只有在世界空间中使用 Rive 纹理（Texture）时，才需要使用下面提到的方法。
:::

如果您在世界空间纹理上使用 Rive 动画，则需要手动将鼠标事件传递给 Rive 画板。具体操作如下：

1. 在项目设置（Project Settings）中启用 "Support UV from hit results"。

   ![Support UV From Hit Results](/images/unreal/supportuvs.png)
2. 创建一个蓝图，将鼠标位置转换为画板上的点击。Rive Unreal Demos 仓库中的 Topography Map 关卡中有一个使用线迹追踪（line traces）实现该功能的宏（Macro）示例：

   ![Mouse position to artboard position](/images/unreal/mousttoartboard.png)
3. 为相应的事件调用该宏，并将它们传递给画板：

   ![Pointer Events](/images/unreal/Screenshot2025-05-23113944.png)

## 在 Unreal Sequencer 中控制 Rive 文件

Rive 文件拥有可以通过蓝图调用的输入（Inputs）和触发器（Triggers），而这些蓝图又可以被 Unreal Sequencer 中的触发器调用。Rive 和 Unreal 的术语在这里有点冲突，因此我会尽量表达清楚。

### 在 Sequencer 中，将您的 RiveActor 添加为轨道 (Track)

### 将时间轴标尺移动到您想要触发 Rive 输入或触发器的位置

### 添加一个关键帧 (Key)

### 右键点击该关键帧，选择 Properties 并选择 “Create New Endpoint”。这将创建一个蓝图节点，它可以触发您想要的任何蓝图动作，包括 Rive 动作。

### 打开该蓝图（双击 Event 节点）并添加一个 Rive Set Bool Value 节点（请务必在搜索框中取消选中 “Context Sensitive” 选项）。

### Rive 的 Set Value 节点需要一个画板作为输入，这可以从 Sequencer Event 节点派生。添加一个 Rive Get Artboard 节点，并将目标从 Sequencer Event 节点连出，系统会自动添加一个转换节点。

### 确保蓝图的 “Call In Editor” 复选框已勾选。

在下方的示例视频中，我有一个 Rive 文件，它有一个名为 “Processing” 的布尔输入，开启后会启动一段循环动画。

> [观看视频](https://ucarecdn.com/22a368aa-5110-4b79-afa8-e244a3500e24/)
