Runtime Fundamentals

# 状态机播放 (State Machine Playback)

播放状态机

有关在 Rive 中设计和构建状态机的更多信息，请参阅：[状态机 (State Machine)](/docs/editor/state-machine)。
Rive 的状态机提供了一种方法来组合一组动画状态并管理它们之间的过渡，这些过渡可以使用 [数据绑定 (Data Binding)](/docs/runtimes/data-binding) 进行编程控制。

## [​](#playing-state-machines) 播放状态机

-   Web
-   React
-   React Native
-   Flutter
-   Apple
-   Android

#### [​](#autoplay-the-state-machine) 自动播放状态机 (Autoplay the State Machine)

要在加载后立即自动播放状态机，只需将 `autoplay` 设置为 `true`。

```javascript
const r = new rive.Rive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    canvas: document.getElementById('canvas'),
    autoplay: true,
    stateMachines: 'bumpy',
    onLoad: () => {}
});
```

#### [​](#controlling-state-machine-playback) 控制状态机播放 (Controlling State Machine Playback)

你可以使用 `play`、`pause` 和 `stop` 方法手动播放和暂停状态机。

```javascript
const r = new rive.Rive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    canvas: document.getElementById('canvas'),
    stateMachines: 'bumpy',
    onLoad: () => {}
});

const handlePlay = () => {
  r.play()
}

const handlePause = () => {
  r.pause()
}

const handleStop = () => {
  r.stop()
}
```

#### [​](#autoplay-the-state-machine-2) 自动播放状态机 (Autoplay the State Machine)

要默认自动播放状态机，只需将 `autoPlay` 设置为 `true`。

```javascript
export default function Simple() {
  const { RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachines: "bumpy",
    autoplay: true,
  });

  return <RiveComponent />;
}
```

#### [​](#controlling-state-machine-playback-2) 控制状态机播放 (Controlling State Machine Playback)

你可以使用 `play`、`pause` 和 `stop` 方法手动播放和暂停状态机。

```javascript
export default function Simple() {
const { rive, RiveComponent } = useRive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
  stateMachines: "bumpy",
  autoplay: true,
});

const handlePlay = useCallback(() => {
  rive?.play();
}, [rive]);

const handlePause = useCallback(() => {
  rive?.pause();
}, [rive]);

const handleStop = useCallback(() => {
  rive?.stop();
}, [rive]);

return (
  <div>
    <RiveComponent />
    <div style={{ marginTop: 12 }}>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  </div>
);
}
```

-   New Runtime (推荐)
-   Legacy Runtime

