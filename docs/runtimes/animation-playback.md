---
title: "动画播放 (Animation Playback)"
description: "⚠️ 已弃用：在运行时请使用状态机代替直接动画播放"
---

::: warning
**弃用通知**：本页面目前全部文档均针对旧版动画播放系统。**对于新项目：** 请改用 [状态机 (State Machines)](/runtimes/state-machines)。**对于现有项目：** 请计划尽快从直接动画控制迁移到状态机。**本内容仅为旧版支持目的而提供。**
:::

Rive 允许您指定要混合和播放的动画和状态机，并控制每个动画的播放/暂停状态。

术语“*动画 (animations)*”可以统指动画和状态机。在本章节中，我们将探讨如何处理特定的动画播放，而非状态机。

::: info
如果您尝试在运行时协调多个动画的播放，请考虑使用状态机来为您完成这项工作！
:::

## 选择初始动画 (Choosing starting animations)

在实例化 Rive 时也可以选择初始动画。如果未提供首选动画，或者未设置状态机，画板上的第一个动画可能会播放。

### Web

```javascript
    // 播放 idle 动画
    new rive.Rive({
        src: 'https://cdn.rive.app/animations/vehicles.riv',
        canvas: document.getElementById('canvas'),
        animations: 'idle',
        autoplay: true
    });
```

### React

```javascript
    // 播放 idle 动画
    export const Simple = () => (
      <Rive src="https://cdn.rive.app/animations/vehicles.riv" animations="idle" />
    );

    // 使用 `useRive` Hook:
    export default function Simple() {
      const { RiveComponent } = useRive({
        src: 'https://cdn.rive.app/animations/vehicles.riv',
        animations: ['idle'],
        autoplay: true,
      });

      return <RiveComponent />;
    }
```

### React Native

### 新版运行时 (推荐)

::: info
新版运行时仅支持状态机播放，不支持直接动画播放。
:::

### 旧版运行时

目前，在 React Native 运行时中，您可以设置一个动画在开始时自动播放。尽管如此，请参阅下方的播放章节，了解如何在播放函数中混合多个动画。

```javascript
        export default function App() {
          return (
            <View>
              <Rive
                resourceName="truck_v7"
                artboardName="Jeep"
                autoplay
                animationName="idle"
              />
            </View>
          );
        }
```

### Flutter

```dart
    // 创建 File, Artboard 和 SingleAnimationPainter
    final file = (await File.asset(
      'assets/rewards.riv',
      riveFactory: Factory.rive,
    ))!;
    final artboard = file.artboard('Main')!;
    final animationPainter = SingleAnimationPainter("Artboard Name");

    // 随后创建 widget
    return RiveArtboardWidget(
      artboard: artboard,
      painter: animationPainter,
    );
```

### Apple

默认情况下，`RiveViewModel` 会自动播放您给定的动画或状态机。

#### SwiftUI
```javascript
    struct AnimationView: View {
        var body: some View {
            RiveViewModel(
                fileName: "dancing_banana",
                animationName: "Charleston",
                artboardName: "Banana"
            ).view()
        }
    }
```

#### UIKit
```swift
    class AnimationViewController: UIViewController {
        @IBOutlet weak var riveView: RiveView!

        var bananaVM = RiveViewModel(
            fileName: "dancing_banana",
            animationName: "Charleston",
            artboardName: "Banana"
        )

        override func viewDidLoad() {
            bananaVM.setView(riveView)
        }
    }
```

### Android

在 Android 运行时中，通过 `riveAnimation` 属性指定**一个**动画。

```xml
    <app.rive.runtime.kotlin.RiveAnimationView
        app:riveAutoPlay="true"
        app:riveArtboard="Square"
        app:riveAnimation="rollaround"
        app:riveResource="@raw/artboard_animations" />
```

或者

```kotlin
    animationView.setRiveResource(
        R.raw.artboard_animations,
        artboardName = "Square",
        animationName = "rollaround",
        autoplay = true
    )
```

## 控制播放 (Controlling playback)

每个动画和状态机的播放都可以分别控制。您可以使用 `play`、`pause` 和 `stop` 方法来播放和暂停。您可以传入要影响的动画名称，或者不传入任何参数以影响所有已实例化的动画。

