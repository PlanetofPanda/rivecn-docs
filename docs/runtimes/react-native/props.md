---
title: "Prop 参数 (Props)"
description: "Rive 组件可选的 Prop 参数"
---

### 新版运行时（推荐）(New Runtime - Recommended)

以下是您可以在 `RiveView` 组件上设置的 Prop 参数：

<ResponseField name="file" type="RiveFile" required>
  要显示的 **riv** 文件，通过 `useRiveFile` 或 `RiveFileFactory` 加载。
</ResponseField>
<ResponseField name="hybridRef" type="HybridView">
  视图引用 setter，从 `useRive` 获取。
</ResponseField>
<ResponseField name="autoPlay" type="boolean" default="true">
  自动开始播放状态机。
</ResponseField>
<ResponseField name="fit" type="Fit" default="Contain">
  Rive 图形在其容器内的填充模式。
</ResponseField>
<ResponseField name="alignment" type="Alignment" default="Center">
  Rive 图形在其容器内的对齐方式。
      
::: info
在使用 `Fit.Layout` 时会被忽略。
:::

</ResponseField>
<ResponseField name="layoutScaleFactor" type="double" default="-1">
  使用 `Fit.Layout` 时应用于 Rive 图形的缩放因子。默认值 `-1` 表示使用设备的 DPI。
      
::: info
此属性对于其他任何 `Fit` 类型均无效。
:::

</ResponseField>
<ResponseField name="artboardName" type="String">
  要显示的画板名称。

  _如果未设置，将使用编辑器中配置的默认画板。_
</ResponseField>
<ResponseField name="stateMachineName" type="String">
  要播放的状态机名称。

  _如果未设置，将使用编辑器中配置的默认状态机。_
</ResponseField>
<ResponseField name="dataBind" type="ViewModelInstance | DataBindMode | DataBindByName" default="DataBindMode.Auto">
  要绑定到状态机的视图模型实例。可以是：
  - `ViewModelInstance` 对象（来自 `useViewModelInstance`）
  - `DataBindMode.Auto`（默认） —— 自动绑定默认视图模型实例
  - `DataBindMode.None` —— 不进行数据绑定
  - `{ byName: string }` —— 通过实例名称绑定

  详情请参阅 [数据绑定 (Data Binding)](/runtimes/data-binding) 文档。
</ResponseField>
<ResponseField name="onError" type="((error: RiveError) => void)" required>
  自定义错误处理回调。
</ResponseField>

---

### 旧版运行时 (Legacy Runtime)

以下是您可以在旧版运行时的 Rive React 组件上设置的 Prop 参数：

- `children` *(可选)* —— 可用于在 Rive 动画视图顶部显示一些“绝对定位”的内容。
- `style` *(可选)* —— Rive 动画视图包装器的样式。
  - 默认值：`undefined`
  - 类型：`StyleProp<ViewStyle>`
- `resourceName` *(可选)* —— 与 Rive 文件匹配的文件名（不带 `.riv` 扩展名）。您应该提供 `resourceName` 或 `url` 其中的一个，不要同时提供。
  - 默认值：`undefined`
  - 类型：`string`
- `url` *(可选)* —— 提供 Rive 文件的 URL。您应该提供 `resourceName` 或 `url` 其中的一个，不要同时提供。
  - 默认值：`undefined`
  - 类型：`string`
- `autoplay` *(可选)* —— 打开 Rive 动画视图或指定新的 `resourceName`/`url` 时，将在准备就绪后自动播放。
  - 默认值：`true`
  - 类型：`boolean`
- `fit` *(可选)* —— 指定动画在 Rive 动画视图内的显示方式。
  - 默认值：`Fit.Contain`
  - 类型：`Fit`
- `alignment` *(可选)* —— 指定动画在 Rive 动画视图内的对齐方式。
  - 默认值：`Alignment.None`
  - 类型：`Alignment`
- `artboardName` *(可选)* —— 指定要在 Rive 动画视图中显示的画板。
  - 默认值：`undefined`
  - 类型：`string`
- `animationName` *(可选)* —— 指定当 `autoplay` 设置为 `true` 时要播放的动画。
  - 默认值：`undefined`
  - 类型：`string`
- `stateMachineName` *(可选)* —— 指定当 `autoplay` 设置为 `true` 时要播放的状态机。
  - 默认值：`undefined`
  - 类型：`string`
- `testID` *(可选)* —— 指定测试 ID，在测试中可能会派上用场。
  - 默认值：`undefined`
  - 类型：`string`
- `onPlay` *(可选)* —— 当动画或状态机开始播放时调用的回调函数。
  - 类型：`(animationName: string, isStateMachine: boolean) => void`
- `onPause` *(可选)* —— 当动画或状态机暂停时调用的回调函数。
  - 类型：`(animationName: string, isStateMachine: boolean) => void`
- `onStop` *(可选)* —— 当动画或状态机停止时调用的回调函数。
  - 类型：`(animationName: string, isStateMachine: boolean) => void`
- `onLoopEnd` *(可选)* —— 当动画循环结束时调用的回调函数。**注意：** 只有通过 `animationName` 播放单个动画时才会触发此回调；如果通过 `stateMachineName` 播放状态机，则不会触发。
  - 类型：`(animationName: string, loopMode: LoopMode) => void`
- `onStateChanged` *(可选)* —— 当内部动画状态发生变化时调用的回调函数，与状态机功能紧密相关。
  - 类型：`(stateMachineName: string, stateName: string) => void`
- `onError` *(可选)* —— 当抛出错误时调用的回调函数。允许手动处理由 `RNRiveError` 描述的异常。
  - 类型：`(riveError: RNRiveError) => void`
- `onRiveEventReceived` *(可选)* —— 当渲染循环报告 Rive 事件时调用的回调函数。
  - 类型：`(event: RiveGeneralEvent | RiveOpenUrlEvent) => void`
