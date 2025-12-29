运行时 (Runtimes)

# Rive 事件 (Rive Events)

> [!WARNING]
> **⚠️ 已弃用：请使用数据绑定 (Data Binding) 替代事件**
>
> 对于新项目，我们建议使用 [数据绑定](/runtimes/data-binding.md) 来处理运行时通信。
> 事件功能仍然可用，但数据绑定提供了更强大和灵活的解决方案。

## [​](#overview) 概览

Rive 事件允许你在动画的特定时刻触发回调。常见用途包括：
- 在动画特定时刻播放音频
- 在交互发生时打开 URL
- 在触摸交互时添加触觉反馈
- 在按钮和其他 UI 元素上实现功能
- 发送语义信息

有关在编辑器中创建事件的信息，请参阅 [事件 (Events)](/editor/events.md)。

## [​](#subscribing-to-events) 订阅事件

### Web (JS)

```javascript
const r = new rive.Rive({
  src: "my-file.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  stateMachines: "State Machine 1",
  onRiveEventReceived: (riveEvent) => {
    console.log("事件触发:", riveEvent.data.name);
    // 处理事件数据
    if (riveEvent.data.properties) {
      console.log("事件属性:", riveEvent.data.properties);
    }
  },
});
```

### React

```javascript
import { useRive, useRiveEvents } from "@rive-app/react-canvas";

function MyComponent() {
  const { rive, RiveComponent } = useRive({
    src: "my-file.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  useRiveEvents(rive, (riveEvent) => {
    console.log("事件触发:", riveEvent.data.name);
  });

  return <RiveComponent />;
}
```

### Flutter

```dart
controller.addEventListener((event) {
  print("事件触发: ${event.name}");
  // 处理事件数据
});
```

### iOS/macOS (Swift)

```swift
riveViewModel.riveView?.delegate = self

// 实现 RiveViewDelegate
func onRiveEventReceived(riveFile: RiveFile, name: String, properties: [String: RiveValue]?) {
    print("事件触发: \(name)")
}
```

### Android (Kotlin)

```kotlin
riveAnimationView.addEventListener(object : RiveEventListener {
    override fun onEvent(event: RiveEvent) {
        Log.d("Rive", "事件触发: ${event.name}")
    }
})
```

## [​](#event-properties) 事件属性

事件可以携带自定义属性，你可以在编辑器中定义这些属性：
- **String (字符串)**
- **Number (数字)**
- **Boolean (布尔值)**

```javascript
onRiveEventReceived: (riveEvent) => {
  const properties = riveEvent.data.properties;
  if (properties.url) {
    window.open(properties.url, "_blank");
  }
}
```

## [​](#opening-a-url) 打开 URL

事件的常见用途是在交互时打开 URL：

```javascript
onRiveEventReceived: (riveEvent) => {
  const props = riveEvent.data.properties;
  if (props && props.url) {
    window.open(props.url.toString());
  }
}
```

[数据绑定 (Data Binding)](/runtimes/data-binding.md)[状态机播放 (State Machines)](/runtimes/state-machines.md)
