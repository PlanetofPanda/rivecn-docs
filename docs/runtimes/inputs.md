---
title: "输入 (Inputs)"
description: "⚠️ 已弃用：请使用数据绑定 (Data Binding) 代替输入来控制 Rive 动画"
---

::: warning
**弃用通知**：本页面目前全部文档均针对旧版输入系统。
  **对于新项目：** 请改用 [数据绑定 (Data Binding)](/runtimes/data-binding)。
  **对于现有项目：** 请计划尽快从输入系统迁移到数据绑定。**本内容仅为旧版支持目的而提供。**
:::

有关在 Rive 中创建输入的更多信息，请参阅：[输入 (Inputs)](/editor/state-machine/inputs)。

## 控制状态机输入 (Controlling state machine inputs)

一旦加载并实例化 Rive 文件，就可以以编程方式查询状态机的输入，并设置这些输入值（对于触发器，则可以启动触发）。

::: info
输入也可以在运行时的组件上设置，请参见下文的 [嵌套输入](#嵌套输入)。
:::

### Web

#### 示例 (Examples)

- [设置状态机输入](https://codesandbox.io/p/sandbox/rive-state-machine-inputs-js-forked-s6gfjg)

#### 输入 (Inputs)

Web 运行时提供了一个 `onLoad` 回调，该回调在 Rive 文件加载完成并准备就绪时运行。我们使用此回调来确保在查询输入之前，状态机已经实例化。

```javascript
    <div id="button">
        <canvas id="canvas" width="1000" height="500"></canvas>
    </div>
    <script src="https://unpkg.com/@rive-app/canvas@2.10.3"></script>
    <script>
        const button = document.getElementById('button');

        const r = new rive.Rive({
            src: 'https://cdn.rive.app/animations/vehicles.riv',
            canvas: document.getElementById('canvas'),
            autoplay: true,
            stateMachines: 'bumpy',
            onLoad: (_) => {
                // 通过状态机名称获取输入
                const inputs = r.stateMachineInputs('bumpy');
                // 找到您想要设置值或触发的输入
                const bumpTrigger = inputs.find(i => i.name === 'bump');
                button.onclick = () => bumpTrigger.fire();
            },
        });
    </script>
```

我们使用 Rive 对象上的 `stateMachineInputs` 函数来检索输入。每个输入都有一个名称和类型。共有三种类型：

- `StateMachineInputType.Trigger`：具有一个 `fire()` 函数
- `StateMachineInputType.Number`：具有一个数字类型的 `value` 属性，可以进行 `get`/`set` 操作
- `StateMachineInputType.Boolean`：具有一个布尔类型的 `value` 属性，可以进行 `get`/`set` 操作

```javascript
const inputs = r.stateMachineInputs("bumpy");
inputs.forEach((i) => {
  const inputName = i.name;
  const inputType = i.type;
  switch (inputType) {
    case rive.StateMachineInputType.Trigger:
      i.fire();
      break;
    case rive.StateMachineInputType.Number:
      i.value = 42;
      break;
    case rive.StateMachineInputType.Boolean:
      i.value = true;
      break;
  }
});
```

### React

#### 示例 (Example)

- [设置状态机输入 (React)](https://codesandbox.io/p/sandbox/rive-state-machine-inputs-react-forked-k6gglh)

#### 输入 (Inputs)

React 运行时提供了一个 `useStateMachineInput` hook，使检索状态机输入的过程比基础 Web 运行时更简单。

```javascript
    import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

    export default function Simple() {
        const { rive, RiveComponent } = useRive({
            src: "https://cdn.rive.app/animations/vehicles.riv",
            stateMachines: "bumpy",
            autoplay: true,
        });

        const bumpInput = useStateMachineInput(rive, "bumpy", "bump");

        return (
            <RiveComponent
                style="height: 1000px"
                onClick={() => bumpInput && bumpInput.fire()}
            />
        );
    }
```

### React Native

### 新版运行时 (推荐)

::: warning
该功能已弃用。我们推荐使用 [数据绑定 (Data Binding)](runtimes/data-binding)。
:::

您可以通过视图引用访问控制数据绑定输入的方法：

```ts
        export default function StateMachineInputsExample() {
          const { riveViewRef, setHybridRef } = useRive();
          const { riveFile } = useRiveFile(require('../../assets/rive/rating.riv'));

          useEffect(() => {
            if (riveViewRef) {
              try {
                // 原始值
                console.log(
                  '数字值 (Number value): ',
                  riveViewRef.getNumberInputValue('rating')
                );
                // 设置输入值
                riveViewRef.setNumberInputValue('rating', 3.0);
                console.log(
                  '更新后的数字值 (Number value): ',
                  riveViewRef.getNumberInputValue('rating')
                );
                // 添加延迟以确保视图控制器就绪
                setTimeout(() => {
                  console.log(
                    '延迟后的数字值 (Number value after delay): ',
                    riveViewRef.getNumberInputValue('rating')
                  );
                }, 16);
              } catch (err) {
                console.error(err);
              }
            }
          }, [riveViewRef]);

          return (
            <View style={styles.riveContainer}>
              {riveFile ? (
                <RiveView
                  style={styles.rive}
                  autoPlay={true}
                  file={riveFile}
                  hybridRef={setHybridRef}
                />
              ) : null}
            </View>
          );
        }
```

### 旧版运行时

#### 输入 (Inputs)

在 React Native 运行时中，大多数方法/触发器都可以在 `Rive` 组件的 ref 上使用，包括为状态机设置输入值/触发。在这种情况下，无需获取输入的实例。只需通过 Rive 的 `ref` 设置输入状态或触发输入状态即可。

```javascript
        export default function StateMachine() {
            const riveRef = React.useRef<RiveRef>(null);
            // 在 React 状态中维护状态机的值
            const [selectedLevel, setSelectedLevel] = useState('2');

            const setLevel = (n: number) => {
                setSelectedLevel(n.toString());
                // 无需获取状态机输入的实例，只需在 `riveRef` 本身设置状态即可
                riveRef.current?.setInputState("Designer's Test", 'Level', n);
            };

            return (
                <SafeAreaView style={styles.safeAreaViewContainer}>
                    <ScrollView contentContainerStyle={styles.container}>
                        <Rive
                            resourceName={'skills'}
                            ref={riveRef}
                            autoplay={true}
                            stateMachineName="Designer's Test"
                        />
                        <RadioButton.Group
                            onValueChange={(newValue) => setLevel(parseInt(newValue, 10))}
                            value={selectedLevel}
                        >
                            <View style={styles.radioButtonsWrapper}>
                                <View style={styles.radioButtonWrapper}>
                                    <Text>{'Beginner'}</Text>
                                    <RadioButton value={'0'} />
                                </View>
                                <View style={styles.radioButtonWrapper}>
                                    <Text>{'Intermediate'}</Text>
                                    <RadioButton value={'1'} />
                                </View>
                                <View style={styles.radioButtonWrapper}>
                                    <Text>{'Expert'}</Text>
                                    <RadioButton value={'2'} />
                                </View>
                            </View>
                        </RadioButton.Group>
                    </ScrollView>
                </SafeAreaView>
            );
        }
```

::: info
查看 [React Native API](/runtimes/react-native/rive-ref-methods#.setinputstate) 以了解关于 `.setInputState()` 和 `.fireState()` 参数的更多信息。
:::

### Flutter

从 `StateMachine` 实例中检索输入。

直接从 `RiveWidgetController` 访问状态机：

```dart
final riveController = RiveWidgetController(riveFile);
final stateMachine = riveController.stateMachine;

final myTrigger = stateMachine.trigger('myTrigger');
final myBool = stateMachine.boolean('myBool');
final myNumber = stateMachine.number('myNumber');
```

与输入进行交互：

```dart
myTrigger.fire(); // 触发输入
myBool.value = true; // 设置布尔输入
myNumber.value = 42.0; // 设置数字输入
```

当不再需要这些输入时，请销毁它们：

```dart
myTrigger.dispose();
myBool.dispose();
myNumber.dispose();
```

状态机由控制器拥有。当您销毁控制器时，状态机也将被销毁。

```dart
controller.dispose();
```

### Apple

#### 输入 (Inputs)

为状态机设置输入值需要通过在 View 类中实例化的 `RiveViewModel` 进行。

`.setInput()`

- `inputName` (String) - 状态机上要设置值的输入名称
- `value` (Bool, Float, 或 Double) - 要为关联的 `inputName` 设置的值

`triggerInput()`

- `inputName` (String) - 状态机上要触发的输入名称

```swift
    // 数字输入示例
    starsVM.setInput("Rating Changed", value: 5)

    // 布尔输入示例
    toggleVM.setInput("Switch Flipped", value: true)

    // 触发器输入示例
    confettiVM.triggerInput("Celebrate")
```

### Android

#### 输入 (Inputs)

与 `rive-android` 运行时中的其他方法一样，使用视图为状态机输入设置值。在这种情况下，无需抓取状态机输入实例的引用来设置值。

共有 3 种不同的方法分别用于数字、布尔和触发器输入的设置值或触发：

- `.setNumberState(stateMachineName: String, inputName: String, value: Float)`
- `.setBooleanState(stateMachineName: String, inputName: String, value: Boolean)`
- `.fireState(stateMachineName: String, inputName: String)`

```kotlin
    // 例如：为数字输入设置输入状态
    animationView.setNumberState("Designer's Test", "Level", 0f)

    // 例如：为布尔输入设置布尔状态
    animationView.setBooleanState("Boolean test", "foo", true)

    // 例如：点火触发器输入
    animationView.fireState("Trigger test", "fireInput");
```

## 嵌套输入 (Nested Inputs)

::: warning
**⚠️ 已弃用功能**：嵌套输入是旧版输入系统的一部分。
  **请改用 [数据绑定 (Data Binding)](/runtimes/data-binding)** 在运行时控制组件属性。
:::

您可以在运行时控制 [组件 (Components)](/editor/fundamentals/components) 的输入。这些输入不在主画板上，而是在一个组件上。要设置嵌套输入，您需要知道输入在画板级别所处的 **路径 (path)**。

#### 示例 (Example)

![图像](https://ucarecdn.com/2b241b74-91d1-4a7b-b18f-32c3ff94762d/)

::: warning
- 使用画板唯一的 **层次结构名称 (hierarchy name)**，而不是 **画板名称 (artboard's name)**。
- 不要包含主画板的名称。在上面的示例中，路径是 `Volume Molecule`，而不是 `Menu/Volume Molecule`。
- 确保组件在编辑器中标记为已导出 (exported)，以便在运行时访问它们：

![图像](https://ucarecdn.com/2280e7c9-2e91-4cf6-89c6-b122e1b2b5e7/)
:::

您可以根据需要进入任意深度的组件。例如，上面显示的 **Volume Molecule** 画板具有两个具有以下唯一层次结构名称的组件：

- `Volume Component`
- `FX Component`

::: info
一旦您进入一个组件深度以上，路径将是由唯一层次结构名称组成的以 `/` 分隔的字符串。
:::

![图像](https://ucarecdn.com/8ba625a6-7f9a-46fe-afaf-8e3bc562dc45/)

如果您在运行时加载 **Menu** 画板，并想要在 `FX Component` 画板上获取/设置输入，路径将是 `Volume Molecule/FX Component`。

::: warning
不要在组件名称中使用 `/`，因为这会破坏运行时的搜索功能。
:::

### Web

要为上述示例设置 **Volume** 输入：

```javascript
    const rive = new Rive({...});
    ...
    rive?.setNumberStateAtPath("volume", 80.0, "Volume Molecule/Volume Component");
```

**所有选项：**
- `setNumberStateAtPath(inputName: string, value: number, path: string)`
- `setBooleanStateAtPath(inputName: string, value: boolean, path: string)`
- `fireStateAtPath(inputName: string, path: string)`

### React

要为上述示例设置 **Volume** 输入：

```tsx
    const {rive, RiveComponent} = useRive({...});

    useEffect(() => {
      if (rive) {
        rive?.setNumberStateAtPath("volume", 80.0, "Volume Molecule/Volume Component");
      }
    }, [rive]);
```

**所有选项：**
- `setNumberStateAtPath(inputName: string, value: number, path: string)`
- `setBooleanStateAtPath(inputName: string, value: boolean, path: string)`
- `fireStateAtPath(inputName: string, path: string)`

### React Native

### 新版运行时 (推荐)

::: warning
**注意**：新版运行时推荐使用 [数据绑定 (Data Binding)](/runtimes/data-binding) 代替旧版输入系统来控制嵌套组件属性。
:::

新版运行时主要使用数据绑定来控制嵌套属性。详情请参阅 [数据绑定文档 (Data Binding documentation)](/runtimes/data-binding)。

::: info
有关在新版运行时中使用数据绑定处理嵌套属性的示例，请参阅 [示例 App](https://github.com/rive-app/rive-nitro-react-native/tree/main/example)。
:::

### 旧版运行时

要为上述示例设置 **Volume** 输入：

```tsx
        riveRef.current?.setInputStateAtPath("volume", 80.0, "Volume Molecule/Volume Component");
```

**所有选项：**
- `setInputStateAtPath(inputName: string, value: boolean | number, path: string)`
- `fireStateAtPath(inputName: string, path: string)`

### Flutter

要为上述示例设置 **Volume** 输入：

```dart
    // 从状态机获取名为 'volume' 的嵌套输入
    final controller = RiveWidgetController(riveFile);
    final stateMachine = controller.stateMachine;
    final volumeInput = stateMachine.number('volume', path: 'Volume Molecule/Volume Component')!;
    volumeInput.value = 80.0;
```

**所有选项：**
- `number(name, path: 'path/to/input')`
- `bool(name, path: 'path/to/input')`
- `trigger(name, path: 'path/to/input')`

### Apple

要为上述示例设置 **Volume** 输入：

```swift
    @StateObject private var riveState = RiveViewModel(fileName: "file_name", stateMachineName: "StateMachineName")
    ...
    riveState.setInput("volume", value: 80.0, path: "Volume Molecule/Volume Component")
```

**所有选项：**
- `setInput(_ inputName, value: value, path)` 其中 `value` 可以是 `Bool`、`Double` 或 `Float`
- `triggerInput(_ inputName, path: path)`

### Android

要为上述示例设置 **Volume** 输入：

```kotlin
    // `animationView` 是 RiveAnimationView
    animationView.setNumberStateAtPath("volume", 80.0, "Volume Molecule/Volume Component")
```

**在 `RiveAnimationView` 上的所有选项：**
- `setNumberStateAtPath(inputName: String, value: Float, path: String)`
- `setBooleanStateAtPath(inputName: String, value: Boolean, path: String)`
- `fireStateAtPath(inputName: String, path: String)`

**在 `RiveFileController` 上的所有选项：**
- `setNumberStateAtPath(inputName: String, value: Float, path: String)`
- `setBooleanStateAtPath(inputName: String, value: Boolean, path: String)`
- `fireStateAtPath(inputName: String, path: String)`

### Unity

要为上述示例设置 **Volume** 输入：

![图像](https://ucarecdn.com/2ef96393-bf13-4445-950b-1626235a25eb/)

```csharp
    m_file = Rive.File.Load(asset);
    m_artboard = m_file.Artboard(0);
    m_artboard.SetNumberInputStateAtPath("volume", 80.0f, "Volume Molecule/Volume Component");
```

**所有选项：**
- `void SetNumberInputStateAtPath(string inputName, float value, string path)`
- `float? GetNumberInputStateAtPath(string inputName, string path)`
- `void SetBooleanInputStateAtPath(string inputName, bool value, string path)`
- `bool? GetBooleanInputStateAtPath(string inputName, string path)`
- `void FireInputStateAtPath(string inputName, string path)`
