Web (JS)

# Web (JS)

JavaScript/WASM runtime for Rive.

Note that certain Rive features may not be supported yet for a particular runtime, or may require using the Rive Renderer.For more details, refer to the [feature support](/docs/feature-support) and [choosing a renderer](/docs/runtimes/choose-a-renderer) pages.

## [​](#overview) Overview

This guide documents how to get started using the Rive web runtime library. The runtime is open source and available in this [GitHub repository](https://github.com/rive-app/rive-wasm). This library has a high-level JavaScript API (with TypeScript support) and a low-level API to load in Web Assembly (WASM) and control the rendering loop yourself. This runtime allows you to:

- Quickly integrate Rive into all web applications (Webflow, WordPress, etc.)
- Provides a base API to build other web-based Rive runtime wrappers (React, Svelte, etc.)
- Support advanced use cases by controlling the render loop (web-based game engines)

## [​](#getting-started) Getting started

Follow the steps below to integrate Rive into your web app.

The following instructions describe using the `@rive-app/canvas` package. Rive provides web-based packages like WebGL, Canvas, and Lite versions.See [Canvas vs WebGL](/docs/runtimes/web/canvas-vs-webgl) for guidance on which package is the correct choice for your use case.

1

Install the dependency

We recommend always using the [latest version](https://www.npmjs.com/package/@rive-app/canvas). The versions listed below and in the examples may differ from the latest.

- Script Tag
- Package Manager

Copy

Ask AI

```
// Add the following script tag to your web page to get the latest version:

<script src="https://unpkg.com/@rive-app/canvas"></script>

// You can also pin to a specific version (See [here](https://www.npmjs.com/package/@rive-app/canvas) for the latest):

<script src="https://unpkg.com/@rive-app/[email protected]"></script>

// This will make a global `rive` object available, allowing you to access the Rive API via the `rive` entry point:

new rive.Rive({});
```

npm

Copy

Ask AI

```
npm install @rive-app/canvas
```

pnpm

Copy

Ask AI

```
pnpm add @rive-app/canvas
```

yarn

Copy

Ask AI

```
yarn add @rive-app/canvas
```

bun

Copy

Ask AI

```
bun add @rive-app/canvas
```

Importing

Copy

Ask AI

```
// Import the entire module under the global identifier `rive`
import * as rive from "@rive-app/canvas";

// Alternatively, import only the specific parts you need
import { Rive } from "@rive-app/canvas";
```

Not using [Rive Text](/docs/editor/text) and [Rive Audio](/docs/editor/events/audio-events)? Consider using [@rive-app/canvas-lite](/docs/runtimes/web/canvas-vs-webgl#rive-app-canvas-lite) which is a smaller package variant.

2

Create a Canvas

Add a canvas element to your HTML where you want the Rive graphic to be displayed:

Copy

Ask AI

```
<canvas id="canvas" width="500" height="500"></canvas>
```

3

Create a Rive instance

To create a new instance of a Rive object, provide the following properties:

- `src`: A string representing the URL of the hosted `.riv` file (as shown in the example below) or the path to the public asset `.riv` file. For more details, refer to [Rive Parameters](/docs/runtimes/web/rive-parameters) on how to properly use this property.
- `artboard` - (Optional) A string representing the artboard you want to display. If not supplied the default is selected.
- `stateMachines` - A string representing the name of the state machine you wish to play.
- `canvas` - The canvas element where the animation will be rendered.
- `autoplay` - A boolean indicating whether the animation should play automatically.

Copy

Ask AI

```
<script>
    const r = new rive.Rive({
        src: "https://cdn.rive.app/animations/vehicles.riv",
        // OR the path to a discoverable and public Rive asset
        // src: '/public/example.riv',
        canvas: document.getElementById("canvas"),
        autoplay: true,
        // artboard: "Artboard", // Optional. If not supplied the default is selected
        stateMachines: "bumpy",
        onLoad: () => {
          r.resizeDrawingSurfaceToCanvas();
        },
    });
</script>
```

The `resizeDrawingSurfaceToCanvas` method ensures that the Rive animation is correctly scaled to fit the dimensions of the specified canvas element. By default, the canvas rendering surface might not match the exact size of the `<canvas>` element defined in your HTML, which can lead to blurry or incorrectly scaled graphics, especially on high-DPI or retina displays.Calling this method adjusts the internal drawing surface so that the animation is rendered with crisp detail, matching the pixel density of the canvas. This is particularly important when:

- The size of the canvas changes dynamically (e.g., if it is resized due to responsive layouts).
- You want to ensure the animation remains sharp, regardless of device or screen resolution.

  
**Best practices:**

- **Call after load**: It’s recommended to call `resizeDrawingSurfaceToCanvas` inside the `onLoad` callback to ensure that the Rive asset has been fully loaded before adjusting the drawing surface. This prevents any rendering issues.
- **Handling window resize**: If your canvas size changes during the user’s interaction (such as when resizing the browser window), you should also listen for window resize events and call `resizeDrawingSurfaceToCanvas` to re-adjust the rendering surface:

Copy

Ask AI

```
window.addEventListener("resize", () => {
    r.resizeDrawingSurfaceToCanvas();
});
```

This way, the Rive animation will continue to look sharp and correctly scaled as the canvas size changes.

### [​](#complete-example) Complete example

Bringing it all together, here’s how to load a Rive graphic in a single HTML file.

Copy

Ask AI

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rive Hello World</title>
  </head>
  <body>
    <canvas id="canvas" width="500" height="500"></canvas>

    <script src="https://unpkg.com/@rive-app/canvas"></script>
    <script>
      const r = new rive.Rive({
        src: "https://cdn.rive.app/animations/vehicles.riv",
        canvas: document.getElementById("canvas"),
        autoplay: true,
        // artboard: "Arboard", // Optional. If not supplied the default is selected
        stateMachines: "bumpy",
        onLoad: () => {
          // Ensure the drawing surface matches the canvas size and device pixel ratio
          r.resizeDrawingSurfaceToCanvas();
        },
      });
    </script>
  </body>
</html>
```

### [​](#loading-rive-files) Loading Rive files

[See this example](https://codesandbox.io/p/sandbox/rive-quick-start-js-xmwcm6?file=%2Fsrc%2Findex.ts) for the different ways to load in a .riv file, the options are:

1. **Hosted URL**: Use a string representing the URL where the `.riv` file is hosted. Set this as the `src` attribute when creating a new Rive instance.
2. **Static Assets in the bundle**: Provide a string with the path to a publicly accessible `.riv` file within your web project. Handle `.riv` files just like any other static asset (e.g., images or fonts) in your project.
3. **Fetching a file**: Instead of using the `src` attribute, use the `buffer` attribute to load an `ArrayBuffer` when fetching a file. This is useful when reusing the same `.riv` file across multiple Rive instances, allowing you to load it only once.
4. **Reusing a Loaded File**: Use the `rivFile` parameter to reuse a previously loaded Rive runtime file object, avoiding the need to fetch it again via the `src` URL or reload it from the `buffer`. This can significantly improve performance by eliminating redundant network requests and loading times, especially when creating multiple Rive instances from the same source. Unlike the `src` and `buffer` parameters, which require parsing under the hood to create a runtime file object, the `riveFile` parameter uses an already parsed object, including any loaded assets. See [Caching a Rive File](/docs/runtimes/caching-a-rive-file).

For more details, refer to the [Rive Parameters](/docs/runtimes/web/rive-parameters) section on the `src` property.

## [​](#4-clean-up-rive) 4. Clean up Rive

When working with a Rive instance, it’s important to properly clean it up when it’s no longer needed. This is especially necessary in scenarios where:

- The UI containing Rive animations is no longer needed (e.g., when a modal with Rive graphics is closed).
- The animation or state machine has completed and will not be shown or run again.

Under the hood, Rive creates various low-level objects (such as artboard instances, animation instances, and state machine instances) in C++, which need to be manually deleted to prevent memory leaks. If not cleaned up, these objects can consume unnecessary resources, potentially impacting your application’s performance.
Fortunately, the high-level JavaScript API simplifies this process. You don’t need to track every object created during the Rive instance lifecycle. Instead, you can clean up all associated objects with a single method call.
To clean up a Rive instance and free up resources, simply call the following method on your Rive instance:

Copy

Ask AI

```
const riveInstance = new Rive({...));
...
// When ready to cleanup
riveInstance.cleanup();
```

# [​](#rive-runtime-concepts) Rive runtime concepts

Learn how to interact with your Rive graphics during runtime.

[## Artboards

Control which artboard is displayed at runtime.](/docs/runtimes/artboards)[## Layout

Control the artboard’s layout (fit and alignment) at runtime.](/docs/runtimes/layout)[## State Machine Playback

Control state machine playback at runtime and interact with state machine
inputs.](/docs/runtimes/state-machines)[## Data Binding

Dynamically update content at runtime using two-way data binding for text,
colors, images, lists, and more.](/docs/runtimes/data-binding)[## Loading Assets

Load referenced assets (images, fonts, audio) at runtime. Also known as
out-of-band assets.](/docs/runtimes/loading-assets)[## Caching a Rive File

Cache and reuse a Rive file object across multiple Rive instances to improve
performance.](/docs/runtimes/caching-a-rive-file)

# [​](#additional-rive-web-resources) Additional Rive web resources

More in-depth Rive web documentation and advanced use cases.

[## Rive Parameters

API docs for the Rive instance.](/docs/runtimes/web/rive-parameters)[## Canvas vs WebGL

A guide to the different Rive web packages](/docs/runtimes/web/canvas-vs-webgl)[## FAQ

Frequently asked questions](/docs/runtimes/web/faq)[## Preloading WASM

Instructions on how to preload and self-host the rive WASM library.](/docs/runtimes/web/preloading-wasm)[## Low-level API Usage

Control the Rive render loop and layout, and draw multiple artboards to the same canvas.](/docs/runtimes/web/low-level-api-usage)

# [​](#examples) Examples

- [Basic gallery app](https://github.com/rive-app/rive-wasm/tree/master/js/examples/_frameworks/parcel_example_canvas)
- [Tracking mouse cursor](https://codesandbox.io/p/sandbox/tracking-mouse-cursor-n38gdd?file=%2Fsrc%2Findex.ts)
- [Connecting to page scroll](https://codesandbox.io/p/sandbox/rive-page-scroll-h4msqw?file=%2Fsrc%2Findex.ts%3A27%2C45)
- [Playing state machine only when scrolled into the user’s viewport](https://codesandbox.io/p/sandbox/rive-wait-for-scroll-into-view-y9wg8d?file=%2Fsrc%2Findex.ts)

[Rive Events](/docs/runtimes/rive-events)[Rive Parameters](/docs/runtimes/web/rive-parameters)