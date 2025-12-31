---
title: "缓存 Rive 文件 (Caching a Rive File)"
description: ""
---

import { Demos } from "/snippets/demos.jsx";

在大多数情况下，`.riv` 文件的加载速度都很快，您无需亲自管理 `RiveFile`。但如果您打算在应用程序的多个部分，甚至在同一个屏幕中使用同一个 `.riv` 文件，那么将其加载一次并保留在内存中可能会更有优势。

## 示例用法 (Example Usage)

### Flutter

在 Flutter 中，您负责管理 Rive 文件的生命周期。您可以直接创建一个 `File` 对象，或者配合 `RiveWidgetBuilder` 使用 `FileLoader` 便捷类。在这两种情况下，当对象不再需要时，您必须调用其 `dispose()` 方法以释放内存。

```dart
        import 'package:flutter/material.dart';
        import 'package:rive/rive.dart';

        class CachedPage extends StatefulWidget {
            const CachedPage({super.key});

            @override
            State<CachedPage> createState() => _CachedPageState();
        }

        class _CachedPageState extends State<CachedPage> {
            var _isRivLoaded = false;

            // 这里存放我们的缓存文件。
            late File _riveFile;

            @override
            void initState() {
                super.initState();

                // 初始化完成后，通过更新 _isRivLoaded 来构建布局。
                _initRive().whenComplete(
                    () => setState(() {
                        _isRivLoaded = true;
                    }),
                );
            }

            Future<void> _initRive() async {
                // 从 assets 中获取 Rive 文件。
                _riveFile = (await File.asset(
                    "assets/rewards_demo.riv",
                    riveFactory: Factory.rive,
                ))!;
            }

            @override
            void dispose() {
                _riveFile.dispose();
                super.dispose();
            }

            @override
            Widget build(BuildContext context) {
                if (_isRivLoaded) {
                    // 两个 widget 都可以使用同一个 Rive 文件，因为我们将其缓存为状态。
                    final widget1 = RiveWidget(controller: RiveWidgetController(_riveFile));
                    final widget2 = RiveWidget(controller: RiveWidgetController(_riveFile));

                    return Scaffold(
                        body: Row(
                            children: [
                                Expanded(child: widget1),
                                Expanded(child: widget2),
                            ],
                        ),
                    );
                } else {
                    return CircularProgressIndicator();
                }
            }
        }
```

::: tip
为了优化内存使用，如果多个 `RiveWidget` 实例使用相同的 `.riv` 文件，请重用同一个 `File` 对象。这可以确保文件仅被加载一次并共享内存。
:::

::: warning
`File` 被销毁（disposed）后无法再次使用。如果需要再次使用同一个 `.riv` 文件，请创建一个新的 `File` 对象。
:::

#### 管理状态 (Managing State)

