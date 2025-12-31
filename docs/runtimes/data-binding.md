---
title: "数据绑定 (Data Binding)"
description: "使用视图模型将您的代码连接到绑定的编辑器元素"
---

import { YouTube } from "/snippets/youtube.mdx";
import { Demos } from "/snippets/demos.jsx";

# 概览 (Overview)

在开始使用运行时数据绑定 API 之前，熟悉[概览 (Overview)](/editor/data-binding/overview)中介绍的核心概念非常重要。

**[数据绑定概念 (Data Binding Concepts)](/editor/data-binding/overview)**

  数据绑定核心概念概览。

<br />

# 视图模型 (View Models)

视图模型描述了一组属性，但它们本身不能用于获取或设置值 —— 这是[视图模型实例 (view model instances)](#view-model-instances)的作用。

首先，我们需要获取对特定视图模型的引用。这可以通过索引、名称或给定画板的默认模型来完成，并且是从 Rive 文件中操作的。默认选项指的是编辑器下拉列表中分配给画板的视图模型。

### Web

在 `onLoad` 回调中从创建的 Rive 对象访问视图模型：

```typescript
    const rive = new rive.Rive({
        onLoad: () => {
            // Rive 对象现在已加载并准备就绪。
        }
    });
```

加载 Rive 后，您可以使用以下方法访问视图模型：

```typescript
    // 通过名称获取引用
    const namedVM = rive.viewModelByName("My View Model");

    // 通过索引获取引用
    for (let i = 0; i < rive.viewModelCount; i++) {
        const indexedVM = rive.viewModelByIndex(i);
    }

    // 获取对默认视图模型的引用
    const defaultVM = rive.defaultViewModel();
```

或者，如果您可以访问底层的 Rive File 对象，则可以对文件调用上述方法。

```typescript
    const namedVM = file.viewModelByName("My View Model");
    const indexedVM = file.viewModelByIndex(0);
    const defaultVM = file.defaultArtboardViewModel(artboard);
```

### React

使用 `useViewModel` hook 获取对视图模型的引用。您需要传递从 `useRive` 获取的 `rive` 对象。

```typescript
    import { useRive, useViewModel } from '@rive-app/react-webgl2';

    const { rive, RiveComponent } = useRive({
        src: 'your_file.riv',
        // ... 其他选项
    });

    // 选项 1：获取画板的默认视图模型 (ViewModel)
    const defaultViewModel = useViewModel(rive);

    // 选项 2：显式获取默认视图模型
    const defaultViewModelExplicit = useViewModel(rive, { useDefault: true });

    // 选项 3：通过名称获取视图模型
    const namedViewModel = useViewModel(rive, { name: 'MyViewModelName' });
```

### Apple

```swift
    let riveViewModel = RiveViewModel(...)
    let file = riveViewModel.riveModel!.riveFile

    // 通过名称获取数据绑定视图模型
    let viewModelByName = file.viewModelNamed("...")

    // 通过索引获取数据绑定视图模型
    for index in 0..<file.viewModelCount {
        let viewModelByIndex = file.viewModel(at: index)
    }

    // 画板的默认数据绑定视图模型
    let artboard = riveViewModel.riveModel!.artboard
    let viewModelForArtboard = file.viewModel(for: artboard)
```

### Android

```kotlin
    // `view` 类型为 RiveAnimationView
    view.setRiveResource(R.raw.my_rive_file)
    val file = view.controller.file!!

    // 通过名称获取引用
    val vm = file.getViewModelByName("My View Model")

    // 通过索引获取引用
    for (i in 0 until file.viewModelCount) {
        val indexedVM = file.getViewModelByIndex(i)
    }

    // 获取对默认视图模型的引用
    val defaultVM = file.defaultViewModelForArtboard(view.controller.activeArtboard!!)
```

### Flutter

::: info
如果您使用的是 `RiveWidgetController`，可以跳过创建 `ViewModel` 的步骤。直接转到[视图模型实例 (View Model Instances)](#view-model-instances)。
:::

```dart
    // 获取文件 (File) 和画板 (Artboard) 的引用
    final file = await File.asset(
        'assets/my_file.riv',
        riveFactory: Factory.rive,
    );
    final artboard = file!.defaultArtboard()!;

    // 通过名称获取引用
    file.viewModelByName("My View Model");

    // 通过索引获取引用
    for (var i = 0; i < file.viewModelCount; i++) {
        final indexedVM = file.viewModelByIndex(i);
    }

    // 获取画板默认视图模型的引用
    final defaultVM = file.defaultArtboardViewModel(artboard);

    // 不再使用视图模型时将其释放 (dispose)
    viewModel.dispose();
```

### Unity

::: info
仅在 RiveWidget 上的 `Data Binding Mode` 设置为 `Manual` 时才需要这些 API。

否则，您可以直接在 Unity Inspector 的 Data 部分配置视图模型绑定。
:::

```csharp
    private void OnEnable()
    {
        riveWidget.OnWidgetStatusChanged += HandleWidgetStatusChanged;
    }

    private void OnDisable()
    {
        riveWidget.OnWidgetStatusChanged -= HandleWidgetStatusChanged;
    }

    private void HandleWidgetStatusChanged()
    {
        if (riveWidget.Status == WidgetStatus.Loaded)
        {
            File file = riveWidget.File;

            // 通过名称获取引用
            ViewModel viewModel = file.GetViewModelByName("My View Model");

            // 通过索引获取引用
            for (int i = 0; i < file.ViewModelCount; i++)
            {
                ViewModel indexedVM = file.GetViewModelAtIndex(i);
            }

            // 获取画板默认视图模型的引用
            ViewModel defaultVM = riveWidget.Artboard.DefaultViewModel;
        }
    }
```

### React Native

### 新版运行时 (推荐)

```tsx
        import { useRiveFile } from '@rive-app/react-native';

        const { riveFile } = useRiveFile(require('./my_file.riv'));

        // 通过名称获取引用
        const namedVM = riveFile?.viewModelByName('My View Model');

        // 通过索引获取引用
        const indexVM = riveFile?.viewModelByIndex(0);

        // 获取对默认画板视图模型的引用
        const defaultVM = riveFile?.defaultArtboardViewModel();
```

### 旧版运行时

::: info
仅在新版 React Native 运行时中支持创建视图模型对象。
:::

# 视图模型实例 (View Model Instances)

一旦我们获得了视图模型的引用，就可以用它来创建一个实例。创建实例时，您有四个选项：

1. 创建一个空白实例 —— 按照以下默认值填充创建实例的属性：

   | 类型 | 值 |
   | ----------------- | --------------- |
   | 数字 (Number) | 0 |
   | 字符串 (String) | 空字符串 |
   | 布尔值 (Boolean) | False |
   | 颜色 (Color) | 0xFF000000 |
   | 触发器 (Trigger) | 未触发 |
   | 枚举 (Enum) | 第一个值 |
   | 嵌套视图模型 (Nested view model) | Null |

2. 创建默认实例 —— 使用编辑器中标记为 "Default" 的实例。通常这是设计师打算在运行时使用的主要实例。
3. 按索引创建 —— 使用遍历所有可用实例时返回的顺序。在通过迭代创建多个实例时很有用。
4. 按名称创建 —— 使用编辑器的实例名称。在创建特定实例时很有用。

### Web

```typescript
    // 从视图模型 (ViewModel) 创建空白实例
    const vmiBlank = viewModel.instance();

    // 从视图模型 (ViewModel) 创建默认实例
    const vmiDefault = viewModel.defaultInstance();

    // 从视图模型 (ViewModel) 按索引创建实例
    for (let i = 0; i < viewModel.instanceCount; i++) {
        const vmiIndexed = viewModel.instanceByIndex(i);
    }

    // 从视图模型 (ViewModel) 按名称创建实例
    const vmiNamed = viewModel.instanceByName("My Instance");
```

### React

使用 `useViewModelInstance` hook 从 `useViewModel` hook 返回的视图模型创建视图模型实例。

```typescript
    import { useRive, useViewModel, useViewModelInstance } from '@rive-app/react-webgl2';

    const { rive, RiveComponent } = useRive({
        src: 'your_file.riv',
        artboard: 'MyArtboard',
        stateMachine: 'MyStateMachine',
        // ... 其他选项
    });

    const viewModel = useViewModel(rive, { name: 'MyViewModelName' });
    // 或者: const viewModel = useViewModel(rive); // 默认视图模型

    // 获取未绑定的默认实例
    const defaultUnbound = useViewModelInstance(viewModel, { useDefault: true });

    // 获取未绑定的命名实例
    const namedUnbound = useViewModelInstance(viewModel, { name: 'MyInstanceName' });

    // 创建未绑定的新空白实例
    const newUnbound = useViewModelInstance(viewModel, { useNew: true });
```

您还可以通过将 `rive` 对象传递给 `useViewModelInstance` hook，直接将视图模型实例绑定到 Rive 实例。

```typescript
    import { useRive, useViewModel, useViewModelInstance } from '@rive-app/react-webgl2';

    const { rive, RiveComponent } = useRive({
        src: 'your_file.riv',
        artboard: 'MyArtboard',
        stateMachine: 'MyStateMachine',
        autoBind: false, // 禁用自动绑定，以便我们稍后手动绑定
        // ... 其他选项
    });

    const viewModel = useViewModel(rive, { name: 'MyViewModelName' });

    // 获取默认实例（隐式）并进行绑定
    const defaultBound = useViewModelInstance(viewModel, { rive });

    // 获取命名实例并进行绑定
    const namedBound = useViewModelInstance(viewModel, { name: 'MyInstanceName', rive });

    // 创建一个新的空白实例并进行绑定
    const newBound = useViewModelInstance(viewModel, { useNew: true, rive });
```

如果您在 `useRive` 中设置了 `autoBind: true`，一旦 Rive 加载完成，您就可以直接通过 `rive.viewModelInstance` 访问自动绑定的默认实例，而无需使用 `useViewModel` 或 `useViewModelInstance`。

```typescript
    const { rive, RiveComponent } = useRive({
        src: 'your_file.riv',
        artboard: 'MyArtboard',
        stateMachine: 'MyStateMachine',
        autoBind: true,
    });

    // 加载完成后，实例即可用：
    const boundInstance = rive?.viewModelInstance;
```

### Apple

```swift
        let riveViewModel = RiveViewModel(...)
        let viewModel = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!

        // 创建空白实例
        let blankInstance = viewModel.createInstance()

        // 创建默认实例
        let defaultInstance = viewModel.createDefaultInstance()

        // 按索引创建
        for index in 0..<viewModel.instanceCount {
            let instanceByIndex = viewModel.createInstance(fromIndex: index)
        }

        // 按名称创建
        for name in viewModel.instanceNames {
            let instanceByName = viewModel.createInstance(fromName: name)
        }
```

### Android

```kotlin
    val vm = view.controller.file?.getViewModelByName("My View Model")!!

    // 创建空白实例
    val vmiBlank = vm.createBlankInstance()

    // 创建默认实例
    val vmiDefault = vm.createDefaultInstance()

    // 按索引创建
    for (i in 0 until vm.instanceCount) {
        val vmiIndexed = vm.createInstanceFromIndex(i)
    }

    // 按名称创建
    val vmiNamed = vm.createInstanceFromName("My Instance")
```

### Flutter

如果您使用的是 `RiveWidgetController`：

```dart
    // 获取文件引用
    file = await File.asset(
        'assets/rewards.riv',
        riveFactory: Factory.rive,
    );

    // 创建控制器
    controller = RiveWidgetController(file!);

    // 按名称进行数据绑定
    viewModelInstance = controller.dataBind(DataBind.byName('My View Model'));

    // 按索引进行数据绑定
    viewModelInstance = controller.dataBind(DataBind.byIndex(0));

    // 自动数据绑定
    viewModelInstance = controller.dataBind(DataBind.auto());

    // 将一些现有的视图模型实例绑定到控制器：
    viewModelInstance = controller.dataBind(DataBind.byInstance(someViewModelInstance));

    // 不再需要时释放您创建的对象
    viewModelInstance.dispose();
    controller.dispose();
    file.dispose();
```

如果您想自己管理视图模型实例的创建：

```dart
    final vm = file.viewModelByName("My View Model")!;

    // 创建空白实例
    final vmiBlank = vm.createInstance();

    // 创建默认实例
    final vmiDefault = vm.createDefaultInstance();

    // 按索引创建
    for (int i = 0; i < vm.instanceCount; i++) {
    final vmiIndexed = vm.createInstanceByIndex(i);
    }

    // 按名称创建
    final vmiNamed = vm.createInstanceByName("My Instance");

    // 释放视图模型实例 (dispose)
    viewModelInstance.dispose();
```

### Unity

::: info
仅在 RiveWidget 上的 `Data Binding Mode` 设置为 `Manual` 时才需要这些 API。

否则，您可以直接在 Unity Inspector 的 Data 部分配置视图模型绑定。
:::

```csharp
    private void OnEnable()
    {
        riveWidget.OnWidgetStatusChanged += HandleWidgetStatusChanged;
    }

    private void OnDisable()
    {
        riveWidget.OnWidgetStatusChanged -= HandleWidgetStatusChanged;
    }

    private void HandleWidgetStatusChanged()
    {
        if (riveWidget.Status == WidgetStatus.Loaded)
        {
            // 从 ViewModel 引用
            ViewModel vm = riveWidget.File.GetViewModelByName("My View Model");

            // 创建空白实例
            ViewModelInstance vmiBlank = vm.CreateInstance();

            // 创建默认实例
            ViewModelInstance vmiDefault = vm.CreateDefaultInstance();

            // 按索引创建
            for (int i = 0; i < vm.InstanceCount; i++)
            {
                ViewModelInstance vmiIndexed = vm.CreateInstanceAt(i);
            }

            // 按名称创建
            ViewModelInstance vmiNamed = vm.CreateInstanceByName("My Instance");
        }
    }
```

### React Native

### 新版运行时 (推荐)

使用 `useViewModelInstance` hook 创建视图模型实例。您可以将 `RiveFile`、`ViewModel` 或 `RiveViewRef` 作为源传递。

```tsx
        import { useRiveFile, useViewModelInstance, RiveView } from '@rive-app/react-native';

        const { riveFile } = useRiveFile(require('./my_file.riv'));

        // 从 RiveFile 获取默认实例 (推荐)
        const instance = useViewModelInstance(riveFile);

        // 从视图模型 (ViewModel) 获取命名实例
        const viewModel = riveFile?.viewModelByName('My View Model');
        const namedInstance = useViewModelInstance(viewModel, { name: 'My Instance' });

        // 创建一个新的空白实例
        const newInstance = useViewModelInstance(viewModel, { useNew: true });

        // 使用 required: true (如果为 null 则抛出错误，配合 Error Boundary 使用)
        const instance = useViewModelInstance(riveFile, { required: true });

        // 使用 onInit 同步设置初始值
        const instance = useViewModelInstance(riveFile, {
            onInit: (vmi) => {
                vmi.numberProperty('count')?.set(10);
                vmi.stringProperty('name')?.set('Initial Name');
            }
        });

        return (
            <RiveView
                file={riveFile}
                dataBind={instance}
                autoPlay={true}
            />
        );
```

您还可以从 `RiveViewRef` 获取自动绑定的实例：

```tsx
        import { useRive, useViewModelInstance } from '@rive-app/react-native';

        const { riveViewRef, setHybridRef } = useRive();
        const instance = useViewModelInstance(riveViewRef);
```

### 旧版运行时

您可以通过将 `dataBinding` 属性传递给 Rive 组件，将视图模型实例绑定到 Rive 组件。

`dataBinding` 属性接受 `DataBindBy` 类型，可以是以下之一：

```typescript
        export type DataBindBy =
            | { type: 'autobind'; value: boolean }
            | { type: 'index'; value: number }
            | { type: 'name'; value: string }
            | { type: 'empty' };

        export const AutoBind = (value: boolean): DataBindBy => ({
            type: 'autobind',
            value,
        });
        export const BindByIndex = (value: number): DataBindBy => ({
            type: 'index',
            value,
        });
        export const BindByName = (value: string): DataBindBy => ({
            type: 'name',
            value,
        });
        export const BindEmpty = (): DataBindBy => ({ type: 'empty' });
```

使用示例：

```typescript {7,8,9,10}
        const [setRiveRef, riveRef] = useRive();

        return (
            <Rive
                ref={setRiveRef}
                autoplay={true}
                dataBinding={AutoBind(true)} // 默认: `AutoBind(false)`
                // dataBinding={BindByIndex(0)}
                // dataBinding={BindByName('SomeName')}
                // dataBinding={BindEmpty()}
                stateMachineName={'State Machine 1'}
                resourceName={'rewards'}
            />
        );
```

您可以通过向 Rive 组件传递 `onError={(riveError: RNRiveError)` 属性来监听错误。
`riveError` 对象包含错误类型和消息，您可以过滤 `RNRiveErrorType.DataBindingError`：

```typescript
        onError={(riveError: RNRiveError) => {
            switch (riveError.type) {
                case RNRiveErrorType.DataBindingError: {
                console.error(`${riveError.message}`);
                return;
                }
                default:
                console.error('Unhandled error');
                return;
            }
        }}
```

然后可以将创建的实例分配给状态机或画板。这会建立在编辑时设置的绑定。

首选分配给状态机，因为这也会自动将实例应用于画板。只有在不使用状态机时（即您的文件是静态的或使用线性动画）才分配给画板。

::: info
直到状态机或画板推进（advances）之前，实例的初始值不会应用于其绑定的元素。
:::

### Web

```typescript
    const rive = new rive.Rive({
        autoBind: false, // 这应该设置为 false (默认)
        onLoad: () => {
            const vm = rive.viewModelByName("My View Model");
            const vmi = vm.instanceByName("My Instance");

            // 通过将实例应用于状态机和画板手动绑定
            rive.bindViewModelInstance(vmi);
        }
    });
```

### React

对于 React，不需要额外的步骤来将视图模型实例绑定到 Rive 组件。将 `rive` 对象传递给 `useViewModelInstance` 会自动处理这一点。

### Apple

```swift
    let riveViewModel = RiveViewModel(...)
    let artboard = riveViewModel.riveModel!.artboard,
    let instance = riveViewModel.riveModel!.riveFile.defaultViewModel(for: artboard).createDefaultInstance()!

    // 将实例应用于状态机（首选）
    // 应用于状态机会自动绑定到其画板
    riveViewModel.riveModel!.stateMachine.bind(instance)

    // 或者，将实例应用于画板
    artboard.bind(viewModelInstance: instance)
```

### Android

```kotlin
    view.setRiveResource(
        R.raw.my_rive_file,
        artboardName = "My Artboard",
    )

    val vm = view.controller.file?.getViewModelByName("My View Model")!!
    val vmi = vm.createInstanceFromName("My Instance")

    // 将实例应用于状态机（首选）
    view.controller.stateMachines.first().viewModelInstance = vmi

    // 或者，将实例应用于画板
    view.controller.activeArtboard?.viewModelInstance = vmi
```

### Flutter

如果您使用的是 `RiveWidgetController`，当您调用以下任何内容时，绑定会自动发生：

```dart
    viewModelInstance = controller.dataBind(DataBind.auto());
    viewModelInstance = controller.dataBind(DataBind.byName('My View Model'));
    viewModelInstance = controller.dataBind(DataBind.byIndex(0));
    viewModelInstnace = controller.dataBind(someViewModelInstance);
```

否则，您需要确保将视图模型实例绑定到状态机或画板。

```dart
    final file = await File.asset(
    'assets/my_file.riv',
    riveFactory: Factory.rive,
    );

    final artboard = file!.defaultArtboard();
    final stateMachine = artboard!.defaultStateMachine()!;

    final vm = file.defaultArtboardViewModel(artboard)!;
    final vmi = vm.createDefaultInstance()!;

    // 绑定到状态机。这也会自动绑定到画板。
    stateMachine.bindViewModelInstance(vmi);

    // 如果您不使用状态机，请绑定到画板
    artboard.bindViewModelInstance(vmi);
```

### Unity

```csharp
    // 访问 RiveWidget 组件

    // 使用 Unity Inspector
    // 1. 在 Inspector 中由于您的 RiveWidget
    // 2. 在 "Data" 部分，设置 Data Binding Mode：
    //    - Auto Bind Default：自动绑定默认视图模型实例
    //    - Auto Bind Selected：使用您在下拉列表中选择的特定实例
    //    - Manual：需要您在代码中手动设置绑定

    // 或者如果设置为 Manual 或使用低级 API，则以编程方式设置
    private void OnEnable()
    {
        riveWidget.OnWidgetStatusChanged += HandleWidgetStatusChanged;
    }

    private void OnDisable()
    {
        riveWidget.OnWidgetStatusChanged -= HandleWidgetStatusChanged;
    }

    private void HandleWidgetStatusChanged()
    {
        if (riveWidget.Status == WidgetStatus.Loaded)
        {
            ViewModel vm = riveWidget.Artboard.DefaultViewModel;
            ViewModelInstance vmi = vm.CreateDefaultInstance();

            // 应用于状态机会自动绑定到其画板
            riveWidget.StateMachine.BindViewModelInstance(vmi);
        }
    }
```

### React Native

### 新版运行时 (推荐)

对于 React Native，不需要额外的步骤来将视图模型实例绑定到 Rive 组件。将实例传递给 `RiveView` 上的 `dataBind` 属性：

```tsx
        import { RiveView, useRiveFile, useViewModelInstance } from '@rive-app/react-native';

        const { riveFile } = useRiveFile(require('./my_file.riv'));
        const instance = useViewModelInstance(riveFile);

        return (
            <RiveView
                file={riveFile}
                dataBind={instance}
            />
        );
```

### 旧版运行时

对于 React Native，不需要额外的步骤来将视图模型实例绑定到 Rive 组件。`dataBinding` 属性会自动处理这一点。

### 自动绑定 (Auto-Binding)

或者，您可能更喜欢使用自动绑定。这将自动将画板的默认视图模型的默认实例绑定到状态机和画板。默认视图模型是在编辑器画板下拉列表中选择的模型。默认实例是在编辑器中标记为 "Default" 的实例。

### Web

```typescript {4}
    const rive = new rive.Rive({
        src: "my_rive_file.riv",
        canvas: document.getElementById("canvas"),
        autoBind: true,
        onLoad: () => {
            // 访问自动绑定的当前实例
            let boundInstance = rive.viewModelInstance;
        }
    });
```

### React

```typescript
    const { rive, RiveComponent } = useRive({
        src: 'your_file.riv',
        artboard: 'MyArtboard',
        stateMachine: 'MyStateMachine',
        autoBind: true, // 启用自动绑定
        // ... 其他选项
    });

    // 加载完成后，实例即可用：
    const boundInstance = rive?.viewModelInstance;
```

### Apple

```swift
    let riveViewModel = RiveViewModel(...)
    riveViewModel.riveModel?.enableAutoBind { instance in
        // 存储对 `instance` 的引用以便稍后访问属性
        // 实例可能会随着状态机和画板的变化而变化
    }

    // 如果你想在启用后禁用 autoBind…
    riveViewModel.riveModel!.disableAutoBind()
```

### Android

```kotlin {3}
    view.setRiveResource(
        R.raw.my_rive_file,
        autoBind = true,
    )
```

### Flutter

```dart
    // 获取文件引用
    file = await File.asset(
        'assets/rewards.riv',
        riveFactory: Factory.rive,
    );

    // 创建控制器
    controller = RiveWidgetController(file!);

    // 自动数据绑定
    viewModelInstance = controller.dataBind(DataBind.auto());

    // 不再需要时释放您创建的对象
    viewModelInstance.dispose();
    controller.dispose();
    file.dispose();
```

### Unity

**Rive Widget** 提供了视觉化和编程两种方式来配置自动绑定。在 Inspector 中，通过 Data Binding Mode 下拉列表可以轻松设置绑定：

![Unity Inspector 中的 Data Binding Mode 下拉列表，显示自动绑定选项](/images/unity/widget-db-binding-mode-dropdown.jpg)

要以编程方式启用自动绑定，请使用以下 API：

```csharp

    // 在 widget 加载之前：

    // 选项 1：自动绑定默认实例
    riveWidget.BindingMode = DataBindingMode.AutoBindDefault;

    // 选项 2：通过名称自动绑定特定实例
    riveWidget.BindingMode = DataBindingMode.AutoBindSelected;
    riveWidget.ViewModelInstanceName = "My Instance";

    // 设置绑定模式后加载 Rive 文件
    riveWidget.Load(riveFile, artboardName, stateMachineName);

    ...
    // 访问自动绑定的当前实例
    ViewModelInstance boundInstance = riveWidget.StateMachine.ViewModelInstance;
```

### React Native

### 新版运行时 (推荐)

自动绑定通过 `DataBindMode` 枚举提供。您可以将 `DataBindMode.Auto` 传递给 `dataBind` 属性：

```tsx
        import { RiveView, useRiveFile, DataBindMode } from '@rive-app/react-native';

        const { riveFile } = useRiveFile(require('./my_file.riv'));

        return (
            <RiveView
                file={riveFile}
                dataBind={DataBindMode.Auto}
                autoPlay={true}
            />
        );
```

您也可以通过名称绑定：

```tsx
        <RiveView
            file={riveFile}
            dataBind={{ byName: 'My Instance' }}
            autoPlay={true}
        />
```

或绑定特定实例：

```tsx
        const instance = useViewModelInstance(riveFile);
        <RiveView
            file={riveFile}
            dataBind={instance}
            autoPlay={true}
        />
```

### 旧版运行时

`dataBinding` 属性的默认值是 `AutoBind(false)`，意味着自动绑定默认是禁用的。

要启用自动绑定，请将 `dataBinding` 属性设置为 `AutoBind(true)`。

```typescript {7}
        const [setRiveRef, riveRef] = useRive();

        return (
            <Rive
                ref={setRiveRef}
                autoplay={true}
                dataBinding={AutoBind(true)} // 默认: `AutoBind(false)`
                stateMachineName={'State Machine 1'}
                resourceName={'rewards'}
            />
        );
```

# 属性 (Properties)

属性是可以在视图模型实例上读取、设置或观察的值。属性可以是以下类型：

| 类型 | 是否支持 |
| ---------------------- | --------- |
| 浮点数 (Floating point numbers) | ✅ |
| 布尔值 (Booleans) | ✅ |
| 触发器 (Triggers) | ✅ |
| 字符串 (Strings) | ✅ |
| 枚举 (Enumerations) | ✅ |
| 颜色 (Colors) | ✅ |
| 嵌套视图模型 (Nested View Models) | ✅ |
| 列表 (Lists) | ✅ |
| 图像 (Images) | ✅ |
| 画板 (Artboards) | ✅ |

有关版本兼容性的更多信息，请参阅[功能支持 (Feature Support)](/feature-support)页面。

可以在视图模型上检查属性描述符，以在运行时发现哪些属性可用。但这些并不是可变属性本身 —— 同样，可变属性位于实例上。这些描述符具有类型和名称。

### Web

```typescript
    // 视图模型 (ViewModel) 上的属性列表
    const properties = viewModel.properties;
    console.log(properties);
```

### React

```typescript
    // 访问由 useViewModel 返回的视图模型中的属性
    const viewModel = useViewModel(rive);
    console.log(viewModel?.properties);
```

### Apple

```swift
    let riveViewModel = RiveViewModel(...)
    let viewModel = riveViewModel.riveModel!.file.viewModelNamed(...)!
    for property in viewModel.properties {
        print(property.type) // 字符串，数字，布尔值等
        print(property.name) // 视图模型中属性的名称
    }
```

### Android

```kotlin
    val vm = view.controller.file?.getViewModelByName("My View Model")!!

    // 属性列表
    val properties = vm.properties
    assertContains(
        properties,
        ViewModel.Property(ViewModel.PropertyDataType.NUMBER, "My Number Property")
    )
```

### Flutter

```dart
    // 在 ViewModel 对象上访问
    print("Properties: ${viewModel.properties}");

    // 在 ViewModelInstance 对象上访问
    print("Properties: ${viewModelInstance.properties}");
```

### Unity

```csharp
    var vm = riveWidget.File.GetViewModelByName("My View Model");

    // 属性列表
    var properties = vm.Properties;
    foreach (var prop in properties)
    {
        Debug.Log($"Property: {prop.Name}, Type: {prop.Type}");
    }
```

### React Native

### 新版运行时 (推荐)

::: info
即将推出
:::

### 旧版运行时

::: warning
旧版运行时不支持属性 API。
:::

可以通过名称或路径检索对这些属性的引用。

某些属性是可变的，并且具有针对其值的 getter、setter 和观察者操作。获取或观察值将检索在该属性绑定上设置的最新值（截至上次状态机或画板推进）。设置值将更新该值及其所有绑定元素。

::: info
设置属性值后，直到状态机或画板推进（advances）之前，更改不会应用于其绑定的元素。
:::

### Web

```typescript
    const rive = new rive.Rive({
        autoBind: true,
        onLoad: () => {
            // 访问自动绑定的当前实例
            let vmi = rive.viewModelInstance;

            // 布尔值
            const booleanProperty = vmi.boolean("My Boolean Property");
            const booleanValue = booleanProperty.value;
            booleanProperty.value = true;

            // 字符串
            const stringProperty = vmi.string("My String Property");
            const stringValue = stringProperty.value;
            stringProperty.value = "Hello, Rive!";

            // 数字
            const numberProperty = vmi.number("My Number Property");
            const numberValue = numberProperty.value;
            numberProperty.value = 10;

            // 颜色
            const colorProperty = vmi.color("My Color Property");
            const colorValue = colorProperty.value;
            colorProperty.value = 0xFF000000; // 设置颜色为黑色，100% 不透明度

            // 设置颜色的其他方式
            colorProperty.rgb(255, 0, 0); // 设置 RGB 为红色
            colorProperty.rbga(255, 0, 0, 128); // 设置 RGBA 为红色，50% 不透明度
            colorProperty.argba(128, 255, 0, 0); // 设置 RGBA 为红色，50% 不透明度
            colorProperty.opacity(0.5); // 设置不透明度为 50%

            // 触发器
            const triggerProperty = vmi.trigger("My Trigger Property");
            triggerProperty.trigger();

            // 枚举
            const enumProperty = vmi.enum("My Enum Property");
            const enumValue = enumProperty.value;
            enumProperty.value = "Option1";
        }
    });
```

### React

使用特定属性类型的 hook 来获取和设置属性值。

- `useViewModelInstanceBoolean`：读/写布尔属性
- `useViewModelInstanceString`：读/写字符串属性
- `useViewModelInstanceNumber`：读/写数字属性
- `useViewModelInstanceColor`：读/写颜色属性，带额外的 RGB/alpha 方法
- `useViewModelInstanceEnum`：读/写带可用值的枚举属性
- `useViewModelInstanceTrigger`：带有可选回调的触发器事件

这些 hook 返回当前 `value` 和一个更新函数（`setValue`、`setRgb`、`trigger`）。如果未找到属性或为 hook 提供了无效的 viewModelInstance，则 `value` 将为 null。

```typescript
    import {
        useViewModelInstanceBoolean,
        useViewModelInstanceString,
        useViewModelInstanceNumber,
        useViewModelInstanceEnum,
        useViewModelInstanceColor,
        useViewModelInstanceTrigger
    } from '@rive-app/react-webgl2';

    // 假设 viewModelInstance 是通过 useViewModelInstance 或 rive.viewModelInstance 获取的

    // 布尔值
    const { value: isActive, setValue: setIsActive } = useViewModelInstanceBoolean(
        'isToggleOn', // 属性路径
        viewModelInstance
    );
    // 设置: setIsActive(true);

    // 字符串
    const { value: userName, setValue: setUserName } = useViewModelInstanceString(
        'user/name', // 属性路径
        viewModelInstance
    );
    // 设置: setUserName('Rive');

    // 数字
    const { value: score, setValue: setScore } = useViewModelInstanceNumber(
        'levelScore', // 属性路径
        viewModelInstance
    );
    // 设置: setScore(100);

    // 枚举
    const { value: status, setValue: setStatus, values: statusOptions } = useViewModelInstanceEnum(
        'appStatus', // 属性路径
        viewModelInstance
    );
    // 设置: setStatus('loading');
    // 获取可用选项: statusOptions 是一个数组，例如 ['idle', 'loading', 'error']

    // 颜色
    const {
        value: themeColor, // 原始数字值，例如 -3267805
        setRgb: setThemeColorRgb, // 设置 RGB 组件 (0-255 值)
        setAlpha: setThemeColorAlpha, // 设置 alpha 组件 (0-255)
        setOpacity: setThemeColorOpacity, // 设置不透明度 (0.0-1.0)
        setRgba: setThemeColorRgba, // 一次性设置所有组件
        setValue: setThemeColorValue // 设置原始颜色值
    } = useViewModelInstanceColor(
        'ui/themeColor', // 属性路径
        viewModelInstance
    );
    // 设置 RGB: setThemeColorRgb(0, 128, 255); // 设置为蓝色
    // 设置 Alpha: setThemeColorAlpha(128); // 设置为 50% 不透明度
    // 设置不透明度: setThemeColorOpacity(0.5); // 设置为 50% 不透明度
    // 设置 RGBA: setThemeColorRgba(0, 128, 255, 255); // 100% 不透明度的蓝色
    // 设置原始值: setThemeColorValue(-3267805); // 使用原始颜色值设置

    // 触发器（无 value，仅有一个 trigger 函数）
    const { trigger: playEffect } = useViewModelInstanceTrigger(
        'playButtonEffect', // 属性路径
        viewModelInstance,
        {
            // 当触发器被触发时调用的可选回调
            onTrigger: () => {
                console.log('触发器已启动 (Trigger Fired!)');
            }
        }
    );
    // 触发: playEffect();
```

### Apple

```swift
    let riveViewModel = RiveViewModel(...)

    var viewModelInstance: RiveDataBindingViewModel.Instance!

    // 您可以在启用自动绑定时获取视图模型实例
    riveViewModel.riveModel?.enableAutoBind { instance in
        // 存储对实例的引用
        viewModelInstance = instance
    }

    // 或者，您可以手动创建视图模型实例
    viewModelInstance = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!.createDefaultInstance()!

    // 字符串
    let stringProperty = instance.stringProperty(fromPath: "...")!
    // 更新它的值
    stringProperty.value = "Hello, Rive"
    // 获取它的值
    print(stringProperty.value)

    // 您也可以在不存储强引用的情况下设置和获取值
    instance.stringProperty(fromPath: "...").value = "Hello again, Rive"

    // 数字
    let numberProperty = instance.numberProperty(fromPath: "...")!
    // 更新它的值
    numberProperty.value = 1337
    // 获取它的值
    print(numberProperty.value)

    // 您也可以在不存储强引用的情况下设置和获取值
    instance.numberProperty(fromPath: "...").value = 1337

    // 布尔值
    let booleanProperty = instance.booleanProperty(fromPath: "...")!
    // 更新它的值
    booleanProperty.value = true
    // 获取它的值
    print(booleanProperty.value)

    // 您也可以在不存储强引用的情况下设置和获取值
    instance.booleanProperty(fromPath: "...").value = true

    // 颜色
    let colorProperty = instance.colorProperty(fromPath: "...")!
    // 更新它的值，它是 UIColor/NSColor，因此所有静态辅助方法都适用。
    colorProperty.value = .red
    // 获取它的值
    print(colorProperty.value)

    // 您也可以在不存储强引用的情况下设置和获取值
    instance.colorProperty(fromPath: "...").value = .red

    // 枚举
    let enumProperty = instance.enumProperty(fromPath: "...")!
    // 更新它的值
    enumProperty.value = "Foo"
    // 获取它的值
    print(enumProperty.value)
    // 打印所有可能的值
    print(enumProperty.values)

    // 您也可以在不存储强引用的情况下设置和获取值
    instance.enumProperty(fromPath: "...").value = "Foo"

    // 触发器 (Trigger)
    let triggerProperty = instance.triggerProperty(fromPath: "...")!
    // 启动触发器
    triggerProperty.trigger()
```

### Android

```kotlin
    val vm = view.controller.file?.getViewModelByName("My View Model")!!
    val vmi = vm.createInstanceFromName("My Instance")

    val numberProperty = vmi.getNumberProperty("My Number Property")
    // 获取
    val numberValue = numberProperty.value
    // 设置
    numberProperty.value = 10f
```

### Flutter

```dart
    // 获取视图模型实例的引用
    final vmi = someExistingViewModelInstance;

    final numberProperty = vmi.number("My Number Property")!;
    // 获取
    final numberValue = numberProperty.value;

    // 设置
    numberProperty.value = 10;

    // 观察 (Observe)
    void onNumberChange(double value) {
        print("数字已更改为: $value");
    }
    numberProperty.addListener(onNumberChange);

    // 完成后移除监听器
    numberProperty.removeListener(onNumberChange);

    // 或者，清除所有监听器
    numberProperty.clearListeners();

    // 当不再使用该属性时，调用 dispose 以释放资源
    // 这将在内部调用 `clearListeners()`。
    numberProperty.dispose();
```

### Unity

```csharp
    private void OnEnable()
    {
        riveWidget.OnWidgetStatusChanged += HandleWidgetStatusChanged;
    }

    private void OnDisable()
    {
        riveWidget.OnWidgetStatusChanged -= HandleWidgetStatusChanged;
    }

    private void HandleWidgetStatusChanged()
    {
        // 在访问视图模型实例之前检查 widget 是否已加载
        if (riveWidget.Status == WidgetStatus.Loaded)
        {
            ViewModelInstance viewModelInstance = riveWidget.StateMachine.ViewModelInstance;

         //==========================================================================
        // 字符串属性 (STRING PROPERTIES)
        //==========================================================================
            ViewModelInstanceStringProperty stringProperty = viewModelInstance.GetStringProperty("title");
            Debug.Log($"字符串值: {stringProperty.Value}");
            stringProperty.Value = "New Text";

        //==========================================================================
        // 数字属性 (NUMBER PROPERTIES)
        //==========================================================================
            ViewModelInstanceNumberProperty numberProperty = viewModelInstance.GetNumberProperty("count");
            Debug.Log($"数字值: {numberProperty.Value}");
            numberProperty.Value = 42.5f;

        //==========================================================================
        // 布尔属性 (BOOLEAN PROPERTIES)
        //==========================================================================
            ViewModelInstanceBooleanProperty boolProperty = viewModelInstance.GetBooleanProperty("isActive");
            Debug.Log($"布尔值: {boolProperty.Value}");
            boolProperty.Value = true;

        //==========================================================================
        // 颜色属性 (COLOR PROPERTIES)
        //==========================================================================
            ViewModelInstanceColorProperty colorProperty = viewModelInstance.GetColorProperty("backgroundColor");
            // 使用 Unity Color (float 值范围 0-1)
            Color currentColor = colorProperty.Value;
            colorProperty.Value = new UnityEngine.Color(1, 0, 0, 1); // 红色
            // 或使用 Color32 (byte 值范围 0-255)
            Color32 currentColor32 = colorProperty.Value32;
            colorProperty.Value32 = new Color32(0, 255, 0, 255); // 绿色

        //==========================================================================
        // 枚举属性 (ENUM PROPERTIES)
        //==========================================================================
            ViewModelInstanceEnumProperty enumProperty = viewModelInstance.GetEnumProperty("category");
            Debug.Log($"枚举当前值: {enumProperty.Value}");
            Debug.Log($"枚举可用值: {string.Join(", ", enumProperty.EnumValues)}");
            enumProperty.Value = "option_name";

        //==========================================================================
        // 触发器属性 (TRIGGER PROPERTIES)
        //==========================================================================
            ViewModelInstanceTriggerProperty triggerProperty = viewModelInstance.GetTriggerProperty("onSubmit");
            triggerProperty.Trigger(); // 启动触发器
        }
    }
```

### React Native

### 新版运行时 (推荐)

使用每种属性类型特定的 hook 来获取和设置属性值：

- `useRiveBoolean`：读/写布尔属性
- `useRiveString`：读/写字符串属性
- `useRiveNumber`：读/写数字属性
- `useRiveColor`：使用十六进制字符串或 RGBA 支持读/写颜色属性
- `useRiveEnum`：读/写枚举属性
- `useRiveTrigger`：带有可选回调的触发器事件

这些 hook 返回当前 `value`、一个设置函数（`setValue` 或 `trigger`），以及在未找到属性时的 `error`。

::: info
`setValue` 函数允许您传递一个接收前一个值的函数，类似于 React 的 `setState` 模式。当您需要根据当前状态更新值时，这非常有用：
```tsx
          setValue((v) => (v ?? 0) + 5)
```
:::

```tsx
        import {
            useRiveFile,
            useViewModelInstance,
            useRiveBoolean,
            useRiveString,
            useRiveNumber,
            useRiveColor,
            useRiveEnum,
            useRiveTrigger,
            RiveView
        } from '@rive-app/react-native';

        const { riveFile } = useRiveFile(require('./my_file.riv'));
        const instance = useViewModelInstance(riveFile);

        // 布尔值
        const { value: isActive, setValue: setIsActive, error: boolError } = useRiveBoolean(
            'isToggleOn',
            instance
        );
        // 设置: setIsActive(true);

        // 字符串
        const { value: userName, setValue: setUserName, error: stringError } = useRiveString(
            'user/name',
            instance
        );
        // 设置: setUserName('Rive');

        // 数字
        const { value: score, setValue: setScore, error: numberError } = useRiveNumber(
            'levelScore',
            instance
        );
        // 设置: setScore(100);

        // 颜色 (接受十六进制字符串或 RiveColor 对象)
        const { value: themeColor, setValue: setThemeColor, error: colorError } = useRiveColor(
            'ui/themeColor',
            instance
        );
        // 设置: setThemeColor('#FF0000FF'); // 十六进制字符串
        // 或者: setThemeColor({ r: 255, g: 0, b: 0, a: 255 }); // RGBA 对象

        // 枚举
        const { value: status, setValue: setStatus, error: enumError } = useRiveEnum(
            'appStatus',
            instance
        );
        // 设置: setStatus('loading');

        // 触发器（无 value，仅有一个 trigger 函数）
        const { trigger: playEffect, error: triggerError } = useRiveTrigger(
            'playButtonEffect',
            instance,
            {
                // 当触发器被触发时调用的可选回调
                onTrigger: () => {
                    console.log('触发器已启动 (Trigger Fired!)');
                }
            }
        );
        // 触发: playEffect();

        return (
            <RiveView
                file={riveFile}
                dataBind={instance}
                autoPlay={true}
            />
        );
```

当 Rive 图形中的属性发生变化时，每个 hook 返回的 `value` 将自动更新。

### 旧版运行时

在 `RiveRef` 对象上暴露了以下数据绑定方法。

```typescript
        setBoolean: (path: string, value: boolean) => void;
        setString: (path: string, value: string) => void;
        setNumber: (path: string, value: number) => void;
        setColor: (path: string, color: RiveRGBA | string) => void;
        setEnum: (path: string, value: string) => void;
        trigger: (path: string) => void;
```

::: info
颜色属性可以使用 `RiveRGBA` 对象或十六进制字符串进行设置。十六进制字符串的格式应为 `#RRGGBBAA`，其中 `RR`、`GG`、`BB` 和 `AA` 是分别代表红色、绿色、蓝色和 alpha 通道的两位十六进制值。
```js
          type RiveRGBA = { r: number; g: number; b: number; a: number };
```
:::

使用示例：

```typescript
        const [setRiveRef, riveRef] = useRive();
        const setBoolean = () => {
            if (riveRef) {
                riveRef.setBoolean('My Boolean Property', true);
            }
        };
        const setString = () => {
            if (riveRef) {
                riveRef.current.setString('My String Property', 'Hello, Rive');
            }
        };
        const setNumber = () => {
            if (riveRef) {
                riveRef.current.setNumber('My Number Property', 10);
            }
        };
        const setColor = () => {
            if (riveRef) {
                riveRef.setColor('My Color Property', { r: 255, g: 0, b: 0, a: 1 });
                // 或
                riveRef.setColor('My Color Property', '#00FF00FF');
            }
        };
        const setEnum = () => {
            if (riveRef) {
                riveRef.setEnum('My Enum Property', 'Option 1');
            }
        };
        const trigger = () => {
            if (riveRef) {
                riveRef.trigger('My Trigger Property');
            }
        };
```

### 嵌套属性路径 (Nested Property Paths)

视图模型可以拥有视图模型类型的属性，从而允许任意层级的嵌套。您可以从根开始在每个实例上链式调用属性，直到到达感兴趣的属性。或者，您也可以通过路径参数（path parameter）执行此操作，这类似于 URI，是一个以正斜杠分隔的属性名称列表，最后以感兴趣的属性名称结尾。

### Web

```typescript
    const rive = new rive.Rive({
        autoBind: true,
        onLoad: () => {
            // 访问自动绑定的当前实例
            let vmi = rive.viewModelInstance;

            const nestedNumberByChain = vmi
                .viewModel("My Nested View Model")
                .viewModel("My Second Nested VM")
                .number("My Nested Number");

            const nestedNumberByPath = vmi.number("My Nested View Model/My Second Nested VM/My Nested Number");
        }
    });
```

### React

通过将完整路径（以 `/` 分隔）作为属性 hook 的第一个参数来访问嵌套属性。

```typescript
    import { useViewModelInstanceString, useViewModelInstanceNumber } from '@rive-app/react-webgl2';

    // 访问 'settings/theme/name' (String)
    const { value: themeName, setValue: setThemeName } = useViewModelInstanceString(
        'settings/theme/name',
        viewModelInstance
    );

    // 访问 'settings/volume' (Number)
    const { value: volume, setValue: setVolume } = useViewModelInstanceNumber(
        'settings/volume',
        viewModelInstance
    );

    console.log('当前主题:', themeName);
    // setThemeName('Dark Mode');
    // setVolume(80);
```

### Apple

```swift
    let riveViewModel = RiveViewModel(...)

    var viewModelInstance: RiveDataBindingViewModel.Instance!

    // 您可以在启用自动绑定时获取视图模型实例
    riveViewModel.riveModel?.enableAutoBind { instance in
        // 存储对实例的引用
        viewModelInstance = instance
    }

    // 或者，您可以手动创建视图模型实例
    viewModelInstance = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!.createDefaultInstance()!

    let nestedNumberByChain = instance
                                .viewModelInstanceProperty(fromPath: "Nested View Model")
                                .viewModelInstanceProperty(fromPath: "Another Nested View Model")
                                .numberProperty(fromPath: "Number")

    let nestedNumberByPath = instance.numberProperty(fromPath: "Nested View Model/Another Nested View Model/Number")
```

### Android

```kotlin
    val vm = view.controller.file?.getViewModelByName("My View Model")!!
    val vmi = vm.createInstanceFromName("My Instance")

    val nestedNumberByChain = vmi
        .getInstanceProperty("My Nested View Model")
        .getInstanceProperty("My Second Nested VM")
        .getNumberProperty("My Nested Number")

    val nestedNumberByPath = vmi
        .getNumberProperty("My Nested View Model/My Second Nested VM/My Nested Number")
```

### Flutter

```dart
    // 获取视图模型实例的引用
    final vmi = someExistingViewModelInstance;

    final nestedNumberByChain = vmi
        .viewModel("My Nested View Model")!
        .viewModel("My Second Nested VM")!
        .number("My Nested Number");

    final nestedNumberByPath = vmi.number("My Nested View Model/My Second Nested VM/My Nested Number");
```

### Unity

```csharp
    if (riveWidget.Status == WidgetStatus.Loaded)
    {
        var viewModelInstance = riveWidget.StateMachine.ViewModelInstance;

        // 使用链式调用访问嵌套视图模型
        var nestedNumberByChain = viewModelInstance
            .GetViewModelInstanceProperty("My Nested View Model")
            .GetViewModelInstanceProperty("My Second Nested VM")
            .GetNumberProperty("My Nested Number");

        // 使用路径表示法访问嵌套属性
        var nestedNumberByPath = viewModelInstance
            .GetNumberProperty("My Nested View Model/My Second Nested VM/My Nested Number");

    }
```

### React Native

### 新版运行时 (推荐)

通过将完整路径（以 `/` 分隔）作为属性 hook 的第一个参数来访问嵌套属性。

```tsx
        import { useRiveString, useRiveNumber, useRiveFile, useViewModelInstance } from '@rive-app/react-native';

        const { riveFile } = useRiveFile(require('./my_file.riv'));
        const instance = useViewModelInstance(riveFile);

        // 访问 'settings/theme/name' (String)
        const { value: themeName, setValue: setThemeName } = useRiveString(
            'settings/theme/name',
            instance
        );

        // 访问 'settings/volume' (Number)
        const { value: volume, setValue: setVolume } = useRiveNumber(
            'settings/volume',
            instance
        );

        console.log('当前主题:', themeName);
        // setThemeName('Dark Mode');
        // setVolume(80);
```

::: info
Rive React Native 运行时目前还不支持直接访问 ViewModel 属性以使用链式表示法。
:::

### 旧版运行时

::: warning
Rive React Native 运行时不支持使用链式表示法访问嵌套属性，但您可以使用路径表示法访问嵌套属性。
:::

```js
        const [setRiveRef, riveRef] = useRive();
        const nestedNumberByPath = useRiveNumber(riveRef, 'My Nested View Model/My Second Nested VM/My Nested Number');
        useEffect(() => {
            if (nestedNumberByPath) {
                nestedNumberByPath.setValue(10);
            }
        }, [nestedNumberByPath]);
```

### 可观察性 (Observability)

您可以通过使用监听器或平台等效方法来观察属性值随时间的变化。一旦被观察，当通过状态机推进应用属性更改时，无论是显式设置的新值，还是由于绑定而更新的值，您都将收到通知。与 [Rive 事件 (Rive Events)](/runtimes/rive-events) 相比，观察触发器属性是接收编辑器事件的另一种方法。

### Web

通过调用属性上的 `on` 方法来为属性添加观察者。

```typescript
    public on(callback: EventCallback)
```

可以通过调用属性上的 `off` 方法并传递回调函数来移除观察者。或者，您可以调用不带任何参数的 `off()` 来移除所有观察者。

```typescript
    public off(callback?: EventCallback)
```

示例：

```typescript
    const rive = new rive.Rive({
        autoBind: true,
        onLoad: () => {
            // 访问自动绑定的当前实例
            let vmi = rive.viewModelInstance;
            const numberProperty = vmi.number("My Number Property");
            // 观察
            numberProperty.on((event) => {
                console.log(event.data);
            });
            // 完成后移除所有监听器
            numberProperty.off();
        }
    });
```

### React

React hook 会自动处理可观察性。当 Rive 实例中的属性值发生变化（无论是您通过 hook 设置的还是由于内部绑定导致的），相应 hook（例如 `useViewModelInstanceString`）返回的 `value` 都会更新。此状态更改会触发 React 组件的重新渲染，从而允许您对新值做出反应。

对于触发器，您可以直接向 `useViewModelInstanceTrigger` hook 提供 `onTrigger` 回调，该回调在 Rive 实例中激活触发器时触发。

```typescript
    import { useViewModelInstanceTrigger } from '@rive-app/react-webgl2';

    // 假设 viewModelInstance 可用
    const { trigger } = useViewModelInstanceTrigger(
        'showPopup',
        viewModelInstance,
        {
            onTrigger: () => {
                console.log('显示弹窗触发器已启动 (Show Popup Trigger Fired!)');
                // 显示您的弹窗 UI
            }
        }
    );
```

### Apple

```swift
    let riveViewModel = RiveViewModel(...)

    var viewModelInstance: RiveDataBindingViewModel.Instance!

    // 您可以在启用自动绑定时获取视图模型实例
    riveViewModel.riveModel?.enableAutoBind { instance in
        // 存储对实例的引用
        viewModelInstance = instance
    }

    // 或者，您可以手动创建视图模型实例
    viewModelInstance = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!.createDefaultInstance()!

    // 获取字符串属性
    let stringProperty = instance.stringProperty(fromPath: "...")!

    // 添加监听器
    let listener = stringProperty.addListener { newValue in
        print(newValue)
    }

    // 移除监听器，其中 listener 是 addListener 的返回值
    stringProperty.removeListener(listener)

    // 触发器属性也可以监听它们何时被触发
    instance.triggerProperty(fromPath: "...")!.addListener {
        print("已触发 (Triggered!)")
    }
```

### Android

```kotlin
    val vm = view.controller.file?.getViewModelByName("My View Model")!!
    val vmi = vm.createInstanceFromName("My Instance")

    val numberProperty = vmi.getNumberProperty("My Number Property")
    // 观察
    lifecycleScope.launch {
        numberProperty.valueFlow.collect { value ->
            Log.i("MyActivity", "值: $value")
        }
    }
    // 或在 Compose 中收集
    val numberValue by numberProperty.valueFlow.collectAsState()
```

### Flutter

```dart
    // 获取视图模型实例的引用
    final vmi = someExistingViewModelInstance;

    final numberProperty = vmi.number("My Number Property")!;
    // 获取
    final numberValue = numberProperty.value;

    // 设置
    numberProperty.value = 10;

    // 观察
    void onNumberChange(double value) {
        print("数字已更改为: $value");
    }
    numberProperty.addListener(onNumberChange);

    // 完成后移除监听器
    numberProperty.removeListener(onNumberChange);

    // 或者，清除所有监听器
    numberProperty.clearListeners();

    // 当不再使用该属性时，调用 dispose 以释放资源
    // 这将在内部调用 `clearListeners()`。
    numberProperty.dispose();
```

### Unity

```csharp
    private ViewModelInstanceNumberProperty numberProperty;
    private ViewModelInstanceStringProperty stringProperty;
    private ViewModelInstanceBooleanProperty boolProperty;
    private ViewModelInstanceColorProperty colorProperty;
    private ViewModelInstanceEnumProperty enumProperty;
    private ViewModelInstanceTriggerProperty triggerProperty;

    private void OnEnable()
    {
        riveWidget.OnWidgetStatusChanged += HandleWidgetStatusChanged;
    }

    private void OnDisable()
    {
        riveWidget.OnWidgetStatusChanged -= HandleWidgetStatusChanged;
    }

    private void HandleWidgetStatusChanged()
    {
        if (riveWidget.Status == WidgetStatus.Loaded)
        {
            ViewModelInstance viewModelInstance = riveWidget.StateMachine.ViewModelInstance;

            // 为属性添加监听器
            numberProperty = viewModelInstance.GetNumberProperty("count");
            numberProperty.OnValueChanged += OnNumberPropertyChanged;

            stringProperty = viewModelInstance.GetStringProperty("title");
            stringProperty.OnValueChanged += OnStringPropertyChanged;

            boolProperty = viewModelInstance.GetBooleanProperty("isActive");
            boolProperty.OnValueChanged += OnBoolPropertyChanged;

            colorProperty = viewModelInstance.GetColorProperty("backgroundColor");
            colorProperty.OnValueChanged += OnColorPropertyChanged;

            enumProperty = viewModelInstance.GetEnumProperty("category");
            enumProperty.OnValueChanged += OnEnumPropertyChanged;

            triggerProperty = viewModelInstance.GetTriggerProperty("onSubmit");
            triggerProperty.OnTriggered += OnTriggerPropertyFired;

        }
    }

    private void OnNumberPropertyChanged(float newValue)
    {
        Debug.Log($"数字已更改为: {newValue}");
    }

    private void OnStringPropertyChanged(string newValue)
    {
        Debug.Log($"字符串已更改为: {newValue}");
    }

    private void OnBoolPropertyChanged(bool newValue)
    {
        Debug.Log($"布尔值已更改为: {newValue}");
    }

    private void OnColorPropertyChanged(UnityEngine.Color newValue)
    {
        Debug.Log($"颜色已更改为: {ColorUtility.ToHtmlStringRGBA(newValue)}");
    }

    private void OnEnumPropertyChanged(string newValue)
    {
        Debug.Log($"枚举已更改为: {newValue}");
    }

    private void OnTriggerPropertyFired()
    {
        Debug.Log("触发器已启动!");
    }

    private void OnDestroy()
    {
        // 您应该在不再需要时移除监听器
        numberProperty.OnValueChanged -= OnNumberPropertyChanged;
        stringProperty.OnValueChanged -= OnStringPropertyChanged;
        boolProperty.OnValueChanged -= OnBoolPropertyChanged;
        colorProperty.OnValueChanged -= OnColorPropertyChanged;
        enumProperty.OnValueChanged -= OnEnumPropertyChanged;
        triggerProperty.OnTriggered -= OnTriggerPropertyFired;
    }
```

### React Native

### 新版运行时 (推荐)

值通过 hook 自动观察。当 Rive 实例中的属性值发生变化（无论是您通过 hook 设置的还是由于内部绑定导致的），相应 hook 返回的 `value` 都会更新。此时的状态更改会触发 React 组件的重新渲染，从而允许您对新值做出反应。

对于触发器，您可以直接向 `useRiveTrigger` hook 提供 `onTrigger` 回调，该回调在 Rive 实例中激活触发器时触发。

```tsx
        import {
            useRiveFile,
            useViewModelInstance,
            useRiveBoolean,
            useRiveString,
            useRiveNumber,
            useRiveColor,
            useRiveEnum,
            useRiveTrigger,
            useEffect
        } from '@rive-app/react-native';

        const { riveFile } = useRiveFile(require('./my_file.riv'));
        const instance = useViewModelInstance(riveFile);

        const { value: boolValue, setValue: setBoolValue } = useRiveBoolean('My Boolean Property', instance);
        const { value: stringValue, setValue: setStringValue } = useRiveString('My String Property', instance);
        const { value: numberValue, setValue: setNumberValue } = useRiveNumber('My Number Property', instance);
        const { value: colorValue, setValue: setColorValue } = useRiveColor('My Color Property', instance);
        const { value: enumValue, setValue: setEnumValue } = useRiveEnum('My Enum Property', instance);
        const { trigger: triggerButton } = useRiveTrigger('My Trigger Property', instance, {
            onTrigger: () => {
                console.log('触发器已启动');
            }
        });

        useEffect(() => {
            if (numberValue !== undefined) {
                console.log('numberValue 发生变化:', numberValue);
            }
        }, [numberValue]);

        const handleButtonPress = () => {
            triggerButton();
        };
```

::: info
`useRiveTrigger` hook 返回一个可以被调用以启动触发器的 `trigger` 函数。此 hook 的第三个参数接受一个可选的 `onTrigger` 回调，该回调在触发器启动时执行。
:::

### 旧版运行时

通过 hook 观察值。

```typescript
        const [setRiveRef, riveRef] = useRive();
        const [boolValue, setBoolValue] = useRiveBoolean(riveRef, 'My Boolean Property');
        const [stringValue, setStringValue] = useRiveString(riveRef, 'My String Property');
        const [numberValue, setNumberValue] = useRiveNumber(riveRef, 'My Number Property');
        const [colorValue, setColorValue] = useRiveColor(riveRef, 'My Color Property');
        const [enumValue, setEnumValue] = useRiveEnum(riveRef, 'My Enum Property');
        const triggerButton = useRiveTrigger(riveRef, 'My Trigger Property', () => {
            console.log('触发器已启动');
        });

        useEffect(() => {
            if (numberValue !== undefined) {
                console.log('numberValue 发生变化:', numberValue);
            }
        }, [numberValue]);

        const handleButtonPress = () => {
            if (triggerButton) {
                triggerButton();
            }
        };
```

::: info
`useRiveTrigger` hook 不返回值，而是将其第三个参数作为回调函数。当触发器启动时，将执行此回调。
:::
### 图像 (Images)

图像属性允许您在运行时设置和替换 Rive 动画中的位图图像。

### Web

```typescript
    const randomImageAsset = (imageProperty) => {
        fetch("https://picsum.photos/300/500").then(async (res) => {
            // 从响应中解码图像。此对象用于设置图像属性。
            const image = await rive.decodeImage(
                new Uint8Array(await res.arrayBuffer())
            );
            imageProperty.value = image;
            // Rive 会自动清理它。但在设置解码图像后，手动调用 dispose 是一个好习惯。
            // 如果您打算再次使用该解码资产，请不要调用 `unref`。
            image.unref();
        });
    };

    const rive = new rive.Rive({
        autoBind: true,
        onLoad: () => {
            // 访问自动绑定的当前实例
            let vmi = rive.viewModelInstance;
            // 通过名称获取图像属性
            var imageProperty = vmi.image("bound_image");
            // 加载随机图像
            randomImageAsset(imageProperty);
            // 清除图像以渲染空白
            imageProperty.value = null;
        }
    });
```

### React

使用 `useViewModelInstanceImage` 来获取图像属性设置函数。

```typescript
    import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceImage } from '@rive-app/react-webgl2';

    const { rive, RiveComponent } = useRive({
        src: 'your_file.riv',
        artboard: 'MyArtboard',
        stateMachine: 'MyStateMachine',
        autoBind: false,
    });

    const viewModel = useViewModel(rive, { name: 'MyViewModel' });
    const viewModelInstance = useViewModelInstance(viewModel, { rive });

    // 获取图像属性设置函数
    const { setValue: setImage } = useViewModelInstanceImage(
        'profileImage', // 属性路径
        viewModelInstance
    );

    // 加载并设置随机图像
    const loadRandomImage = async () => {
        if (!setImage) return;
        try {
            const imageUrl = 'https://picsum.photos/300/500';
            const response = await fetch(imageUrl);
            const imageBuffer = await response.arrayBuffer();

            // 从响应中解码图像
            const decodedImage = await decodeImage(new Uint8Array(imageBuffer));
            setImage(decodedImage);

            // 清理解码图像
            decodedImage.unref();
        } catch (error) {
            console.error('加载图像失败:', error);
        }
    };

    // 清除图像
    const clearImage = () => {
        if (setImage) {
            setImage(null);
        }
    };
```

### Apple

```swift
    let riveViewModel = RiveViewModel(...)

    var viewModelInstance: RiveDataBindingViewModel.Instance!

    // 您可以在启用自动绑定时获取视图模型实例
    riveViewModel.riveModel?.enableAutoBind { instance in
        // 存储对实例的引用
        viewModelInstance = instance
    }

    // 或者，您可以手动创建视图模型实例
    viewModelInstance = riveViewModel.riveModel!.riveFile.viewModelNamed("...")!.createDefaultInstance()!

    // 从数据创建 RiveRenderImage
    let data = Data(...)
    var image = RiveRenderImage(data: data)! // 如果数据不是有效的图像，这可能返回 nil

    // 或者，从 UIImage 创建 RiveRenderImage
    image = RiveRenderImage(image: UIImage(named: "my_image")!, format: .png)! // 如果图像不是有效的 jpg 或 png，这可能返回 nil

    let imageProperty = viewModelInstance.imageProperty(fromPath: "image")!

    // 一旦有了数据绑定视图模型实例，就可以设置图像属性值
    imageProperty.setValue(image)

    // 您也可以传递 nil 来清除图像
    imageProperty.setValue(nil)
```

### Android

```kotlin
    // 从 assets 文件夹加载图像。
    val imageBytes = context.resources.openRawResource(R.raw.my_image).use { stream -> stream.readBytes() }
    val vmi = it.stateMachines.first().viewModelInstance!!

    // 使用新图像替换视图模型实例中的图像属性。
    val riveImage = RiveRenderImage.fromEncoded(imageBytes)
    vmi.getImageProperty("Image property").set(riveImage)
```

### Flutter

[Flutter 数据绑定图像示例](https://github.com/rive-app/rive-flutter/blob/master/example/lib/examples/databinding_images.dart)

```dart
    // 在 ViewModelInstance 对象上通过路径访问图像属性
    final imageProperty = viewModelInstance.image('my_image')!; // 名称为 "my_image" 的图像属性

    // 创建 RenderImage
    final renderImage = await Factory.rive.decodeImage(bytes); // 如果您使用的是 Flutter 渲染器，请使用 `Factory.flutter`

    // 如果图像有效，更新图像属性值
    if (renderImage != null) {
        imageProperty.value = renderImage;
    }

    // 您也可以将图像属性设置为 null 以清除它
    imageProperty.value = null;
```

### Unity

```csharp
    [SerializeField] private ImageOutOfBandAsset m_lightImageAsset;
    [SerializeField] private ImageOutOfBandAsset m_darkImageAsset;

    private ViewModelInstanceImageProperty imageProperty;
    private bool isDarkMode = false;

    private void OnEnable()
    {
        riveWidget.OnWidgetStatusChanged += HandleWidgetStatusChanged;
    }

    private void OnDisable()
    {
        riveWidget.OnWidgetStatusChanged -= HandleWidgetStatusChanged;
    }

    private void HandleWidgetStatusChanged()
    {
        if (riveWidget.Status == WidgetStatus.Loaded)
        {
            m_lightImageAsset.Load();
            m_darkImageAsset.Load();

            ViewModelInstance viewModelInstance = riveWidget.StateMachine.ViewModelInstance;

            // 通过名称获取图像属性
            imageProperty = viewModelInstance.GetImageProperty("profileImage");
            // 或者：
            // imageProperty = viewModelInstance.GetProperty<ViewModelInstanceImageProperty>("profileImage");

            // 设置更改回调
            imageProperty.OnValueChanged += OnImageChanged;

            // 设置初始图像（浅色模式）
            imageProperty.Value = m_lightImageAsset;
        }
    }

    private void OnImageChanged(ImageOutOfBandAsset newImage)
    {
        Debug.Log("图像已更新!");
    }

    // 在浅色和深色模式图像之间切换的示例方法
    public void ToggleTheme()
    {
        if (imageProperty != null)
        {
            isDarkMode = !isDarkMode;
            imageProperty.Value = isDarkMode ? m_darkImageAsset : m_lightImageAsset;
        }
    }

    // 清除图像的示例方法
    public void ClearImage()
    {
        if (imageProperty != null)
        {
            imageProperty.Value = null;
        }
    }

    private void OnDestroy()
    {
        m_lightImageAsset.Unload();
        m_darkImageAsset.Unload();

        // 移除事件监听器
        if (imageProperty != null)
        {
            imageProperty.OnValueChanged -= OnImageChanged;
        }
    }
```

[Rive Unity 示例库](https://github.com/rive-app/rive-unity-examples)

### React Native

### 新版运行时 (推荐)

```tsx
    import { useRive, useRiveFile, useViewModelInstance, RiveView, RiveImages, type RiveViewRef } from '@rive-app/react-native';
    import { useRef } from 'react';

    const { riveViewRef, setHybridRef } = useRive();
    const { riveFile } = useRiveFile(require('./my_file.riv'));
    const instance = useViewModelInstance(riveFile);

    const handleLoadImage = async () => {
        if (!riveViewRef) return;
        const vmi = riveViewRef.getViewModelInstance();
        if (!vmi) return;

        const imgProp = vmi.imageProperty('imageValue');
        if (!imgProp) return;

        // 从 URL 加载图像
        const riveImage = await RiveImages.loadFromURLAsync(
            'https://picsum.photos/id/372/500/500'
        );
        imgProp.set(riveImage);
        riveViewRef.playIfNeeded();
    };

    return (
        <RiveView
            hybridRef={setHybridRef}
            file={riveFile}
            dataBind={instance}
            autoPlay={true}
        />
    );
```

#### 可观察性 (Observability)

```tsx
    const imgProp = vmi.imageProperty('imageValue');
    if (imgProp) {
        imgProp.addListener(() => {
            console.log('图像属性已更改!');
        });
    }
```

#### RiveImages 静态方法

```typescript
    /**
     * 从捆绑资源加载图像
     * @param resource 资源名称 (例如 "image.png")
     * @returns 一个解析为加载的 RiveImage 的 Promise
     */
    loadFromResourceAsync(resource: string): Promise<RiveImage>;

    /**
     * 从原始字节加载图像
     * @param bytes ArrayBuffer 格式的图像数据
     * @returns 一个解析为加载的 RiveImage 的 Promise
     */
    loadFromBytesAsync(bytes: ArrayBuffer): Promise<RiveImage>;
```

### 旧版运行时

::: warning
Rive React Native 旧版运行时不支持图像数据绑定。
:::

### 列表 (Lists)

[编辑器部分](https://help.rive.app/docs/editor/data-binding/lists)

列表属性允许您管理视图模型实例的动态集合。您可以：
- 添加新的视图模型实例（可选指定索引）
- 移除现有的视图模型实例（可选通过索引）
- 通过索引交换两个视图模型实例
- 获取列表的大小

[数据绑定列表属性](https://help.rive.app/docs/editor/data-binding/lists#view-model-list-property)

### Web

```typescript
    const rive = new rive.Rive({
        autoBind: true,
        onLoad: () => {
            // 访问自动绑定的当前实例
            let vmi = rive.viewModelInstance;
            // 通过名称获取列表属性
            var list = vmi.list("todos");
            console.log("长度: ", list.length);

            // 获取视图模型
            var todoItemVM = riveInstance.viewModelByName("TodoItem");

            // 从视图模型创建一个空白实例。
            // 为要添加的每个新项目执行此操作。
            var myTodo = todoItemVM.instance();
            myTodo.string("description").value = "Buy groceries";

            // 将新创建的实例添加到列表中
            list.addInstance(myTodo);

            // 从列表中移除特定实例
            list.removeInstance(myTodo);

            // 在列表中交换索引 0 和 1 处的两个实例
            list.swap(0, 1);

            // 移除索引 0 处的实例
            list.removeInstanceAt(0);
        }
    });
```

### React

使用 `useViewModelInstanceList` 来获取各种列表操作函数。

```typescript
    import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceList } from '@rive-app/react-webgl2';

    const { rive, RiveComponent } = useRive({
        src: 'your_file.riv',
        artboard: 'MyArtboard',
        stateMachine: 'MyStateMachine',
        autoBind: false,
    });

    const viewModel = useViewModel(rive, { name: 'MyViewModel' });
    const viewModelInstance = useViewModelInstance(viewModel, { rive });

    // 获取带有操作函数的列表属性
    const { length, addInstance, addInstanceAt, removeInstance, removeInstanceAt, getInstanceAt, swap } = useViewModelInstanceList('todos', viewModelInstance);

    // 添加新的待办事项
    const handleAddItem = () => {
        const todoItemViewModel = rive?.viewModelByName?.('TodoItem');
        if (todoItemViewModel) {
            const newTodoItem = todoItemViewModel.instance?.();
            if (newTodoItem) {
                // 设置一些初始值
                newTodoItem.string('description').value = 'Buy groceries';
                addInstance(newTodoItem);
            }
        }
    };

    // 在特定索引处插入项目
    const handleInsertItem = () => {
        const todoItemViewModel = rive?.viewModelByName?.('TodoItem');
        if (todoItemViewModel) {
            const newTodoItem = todoItemViewModel.instance?.();
            if (newTodoItem) {
                addInstanceAt(newTodoItem, 0); // 在开头插入
            }
        }
    };

    // 通过实例移除第一个项目
    const handleRemoveFirst = () => {
        const firstInstance = getInstanceAt(0);
        if (firstInstance) {
            removeInstance(firstInstance);
        }
    };

    // 通过索引移除项目
    const handleRemoveAt = () => {
        if (length > 0) {
            removeInstanceAt(0);
        }
    };

    // 交换两个项目
    const handleSwap = () => {
        if (length >= 2) {
            swap(0, 1);
        }
    };

    console.log(`列表有 ${length} 个项目`);
```

### Apple

```swift
    // 获取列表属性
    let listProperty = viewModelInstance.listProperty(fromPath: "todos")!

    // 获取长度
    print("列表长度: \(listProperty.count)")

    // 获取特定 View Model
    let todoItemVM = riveFile.viewModelNamed("TodoItem")!

    // 创建新实例
    let newTodo = todoItemVM.createInstance()!
    newTodo.stringProperty(fromPath: "description")?.value = "Buy groceries"

    // 添加到列表
    listProperty.add(newTodo)

    // 在特定索引处插入
    listProperty.insert(newTodo, at: 0)

    // 移除实例
    listProperty.remove(newTodo)

    // 移除索引处的实例
    listProperty.remove(at: 0)

    // 交换
    listProperty.swap(0, 1)
```

### Android

```kotlin
    val vmi = it.stateMachines.first().viewModelInstance!!
    val listProperty = vmi.getListProperty("todos")

    // 添加
    val todoItemVM = file.getViewModelByName("TodoItem")!!
    val newTodo = todoItemVM.createInstance()
    newTodo.getStringProperty("description").value = "Buy groceries"
    listProperty.add(newTodo)

    // 移除
    listProperty.remove(newTodo)

    // 获取大小
    val size = listProperty.size
```

### Flutter

```dart
    final listProperty = viewModelInstance.list('todos')!;

    // 添加
    final todoItemVM = riveFile.viewModel('TodoItem')!;
    final newTodo = todoItemVM.instance();
    newTodo.string('description')!.value = 'Buy groceries';
    listProperty.add(newTodo);

    // 移除项目
    listProperty.remove(newTodo);

    // 交换项目
    listProperty.swap(0, 1);

    // 通过索引获取项目
    final item = listProperty.get(0);
```

### Unity

```csharp
    if (riveWidget.Status == WidgetStatus.Loaded)
    {
        var vmi = riveWidget.StateMachine.ViewModelInstance;
        var listProperty = vmi.GetListProperty("todos");

        // 获取列表长度
        int count = listProperty.Count;

        // 获取 View Model 以创建新实例
        var todoItemVM = riveWidget.File.GetViewModel("TodoItem");
        var newTodo = todoItemVM.CreateInstance();
        newTodo.GetStringProperty("description").Value = "Buy groceries";

        // 添加到列表
        listProperty.Add(newTodo);

        // 移除
        listProperty.Remove(newTodo);

        // 通过索引交换
        listProperty.Swap(0, 1);
    }
```

### React Native

### 新版运行时 (推荐)

使用 `useRiveList` hook 来管理列表。

```tsx
    import { useRiveList, useViewModelInstance, useRiveFile } from '@rive-app/react-native';

    const { riveFile } = useRiveFile(require('./my_file.riv'));
    const instance = useViewModelInstance(riveFile);

    const {
        length,
        addInstance,
        removeInstance,
        removeInstanceAt,
        getInstanceAt,
        swap
    } = useRiveList('todos', instance);

    const handleAddItem = () => {
        const todoItemVM = riveFile?.viewModel('TodoItem');
        if (todoItemVM) {
            const newTodo = todoItemVM.createInstance();
            newTodo.stringProperty('description').set('Buy groceries');
            addInstance(newTodo);
        }
    };
```

### 旧版运行时

::: warning
Rive React Native 旧版运行时不支持列表数据绑定。
:::

### 画板 (Artboards)

画板属性允许您在运行时替换整个组件。这在以下场景中非常有用：
- 创建支持大量变体的皮肤系统，例如角色创建器，您可以交换不同的身体部位、服装和配饰。
- 创建一个复杂场景，该场景是由从各种不同 Rive 文件加载的各种画板组合而成的（绘制到单个画布/纹理/小部件上）。
- 通过将单个 Rive 文件拆分为可以根据需要加载并换入换出的较小组件，从而降低文件的大小（复杂度）。

### Web

```typescript
    let artboardProperty = null;
    let characterArtboard = null;

    function attachCharacter() {
        // 如果画板属性和角色画板都存在，则设置画板
        if (characterArtboard && artboardProperty) {
            artboardProperty.value = characterArtboard;
        }
    }

    const r = new Rive({
        src: "swap_character_main.riv",
        autoplay: true,
        canvas: el,
        autoBind: true,
        layout: new Layout({
            fit: Fit.Layout,
            layoutScaleFactor: 0.5,
        }),
        stateMachines: "State Machine 1",
        onLoad: () => {
            r.resizeDrawingSurfaceToCanvas();
            const vmi = r.viewModelInstance;
            artboardProperty = vmi.artboard("Artboard property");
            attachCharacter();
        },
        onLoadError: () => {
            console.log("error");
        },
    });

    // 加载外部 Rive 文件并获取画板
    const assetsFile = new RiveFile({
        src: "swap_character_assets.riv",
        onLoad: () => {
            characterArtboard = assetsFile.getArtboard("Character 1");
            attachCharacter();
        },
        onLoadError: () => {
            console.log("error");
        },
    });
    assetsFile.init();
```

### React

使用 `useViewModelInstanceArtboard` 来获取画板属性设置函数。

```typescript
    import { useRive, useViewModel, useViewModelInstance, useViewModelInstanceArtboard } from '@rive-app/react-webgl2';

    const { rive, RiveComponent } = useRive({
        src: 'your_file.riv',
        artboard: 'MyArtboard',
        stateMachine: 'MyStateMachine',
        autoBind: true,
    });

    // 获取画板属性设置函数
    const { setValue: setArtboard1 } = useViewModelInstanceArtboard(
        'artboard_1', // 属性路径
        rive?.viewModelInstance
    );

    const { setValue: setArtboard2 } = useViewModelInstanceArtboard(
        'artboard_2', // 属性路径
        rive?.viewModelInstance
    );

    // 从同一个文件中分配不同的画板
    const handleSetBlueArtboard = () => {
        if (rive) {
            const blueArtboard = rive.getArtboard('ArtboardBlue');
            setArtboard1(blueArtboard);
        }
    };

    const handleSetRedArtboard = () => {
        if (rive) {
            const redArtboard = rive.getArtboard('ArtboardRed');
            setArtboard2(redArtboard);
        }
    };
```

### Apple

```swift
    // 获取画板属性
    let artboardProperty = viewModelInstance.artboardProperty(fromPath: "Artboard property")!

    // 从 RiveFile 获取画板
    let anotherArtboard = riveFile.artboardNamed("AnotherArtboard")!

    // 设置画板属性值
    artboardProperty.value = anotherArtboard

    // 也可以设置为 nil
    artboardProperty.value = nil
```

### Flutter

```dart
    final artboardProperty = viewModelInstance.artboard('Artboard property')!;

    // 获取另一个画板
    final anotherArtboard = riveFile.artboard('AnotherArtboard')!;

    // 设置
    artboardProperty.value = anotherArtboard;
```

### Unity

```csharp
    if (riveWidget.Status == WidgetStatus.Loaded)
    {
        var vmi = riveWidget.StateMachine.ViewModelInstance;
        var artboardProperty = vmi.GetArtboardProperty("Artboard property");

        // 从文件中获取另一个画板
        var anotherArtboard = riveWidget.File.GetArtboard("AnotherArtboard");

        // 设置
        artboardProperty.Value = anotherArtboard;
    }
```

### React Native

### 新版运行时 (推荐)

使用 `useRiveArtboard` hook。

```tsx
    import { useRiveArtboard, useViewModelInstance, useRiveFile } from '@rive-app/react-native';

    const { riveFile } = useRiveFile(require('./my_file.riv'));
    const instance = useViewModelInstance(riveFile);

    const { value: artboard, setValue: setArtboard } = useRiveArtboard('Artboard property', instance);

    const handleSwap = () => {
        const newArtboard = riveFile.artboard('AnotherArtboard');
        setArtboard(newArtboard);
    };
```

### 旧版运行时

::: warning
Rive React Native 旧版运行时不支持画板数据绑定。
:::

### 枚举 (Enums)

枚举属性允许您提供一组预定义的值供用户选择。在运行时，它们通常表现为字符串。

### Web

```typescript
    const vmi = rive.viewModelInstance;
    const enumProperty = vmi.enum("Category");

    // 获取当前值
    console.log(enumProperty.value);

    // 设置值
    enumProperty.value = "Option 1";

    // 获取所有可用选项
    console.log(enumProperty.values);
```

### React

使用 `useViewModelInstanceEnum` (Web) 或 `useRiveEnum` (Native)。

```typescript
    const { value, setValue, values } = useViewModelInstanceEnum('category', viewModelInstance);

    console.log('可用选项:', values);
    // setValue('Option B');
```

### 示例 (Examples)

您可以在我们的示例仓库中找到更多关于数据绑定的实际应用：

- [Web 示例](https://github.com/rive-app/rive-wasm/tree/master/examples)
- [iOS/macOS 示例](https://github.com/rive-app/rive-ios/tree/master/Example)
- [Android 示例](https://github.com/rive-app/rive-android/tree/master/app)
- [Flutter 示例](https://github.com/rive-app/rive-flutter/tree/master/example)
- [Unity 示例](https://github.com/rive-app/rive-unity-examples)


