---
title: '布局动画 (Animation)'
description: '为布局容器添加动画，以定义内容重新排布时的插值方式。当布局容器需要调整大小时，其子项可能需要更改位置。添加布局动画允许子项的重新排布随时间推移并按照选定的缓动曲线进行。'
---

## 添加布局动画

首先，选中一个布局组件，然后在检查器中点击 `Layout Animation`（布局动画）旁边的 `+` 动作。在大多数情况下，您通常可能希望在父级布局上设置此项。

![Image](/images/editor/layouts/d72ffb27-34c2-4703-8828-07d89e023cf6.webp)

接下来，从 3 种不同模式中选择一种：

- **None (无)：** 不执行动画。
- **Inherit (继承)：** 从父级布局继承动画参数。
- **Custom (自定义)：** 为选定的布局定义动画参数。

选择自定义选项后，您可以设置时长和插值类型，类似于状态机过渡（State Machine transition）中的设置。目前支持除三次贝塞尔曲线值（cubic value）以外的所有插值类型。

![Image](/images/editor/layouts/2de7450c-11b4-459d-a5a0-dabeae3c342c.webp)

通过为父级布局应用自定义动画，并将子布局设置为 `inherit`（继承），意味着它们都将使用与父级相同的参数。或者，您也可以选择为各个子组件分别应用自定义插值。

<video width="640" controls>
  <source src="https://ucarecdn.com/377012bf-760a-48bc-baf8-6747efe3ad5d/" type="video/mp4"></source>
  Custom animation
</video>