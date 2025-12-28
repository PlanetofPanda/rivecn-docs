React

# React

React runtime for Rive.

Note that certain Rive features may not be supported yet for a particular runtime, or may require using the Rive Renderer.For more details, refer to the [feature support](/docs/feature-support) and [choosing a renderer](/docs/runtimes/choose-a-renderer) pages.

## [​](#overview) Overview

This guide documents how to get started using the React runtime library. Rive runtime libraries are open-source. The source is available in its [GitHub repository](https://github.com/rive-app/rive-react).
This library contains a React component, as well as custom hooks to help integrate Rive into your web application (types included). Under the hood, this runtime is a React-friendly wrapper around the `@rive-app/canvas` runtime, exposing types, and Rive instance functionality.

## [​](#getting-started) Getting Started

Follow the steps below for a quick start on integrating Rive into your React app.

1

Install the dependency

The Rive React runtime allows for two main options based on which backing renderer you need.

- **(Recommended)** `@rive-app/react-canvas` - Wraps the `@rive-app/canvas` dependency. Unless you specifically need a `WebGL` backing renderer, we recommend you use this dependency when using Rive in your apps for quick and fast usage.
- `@rive-app/react-canvas-lite` - Similar to `@rive-app/react-canvas`, but [smaller](/docs/runtimes/web/canvas-vs-webgl). This is recommended if the Rive graphic does not use [Rive Text](/docs/editor/text)
- `@rive-app/react-webgl` - Wraps the `@rive-app/webgl` dependency. In the future, we may have advanced rendering features that are only supported by using `WebGL`. At the moment, however, due to the size of the dependency (with Skia), we do not recommend it unless you have specific needs here. We are currently working on improving the performance and size with the [Rive Renderer](https://rive.app/renderer).
- `@rive-app/react-webgl2` - Wraps the `@rive-app/webgl2` dependency. It uses the Rive Renderer with a WebGL2 context and has a much smaller build size than `rive-app/react-webgl`. In a future major release, this package may be deprecated, and `@rive-app/react-webgl` will make use of the Rive Renderer completely, without an added Skia dependency.

To take advantage of trying out the Rive Renderer with react-webgl2 , you should [enable the draft](https://www.wikihow.tech/Enable-WebGL-Draft-Extensions-in-Google-Chrome) `WEBGL_shader_pixel_local_storage` Chrome Extension (by adding WebGL Draft Extensions), otherwise, Rive will fall back to an MSAA solution (also with WebGL2) on browsers without the extension support. Current work is underway with major browsers to support this extension by default in consumer’s browsers.

Copy

Ask AI

```
npm i --save @rive-app/react-canvas
```

2

Render the Rive component

Rive React provides a basic component as its default import for displaying simple animations with a few props you can set such as artboard and layout. Include the code below in your React project to test out an example Rive animation.

Copy

Ask AI

```
import Rive from '@rive-app/react-canvas';

export const Simple = () => (
  <Rive
    src="https://cdn.rive.app/animations/vehicles.riv"
    stateMachines="bumpy"
  />
);
```

See [Parameters and Return Values](/docs/runtimes/react/parameters-and-return-values) for more on the parameters and return values of the `<Rive />` component.

3

Using the useRive hook

In many cases, you may not only need the React component to render your animation but also the `rive` object instance that controls it as well. The Rive object instance allows you to tap into APIs for:

- Setting Rive Text values dynamically
- Subscribing to Rive Events with your own callbacks
- Controlling animation playback (i.e. pause and play)
- … and [much more](https://github.com/rive-app/rive-wasm)

The `useRive` hook returns both this `rive` instance, as well as the React component that mounts the underlying `<canvas>` element that Rive will draw onto.

Copy

Ask AI

```
import { useRive } from '@rive-app/react-canvas';

export default function Simple() {
  const { rive, RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachines: "bumpy",
    autoplay: false,
  });

  return (
    <RiveComponent
      onMouseEnter={() => rive && rive.play()}
      onMouseLeave={() => rive && rive.pause()}
    />
  );
}
```

**Note:** Rive will not instantiate until the `<RiveCopmonent />` is rendered out, as the underlying `<canvas>` element needs to be present in the DOM.

Also, keep in mind that the canvas size depends on the container it’s placed within. Initially, this is 0x0. Either pass a `className` to `RiveComponent` or wrap `RiveComponent` with an appropriately sized container.See [here](/docs/runtimes/react/parameters-and-return-values) for more on the parameters and return values of `useRive`.Additionally, explore subsequent runtime pages to learn how to control animation playback, state machines, and more.

## [​](#rendering-considerations-with-userive) Rendering Considerations with useRive

At this time, we highly recommend isolating your usage of `useRive` to its own wrapper component if you plan on conditionally rendering the `<RiveComponent />` returned from the `useRive` hook. This is due to Rive being instanced when the component is mounted and the rendering context associated with a specific underlying `<canvas>` element. When React tries to unmount/re-render, you may end up with the animation restarting or not displaying when a new `<canvas>` is mounted.
By isolating `useRive` to its own wrapper component, Rive will have a chance to properly clean up, and restart the animation with a new canvas. In a parent component, you can then conditionally render the wrapper component based on any state or prop-based logic.
Check out [this example CodeSandbox](https://codesandbox.io/p/sandbox/rive-react-swapping-skins-with-solos-ctcnlx?file=%2Fsrc%2FApp.tsx) to see this pattern in use.

## [​](#resources) Resources

**GitHub**: <https://github.com/rive-app/rive-react>
**Types**: <https://github.com/rive-app/rive-react/blob/main/src/types.ts>
**Examples**

- Simple skinning example: [https://codesandbox.io/p/sandbox/rive-react-swapping-skins-with-solos-ctcnlx](https://codesandbox.io/p/sandbox/rive-react-swapping-skins-with-solos-ctcnlx?file=%2Fsrc%2FApp.tsx)
- Storybook demo: <https://rive-app.github.io/rive-react/>
- Animated Login Form:
  - Demo: [https://rive-app.github.io/rive-use-cases/?path=/story/example-loginformcomponent—primary](https://rive-app.github.io/rive-use-cases/?path=/story/example-loginformcomponent--primary)

[Migrating from v1 to v2](/docs/runtimes/web/migrating-from-v1-to-v2)[Parameters and Return Values](/docs/runtimes/react/parameters-and-return-values)