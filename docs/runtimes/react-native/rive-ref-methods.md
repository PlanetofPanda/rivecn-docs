---
title: "Rive Ref 方法 (Rive Ref Methods)"
description: "Rive 组件可用的 Ref 引用方法详解。"
---

### 新版运行时（推荐）(New Runtime - Recommended)

一旦您获取了 Rive ref 对象（通过 `useRive` hook），就可以调用许多方法来控制 Rive 图形。

<ResponseField name="play()" type="() => Promise<void>">
  开始播放 Rive 图形。
</ResponseField>

<ResponseField name="pause()" type="() => Promise<void>">
  暂停 Rive 图形。
</ResponseField>

<ResponseField name="reset()" type="() => Promise<void>">
  将 Rive 图形重置为初始状态。
</ResponseField>

<ResponseField name="playIfNeeded()" type="() => void">
  确保 Rive 图形正在播放的低开销函数。在更新属性值后使用，以确保图形已更新。
</ResponseField>

<ResponseField name="awaitViewReady()" type="() => Promise<boolean>">
  等待 Rive 视图就绪。返回一个在 Rive 视图就绪时解析的 promise。
</ResponseField>

<ResponseField name="bindViewModelInstance(viewModelInstance)" type="(viewModelInstance: ViewModelInstance) => void">
  将视图模型实例绑定到 Rive 视图。详情请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
</ResponseField>

<ResponseField name="getViewModelInstance()" type="() => ViewModelInstance | undefined">
  从 Rive 视图中获取当前绑定的视图模型实例。返回绑定的 `ViewModelInstance`，如果未绑定则返回 `undefined`。
</ResponseField>

<ResponseField name="setTextRunValue(name, value, path?)" type="(name: string, value: string, path?: string) => void">
  在 Rive 视图中设置文本运行 (text run) 的值。
      
::: warning
此方法已弃用。请改用数据绑定。请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
:::

</ResponseField>

<ResponseField name="getTextRunValue(name, path?)" type="(name: string, path?: string) => string">
  从 Rive 视图中获取文本运行 (text run) 的值。
      
::: warning
此方法已弃用。请改用数据绑定。请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
:::

</ResponseField>

<ResponseField name="setNumberInputValue(name, value, path?)" type="(name: string, value: number, path?: string) => void">
  在 Rive 视图中设置数值类型的状态机输入。
      
::: warning
此方法已弃用。请改用数据绑定。请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
:::

</ResponseField>

<ResponseField name="getNumberInputValue(name, path?)" type="(name: string, path?: string) => number">
  从 Rive 视图中获取数值类型的状态机输入。
      
::: warning
此方法已弃用。请改用数据绑定。请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
:::

</ResponseField>

<ResponseField name="setBooleanInputValue(name, value, path?)" type="(name: string, value: boolean, path?: string) => void">
  在 Rive 视图中设置布尔类型的状态机输入。
      
::: warning
此方法已弃用。请改用数据绑定。请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
:::

</ResponseField>

<ResponseField name="getBooleanInputValue(name, path?)" type="(name: string, path?: string) => boolean">
  从 Rive 视图中获取布尔类型的状态机输入。
      
::: warning
此方法已弃用。请改用数据绑定。请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
:::

</ResponseField>

<ResponseField name="triggerInput(name, path?)" type="(name: string, path?: string) => void">
  在 Rive 视图中触发一个 trigger 类型的状态机输入。
      
::: warning
此方法已弃用。请改用数据绑定。请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
:::

</ResponseField>

<ResponseField name="onEventListener(onEvent)" type="(onEvent: (event: UnifiedRiveEvent) => void) => void">
  向 Rive 视图添加事件监听器。
      
::: warning
此方法已弃用。请改用数据绑定。请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
:::

</ResponseField>

<ResponseField name="removeEventListeners()" type="() => void">
  从 Rive 视图移除所有事件监听器。
      
::: warning
此方法已弃用。请改用数据绑定。请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
:::

</ResponseField>

---

### 旧版运行时 (Legacy Runtime)

一旦您获取了 Rive ref 对象，就可以调用许多方法来控制动画和状态机。

### .play()

播放单个动画或状态机的引用方法。如果动画当前正在播放，则不执行任何操作。

类型：`(animationName?: string, loop?: LoopMode, direction?: Direction, isStateMachine?: boolean) => void`

- `animationName` —— 指定要播放的单个动画。我们 **强烈** 建议在此处传递一个值。
  - 默认值：`""`
- `loop` —— 指定用于播放动画的 `LoopMode`。
  - 默认值：`LoopMode.Auto`
- `direction` —— 指定用于播放动画的 `Direction`。
  - 默认值：`Direction.Auto`
- `isStateMachine` —— 指定传入的 `animationName` 是状态机还是线性动画。
  - 默认值：`false`

