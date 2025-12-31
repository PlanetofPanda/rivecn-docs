---
title: "布局 (Layout)"
description: "Rive 提供了多种选项来控制图形在画布 (canvas)、视图 (view)、小部件 (widget) 或纹理 (texture) 中的布局方式。"
---

import { Demos } from "/snippets/demos.jsx";

## 响应式布局 (Responsive Layout)

Rive 的布局 (Layout) 功能允许您设计可调整大小的画板，并直接在图形中配置内置的响应式行为。只需在运行时将 **Fit** 设置为 **Layout** 类型，画板就会自动调整大小。可选地，提供 **布局缩放因子 (Layout Scale Factor)** 以进一步调整内容的缩放。

有关更多编辑器信息以及如何配置图形，请参见 [布局概述 (Layouts Overview)](/editor/layouts/layouts-overview)。

::: info
- 当 **Fit** 设置为 **Layout** 类型时，**对齐 (Alignment)** 属性将不起作用。
- **LayoutScaleFactor** 属性仅适用于 **Layout** 类型的 **Fit**。
:::

### Web

**步骤**

1. 将 `fit` 设置为 `Fit.Layout`——这将在调用 `resizeDrawingSurfaceToCanvas()` 时，自动缩放并调整画板大小以匹配画布大小。
2. 可选设置 `layoutScaleFactor` 以手动控制画板大小（缩放因子）。
3. 订阅 `window.onresize` 并调用 `resizeDrawingSurfaceToCanvas()`，以便随着画布和窗口的变化调整画板大小。
4. 订阅 **设备像素比 (device pixel ratio)** 变化并调用 `resizeDrawingSurfaceToCanvas()`，以确保画板在各种屏幕密度上正确更新。例如，在具有不同设备像素比的多个显示器之间拖动窗口时。

```javascript
    <style>
      body {
        background: #f0f0f0;
        margin: 0;
        overflow: hidden;
      }

      canvas {
        background-color: red;
        display: block;
        width: 100vw;
        height: 100vh;
      }
    </style>

    <canvas id="riveCanvas"></canvas>

    <script src="https://unpkg.com/@rive-app/canvas@latest"></script>

    <script>
      const rive = new Rive({
        src: "your-rive-file.riv",
        autoplay: true,
        canvas: riveCanvas,
        layout: new Layout({
          fit: Fit.Layout,
          // layoutScaleFactor: 2, // 布局的 2 倍缩放。当使用 `Fit.Layout` 时，这允许您根据需要调整布局。
        }),
        stateMachines: ["State Machine 1"],
        onLoad: () => {
          computeSize();
        },
      });

      function computeSize() {
        rive.resizeDrawingSurfaceToCanvas();
      }

      // 订阅窗口大小变化并调用 `resizeDrawingSurfaceToCanvas`
      window.onresize = computeSize;

      // 订阅 devicePixelRatio 变化并调用 `resizeDrawingSurfaceToCanvas`
      window
        .matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`)
        .addEventListener("change", computeSize);
    </script>
```

### React

**步骤**

1. 在 `Layout` 对象中将 `fit` 设置为 `Fit.Layout`——这将自动缩放并调整画板大小以匹配画布大小。
2. 将 `Layout` 对象传递给 `useRive` 中的 `layout` 属性。
3. 可选在 `Layout` 对象中设置 `layoutScaleFactor` 以手动控制画板的缩放因子。
4. React 运行时会自动处理窗口大小调整和设备像素比的变化。

```jsx
    import { useRive, Layout, Fit } from "@rive-app/react-canvas";

    export const RiveComponent = () => {
      const { RiveComponent } = useRive({
        src: "your-rive-file.riv",
        stateMachines: "State Machine 1",
        layout: new Layout({
          fit: Fit.Layout,
          // layoutScaleFactor: 2, // 可选：布局的 2 倍缩放
        }),
        autoplay: true,
      });

      return <RiveComponent />;
    };
