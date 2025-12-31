---
title: "Rive 事件 (Rive Events)"
description: "⚠️ 已弃用：请使用数据绑定 (Data Binding) 代替事件"
---

import { YouTube } from "/snippets/youtube.mdx";

::: warning
**弃用通知**：本页面目前全部文档均针对旧版事件系统。
  **对于新项目：** 请改用 [数据绑定 (Data Binding)](/runtimes/data-binding)。
  **对于现有项目：** 请计划尽快从事件系统迁移到数据绑定。**本内容仅为旧版支持目的而提供。**
:::

通过 Rive 事件，您可以订阅动画、状态机和 Rive 监听器发出的有意义的信号，这些信号都是在设计时通过 Rive 编辑器创建的。这些信号可以在运行时订阅，并具有特定的名称、类型以及可能随事件附带的各种自定义元数据，以帮助告知其含义的背景上下文。

有关事件功能的更多一般信息，请查看文档编辑器部分的 [事件 (Events)](/editor/events/overview) 页面。事件系统还扩展了对 [音频事件 (Audio Events)](/editor/events/audio-events) 的支持，以便在编辑器和运行时触发音频播放。

例如，在一个模拟加载器的 Rive 图形中，从 `complete` 时间轴动画状态转换为 `idle` 状态时，可能会触发一个名为 `LoadComplete` 的事件。您可以使用运行时调用的回调来订阅 Rive 事件，从该回调中，您可以处理在事件触发的恰当时刻执行的额外功能。

事件的其他实际应用场景：

- 在动画的特定时刻协调音频播放，参见 [音频事件 (Audio Events)](/editor/events/audio-events)
- 在发生特定交互时打开 URL
- 在有意义的触摸交互中添加触感反馈
- 在按钮和其他 UI 元素上实现功能
- 发送语义信息
- 在恰当时刻传达运行时所需的任何信息

## 订阅事件 (Subscribing to Events)

当您在运行时订阅 Rive 事件时，您订阅的是状态机可能发出的 **所有** Rive 事件，您可以按名称或类型解析每个事件以执行条件逻辑。

让我们以一个 5 星评分 Rive 示例为例，设置事件提供的任何文本，并在提供 URL 的情况下打开该 URL。

### Web

#### 示例 (Examples)