**示例：**
```javascript
    import Rive, { RiveRef } from 'rive-react-native';

    const resourceName = 'truck_v7'

    function App() {
      const riveRef = React.useRef<RiveRef>(null);

      const handlePlay = () => { riveRef.current?.play() };

      return (
        <>
          <Rive ref={riveRef} resourceName={resourceName} autoplay={false} />
          <Button onPress={handlePlay} title="Play">
        </>
      );
    }
```

### .pause()

暂停任何播放中的动画/状态机的引用方法。如果动画当前已停止或处于暂停状态，则不执行任何操作。

类型：`() => void`

**示例：**
```javascript
    import Rive, { RiveRef } from 'rive-react-native';

    const resourceName = 'truck_v7'

    function App() {
      const riveRef = React.useRef<RiveRef>(null);

      const handlePause = () => { riveRef.current?.pause() };

      return (
        <>
          <Rive ref={riveRef} resourceName={resourceName} />
          <Button onPress={handlePause} title="Pause">
        </>
      );
    }
```

### .stop()

停止动画/状态机的引用方法。如果动画当前已停止或处于暂停状态，则不执行任何操作。

类型：`() => void`

**示例：**
```javascript
    import Rive, { RiveRef } from 'rive-react-native';

    const resourceName = 'truck_v7'

    function App() {
      const riveRef = React.useRef<RiveRef>(null);

      const handleStop = () => { riveRef.current?.stop() };

      return (
        <>
          <Rive ref={riveRef} resourceName={resourceName} />
          <Button onPress={handleStop} title="Stop">
        </>
      );
    }
```

### .reset()

重置整个画板的引用方法。如果 `autoplay` 没有被显式设置为 `false`，它将立即播放 `animationName` 或者是第一个动画（如果未提供 `animationName`）。

类型：`() => void`

```javascript
    import Rive, { RiveRef } from 'rive-react-native';

    const resourceName = 'truck_v7'

    function App() {
      const riveRef = React.useRef<RiveRef>(null);

      const handleReset = () => { riveRef.current?.reset() };

      return (
        <>
          <Rive ref={riveRef} resourceName={resourceName} autoplay={true} />
          <Button onPress={handleReset} title="Reset">
        </>
      );
    }
```

### .fireState()

在所有匹配且处于活动状态的状态机上，根据 `inputName` 触发 `trigger` 输入的引用方法。

类型：`(stateMachineName: string, inputName: string) => void`

- `stateMachineName` —— 指定要与所有活动状态机进行匹配的状态机名称。
- `inputName` —— 指定要触发的 `trigger` 名称。

**示例：**
```javascript
    import Rive, { RiveRef } from 'rive-react-native';

    const resourceName = 'ui_swipe_left_to_delete'

    function App() {
      const riveRef = React.useRef<RiveRef>(null);

      const handleFireState = () => { riveRef.current?.fireState('Swipe to delete', 'Trigger Delete') };

      return (
        <>
          <Rive ref={riveRef} resourceName={resourceName} autoplay={true} />
          <Button onPress={handleFireState} title="FireState">
        </>
      );
    }
```

### .setInputState()

在所有匹配且处于活动状态的状态机上，将由 `inputName` 标识的 `input` 状态设置为给定的 `value`。

类型：`(stateMachineName: string, inputName: string, value: boolean | number) => void`

- `stateMachineName` —— 指定要与所有活动状态机进行匹配的状态机名称。
- `inputName` —— 指定要更新状态的 `input` 名称。
- `value` —— 指定 `input` 状态应设置的值。

**示例：**
```javascript
    import Rive, { RiveRef } from 'rive-react-native';

    const resourceName = 'ui_swipe_left_to_delete'
    const threshold = 50

    function App() {
      const riveRef = React.useRef<RiveRef>(null);

      const handleFireState = () => {
        riveRef.current?.setInputState(
          'Swipe to delete',
          'Swipe Threshold',
          threshold
        );
      };

      return (
        <>
          <Rive ref={riveRef} resourceName={resourceName} autoplay={true} />
          <Button onPress={handleFireState} title="FireState">
        </>
      );
    }
```

### .setTextRunValue()

根据给定的名称 (`textRunName`) 在相应的文本运行 (text run) 上设置新的文本值 (`value`)。

类型：`setTextRunValue: (textRunName: string, value: string) => void`

- `textRunName` —— 要设置新文本值的文本运行名称。在此处了解更多有关文本运行的信息：[文本 (Text)](/runtimes/text)
- `value` —— 指定要在文本运行上设置的新文本值。

**示例：**
```javascript
    import Rive, { RiveRef } from 'rive-react-native';

    const resourceName = 'ui_swipe_left_to_delete'
    const threshold = 50

    function App() {
      const riveRef = React.useRef<RiveRef>(null);

      const handleSetText = () => {
        riveRef.current?.setTextRunValue(
          'MyRunName',
          'New Text',
        );
      };

      return (
        <>
          <Rive ref={riveRef} resourceName={resourceName} autoplay={true} />
          <Button onPress={handleSetText} title="SetText">
        </>
      );
    }
```
