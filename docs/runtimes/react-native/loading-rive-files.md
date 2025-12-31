---
title: "加载 Rive 文件 (Loading Rive Files)"
description: "如何在 Rive React Native 运行时中使用 Rive 文件。"
---

### 新版运行时（推荐）(New Runtime - Recommended)

在使用新运行时的 React Native 项目中，有多种加载 Rive 文件的方式：

- **选项 1：使用 `require()`** - 从项目目录加载文件（推荐用于开发和 OTA 更新）
- **选项 2：URL** - 从远程 URL 加载文件
- **选项 3：资源名称 (Resource name)** - 从原生资产束 (asset bundles) 中加载文件
- **选项 4：ArrayBuffer** - 从二进制数据加载文件

所有加载方法都使用 `useRiveFile` hook，它返回一个 `RiveFile` 对象，您可以通过 `file` prop 将该对象传递给 `RiveView` 组件。

### 选项 1：使用 `require()`（推荐）

::: info
推荐使用 `require()` 加载 Rive 文件，因为当您更新 Rive 文件时，它不需要重新原生构建。在开发期间，使用 `require()` 加载的文件由 Metro 开发服务器提供。构建应用时，该文件会自动捆绑到应用的资产中。对于 Expo 来说，这还可以实现“离线/空中” (OTA) 更新。
:::

```tsx
    import { View, ActivityIndicator, Text } from "react-native";
    import { RiveView, useRiveFile, Fit } from "@rive-app/react-native";

    export default function RiveDemo() {
      const { riveFile, isLoading, error } = useRiveFile(
        require("./assets/flying_car.riv")
      );

      if (isLoading) {
        return <ActivityIndicator size="large" />;
      }

      if (error || !riveFile) {
        return <Text>错误: {error || "无法加载文件"}</Text>;
      }

      return (
        <RiveView
          file={riveFile}
          fit={Fit.Contain}
          autoPlay={true}
        />
      );
    }
```

为了使上述代码生效，请确保您的 `metro.config.js` 支持 `.riv` 文件。如果您使用的是 Expo 且尚未创建此文件，可以使用以下命令生成：

```bash
    npx expo customize metro.config.js
```

然后添加：

```javascript
    const { getDefaultConfig } = require("expo/metro-config");

    const config = getDefaultConfig(__dirname);

    // 添加对 `.riv` 文件的支持
    config.resolver.assetExts.push("riv");

    module.exports = config;
```

### 选项 2：从 URL 加载

您可以从远程 URL（例如 AWS S3、Google Storage、CDN）加载 Rive 文件：

```tsx
    import { View, ActivityIndicator, Text } from "react-native";
    import { RiveView, useRiveFile, Fit } from "@rive-app/react-native";

    export default function RiveDemo() {
      const { riveFile, isLoading, error } = useRiveFile(
        "https://cdn.rive.app/animations/vehicles.riv"
      );

      if (isLoading) {
        return <ActivityIndicator size="large" />;
      }

      if (error || !riveFile) {
        return <Text>错误: {error || "无法加载文件"}</Text>;
      }

      return (
        <RiveView
          file={riveFile}
          fit={Fit.Contain}
          autoPlay={true}
        />
      );
    }
```

### 选项 3：从资源名称加载

您可以通过引用资源名称（不带 `.riv` 扩展名）从原生资产束中加载 Rive 文件。

```tsx
    import { View, ActivityIndicator, Text } from "react-native";
    import { RiveView, useRiveFile, Fit } from "@rive-app/react-native";

    export default function RiveDemo() {
      const { riveFile, isLoading, error } = useRiveFile("weather_app");

      if (isLoading) {
        return <ActivityIndicator size="large" />;
      }

      if (error || !riveFile) {
        return <Text>错误: {error || "无法加载文件"}</Text>;
      }

      return (
        <RiveView
          file={riveFile}
          fit={Fit.Contain}
          autoPlay={true}
        />
      );
    }
```

#### 添加到 iOS

在 React Native 项目的 `ios/` 文件夹中，使用 XCode 打开 `.xcodeproj` 文件。这将打开原生 iOS 项目。

在此项目的根目录下创建一个“新组” (New Group) 并命名（例如 Assets）。将您的 `.riv` 文件拖入该组，并在 XCode 提示时将其添加到应用的 _Target_ 中。这可确保 Rive 文件包含在 bundle 资源中。

![图像](/images/runtimes/react-native/3dc3d0fd-34b8-48db-9baa-0fdf668ad76d.webp)

#### 添加到 Android

在 Android Studio 中打开 React Native 项目的 `android/` 文件夹。

在 `/app/src/main/res/` 目录下，创建一个新的“Android 资源目录” (Android Resource Directory)，用于存储 Rive 文件资产。当系统提示选择文件夹名称和资源类型时，从资源类型下拉列表中选择 `raw`。将您的 `.riv` 文件拖入这个新文件夹，以确保 Rive 文件被包含在 bundle 资源中。

![图像](/images/runtimes/react-native/f4d4f2f4-7231-43c8-881b-a3f05fbe33ae.webp)

正在将 `weather_app.riv` 添加到 Android 项目中

### 选项 4：从 ArrayBuffer 加载

您可以使用 `ArrayBuffer` 从二进制数据加载 Rive 文件：

