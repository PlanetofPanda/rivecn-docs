---
title: "文本样式 (Text Styles)"
---

<YouTube videoId="FeUOLDzvSDw" />

文本样式（Text Styles）包含了定义文本外观的一系列常见选项，并被应用到一个或多个文本数据块（Runs）上。目前，只有一个文本对象本身定义的文本样式可以应用到它上面。未来我们将推出在多个文本对象或整个 Rive 文件之间共享文本样式的方法。

每个新文本对象在创建时都自带一个文本样式。使用检查器中的 `+` 动作可以创建额外的样式，以便应用于特定的文本数据块，或在动画中切换不同的样式关键帧。

每个文本样式包含：

- 字体 (Font)
- 字号 (Font Size)
- 字重 (Font Weight)
- 行高 (Line Height)
- 填充 (Fills)
- 描边 (Strokes)

![Add multiple styles to a single text object](/images/editor/text/text-runs-styles.gif)

### 向文本数据块应用样式 (Applying a style to a Text Run)

有两种方法可以将文本样式应用到文本数据块（Text Run）：

- 在层级结构中选中该数据块，然后使用检查器中的 "Style" 下拉菜单。
- 点击检查器样式选项旁边的 `A+` 图标，然后使用弹出菜单选择目标数据块。悬停在每个选项上可以在舞台上看到预览效果。

![Apply a style to a chosen run](/images/editor/text/text-runs-apply.gif)

---

## 变量 (Variables)

支持变量轴（variable axes）或 OpenType 特性的字体会在检查器的文本样式上显示一个选项浮窗按钮。使用该浮窗可以访问并配置所选字体的可用变量和特性。

字体变量可以在 Rive 中制作动画。在动画模式下打开变量浮窗，即可为可用的轴设置关键帧。

![Animate font variables](/images/editor/text/text-runs-variable.gif)