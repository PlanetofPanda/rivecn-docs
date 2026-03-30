---
title: "Apple - Rive 运行时"
description: "Rive 的 Apple 运行时。 请注意，某些 Rive 功能可能尚未在特定运行时中受支持，或者可能需要使用 Rive 渲染器。有关更多详细信息，请参阅 功能支持 和 选择渲染器 页面。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 运行时, Apple
---

Apple

# Apple

Rive 的 Apple 运行时。

请注意，某些 Rive 功能可能尚未在特定运行时中受支持，或者可能需要使用 Rive 渲染器。有关更多详细信息，请参阅 [功能支持](/feature-support.md) 和 [选择渲染器](/runtimes/choose-a-renderer) 页面。

## [​](#overview) 概览

本指南记录了如何开始使用 Apple 运行时库。Rive 运行时库是开源的。源代码可在其 [GitHub 仓库](https://github.com/rive-app/rive-ios) 中找到。
该库包含一个 API，供 Apple 应用程序轻松地将 Rive 资产集成到 UIKit/AppKit 和 SwiftUI 中。该运行时也可以通过 Cocoapods 或 Swift Package Manager 安装。
最低 iOS 目标为 **14.0**，macOS 目标为 `13.1`。

**注意：** macOS 运行时支持包含在 `v4.0.1+` 中。

你可以从 Rive GitHub 仓库运行我们的 Apple 示例应用程序。

```bash
git clone https://github.com/rive-app/rive-ios
```

在 XCode 中打开 `Example-iOS` 应用程序，并务必选择 `Preview (iOS)` 或 `Preview (macOS)` [scheme](https://developer.apple.com/documentation/xcode/customizing-the-build-schemes-for-a-project)。其他 scheme 用于开发目的，需要额外的配置，请参阅 [CONTRIBUTING.MD](https://github.com/rive-app/rive-ios/blob/main/CONTRIBUTING.md)。
![Image](https://help.rive.app/images/f4e4f632-f24d-47ed-b19c-0c961da458e8.webp)

## [​](#getting-started) 快速开始

按照以下步骤快速在你的 Apple 应用中集成 Rive。

1.  **安装依赖**

    #### [​](#via-cocoapods) 通过 Cocoapods

    将以下内容添加到你的 Podspec 文件中：

    ```ruby
    pod 'RiveRuntime'
    ```

    #### [​](#via-swift-package-manager) 通过 Swift Package Manager

    要通过 Swift Package Manager 安装，请在 Xcode 的包查找器中搜索 `rive-ios` 或完整的 Github 路径：`https://github.com/rive-app/rive-ios`

2.  **导入 Rive**

    在你使用 Rive 运行时的文件顶部添加以下内容：

    ```swift
    import RiveRuntime
    ```

3.  **v2 运行时使用**

    在版本 2.x.x 或更高版本的 Rive Apple 运行时中，你将使用的主要对象是 `RiveViewModel`。它负责创建和与 Rive 资产交互。

    #### [​](#swiftui) SwiftUI

    **设置 RiveViewModel 与 View**

    ```swift
    struct AnimationView: View {
        var body: some View {
            RiveViewModel(fileName: "cool_rive_animation").view()
        }
    }
    ```

    在上面的示例中，你引用了绑定到应用程序中的 `.riv` 资产的名称，但你也可以加载托管在远程 URL 上的 `.riv` 文件，如下所示：

    ```swift
    struct AnimationView: View {
        var body: some View {
            RiveViewModel(
                webURL: "https://cdn.rive.app/animations/off_road_car_v7.riv"
            ).view()
        }
    }
    ```

    #### [​](#uikit-storyboard) UIKit - Storyboard

    #### [​](#set-up-riveviewmodel-w/-controller-formatted-on-a-storyboard) 使用 Storyboard 格式化的控制器设置 RiveViewModel

    使用 Storyboard 将 Rive 添加到控制器的最简单方法是创建一个 `RiveViewModel`，并将其视图设置为你在 Storyboard 中创建的 `RiveView`。

    ```swift
    class AnimationViewController: UIViewController {
        @IBOutlet weak var riveView: RiveView!
        var simpleVM = RiveViewModel(fileName: "cool_rive_animation")

        override public func viewDidLoad() {
            simpleVM.setView(riveView)
        }
    }
    ```

    #### [​](#uikit-programmatic) UIKit - 编程方式 (Programmatic)

    #### [​](#set-up-riveviewmodel-w/-controller-from-scratch-in-code) 在代码中从头开始使用控制器设置 RiveViewModel

    你也可以完全通过代码将 Rive 添加到控制器，方法是创建 `RiveViewModel`，告诉它创建一个新的 `RiveView`，然后将其添加到视图层次结构中。

    ```swift
    class AnimationViewController: UIViewController {
        var simpleVM = RiveViewModel(fileName: "cool_rive_animation")

        override func viewWillAppear(_ animated: Bool) {
            let riveView = simpleVM.createRiveView()
            view.addSubview(riveView)
            riveView.frame = view.bounds
        }
    }
    ```

    查看后续运行时页面以了解如何控制动画播放、状态机等。

## [​](#resources) 资源

Github: <https://github.com/rive-app/rive-ios> 示例:

-   <https://github.com/rive-app/rive-ios/tree/main/Example-iOS>
-   <https://github.com/rive-app/rive-ios/tree/main/Demo-App>
-   Meng To 的免费课程: <https://designcode.io/swiftui-rive>

[迁移指南](https://help.rive.app/runtimes/flutter/migration-guide)[从 1.x.x 迁移到 2.x.x](https://help.rive.app/runtimes/apple/migrating-from-1.x.x-to-2.x.x)