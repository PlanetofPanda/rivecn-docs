---
title: "文本 (Text)"
description: "⚠️ 已弃用：请在运行时使用数据绑定 (Data Binding) 而不是直接操作文本运行 (text run)"
---

::: warning
**弃用通知**：本页面全部文档均针对旧版文本操作系统。**对于新项目：** 请改用 [数据绑定 (Data Binding)](/runtimes/data-binding)。**对于现有项目：** 请计划尽快从直接操作文本运行 (text run) 迁移到数据绑定。
:::

有关设计和制作文本动画的更多信息，请参阅编辑器的文本章节：

**[文本 (Text)](/editor/text/)**

## 在运行时读取/更新文本运行 (Read/Update Text Runs at Runtime)

::: warning
**⚠️ 旧版内容警告**：以下章节针对已弃用的文本操作系统提供文档。**本内容仅为旧版支持目的而提供。** 新的实现应使用 [数据绑定 (Data Binding)](/runtimes/data-binding)。
:::

如果您打算在运行时更新 **文本运行 (text run)**，务必在编辑器中手动为该文本运行输入一个 _唯一名称_：

![图像](/images/runtimes/3114789e-e298-458e-8d9b-00ca71db658d.webp)

然后导出该名称：**右键点击**并选择 **Export name (导出名称)**。

![图像](/images/runtimes/b729291c-f915-4ce0-b2fa-f6d6a742141c.webp)

如果导出的组件周围包围着方括号，则表示已导出。这使得文本运行可以在运行时通过其名称被“发现”。有关更多信息，请参阅 [为运行时导出 (Exporting for Runtime)](/editor/exporting/exporting-for-runtime)。

::: warning
**如果在编辑器中未手动设置名称，该名称将不会包含在导出的 *.riv* 文件中（以减小文件大小）。**
:::