如何保持 Rive `File` 的存活并与 widget 共享，取决于您采用的状态管理方案。若要全局访问，可以在 `main` 函数中或应用启动期间加载文件，并使用诸如 [Provider](https://pub.dev/packages/provider) 之类的包将其暴露。如果文件仅在应用的特定部分需要，请考虑仅在需要时加载该文件。

#### 内存 (Memory)

亲自管理文件可以让您对内存使用进行精细化控制，尤其是当同一个 Rive 文件在多处或多个 widget 中同时使用时。如有需要，请使用 [Flutter DevTools 内存工具](https://docs.flutter.dev/tools/devtools/memory#memory-view-guide) 来监控并优化内存。

#### 网络资产 (Network Assets)

要从互联网加载 Rive 文件，请使用 `File.url('YOUR:URL')`。对于网络资产，请将文件缓存在内存中，以避免重复下载和对文件进行不必要的解码。

### React

这是一个简化后的示例，展示了如何集成 `useRiveFile` hook 以在各个组件之间重用 `RiveFile`：

```javascript
        import React, { useState } from 'react';
        import { useRiveFile } from '@rive-app/react-canvas';

        // 用于显示 Rive 动画的自定义包装组件
        const RiveAnimation = ({ riveFile }) => {
            const { RiveComponent } = useRive({
                riveFile: riveFile,
                autoplay: true
            });

            return <RiveComponent/>;
        };

        function App() {
        const { riveFile, status } = useRiveFile({
            src: 'https://cdn.rive.app/animations/myrivefile.riv',
        });

        const [instanceCount] = useState(5); // 要渲染的 RiveAnimation 组件数量

        if (status === 'idle') {
            return <div>空闲中 (Idle)...</div>;
        }

        if (status === 'loading') {
            return <div>加载中 (Loading)...</div>;
        }

        if (status === 'failed') {
            return <div>Rive 文件加载失败。</div>;
        }

        // 每个 RiveAnimation 组件都使用我们之前加载的 RiveFile，因此它仅被获取和初始化一次
        return (
            <div class="App">
                <header class="App-header">Rive 实例 (Rive Instances)</header>
                <div class="rive-list">
                {Array.from({ length: instanceCount }, (_, index) => (
                    <RiveAnimation key={`rive-instance-${index}`} riveFile={riveFile} />
                ))}
                </div>
            </div>
            );

        }

        export default App;
```

### React Native

### 新版运行时 (推荐)

在新版 React Native 运行时中，您始终需要加载并管理传递给 `RiveView` 的 `RiveFile` 对象的生命周期。`useRiveFile` hook 处理加载过程，您可以在多个 `RiveView` 组件中重用同一个 `RiveFile` 以将其缓存在内存中。

以下是展示如何缓存 Rive 文件并在多个组件中重用它的示例：

```tsx Reuse RiveFile 示例
                import { useState } from 'react';
                import { View, ActivityIndicator, Text } from 'react-native';
                import {
                  RiveView,
                  useRiveFile,
                  Fit,
                  type RiveFile,
                } from '@rive-app/react-native';

                // 用于显示 Rive 动画的自定义组件
                const RiveExample = ({ riveFile }: { riveFile: RiveFile }) => {
                  return (
                    <RiveView
                      file={riveFile}
                      fit={Fit.Contain}
                      autoPlay={true}
                      
                    />
                  );
                };

                export default function CacheExample() {
                  // 使用 useRiveFile 一次性加载 Rive 文件
                  const { riveFile, isLoading, error } = useRiveFile(
                    require('../../assets/rive/rating.riv')
                  );

                  const [instanceCount] = useState(5); // 要渲染的 RiveExample 组件数量

                  if (isLoading) {
                    return <ActivityIndicator size="large" />;
                  }

                  if (error || !riveFile) {
                    return <Text>Rive 文件加载失败: {error || '未知错误'}</Text>;
                  }

                  // 每个 RiveExample 组件都使用我们之前加载的同一个 RiveFile，
                  // 因此它仅被获取和初始化一次
                  return (
                    <View >
                      {Array.from({ length: instanceCount }, (_, index) => (
                        <RiveExample key={`rive-instance-${index}`} riveFile={riveFile} />
                      ))}
                    </View>
                  );
                }
```

::: tip
为了优化内存使用，如果多个 `RiveView` 实例使用相同的 `.riv` 文件，请重用同一个 `RiveFile` 对象。这可以确保文件仅被加载一次并共享内存。
:::

#### 管理状态 (Managing State)

如何保持 `RiveFile` 存活并与组件共享，取决于您的状态管理方案：

- **全局访问**：在应用层级或 context provider 中加载文件，并使用 React Context 或状态管理库（如 Redux 或 Zustand）将其暴露。
- **组件层级**：如果文件仅在应用的特定部分需要，请在父组件中加载它并将其作为 props 向下传递。
- **自定义 hook**：创建一个管理 `RiveFile` 生命周期并将其提供给消费组件的自定义 hook。

#### 内存管理 (Memory Management)

`useRiveFile` hook 会自动管理 `RiveFile` 对象的生命周期。当组件卸载或输入发生变化时，hook 会销毁旧文件并根据需要加载新文件。这为您提供了自动化的内存管理，无需手动清理。

#### 网络资产 (Network Assets)

要从远程 URL 加载 Rive 文件，请将 URL 字符串传递给 `useRiveFile`：

```tsx
                const { riveFile, isLoading, error } = useRiveFile(
                    'https://cdn.rive.app/animations/vehicles.riv'
                );
```

对于网络资产，将文件缓存在内存中可以避免重复下载和不必要的解码。只要您重用同一个 `riveFile` 对象，`useRiveFile` hook 就会自动处理这一点。

有关不同加载方法的更多信息，请参阅[加载 Rive 文件](/runtimes/react-native/loading-rive-files)。

### 旧版运行时

不支持。

### Web

以下是一个基础示例，说明如何预加载 Rive 文件，并将数据传递给多个 Rive 实例。

```javascript
        const rive = require("@rive-app/canvas");

        let riveInstances = [];

        function loadRiveFile(src, onSuccess, onError) {
        const file = new rive.RiveFile({
            src: src,
            onLoad: () => onSuccess(file),
            onLoadError: onError,
        });
        // 记得调用 init() 来触发加载操作；
        file.init().catch(onError);
        }

        function setupRiveInstance(loadedRiveFile, canvasId) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const riveInstance = new rive.Rive({
            riveFile: loadedRiveFile,
            // 请确保指定了正确的状态机（或动画）名称
            stateMachines: "Motion", // 要播放的状态机名称
            canvas: canvas,
            layout: new rive.Layout({
            fit: rive.Fit.FitWidth,
            alignment: rive.Alignment.Center,
            }),
            autoplay: true,
            onLoad: () => {
            // 通过采用设备像素比来防止画布模糊
            riveInstance.resizeDrawingSurfaceToCanvas();
            },
        });

        riveInstances.push(riveInstance);
        }

        // 加载 .riv 文件并使用内存中同一个已加载的 RiveFile 初始化多个 Rive 实例
        loadRiveFile(
        "clean_the_car.riv",
        (file) => {
            setupRiveInstance(file, "rive-canvas-1");
            setupRiveInstance(file, "rive-canvas-2");
            // 您也可以在这里保留已加载 RiveFile 的引用，以便稍后能够初始化其他 Rive 实例。
        },
        (error) => {
            console.error("加载 Rive 文件失败:", error);
        }
        );

        // 如果窗口调整大小，则为所有实例调整绘制表画的大小
        window.addEventListener(
        "resize",
        () => {
            riveInstances.forEach((instance) => {
            if (instance) {
                instance.resizeDrawingSurfaceToCanvas();
            }
            });
        },
        false
        );
```

### Apple

```swift
        // 缓存一个 RiveFile 供以后重用
        let file = try! RiveFile(resource: "file", loadCdn: false)

        // 以给定类型为例，它在为指定状态机或画板创建新的视图模型时
        // 重用单个 RiveFile。
        class ViewModelGenerator {
            /// 生成新视图模型时重用的 RiveFile。
            private let file: RiveFile

            init(file: RiveFile) {
                self.file = file
            }

            // 使用缓存的 RiveFile 返回一个新的视图模型。
            // 这意味着每次生成视图模型时，无需重新解析 RiveFile。
            func viewModel(stateMachine: String?, artboard: String?) -> RiveViewModel {
                // 虽然一个 RiveFile 就可以被缓存和重用，但每个视图模型
                // 都应该拥有自己的 model，以避免共享状态。
                let model = RiveModel(riveFile: file)
                return RiveViewModel(model, stateMachineName: stateMachine, artboardName: artboard)
            }
        }
```

在使用 `RiveViewModel(fileName:)` 初始化器时，Apple 运行不会缓存文件；这必须手动处理。您可能会发现，当重用同一个文件时，随着创建的视图模型增多，您的内存使用量（随时间）会增加。这正是您应该考虑缓存底层文件以供重用的时候。

在适用的情况下，重用单个 `RiveFile` 将减少应用程序的整体内存开销。如果您的 `.riv` 可以在多个视图中重用（即：每个视图都需要同一个文件，但使用不同的画板或状态机），请在创建视图模型之前考虑缓存 `RiveFile`。虽然一个 `RiveFile` 可以被缓存，但为了确保每个视图处于各自的状态，您必须为每个 `RiveViewModel` 实例创建一个唯一的 `RiveModel`。

### Android

要在 Android 中缓存 Rive 文件，您可以使用 Rive `File` 类来加载并缓存文件。该 `RiveFile` 随后可以在多个 `RiveAnimationView` 实例中重用。这是一个基础示例：

```kotlin
        import app.rive.runtime.kotlin.RiveAnimationView
        import app.rive.runtime.kotlin.RiveInitializer
        import app.rive.runtime.kotlin.core.File

        class MainActivity : ComponentActivity() {
            var riveFile: File? = null

            override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
                enableEdgeToEdge()

                // 初始化 Rive。
                AppInitializer.getInstance(applicationContext)
                    .initializeComponent(RiveInitializer::class.java)

                // 从 assets 中加载 Rive 文件并缓存。
                application.assets.open("rewards_demo.riv").use { inputStream ->
                    val fileBytes = inputStream.readBytes()
                    riveFile = File(fileBytes)
                }

                setContent {
                    Row {
                        // 第一次使用缓存文件。
                        AndroidView(
                            modifier = Modifier.weight(1f),
                            factory = { context ->
                                RiveAnimationView(context).also {
                                    it.setRiveFile(
                                        file = riveFile!!,
                                        stateMachineName = "State Machine 1",
                                        autoBind = true,
                                    )
                                }
                            }
                        )

                        // 第二次使用缓存文件。
                        AndroidView(
                            modifier = Modifier.weight(1f),
                            factory = { context ->
                                RiveAnimationView(context).also {
                                    it.setRiveFile(
                                        file = riveFile!!,
                                        stateMachineName = "State Machine 1",
                                        autoBind = true,
                                    )
                                }
                            }
                        )
                    }
                }
            }

            override fun onDestroy() {
                riveFile?.release()
                super.onDestroy()
            }
        }
```

请记住，这只是加载字节的一种方法，您的具体实现可能会根据应用的架构而有所不同。关键点在于从字节数组创建一个 Rive `File`，然后将其设置到 `RiveAnimationView` 上。

::: warning
Rive `File` 是引用计数的，创建后的引用计数为 1。将其分配给 `RiveAnimationView` 将保留一个额外的引用，但由于创建而产生的原始引用仍然存在。您有责任在用完文件时通过调用 `File::release` 来释放该引用。如果您不释放该文件，即使 Kotlin 对象已被垃圾回收，原生（native）内存也将一直保留到应用关闭。
:::