- [星级评分示例](https://codesandbox.io/p/sandbox/rive-events-js-forked-gkwjqr)
- [Neostream 示例 (仅限 Chrome)](https://codesandbox.io/p/sandbox/neostream-rive-events-js-forked-g7t3xl)（此示例未使用新的 [音频事件](/editor/events/audio-events) 功能）

#### 高级 API 用法

##### 添加事件监听器

与 DOM 元素的 `addEventListener()` / `removeEventListener()` API 类似，您将使用 Rive 实例的 `on()` / `off()` API 来订阅 Rive 事件。只需提供 RiveEvent 枚举和一个让运行时在检测到任何 Rive 事件的适当时刻调用的回调即可。

##### 用法示例

```javascript
        import { Rive, EventType, RiveEventType } from '@rive-app/canvas'

        const r = new Rive({
        src: "/static-assets/star-rating.riv"
        artboard: "my-artboard-name",
        autoplay: true,
        stateMachines: "State Machine 1",
        // automaticallyHandleEvents: true, // 自动处理 OpenUrl 事件
        onLoad: () => {
            r.resizeDrawingSurfaceToCanvas();
        },
        });

        function onRiveEventReceived(riveEvent) {
        const eventData = riveEvent.data;
        const eventProperties = eventData.properties;
        if (eventData.type === RiveEventType.General) {
            console.log("事件名称:", eventData.name);
            // 事件中添加的相关元数据
            console.log("评分 (Rating):", eventProperties.rating);
            console.log("消息 (Message):", eventProperties.message);
        } else if (eventData.type === RiveEventType.OpenUrl) {
            console.log("事件名称:", eventData.name);
            window.open(eventData.url);
        }
        }

        // 添加事件监听器并提供处理 Rive 事件的回调
        r.on(EventType.RiveEvent, onRiveEventReceived);
        // 可以随时通过如下 off() API 取消订阅 Rive 事件
        // r.off(EventType.RiveEvent, onRiveEventReceived);
```

#### 低级 API 用法

使用低级 API（即 `@rive-app/canvas-advanced`）时，您需要通过创建的状态机实例，在渲染循环中自行捕获报告的 Rive 事件（请参阅 [低级 API 用法](/runtimes/web/low-level-api-usage) 文档）。为此，在步进状态机之前：

- 通过状态机 `reportedEventCount()` API 确定自上一帧以来报告的 Rive 事件数量
- 循环遍历事件，并通过状态机 `reportedEventAt(idx)` API 获取事件引用

```javascript
        import RiveCanvas, {RiveEventType} from '@rive-app/canvas-advanced';

        ...
        // 渲染循环
        function myCustomRenderLoop(timestamp) {
            ...
            const elapsedTimeSec = (timestamp - prevTimestamp) / 1000;
            if (stateMachine) {
            const numFiredEvents = stateMachine.reportedEventCount();
            for (let i = 0; i < numFiredEvents; i++) {
                const event = stateMachine.reportedEventAt(i);
                // 运行基于事件的逻辑
                if (event.type === RiveEventType.OpenUrl) {
                const a = document.createElement("a");
                a.setAttribute("href", event.url);
                a.setAttribute("target", event.target);
                a.click();
                }
            }
            }
            // 步进 (Advance)
            stateMachine.advance(elapsedTimeSec);
            ...
            rive.requestAnimationFrame(myCustomRenderLoop);
        }
        rive.requestAnimationFrame(mycustomRenderLoop);
```

### React

#### 示例 (Examples)

- [星级评分示例](https://codesandbox.io/p/sandbox/rive-events-react-forked-ct9k2z?file=%2Fsrc%2FApp.js%3A6%2C44)

#### 添加事件监听器

与 DOM 元素的 `addEventListener()` / `removeEventListener()` API 类似，您将使用 Rive 实例的 `on()` / `off()` API 订阅从 `useRive` 钩子返回的 `rive` 对象的 Rive 事件。只需提供 RiveEvent 枚举和一个让运行时在检测到任何 Rive 事件的适当时间调用的回调即可。

::: info
**注意**：您必须使用 `useRive()` 钩子来订阅 Rive 事件。
:::

#### 用法示例

```javascript
        import { useRive, EventType, RiveEventType } from '@rive-app/canvas';
        import { useCallback, useEffect } from 'react';

        const MyTextComponent = () => {
        const {rive, RiveComponent} = useRive({
            src: "/static-assets/star-rating.riv",
            artboard: "my-artboard-name",
            autoplay: true,
            // automaticallyHandleEvents: true, // 自动处理 OpenUrl 事件
            stateMachines: "State Machine 1",
        });

        const onRiveEventReceived = (riveEvent) => {
            const eventData = riveEvent.data;
            const eventProperties = eventData.properties;
            if (eventData.type === RiveEventType.General) {
            console.log("事件名称:", eventData.name);
            // 事件中添加的相关元数据
            console.log("评分 (Rating):", eventProperties.rating);
            console.log("消息 (Message):", eventProperties.message);
            } else if (eventData.type === RiveEventType.OpenUrl) {
            console.log("事件名称:", eventData.name);
            // 手动处理 OpenUrl 事件
            window.location.href = data.url;
            }
        };

        // 等待直到 rive 对象实例化后再添加 Rive 事件监听器
        useEffect(() => {
            if (rive) {
            rive.on(EventType.RiveEvent, onRiveEventReceived);
            }
        }, [rive]);

        return (
            <RiveComponent />
        );
        };
```

### React Native

### 新版运行时 (推荐)

#### 添加 Rive 事件监听器

::: warning
此功能已弃用。我们建议使用 [数据绑定 (Data Binding)](runtimes/data-binding)。
:::

```javascript
                export default function EventsExample() {
                  const { riveViewRef, setHybridRef } = useRive();
                  const { riveFile } = useRiveFile(require('path/to/file.riv'));

                  const handleRiveEvent = (event: any) => {
                    console.log('Rive 事件:', event);
                  };

                  // 当 ref 可用时添加事件监听器
                  useEffect(() => {
                    if (riveViewRef) {
                      riveViewRef.onEventListener(handleRiveEvent);
                    }
                    return () => {
                      if (riveViewRef) {
                        riveViewRef.removeEventListeners();
                      }
                    };
                  }, [riveViewRef]);

                  return (
                    <View style={styles.container}>
                      <View style={styles.riveContainer}>
                        {riveFile ? (
                          <RiveView
                            style={styles.rive}
                            autoPlay={true}
                            fit={Fit.Contain}
                            file={riveFile}
                            hybridRef={setHybridRef}
                          />
                        ) : null}
                      </View>
                    </View>
                  );
                }
```

### 旧版运行时

#### 添加 Rive 事件监听器

类似于您可以在 `<Rive>` 组件上提供的其他回调函数（如 `onPlay` 或 `onStateChange`），您现在可以提供一个 `onRiveEventReceived` 回调，它将在渲染循环中报告任何 Rive 事件时被调用。

API 签名为：

```javascript
                onRiveEventReceived?: (event: RiveGeneralEvent | RiveOpenUrlEvent) => void;
```

用法示例：

```javascript
                import React, { useRef, useState } from 'react';
                import {
                SafeAreaView,
                ScrollView,
                Linking,
                Text,
                } from 'react-native';
                import Rive, { Fit, RiveOpenUrlEvent, RiveRef } from 'rive-react-native';

                export default function Events() {
                const riveRef = useRef<RiveRef>(null);
                const [eventMessage, setEventMessage] = useState('');

                return (
                    <SafeAreaView>
                    <ScrollView>
                        <Rive
                        ref={riveRef}
                        autoplay={true}
                        fit={Fit.Cover}
                        resourceName={'rating'}
                        stateMachineName="State Machine 1"
                        onRiveEventReceived={(event) => {
                            // 这些是在设计时在 Rive 编辑器中添加到事件中的属性
                            const eventProperties = event.properties;
                            if (eventProperties?.message) {
                            setEventMessage(eventProperties.message as string);
                            }

                            // 如果事件伴随有 URL，则打开它
                            if ('url' in event) {
                            Linking.openURL((event as RiveOpenUrlEvent).url || '');
                            }
                        }}
                        />
                        <Text>{eventMessage}</Text>
                    </ScrollView>
                    </SafeAreaView>
                );
                }
```

### Flutter

`Event` 是一个密封类 (sealed class)，具有两个选项：

- `OpenUrlEvent`
- `GeneralEvent`

您需要在 `StateMachine` 实例上注册事件监听器：

```dart
    final controller = RiveWidgetController(_riveFile!);
    controller?.stateMachine.addEventListener(_onRiveEvent);

    void _onRiveEvent(Event event) {
        // 对事件执行操作
    }
```

访问 `properties` 返回 `Map<String, CustomProperty>`。`CustomProperty` 也是一个密封类，具有以下选项：

- `CustomNumberProperty`
- `CustomBooleanProperty`
- `CustomStringProperty`

它们都有一个 `value` 字段。在 `Event` 类上，有便捷的访问器：

```dart
    // 便捷访问器
    event.property(name);           // 返回 CustomProperty
    event.numberProperty(name);     // 返回 CustomNumberProperty
    event.booleanProperty(name);    // 返回 CustomBooleanProperty
    event.stringProperty(name);     // 返回 CustomStringProperty
```

为了避免内存泄漏，在不再需要时移除事件监听器非常重要：

```dart
    stateMachine.removeEventListener(_onRiveEvent);
```

或者当 `StateMachine` 销毁时，事件监听器也会伴随销毁。

```dart
    stateMachine.dispose();
```

如果您销毁 `RiveWidgetController`，那也将销毁 `StateMachine` 并移除所有事件监听器。

### Apple

#### 通过状态机委托订阅事件

要订阅 Rive 事件，请实现 `StateMachineDelegate` 中的 `onRiveEventReceived` 协议。

`@objc optional func onRiveEventReceived(onRiveEvent riveEvent: RiveEvent)`

当从渲染循环触发 Rive 事件时，可能会调用此实现，并提供通用的 `RiveEvent` 数据类型，您可以对其进行类型检查以转换为特定事件进行进一步解析，例如 `RiveGeneralEvent` 或 `RiveOpenUrlEvent`。

例如：

```swift
        @objc func onRiveEventReceived(onRiveEvent riveEvent: RiveEvent) {
            debugPrint("事件名称: \(riveEvent.name())")
            debugPrint("事件类型: \(riveEvent.type())")
            if let openUrlEvent = riveEvent as? RiveOpenUrlEvent {
                // 例如：打开 URL
            } else if let generalEvent = riveEvent as? RiveGeneralEvent {
                // 例如：打印提供在 Text 小部件中的字符串数据
            }
        }
```

::: info
**注意**：`RiveOpenUrlEvent` 类型的事件不会在用户的首选浏览器中自动打开链接。您需要添加逻辑以获取传递给委托的 `riveEvent` 的 `url` 属性并打开链接。
:::

**用法示例：**

```swift
        import SwiftUI
        import RiveRuntime

        struct SwiftEvents: DismissableView {
            var dismiss: () -> Void = {}
            @StateObject private var rvm = RiveEventsVMExample()

            var body: some View {
                VStack {
                    rvm.view()
                    Text("事件消息 (Event Message)")
                        .font(.headline)
                        .padding(.bottom, 10)
                    Text(rvm.eventText)
                        .padding()
                        .background(rvm.eventText.isEmpty ? Color.clear : Color.black)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
            }
        }

        class RiveEventsVMExample: RiveViewModel {
            @Published var eventText = ""

            init() {
                super.init(fileName: "rating_animation")
            }

            func view() -> some View {
                return super.view().frame(width: 400, height: 400, alignment: .center)
            }

            // 订阅 Rive 事件，此委托将被调用
            @objc func onRiveEventReceived(onRiveEvent riveEvent: RiveEvent) {
                if let openUrlEvent = riveEvent as? RiveOpenUrlEvent {
                    if let url = URL(string: openUrlEvent.url()) {
                        #if os(iOS)
                        UIApplication.shared.open(url)
                        #else
                        NSWorkspace.shared.open(url)
                        #endif
                    }
                } else if let generalEvent = riveEvent as? RiveGeneralEvent {
                    let genEventProperties = generalEvent.properties();
                    if let msg = genEventProperties["message"] {
                        eventText = msg as! String
                    }
                }

            }
        }
```

### Android

#### 添加事件监听器

使用 `RiveAnimationView` 上的 `addEventListener` 和 `removeEventListener` 来订阅/取消订阅 `RiveFileController.RiveEventListener`。

此监听器接收 `RiveEvent` 类型的 `OpenURLRiveEvent` 或 `GeneralRiveEvent`。

```kotlin
        /// 访问 RiveAnimationView
        private val yourRiveAnimationView: RiveAnimationView by lazy(LazyThreadSafetyMode.NONE) {
            findViewById(R.id.your_animation_view)
        }

        ...

        /// 创建 RiveEventListener
        val eventListener = object : RiveFileController.RiveEventListener {
            override fun notifyEvent(event: RiveEvent) {
                when (event) {
                    is OpenURLRiveEvent -> {
                        Log.i("RiveEvent", "打开 URL 事件: ${event.url}")
                    }
                    is GeneralRiveEvent -> {
                        Log.i("RiveEvent", "通用事件")
                    }
                }
                Log.i("RiveEvent", "名称 (name): ${event.name}")
                Log.i("RiveEvent", "类型 (type): ${event.type}")
                Log.i("RiveEvent", "属性 (properties): ${event.properties}")
                // `data` 包含事件中的所有信息
                Log.i("RiveEvent", "数据 (data): ${event.data}");
            }
        }

        /// 附加监听器
        yourRiveAnimationView.addEventListener(eventListener);

        ...

        /// 不再需要时移除
        override fun onDestroy() {
            yourRiveAnimationView.removeEventListener(eventListener);
            super.onDestroy()
        }
```

::: info
Rive Android 运行时是在独立线程中执行的。任何由 Rive 事件触发的 UI 更新都需要使用 `runOnUiThread` 手动标记在 UI 线程上运行。请参见下面的示例。
:::

#### 打开 URL

::: info
`OpenUrlRiveEvent` 类型的事件不会自动打开链接。代码需要手动添加到您的项目中。
:::

以下是一个示例，演示了在 Android 上接收到 `OpenUrlRiveEvent` 时如何打开 URL：

```kotlin
        val eventListener = object : RiveFileController.RiveEventListener {
            override fun notifyEvent(event: RiveEvent) {
                when (event) {
                    is OpenURLRiveEvent -> {
                        runOnUiThread {
                            try {
                                val uri = Uri.parse(event.url);
                                val browserIntent =
                                    Intent(Intent.ACTION_VIEW, uri)
                                startActivity(browserIntent)
                            } catch (e: Exception) {
                                Log.i("RiveEvent", "无效的 URL: ${event.url}")
                            }
                        }
                    }
                }
            }
        }
        yourRiveAnimationView.addEventListener(eventListener);
```

您还可以访问 `event.target` 以获取编辑器中设置的 URL 目标位置。

#### 示例 (Example)

以下演示了如何根据包含自定义数字属性（名为 "Rating"）的某个 Rive 事件（名为 "StarRating"）来更新 UI。注意 `runOnUiThread`：

```kotlin
        val eventListener = object : RiveFileController.RiveEventListener {
            override fun notifyEvent(event: RiveEvent) {
                when (event) {
                    is GeneralRiveEvent -> {
                        runOnUiThread {
                            // 此事件包含一个名为 "rating" 的数字值，用于指示选择的星级
                            if (event.name == "StarRating" && event.properties.containsKey("rating")) {
                                starRatingTextView.text = "星级评分: ${event.properties["rating"]}"
                            }
                        }
                    }
                }
            }
        }
```

可以通过检查事件的 `name` 和类型（`GeneralRiveEvent` 与 `OpenURLRiveEvent`）来评估哪个事件已通过。

通过调用 `event.properties`，您将获得一个包含事件上定义的任何自定义属性的 `HashMap`。

## 其他资源 (Additional Resources)

<YouTube videoId="e2bshfKuu8U" />
