---
title: '资源占用 (Resource Usage)'
description: ''
---

本页面概述了在将 Rive 与其他库的资源占用（特别是 CPU 和内存）进行比较时的一些额外注意事项。

需要注意的重要一点是，Rive 直接使用 Metal API 而非其他 API 和框架（如 Core Animation），以便能够调整其使用方式以获得最佳性能。

要准确了解 Rive 所使用的总体 CPU 和内存情况，除了使用其他模板外，请考虑在 Xcode 中使用 “Activity Monitor” (活动监视器) 模板。

由于 Rive 直接使用 Metal，CPU 占用和内存分配会出现在应用进程中。而其他 API 可能会利用其他系统进程，这些统计数据无法通过 Xcode 或 Instruments 直接查看到。

## Core Animation

::: info
Lottie 是使用 Core Animation 的一个库示例。
:::

对于使用 Core Animation 的库，其逻辑和渲染是在一个名为 “Render Server” (渲染服务器，即 `backboardd`) 的独立进程中管理的。这样一来，CPU 和内存占用不会由应用进程本身报告，而是由 `backboardd` 报告，而 Xcode 和 Instruments 默认并不监控该进程。

默认情况下，Xcode 和 Instruments 显示的是其正在监控（并挂载）的单个进程的统计数据。除非另外指定，否则这通常是您正在开发的应用。使用 Core Animation 的库，其资源占用除出现在应用进程外，还会出现在 “Render Server” 进程 `backboardd` 中。

通过在分析您的应用进程的 **同时** 分析 `backboardd` 进程，可以发现资源占用的 **总体** 差异。这可以通过使用 Instruments 的 “Activity Monitor” 模板，并按您的应用和 `backboardd` 进程进行过滤来实现。