```

### React Native

### 新版运行时 (推荐)

**步骤**

1. 将 `fit` 设置为 `Fit.Layout`——这将自动缩放并调整画板大小以匹配视图大小。
2. 可选设置 `layoutScaleFactor` 以手动控制画板大小（缩放因子）。如果未设置，图形将使用设备的 DPI 进行缩放。

```javascript
        export default function ResponsiveLayoutsExample() {
          const { riveFile, isLoading, error } = useRiveFile(
            require('path/to/file.riv')
          );
          const [scaleFactor, setScaleFactor] = useState(4.0);
          const riveRef = useRef<RiveViewRef>(null);
          const { width, height } = useWindowDimensions();

          useEffect(() => {
            riveRef.current?.playIfNeeded();
          }, [width, height]);

          const increaseScale = () => {
            setScaleFactor((prev) => prev + 0.5);
            riveRef.current?.playIfNeeded();
          };
          const decreaseScale = () => {
            setScaleFactor((prev) => Math.max(0.5, prev - 0.5));
            riveRef.current?.playIfNeeded();
          };

          return (
            <View style={styles.container}>
              {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
              ) : riveFile ? (
                <RiveView
                  hybridRef={{ f: (ref) => (riveRef.current = ref) }}
                  file={riveFile}
                  fit={Fit.Layout}
                  layoutScaleFactor={scaleFactor}
                  style={styles.rive}
                  autoPlay={true}
                />
              ) : null}
              <View style={styles.controls}>
                <Text style={styles.label}>布局缩放因子 (Layout Scale Factor)</Text>
                <View style={styles.scaleControls}>
                  <Button title="-" onPress={decreaseScale} />
                  <View style={styles.scaleText}>
                    <Text>{scaleFactor.toFixed(1)}x</Text>
                  </View>
                  <Button title="+" onPress={increaseScale} />
                </View>
              </View>
            </View>
          );
        }
```

::: info
调用 `playIfNeeded()` 确保图形在更改后进行视觉更新。将来这将自动处理。
:::

### 旧版运行时

**示例 (Examples)**

- [React Native 布局示例](https://github.com/rive-app/rive-react-native/blob/main/example/app/(examples)/ResponsiveLayout.tsx)

**步骤**

1. 将 `fit` 设置为 `Fit.Layout`——这将自动缩放并调整画板大小以匹配画布大小。
2. 可选在 `Layout` 对象中设置 `layoutScaleFactor` 以手动控制画板的缩放因子。
3. React Native 运行时会自动处理窗口大小调整和设备像素比的变化。

```javascript
        import Rive, { Fit } from 'rive-react-native';

        const resourceName = 'layout_test';

        export default function ResponsiveLayout() {
          return (
            <Rive
              autoplay={true}
              fit={Fit.Layout}
              layoutScaleFactor={0.5} // 如果不设置（或设置等于 "-1.0"），Rive 会自动根据设备像素比缩放布局
              resourceName={resourceName}
              artboardName={'Artboard'}
              stateMachineName={'State Machine 1'}
            />
          );
        }
```

### Flutter

将 `Fit.layout` 传递给 `RiveWidget` 小部件。这将自动缩放并调整画板大小以匹配小部件大小。
您还可以设置 `layoutScaleFactor` 来控制画板的缩放。这在调用 `Fit.layout` 时调整画板大小非常有用。

```dart
    return RiveWidget(
      controller: controller,
      fit: Fit.layout,
      layoutScaleFactor: 2.0, // 可选：布局的 2 倍缩放
    );
```

或者，您也可以直接在任何 `RivePainter` 上设置 `fit` 和 `layoutScaleFactor` 属性，例如 `RiveWidgetController`：

```dart
    final controller = RiveWidgetController(riveFile);
    controller.fit = Fit.layout;
    controller.layoutScaleFactor = 2.0; // 可选：布局的 2 倍缩放
```

### Apple

**示例 (Examples)**

- [SwiftUI](https://github.com/rive-app/rive-ios/blob/main/Example-iOS/Source/Examples/SwiftUI/SwiftLayout.swift)

**步骤**

1. 将 `RiveViewModel` 实例上的 `fit` 设置为 `layout`
2. 可选地在 `RiveViewModel` 上设置 `layoutScaleFactor` 以手动控制画板的缩放因子。

::: info
要启用自动确定缩放因子，请将 `.layoutScaleFactor` 设置为 `RiveViewModel.layoutScaleFactorAutomatic`。这是默认值，相当于 `-1`。设置后，Rive 将监听视图模型视图的窗口和屏幕变化，并自动为当前视图层次结构应用正确的缩放因子。
:::

```swift
    let viewModel = RiveViewModel(fileName: "...")
    viewModel.fit = .layout
    viewModel.layoutScaleFactor = RiveViewModel.layoutScaleFactorAutomatic // 允许 Rive 确定缩放因子
    viewModel.layoutScaleFactor = 2.0 // 或者，明确设置缩放因子
