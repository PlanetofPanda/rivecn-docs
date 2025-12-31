---
title: "布局脚本 (Layout Scripts)"
description: ""
---

布局脚本扩展了 [节点脚本 (Node Scripts)](/scripting/protocols/node-scripts) 的行为，让您可以编程控制布局组件。它们允许您测量、设定大小以及对布局几何形状的变化做出反应。它们非常适合构建自定义布局行为，如瀑布流网格、轮播图、间距逻辑等。

## 示例 (Examples)

## 将布局脚本添加到布局 (Adding a Layout Script to a Layout)

1. 向场景中添加一个新的 [布局 (Layout)](/editor/layouts/layouts-overview)。
2. [创建一个新脚本](/scripting/creating-scripts) 并选择 **Layout** 作为类型。
3. 将您的脚本添加为布局的子节点。

## 生命周期 (Lifecycle)

布局脚本增加了两个额外的生命周期函数：

- `measure(self): Vec2D` — 可选
- `resize(self, size: Vec2D)` — 必选

### 测量 (Measure)

`Measure` 允许您的脚本为布局提议一个理想的大小。除非被 Fit 规则覆盖，否则 Rive 将使用该值。

`Measure` 仅对 Fit 类型为 Hug (抱紧) 的布局有效。
```lua
function measure(self: MyLayout): Vec2D
  -- 始终声明此布局希望的大小为 100×100
  return Vec2D.xy(100, 100)
end
```

### 调整大小 (Resize)

每当布局从其父级或从您的 `measure` 函数接收到新的大小时，`Resize` 就会运行。在这里，您可以定位或更新子节点、重新计算流向，或对容器的变化做出反应。
```lua
-- 每当布局调整大小时调用。
function resize(self: MyLayout, size: Vec2D)
  print("新大小：")
  print("x:", size.x)
  print("y:", size.y)
end
```
