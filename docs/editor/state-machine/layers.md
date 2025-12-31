---
title: "图层 (Layers)"
description: "图层允许您使用状态机构建更复杂的逻辑和动画。"
---

<YouTube videoId="7Vb1LosMzwk" />

状态机上的每个图层一次只能播放一个动画。因此，如果您希望混合多个动画或向状态机添加额外的交互，可以创建多个图层。

下面这个例子使用图层来混合不同的背景动画，并在单个画板上添加多个交互。

![Using multiple Layers](https://ucarecdn.com/aeedde5a-598f-42b3-a5df-81212757395e/)

### 创建新图层 (Creating a new layer)

要创建新图层，请使用 Layers 选项卡上的加号按钮。

![Add a new Layer](/images/editor/state-machine/state-machine-layer-create.gif)

请注意，您创建的每个新选项卡（Tab）都自带"默认状态"（Default States）。

### 图层顺序 (Layer Order)

虽然可能不太直观，但图层顺序非常重要：靠右侧的图层优先级高于靠左侧的图层。在大多数情况下这不影响，但如果您的多个图层中都有控制相同对象属性的状态，那么在混合时，最右侧图层中的动画将获得高于其左侧图层的优先级。

<YouTube videoId="Fc9MutscvAo" />

**更改图层顺序**

您可以通过在 Layers 选项卡中拖放图层来更改其顺序。

<img
  src="/images/editor/state-machine/state-machine-layer-order.gif"
  alt="Move layers"
  title=""
  style="width: 100%"
/>

**删除图层 (Delete layer)**

您可以通过右键点击图层名称并选择 "Delete Layer"（删除图层）选项来删除图层。

![Delete layer](/images/editor/state-machine/state-machine-layer-delete.gif)

**复制图层 (Duplicate layer)**

您可以通过右键点击图层名称并选择 "Duplicate Layer"（复制图层）选项来复制图层。

![Duplicate layer](/images/editor/state-machine/state-machine-layer-duplicate.gif)

**禁用与启用图层 (Disable and Enable layer)**

您可以通过右键点击图层名称并选择相应选项来禁用或启用图层。

![Disable and Enable layer](/images/editor/state-machine/state-machine-layer-disable.gif)