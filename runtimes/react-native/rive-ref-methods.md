运行时 (Runtimes) - React Native

# Rive Ref 方法 (Rive Ref Methods)

通过 ref 访问的 Rive 组件方法。

## [​](#overview) 概览

使用 React ref 可以获取 Rive 组件实例，从而调用播放控制和输入控制方法。

## [​](#getting-a-ref) 获取 Ref

```javascript
import React, { useRef } from 'react';
import { Rive, RiveRef } from 'rive-react-native';

function MyComponent() {
  const riveRef = useRef<RiveRef>(null);

  return (
    <Rive
      ref={riveRef}
      resourceName="my_animation"
      stateMachineName="State Machine 1"
    />
  );
}
```

## [​](#playback-methods) 播放控制方法

### play()
开始播放动画或状态机。

```javascript
riveRef.current?.play();
```

### pause()
暂停播放。

```javascript
riveRef.current?.pause();
```

### stop()
停止播放并重置到初始状态。

```javascript
riveRef.current?.stop();
```

### reset()
重置状态机到初始状态。

```javascript
riveRef.current?.reset();
```

## [​](#input-methods) 输入控制方法

### setBooleanState(stateMachineName, inputName, value)
设置布尔输入的值。

```javascript
riveRef.current?.setBooleanState("State Machine 1", "isActive", true);
```

### setNumberState(stateMachineName, inputName, value)
设置数字输入的值。

```javascript
riveRef.current?.setNumberState("State Machine 1", "progress", 0.5);
```

### fireState(stateMachineName, inputName)
触发 Trigger 类型的输入。

```javascript
riveRef.current?.fireState("State Machine 1", "onClick");
```

## [​](#text-methods) 文本方法

### setTextRunValue(textRunName, value)
设置文本串的值。

```javascript
riveRef.current?.setTextRunValue("WelcomeText", "欢迎使用 Rive!");
```

### getTextRunValue(textRunName)
获取文本串的当前值。

```javascript
const text = riveRef.current?.getTextRunValue("WelcomeText");
```

[Props 参考](/runtimes/react-native/props.md)[加载 Rive 文件](/runtimes/react-native/loading-rive-files.md)
