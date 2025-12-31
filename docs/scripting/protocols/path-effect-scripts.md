---
title: "路径效果脚本 (Path Effect Scripts)"
description: "使用 Rive 脚本创建自定义路径效果"
---

路径效果是实时修改和转换路径几何形状的 Rive 脚本。它们让您可以编程控制动画中路径的形状和结构，从而实现扭曲、畸变、动画和程序化修改等效果。

## 创建路径效果 (Creating a Path Effect)

[创建一个新脚本](/scripting/creating-scripts) 并选择 **Path Effect** 作为类型。

## 示例 (Examples)

## 路径效果脚本的结构 (Anatomy of a Path Effect Script)

### 方法 (Methods)

- **init (可选)**
  在创建路径效果时调用一次。用于设置初始状态。如果初始化成功，返回 true。
- **update (必选)**
  进行路径变换的核心方法。接收原始的 `PathData` 并返回一个修改后的版本。这里是您操纵路径几何形状的地方。
- **advance (可选)**
  每一帧都会被调用，参数为以秒为单位的经过时间。返回 true 以继续接收 advance 调用。对于随时间变化的动画效果非常有用。

## 使用 `PathData` (Working with `PathData`)
`PathData` 提供了对路径绘图命令（`moveTo`、`lineTo`、`cubicTo`、`quadTo`、`close`）的访问。您可以：

- 使用索引读取现有命令
- 使用 `#pathData` 获取命令计数
- 创建新路径并添加命令
- 使用 `contours()` 和 `measure()` 等测量工具进行高级操作

```lua
type MyPathEffect = {
  context: Context,
}

function init(self: MyPathEffect, context: Context): boolean
  self.context = context
  return true
end

function update(self: MyPathEffect, inPath: PathData): PathData
  local path = Path.new()
  return path
end

function advance(self: MyPathEffect, seconds: number): boolean
  return true
end

-- 返回一个 Rive 用来构建路径效果实例的工厂函数。
return function(): PathEffect<MyPathEffect>
  return {
    init = init,
    update = update,
    advance = advance,
    context = late(),
  }
end
```

## 将脚本化路径效果添加到描边 (Add the Scripted Path Effect to a Stroke)

选择或向形状添加描边：

1. 打开“选项 (Options)”菜单。
2. 选择“效果 (Effects)”标签，点击 '+' 添加效果。
3. 在脚本效果 (Script Effects) 菜单项下找到您的效果。
4. 您定义的任何输入项都将显示并可以在此处进行编辑。

![将路径效果添加到描边](/images/scripting/add-path-effect-to-stroke.png)

## 添加输入 (Adding Inputs)

请参阅 [脚本输入 (Script Inputs)](/scripting/script-inputs)。