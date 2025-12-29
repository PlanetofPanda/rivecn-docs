运行时 (Runtimes)

# 数据绑定 (Data Binding)

使用视图模型 (View Models) 将代码连接到编辑器中绑定的元素。

## [​](#overview) 概览

数据绑定是 Rive 推荐的在运行时动态更新内容的方式。通过数据绑定，你可以：
- 动态更新文本内容
- 更改颜色和其他属性
- 替换图像
- 控制列表和重复内容
- 双向同步数据

有关在编辑器中设置数据绑定的详细信息，请参阅 [数据绑定概览](/editor/data-binding/overview.md)。

## [​](#view-models) 视图模型 (View Models)

视图模型是在 Rive 编辑器中定义的数据结构，包含可在运行时修改的属性。每个视图模型可以包含多种类型的属性：
- **String (字符串)**：文本内容
- **Number (数字)**：数值
- **Boolean (布尔值)**：真/假状态
- **Color (颜色)**：颜色值
- **Image (图像)**：图像资源
- **List (列表)**：可重复内容
- **Enum (枚举)**：预定义选项

## [​](#view-model-instances) 视图模型实例

在运行时，你需要获取视图模型实例来读取和修改属性值。

### Web (JS)

```javascript
const r = new rive.Rive({
  src: "my-file.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  stateMachines: "State Machine 1",
  onLoad: () => {
    // 获取视图模型实例
    const viewModel = r.viewModelInstance();
    // 修改属性
    viewModel.string("welcomeText").value = "欢迎使用 Rive!";
    viewModel.number("score").value = 100;
  },
});
```

### Flutter

```dart
final controller = RiveWidgetController(file);
final viewModelInstance = controller.dataBind(DataBind.auto());

// 修改属性
viewModelInstance.string("welcomeText")?.value = "欢迎使用 Rive!";
viewModelInstance.number("score")?.value = 100;
```

### iOS/macOS (Swift)

```swift
let viewModel = riveViewModel.viewModelInstance
viewModel?.string("welcomeText")?.value = "欢迎使用 Rive!"
viewModel?.number("score")?.value = 100
```

## [​](#auto-binding) 自动绑定 (Auto-Binding)

大多数运行时支持自动绑定，它会自动使用画板的默认视图模型实例。这简化了初始设置。

## [​](#properties) 属性类型

### 字符串属性

```javascript
viewModel.string("propertyName").value = "新文本";
const currentValue = viewModel.string("propertyName").value;
```

### 数字属性

```javascript
viewModel.number("propertyName").value = 42;
```

### 布尔属性

```javascript
viewModel.boolean("propertyName").value = true;
```

### 颜色属性

```javascript
viewModel.color("propertyName").value = 0xFF0000FF; // ARGB 格式
```

## [​](#images) 图像属性

你可以在运行时动态替换图像：

```javascript
// 从 URL 加载图像
const imageAsset = await rive.decodeImage(imageBytes);
viewModel.image("imageProperty").setRenderImage(imageAsset);
```

## [​](#lists) 列表属性

列表允许你创建可重复的内容：

```javascript
const list = viewModel.list("items");
const item1 = list.item(0);
item1.string("title").value = "第一项";
```

## [​](#observability) 可观察性

某些运行时支持监听属性变化：

```javascript
viewModel.number("score").addListener((value) => {
  console.log("分数变化:", value);
});
```

[状态机播放 (State Machines)](/runtimes/state-machines.md)[加载资源 (Loading Assets)](/runtimes/loading-assets.md)
