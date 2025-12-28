React Native

# React Native

Rive 的 React Native 运行时。

请注意，某些 Rive 功能可能尚未在特定运行时中受支持，或者可能需要使用 Rive 渲染器。有关更多详细信息，请参阅 [功能支持](/docs/feature-support) 和 [选择渲染器](/docs/runtimes/choose-a-renderer) 页面。

🚀 **新的 Rive React Native 运行时现已推出！** 基于 Nitro 构建，性能更佳，React Native 集成更好。**现在开始：**

-   [GitHub](https://github.com/rive-app/rive-nitro-react-native)
-   [NPM](https://www.npmjs.com/package/@rive-app/react-native)

**迁移时间表：**

-   **短期：** 完成新运行时，请参阅 [功能支持](https://github.com/rive-app/rive-nitro-react-native?tab=readme-ov-file#feature-support) 和 [路线图](https://github.com/rive-app/rive-nitro-react-native?tab=readme-ov-file#roadmap)
-   **中期：** 解决现有旧包中的主要问题，同时支持迁移
-   **长期：** 完全迁移到新包

我们正在积极收集反馈以改进新运行时。请分享你的想法并报告你遇到的任何问题。

## [​](#overview) 概览

本指南记录了如何开始使用 Rive React Native 运行时。新运行时的源代码可在其 [GitHub 仓库](https://github.com/rive-app/rive-nitro-react-native) 中找到。

-   新运行时（推荐）
-   旧版运行时

## [​](#requirements) 要求

-   **React Native**: 0.78 或更高版本（推荐 0.79+ 以改善 Android 错误消息）
-   **Expo SDK**: 53 或更高版本（适用于 Expo 用户）
-   **iOS**: 15.1 或更高版本
-   **Android**: SDK 24 (Android 7.0) 或更高版本
-   **Xcode**: 16.4 或更高版本
-   **JDK**: 17 或更高版本
-   **Nitro Modules**: 0.25.2 或更高版本

## [​](#quick-start) 快速开始

按照这些快速入门步骤熟悉 Rive React Native 运行时。

[## Rive 文件

改编/下载本快速入门指南中使用的 Rive 文件](https://rive.app/marketplace/24637-46037-health-bar-data-binding-quick-start/)[## 完整示例

查看完整的快速入门示例](https://github.com/rive-app/rive-nitro-react-native/blob/main/example/src/pages/QuickStart.tsx)

1.  **安装依赖**

    ```bash
    npm install @rive-app/react-native react-native-nitro-modules
    # or for Yarn
    yarn add @rive-app/react-native react-native-nitro-modules
    ```

    `react-native-nitro-modules` 是必需的，因为此库依赖于 [Nitro Modules](https://nitro.margelo.com/)。

2.  **设置**

    导入必要的组件并为后续步骤定义样式。

    **导入**

    ```javascript
    import {
      RiveView,
      useRive,
      useRiveFile,
      useRiveNumber,
      useRiveTrigger,
      useViewModelInstance,
      Fit,
    } from '@rive-app/react-native';
    ```

    **样式**

    ```javascript
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      rive: {
        width: '100%',
        height: 400,
      },
    });
    ```

3.  **Rive 文件和组件**

    `RiveView` 组件显示 Rive 图形。它需要一个 prop：`file`，即一个 `RiveFile` 对象。使用 `useRiveFile` Hook 加载 **riv** 文件并创建 `RiveFile` 对象。此对象可以被缓存并在多个组件中复用。

    **加载文件**

    ```javascript
    export default function QuickStart() {
      const { riveFile } = useRiveFile(
        require('path/to/quick_start.riv')
      );

      return (
        <View style={styles.container}>
          {riveFile && <RiveView file={riveFile} style={styles.rive} />}
        </View>
      );
    }
    ```

    延伸阅读：

    [## Props

    `RiveView` 可用的 view props](/docs/runtimes/react-native/props)[## 加载 Rive 文件

    如何在你的应用中加载 Rive 文件](/docs/runtimes/react-native/loading-rive-files)[## 缓存 Rive 文件

    缓存 Rive 文件以获得更好的性能](/docs/runtimes/caching-a-rive-file)

4.  **布局**

    配置图形如何适应其容器。对于此示例，我们将 `fit` 设置为 `Layout`，这会自动调整画板大小以匹配视图大小。这对于使用 [布局 (Layouts)](/docs/editor/layouts/layouts-overview) 构建的响应式 Rive 图形非常理想。

    **布局**

    ```javascript
    <RiveView
      file={riveFile}
      style={styles.rive}
      fit={Fit.Layout}
    />
    ```

    延伸阅读：

    [## 运行时布局

    控制 Rive 图形在其容器内的适应和对齐方式](/docs/runtimes/layout)

5.  **视图引用 (View Reference)**

    使用 `useRive()` Hook 访问 Rive 视图引用以进行编程控制。

    **useRive Hook**

    ```javascript
    export default function QuickStart() {
      const { riveFile } = useRiveFile(
        require('path/to/quick_start.riv')
      );
      const { riveViewRef, setHybridRef } = useRive();

      return (
        <View style={styles.container}>
          {riveFile && (
            <RiveView
              hybridRef={setHybridRef}
              file={riveFile}
              fit={Fit.Layout}
              style={styles.rive}
            />
          )}
        </View>
      );
    }
    ```

    延伸阅读：

    [## 视图方法

    查看所有可用的视图引用方法。](/docs/runtimes/react-native/rive-ref-methods)[## Hybrid Views

    阅读更多关于 Nitro Hybrid Views 的信息。](https://nitro.margelo.com/docs/hybrid-views)

6.  **数据绑定**

    使用 `useViewModelInstance` Hook 手动创建视图模型实例并将其传递给视图。这种方法允许你在视图加载之前的 `onInit` 回调中设置初始属性值，并解耦 `ViewModelInstance` 与 `RiveView`。

    **手动创建视图模型实例**

    ```javascript
    export default function QuickStart() {
      const { riveFile } = useRiveFile(
        require('path/to/quick_start.riv')
      );
      const { riveViewRef, setHybridRef } = useRive();
      const viewModelInstance = useViewModelInstance(riveFile, {
        onInit: (vmi) => (vmi.numberProperty('health')!.value = 20),
      });

      return (
        <View style={styles.container}>
          {riveFile && viewModelInstance && (
            <RiveView
              hybridRef={setHybridRef}
              file={riveFile}
              fit={Fit.Layout}
              style={styles.rive}
              dataBind={viewModelInstance}
            />
          )}
        </View>
      );
    }
    ```

    使用视图模型属性 Hooks 更新和监听属性更改。

    **属性 Hooks**

    ```javascript
    export default function QuickStart() {
      const { riveFile } = useRiveFile(
        require('path/to/quick_start.riv')
      );
      const { riveViewRef, setHybridRef } = useRive();
      const viewModelInstance = useViewModelInstance(riveFile, {
        onInit: (vmi) => (vmi.numberProperty('health')!.value = 20),
      });

      const { value: health, setValue: setHealth } = useRiveNumber(
        'health',
        viewModelInstance
      );

      console.log('health', health);

      const { trigger: gameOverTrigger } = useRiveTrigger(
        'gameOver',
        viewModelInstance,
        { onTrigger: () => console.log('Game Over Triggered') }
      );

      const handleTakeDamage = () => {
        setHealth((h) => (h ?? 0) - 7);
        riveViewRef!.playIfNeeded();
      };

      const handleMaxHealth = () => {
        setHealth(100);
        riveViewRef!.playIfNeeded();
      };

      const handleGameOver = () => {
        setHealth(0);
        gameOverTrigger();
        riveViewRef!.playIfNeeded();
      };

      return (
        <View style={styles.container}>
          {riveFile && viewModelInstance && (
            <RiveView
              hybridRef={setHybridRef}
              file={riveFile}
              fit={Fit.Layout}
              style={styles.rive}
              dataBind={viewModelInstance}
            />
          )}
          <Button onPress={handleTakeDamage} title="Take Damage" />
          <Button onPress={handleMaxHealth} title="Max Health" />
          <Button onPress={handleGameOver} title="Game Over" />
        </View>
      );
    }
    ```

    我们调用 `playIfNeeded` 强制状态机播放。在某些情况下，如果图形中没有活动的时间轴，状态机可能会停止。这是一个临时的解决方法。将来，这将自动发生。

    延伸阅读：

    [## 数据绑定

    查看运行时数据绑定文档以获取更多信息。](/docs/runtimes/data-binding)

    查看我们的 [示例应用](https://github.com/rive-app/rive-nitro-react-native/tree/main/example) 获取更多使用示例。

## [​](#key-components) 关键组件 (Key Components)

### [​](#riveview) `RiveView`

用于渲染 Rive 内容的组件：

```javascript
<RiveView
  file={riveFile}
/>
```

查看可用的 [props](/docs/runtimes/react-native/props) 和 [methods](/docs/runtimes/react-native/rive-ref-methods)。

### [​](#userivefile) `useRiveFile`

用于从 URL 或本地源加载 Rive 文件的 Hook：

```javascript
const { riveFile } = useRiveFile({
  url: 'https://cdn.rive.app/animations/vehicles.riv',
  // or
  // source: require('./assets/graphic.riv'),
});
```

查看 [加载 Rive 文件](/docs/runtimes/react-native/loading-rive-files) 和 [缓存 Rive 文件](/docs/runtimes/caching-a-rive-file) 获取更多信息。

### [​](#userive) `useRive`

用于访问 Rive 视图引用以进行编程控制的 Hook：

```javascript
const { riveViewRef, setHybridRef } = useRive();

<RiveView
  hybridRef={setHybridRef}
  file={riveFile}
/>
```

这是一个 [Nitro Hybrid View](https://nitro.margelo.com/docs/hybrid-views)。查看可用的 [视图引用方法](/docs/runtimes/react-native/rive-ref-methods)。

### [​](#useviewmodelinstance) `useViewModelInstance`

用于从 `RiveFile`、`ViewModel` 或 `RiveViewRef` 创建视图模型实例的 Hook：

```javascript
// Get default instance from RiveFile (recommended)
// 从 RiveFile 获取默认实例（推荐）
const instance = useViewModelInstance(riveFile);

// or
// Get named instance from a ViewModel
// 从 ViewModel 获取命名实例
const namedInstance = useViewModelInstance(viewModel, { name: 'My Instance' });

// or
// Create a new blank instance from a ViewModel
// 从 ViewModel 创建新的空白实例
const newInstance = useViewModelInstance(viewModel, { useNew: true });

// or
// With required: true (throws if null, use with Error Boundary)
// 使用 required: true（如果为 null 则抛出错误，与错误边界一起使用）
const instance = useViewModelInstance(riveFile, { required: true });

// or
// With onInit to set initial values synchronously
// 使用 onInit 同步设置初始值
const instance = useViewModelInstance(riveFile, {
  onInit: (vmi) => {
    vmi.numberProperty('count')?.set(10);
    vmi.stringProperty('name')?.set('Initial Name');
  }
});
```

在 `RiveView` 中传递 `dataBind` prop。

```javascript
return (
  <RiveView
    file={riveFile}
    dataBind={instance}
  />
);
```

你也可以从 `RiveViewRef` 获取自动绑定的实例：

```javascript
import { useRive, useViewModelInstance } from '@rive-app/react-native';

const { riveViewRef, setHybridRef } = useRive();
const instance = useViewModelInstance(riveViewRef);
```

查看 [运行时数据绑定文档](/docs/runtimes/data-binding) 获取更多信息。

## [​](#resources) 资源

[## GitHub](https://github.com/rive-app/rive-nitro-react-native)[## NPM](https://www.npmjs.com/package/@rive-app/react-native)[## 示例应用](https://github.com/rive-app/rive-nitro-react-native/tree/main/example)

旧版运行时仍然受支持，但我们建议迁移到新运行时以获得更好的性能和功能。

本指南记录了如何开始使用旧版 React Native 运行时库。源代码可在其 [GitHub 仓库](https://github.com/rive-app/rive-react-native) 中找到。此库包含一个 API，供 React Native 应用轻松集成 Rive 资产。最低 iOS 目标版本为 **14.0**。

请参阅 [我们的文档](/docs/runtimes/react-native/adding-rive-to-expo) 以将 Rive 添加到 Expo 应用中。

## [​](#getting-started) 快速开始 (旧版)

按照以下步骤快速在你的 React Native 应用中集成 Rive。

1.  **安装依赖**

    ```bash
    npm install rive-react-native
    # or for Yarn
    yarn add rive-react-native
    ```

2.  **iOS - Pod Install**

    `cd` 进入 `ios` 文件夹并运行 `pod install`（如果部署到 iOS）。

    如果你在这里遇到问题，你可能需要将 `ios` 部署版本目标至少，提高到 `14.0`。你可以在 `ios/` 文件夹的 `Podfile` 中找到此版本。

3.  **Android - 设置 Kotlin 依赖解析**

    此步骤可能是可选的 - 但是，如果 React Native 项目中的 Android 设置没有设置 Kotlin `v1.8.0+`，你在构建项目时可能会遇到重复类问题。为了缓解这些问题，正如 [Kotlin 文档](https://kotlinlang.org/docs/gradle-configure-project.html#versions-alignment-of-transitive-dependencies) 所建议的那样，将以下内容添加到应用程序 `build.gradle` 文件的 `dependencies` 中以处理版本对齐：

    ```gradle
    dependencies {
        implementation platform('org.jetbrains.kotlin:kotlin-bom:1.8.0')
        ...
    }
    ```

4.  **添加 Rive 组件**

    ```javascript
    import Rive from 'rive-react-native';

    function App() {
      return <Rive
          url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
          artboardName="Avatar 1"
          stateMachineName="avatar"
          style={{width: 400, height: 400}}
      />;
    }
    ```

## [​](#resources-2) 资源 (旧版)

[## GitHub](https://github.com/rive-app/rive-react-native)[## 示例应用](https://github.com/rive-app/rive-react-native/tree/main/example)

[从 v3 迁移到 v4](/docs/runtimes/react/migrating-from-v3-to-v4)[运行时概念](/docs/runtimes/react-native/runtime-concepts)