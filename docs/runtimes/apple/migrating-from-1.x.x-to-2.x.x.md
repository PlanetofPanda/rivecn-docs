---
title: '从 1.x.x 迁移到 2.x.x'
description: '从 2.x 以下版本迁移的指南'
---

Rive Apple 运行时在 2.x.x 版本中提供了与 1.x.x 不同的 API，旨在支持 Storyboard/UIKit 和 SwiftUI 通用的内部模型。

现在 Rive API 有三个主要部分需要 iOS 开发者熟悉：

- `RiveView`：构建和操作 Rive 视图的核心逻辑
- `RiveModel`：描述 Rive 对象的配置模型
- `RiveViewModel`：集成 Rive 时的主要接口类，在某些情况下负责创建 Rive 视图。它提供了一个高级 API，简化了实例化、动画播放、布局更改等操作。

我们建议尽快迁移到最新的 v2.x.x 版本，具体步骤如下：

## UIKit

在 v1.x.x 中，您可能使用以下片段模式加载 Rive 文件：

```javascript
class SimpleAnimationViewController: UIViewController {
    let url = "https://cdn.rive.app/animations/truck.riv"

    override public func loadView() {
        super.loadView()

        let view = RiveView()
        guard let riveFile = RiveFile(httpUrl: url, with: view) else {
            fatalError("无法加载 RiveFile")
        }
        try? view.configure(riveFile)

        self.view = view
    }
}
```

这种模式与两个 Rive API（`RiveFile` 和 `RiveView`）交互。在 v2.x.x 中，模式变得更简单，只需与一个 `RiveViewModel` 交互。

```javascript
class SimpleAnimationViewController: UIViewController {
    var viewModel = RiveViewModel(fileName: "truck")
    
    override func viewWillAppear(_ animated: Bool) {
        let riveView = viewModel.createRiveView()
        view.addSubview(riveView)
        riveView.frame = view.frame
    }
}
```

这是另一个示例：

```javascript
class MultipleAnimationsController: UIViewController, RivePLayerDelegate {
    @IBOutlet weak var riveView: RiveView!
    
    var viewModel = RiveViewModel(
        fileName: "multiple_animations", 
        animationName: "Animation 1", 
        artboardName: "Animation Playground"
    )
    
    override func viewDidLoad() {
        viewModel.setView(riveView)
    }
}
```

有关配合 UIKit 使用动画播放和布局的新用法，请参阅后续的运行时页面。

### 状态机用法 (State Machine Usage)

在 v1.x.x 中，您会使用以下 API 设置状态机输入值：
`riveView.setNumberState("Number Test", inputName: "Level", value: 2.0)`

`riveView.setBooleanState("Boolean Test", inputName: "isSuccess", value: true)`

`riveView.fireState("Trigger Test", inputName: "trigFail")`

在 v2.x.x 中，一些输入状态设置器已被合并并重命名。此外，设置器是在 `RiveViewModel` 上调用的，该模型已经拥有实例化的状态机上下文，因此不再需要传递名称：
`viewModel.setInput("Level", value: 2.0)`

`viewModel.setInput("isSuccess", value: true)`

`viewModel.triggerInput("trigFail")`

### 委托 (Delegates)

过去，您可能实现了以下部分委托附带的各种函数：`LoopDelegate`、`PlayDelegate`、`PauseDelegate`、`StopDelegate` 和 `StateChangeDelegate`。您端实现的各种函数（即 `loop`、`play`、`pause`、`stateChange` 等）已合并到两个主要委托下：`RivePlayerDelegate` 和 `RiveStateMachineDelegate`，其需要覆盖的函数略有不同。

请参阅以下委托列表以了解可挂载的方法：

- `RivePlayerDelegate`：挂载到动画和状态机生命周期事件
  - `player`: `(loopedWithModel riveModel: RiveModel?, type: Int) {}`
  - `player`: `(playedWithModel riveModel: RiveModel?) {}`
  - `player`: `(pausedWithModel riveModel: RiveModel?) {}`
  - `player`: `(stoppedWithModel riveModel: RiveModel?) {}`
- `RiveStateDelegate`：挂载到状态机生命周期的状态更改
  - `stateChange`: `(_ stateMachineName: String, _ stateName: String) {}`

## SwiftUI 

v1.x.x 曾围绕现有的 `RiveView` 类提供了一个小型封装，以帮助在 SwiftUI 编写的应用上下文中支持 Rive。v2.x.x 现在支持在 SwiftUI 应用中消费 Rive 的更健壮的模式，修复了现有封装方法的几个错误，并提供了更接近 SwiftUI 新模式的体验。

关于如何使用 v2.x.x 控制动画播放、状态机等，请参阅后续的运行时页面。

```javascript
struct AnimationView: View {
    var body: some View {
        RiveViewModel(fileName: "cool_rive_animation").view()
    }
}
```