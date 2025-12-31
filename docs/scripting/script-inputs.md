---
title: "脚本输入 (Script Inputs)"
description: "脚本输入是您的脚本与 Rive 编辑器之间的桥梁，允许您通过自定义输入字段来定制和控制脚本行为。"
---

脚本化输入 (Scripted Inputs) 是连接您的脚本与 Rive 编辑器的桥梁，允许您通过自定义输入字段来定制和控制脚本行为。

通过在脚本中定义输入，您可以公开可配置的属性 —— 如数值 (numbers)、颜色 (colors)、布尔值 (booleans) 和画板组件 (artboard components) —— 它们会直接出现在 Rive 界面中。这意味着您只需在脚本中编写一次逻辑，即可自由地实验各种数值、随时间对属性制作动画、绑定外部数据源，并在具有不同配置的多个实例中重用同一个脚本。输入将静态脚本转变为灵活、设计友好的工具，从而实现真正的协作和快速迭代。

## 定义输入 (Defining Inputs)

要创建新的脚本输入，请在类型 (type) 中添加它们，并在脚本的返回函数中设置默认值。

```lua
-- 定义脚本的数据和输入。
-- 这些属性将在 `self` 中可用。
type MyNode = {
  myNumber: Input<number>,
  myColor: Input<Color>,
  -- 此输入期望一个名为 Points 的视图模型 (View Model)
  myViewModel: Input<Data.Points>,
  -- 此输入期望一个带有名为 Points 的视图模型的画板 (Artboard)
  myArtboard: Input<Artboard<Data.Points>>,
  -- 此属性可以通过 self 访问，但不会显示在输入面板中
  myString: string,
}

function init(self: SnakeGame): boolean
  print("myString", self.myString)
  print("myNumber", self.myNumber)
  print("myColor", self.myColor)
  print("myViewModel value", self.myViewModel.someString.value)
  print("myViewModel value", self.myArtboard.data.someEnum.value)

  return true
end

return function(): Node<MyNode>
  return {
    init = init,
    draw = draw,
    myString = "Rive for president!",
    -- 创建脚本新实例时设置默认值
    -- 这将被脚本输入面板中设置的值所覆盖
    myNumber = 0,
    myColor = Color.rgba(255, 255, 0, 255), -- 0xFFFFFF00

    -- 使用 late() 标记此输入在运行时分配
    myViewModel = late(),
    myArtboard = late()
  }
end
```

::: tip
使用输入，可以在运行时向场景中添加画板实例。参见 [实例化组件 (Instantiating Components)](/scripting/protocols/node-scripts#instanting-components)。
:::

## 设置输入值 (Setting Input Values)

要访问编辑器右侧边栏中的输入属性，请在层级面板 (Hierarchy Panel) 中选择您的 [节点脚本 (Node script)](/scripting/protocols/node-scripts) 或 [布局脚本 (Layout script)](/scripting/protocols/layout-scripts)，或者在数据面板 (Data Panel) 中选择 [转换器 (Converter)](/scripting/protocols/converter-scripts)。

![节点脚本输入](/images/scripting/script-input.png)

## 数据绑定输入 (Data Binding Inputs)

您可以使用 [数据绑定 (Data Binding)](/editor/data-binding/overview) 在运行时控制输入值。

::: info
输入可以控制脚本，但脚本不能改变输入的值。

如果您需要从脚本控制视图模型属性，请使用 [视图模型输入](#view-model-inputs)。
:::

要数据绑定一个输入，请右键点击右侧边栏中的输入字段，选择 Data Bind，然后选择一个属性。

![数据绑定一个转换器输入](/images/scripting/converter-script-input-data-binding.png)

## 监听输入的更改 (Listening for Changes to Inputs)

每当任何输入发生变化时，`update` 函数都会触发。

```lua
function update(self: MyNode)
  print('发生了更新')
end
```

您也可以监听特定属性的更改：

```lua
function handleMyStringChanged()
  print('myString 改变了！')
end

function handleMyNumberChanged(myNumber: number)
  print('myNumber 改变了！', myNumber)
end

function init(self: MyApp): boolean
  -- 当 self.myString 改变时，handleMyStringChanged 触发
  local myString = self.myString
  myString:addListener(handleMyStringChanged)

  -- 向 handleMyStringChanged 回调传递参数
  local myNumber = self.myNumber
  myNumber:addListener(myNumber.value, handleMyNumberChanged)

  return true
end
```

## 视图模型输入 (View Model Inputs)

视图模型输入允许您的脚本读取和写入视图模型属性。这些属性可以通过 [数据绑定](/editor/data-binding/overview) 控制 Rive 场景中的任何元素。

### 设置您的视图模型

::: info
脚本只能访问 **嵌套** 的视图模型，不能访问顶层视图模型。
:::

**在本示例中：**

- `Main` 视图模型有一个名为 `character` 的属性。
- `character` 属性本身是一个 `Character` 视图模型。
- `Character` 视图模型包含两个数字属性（x 和 y），您希望通过脚本控制它们。

![嵌套](/images/scripting/nested-view-model.png)

### 定义视图模型输入

在脚本内部，声明一个新的输入，其类型匹配您想要引用的嵌套视图模型（`Data.` + 嵌套视图模型的名称）。

在这种情况下，Character 视图模型类型变为 `Data.Character`。

```lua
type MyNode = {
  -- 此输入期望一个类型为 Character 的视图模型实例
  character: Input<Data.Character>
}

return function(): Node<MyNode>
  return {
    init = init,
    advance = advance,
    draw = draw,
    -- 使用 `late()` 进行初始化，以便在运行时由编辑器提供值。
    character = late(),
  }
end
```

### 在编辑器中连接输入

1. 在场景面板中选择您的脚本（如果您使用的是转换器脚本，则选择 [转换器 (Converter)](/scripting/protocols/converter-scripts)）。
2. 在右侧边栏中，找到 Property Group 部分。
3. 您会看到 character 输入的一个下拉列表。
4. 从 Main 视图模型中选择您的嵌套 `character` 属性。

![选择 VM 输入](/images/scripting/select-vm-input.png)

### 读取和写入视图模型属性

连接后，您可以直接从脚本中访问嵌套的视图模型：

```lua
function moveCharacter(self: MyNode)
  print('当前 x: ', self.character.x.value)
  self.character.x.value = 10
end
```

因为 character 是一个视图模型实例，您可以访问它的所有公开属性：

```lua
self.character.<属性名>.value
```
