Unity

# Unity

Rive 的 Unity 运行时。

Rive Unity 运行时目前处于 Unity 的 Mac 和 Windows 安装的 **技术预览 (Technical Preview)** 阶段。随着我们扩展平台支持，我们希望收集有关 API 和功能集的反馈。请通过我们的 [社区](https://community.rive.app/c/support/) 或 [支持渠道](https://rive.atlassian.net/servicedesk/customer/portals) 联系我们。

有关 Unity 中 Rive 功能的更新列表，请参阅下面的 [功能支持](#feature-support)。

## [​](#unity-version-support) Unity 版本支持

该包支持从 2021 开始的 Unity LTS 版本（包括 Unity 6）。

## [​](#rendering-support) 渲染支持

rive-unity 运行时使用 [Rive 渲染器](https://rive.app/renderer) 并且与最新的 Rive C++ 运行时版本保持同步。

-   [WebGL](https://github.com/rive-app/rive-unity/blob/main/WEBGL.md)
-   Metal on Mac
-   Metal on iOS
-   D3D11 on Windows
-   OpenGL on Windows
-   OpenGL on Android
-   Vulkan on Windows
-   Vulkan on Android
-   Vulkan on Ubuntu 24.04+ (x86\_64)

计划支持：

-   D3D12

### [​](#bug-reports) 错误报告

如果你在集成 Rive Unity 运行时时遇到任何错误或意外崩溃，我们建议直接在 [rive-unity](https://github.com/rive-app/rive-unity/issues) 仓库中记录详细问题，并附上 **Editor.log** 以帮助提供有关可能发生情况的更多详细信息和上下文。
你可以在 [Unity 文档](https://docs.unity3d.com/Manual/LogFiles.html) 中找到有关在哪里找到 Editor.log 文件的更多详细信息。

请注意，最好在崩溃发生后立即获取 Editor.log 文件。

## [​](#feature-support) 功能支持

rive-unity 运行时使用最新的 Rive C++ 运行时。有关运行时支持的更多详细信息，请参阅 [功能支持](/docs/feature-support) 页面。请参阅下表了解 Unity 运行时当前支持的内容。

| **功能** | **支持** |
| --- | --- |
| [动画播放](/docs/runtimes/animation-playback) | ✅ |
| [适应与对齐 (Fit & Alignment)](/docs/runtimes/layout#fit) | ✅ |
| [监听器 (Listeners)](/docs/game-runtimes/unity/listeners) | ✅ |
| [设置状态机输入 (Setting State Machine Inputs)](/docs/runtimes/inputs) | ✅ |
| [监听事件 (Listening to Events)](/docs/runtimes/rive-events) | ✅ |
| [运行时更新文本 (Updating text at runtime)](/docs/runtimes/text) | ✅ |
| [带外资产 (Out-of-band assets)](/docs/runtimes/loading-assets) | ✅ |
| [程序化渲染 (Procedural rendering)](/docs/game-runtimes/unity/procedural-rendering) | ✅ |
| PNG 图像 | ✅ |
| JPEG 图像 | ✅ |
| WEBP 图像 | ✅ |

[常见用例](/docs/game-runtimes/unreal/common-use-cases)[快速开始](/docs/game-runtimes/unity/getting-started)