```

### Android

**示例 (Examples)**

参见 [布局 (Layout)](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LayoutActivity.kt) 示例。

**步骤**

1. 在 XML 中将 `riveLayout` 类型设置为 `"LAYOUT"`：

```kotlin
    <app.rive.runtime.kotlin.RiveAnimationView
        ...
        app:riveFit="LAYOUT"
    />
```

2. 或者，使用对 `RiveAnimationView` 的引用并将 `fit` 属性设置为 `LAYOUT`：

```kotlin
    val animationView = findViewById<RiveAnimationView>(R.id.my_view)
    animationView.fit = Fit.LAYOUT
```

3. 要调整内容缩放因子，请使用 `layoutScaleFactor` 属性。这是可空的，因此默认情况下它将使用 `resources.displayMetrics.density` 报告的密度。您可以将其覆盖为任何正浮点值，或通过重置为 `null` 将控制权返回给系统：

```kotlin
    // 强制设置缩放因子
    animationView.layoutScaleFactor = 2.5f
    // 重置为系统控制
    animationView.layoutScaleFactor = null
```

4. 此外，画板大小可以通过使用 `width` 和 `height` 属性进行控制。`resetArtboardSize()` 可用于将这些值恢复为默认值：

```kotlin
    // 强制特定的画板大小
    animationView.controller.activeArtboard?.width = 1000f
    animationView.controller.activeArtboard?.height = 1000f
    // 将画板大小重置为默认值
    animationView.controller.activeArtboard?.resetArtboardSize()
```

## 其他布局选项 (Additional Layout Options)

如果图形不使用 Rive 的布局 (Layout) 功能，您可以使用其他 **Fit (适配方式)** 选项和 **Alignment (对齐方式)** 设置来配置布局。有关 **Fit** 和 **Alignment** 的更多信息，请参阅以下章节。

### Web

使用 `Layout` 对象来配置 `Fit` 和 `Alignment`。有关所有枚举选项，请参见 [Fit](#适配方式-fit) 和 [Alignment](#对齐方式-alignment)。

```javascript
    <div>
        <canvas id="canvas" width="800" height="600"></canvas>
    </div>
    <script src="https://unpkg.com/@rive-app/canvas@latest"></script>
    <script>
        // 填充画布，并在必要时裁剪 Rive 内容
        let layout = new rive.Layout({
            fit: rive.Fit.Cover,
        });

        // 适配宽度并对齐至画布顶部
        layout = new rive.Layout({
            fit: rive.Fit.FitWidth,
            alignment: rive.Alignment.TopCenter,
        });

        // 将 Rive 内容限制在画布内的 (minX, minY), (maxX, maxY) 区域
        layout = new rive.Layout({
            fit: rive.Fit.Contain,
            minX: 50,
            minY: 50,
            maxX: 100,
            maxY: 100,
        });

        const r = new rive.Rive({
            src: 'https://cdn.rive.app/animations/vehicles.riv',
            canvas: document.getElementById('canvas'),
            layout: layout,
            autoplay: true
        });

        // 更新布局
        r.layout = new rive.Layout({ fit: rive.Fit.Fill });
    </script>
```

### React

使用 `Layout` 对象来配置 `Fit` 和 `Alignment`。有关所有枚举选项，请参见 [Fit](#适配方式-fit) 和 [Alignment](#对齐方式-alignment)。

```javascript
    import Rive, { Layout, Fit, Alignment } from '@rive-app/react-canvas';

    export const Simple = () => (
      <Rive
        src="https://cdn.rive.app/animations/vehicles.riv"
        layout={new Layout({ fit: Fit.Contain, alignment: Alignment.TopCenter })}
      />
    );