::: info
文本运行也可以在运行时的组件上更新，见下文的 [在运行时读取/更新嵌套文本运行 (Read/Update Nested Text Runs at Runtime)](#在运行时读取更新嵌套文本运行-readupdate-nested-text-runs-at-runtime)。
:::

### Web

#### 示例 (Examples)

- [在运行时更新文本 - 本地化示例](https://codesandbox.io/p/sandbox/rive-text-js-x9jn5w)

#### 高级 API 用法

**读取文本**

要随时读取给定文本运行的文本值，请引用 Rive 实例上的 `.getTextRunValue()` API：

```javascript
        public getTextRunValue(textRunName: string): string | undefined
```

提供文本运行名称，您将获得返回的 Rive 文本运行值；如果无法查询到该文本运行，则返回 `undefined`。

**设置文本**

要随时设置给定文本运行的值，请引用 Rive 实例上的 `.setTextRunValue()` API：

```javascript
        public setTextRunValue(textRunName: string, textRunValue: string): void
```

提供文本运行名称和第二个参数 `textValue`（即您想要设置的新文本字符串值），如果可以在活跃画板上成功查询到该文本运行，则设置成功。

#### 用法示例

```javascript
        import {Rive} from '@rive-app/canvas'

        const r = new Rive({
        src: "my-rive-file.riv"
        artboard: "my-artboard-name",
        autoplay: true,
        stateMachines: "State Machine 1",
        onLoad: () => {
            console.log("我的设计时文本是：", r.getTextRunValue("MyRun"));
            r.setTextRunValue("MyRun", "新的文本值");
        },
        })
```

#### 低级 API 用法

获取 Rive `Artboard` 的引用，通过给定 **名称** 查找文本运行，并获取/更新文本值属性。

```javascript
        import RiveCanvas from '@rive-app/canvas-advanced';

        const bytes = await (
        await fetch(new Request('./my-rive-file.riv'))
        ).arrayBuffer();
        const myRiveFile = await rive.load(new Uint8Array(bytes));

        const artboard = myRiveFile.defaultArtboard();
        const textRun = artboard.textRun("MyRun"); // 通过文本运行名称查询
        console.log(`我的设计时文本是 ${textRun.text}`);
        textRun.text = "Hello JS Runtime!";
```

### React

#### 示例 (Examples)

- [在运行时更新文本 - 本地化示例](https://codesandbox.io/p/sandbox/rive-text-react-38lt4k)

#### 读取文本

要随时读取给定文本运行的文本值，请引用从 `useRive` 返回的 `rive` 实例上的 `.getTextRunValue()` API：

```javascript
        public getTextRunValue(textRunName: string): string | undefined
```

提供文本运行名称，您将获得返回的 Rive 文本运行值；如果无法查询到该文本运行，则返回 `undefined`。

#### 设置文本

要随时设置给定文本运行的值，请引用从 `useRive` 返回的 `rive` 实例上的 `.setTextRunValue()` API：

```javascript
        public setTextRunValue(textRunName: string, textRunValue: string): void
```

提供文本运行名称和第二个参数 `textValue`（即您想要设置的新文本字符串值），如果可以在活跃画板上成功查询到该文本运行，则设置成功。

#### 用法示例

```javascript
        import { useRive } from '@rive-app/canvas';

        const MyTextComponent = () => {
        const {rive, RiveComponent} = useRive({
            src: "my-rive-file.riv",
            artboard: "New Artboard",
            stateMachines: "State Machine 1",
            autoplay: true,
        });

        // 无法立即查询文本运行，您必须等待直到 `rive`
        // 具有值并已实例化后再查询或设置文本运行值
        useEffect(() => {
            if (rive) {
            console.log("Rive 初始文本为：", rive.getTextRunValue("MyRun"));
            rive.setTextRunValue("MyRun", "新文本！！");
            console.log("Rive 现在文本为：", rive.getTextRunValue("MyRun"));
            }
        }, [rive]);

        return (
            <RiveComponent />
        );
        };
```

### React Native

### 新版运行时 (推荐)

#### 通过数据绑定设置文本

此功能已弃用。我们建议使用 [数据绑定 (Data Binding)](/runtimes/data-binding) 来控制文本。

```javascript
                export default function TextRunExample() {
                  const { riveViewRef, setHybridRef } = useRive();
                  const { riveFile } = useRiveFile(
                    require('../../assets/rive/hello_world_text.riv')
                  );

                  useEffect(() => {
                    if (riveViewRef) {
                      try {
                        console.log(riveViewRef.getTextRunValue('name'));
                        riveViewRef.setTextRunValue('name', 'React Native');
                        console.log(riveViewRef.getTextRunValue('name'));
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }, [riveViewRef]);

                  return (
                    <View style={styles.container}>
                      <View style={styles.riveContainer}>
                        {riveFile ? (
                          <RiveView
                            style={styles.rive}
                            autoPlay={true}
                            fit={Fit.Contain}
                            file={riveFile}
                            hybridRef={setHybridRef}
                          />
                        ) : null}
                      </View>
                    </View>
                  );
                }
```

### 旧版运行时

#### 通过 Rive Ref 设置文本

要随时设置给定文本运行的值，请引用 Rive `ref` 上的 `.setTextRunValue()` API：

```javascript
                setTextRunValue: (textRunName: string, value: string) => void;
```

提供文本运行名称和第二个参数 `textValue`（即您想要设置的新字符串文本值）。

#### 用法示例

```javascript
                export default function DynamicText() {
                const riveRef = useRef<RiveRef>(null);

                const handleInputChange = (e: string) => {
                    // 设置 'name' 文本运行的 TextRun 值
                    // 名称必须存在，否则将抛出错误
                    riveRef.current?.setTextRunValue('name', e);
                };

                return (
                    <SafeAreaView style={styles.safeAreaViewContainer}>
                    <ScrollView>
                        <Rive
                        ref={riveRef}
                        resourceName="hello_world_text"
                        stateMachineName="State Machine 1"
                        />
                        <TextInput
                        onChangeText={handleInputChange}
                        defaultValue="world"
                        />
                    </ScrollView>
                    </SafeAreaView>
                );
                }
```

### Flutter

在 `Artboard` 实例上获取/设置文本运行值。

::: tip
我们建议改用 [数据绑定 (Data Binding)](/editor/data-binding/overview) 来在运行时更新文本。
:::

```dart 获取/设置文本运行值
        final controller = RiveWidgetController(riveFile);
        final artboard = controller.artboard;

        // 获取文本运行值
        artboard.getText(value)
        // 可选路径参数，用于在组件实例级别获取文本运行值
        artboard.getText(value, path: path)

        // 设置文本运行值
        artboard.setText(value)
        // 可选路径参数，用于在组件实例级别设置文本运行值
        artboard.setText(value, path: path)
```

### Apple

#### 读取文本

要随时读取给定文本运行的文本值，请引用 `RiveViewModel` 上的 `.getTextRunValue()` API：

```swift
        open func getTextRunValue(_ textRunName: String) -> String?
```

提供文本运行名称，您将获得返回的 Rive 文本运行值；如果无法查询到该文本运行，则返回 `nil`。

#### 设置文本

要随时设置给定文本运行的值，请引用 `RiveViewModel` 上的 `.setTextRunValue()` API：

```swift
        open func setTextRunValue(_ textRunName: String, textValue: String) throws
```

提供文本运行名称和第二个参数 `textValue`（即您想要设置的新文本字符串值）。

::: info
如果无法在活跃画板上查询到所提供的 `textRunName` Rive 文本运行，Rive 将抛出 `RiveError.textValueRunError`，您可能需要在应用程序中捕获并优雅地处理。
:::

#### 用法示例

```swift
        @State private var userInput: String = ""
        @State private var rvm = RiveViewModel(fileName: "my-rive-file")

        var body: some View {
            VStack(spacing: 20) {
                Text("输入文本：")
                    .font(.headline)
                TextField("请输入...", text: $userInput)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                    .onChange(of: userInput, perform: { newValue in
                        if (!newValue.isEmpty) {
                            try! rvm.setTextRunValue("MyTextRunName", textValue: userInput)
                        }
                    })
                rvm.view()
            }
        }
```

### Android

#### 通过 RiveAnimationView 读取文本

要随时读取给定文本运行的文本值，请引用 `RiveAnimationView` 上的 `.getTextRunValue()` API：

```kotlin
        fun getTextRunValue(textRunName: String): String? = try
```

提供文本运行名称，您将获得返回的 Rive 文本运行值；如果无法查询到该文本运行，则返回 `null`。

#### 通过 RiveAnimationView 设置文本

要随时设置给定文本运行的值，请引用 `RiveAnimationView` 上的 `.setTextRunValue()` API：

```kotlin
        fun setTextRunValue(textRunName: String, textValue: String)
```

提供文本运行名称和第二个参数 `textValue`（即您想要设置的新文本字符串值）。

::: info
如果无法在活跃画板上查询到所提供的 `textRunName` Rive 文本运行，Rive 将抛出 `RiveException`，您可能需要在应用程序中捕获并优雅地处理它。
:::

#### 引用 Rive TextRun

您也可以选择直接向活跃画板查询 Rive 文本运行引用，并手动获取/设置文本属性。

```kotlin
        private val textRun by lazy(LazyThreadSafetyMode.NONE) {
            yourRiveAnimationView.artboardRenderer?.activeArtboard?.textRun("name")
        }
```

#### 用法示例

```kotlin
        import android.os.Bundle
        import android.text.Editable
        import android.text.TextWatcher
        import android.util.Log
        import android.widget.EditText
        import androidx.appcompat.app.AppCompatActivity
        import app.rive.runtime.kotlin.RiveAnimationView

        class DynamicTextActivity : AppCompatActivity(), TextWatcher {
            private val animationView by lazy(LazyThreadSafetyMode.NONE) {
                findViewById<RiveAnimationView>(R.id.dynamic_text)
            }

            override fun onCreate(savedInstanceState: Bundle?) {
                super.onCreate(savedInstanceState)
                setContentView(R.layout.dynamic_text)
                val editText = findViewById<EditText>(R.id.text_run_value)
                editText.addTextChangedListener(this)
            }

            override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {
                // 获取引用的当前值
                animationView.getTextRunValue("name")
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                // 更新引用
                animationView.setTextRunValue("name", s.toString())
            }
        }
```

## 在运行时读取/更新嵌套文本运行 (Read/Update Nested Text Runs at Runtime)

::: warning
**⚠️ 已弃用功能**：嵌套文本运行是旧版文本操作系统的部分功能。**请改用数据绑定 (Data Binding)** 来控制运行时的组件文本属性。
:::

可以在运行时设置嵌套文本运行——即不在主画板上而是在 [组件 (Component)](/editor/fundamentals/components) 上的文本。要设置嵌套文本运行，您需要记下输入在画板级别所在的路径。

例如，要在 **Button** 画板上获取/设置名为 **button_text** 的文本运行，您需要提供正确的路径。

![设置嵌套文本运行](/images/runtimes/51848b07-5a82-4fc9-ab3f-0505336fcce3.webp)
_设置嵌套文本运行_

此处的画板名称为：

- **Main** -> **NestedArtboard** -> **Button**

![图像](/images/runtimes/fc5b5be2-546f-44d0-ad85-f7a8da64973b.webp)

但是，路径是根据层次结构中设置的名称确定的：

- **ArtboardWithUniqueName** -> **ButtonWithUniqueName**

路径随后为：`ArtboardWithUniqueName/ButtonWithUniqueName`

::: warning
务必将组件和文本运行标记为已导出（Exported）。

![导出组件名称](/images/runtimes/618066cd-2909-420e-b94b-d3eb920fe389.webp) *导出组件名称*
:::

::: warning
不要在组件名称中使用 "/"，因为那将破坏运行时的搜索功能。
:::

### Web

#### 示例 (Examples)

- [在运行时更新嵌套文本 - 本地化示例](https://codesandbox.io/p/sandbox/rive-text-nested-js-pzs9lf)

#### 高级 API 用法

**读取文本**

要读取特定路径下的给定文本运行值，请引用 Rive 实例上的 `.getTextRunValueAtPath()` API：

```javascript
        public getTextRunValueAtPath(textRunName: string, path: string): string | undefined
```

提供文本运行名称及其所在的路径，您将获得返回的 Rive 文本运行值；如果无法查询到该文本运行，则返回 `undefined`。

**设置文本**

要设置特定路径下的给定文本运行值，请引用 Rive 实例上的 `.setTextRunValueAtPath()` API：

```javascript
        public setTextRunValueAtPath(textRunName: string, textRunValue: string, path: string): void
```

在组件实例级别提供 `textRunName`、新的 `textValue` 以及该文本运行所在的 `path`。

#### 用法示例

```javascript
        import {Rive} from '@rive-app/canvas'

        const r = new Rive({
        src: "my-rive-file.riv"
        artboard: "my-artboard-name",
        autoplay: true,
        stateMachines: "State Machine 1",
        onLoad: () => {
            console.log("我的设计时文本是：", r.getTextRunValueAtPath("MyRun", "path/to/run"));
            r.setTextRunValueAtPath("MyRun", "新文本值", "path/to/run");
        },
        })
```

### React

#### 示例 (Examples)

- [在运行时更新嵌套文本 - 本地化示例](https://codesandbox.io/p/sandbox/rive-nested-text-react-hktjgr)

#### 读取文本

要读取特定路径下的给定文本运行值，请引用从 `useRive` 返回的 `rive` 实例上的 `.getTextRunValueAtPath()` API：

```javascript
        public getTextRunValueAtPath(textRunName: string, path: string): string | undefined
```

提供文本运行名称和路径，您将获得返回的 Rive 文本运行值；如果无法查询到该文本运行，则返回 `undefined`。

#### 设置文本

要设置特定路径下的给定文本运行值，请引用从 `useRive` 返回的 `rive` 实例上的 `.setTextRunValueAtPath()` API：

```javascript
        public setTextRunValueAtPath(textRunName: string, textRunValue: string, path: string): void
```

提供 `textRunName`、新的 `textRunValue` 以及它所在的组件 `path`。

#### 用法示例

```javascript
        import { useRive } from '@rive-app/canvas';

        const MyTextComponent = () => {
        const {rive, RiveComponent} = useRive({
            src: "my-rive-file.riv",
            artboard: "New Artboard",
            stateMachines: "State Machine 1",
            autoplay: true,
        });

        // 无法立即查询文本运行，您必须等待直到 `rive`
        // 具有值并已实例化后再查询或设置文本运行值
        useEffect(() => {
            if (rive) {
            console.log("Rive 初始文本为：", rive.getTextRunValueAtPath("MyRun", "path/to/run"));
            rive.setTextRunValueAtPath("MyRun", "新文本！！", "path/to/run");
            console.log("Rive 现在文本为：", rive.getTextRunValue("MyRun, "path/to/run");
            }
        }, [rive]);

        return (
            <RiveComponent />
        );
        };
```

### Flutter

在 `Artboard` 实例上获取/设置嵌套文本运行值。

::: tip
我们建议改用 [数据绑定 (Data Binding)](/editor/data-binding/overview) 在运行时更新文本。
:::

```dart 获取/设置文本运行值
        final controller = RiveWidgetController(riveFile);
        final artboard = controller.artboard;

        // 使用其路径参数在组件实例级别获取文本运行值
        artboard.getText(value, path: path)

        // 使用其路径参数在组件实例级别设置文本运行值
        artboard.setText(value, path: path)
```

### Apple

#### 读取文本

与 [从父画板内的文本运行中读取文本](#读取文本) 类似，您可以使用以下 API 设置组件实例内文本运行的值：

```swift
        open func getTextRunValue(_ textRunName: String, path: String) -> String?
```

#### 设置文本

同样，与 [在父画板中设置文本](#设置文本) 类似，您可以使用以下 API 读取组件实例内文本运行的值：

```swift
        open func setTextRunValue(_ textRunName: String, textValue: String, path: String) throws
```

#### 示例：

```swift
        @State private var userInput: String = ""
        @State private var rvm = RiveViewModel(fileName: "my-rive-file")

        var body: some View {
            VStack(spacing: 20) {
                Text("输入文本：")
                    .font(.headline)
                TextField("请输入...", text: $userInput)
                    .textFieldStyle(RoundedBorderTextFieldStyle())
                    .padding()
                    .onChange(of: userInput, perform: { newValue in
                        if (!newValue.isEmpty) {
                            try! rvm.setTextRunValue("MyTextRunName", textValue: userInput, path: "Artboard/NestedArtboard")
                        }
                    })
                rvm.view()
            }
        }
```

### Android

#### 通过 RiveAnimationView 读取文本

要随时读取给定文本运行的文本值，请引用 `RiveAnimationView` 上的 `.getTextRunValue()` API：

```kotlin
        fun getTextRunValue(textRunName: String, path: String): String? = try
```

提供文本运行名称及其所在的路径，您将获得返回的 Rive 文本运行值；如果无法查询到该文本运行，则返回 `null`。

#### 通过 RiveAnimationView 设置文本

要随时设置给定文本运行的值，请引用 `RiveAnimationView` 上的 `.setTextRunValue()` API：

```kotlin
        fun setTextRunValue(textRunName: String, textValue: String, path: String)
```

提供文本运行名称、第二个参数 `textValue`（即您想要设置的新文本字符串值），以及文本运行在画板级别所在的 `path` 值。

如果无法在活跃画板上查询到所提供的 `textRunName` Rive 文本运行，Rive 将抛出 `RiveException`，您可能需要在应用程序中捕获并优雅地处理。

#### 引用 Rive TextRun

您也可以选择向活跃画板查询 Rive 文本运行引用，并手动获取/设置文本属性。

```kotlin
        private val textRun by lazy(LazyThreadSafetyMode.NONE) {
            yourRiveAnimationView.artboardRenderer?.activeArtboard?.textRun("name", "path/to/artboard")
        }
```

### Unity

要在嵌套的按钮画板上设置 `button_text` 文本运行值，上述示例的代码片段如下：

```csharp
        m_file = Rive.File.Load(asset);
        m_artboard = m_file.Artboard(0);

        // 设置嵌套文本运行值
        m_artboard.SetTextRunValueAtPath("button_text", "ArtboardWithUniqueName/ButtonWithUniqueName", "点我！");

        // 获取嵌套文本运行值
        string buttonText = m_artboard.GetTextRunValueAtPath("button_text", "ArtboardWithUniqueName/ButtonWithUniqueName");
```

#### API 方法：

- `void SetTextRunValueAtPath(string runName, string path, string value)`
- `string GetTextRunValueAtPath(string runName, string path)`

这些方法允许您通过指定运行名称和画板层次结构中的路径，与嵌套的文本运行进行交互。通过这种方式，您可以继续构建路径来访问更深层次的嵌套文本运行，例如：`"Artboard-Nested-Level1/Arboard-Nested-Level2/Artboard-Nested-Level3"` 等。

## 无障碍语义 (Semantics for Accessibility)

::: tip
我们建议改用 [数据绑定 (Data Binding)](/editor/data-binding/overview)，因为您可以进行双向文本绑定。
:::

由于 Rive 文本本身不使用底层平台的文本 API，因此需要采取额外步骤以确保它可以被屏幕阅读器读取。

以下代码片段提供了关于如何为 Rive 动画添加语义标签的指南。请查看相应平台/SDK 的开发人员文档以了解有关无障碍关怀的更多信息。

### Flutter

有关更多信息，请参阅 Flutter 的 [无障碍文档](https://docs.flutter.dev/accessibility-and-localization/accessibility)。在此示例中，您将使用 [Semantics 小部件](https://api.flutter.dev/flutter/widgets/Semantics-class.html) 来提供一个反映 Rive 文本组件当前值的标签。

```dart
        ...

        final controller = RiveWidgetController(riveFile);
        final textValue = controller.artboard.getText('some_text_run_name').value;
        String semanticLabel = textValue;

        ...

        Semantics(
            label: semanticLabel,
            child: RiveWidget(controller: controller);
        ),
```

### Web (JS)

#### 添加 ARIA Label

至少——如果对所有用户传达 Rive 动画中显示的文本值很重要，请为 `<canvas>` 元素添加一个 `aria-label`，其中包含动画中的文本值。屏幕阅读器在解析 DOM 内容时可能会立即朗读此标签。您还需要向 `<canvas>` 元素添加 `role="img"`。

```javascript
        <canvas
            id="rive-canvas"
            width={500}
            height={500}
            role="img"
            aria-label="你好朋友，欢迎来到我的页面"
        ></canvas>
```

#### 添加 ARIA Live Region

虽然 ARIA 标签是让屏幕阅读器在解析 Web 内容时朗读文本标签的一种直接方法，但使用 ARIA live region 则为您提供了一种控制屏幕阅读器何时朗读动态文本内容的方法。

Live regions（活跃区域）在 Rive 图形中的文本内容由于状态机中特定状态的转变而变为可见或发生改变时非常有用，且您希望屏幕阅读器捕捉到文本变化。另一个用例是，当您只希望屏幕阅读器在 `<canvas>` 滚动到视野中时朗读 Rive 文本内容。

在 [此处](https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/ARIA_Live_Regions) 阅读有关 ARIA live regions 的更多信息。

#### 示例：评分图形 (Rating Graphic)

::: info
要尝试此示例，请访问此 [CodeSandbox 链接](https://codesandbox.io/p/sandbox/rive-rating-ally-example-ptydr8)
:::

假设您正在显示一个极具交互性的 Rive 图形，允许用户在 1-5 星之间选择评分。点击不同星星的用户可以通过动画直观地看到状态机的运行状况并了解点击了哪颗星，但屏幕阅读器可能需要一种方式来播报当其他用户（例如通过键盘控制在画布中导航）选择了什么选项。

其 HTML 可能如下所示：

```javascript
        <canvas
        role="img"
        tabindex="0"
        aria-describedby="rating-animation-live"
        id="canvas"
        ></canvas>
        <p id="rating-animation-live" class="sr-only" aria-live="assertive">
        一个交互式评分模拟。使用左右箭头键选择评分
        </p>
```

注意，`<canvas>` 元素具有一个 `aria-describedby` 属性，其值与下方 `<p>` 的 `id` `#rating-animation-live` 相匹配。这使得 `<p>` 块内容能够描述 `<canvas>` 元素。与使用 `aria-label` 类似，我们也向画布添加了 `role="img"` 属性。`aria-live="assertive"` 属性描述了当此 `<p>` 内的内容发生变化时，如何中断屏幕阅读器的朗读流。

让我们看看使用 Rive Web (JS) 运行时的 JS 是什么样子的：

```javascript
        const rive = require("@rive-app/canvas");
        const dynamicTextEl = document.getElementById("rating-animation-live");

        const r = new rive.Rive({
        src: "rating.riv",
        canvas: document.getElementById("canvas"),
        stateMachines: "State Machine 1",
        autoplay: true,
        onLoad: () => {
            r.setTextRunValue("RatingRun", "0");
            r.resizeDrawingSurfaceToCanvas();
            // 更多功能请参见上方的 CodeSandbox 链接
        },
        onStateChange: (e) => {
            const name = e.data[0];
            const ratingStr = name.charAt(0);
            const ratingNum = parseInt(ratingStr);
            if (!isNaN(ratingNum)) {
            const ratingString = name
                .split("_")
                .reduce((acc, temp) => {
                return (acc += ` ${temp}`);
                }, "")
                .trim();
            r.setTextRunValue("RatingRun", ratingStr);

            dynamicTextEl.innerHTML = `评分：${ratingString}`;
            }
        }
        });
```

在上面的片段中，我们创建了一个 Rive 实例，并且随着状态机中状态的改变，我们正在用评分字符串动态更新 live region（活跃区域，由 `dynamicTextEl` 表示）的内容。由于该活跃区域具有 `aria-live="assertive"` 属性，屏幕阅读器应该朗读更新后的动态文本内容。

## 其他资源：

- [无障碍 Web 动画：ARIA live regions](https://rive.app/blog/accesible-web-animations-aria-live-regions)
