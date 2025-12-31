---
title: "文本数据块 (Text Runs)"
---

<YouTube videoId="UE23Agn1DZ0" />

文本数据块（Runs）允许您将文本内容分割成不同的部分——通常用于向同一块文本的不同部分应用多种不同的样式。虽然大多数工具是在后台管理这些数据块，但 Rive 将它们暴露出来，以便在运行时动态更改文本时提供更强大的控制。

您可能想要将文本分割成多个数据块，以便为文本的特定部分应用不同的样式（如字体、字号、颜色等），随后您可以[在运行时更新这些文本数据块](/runtimes/text#read-update-text-runs-at-runtime)。

::: info
一个文本数据块一次只能应用一种"文本样式"。
:::

例如，一个欢迎用户进入应用或网站的动画可能会通过名字来问候他们。在 Rive 编辑器中，您可能会设计并制作一段读取为 "Welcome back, username" 的文本内容。将 "username" 定义为其独立的数据块，意味着您可以使用 Rive 运行时（Runtimes）定位该部分，并将其替换为真实的用户名。

![Update text for a specific run](/images/editor/text/text-runs-update-run.gif)

---

## 创建文本数据块 (Creating a Text Run)

要创建一个 Run，请选中所需部分的文本，然后点击检查器中的 'Run from Selection'（从选区创建 Run）按钮。您可以在层级结构中看到列在文本对象下方的各个文本数据块。

选中主文本框后双击或按 `Enter` 键即可开始编辑文本。

在检查器中开启 'Highlight Text Runs'（高亮文本数据块）选项，可以直观地看到当前的文本分割情况。在层级结构中悬停在某个数据块上，也会在文本中高亮显示其位置。

![Split text into multiple runs](/images/editor/text/text-runs-create-run.gif)

---

## 管理文本数据块 (Managing Text Runs)

在层级结构中选择一个文本数据块，可以在检查器中看到以下选项：

- **文本数值 (Text Value)：** 更新该数据块的文本内容。此数值可以在动画模式下设置关键帧。
- **编辑文本块 (Edit Text Run)：** 进入文本编辑模式并预选该数据块。
- **与后一个合并 (Merge with Next)：** 将选中的数据块与下一个数据块合并。
- **与前一个合并 (Merge with Previous)：** 将选中的数据块与前一个数据块合并。
- **删除文本块 (Delete text Run)：** 删除该数据块及其内容。
- **样式 (Style)：** 给数据块分配该文本对象中定义的某一个文本样式。此属性可以在动画模式下设置关键帧。

![Assign a Text Style to a Text Run](/images/editor/text/text-runs-managing-run.gif)