```

使用 `useRive` hook：

```javascript
    import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

    export default function Example() {
      const { RiveComponent } = useRive({
        src: 'my-file.riv',
        artboard: 'my-artboard',
        animations: 'my-animation',
        layout: new Layout({
          fit: Fit.Cover,
          alignment: Alignment.TopCenter,
        }),
        autoplay: true,
      });

      return <RiveComponent />;
    }
```

### React Native

### 新版运行时 (推荐)

直接在 `RiveView` 组件上设置 `Fit` 和 `Alignment` 的布局属性。有关所有枚举选项，请参见 [Fit](#适配方式-fit) 和 [Alignment](#对齐方式-alignment)。

```ts
        import {
          Alignment,
          Fit,
          RiveView,
          useRiveFile,
        } from '@rive-app/react-native';

        export default function LayoutExample() {
          const { riveFile } = useRiveFile(
            require('path/to/file.riv')
          );

          return (
            <View style={styles.container}>
              {riveFile ? (
                <RiveView
                  file={riveFile}
                  style={styles.rive}
                  fit={Fit.Contain}
                  alignment={Alignment.Center}
                />
              ) : null}
            </View>
          );
        }
```

### 旧版运行时

直接在 `Rive` 组件上设置 `Fit` 和 `Alignment` 的布局属性。有关所有枚举选项，请参见 [Fit](#适配方式-fit) 和 [Alignment](#对齐方式-alignment)。

```javascript
        import Rive, { Alignment, Fit } from 'rive-react-native';

        export default function Simple() {
          return (
            <ScrollView>
              <Rive
                fit={Fit.Cover}
                alignment={Alignment.TopCenter}
                resourceName="truck_v7"
              />
            </ScrollView>
          );
        };
```

### Flutter

将 `Fit` 和 `Alignment` 传递给 `RiveWidget` 小部件。

```dart
    return RiveWidget(
      controller: controller,
      fit: Fit.contain,
      alignment: Alignment.center,
    );
```

或者，您也可以直接在任何 `RivePainter` 上设置 `fit` 和 `alignment` 属性，例如 `RiveWidgetController`：

```dart
    final controller = RiveWidgetController(riveFile);
    controller.fit = Fit.contain;
    controller.alignment = Alignment.center;
```

### Apple

有关 `Fit` 和 `Alignment` 的值和说明，请参见以下章节。运行时提供以下枚举供在布局参数中设置：

- **Fit**
  - `.fill`
  - `.contain`
  - `.cover`
  - `.fitWidth`
  - `.fitHeight`
  - `.scaleDown`
  - `.noFit`

- **Alignment**
  - `.topLeft`
  - `.topCenter`
  - `.topRight`
  - `.centerLeft`
  - `.center`
  - `.centerRight`
  - `.bottomLeft`
  - `.bottomCenter`
  - `.bottomRight`

#### SwiftUI

以下示例显示了如何设置布局参数并在运行时进行切换：

```swift
    struct SwiftLayout: View {
        @State private var fit: RiveFit = .contain
        @State private var alignment: RiveAlignment = .center

        var body: some View {
            VStack {
                RiveViewModel(fileName: "fancy_rive_file", fit: fit, alignment: alignment).view()
            }
            HStack {
                Text("适配方式示例 (Some Fit Examples)")
            }
            HStack {
                Button("填充 (Fill)") { fit = .fill }
                Button("包含 (Contain)") { fit = .contain }
                Button("覆盖 (Cover)") { fit = .cover }
            }
            HStack {
                Text("对齐方式示例 (Some Alignment Examples)")
            }
            HStack {
                Button("左上 (Top Left)") { alignment = .topLeft }
                Button("中上 (Top Center)") { alignment = .topCenter }
                Button("右上 (Top Right)") { alignment = .topRight }
            }
        }
    }
