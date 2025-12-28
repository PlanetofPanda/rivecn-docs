基础知识

# 形状和路径概览 (Shapes and Paths Overview)

Rive 允许你使用参数化或自定义形状来创建、编辑并制作矢量图形动画。这些图形通过结合形状图层 (Shape Layers) 和路径图层 (Path Layers) 来定义，Rive 暴露了这些层级，以便为你的设计和动画提供更大的灵活性和控制力。

要了解有关形状图层和路径图层的更多信息，请观看我们的形状和路径视频，或阅读下文。

## [​](#shape-layer) 形状图层 (Shape layer)

![形状图层示例](images/shape-and-path-shapelayer.png)
Rive 中的矢量是在形状图层上渲染的。形状图层通过允许你自定义填充 (Fill) 和描边 (Stroke) 来定义形状的样式。
![填充和描边示例](images/shape-and-path-fill.png)

## [​](#path-layer) 路径图层 (Path layer)

![路径图层示例](images/shape-and-path-pathlayer.gif)
矢量的实际形状由路径（或多个路径）定义。在 Rive 中展开形状图层将显示其正在使用的路径。
![移动路径演示](images/shape-and-path-move.gif)
你可以通过将现有路径拖放到目标形状图层中，来向任何形状添加新路径。

### [​](#path-layer-properties) 路径图层属性 (Path layer properties)

路径图层会显示与路径类型相关的属性。了解更多关于 [参数化图形 (Procedural Shapes)](/editor/fundamentals/procedural-shapes.md) 的信息。
![路径图层属性示例](images/shape-and-path-properties.png)

## [​](#enter-and-esc-shortcuts) Enter 和 Esc 快捷键

使用 `Enter` 键快速向下导航层级结构 (Hierarchy)。如果你选中了一个形状，这允许你快速进入并选择其子路径图层。
使用 `Esc` 键快速向上导航层级结构。如果你选中了一个路径，这允许你快速选回其父级形状图层。