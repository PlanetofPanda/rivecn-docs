Unity

# Unity

Unity runtime for Rive.

The Rive Unity runtime is currently in **Technical Preview** for Mac and Windows installs of Unity. We’re hoping to gather feedback about the API and feature-set as we expand platform support. Please reach out to us on our [Community](https://community.rive.app/c/support/) or through our [Support Channel](https://rive.atlassian.net/servicedesk/customer/portals).

See [Feature Support](#feature-support) below for an updated list of Rive features in Unity.

## [​](#unity-version-support) Unity Version Support

The package supports Unity LTS versions from 2021 upwards (including Unity 6).

## [​](#rendering-support) Rendering Support

The rive-unity runtime uses the [Rive Renderer](https://rive.app/renderer) and is up to date with the latest C++ runtime version of Rive.

- [WebGL](https://github.com/rive-app/rive-unity/blob/main/WEBGL.md)
- Metal on Mac
- Metal on iOS
- D3D11 on Windows
- OpenGL on Windows
- OpenGL on Android
- Vulkan on Windows
- Vulkan on Android
- Vulkan on Ubuntu 24.04+ (x86\_64)

Planned support for:

- D3D12

### [​](#bug-reports) Bug Reports

If you encounter any errors or unexpected crashes while integrating the Rive Unity runtime, we recommend logging a detailed issue directly to the [rive-unity](https://github.com/rive-app/rive-unity/issues) repo with an **Editor.log** attached to the issue to help provide more details and context about what might have occurred.
You can find more details on where to find your Editor.log file in the [Unity docs](https://docs.unity3d.com/Manual/LogFiles.html).

Note that it is best to grab the Editor.log file immediately after a crash has occurred

## [​](#feature-support) Feature Support

The rive-unity runtime uses the latest Rive C++ runtime. For more details on runtime support, see the [Feature Support](/docs/feature-support) page. Refer to the following table for what is currently supported in the Unity runtime.

| **Feature** | **Supported** |
| --- | --- |
| [Animation Playback](/docs/runtimes/animation-playback) | ✅ |
| [Fit & Alignment​](/docs/runtimes/layout#fit) | ✅ |
| [Listeners​](/docs/game-runtimes/unity/listeners) | ✅ |
| [Setting State Machine Inputs​](/docs/runtimes/inputs) | ✅ |
| [Listening to Events](/docs/runtimes/rive-events) | ✅ |
| [Updating text at runtime](/docs/runtimes/text) | ✅ |
| [Out-of-band assets](/docs/runtimes/loading-assets) | ✅ |
| [Procedural rendering](/docs/game-runtimes/unity/procedural-rendering) | ✅ |
| PNG images | ✅ |
| JPEG images | ✅ |
| WEBP images | ✅ |

[Common Use Cases](/docs/game-runtimes/unreal/common-use-cases)[Getting Started](/docs/game-runtimes/unity/getting-started)