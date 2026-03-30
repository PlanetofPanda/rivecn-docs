---
layout: home
title: Rive 中文文档
titleTemplate: 交互式动画的未来
description: Rive 官方中文用户手册，深入讲解 Rive 实时可交互动画在 Web、iOS、Android 和游戏引擎中的原理与实战开发指南，助你实现极致还原。
head:
  - - meta
    - name: keywords
      content: Rive教程, 交互动画, Lottie替代品, WebGL动画, 状态机动画, 游戏UI设计
  - - meta
    - property: og:title
      content: Rive 中文官方文档 - 跨平台实时交互动画引擎
  - - meta
    - property: og:description
      content: 设计师创建，开发者集成，彻底终结还原度问题。全面覆盖 Rive 状态机与各种语言的 Runtime 运行时体系。
  - - script
    - type: application/ld+json
    - "{\"@context\": \"https://schema.org\", \"@type\": \"SoftwareApplication\", \"name\": \"Rive CN Documentation\", \"operatingSystem\": \"All\", \"applicationCategory\": \"DesignApplication\", \"description\": \"The official localized Chinese documentation for Rive - a real-time interactive design and animation tool.\", \"url\": \"https://rive.org.cn/docs\", \"inLanguage\": \"zh-CN\", \"publisher\": {\"@type\": \"Organization\", \"name\": \"PlanetofPanda & Rive Community\"}}"

hero:
  name: "Rive 中文技术手册"
  text: "重新定义交互设计"
  tagline: "设计师可视编排，开发者一行调用。用状态机构建高性能实时互动产品。"
  image:
    src: /hero-image.svg
    alt: Rive
  actions:
    - theme: brand
      text: 🚀 即可快速开始
      link: /guide/introduction
    - theme: alt
      text: 👨‍💻 运行时开发
      link: /runtimes/overview

features:
  - icon: 🎨
    title: 可视化编辑器体验
    details: 在强大的 Rive Web 端或原生端利用矢量路径和骨骼系统，无缝搭建次时代动态设计原型。
    link: /editor/fundamentals/overview
  - icon: ⚡️
    title: 前沿状态机 (State Machine)
    details: 在设计中内置输入变量（Input）、图层侦听器，实现脱离代码的复杂交互业务逻辑。
    link: /editor/state-machine/overview
  - icon: 📱
    title: 跨终端运行时 (App Runtimes)
    details: 性能拉满的开源渲染层，涵盖 Web、Flutter、React Native 以及原生 iOS/Android 的接入指南。
    link: /runtimes/overview
  - icon: 🎮
    title: 游戏引擎深度集成
    details: 提供针对 Unity、Unreal Engine 的定制库，让你的游戏 UI 和动效直接原地起飞。
    link: /games/unity
---

## 🌟 从 Lottie 迈向更自由的未来

Rive 不仅仅是一个常规的动画导出工具，它是一个**实时的交互设计运行时（Runtime）引擎**。

抛弃传统的 `json` 与定死时间的视频或 GIF。Rive 文件是轻量的、完全矢量的，最重要的是 —— **高度基于逻辑的互动式体验**，一切都能通过前端代码中的参数直接驱动。

::: tip 生产力变革
在 Rive 中，不仅能在工作台里调整曲线与特效；还能**由设计师主导设定复杂的点击、悬停、骨骼跟随鼠标等系统级反馈流**。最终输出到开发者手里的是完美契合需求的安全包。
:::

## 🚀 为什么选用 Rive？

- **独家的状态机调度**：不再需要写满篇的 JS 回调，使用可视化节点系统连线出复杂的动作反馈图（比如让主角跳跃或者眨眼）。
- **极小体积 + 极高性能**：用 C++ 构建的专属底层渲染引擎，能将成堆的像素渲染效率提升几个量级。
- **全生态全维度通吃**：不管你是 Web 开发、移动客户端还是 3D 游戏，官方维护的一线运行时保证你在任何场景都可以流畅加载。

## 📚 入门核心直通车

- 👉 [编辑器到底怎么用？](/editor/interface-overview/overview)
- 👉 [零基础理解状态机机制](/editor/state-machine/overview)
- 👉 [Web 开发者如何把 Rive 塞进网页里？](/runtimes/web)
- 👉 [下载属于自己的离线版 Rive](https://rive.app/downloads)

<Roadmap />
