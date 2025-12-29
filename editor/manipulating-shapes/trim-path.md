操控形状

# 路径裁剪 (Trim Path)

路径裁剪 (Trim Path) 功能允许你只绘制矢量形状描边（Stroke）的一部分。

## [​](#how-trim-path-works) Trim Path 工作原理

通过调整“开始 (Start)”、“结束 (End)”和“偏移 (Offset)”数值，你可以控制描边的可见片段。
- **开始 (Start)**：描边开始显示的百分比。
- **结束 (End)**：描边结束显示的百分比。
- **偏移 (Offset)**：在路径上移动可见片段的位置。

![Trim Path 示例 Pn](images/trim-path-example.gif)

## [​](#animated-strokes) 动态描边

这是通过动画将路径“画出来”的最常用方法。你可以通过为“结束”值设置从 0% 到 100% 的关键帧来模拟生长效果。

[单独显示 (Solos)](/editor/manipulating-shapes/solos.md)[摇杆控制 (Joysticks)](/editor/manipulating-shapes/joysticks.md)