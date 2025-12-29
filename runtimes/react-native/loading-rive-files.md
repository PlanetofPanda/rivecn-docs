运行时 (Runtimes) - React Native

# 加载 Rive 文件 (Loading Rive Files)

在 React Native 中加载 Rive 文件的不同方式。

## [​](#overview) 概览

React Native 运行时支持多种方式加载 Rive 文件。

## [​](#from-local-bundle) 从本地包加载

```javascript
import { Rive } from 'rive-react-native';

<Rive
  resourceName="my_animation"
  stateMachineName="State Machine 1"
/>
```

确保将 `.riv` 文件添加到你的项目中：
- **iOS**: 添加到 Xcode 项目的资源中
- **Android**: 放置在 `android/app/src/main/res/raw/` 目录

## [​](#from-url) 从 URL 加载

```javascript
import { Rive } from 'rive-react-native';

<Rive
  url="https://cdn.rive.app/animations/vehicles.riv"
  stateMachineName="bumpy"
/>
```

## [​](#using-useriveFile-hook) 使用 useRiveFile Hook

对于新版运行时，推荐使用 `useRiveFile` hook：

```javascript
import { useRiveFile, RiveView } from '@rive-app/react-native';

function MyComponent() {
  const { riveFile, isLoading, error } = useRiveFile({
    uri: 'https://cdn.rive.app/animations/vehicles.riv',
  });

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>加载失败</Text>;

  return <RiveView file={riveFile} />;
}
```

[Props 参考](/runtimes/react-native/props.md)[Rive Ref 方法](/runtimes/react-native/rive-ref-methods.md)