```tsx
    import { View, ActivityIndicator, Text } from "react-native";
    import { RiveView, useRiveFile, Fit } from "@rive-app/react-native";
    import { useState, useEffect } from "react";

    export default function RiveDemo() {
      const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | undefined>();

      useEffect(() => {
        const loadFile = async () => {
          try {
            const response = await fetch(
              "https://cdn.rive.app/animations/vehicles.riv"
            );
            const buffer = await response.arrayBuffer();
            setArrayBuffer(buffer);
          } catch (error) {
            console.error("无法加载文件:", error);
          }
        };

        loadFile();
      }, []);

      const { riveFile, isLoading, error } = useRiveFile(arrayBuffer);

      if (isLoading || !arrayBuffer) {
        return <ActivityIndicator size="large" />;
      }

      if (error || !riveFile) {
        return <Text>错误: {error || "无法加载文件"}</Text>;
      }

      return (
        <RiveView
          file={riveFile}
          fit={Fit.Contain}
          autoPlay={true}
        />
      );
    }
```

---

### 旧版运行时 (Legacy Runtime)

在 React Native 项目中包含 Rive 文件有几种常用方式：

- 选项 1：托管 Rive 文件的 URL
- 选项 2：将资产添加到原生 iOS 和 Android 项目的资产束 (asset bundles) 中
- 选项 3：使用 `expo-asset` 将资产添加到 Expo 项目的资产束中
- 选项 4：Source prop 与 require

渲染 `<Rive />` 组件时，必须分别为上述选项提供 `url` 或 `resourceName` prop，否则组件将无法加载。

### 选项 1：URL

```javascript
    <Rive url="https://cdn.rive.app/animations/vehicles.riv" />
```

使用 Rive React Native 运行时加载 Rive 文件的一种方法是直接引用托管该文件的 URL（如 AWS S3 存储桶、Google Storage 等）。这可以通过在实例化 `<Rive />` 组件时使用 `url` 参数来实现。

### 选项 2：资产束 (Asset Bundle)

```javascript
    <Rive
      resourceName="weather_app" // 对应 weather_app.riv
    />
```

加载 Rive 文件的另一种方法是在各自的 `ios/` 和 `android/` 项目中引用资源/资产的名称。

#### 添加到 iOS

在 React Native 项目的 `ios/` 文件夹中，使用 XCode 打开 `.xcodeproj` 文件。

在此项目根目录下创建一个“新组” (New Group)，并给它起一个你想要的资产文件夹名称（如 _Assets_）。将您的 `.riv` 文件拖入该组，并在 XCode 提示时将其添加到应用的 _Target_ 中。

![图像](/images/runtimes/react-native/3dc3d0fd-34b8-48db-9baa-0fdf668ad76d.webp)

#### 添加到 Android

在 Android Studio 中打开 React Native 项目的整个 `android/` 文件夹。

在 `/app/src/main/res/` 目录下，创建一个新的“Android 资源目录” (Android Resource Directory)，并将资源类型选择为 `raw`。将您的 `.riv` 文件拖入此新文件夹。

![图像](/images/runtimes/react-native/f4d4f2f4-7231-43c8-881b-a3f05fbe33ae.webp)

正在将 `weather_app.riv` 添加到 Android 项目中

一旦 Rive 文件被添加到 iOS 和 Android 项目的资产/资源束中，您就可以在创建 `<Rive />` 组件时，通过 `resourceName` prop 自由地引用文件名（不带 `.riv` 扩展名）。

### 选项 3：在 Expo CNG 中使用 expo-asset

```javascript
    <Rive
      resourceName="weather_app" // 对应 weather_app.riv
    />
```

如果您使用 Expo SDK 53 或更高版本，并希望利用 [Expo CNG (Continuous Native Generation)](https://docs.expo.dev/workflow/continuous-native-generation/)，可以使用 [expo-asset 插件](https://docs.expo.dev/versions/latest/sdk/asset/)将 `.riv` 文件捆绑到您的原生构建中。

在 `app.json` 或 `app.config.js` 中，添加 `expo-asset` 插件并指定您的 `.riv` 文件或资产目录：

```json
    {
      "expo": {
        "plugins": [
          [
            "expo-asset",
            {
              "assets": ["path/to/file.riv", "path/to/directory"]
            }
          ]
        ]
      }
    }
```

要启用 Metro 对 Rive 文件的支持，请更新您的 `metro.config.js`。如果尚未创建此文件，请生成它：

```bash
    npx expo customize metro.config.js
```

然后按如下方式编辑：

```javascript
    const { getDefaultConfig } = require("expo/metro-config");

    const config = getDefaultConfig(__dirname);

    // 添加对 `.riv` 文件的支持
    config.resolver.assetExts.push("riv");

    module.exports = config;
```

然后重新生成开发构建。如果您使用的是任何 `expo run:*` 命令，请记住先运行 `npx expo prebuild`。

如果您使用的是较早版本的 Expo，可以在 [此 Github Issue](https://github.com/rive-app/rive-react-native/issues/185) 中找到另一种方法。

### 选项 4：Source Prop 与 Require

```javascript
    <Rive source={require("./flying_car.riv")} />
```

如果您更喜欢将 Rive 文件与组件代码放在同一个文件夹中，可以使用 `source` prop 配合 `require()` 并通过引用路径来加载 Rive 文件。

为此，请确保您的 `metro.config.js` 支持 `.riv` 文件。如果您使用的是 Expo 且尚未创建此文件，可以使用以下命令生成：

```bash
    npx expo customize metro.config.js
```

然后添加：

```javascript
    // 添加对 `.riv` 文件的支持
    config.resolver.assetExts.push("riv");
```

此方法的另一个优点是在开发期间文件由 Metro 开发服务器提供，允许您在不重新构建应用的情况下更新文件。构建应用时，该文件会自动捆绑到应用的资产中。
