---
title: '画板 (Artboards)'
description: '在运行时选择画板'
---

更多关于在 Rive 中创建画板的信息，请参考：[画板](/editor/fundamentals/artboards)。

## 选择画板 (Choosing an artboard)

在实例化 Rive 对象时，可以指定要使用的画板。如果未指定，系统将使用 Rive 编辑器中设置的[默认画板](/editor/fundamentals/artboards#default-state-machine)。如果未设置默认画板，则使用第一个画板。

一次只能使用一个画板。

### Web

```javascript
    new rive.Rive({
        src: 'https://cdn.rive.app/animations/vehicles.riv',
        canvas: document.getElementById('canvas'),
        artboard: 'Truck',
        autoplay: true
    });
```

### React

```javascript
    export const Simple = () => (
      <Rive src="https://cdn.rive.app/animations/vehicles.riv" artboard="Truck" />
    );

    // 使用 `useRive` Hook:
    export default function Simple() {
      const { RiveComponent } = useRive({
          src: 'https://cdn.rive.app/animations/vehicles.riv',
          artboard: 'Truck',
          autoplay: true,
      });

      return <RiveComponent />;
    }
```

### React Native

```javascript
    export default function App() {
      return (
        <View>
          <Rive resourceName="truck_v7" artboardName="Jeep" autoplay />
        </View>
      );
    }
```

### Flutter

  手动创建画板：
```dart
  // 默认画板
  final artboard = riveFile.defaultArtboard();
  // 指定名称的画板
  final artboard = riveFile.artboard('Truck');
  // 指定索引处的画板
  final artboard = riveFile.artboardAt(0);
```

  在 `RiveWidgetController` 或 `RiveWidgetBuilder` 中指定要使用的画板：
```dart
  // 默认画板
  final artboardSelector = ArtboardSelector.byDefault();
  // 指定名称的画板
  final artboardSelector = ArtboardSelector.byName('Truck');
  // 指定索引处的画板
  final artboardSelector = ArtboardSelector.byIndex(0);

  // 传递给 RiveWidgetController
  final controller = RiveWidgetController(
    riveFile,
    artboardSelector: artboardSelector,
  );

  // 传递给 RiveWidgetBuilder
  return RiveWidgetBuilder(
    fileLoader: fileLoader,
    artboardSelector: ArtboardSelector.byName('Main'),
    builder: (context, state) {
      // 返回一个 widget
    },
  );  
```

### Apple

#### SwiftUI
```swift
    struct AnimationView: View {
        var body: some View {
            RiveViewModel(
                fileName: "dancing_banana",
                artboardName: "Banana"
            ).view()
        }
    }
```

#### UIKit
```swift
    class AnimationViewController: UIViewController {
        @IBOutlet weak var riveView: RiveView!

        var bananaVM = RiveViewModel(
            fileName: "dancing_banana",
            artboardName: "Banana",
        )

        override func viewDidLoad() {
            bananaVM.setView(riveView)
        }
    }
```

### Android

#### 通过 XML
```xml
    <app.rive.runtime.kotlin.RiveAnimationView
        app:riveAutoPlay="true"
        app:riveArtboard="Square"
        app:riveResource="@raw/artboard_animations" />
```

#### 通过 Kotlin
```kotlin
    animationView.setRiveResource(
        R.raw.artboard_animations,
        artboardName = "Square",
        autoplay = true
    )
```
