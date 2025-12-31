---
title: "协议 (Protocols)"
description: ""
---

协议是脚本的结构化类别，它们告诉编辑器您想要创建什么。

Rive 目前提供五种协议，未来还会推出更多：

- [节点 (Node)](/scripting/protocols/node-scripts)
- [布局 (Layout)](/scripting/protocols/layout-scripts)
- [转换器 (Converter)](/scripting/protocols/converter-scripts)
- [路径效果 (Path Effect)](/scripting/protocols/path-effect-scripts)
- [测试 (Test)](/scripting/protocols/test-scripts)

每种协议代表编辑器可以生成的不同种类的脚本：塑造数据的转换器、自定义绘制函数、布局辅助工具、测试工具集，以及可以附加到描边的路径效果等等。

选择一种协议会生成一个类型化的脚手架，定义了允许您操作的范围。从那里开始，您可以处理 Rive 原生概念（路径、形状、视图模型、艺术板、状态机、时间轴），但始终是通过您选择的协议的视角来进行。这能保持脚本的专一性，防止出现“在任何地方做任何事”的混乱局面。
