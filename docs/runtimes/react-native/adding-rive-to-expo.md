---
title: "在 Expo 中添加 Rive"
description: "Rive React Native 在 Expo 中的使用指南。"
---

要在 Expo 中使用 Rive，您需要安装 Rive React Native 包。

由于此包包含自定义的原生代码，它与 Expo Go 不兼容。相反，您需要使用开发构建 (Development Build)，它可以让您完全访问原生模块。

::: info
开发构建是[生产环境应用的推荐设置](https://github.com/expo/fyi/blob/main/expo-go-usage.md)。
:::

本指南将引导您在 Expo 项目中集成 Rive，包括安装依赖项、配置构建以及测试您的图形。

## 初始设置 (Initial Setup)

如果您还没有项目，请创建一个新的 Expo 应用：

```bash
npx create-expo-app MyRiveApp
```

安装 Expo 开发客户端：

```bash
npx expo install expo-dev-client
```

然后安装 Rive 包：

### 新版运行时（推荐）

```bash
  npx expo install @rive-app/react-native
```

---

### 旧版运行时

```bash
npx expo install rive-react-native
```

---

## iOS 最低版本要求 (iOS Minimum Version)

### 新版运行时（推荐）

新的运行时要求 iOS 版本为 **15.1** 或更高。

如果您使用的是 Expo SDK 52 或更高版本，它默认就已经要求 `15.1` 或更高。

如果您使用的是旧版本的 SDK，则需要手动或通过配置更新 iOS 部署目标。

#### 方法 1：使用 `expo-build-properties`（推荐）

[连续原生生成 (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/) 通过使用 [Prebuild](https://docs.expo.dev/workflow/continuous-native-generation/#usage) 自动生成 iOS 和 Android 原生项目，简化了应用的维护和配置。

如果您使用的是 CNG，可以直接在 `app.json` 或 `app.config.js` 中设置最低 iOS 部署目标：

```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "ios": {
            "deploymentTarget": "15.1"
          }
        }
      ]
    ]
  }
}
```

#### 方法 2：手动配置

如果您没有使用 Prebuild，请直接在 `ios/Podfile` 中更新目标：

```ruby
platform :ios, podfile_properties['ios.deploymentTarget'] || '15.1'
```

---

### 旧版运行时

旧版运行时要求 iOS 版本为 **14.0** 或更高。

如果您使用的是 Expo SDK 52 或更高版本，您可以跳过此步骤，因为它的默认值更高。

如果您使用的是旧版本的 SDK，则需要手动或通过配置更新 iOS 部署目标。

#### 方法 1：使用 `expo-build-properties`（推荐）

[连续原生生成 (CNG)](https://docs.expo.dev/workflow/continuous-native-generation/) 通过使用 [Prebuild](https://docs.expo.dev/workflow/continuous-native-generation/#usage) 自动生成 iOS 和 Android 原生项目，简化了应用的维护和配置。

如果您使用的是 CNG，可以直接在 `app.json` 或 `app.config.js` 中设置最低 iOS 部署目标：

```json
    {
      "expo": {
        "plugins": [
          [
            "expo-build-properties",
            {
              "ios": {
                "deploymentTarget": "14.0"
              }
            }
          ]
        ]
      }
    }
```

#### 方法 2：手动配置

如果您没有使用 Prebuild，请直接在 `ios/Podfile` 中更新目标：

```ruby
    platform :ios, podfile_properties['ios.deploymentTarget'] || '14.0'
```

---

## 创建开发构建 (Creating a Development Build)

要运行包含 Rive 运行时的应用，您需要创建一个开发构建。

由于有多种方法可以实现，请参考 [Expo 开发构建指南](https://docs.expo.dev/develop/development-builds/create-a-build/) 选择最适合您需求的方法。

## 运行您的应用 (Running Your App)

一旦您创建了开发构建并将其安装在设备或模拟器上，请使用以下命令启动应用：

```bash
npx expo start
```

您可以使用以下组件来测试 Rive：

### 新版运行时（推荐）

```tsx
    import { View, ActivityIndicator, Text } from "react-native";
    import { RiveView, useRiveFile, Fit } from "@rive-app/react-native";

    export default function RiveDemo() {
      const { riveFile, isLoading, error } = useRiveFile(
        "https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
      );

      if (isLoading) {
        return (
          <View >
            <ActivityIndicator size="large" />
          </View>
        );
      }

      if (error || !riveFile) {
        return (
          <View >
            <Text>Error loading Rive file: {error || "Unknown error"}</Text>
          </View>
        );
      }

      return (
        <View >
          <RiveView
            file={riveFile}
            artboardName="Avatar 1"
            stateMachineName="avatar"
            fit={Fit.Contain}
            
            autoPlay={true}
          />
        </View>
      );
    }
```

::: info
如果您在加载 Rive 文件时遇到错误，请确保您在开发构建中运行，而不是在 Expo Go 中。
:::

---

### 旧版运行时

```js
    import { View } from "react-native";
    import Rive from "rive-react-native";

    export default function RiveDemo() {
      return (
        <View >
          <Rive
            url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
            artboardName="Avatar 1"
            stateMachineName="avatar"
            
          />
        </View>
      );
    }
```

::: info
如果您遇到此错误：`Invariant Violation: requireNativeComponent: "RiveReactNativeView" was not found in the UIManager`，这通常意味着应用正在 **Expo Go** 中运行。请在终端中按 `s` 并选择开发构建。
:::

---

## 添加本地资产 (Adding Local Assets)

上面的示例是从远程 URL 加载 `.riv` 文件。
要使用本地 `.riv` 文件，必须将它们捆绑到您的原生构建中。
请参阅[加载 Rive 文件](/runtimes/react-native/loading-rive-files)，了解如何处理本地资产。
