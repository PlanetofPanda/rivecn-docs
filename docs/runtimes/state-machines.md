---
title: "状态机播放 (State Machine Playback)"
description: "播放状态机"
---

有关在 Rive 中设计和构建状态机的更多信息，请参阅：[状态机 (State Machine)](/editor/state-machine)。

Rive 的状态机提供了一种组合一组动画状态并管理它们之间转换的方法，这些转换可以通过 [数据绑定 (Data Binding)](/runtimes/data-binding) 进行编程控制。

## 播放状态机 (Playing State Machines)

### Web

#### 自动播放状态机 (Autoplay the State Machine)

要在状态机加载后立即自动播放，只需将 `autoplay` 设置为 `true`。

```javascript
    const r = new rive.Rive({
        src: 'https://cdn.rive.app/animations/vehicles.riv',
        canvas: document.getElementById('canvas'),
        autoplay: true,
        stateMachines: 'bumpy',
        onLoad: () => {}
    });
```

#### 控制状态机播放 (Controlling State Machine Playback)

您可以使用 `play`、`pause` 和 `stop` 方法手动播放和暂停状态机。

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

### React

#### 自动播放状态机 (Autoplay the State Machine)

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

#### 控制状态机播放 (Controlling State Machine Playback)

您可以使用 `play`、`pause` 和 `stop` 方法手动播放和暂停状态机。

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
          <div >
            <button onClick={handlePlay}>播放 (Play)</button>
            <button onClick={handlePause}>暂停 (Pause)</button>
            <button onClick={handleStop}>停止 (Stop)</button>
          </div>
        </div>
      );
    }
```

### React Native

### 新版运行时 (推荐)

默认情况下，`RiveView` 会自动使用在 [编辑器中配置](https://rive.app/docs/editor/fundamentals/artboards#default-state-machine) 的默认画板和状态机。在大多数情况下，您只需提供 `file` 属性即可。

对于编程控制，您可以根据需要指定 `artboardName` 和 `stateMachineName` 属性，以使用不同的画板或状态机。

```ts
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

#### 控制状态机播放 (Controlling State Machine Playback)

为了获得更多控制权，您可以管理播放和设置 **画板**/**状态机** 组合：

<ResponseField name="autoPlay" type="boolean" default="true">
自动开始播放状态机。
</ResponseField>
<ResponseField name="artboardName" type="String">
  要显示的画板名称。
  
  _如果未设置，将使用编辑器中配置的默认画板。_
</ResponseField>
<ResponseField name="stateMachineName" type="String">
 要播放的状态机名称。

_如果未设置，将使用编辑器中配置的默认状态机。_
 </ResponseField>

并且可以在 Rive 视图引用上管理 `play`、`pause` 和 `reset`。

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
                    artboardName="Truck" // 指定要播放的画板
                    stateMachineName="bumpy" // 指定要播放的状态机
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

#### 自动播放状态机 (Autoplay the State Machine)

要默认自动播放状态机，只需将 `autoPlay` 设置为 `true`。

```jsx
          <Rive
            resourceName={'vehicles'}
            autoplay={true}
            stateMachineName="bumpy"
          />
```

#### 控制状态机播放 (Controlling State Machine Playback)

您可以使用 `play` 和 `pause` 方法手动播放和暂停状态机。

```jsx
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
              <Button onPress={handlePlayPress} title="播放 (play)">
              <Button onPress={handlePausePress} title="暂停 (pause)">
            </View>
          );
        }
```

### Flutter

在 Flutter 中有多种播放/选择状态机的方法。

#### 使用 `RiveWidgetController` 时（推荐）

当您创建一个 `RiveWidgetController` 时，它会使用默认的状态机，或者您可以通过名称或索引来指定状态机。

```dart
    // 默认状态机
    var controller = RiveWidgetController(riveFile);
    // 按名称
    controller = RiveWidgetController(
      riveFile,
      stateMachineSelector: StateMachineSelector.byName("State Machine 1"),
    );
    // 按索引
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

您可以将控制器标记为 `active` 以播放/暂停状态机（步进和绘制）：

```dart
    final controller = RiveWidgetController(riveFile);
    controller.active = false;
```

`StateMachineSelector` 也可以传递给 `RiveWidgetBuilder` 来指定使用哪个状态机：

```dart
    return RiveWidgetBuilder(
      fileLoader: fileLoader,
      stateMachineSelector: StateMachineSelector.byIndex(0),
      builder: (context, state) => switch (state) {
        /// ...
      },
    );
```

#### 使用 `StateMachinePainter` 时

使用 `StateMachinePainter` 时，您可以通过传递可选名称来指定要使用的状态机。

```dart
    // 默认状态机
    final painter = rive.StateMachinePainter(withStateMachine: _withStateMachine);
    // 按名称
    painter = rive.StateMachinePainter(
      withStateMachine: _withStateMachine,
      stateMachineName: 'State Machine 1  ',
    );
```

#### 直接创建状态机

直接从 `Artboard` 创建状态机：

```dart
    final artboard = riveFile.defaultArtboard()!;
    // 默认状态机
    var stateMachine = artboard.defaultStateMachine();
    // 按名称
    stateMachine = artboard.stateMachine('State Machine 1');
    // 按索引
    stateMachine = artboard.stateMachineAt(0);
```

### Apple

#### 自动播放状态机 (Autoplay the State Machine)

默认情况下，RiveViewModel 会自动播放您通过它设置的状态机。

#### SwiftUI
```swift
    var stateChanger = RiveViewModel(
        fileName: "skills",
        stateMachineName: "Designer's Test",
        artboardName: "Banana"
    )
```

#### UIKit
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
                fatalError("无法找到 StateMachineView")
            }

            viewModel.setView(stateMachineView.riveView)
        }
    }
```

#### 播放 (Play)

如果您将 autoplay 设置为 false，则可以非常简单地播放当前的动画或状态机。

```swift
    simpleVM.play()
```

#### 暂停/停止/重置 (Pause/Stop/Reset)

根据应用中的某些事件，您可能希望进一步调整播放。

```swift
    simpleVM.pause()
    simpleVM.stop()
    simpleVM.reset()
```

### Android

#### 通过 XML 方式

```kotlin
    <app.rive.runtime.kotlin.RiveAnimationView
        android:id="@+id/simple_state_machine"
        android:layout_width="match_parent"
        android:layout_height="400dp"
        app:riveResource="@raw/skills"
        app:riveStateMachine="Designer's Test" />
```

#### 通过 Kotlin 方式

```kotlin
    animationView.setRiveResource(
        R.raw.simple_state_machine,
        autoplay = true,
        stateMachineName = "Designer's Test"
    )
```

此外，只要您将 `isStateMachine` 属性设置为 `true`，就可以使用动画播放中的相同 API（即 `play`、`pause` 和 `stop`）来控制状态机播放。

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
