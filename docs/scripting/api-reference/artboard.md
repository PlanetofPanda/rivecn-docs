---
title: 画板 (Artboard)
---

代表一个 Rive 画板 (artboard) 实例，提供绘图、推进、交互处理以及对命名节点和数据的访问。

## 字段 (Fields)

### `frameOrigin`

如果为 true，则将画板的原点视为帧原点 (frame origin)。

### `data`

与画板关联的类型化数据。

### `width`

画板的宽度。

```lua
self.artboardInstance = self.myArtboard:instance()
if self.artboardInstance then
   self.artboardInstance.width = 20
end
```

### `height`

画板的高度。

```lua
self.artboardInstance = self.myArtboard:instance()
if self.artboardInstance then
   self.artboardInstance.height = 20
end
```

## 方法 (Methods)

### `draw`

使用提供的渲染器绘制画板。

### `advance`

按给定的时间（以秒为单位）推进画板。如果画板应继续接收 advance 调用，则返回 true。

### `instance`

创建一个具有独立状态的新画板实例。

### `bounds`

以两个 [向量 (Vector)](/scripting/api-reference/vector) 值的形式返回画板的包围盒：最小点和最大点。

```lua
local minPt, maxPt = self.myArtboard:bounds()
print("画板边界宽度", maxPt.x - minPt.x)
print("画板边界高度", maxPt.y - minPt.y)
```

### `node`

返回具有给定名称的节点，如果不存在此类节点，则返回 nil。

### `pointerDown`

指针按下 (pointer down) 事件处理程序。返回一个命中测试 (hit-test) 结果，其中 0 表示未命中，非零值表示命中。

### `pointerUp`

指针抬起 (pointer up) 事件处理程序。返回一个命中测试结果，其中 0 表示未命中，非零值表示命中。

### `pointerMove`

指针移动 (pointer move) 事件处理程序。返回一个命中测试结果，其中 0 表示未命中，非零值表示命中。

### `pointerExit`

指针退出 (pointer exit) 事件处理程序。返回一个命中测试结果，其中 0 表示未命中，非零值表示命中。

### `addToPath`

将画板的几何形状添加到给定的路径 (path) 中，可选地通过提供的矩阵 (matrix) 进行变换。
