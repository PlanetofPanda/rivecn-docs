# 工具栏 (Toolbar)

工具栏位于 Rive 编辑器的顶部。

![工具栏概览](editor/interface-overview/images/filemenu.png)

## 编辑器菜单 (Editor menu)

编辑器左上角的菜单允许你对文件本身进行操作。

**修改历史 (Revision History)**

在此处可以查看文件的修改历史。你可以根据之前保存的版本恢复文件。

![修改历史](editor/interface-overview/images/revision.png)

**导出 (Export)**

这将打开导出菜单，你可以从中下载当前文件的备份。导出类型包括：
*   **Rive 原生文件 (.riv)** - 用于运行时的二进制文件
*   **备份 (.rev)** - 包含编辑器数据的完整源文件

![导出选项](editor/interface-overview/images/export_Options.png)

**分享链接 (Share Link)**

生成一个唯一的 URL，以便与他人分享你的文件。任何拥有该链接的人都可以查看该文件，甚至可以将其重新混合（Remix）成一个新文件供自己使用。

![分享链接演示](editor/interface-overview/images/sharelink.gif)

**发布到社区 (Publish to Community)**

将你的文件发布到 Rive 社区。添加标题、描述和标签，让其他人可以看到你的作品。

![发布演示](editor/interface-overview/images/publish.gif)

**渲染设置 (Render)**

更改渲染设置。你可以选择启用或禁用抗锯齿。

![渲染设置](editor/interface-overview/images/render.png)

**声音 (Sounds)**

在此处查看文件中的所有音频资产。你可以控制每个音频剪辑的音量。

![声音设置](editor/interface-overview/images/sounds.png)

**快捷键 (Shortcuts)**

查看 Rive 编辑器的快捷键列表。

![快捷键列表](editor/interface-overview/images/shortcuts.png)

## 变换工具菜单 (Transform Tools menu)

可以通过在键盘上按相应的键来快速访问这些工具。

![选择工具](editor/interface-overview/images/select.png)

1.  **选择 (Select)** (快捷键: `V`)
2.  **平移 (Translate)** (快捷键: `T`)
3.  **旋转 (Rotate)** (快捷键: `R`)
4.  **缩放 (Scale)** (快捷键: `S`)
5.  **冻结模式 (Freeze Mode)** (快捷键: `Y`) - 允许你在不更改对象当前变换值的情况下调整其轴心点或骨骼位置。

当选择平移、旋转或缩放工具时，变换 Gizmo（控件）会出现在所选对象上。

![Gizmo 演示](editor/interface-overview/images/gizmo.webp)

## 画板、布局和组菜单 (Artboard, Layout, and Groups menu)

创建用来容纳图形的画板、用于 UI 布局的布局对象，或将对象分组。

![画板和组工具](editor/interface-overview/images/artboard.png)

*   **画板 (Artboard)** (快捷键: `A`) - 在舞台上创建一个新画板。
*   **组 (Group)** (快捷键: `Cmd + G` / `Ctrl + G`) - 将当前选中的对象编组。
*   **布局 (Layout)** - 创建布局容器（行、列等）。

## 矢量工具菜单 (Vector Tools menu)

使用这里的工具绘制形状和路径。

![矢量工具](editor/interface-overview/images/createtools.png)

*   **钢笔 (Pen)** (快捷键: `P`) - 绘制自定义路径。
*   **矩形 (Rectangle)** (快捷键: `R`) - 绘制矩形。
*   **椭圆 (Ellipse)** (快捷键: `O`) - 绘制圆形或椭圆。
*   **三角形 (Triangle)** - 绘制三角形。
*   **星形 (Star)** - 绘制星形。
*   **多边形 (Polygon)** - 绘制多边形。

## 骨骼菜单 (Bones menu)

创建骨骼以构建骨骼绑定。

![骨骼工具](editor/interface-overview/images/bones.png)

*   **骨骼 (Bone)** (快捷键: `B`) - 创建骨骼。

## 事件与操纵杆菜单 (Events and Joystick Menu)

![事件工具](editor/interface-overview/images/events.png)

*   **事件 (Events)** (快捷键: `Shift + E`) - 创建用于状态机交互的事件。
*   **操纵杆 (Joystick)** - 创建用于控制混合状态的操纵杆控件。

## 视图选项菜单 (View Options menu)

控制舞台的显示选项。

![视图选项](editor/interface-overview/images/viewoptions.png)

*   **显示骨骼 (Show Bones)** - 切换骨骼的可见性。
*   **显示网格 (Show Mesh)** - 切换网格的可见性。
*   **主要/次要网格 (Primary/Secondary Grid)** - 显示背景网格。
*   **吸附到网格 (Snap to Grid)** - 开启/关闭网格吸附。
*   **像素预览 (Pixel Preview)** - 预览导出后的像素效果。

## 导出按钮 (Export Button)

位于工具栏右上角的导出按钮，功能与编辑器菜单中的导出选项相同。

![导出按钮](editor/interface-overview/images/export.png)

## 模式切换 (Mode toggle)

使用模式切换开关在 **设计 (Design)** 模式和 **动画 (Animate)** 模式之间切换。

*   **设计模式**：用于设置图形、骨骼、约束和初始状态。
*   **动画模式**：用于创建时间轴动画和状态机逻辑。

![模式切换演示](editor/interface-overview/images/switch.gif)

还可以使用快捷键 `Tab` 来快速切换模式。
