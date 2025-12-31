---
title: "层级结构 (Hierarchy)"
description: "层级结构向您显示文件中的所有对象、资产和视图模型。此视图会根据您选择的画板、组件或选项卡而发生变化。"
---

# 切换视图 (Switching Views)

要在不同面板之间切换，请点击相应的面板按钮。

![Switch View Gi](/images/SwitchView.gif)

# 层级结构 (Hierarchy)

层级结构是一个树状视图，它既显示了舞台上对象之间的父子关系，也显示了它们的渲染顺序。通过观看视频或阅读下文来了解层级结构。

<YouTube videoId="FnnZV57Dp3c" />

父子关系是 Rive 的核心概念，它允许您以极小的代价创建复杂的图层动画。在 Rive 中，[组 (Groups)](/editor/fundamentals/groups) 和[骨骼 (Bones)](/editor/manipulating-shapes/bones) 可以拥有子对象。

层级结构中的每一行代表舞台上的一个项目。带有箭头的圆形按钮会出现在拥有嵌套子项的条目旁边。该按钮允许您展开或折叠子项列表。

## 父子关系

<YouTube videoId="FnnZV57Dp3c" />

任何类型的对象都可以是另一种对象的父级或子级。当一个对象成为另一个对象的子级时，它会继承父级的所有变换属性。例如，改变父级对象的缩放比例会直接影响到子级对象。这些变换是基于父级的原点（Origin）进行的，而不是子级的局部原点。

![Image](https://ucarecdn.com/7aed46e0-3a37-42c8-977f-f836f87a3304/)

这种父子关系的深度是无限的，所以您可以不断叠加（或嵌套）项目，创建孙子级、曾孙子级等等。

### 更改父子关系

要更改对象之间的关系，只需将一个对象拖放到另一个对象内部或外部即可。

![Image](https://ucarecdn.com/b58a873b-0d11-47fc-8048-48ea3b106fec/)

## 绘制顺序 (Draw Order)

除了显示对象间的关系，层级结构还显示了文件的"绘制顺序"：排在列表顶部的对象会渲染在最前面，而排在底部的对象则渲染在最背面。

### 更改绘制顺序

![Image](https://ucarecdn.com/5aeb4f67-a7f6-4efe-83bd-975880f79618/)

要更改舞台上对象的绘制顺序，请在列表中向上或向下拖动形状（或形状组）。请注意，绘制顺序也会影响对象在布局中的位置和处理方式。在[这里](https://rive.app/docs/editor/layouts/layouts-overview)了解更多相关信息。

绘制顺序是可以制作成动画的，但过程稍显复杂。请在[动画化绘制顺序](https://rive.app/docs/editor/animate-mode/animating-draw-order)页面查阅。

## 右键菜单

右键点击层级结构中的任何对象都会弹出菜单，针对不同对象提供不同选项。在菜单中，您可以找到复制和粘贴对象及样式、删除对象、将对象包裹进[布局](https://rive.app/docs/editor/layouts/layouts-overview)或[独奏 (Solos)](https://rive.app/docs/editor/manipulating-shapes/solos)、查看依赖图、添加[标签 (Tag)](https://rive.app/docs/editor/tagging)、反转绘制顺序以及[导出名称](https://rive.app/docs/editor/exporting/exporting-for-runtime)等功能。

![Right Click Pn](/images/right_click.png)

许多选项都配有快捷键，可以在选项旁或快捷键菜单中找到。

# 资产面板 (Assets Panel)

资产面板是您的图像、Lottie 文件、音频和自定义字体的列表视图。此面板允许您添加、移除、替换和修改文件中添加的所有资产。在下文阅读关于导入和修改资产的更多信息。

![Assets Pn](/images/Assets.png)

**[导入资产 (Importing Assets)](/editor/fundamentals/importing-assets)**

**[音频事件 (Audio Events)](/editor/events/audio-events)**

# 数据面板 (Data Panel)

数据面板是创建、组织和查看文件的视图模型（View Models）、枚举（Enums）和转换器（Converters）的地方。该面板分为三个独立空间：视图模型、枚举和转换器。在[这里](/editor/data-binding/overview)查阅更多关于数据绑定的信息。

![Data Pn](/images/Data.png)

每个部分右侧的加号按钮允许您添加新的视图模型、枚举或转换器。

如果某个部分包含相关联的元素，可以使用左侧的箭头图标来展开或折叠列表。
