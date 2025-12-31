---
title: "组合 (Groups)"
description: "使用组来组织您的图形或添加额外的变换空间。"
---

<YouTube videoId="FnnZV57Dp3c" />

使用快捷键 **G** 激活"组合工具"。在画板中的任意位置点击即可添加一个新组。现在，在层级结构中将对象拖放到该组中即可。

您也可以在 macOS 上使用 `⌘` + `G` 或在 Windows 上使用 `Ctrl` + `G` 将选中的形状包裹进一个组中。

使用 macOS 上的 `⌘` + `Shift` + `G` 或 Windows 上的 `Ctrl` + `Shift` + `G` 可以取消组合。

## 组样式 (Group Style)

组的 "Style"（样式）属性可以设置为 "Group"（常规组）或 "Target"（目标点）。

### 常规组 (Group)

这是默认行为，其表现如[选择与导航组](/editor/fundamentals/selecting-and-navigating-groups)中所述。

### 目标点 (Target)

"目标点"选项在舞台上会绘制一个不同的图标，且该图标始终可见，无论该组是否有子级（通常只有空组才会显示图标）。当一个组显示为"目标点"时，它还会禁用[选择与导航组](/editor/fundamentals/selecting-and-navigating-groups)一节中描述的功能。这意味着您可以直接点击选中该组的任何子级（无需双击、按 Enter/esc 键或进行深度选择）。

![Groups change Target](/images/editor/fundamentals/groups-targets.gif)

在处理"约束"（Constraints）时，将组设置为"目标点"尤其有用。

**[约束 (Constraints)](/editor/constraints/)**

  约束是通过另一个目标对象来控制某个对象属性的方法。一些约束可以为这些属性（及其层级关系）设置限制，而其它约束可以将属性从一个对象复制到另一个对象。
