---
title: "React Native"
description: "Rive 的 React Native 运行时。"
---

import NoteOnFeatureSupport from "/snippets/runtimes/rendering-feature-support.mdx";
import Interaction from "/snippets/runtimes/animation-control-and-interaction.mdx";
import { Demos } from "/snippets/demos.jsx";

<NoteOnFeatureSupport />

::: info
🚀 **新版 Rive React Native 运行时现已发布！** 基于 Nitro 构建，具有更佳的性能和更好的 React Native 集成。

**开始使用：**

- [GitHub](https://github.com/rive-app/rive-nitro-react-native)
- [NPM](https://www.npmjs.com/package/@rive-app/react-native)

**迁移时间表：**

- **短期内：** 完善新运行时，参见 [功能支持 (Feature Support)](https://github.com/rive-app/rive-nitro-react-native?tab=readme-ov-file#feature-support) 和 [路线图 (Roadmap)](https://github.com/rive-app/rive-nitro-react-native?tab=readme-ov-file#roadmap)
- **中期内：** 解决旧版包中的主要问题，同时支持迁移
- **长期看：** 完全迁移到新包

我们正在积极收集反馈以改进新运行时。请分享您的想法并报告您遇到的任何问题。
:::

## 概述 (Overview)

本指南介绍如何开始使用 Rive React Native 运行时。新运行时的源代码可在 [GitHub 仓库](https://github.com/rive-app/rive-nitro-react-native) 中找到。

### 新版运行时（推荐）(New Runtime - Recommended)

## 要求 (Requirements)

- **React Native**: 0.78 或更高版本（推荐 0.79+ 以获得更好的 Android 错误消息）
- **Expo SDK**: 53 或更高版本（适用于 Expo 用户）
- **iOS**: 15.1 或更高版本
- **Android**: SDK 24 (Android 7.0) 或更高版本
- **Xcode**: 16.4 或更高版本
- **JDK**: 17 或更高版本
- **Nitro Modules**: 0.25.2 或更高版本

## 快速开始 (Quick Start)

按照以下快速开始步骤熟悉 Rive React Native 运行时。

**[Rive 文件](https://rive.app/marketplace/24637-46037-health-bar-data-binding-quick-start/)**

在本快速入门指南中使用的 Rive 文件的 Remix/下载链接

**[完整示例](https://github.com/rive-app/rive-nitro-react-native/blob/main/example/src/pages/QuickStart.tsx)**

查看完整的快速入门示例

### 安装依赖

```bash
        npm install @rive-app/react-native react-native-nitro-modules
        # 或使用 Yarn
        yarn add @rive-app/react-native react-native-nitro-modules
```

::: info
由于此库依赖于 [Nitro Modules](https://nitro.margelo.com/)，因此需要安装 `react-native-nitro-modules`。
:::

### 设置 (Setup)

导入必要的组件并为接下来的步骤定义样式。

```ts 导入
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

```ts 样式
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

### Rive 文件和组件 (Rive File and Component)

`RiveView` 组件用于显示 Rive 图形。它只需要一个 prop：`file`（一个 `RiveFile` 对象）。

使用 `useRiveFile` hook 加载 **riv** 文件并创建 `RiveFile` 对象。此对象可以被缓存并在多个组件中重复使用。

```ts 加载文件
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

**[Prop 介绍](/runtimes/react-native/props)**

`RiveView` 可用的视图 prop

**[加载 Rive 文件](/runtimes/react-native/loading-rive-files)**

如何在应用中加载 Rive 文件

**[缓存 Rive 文件](/runtimes/caching-a-rive-file)**

缓存 Rive 文件以获得更好的性能

### 布局 (Layout)

配置图形在容器内的填充方式。

在此示例中，我们将 `fit` 设置为 `Layout`，这会自动调整画板大小以匹配视图大小。这对于使用[布局 (Layouts)](/editor/layouts/layouts-overview) 构建的响应式 Rive 图形非常理想。

```ts 布局配置 focus={1, 4, 5}
        <RiveView
          file={riveFile}
          style={styles.rive}
          fit={Fit.Layout}
        />
```

延伸阅读：

**[运行时布局](/runtimes/layout)**

控制 Rive 图形在容器内的填充和对齐方式

### 视图引用 (View Reference)

使用 `useRive()` hook 获取 Rive 视图引用，以便进行编程式控制。

```ts useRive hook focus={5, 11}
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

**[视图方法](/runtimes/react-native/rive-ref-methods)**

查看所有可用的视图引用方法。

**[混合视图 (Hybrid Views)](https://nitro.margelo.com/docs/hybrid-views)**

阅读更多关于 Nitro 混合视图的信息。

### 数据绑定 (Data binding)

使用 `useViewModelInstance` hook 手动创建视图模型实例并将其传递给视图。

这种方法允许您在视图加载前的 `onInit` 回调中设置初始属性值，并将 `ViewModelInstance` 与 `RiveView` 解耦。

```ts 手动创建视图模型实例 focus={6-8, 12, 18}
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

使用视图模型属性 hook 来更新和监听属性更改。

```ts 属性 hook focus={10-37, 50-52} expandable
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

::: warning
我们调用 `playIfNeeded` 来强制状态机播放。在某些情况下，如果图形中没有活动的轴线 (timeline)，状态机可能处于静止状态。

这是一个临时的权宜之计。未来，这将自动发生。
:::

延伸阅读：

**[数据绑定](/runtimes/data-binding)**

有关更多信息，请参阅运行时数据绑定文档。

::: info
请参阅我们的 [示例应用](https://github.com/rive-app/rive-nitro-react-native/tree/main/example) 获取更多用法示例。
:::

## 关键组件 (Key Components)

### `RiveView`

渲染 Rive 内容的组件：

```ts
    <RiveView
      file={riveFile}
    />
```

参见可用的 [prop 参数](/runtimes/react-native/props) 和 [方法](/runtimes/react-native/rive-ref-methods)。

### `useRiveFile`

从 URL 或本地源加载 Rive 文件的 hook：

```javascript
    const { riveFile } = useRiveFile({
      url: 'https://cdn.rive.app/animations/vehicles.riv',
      // 或者
      // source: require('./assets/graphic.riv'),
    });
```

有关更多信息，请参阅[加载 Rive 文件](/runtimes/react-native/loading-rive-files)和[缓存 Rive 文件](/runtimes/caching-a-rive-file)。

### `useRive`

访问 Rive 视图引用以进行编程式控制的 hook：

```javascript
    const { riveViewRef, setHybridRef } = useRive();

    <RiveView
      hybridRef={setHybridRef}
      file={riveFile}
    />
```

这是一个 [Nitro 混合视图 (Hybrid View)](https://nitro.margelo.com/docs/hybrid-views)。请参阅可用的[视图引用方法](/runtimes/react-native/rive-ref-methods)。

### `useViewModelInstance`

从 `RiveFile`、`ViewModel` 或 `RiveViewRef` 创建视图模型实例的 hook：

```ts
    // 从 RiveFile 获取默认实例（推荐）
    const instance = useViewModelInstance(riveFile);

    // 或者
    // 从 ViewModel 获取命名实例
    const namedInstance = useViewModelInstance(viewModel, { name: 'My Instance' });

    // 或者
    // 从 ViewModel 创建新的空白实例
    const newInstance = useViewModelInstance(viewModel, { useNew: true });

    // 或者
    // 设置 required: true（如果为 null 则抛出错误，配合错误边界使用）
    const instance = useViewModelInstance(riveFile, { required: true });

    // 或者
    // 使用 onInit 同步设置初始值
    const instance = useViewModelInstance(riveFile, {
      onInit: (vmi) => {
        vmi.numberProperty('count')?.set(10);
        vmi.stringProperty('name')?.set('Initial Name');
      }
    });
```

在 `RiveView` 中传递 `dataBind` prop。

```ts
    return (
      <RiveView
        file={riveFile}
        dataBind={instance}
      />
    );
```

您还可以从 `RiveViewRef` 获取自动绑定的实例：

```javascript
    import { useRive, useViewModelInstance } from '@rive-app/react-native';

    const { riveViewRef, setHybridRef } = useRive();
    const instance = useViewModelInstance(riveViewRef);
```

有关更多信息，请参阅[运行时数据绑定文档](/runtimes/data-binding)。

## 资源 (Resources)

<Card title="GitHub" href="https://github.com/rive-app/rive-nitro-react-native" />
<Card title="NPM" href="https://www.npmjs.com/package/@rive-app/react-native" />
<Card title="示例应用" href="https://github.com/rive-app/rive-nitro-react-native/tree/main/example" />

### 旧版运行时 (Legacy Runtime)

::: warning
旧版运行时仍受支持，但我们建议迁移到新运行时以获得更好的性能和功能。
:::

本指南介绍如何开始使用旧版 React Native 运行时库。源代码可在其 [GitHub 仓库](https://github.com/rive-app/rive-react-native)中找到。该库提供了一套 API，方便 React Native 应用集成 Rive 资源。

最低 iOS 版本要求为 **14.0**。

::: info
请参阅[我们的文档](/runtimes/react-native/adding-rive-to-expo)，了解如何将 Rive 添加到 Expo 应用中。
:::

## 入门 (Getting Started)

按照以下步骤，快速开始将 Rive 集装到您的 React Native 应用中。

### 安装依赖

```bash
        npm install rive-react-native
        # 或者使用 Yarn
        yarn add rive-react-native
```

### iOS - Pod 安装

进入 `ios` 文件夹并运行 `pod install`（如果要部署到 iOS）。

::: info
如果您在这里遇到问题，您可能需要将 `ios` 部署版本目标提升到至少 `14.0`。您可以在 `ios/` 文件夹的 `Podfile` 中找到该版本设置。
:::

### Android - 设置 Kotlin 依赖解析

这一步可能是可选的。但是，如果 React Native 项目中的 Android 设置没有包含 Kotlin `v1.8.0+`，在构建项目时可能会遇到重复类的问题。如 [Kotlin 文档](https://kotlinlang.org/docs/gradle-configure-project.html#versions-alignment-of-transitive-dependencies)所建议的，为了解决版本一致性问题，请在应用的 `build.gradle` 文件中的 dependencies 部分添加以下内容：

```javascript
        dependencies {
            implementation platform('org.jetbrains.kotlin:kotlin-bom:1.8.0')
            ...
        }
```

### 添加 Rive 组件

```javascript
        import Rive from 'rive-react-native';

        function App() {
          return <Rive
              url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
              artboardName="Avatar 1"
              stateMachineName="avatar"
              
          />;
        }
```

## 资源 (Resources)

<Card title="GitHub" href="https://github.com/rive-app/rive-react-native" />
<Card title="示例应用" href="https://github.com/rive-app/rive-react-native/tree/main/example" />
