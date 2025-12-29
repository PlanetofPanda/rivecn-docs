布局 (Layouts)

# 滚动 (Scrolling)

Rive 的滚动功能通过两个新约束实现：一个用于为溢出内容添加触摸滚动，另一个用于创建滚动条。这两个约束都与现有的布局组件协同工作。未来我们将提供更通用的滚动组件以简化设置。

注意：目前尚不支持鼠标滚轮/触控板手势，但这已列入 v1 路线图。

---

## [​](#content-scrolling) 内容滚动 (Content Scrolling)

要创建滚动区域，请建立如下层级：
- **滚动视图 (Scroll view)**：定义滚动区域大小的布局。
- **滚动内容 (Scroll content)**：包含滚动项的布局（在该布局上应用“滚动约束”）。滚动量由该布局的大小决定。通常设为包裹 (Hug) 或固定 (Fixed)。
- **滚动项 (Scroll items)**：要滚动的具体布局项。

选中你的“滚动内容”布局，在检查器中添加“滚动内容约束 (Scroll Content constraint)”。

#### [​](#direction) 方向
- **垂直 (Vertical)** / **水平 (Horizontal)** / **全部 (All)**。

#### [​](#scroll-percent-x/y-animatable) 滚动百分比 (可动画)
设置 0% 到 100% 的滚动位置。可以在时间轴上打关键帧。

#### [​](#scroll-index-animatable) 滚动索引 (可动画)
设置滚动到第几个项目的索引（从 0 开始）。仅适用于单向滚动。

#### [​](#physics) 物理效果
- **弹性 (Elastic)**：iOS 风格的滚动，带有减速和边缘回弹。
- **夹紧 (Clamped)**：基础的拖拽，无物理效果。

#### [​](#snap) 吸附 (Snap)
开启后，滚动内容将始终停留在完整项目的边缘。

---

## [​](#list-scrolling) 列表滚动 (List Scrolling)
如果滚动的是列表 (List)，设置方式相同。开启 **虚拟化 (Virtualize)** 可以极大地提升包含大量项目时的性能。

---

## [​](#creating-a-scroll-bar) 创建滚动条
需要建立：
- **滚动条 (Scroll Bar)**：定义滚动条轨道的布局。
- **滚动滑块 (Scroll Thumb)**：定义可拖动的滑块布局。

选中滑块布局，添加“滚动条滑块约束 (Scroll Bar Thumb constraint)”，并使用目标选择器连接到上述的“滚动内容”布局。

[N轴切片 (N-Slicing)](/editor/layouts/n-slicing.md)[库 (Libraries)](/editor/libraries.md)