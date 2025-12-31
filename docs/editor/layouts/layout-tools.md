---
title: '布局工具 (Tools)'
description: 'Rive 中提供了多种布局工具，用于构建您的响应式 UI 或内容。'
---

## 开始使用布局

有多种方法可以开始在您的设计中添加布局。

- 排列工具菜单中的布局工具
- 包裹进布局 (Wrap in Layout)
- 添加子布局 (Add Child Layout)
- 拖放布局 (Dragging and Dropping Layouts)

---

### 排列工具菜单中的布局工具

  <img src="/images/editor/layouts/53f42ad0-4045-41c4-bcfe-90a40ad0dc1d.webp" />

- **Layout (布局)：** 单个布局容器。选择该工具并在画板上拖拽即可创建布局。直接在画板上拖拽将创建一个"绝对布局"（Absolute Layout），而在现有布局上方拖拽则会创建一个"相对子布局"（Relative child）。此外，位于新创建布局边界内的任何对象都将自动被包裹在布局中，并绝对定位在新布局内部。

  <video width="700" controls>
    <source src="https://ucarecdn.com/994d9855-4783-478f-a808-e5f8e57511af/" type="video/mp4"></source>
    Layout
  </video>

- **Row/Column (行/列)：** 行和列工具创建布局的方式与上述布局工具相同，但还包括一组初始子项，这些子项将按行或列排列。在舞台上拖拽行或列时，您可以使用数字键或上/下方向键来定义子项的数量。创建的子项其宽度和高度将被设置为 **Fill**（填充）。

  <video width="700" controls>
    <source src="https://ucarecdn.com/e6fb26b0-a322-4715-8764-f484b99fd70a/" type="video/mp4"></source>
    Row/Column
  </video>

::: tip
绝对布局可以像其它 Rive 对象一样被拖动或调整大小。默认情况下，如果您将一个布局（或任何其它对象）拖动到另一个布局的边界内，它会显示一个指示器，提示您如果放下，拖动的对象将成为该布局的子级。在拖动对象时按住 `command` / `control` 键可防止现有项被移入该布局。
:::

---

### 包裹进布局 (Wrap in Layout)

除了从空的布局容器开始，您还可以将现有对象包裹进布局中。有多种方法可以将当前选中的内容包裹进布局：

- 在舞台或层级结构上右键点击，调出上下文菜单。选择 `Wrap in` > `Layout`。您可以同时对单个或多个对象执行此操作。

  <video width="700" controls>
    <source src="https://ucarecdn.com/8dc09645-bb6b-4572-a519-5f655d39e114/" type="video/mp4"></source>
    Wrap in
  </video>

- 使用快捷键 `shift` + `L`。

  <video width="700" controls>
    <source src="https://ucarecdn.com/fc768d5a-33bf-4ce5-88fe-c40257263bc2/" type="video/mp4"></source>
    `shift` + `L` 快捷键
  </video>

- 或者，您可以使用检查器中的 `Layout selection`（布局化所选内容）按钮。当仅选中非布局对象时，此项可用。

  <video width="700" controls>
    <source src="https://ucarecdn.com/cca29ef7-5762-40a7-bfb2-0b1ac9da5ee8/" type="video/mp4"></source>
    Layout selection
  </video>

---

### 添加子布局 (Add Child Layout)

当选中一个布局时，布局检查器中会出现一个 `Add Child Layout`（添加子布局）按钮。点击此按钮将添加一个新布局作为选定布局的子项，其宽度和高度默认设置为 Fill（填充）。

![Image](/images/editor/add-child-layout.png)

---

### 拖放布局

布局（包括绝对布局和相对布局）可以随时被拖放到其它布局中。这可以通过两种方式完成：

- 在层级面板中拖放布局。
- 直接在舞台上拖放布局。操作时，会有一个指示器显示拖动的布局将被插入到新父级布局的哪个位置。

![Image](/images/editor/layout-drag-drop.png)

此外，也可以通过在舞台或层级结构中选中布局并按删除键来删除布局。