协议 (Protocols)

# Layout 脚本 (Layout Scripts)

Layout 脚本扩展了 [Node 脚本](/scripting/node-scripts.md) 的行为，为你提供了对 Layout 组件的编程控制。它们允许你测量、调整大小并响应 Layout 几何形状的变化。它们非常适合构建自定义布局行为，如瀑布流网格、轮播图、间距逻辑等。

## [​](#examples) 示例

## [​](#adding-a-layout-script-to-a-layout) 向 Layout 添加 Layout 脚本

1.  向场景添加一个新的 [Layout](/editor/layouts/overview.md)。
2.  [创建一个新脚本](/scripting/creating-scripts) 并选择 **Layout** 作为类型。
3.  将你的脚本添加为 Layout 的子级。

## [​](#lifecycle) 生命周期 (Lifecycle)

Layout 脚本增加了两个额外的生命周期函数：

-   `measure(self): Vec2D` — 可选
-   `resize(self, size: Vec2D)` — 必需

### [​](#measure) 测量 (Measure)

Measure 允许你的脚本建议布局的理想尺寸。
除非有“适应 (Fit)”规则覆盖，否则 Rive 将使用此值。
Measure 仅对 Fit 类型为“包裹 (Hug)”的布局有效。

```lua
function measure(self: MyLayout): Vec2D
  -- Always declare that this layout would like to be 100×100
  -- 始终声明此布局希望是 100x100
  return Vec2D.xy(100, 100)
end
```

### [​](#resize) 调整大小 (Resize)

Resize 会在 Layout 从其父级或从你的 measure 函数接收到新尺寸时运行。
这是你定位或更新子节点、重新计算流或响应容器更改的地方。

```lua
-- Called whenever the Layout is resized.
-- 每当 Layout 调整大小时调用。
function resize(self: MyLayout, size: Vec2D)
  print("New size:")
  print("x:", size.x)
  print("y:", size.y)
end
```