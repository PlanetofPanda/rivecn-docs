---
title: "画板 (Artboard) - Rive 脚本"
description: "表示一个 Rive 画板实例，提供绘制、推进 (advancing)、交互处理以及访问命名节点和数据的功能。 如果为 true，画板的原点被视为帧原点。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 脚本, 画板
---

脚本 API

# 画板 (Artboard)

表示一个 Rive 画板实例，提供绘制、推进 (advancing)、交互处理以及访问命名节点和数据的功能。

## [​](#fields) 字段 (Fields)

### [​](#frameorigin) `frameOrigin`

如果为 true，画板的原点被视为帧原点。

### [​](#data) `data`

与画板关联的类型化数据。

### [​](#width) `width`

画板的宽度。

```lua
self.artboardInstance = self.myArtboard:instance()
if self.artboardInstance then
   self.artboardInstance.width = 20
end
```

### [​](#height) `height`

画板的高度。

```lua
self.artboardInstance = self.myArtboard:instance()
if self.artboardInstance then
   self.artboardInstance.height = 20
end
```

## [​](#methods) 方法 (Methods)

### [​](#draw) `draw`

使用提供的渲染器绘制画板。

### [​](#advance) `advance`

按给定的时间（以秒为单位）推进画板。如果画板应继续接收 advance 调用，则返回 true。

### [​](#instance) `instance`

创建一个具有独立状态的画板新实例。

### [​](#bounds) `bounds`

将画板的边界框作为两个 [向量 (Vector)](/scripting/api-reference/vector) 值返回：最小点和最大点。

```lua
local minPt, maxPt = self.myArtboard:bounds()
print("Bounds width", maxPt.x - minPt.x)
print("Bounds height", maxPt.y - minPt.y)
```

### [​](#node) `node`

返回具有给定名称的节点，如果不存在此类节点，则返回 nil。

### [​](#pointerdown) `pointerDown`

指针事件按下处理程序。每个都返回一个碰撞测试结果，其中 0 表示未命中，非零值表示命中。

### [​](#pointerup) `pointerUp`

指针事件抬起处理程序。每个都返回一个碰撞测试结果，其中 0 表示未命中，非零值表示命中。

### [​](#pointermove) `pointerMove`

指针事件移动处理程序。每个都返回一个碰撞测试结果，其中 0 表示未命中，非零值表示命中。

### [​](#pointerexit) `pointerExit`

指针事件退出处理程序。每个都返回一个碰撞测试结果，其中 0 表示未命中，非零值表示命中。

### [​](#addtopath) `addToPath`

将画板的几何图形添加到给定路径，可选择通过提供的矩阵进行变换。