```

#### UIKit

以下示例显示了如何设置布局参数并在运行时进行切换：

```swift
    class LayoutViewController: UIViewController {
        @IBOutlet weak var riveView: RiveView!
        var viewModel = RiveViewModel(fileName: "fancy_rive_file")

        override func viewDidLoad() {
            viewModel.setView(riveView)
        }

        @IBAction func fitButtonTriggered(_ sender: UIButton) {
            setFit(name: sender.currentTitle!)
        }

        @IBAction func alignmentButtonTriggered(_ sender: UIButton) {
            setAlignment(name: sender.currentTitle!)
        }

        func setFit(name: String) {
            var fit: RiveFit = .contain
            switch name {
            case "Fill": fit = .fill
            case "Contain": fit = .contain
            case "Cover": fit = .cover
            case "Fit Width": fit = .fitWidth
            case "Fit Height": fit = .fitHeight
            case "Scale Down": fit = .scaleDown
            case "None": fit = .noFit
            default: fit = .contain
            }
            viewModel.fit = fit
        }

        func setAlignment(name: String) {
            var alignment: RiveAlignment = .center
            switch name {
            case "Top Left": alignment = .topLeft
            case "Top Center": alignment = .topCenter
            case "Top Right": alignment = .topRight
            case "Center Left": alignment = .centerLeft
            case "Center": alignment = .center
            case "Center Right": alignment = .centerRight
            case "Bottom Left": alignment = .bottomLeft
            case "Bottom Center": alignment = .bottomCenter
            case "Bottom Right": alignment = .bottomRight
            default: alignment = .center
            }
            viewModel.alignment = alignment
        }
    }
```

### Android

在指定布局属性时，可以进一步自定义动画视图。

通过 `riveFit` 指定动画应如何调整大小以适应其容器。可用选项包括：`NONE`、`FILL`、`CONTAIN`、`COVER`、`FIT_WIDTH`、`FIT_HEIGHT`、`SCALE_DOWN` 和 `LAYOUT`。

`riveAlignment` 告知如何在容器内对齐。可用选项包括：`TOP_LEFT`、`TOP_CENTER`、`TOP_RIGHT`、`CENTER_LEFT`、`CENTER`、`CENTER_RIGHT`、`BOTTOM_LEFT`、`BOTTOM_CENTER` 和 `BOTTOM_RIGHT`。

有关这些值及其含义的更多信息，请参阅以下章节。

在资源布局文档 (Resource layout) 中指定布局值：

```kotlin
    <app.rive.runtime.kotlin.RiveAnimationView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:riveResource="@raw/off_road_car_blog"
        app:riveAlignment="TOP_CENTER"
        app:riveFit="FILL"
    />
```

或者在您的 Activity 代码中指定：

```kotlin
    animationView.fit = Fit.FILL
    animationView.alignment = Alignment.CENTER
```

## 适配方式 (Fit)

适配方式 (Fit) 决定了 Rive 内容如何适配到视图中。有多种选项可供选择：

- `Layout`：Rive 内容将根据画板的布局约束自动调整大小，以匹配底层视图的大小。有关如何使用此选项的更多信息，请参见 [上文](#响应式布局-responsive-layout)。
- `Cover`：Rive 将覆盖视图并保持纵横比。如果 Rive 内容的比例与视图不同，则会裁剪内容。
- `Contain`：**（默认）** Rive 内容将包含在视图中并保持纵横比。如果比例不同，视图的一部分将保持空白。
- `Fill`：Rive 内容将填充整个可用视图。如果纵横比不同，内容将被拉伸。
- `FitWidth`：Rive 内容将填满视图的宽度。这可能会导致内容被裁剪或视图空间留白。
- `FitHeight`：Rive 内容将填满视图的高度。这可能会导致内容被裁剪或视图空间留白。
- `None`：Rive 内容将按其画板的大小进行渲染，这可能会导致内容被裁剪或视图空间留白。
- `ScaleDown`：Rive 内容将按比例缩小以适应视图并保持纵横比。当内容大于画布时，这相当于 `Contain`；如果画布更大，则 `ScaleDown` 不会放大。

## 对齐方式 (Alignment)

对齐方式 (Alignment) 决定了内容相对于视图边界的对齐方式。有以下选项可供选择：

- `Center` **（默认值）**
- `TopLeft` (左上)
- `TopCenter` (中上)
- `TopRight` (右上)
- `CenterLeft` (居左)
- `CenterRight` (居右)
- `BottomLeft` (左下)
- `BottomCenter` (中下)
- `BottomRight` (右下)

## 边界 (Bounds)

可以通过提供最小和最大 x、y 坐标来设置渲染 Rive 内容区域的边界。这些坐标是相对于包含 Rive 内容的视图的，并且必须全部提供。这些设置将覆盖对齐方式设置。

- `minX`
- `minY`
- `maxX`
- `maxY`
