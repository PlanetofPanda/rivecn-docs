---
title: 'Apple'
description: 'Rive 的 Apple 运行时。'
---

<NoteOnFeatureSupport/>

## 概述 (Overview)

本指南介绍如何开始使用 Apple 运行时库。Rive 运行时库是开源的。源代码可在 [GitHub 仓库](https://github.com/rive-app/rive-ios) 中找到。

此库包含一个 API，供 Apple 的应用（包括 UIKit/AppKit 和 SwiftUI）轻松集成 Rive 资源。该运行时可以通过 Cocoapods 或 Swift Package Manager (SPM) 安装。

iOS 最低目标版本为 **14.0**，macOS 的目标版本为 **13.1**。

::: info
**注意**：macOS 运行时支持包含在 `v4.0.1+` 版本中。
:::

您可以运行 Rive GitHub 仓库中的 Apple 示例应用。
```bash
git clone https://github.com/rive-app/rive-ios
```

在 Xcode 中打开 `Example-iOS` 应用，并务必选择 `Preview (iOS)` 或 `Preview (macOS)` [Scheme](https://developer.apple.com/documentation/xcode/customizing-the-build-schemes-for-a-project)。其他 Scheme 仅用于开发目的，并需要额外的配置，请参阅 [CONTRIBUTING.MD](https://github.com/rive-app/rive-ios/blob/main/CONTRIBUTING.md)。

![图像](/images/runtimes/apple/f4e4f632-f24d-47ed-b19c-0c961da458e8.webp)

## 入门 (Getting Started)

按照以下步骤快速开始将 Rive 集成到您的 Apple 应用中。

### 安装依赖项

#### 通过 Cocoapods

在您的 Podspec 文件中添加以下内容：
```bash
        pod 'RiveRuntime'
```

#### 通过 Swift Package Manager

要通过 Swift Package Manager 安装，请在 Xcode 的 Package Finder 中搜索 `rive-ios` 或全路径：`https://github.com/rive-app/rive-ios`

### 导入 Rive

在您使用 Rive 运行时的文件顶部添加以下内容：
```bash
        import RiveRuntime
```

### v2 运行时用法

在 2.x.x 或更高版本的 Rive Apple 运行时中，您主要使用的对象是 `RiveViewModel`。它负责创建 Rive 资源并与其交互。

#### SwiftUI

**使用视图设置 RiveViewModel**
```javascript
        struct AnimationView: View {
            var body: some View {
                RiveViewModel(fileName: "cool_rive_animation").view()
            }
        }
```

在上面的示例中，您引用了捆绑到应用程序中的 `.riv` 资源的名称，但您也可以像这样加载托管在远程 URL 上的 `.riv` 文件：
```javascript
        struct AnimationView: View {
            var body: some View {
                RiveViewModel(
                    webURL: "https://cdn.rive.app/animations/off_road_car_v7.riv"
                ).view()
            }
        }
```

#### UIKit - Storyboard

**使用 Storyboard 上的 Controller 设置 RiveViewModel**

使用 Storyboard 将 Rive 添加到控制器最简单的方法是创建一个 `RiveViewModel`，并将其视图设置为您在 Storyboard 中创建的 `RiveView`。
```javascript
        class AnimationViewController: UIViewController {
            @IBOutlet weak var riveView: RiveView!
            var simpleVM = RiveViewModel(fileName: "cool_rive_animation")

            override public func viewDidLoad() {
                simpleVM.setView(riveView)
            }
        }
```

#### UIKit - 编程方式 (Programmatic)

**在代码中从头开始设置 RiveViewModel 及其 Controller**

您还可以完全通过代码将 Rive 添加到控制器中：创建一个 `RiveViewModel`，让它创建一个新的 `RiveView`，然后将其添加到视图层次结构中。
```javascript
        class AnimationViewController: UIViewController {
            var simpleVM = RiveViewModel(fileName: "cool_rive_animation")

            override func viewWillAppear(_ animated: Bool) {
                let riveView = simpleVM.createRiveView()
                view.addSubview(riveView)
                riveView.frame = view.bounds
            }
        }
```

请参阅后续的运行时页面，了解如何控制动画播放、状态机等。

## 资源 (Resources)

GitHub：[https://github.com/rive-app/rive-ios](https://github.com/rive-app/rive-ios) 示例：

- [https://github.com/rive-app/rive-ios/tree/main/Example-iOS](https://github.com/rive-app/rive-ios/tree/main/Example-iOS)
- [https://github.com/rive-app/rive-ios/tree/main/Demo-App](https://github.com/rive-app/rive-ios/tree/main/Demo-App)
- Meng To 的免费课程：[https://designcode.io/swiftui-rive](https://designcode.io/swiftui-rive)