基础概念

# 原点与冻结 (Origin / Freeze)

原点 (Origin) 是对象在舞台上进行变换（如旋转或缩放）的基础点。

## [​](#origin) 原点 (Origin)

你可以将原点视为对象变换的中心。当你旋转一个对象时，它会绕着原点旋转；当你缩放一个对象时，它会向着或背离原点进行缩放。

默认情况下，大多数对象的原点都位于其几何中心。
![原点示例 Pn](images/origin-gizmo.png)

## [​](#freeze) 冻结 (Freeze)

冻结功能允许你在不影响对象当前视觉位置的情况下，重新定位其原点。这在绑定骨骼或调整复杂形状的旋转中心时非常有用。

在 Rive 编辑器中，你可以通过按下快捷键 `Y` 来启用冻结模式，然后自由拖动原点。
![冻结示例 Pn](images/freezing.gif)

[导入资源 (Importing Assets)](/editor/fundamentals/importing-assets.md)[钢笔工具概览 (Pen Tool Overview)](/editor/fundamentals/pen-tool-overview.md)