默认情况下，`RiveView` 自动使用 [在编辑器中配置](https://rive.app/docs/editor/fundamentals/artboards#default-state-machine) 的默认画板和状态机。在大多数情况下，你只需要提供 `file` 属性。为了进行编程控制，你可以选择指定 `artboardName` 和 `stateMachineName` 属性来使用不同的画板或状态机。

```javascript
export default function PlaybackExample() {
  const { riveFile } = useRiveFile({
    uri: 'https://cdn.rive.app/animations/vehicles.riv',
  });

  return (
    <View style={styles.container}>
      <View style={styles.riveContainer}>
        {riveFile ? <RiveView file={riveFile} style={styles.rive} /> : null}
      </View>
    </View>
  );
}
```

#### [​](#controlling-state-machine-playback-3) 控制状态机播放 (Controlling State Machine Playback)

为了获得更多控制，你可以管理播放并设置 **arboard**/**state-machine** 组合：

`autoPlay`
`boolean`
默认: `true`
自动开始播放状态机。

`artboardName`
`String`
要显示的画板名称。*如果未设置，将使用默认画板，如在编辑器中配置的那样。*

`stateMachineName`
`String`
要播放的状态机名称。*如果未设置，将使用默认状态机，如在编辑器中配置的那样。*

并管理 Rive 视图引用上的 `play`、`pause` 和 `reset`。

```javascript
import { Fit, RiveView, useRive, useRiveFile } from '@rive-app/react-native';

export default function PlaybackExample() {
  const { riveViewRef, setHybridRef } = useRive();
  const { riveFile } = useRiveFile({
    uri: 'https://cdn.rive.app/animations/vehicles.riv',
  });

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
            autoPlay={false}
            artboardName="Truck" // specify the artboard to play
            stateMachineName="bumpy" // specify the state machine to play
            style={styles.rive}
          />
        ) : null}
      </View>
      <Button onPress={play} title="Play" />
      <Button onPress={pause} title="Pause" />
      <Button onPress={reset} title="Reset" />
    </View>
  );
}
```

#### [​](#autoplay-the-state-machine-3) 自动播放状态机 (Autoplay the State Machine)

要默认自动播放状态机，只需将 `autoPlay` 设置为 `true`。

```javascript
  <Rive
    resourceName={'vehicles'}
    autoplay={true}
    stateMachineName="bumpy"
  />
```

#### [​](#controlling-state-machine-playback-4) 控制状态机播放 (Controlling State Machine Playback)

你可以使用 `play` 和 `pause` 方法手动播放和暂停状态机。

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
        stateMachineName="bumpy"
        ref={riveRef}
      />
      <Button onPress={handlePlayPress} title="play">
      <Button onPress={handlePausePress} title="pause">
    </View>
  );
}
```

在 Flutter 中有多种方法播放/选择状态机。

#### [​](#when-using-rivewidgetcontroller-recommended) 当使用 `RiveWidgetController` 时 (推荐)

当你创建 `RiveWidgetController` 时，它将使用默认状态机，或者你可以通过名称或索引指定状态机。

```dart
// Default state machine
var controller = RiveWidgetController(riveFile);
// By name
controller = RiveWidgetController(
  riveFile,
  stateMachineSelector: StateMachineSelector.byName("State Machine 1"),
);
// By index
controller = RiveWidgetController(
  riveFile,
  stateMachineSelector: StateMachineSelector.byIndex(0),
);
```

将此控制器传递给 `RiveWidget` 将自动播放状态机。

```dart
@override
Widget build(BuildContext context) {
  return RiveWidget(controller: controller);
}
```

你可以将控制器标记为 `active` 以播放/暂停状态机（推进和绘制）：

```dart
final controller = RiveWidgetController(riveFile);
controller.active = false;
```

`StateMachineSelector` 也可以传递给 `RiveWidgetBuilder` 以指定要使用的状态机：

```dart
return RiveWidgetBuilder(
  fileLoader: fileLoader,
  stateMachineSelector: StateMachineSelector.byIndex(0),
  builder: (context, state) => switch (state) {
    /// ...
  },
);
```

#### [​](#when-using-statemachinepainter) 当使用 `StateMachinePainter` 时

当使用 `StateMachinePainter` 时，你可以通过传递可选名称来指定要使用的状态机。

```dart
// Default state machine
final painter = rive.StateMachinePainter(withStateMachine: _withStateMachine);
// By name
painter = rive.StateMachinePainter(
  withStateMachine: _withStateMachine,
  stateMachineName: 'State Machine 1  ',
);
```

#### [​](#creating-a-state-machine-directly) 直接创建状态机

直接从 `Artboard` 创建状态机：

```dart
final artboard = riveFile.defaultArtboard()!;
// Default state machine
var stateMachine = artboard.defaultStateMachine();
// By name
stateMachine = artboard.stateMachine('State Machine 1');
// By index
stateMachine = artboard.stateMachineAt(0);
```

#### [​](#autoplay-the-state-machine-4) 自动播放状态机 (Autoplay the State Machine)

默认情况下，RiveViewModel 自动播放你给它的状态机。

### [​](#swiftui) SwiftUI

```swift
var stateChanger = RiveViewModel(
    fileName: "skills",
    stateMachineName: "Designer's Test",
    artboardName: "Banana"
)
```

### [​](#uikit) UIKit

```swift
class StateMachineViewController: UIViewController {
    var viewModel = RiveViewModel(
        fileName: "skills",
        stateMachineName: "Designer's Test",
        artboardName: "Banana"
    )

    override public func loadView() {
        super.loadView()

        guard let stateMachineView = view as? StateMachineView else {
            fatalError("Could not find StateMachineView")
        }

        viewModel.setView(stateMachineView.riveView)
    }
}
```

### [​](#play) 播放 (Play)

如果你将自动播放设置为 false，你可以非常简单地播放活动动画或状态机。

```swift
simpleVM.play()
```

### [​](#pause/stop/reset) 暂停/停止/重置 (Pause/Stop/Reset)

根据应用中的某些事件，你可能希望进一步调整播放。

```swift
simpleVM.pause()
simpleVM.stop()
simpleVM.reset()
```

#### [​](#android) Android

### [​](#via-xml) 通过 XML

```xml
<app.rive.runtime.kotlin.RiveAnimationView
    android:id="@+id/simple_state_machine"
    android:layout_width="match_parent"
    android:layout_height="400dp"
    app:riveResource="@raw/skills"
    app:riveStateMachine="Designer's Test" />
```

### [​](#via-kotlin) 通过 Kotlin

```kotlin
animationView.setRiveResource(
    R.raw.simple_state_machine,
    autoplay = true,
    stateMachineName = "Designer's Test"
)
```

此外，只要将 `isStateMachine` 属性设置为 `true`，你就可以使用与动画播放相同的 API（即 `play`、`pause` 和 `stop`）来控制状态机播放。

```kotlin
animationView.play(
    "Designer's Test",
    Loop.AUTO,
    Direction.AUTO,
    isStateMachine = true
)

animationView.pause(
    "Designer's Test",
    isStateMachine = true
)

animationView.stop(
    "Designer's Test",
    isStateMachine = true
)
```

[布局 (Layout)](/docs/runtimes/layout)[数据绑定 (Data Binding)](/docs/runtimes/data-binding)