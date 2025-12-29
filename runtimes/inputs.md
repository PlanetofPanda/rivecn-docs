运行时 (Runtimes)

# 输入 (Inputs)

> [!WARNING]
> **⚠️ 已弃用：请使用数据绑定 (Data Binding) 替代输入来控制 Rive 动画**
>
> 对于新项目，我们建议使用 [数据绑定](/runtimes/data-binding.md) 来控制状态机。
> 输入功能仍然可用，但数据绑定提供了更强大和灵活的解决方案。

## [​](#overview) 概览

输入 (Inputs) 是控制状态机行为的传统方式。有关在编辑器中创建输入的信息，请参阅 [状态机输入](/editor/state-machine/inputs.md)。

## [​](#controlling-state-machine-inputs) 控制状态机输入

### Web (JS)

```javascript
const r = new rive.Rive({
  src: "my-file.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  stateMachines: "State Machine 1",
  onLoad: () => {
    // 获取输入
    const inputs = r.stateMachineInputs("State Machine 1");
    
    // 按名称查找输入
    const boolInput = inputs.find(i => i.name === "isHovered");
    const numInput = inputs.find(i => i.name === "score");
    const triggerInput = inputs.find(i => i.name === "onClick");
    
    // 设置布尔输入
    boolInput.value = true;
    
    // 设置数字输入
    numInput.value = 100;
    
    // 触发 Trigger 输入
    triggerInput.fire();
  },
});
```

### React

```javascript
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";

function MyComponent() {
  const { rive, RiveComponent } = useRive({
    src: "my-file.riv",
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  // 获取输入引用
  const boolInput = useStateMachineInput(rive, "State Machine 1", "isHovered");
  const numInput = useStateMachineInput(rive, "State Machine 1", "score");
  const triggerInput = useStateMachineInput(rive, "State Machine 1", "onClick");

  const handleClick = () => {
    triggerInput?.fire();
  };

  return <RiveComponent onClick={handleClick} />;
}
```

### Flutter

```dart
// 获取状态机控制器
final stateMachine = controller.stateMachine;

// 获取输入引用
final boolInput = stateMachine?.input("isHovered");
final numInput = stateMachine?.input("score");
final triggerInput = stateMachine?.input("onClick");

// 设置值
if (boolInput is SMIBool) boolInput.value = true;
if (numInput is SMINumber) numInput.value = 100;
if (triggerInput is SMITrigger) triggerInput.fire();
```

### iOS/macOS (Swift)

```swift
// 设置布尔输入
riveViewModel.setInput("isHovered", value: true)

// 设置数字输入
riveViewModel.setInput("score", value: 100.0)

// 触发 Trigger
riveViewModel.triggerInput("onClick")
```

### Android (Kotlin)

```kotlin
// 设置布尔输入
riveAnimationView.setBooleanState("State Machine 1", "isHovered", true)

// 设置数字输入
riveAnimationView.setNumberState("State Machine 1", "score", 100f)

// 触发 Trigger
riveAnimationView.fireState("State Machine 1", "onClick")
```

## [​](#nested-inputs) 嵌套输入

如果输入位于嵌套的画板（组件）中，你需要指定路径来访问它们：

### Web (JS)

```javascript
// 获取嵌套输入 - 使用画板路径
const nestedInputs = r.stateMachineInputs("State Machine 1", "NestedArtboard");
```

### Flutter

```dart
// 获取嵌套组件的状态机
final nestedArtboard = controller.artboard?.component("NestedComponent");
final nestedStateMachine = nestedArtboard?.stateMachine("State Machine 1");
final input = nestedStateMachine?.input("myInput");
```

[数据绑定 (Data Binding)](/runtimes/data-binding.md)[状态机播放 (State Machines)](/runtimes/state-machines.md)
