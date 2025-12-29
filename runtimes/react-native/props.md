运行时 (Runtimes) - React Native

# Props 参考 (Props Reference)

React Native Rive 组件的属性参考。

## [​](#rive-component-props) Rive 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `resourceName` | string | - | 本地资源名称 |
| `url` | string | - | 远程 Rive 文件 URL |
| `artboardName` | string | 默认画板 | 要显示的画板名称 |
| `stateMachineName` | string | - | 要播放的状态机名称 |
| `animationName` | string | - | 要播放的动画名称 |
| `autoplay` | boolean | true | 是否自动播放 |
| `fit` | Fit | Contain | 适应方式 |
| `alignment` | Alignment | Center | 对齐方式 |

## [​](#fit-values) Fit 值

```javascript
import { Fit } from 'rive-react-native';

Fit.Cover
Fit.Contain
Fit.Fill
Fit.FitWidth
Fit.FitHeight
Fit.None
Fit.ScaleDown
```

## [​](#alignment-values) Alignment 值

```javascript
import { Alignment } from 'rive-react-native';

Alignment.TopLeft
Alignment.TopCenter
Alignment.TopRight
Alignment.CenterLeft
Alignment.Center
Alignment.CenterRight
Alignment.BottomLeft
Alignment.BottomCenter
Alignment.BottomRight
```

## [​](#callbacks) 回调函数

| 回调 | 描述 |
|------|------|
| `onPlay` | 动画开始播放时调用 |
| `onPause` | 动画暂停时调用 |
| `onStop` | 动画停止时调用 |
| `onLoopEnd` | 循环结束时调用 |
| `onStateChanged` | 状态机状态变化时调用 |
| `onError` | 发生错误时调用 |

[加载 Rive 文件](/runtimes/react-native/loading-rive-files.md)[Rive Ref 方法](/runtimes/react-native/rive-ref-methods.md)
