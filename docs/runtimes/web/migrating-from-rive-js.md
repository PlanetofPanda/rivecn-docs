---
title: '从 rive.js 迁移 (Migrating from rive.js)'
description: '从 rive-js 包迁移到新版运行时的指南。'
---

以前，Web 运行时是作为 npm 上的 [rive-js](https://www.npmjs.com/package/rive-js) 包发布的。自那以后，我们已经告别了这种单一包模式，转而根据您的 API/渲染层级需求，可以从多个不同的包中进行导入：

- @rive-app/webgl
- @rive-app/webgl-advanced
- @rive-app/canvas
- @rive-app/canvas-advanced

除了这些新包之外，上述每个包都有对应的 `*-single` 版本（即将 WASM 直接编码在 JS 中）。请参阅 [Web 运行时文档](https://github.com/rive-app/rive-wasm/blob/master/WEB_RUNTIMES.md) 来帮助您决定项目需要哪种运行时包。

我们更改了包模型，以便用户选择使用哪种渲染器（即 [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) 与 [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API) 之间的选择），这会影响包体积和性能。此外，所有新的 Web 运行时包都将支持最新的 Rive 功能，例如位图资产 (raster assets)。

在任何情况下，就 `rive` 实例的使用而言，其高级 API 用法不应有任何变化。您只需要更改项目中安装的包以及相关的导入位置即可。

例如，以前的集成方式如下：
```bash
npm i rive-js
```
```typescript
import rive from 'rive-js';

const foo = new rive.Rive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
});
```

您可以将其替换为：
```bash
npm i @rive-app/canvas 
```
```typescript
import {Rive} from '@rive-app/canvas';

const foo = new Rive({
  src: "https://cdn.rive.app/animations/vehicles.riv",
});
```

或者，您可以根据需要将 `@rive-app/canvas` 替换为任何其他新的 Web 运行时包。