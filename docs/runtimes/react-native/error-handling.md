---
title: "错误处理 (Error Handling)"
description: "在 Rive React Native 中如何处理错误。"
---

## 错误处理 (Error Handling)

::: info
此页面仅适用于[新版运行时](https://github.com/rive-app/rive-nitro-react-native) —— 不适用于旧版运行时。
:::

将 Rive 操作包裹在 try/catch 块中以处理错误。例如，在加载文件时：

```js
try {
  const riveFile = await RiveFileFactory.fromURL(
    "https://cdn.rive.app/animations/vehicles.riv"
  );
  // 使用 riveFile...
} catch (error) {
  // 处理在 Rive 文件加载过程中发生的错误
  console.error("加载 Rive 文件时出错:", error);
}
```

### 基于视图的错误 (View-Based Errors)

使用 `onError` 回调 prop 来处理在视图配置或运行时操作中发生的错误：

```js
<RiveView
  file={riveFile}
  onError={(error) => {
    // error.type 包含错误类型的枚举值
    // error.message 包含描述性的错误消息
    console.error(`Rive 错误 [${error.type}]: ${error.message}`);
  }}
/>
```

#### 错误类型 (Error Types)

在视图操作过程中可能会发生以下错误类型：

| 错误类型 | 值 | 描述 |
| ---------------------------------------------- | ----- | ----------------------------------------------------- |
| `RiveErrorType.Unknown`                        | 0     | 发生了未知错误 |
| `RiveErrorType.FileNotFound`                   | 1     | 找不到指定的 Rive 文件 |
| `RiveErrorType.MalformedFile`                  | 2     | Rive 文件格式错误或已损坏 |
| `RiveErrorType.IncorrectArtboardName`          | 3     | 指定的画板名称不存在 |
| `RiveErrorType.IncorrectStateMachineName`      | 4     | 指定的状态机名称不存在 |
| `RiveErrorType.ViewModelInstanceNotFound`      | 6     | 找不到指定的视图模型实例 |
| `RiveErrorType.IncorrectStateMachineInputName` | 8     | 指定的状态机输入名称不存在 |

使用这些错误类型来提供特定的错误处理：

```js
import { RiveView, RiveErrorType } from "@rive-app/react-native";

<RiveView
  file={riveFile}
  artboardName="MainArtboard"
  onError={(error) => {
    switch (error.type) {
      case RiveErrorType.IncorrectArtboardName:
        console.error("未找到画板:", error.message);
        // 处理画板缺失（例如，使用默认画板）
        break;
      case RiveErrorType.IncorrectStateMachineName:
        console.error("未找到状态机:", error.message);
        // 处理状态机缺失
        break;
      case RiveErrorType.MalformedFile:
        console.error("文件损坏:", error.message);
        // 处理文件损坏（例如，显示错误 UI）
        break;
      default:
        console.error("Rive 错误:", error.message);
    }
  }}
/>
```

::: info
如果没有提供 `onError` 处理程序，默认情况下错误将记录在控制台中。
:::
