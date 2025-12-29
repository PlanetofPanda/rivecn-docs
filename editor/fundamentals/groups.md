基础概念 (Fundamentals)

# 分组 (Groups)

使用分组来组织你的图形或增加额外的变换空间。

按下快捷键 `G` 激活分组工具。点击画板上的任何位置即可添加一个新分组。然后，在层级面板 (Hierarchy) 中将对象拖放到该分组中。
你也可以在 macOS 中使用 `⌘`+`G` 或在 Windows 中使用 `Ctrl`+`G` 直接将选中的多个形状包裹进一个分组。
解除分组的快捷键在 macOS 中为 `⌘`+`Shift`+`G`，在 Windows 中为 `Ctrl`+`Shift`+`G`。

## [​](#group-style) 分组样式 (Group Style)

分组的样式属性可以设置为“分组 (Group)”或“目标 (Target)”。

### [​](#group) 分组 (Group)

“分组”是默认行为，其运作方式参考[选择与导航分组 (Selecting and Navigating Groups)](/editor/fundamentals/selecting-and-navigating-groups)。

### [​](#target) 目标 (Target)

“目标”选项会在舞台上绘制一个始终可见的不同图标（通常分组只有在为空时才会显示图标）。当分组显示为“目标”时，它还会禁用[选择与导航分组](/editor/fundamentals/selecting-and-navigating-groups)章节中描述的功能。这意味着你可以直接点击选中该分组的任何子级对象（无需双击、按 Enter/Esc 或使用深层选择）。
![分组切换为目标模式 GIF](images/groups-targets.gif)
“目标”选项在处理“约束 (Constraints)”时特别有用。

### [​](#constraints) 约束 (Constraints)

[约束是一种通过另一个目标对象来控制目标对象属性的方法。有些约束可以限制这些属性（及其层级关系），而另一些则可以将属性从一个对象复制到另一个对象。](/editor/constraints/overview.md)

[程序化形状 (Procedural Shapes)](/editor/fundamentals/procedural-shapes.md)[选择与导航分组 (Selecting and Navigating Groups)](/editor/fundamentals/selecting-and-navigating-groups)