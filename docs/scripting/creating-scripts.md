---
title: "创建脚本 (Creating Scripts)"
description: "了解如何在 Rive 中创建并向场景中添加脚本。"
---

有两种创建新脚本的方法：通过资产面板 (Assets Panel) 或使用脚本工具 (Scripting tool)。

### 通过资产面板创建脚本

1. 在资产面板中，点击 `+` 按钮。
2. 选择 **Script**，然后选择您想要创建的 [脚本类型](/scripting/protocols)。

![通过资产面板创建脚本](/images/scripting/assets-panel-create-script.png)

### 使用脚本工具创建脚本

1. 点击工具栏中脚本按钮旁边的下拉图标。
2. 选择您想要创建的 [脚本类型](/scripting/protocols)。

![使用脚本工具创建脚本](/images/scripting/script-tool-create-script.png)

新脚本将作为资产保存，并可以在资产面板中找到。

::: tip
请为脚本名称使用 **大驼峰命名法 (PascalCase)**，并相应地更新脚本的类型名称。

示例：如果脚本命名为 `MyConverter`，则主类型也应命名为 `MyConverter`。
:::

## 向场景中添加脚本 (Adding Scripts to Your Scene)

要运行 [节点 (Node)](/scripting/protocols/node-scripts) 和 [布局 (Layout)](/scripting/protocols/layout-scripts) 脚本，需要将它们添加到场景中。

1. 右键点击您想要添加脚本的画板，然后从菜单中选择您的脚本。
2. 放置脚本对象，请记住脚本的位置将决定其渲染的位置。
3. 选择组以设置输入（参见 [脚本输入](/scripting/script-inputs)）。

![向画板添加脚本](/images/scripting/add-script-to-artboard.gif)

::: tip
**故障排除：如果您在列表中没看到脚本：**

1. 确保您的脚本已存在于资产面板中。
2. 检查 [问题面板 (Problems Panel)](/scripting/debugging/debug-panel#problems) 是否报错。
3. 确保您的脚本返回一个函数，该函数返回一个至少包含 `init` 和 `draw` 函数的表 (table)。
:::
