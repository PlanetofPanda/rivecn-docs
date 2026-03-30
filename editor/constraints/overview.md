---
title: "约束概览 (Constraints Overview) - Rive 编辑器"
description: "约束 (Constraints) 学习如何在 Rive 中使用约束。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 约束, 约束概览
---

约束 (Constraints)

# 约束概览 (Constraints Overview)

学习如何在 Rive 中使用约束。

约束 (Constraints) 是一种通过另一个"目标对象"来控制某个对象属性的方法。某些约束可以限制这些属性的取值范围（及其层级关系），而另一些则可以从一个对象复制属性到另一个对象。

约束的常见应用场景：

- 让角色的眼睛跟随一个目标点移动。
![眼睛跟随示例](https://help.rive.app/images/image_0.png)

- 确保角色的脚站在地面上时，腿部自动在膝盖处弯曲（反向动力学）。
![IK 示例](https://help.rive.app/images/image_1.png)

- 让车辆的所有轮子同时旋转。
- 让时钟的指针旋转。
- 复制另一个对象的位移、旋转或缩放。
- 当一个对象靠近时，推开另一个对象；或者确保一个对象始终靠近另一个对象。

Rive 中的约束类型：

- [IK 约束 (IK Constraint)](/editor/constraints/ik-constraint.md)
- [距离约束 (Distance Constraint)](/editor/constraints/distance-constraint.md)
- [变换约束 (Transform Constraint)](/editor/constraints/transform-constraint.md)
- [位移约束 (Translation Constraint)](/editor/constraints/translation-constraint.md)
- [缩放约束 (Scale Constraint)](/editor/constraints/scale-constraint.md)
- [旋转约束 (Rotation Constraint)](/editor/constraints/rotation-constraint.md)
- [路径跟随约束 (Follow Path Constraint)](/editor/constraints/follow-path-constraint.md)
- [滚动约束 (Scroll Constraint)](/editor/constraints/scroll-constraint.md)

[字体 (Fonts)](/editor/text/fonts.md)[IK 约束 (IK Constraint)](/editor/constraints/ik-constraint.md)