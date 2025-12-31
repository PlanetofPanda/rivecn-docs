---
title: "原生 SDK 版本自定义 (Native SDK Version Customization)"
description: "如何覆盖 Rive React Native 使用的底层 iOS 或 Android Rive 原生 SDK 版本"
---

::: warning
**⚠️ 高级配置**
本节内容适用于需要使用特定版本 Rive 原生 SDK 的高级用户。在大多数情况下，您应该使用库默认提供的版本。只有在您有特定要求并了解潜在的兼容性影响时，才应自定义这些版本。

**重要提示：** 如果您自定义了原生 SDK 版本，稍后将 Rive React Native 更新到较新版本时，应重新检查自定义版本设置。您指定的自定义版本可能与更新后的 Rive React Native 版本不兼容。务必检查新版本中的默认版本并进行彻底测试。
:::

### 默认行为 (Default Behavior)

默认情况下，Rive React Native 使用 `package.json` 中指定的原生 SDK 版本：

```json
"runtimeVersions": {
  "ios": "6.12.0",
  "android": "10.4.5"
}
```

这些版本经过测试，已知与此版本的 Rive React Native 配合良好。

### 自定义版本 (Customizing Versions)

您可以使用平台特定的配置文件来覆盖这些默认版本。

查看可用的 Rive 原生 [Android](https://github.com/rive-app/rive-android/releases) 和 [iOS](https://github.com/rive-app/rive-ios/releases) 版本。

#### iOS (Vanilla React Native)

创建或编辑 `ios/Podfile.properties.json`：

```json
{
  "RiveRuntimeIOSVersion": "6.13.0"
}
```

然后运行：

```bash
cd ios && pod install
```

#### Android (Vanilla React Native)

添加到 `android/gradle.properties`：

```properties
Rive_RiveRuntimeAndroidVersion=10.5.0
```

#### Expo 项目 (Expo Projects)

对于 Expo 项目，请在 `app.config.ts` 中使用配置插件：

```typescript
import { ExpoConfig, ConfigContext } from "expo/config";
import { withPodfileProperties } from "@expo/config-plugins";
import { withGradleProperties } from "@expo/config-plugins";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  plugins: [
    [
      withPodfileProperties,
      {
        RiveRuntimeIOSVersion: "6.13.0",
      },
    ],
    [
      withGradleProperties,
      {
        Rive_RiveRuntimeAndroidVersion: "10.5.0",
      },
    ],
  ],
});
```

### 版本解析优先级 (Version Resolution Priority)

库按以下顺序解析版本：

**iOS：**

1. `ios/Podfile.properties.json` → `RiveRuntimeIOSVersion`
2. `package.json` → `runtimeVersions.ios` (默认)

**Android：**

1. `android/gradle.properties` → `Rive_RiveRuntimeAndroidVersion`
2. `package.json` → `runtimeVersions.android` (默认)
