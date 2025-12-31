---
title: '字体 (Fonts)'
description: ''
---

在检查器中选择字体，作为文本样式（Text Style）的一部分。默认列表通过 Google Fonts 填充，但您也可以将自己的字体上传到资产面板（Assets Panel）。

## 字体选项 (Font Options)

字体变量（Font variables）和 OpenType 特性可以在文本样式部分的选项浮窗中找到。如果字体支持这些特性，您可以在字重下拉菜单旁边找到相关设置。

::: info
字体变量是可以制作动画的。在动画模式下打开选项浮窗即可添加关键帧。
:::

::: info
并非所有字体都支持变量轴和 OpenType 特性。选项菜单仅会针对支持这些特性的字体显示。
:::

![Configure variables and features for compatible fonts](https://ucarecdn.com/54d2b525-81bf-48b0-b4b0-99acfc6ea62d/)

---

## 字体来源 (Font Sources)

### Google Fonts

默认字体列表通过 Google Fonts 填充。这些字体在所有方案中均可免费使用。选择字体后，它将出现在资产面板的 "Fonts" 类别下。自定义字体和 Google Fonts 都是如此。后者会根据您在 Rive 文件中使用的字体自动更新。

::: info
由 Google Fonts 提供的字体标有 "G" 图标。
:::

### 自定义字体 (Custom Fonts)

通过将字体文件拖放到编辑器中，或通过资产面板中的 `+` 动作来上传自定义字体。上传的字体将显示在文本检查器字体选择下拉列表的顶部。

::: info
在资产面板中选择字体，即可在检查器中查看可用的元数据和许可协议。
:::

---

## 导出选项 (Export Options)

如果您希望在运行时动态更新文本，您的 Rive 文件将需要引用字体文件。配置可用选项以满足您的需求并优化 `.riv` 文件。在资产面板中选择一个字体，即可在检查器中显示其导出选项。

### 导出类型 (Export Type)

在 **Assets** 面板中选择字体，并更改 **Type** 选项来定义您希望将字体导出到何处。

![Image](/images/editor/text/3e0e6c7f-2dcb-49a4-bc3c-8fcd32c7605e.webp)

- **Embedded (嵌入)：** 将字体文件嵌入到 `.riv` 文件内部。这是最简单的选项，但会增加文件的大小。如果该字体仅用于您的动画，且在您的应用、网站或游戏中尚未提供，请使用此选项。
- **Referenced (引用)：** 将字体文件与 `.riv` 文件分开导出并引用。如果您的多个 Rive 文件使用相同的字体，或者您正在将 Rive 文件集成到一个已经包含该字体的应用、游戏或网站中，此选项是理想选择。使用引用的字体文件将减小 Rive 文件的大小。
- **Hosted (托管)：** 托管字体会上传到 Rive 的 CDN，以供运行时按需下载。与引用的字体文件相似，选择在 Rive 的 CDN 上托管字体将使其从 `.riv` 中省略，从而减小文件体积。当您的动画在应用、游戏或网站中播放时，Rive 运行时将抓取该字体。

::: info
托管在 Rive CDN 上的资产可以被任何拥有链接的人访问。
:::

::: info
托管字体功能仅在 Voyager 和 Enterprise 方案中提供。[了解更多关于我们的方案和定价](https://rive.app/pricing)。
:::

---

### 字形 / 脚本选择 (Glyph / Script Selection)

除了字体存储位置，您还可以配置希望包含的字形（glyphs）。移除不必要的字形和脚本（scripts）将减小字体文件（引用/托管）或 Rive 文件（嵌入）的大小。决定包含哪些脚本取决于您是否要在运行时动态更新文本，以及您想要支持的语言。

::: info
使用 "View Glyphs" 功能浏览所选字体可用的字形/脚本。在资产面板选择字体后，您可以在检查器中找到此功能。
:::

![Use the viewer to browse a font's available glyphs and scripts](https://ucarecdn.com/5dca4473-2bd7-44b2-a1d7-677dc14c58f8/)

**有三类选项可供选择：**

- **All Glyphs (所有字形)：** 导出整个字体文件。所有字形在运行时均可用。
- **Glyphs Used (已使用的字形)：** 仅导出文件中实际使用的字形。例如，如果您的文本是 "Hello World!"，则只会导出 `H`, `e`, `l`, `o`, `W`, `r`, `d` 和 `!` 这些字形。如果您不打算在运行时更改文本内容，请使用此选项。

::: tip
如果您想包含一组特定的字形（例如：仅限数字），您可以将这些字形放在一个单独的画板中，它们就会被编译进运行时。
:::

- **Custom (自定义)：** 导出选定的脚本。使用脚本选项浮窗来开启或关闭不同的语言脚本。如果您想在运行时动态更新文本，但不需要支持某些语言或字母表，请使用此选项。这将通过移除您不打算使用的脚本来帮助减小文件大小。

![Remove unwanted scripts to optimize font exports](https://ucarecdn.com/2610dd6a-5b58-49cf-8c75-c58558185c02/)
