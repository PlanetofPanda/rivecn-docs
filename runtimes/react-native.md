React Native

# React Native

React Native runtime for Rive.

Note that certain Rive features may not be supported yet for a particular runtime, or may require using the Rive Renderer.For more details, refer to the [feature support](/docs/feature-support) and [choosing a renderer](/docs/runtimes/choose-a-renderer) pages.

🚀 **The new Rive React Native runtime is now available!** Built with Nitro for improved performance and better React Native integration.**Get started:**

- [GitHub](https://github.com/rive-app/rive-nitro-react-native)
- [NPM](https://www.npmjs.com/package/@rive-app/react-native)

**Migration Timeline:**

- **Short term:** Complete the new runtime, see [Feature Support](https://github.com/rive-app/rive-nitro-react-native?tab=readme-ov-file#feature-support) and [Roadmap](https://github.com/rive-app/rive-nitro-react-native?tab=readme-ov-file#roadmap)
- **Medium term:** Address major concerns in the legacy package while supporting migration
- **Long term:** Full migration to the new package

We’re actively gathering feedback to improve the new runtime. Please share your thoughts and report any issues you encounter.

## [​](#overview) Overview

This guide documents how to get started using the Rive React Native runtime. The source for the new runtime is available in its [GitHub repository](https://github.com/rive-app/rive-nitro-react-native).

- New Runtime (Recommended)
- Legacy Runtime

## [​](#requirements) Requirements

- **React Native**: 0.78 or later (0.79+ recommended for improved Android error messages)
- **Expo SDK**: 53 or later (for Expo users)
- **iOS**: 15.1 or later
- **Android**: SDK 24 (Android 7.0) or later
- **Xcode**: 16.4 or later
- **JDK**: 17 or later
- **Nitro Modules**: 0.25.2 or later

## [​](#quick-start) Quick Start

Follow these quick start steps to get familiar with the Rive React Native runtime.

[## Rive File

Remix/download the Rive file used in this quick start guide](https://rive.app/marketplace/24637-46037-health-bar-data-binding-quick-start/)[## Complete example

View the complete quick start example](https://github.com/rive-app/rive-nitro-react-native/blob/main/example/src/pages/QuickStart.tsx)

1

Install the dependency

Copy

Ask AI

```
npm install @rive-app/react-native react-native-nitro-modules
# or for Yarn
yarn add @rive-app/react-native react-native-nitro-modules
```

`react-native-nitro-modules` is required as this library relies on [Nitro Modules](https://nitro.margelo.com/).

2

Setup

Import the necessary components and define styles for the following steps.

Imports

Copy

Ask AI

```
import {
  RiveView,
  useRive,
  useRiveFile,
  useRiveNumber,
  useRiveTrigger,
  useViewModelInstance,
  Fit,
} from '@rive-app/react-native';
```

Styles

Copy

Ask AI

```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rive: {
    width: '100%',
    height: 400,
  },
});
```

3

Rive File and Component

The `RiveView` component displays Rive graphics. It requires a single prop: `file`, a `RiveFile` object.Use the `useRiveFile` hook to load a **riv** file and create a `RiveFile` object. This object can be cached and reused across multiple components.

Loading a file

Copy

Ask AI

```
export default function QuickStart() {
  const { riveFile } = useRiveFile(
    require('path/to/quick_start.riv')
  );

  return (
    <View style={styles.container}>
      {riveFile && <RiveView file={riveFile} style={styles.rive} />}
    </View>
  );
}
```

Further reading:

[## Props

Available view props for `RiveView`](/docs/runtimes/react-native/props)[## Loading Rive Files

How to load Rive files in your app](/docs/runtimes/react-native/loading-rive-files)[## Caching Rive Files

Cache Rive files for better performance](/docs/runtimes/caching-a-rive-file)

4

Layout

Configure how the graphic fits within its container.For this example, we’ll set `fit` to `Layout`, which automatically resizes the artboard to match the view size. This is ideal for responsive Rive graphics built with [Layouts](/docs/editor/layouts/layouts-overview).

Layout

Copy

Ask AI

```
<RiveView
  file={riveFile}
  style={styles.rive}
  fit={Fit.Layout}
/>
```

Further reading:

[## Runtime layout

Control how Rive graphics fit and align within their containers](/docs/runtimes/layout)

5

View Reference

Use the `useRive()` hook to access the Rive view reference for programmatic control.

useRive hook

Copy

Ask AI

```
export default function QuickStart() {
  const { riveFile } = useRiveFile(
    require('path/to/quick_start.riv')
  );
  const { riveViewRef, setHybridRef } = useRive();

  return (
    <View style={styles.container}>
      {riveFile && (
        <RiveView
          hybridRef={setHybridRef}
          file={riveFile}
          fit={Fit.Layout}
          style={styles.rive}
        />
      )}
    </View>
  );
}
```

Further reading:

[## View methods

See all the available view reference methods.](/docs/runtimes/react-native/rive-ref-methods)[## Hybrid Views

Read more on Nitro Hybrid Views.](https://nitro.margelo.com/docs/hybrid-views)

6

Data binding

Create the view model instance manually using the `useViewModelInstance` hook and pass it to the view.This approach lets you set initial property values in the `onInit` callback before the view loads and decouples the `ViewModelInstance` from the `RiveView`.

Manually create view model instance

Copy

Ask AI

```
export default function QuickStart() {
  const { riveFile } = useRiveFile(
    require('path/to/quick_start.riv')
  );
  const { riveViewRef, setHybridRef } = useRive();
  const viewModelInstance = useViewModelInstance(riveFile, {
    onInit: (vmi) => (vmi.numberProperty('health')!.value = 20),
  });

  return (
    <View style={styles.container}>
      {riveFile && viewModelInstance && (
        <RiveView
          hybridRef={setHybridRef}
          file={riveFile}
          fit={Fit.Layout}
          style={styles.rive}
          dataBind={viewModelInstance}
        />
      )}
    </View>
  );
}
```

Use the view model property hooks to update and listen to property changes.

Property hooks

Copy

Ask AI

```
export default function QuickStart() {
  const { riveFile } = useRiveFile(
    require('path/to/quick_start.riv')
  );
  const { riveViewRef, setHybridRef } = useRive();
  const viewModelInstance = useViewModelInstance(riveFile, {
    onInit: (vmi) => (vmi.numberProperty('health')!.value = 20),
  });

  const { value: health, setValue: setHealth } = useRiveNumber(
    'health',
    viewModelInstance
  );

  console.log('health', health);

  const { trigger: gameOverTrigger } = useRiveTrigger(
    'gameOver',
    viewModelInstance,
    { onTrigger: () => console.log('Game Over Triggered') }
  );

  const handleTakeDamage = () => {
    setHealth((h) => (h ?? 0) - 7);
    riveViewRef!.playIfNeeded();
  };

  const handleMaxHealth = () => {
    setHealth(100);
    riveViewRef!.playIfNeeded();
  };

  const handleGameOver = () => {
    setHealth(0);
    gameOverTrigger();
    riveViewRef!.playIfNeeded();
  };

  return (
    <View style={styles.container}>
      {riveFile && viewModelInstance && (
        <RiveView
          hybridRef={setHybridRef}
          file={riveFile}
          fit={Fit.Layout}
          style={styles.rive}
          dataBind={viewModelInstance}
        />
      )}
      <Button onPress={handleTakeDamage} title="Take Damage" />
      <Button onPress={handleMaxHealth} title="Max Health" />
      <Button onPress={handleGameOver} title="Game Over" />
    </View>
  );
}
```

We call `playIfNeeded` to force the state machine to play. Under some circumstances, the state machine might be settled if there is no active timeline in the graphic.This is a temporary workaround. In the future, this will happen automatically.

Further reading:

[## Data binding

See the runtime data binding documentation for more information.](/docs/runtimes/data-binding)

See our [example app](https://github.com/rive-app/rive-nitro-react-native/tree/main/example) for more usage examples.

## [​](#key-components) Key Components

### [​](#riveview) `RiveView`

The component to render Rive content:

Copy

Ask AI

```
<RiveView
  file={riveFile}
/>
```

See the available [props](/docs/runtimes/react-native/props) and [methods](/docs/runtimes/react-native/rive-ref-methods).

### [​](#userivefile) `useRiveFile`

Hook for loading Rive files from a URL or local source:

Copy

Ask AI

```
const { riveFile } = useRiveFile({
  url: 'https://cdn.rive.app/animations/vehicles.riv',
  // or
  // source: require('./assets/graphic.riv'),
});
```

See [loading Rive files](/docs/runtimes/react-native/loading-rive-files) and [caching Rive files](/docs/runtimes/caching-a-rive-file) for more information.

### [​](#userive) `useRive`

Hook to access the Rive view reference for programmatic control:

Copy

Ask AI

```
const { riveViewRef, setHybridRef } = useRive();

<RiveView
  hybridRef={setHybridRef}
  file={riveFile}
/>
```

This is a [Nitro Hybrid View](https://nitro.margelo.com/docs/hybrid-views). See the avaiable [view reference methods](/docs/runtimes/react-native/rive-ref-methods).

### [​](#useviewmodelinstance) `useViewModelInstance`

Hook to create a view model instance from a `RiveFile`, `ViewModel`, or `RiveViewRef`:

Copy

Ask AI

```
// Get default instance from RiveFile (recommended)
const instance = useViewModelInstance(riveFile);

// or
// Get named instance from a ViewModel
const namedInstance = useViewModelInstance(viewModel, { name: 'My Instance' });

// or
// Create a new blank instance from a ViewModel
const newInstance = useViewModelInstance(viewModel, { useNew: true });

// or
// With required: true (throws if null, use with Error Boundary)
const instance = useViewModelInstance(riveFile, { required: true });

// or
// With onInit to set initial values synchronously
const instance = useViewModelInstance(riveFile, {
  onInit: (vmi) => {
    vmi.numberProperty('count')?.set(10);
    vmi.stringProperty('name')?.set('Initial Name');
  }
});
```

Pass the `dataBind` prop in `RiveView`.

Copy

Ask AI

```
return (
  <RiveView
    file={riveFile}
    dataBind={instance}
  />
);
```

You can also get the auto-bound instance from a `RiveViewRef`:

Copy

Ask AI

```
import { useRive, useViewModelInstance } from '@rive-app/react-native';

const { riveViewRef, setHybridRef } = useRive();
const instance = useViewModelInstance(riveViewRef);
```

See the [runtime data binding documentation](/docs/runtimes/data-binding) for more information.

## [​](#resources) Resources

[## GitHub](https://github.com/rive-app/rive-nitro-react-native)[## NPM](https://www.npmjs.com/package/@rive-app/react-native)[## Example App](https://github.com/rive-app/rive-nitro-react-native/tree/main/example)

The legacy runtime is still supported, but we recommend migrating to the new runtime for better performance and features.

This guide documents how to get started using the legacy React Native runtime library. The source is available in its [GitHub repository](https://github.com/rive-app/rive-react-native). This library contains an API for React Native apps to easily integrate Rive assets.The minimum iOS target is **14.0**

See [our documentation](/docs/runtimes/react-native/adding-rive-to-expo) to add
Rive to an Expo app.

## [​](#getting-started) Getting Started

Follow the steps below for a quick start on integrating Rive into your React Native app.

1

Install the dependency

Copy

Ask AI

```
npm install rive-react-native
# or for Yarn
yarn add rive-react-native
```

2

iOS - Pod Install

`cd` inside the `ios` folder and run `pod install` (if deploying to iOS)

If you run into issues here, you may need to bump the `ios` deployment version target to at least `14.0`. You can find this version in the `Podfile` of the `ios/` folder.

3

Android - Set Kotlin Dependency Resolution

This step may be optional - however, if your Android setup in the React Native project does not have Kotlin `v1.8.0+` set up, you may run into duplicate class issues when building the project. To mitigate these issues, as suggested by [Kotlin docs](https://kotlinlang.org/docs/gradle-configure-project.html#versions-alignment-of-transitive-dependencies), add the following to your dependencies in your application’s `build.gradle` file to deal with version alignment:

Copy

Ask AI

```
dependencies {
    implementation platform('org.jetbrains.kotlin:kotlin-bom:1.8.0')
    ...
}
```

4

Add the Rive component

Copy

Ask AI

```
import Rive from 'rive-react-native';

function App() {
  return <Rive
      url="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
      artboardName="Avatar 1"
      stateMachineName="avatar"
      style={{width: 400, height: 400}}
  />;
}
```

## [​](#resources-2) Resources

[## GitHub](https://github.com/rive-app/rive-react-native)[## Example App](https://github.com/rive-app/rive-react-native/tree/main/example)

[Migrating from v3 to v4](/docs/runtimes/react/migrating-from-v3-to-v4)[Runtime Concepts](/docs/runtimes/react-native/runtime-concepts)