### Web

#### 调用播放控制

在 Web 运行时中，您可以提供回调函数，以便在特定动画事件发生时接收通知：

- `onLoad`：当 Rive 文件加载且初始化完成时调用；现在已准备好播放。
- `onPlay`：当一个或多个动画播放时调用；提供动画列表。
- `onPause`：当一个或多个动画暂停时调用；提供动画列表。
- `onStop`：当一个或多个动画停止时调用；提供动画列表。
- `onLoop`：当动画循环时调用；提供动画名称。

请访问以下 Codesandbox 链接尝试下方的代码：[https://codesandbox.io/p/sandbox/adoring-sea-n7m59f](https://codesandbox.io/p/sandbox/adoring-sea-n7m59f)

```javascript
      const idleButton = document.getElementById("idle");
      const wipersButton = document.getElementById("wipers");
      const loopDiv = document.getElementById("loop");

      const truck = new rive.Rive({
        src: "https://cdn.rive.app/animations/vehicles.riv",
        artboard: "Jeep",
        canvas: document.getElementById("canvas"),
        layout: new rive.Layout({ fit: "fill" }),
        // 监听播放事件以更新按钮文本
        onPlay: (event) => {
          const names = event.data;
          names.forEach((name) => {
            if (name === "idle") {
              idleButton.innerHTML = "停止卡车 (Stop Truck)";
            } else if (name === "windshield_wipers") {
              wipersButton.innerHTML = "停止雨刷 (Stop Wipers)";
            }
          });
        },
        // 监听暂停事件以更新按钮文本
        onPause: (event) => {
          const names = event.data;
          names.forEach((name) => {
            if (name === "idle") {
              idleButton.innerHTML = "启动卡车 (Start Truck)";
            } else if (name === "windshield_wipers") {
              wipersButton.innerHTML = "启动雨刷 (Start Wipers)";
            }
          });
        },
        onLoop: (event) => {
          loopDiv.innerHTML = `循环动画: ${event.data.animation}`;
        }
      });

      idleButton.onclick = (_) =>
        truck.playingAnimationNames.includes("idle")
          ? truck.pause("idle")
          : truck.play("idle");

      wipersButton.onclick = (_) =>
        truck.playingAnimationNames.includes("windshield_wipers")
          ? truck.pause("windshield_wipers")
          : truck.play("windshield_wipers");
```

### React

#### 调用播放控制

与 Web 非常相似，您可以传入 Rive 参数和针对特定动画事件的回调。有关您可以设置的回调示例，请参阅 Web 选项卡。此外，您可以使用 `useRive` hook 返回的 `rive` 对象来调用播放控件。

请在此处查看示例：[https://codesandbox.io/p/sandbox/adoring-sea-n7m59f](https://codesandbox.io/p/sandbox/adoring-sea-n7m59f)

```javascript
import { useState } from "react";
import { useRive, Layout, Fit } from "@rive-app/react-canvas";

export default function App() {
  const [truckButtonText, setTruckButtonText] = useState("启动卡车 (Start Truck)");
  const [wiperButtonText, setWiperButtonText] = useState("启动雨刷 (Start Wipers)");

  // 动画将显示第一帧但不开始播放
  const { rive, RiveComponent } = useRive({
    src: "https://cdn.rive.app/animations/vehicles.riv",
    artboard: "Jeep",
    layout: new Layout({ fit: Fit.Cover }),
    // 监听播放事件以更新按钮文本
    onPlay: (event) => {
      const names = event.data;
      names.forEach((name) => {
        if (name === "idle") {
          setTruckButtonText("停止卡车 (Stop Truck)");
        } else if (name === "windshield_wipers") {
          setWiperButtonText("停止雨刷 (Stop Wipers)");
        }
      });
    },
    // 监听暂停事件以更新按钮文本
    onPause: (event) => {
      const names = event.data;
      names.forEach((name) => {
        if (name === "idle") {
          setTruckButtonText("启动卡车 (Start Truck)");
        } else if (name === "windshield_wipers") {
          setWiperButtonText("启动雨刷 (Start Wipers)");
        }
      });
    },
  });

  function onStartTruckClick() {
    if (rive) {
      if (rive.playingAnimationNames.includes("idle")) {
        rive.pause("idle");
      } else {
        rive.play("idle");
      }
    }
  }

  function onStartWiperClick() {
    if (rive) {
      if (rive.playingAnimationNames.includes("windshield_wipers")) {
        rive.pause("windshield_wipers");
      } else {
        rive.play("windshield_wipers");
      }
    }
  }

  return (
    <>
      <div>
        <RiveComponent style="height: 1000px" />
      </div>
      <div>
        <button id="idle" onClick={onStartTruckClick}>
          {truckButtonText}
        </button>
        <button id="wipers" onClick={onStartWiperClick}>
          {wiperButtonText}
        </button>
      </div>
    </>
  );
}
```

### React Native

### 新版运行时 (推荐)

#### 调用播放控制

新版展示运行使用 `useRive` hook 来访问 Rive 实例以控制播放：`play`、`pause`、`reset`。

```javascript
          export default function PlaybackExample() {
            const { riveViewRef, setHybridRef } = useRive();
            const { riveFile } = useRiveFile(require('../../assets/rive/rewards.riv'));

            const play = () => {
              riveViewRef?.play();
            };

            const pause = () => {
              riveViewRef?.pause();
            };

            const reset = () => {
              riveViewRef?.reset();
            };

            return (
              <View style={styles.container}>
                <View style={styles.riveContainer}>
                  {riveFile ? (
                    <RiveView
                      file={riveFile}
                      hybridRef={setHybridRef}
                      autoPlay={true} // 自动启动状态机
                      style={styles.rive}
                    />
                  ) : null}
                </View>
                <Button onPress={play} title="播放 (Play)" />
                <Button onPress={pause} title="暂停 (Pause)" />
                <Button onPress={reset} title="重置 (Reset)" />
              </View>
            );
          }
```

### 旧版运行时

#### 调用播放控制

要触发动画播放控制，请在渲染的 Rive 组件上设置 `ref`。一旦 `ref` 被填充，您就可以触发 `play`、`pause` 等函数。请参阅 React Native 的 `ref` 方法文档 [Rive Ref Methods](/runtimes/react-native/rive-ref-methods)。

```javascript
          import Rive, { RiveRef } from 'rive-react-native'

          export default function App() {
            const riveRef = React.useRef<RiveRef>(null);

            const handlePlayPress = () => {
              riveRef?.current?.play();
            };

            const handlePausePress = () => {
              riveRef?.current?.pause();
            };

            return (
              <View>
                <Rive
                  resourceName="truck_v7"
                  animationName="idle"
                  ref={riveRef}
                />
                <Button onPress={handlePlayPress} title="播放 (play)">
                <Button onPress={handlePausePress} title="暂停 (pause)">
              </View>
            );
          }
```

### Flutter

由于 Flutter 的响应式特性，它的处理方式与其他运行时略有不同。

Flutter 中的每个动画和状态机都有一个底层 painter，用于管理状态/绘制/进位（advancing）。

为了访问动画控制，您需要创建一个 `SingleAnimationPainter` 或 `StateMachinePainter` 并将其传递给 `RiveArtboardWidget`。

或者您可以创建一个 `RiveWidgetController` 并将其传递给 `RiveWidget`，以通过功能更全的 API 控制状态机的播放（推荐）。

这种 painter 概念是可扩展的，您也可以创建自己的自定义 painter，例如同时控制多个动画。

### Apple

#### 调用播放控制

创建 `RiveViewModel` 后，您可以对该视图模型的引用调用动画播放控制方法。

通常仅需如此即可显示您的 Rive 资产。不过，我们提供了一些便利的控件，供您更精细地控制何时播放。

您还可以根据需要选择动画的循环模式作为额外参数。除了播放动画外，您还可以暂停、停止和重置动画。

不带参数播放：

- `play(animationName: String? = nil, loop: Loop = .autoLoop, direction: Direction = .autoDirection)`
  - `animationName` - 要播放的动画名称
  - `loop` - 播放动画的循环模式。可选值如下：
    - `oneShot` - 动画完整播放一次
    - `loop` - 动画播放并在设定的开始时间重复播放
    - `pingPong` - 动画从开始播放到结束，然后从结束反向播放到开始，并以此循环
    - `autoLoop` (默认) - 播放动画上设定的循环模式
  - `direction` - 播放动画的方向
    - `backwards` - 反向播放动画时间线
    - `forwards` - 正向播放动画时间线
    - `autoDirection` - 播放动画上设定的方向
- `pause()`
- `stop()`
- `reset()`

### 播放 (Play)

如果您将 autoplay 设置为 false，您可以非常简单地播放当前活动的动画或状态机。
```swift
simpleVM.play()
```

如果活动画板上有多个动画，您可以播放特定的一个。
```swift
simpleVM.play(animationName: "Fancy Animation")
```

### 暂停/停止/重置 (Pause/Stop/Reset)

根据应用中的某些事件，您可能想要进一步调整播放。
```swift
    simpleVM.pause()
    simpleVM.stop()
    simpleVM.reset()
```

#### 播放委托 (Player Delegates)

该运行时允许在 `RiveViewModel` 上设置委托。您可以使用委托定义钩子函数，在调用某些播放事件时触发。请参阅下方的类，了解如何挂载到以下播放事件：
- 已播放 (played)
- 已暂停 (paused)
- 已停止 (stopped)
- 已推进 (advanced)
- 动画已循环 (animation looped)

```swift
class ToggleViewModel: RiveViewModel {
  private let onAnimation: String = "On"
  private let offAnimation: String = "Off"
  private let startAnimation: String = "StartOff"

  var action: ((Bool) -> Void)? = nil
  var isOn = false {
      didSet {
          stop()
          play(animationName: isOn ? onAnimation : offAnimation)
          action?(isOn)
      }
  }

  init() {
      super.init(fileName: "toggle", animationName: startAnimation, fit: .cover)
  }

  func view(_ action: ((Bool) -> Void)? = nil) -> some View {
      self.action = action
      return super.view().frame(width: 100, height: 50, alignment: .center)
  }

  // 当动画播放时
  override func player(playedWithModel riveModel: RiveModel?) {
    if let animationName = riveModel?.animation?.name() {...}
  }
  // 当动画暂停时
  override func player(pausedWithModel riveModel: RiveModel?) {
    if let animationName = riveModel?.animation?.name() {...}
  }
  // 当动画停止时
  override func player(stoppedWithModel riveModel: RiveModel?) {
    if let animationName = riveModel?.animation?.name() {...}
  }
  // 当动画循环时
  override func player(loopedWithModel riveModel: RiveModel?, type: Int) {
    if let animationName = riveModel?.animation?.name() {...}
  }
  // 当动画推进时
  override func player(didAdvanceby seconds: Double, riveModel: RiveModel?) {...}
}
```

### Android

#### 调用播放控制

在为您的动画视图设置 Rive 资源后，您可以调用动画播放控制方法。

除了以编程方式播放动画外，您还可以根据需要选择循环模式和动画方向作为额外参数。此外您还可以暂停或停止动画。

```kotlin
    // 播放一个动画
    animationView.play("rollaround")

    // 设置循环模式和方向
    animationView.play("rollaround", Loop.ONE_SHOT, Direction.Backwards)

    animationView.pause()
    animationView.pause("bouncing")

    animationView.stop()
    animationView.stop("bouncing")
```

#### 动画事件监听器 (Animation Event Listeners)

Rive Android 运行时还支持监听器注册。请查看 [rive player](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/AndroidPlayerActivity.kt) 中的事件部分获取示例。

```kotlin
    val listener = object : Listener {
        override fun notifyPlay(animation: PlayableInstance) {
            var text: String? = null
            if (animation is LinearAnimationInstance) {
                text = animation.name
            }
        }

        override fun notifyPause(animation: PlayableInstance) {
            var text: String? = null
            if (animation is LinearAnimationInstance) {
                text = animation.name
            }
        }

        override fun notifyStop(animation: PlayableInstance) {
            var text: String? = null
            if (animation is LinearAnimationInstance) {
                text = animation.name
            }
        }

        override fun notifyLoop(animation: PlayableInstance) {
            var text: String? = null
            if (animation is LinearAnimationInstance) {
                text = animation.name
            }
        }
    }
    animationView.registerListener(listener)
```

查看此 Activity 示例：
[LoopModeActivity.kt](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LoopModeActivity.kt)
