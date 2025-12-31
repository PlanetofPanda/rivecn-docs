---
title: "运行时资产替换 (Runtime Asset Swapping)"
---

::: warning
我们正在重写我们的 Unreal Engine 集成，以提供显著提升的性能，目前已实现了 4 倍的运行加速。为了集中精力完成这项工作，我们将暂时暂停支持，并不再推荐使用当前版本的 Rive Unreal 插件（该版本以前作为实验性预览版发布）。更多详情请见[此处](https://community.rive.app/c/announcements/rive-x-unreal)。\
  \
  本页面仅供正在使用该插件旧版的用户参考。
:::

Rive 允许您在运行时替换字体和图像资产。替换方式取决于资产的类型及其存储位置。

## 使用 Rive 资产 (Using Rive Assets)

为了替换资产，您必须首先在 **Rive File** 中找到它。这可以通过使用 **Get Rive Asset By Name** 节点来完成。用于搜索的名称是该资产在 Rive 编辑器的 **Assets** 面板中显示的名称。

![Image](/images/game-runtimes/unreal/f4355191-ddf4-4356-b65c-b9858c4a45dd.webp)

找到该 Rive 资产后，您需要将返回值强制转换（Cast）为对应的资产类型，即 **RiveFontAsset** 或 **RiveImageAsset**。

![Image](/images/game-runtimes/unreal/caf69759-f4f5-4b0d-9300-09107e7dfd9f.webp)

转换为正确的资产类型后，就可以向该资产中加载数值了。不同的资产类型使用不同的节点来加载数据。

## 图像资产 (Image Assets)

可以通过 **Texture (纹理)** 或字节数组（array of bytes）来加载图像资产。**Load Texture** 节点用于加载存储在 Unreal 项目中的纹理。

::: info
使用 Load Texture 节点加载的纹理，必须将其 **Mip Gen Settings** 设置为 **NoMipMaps**，且其 **Compression Settings** 设置为 **UserInterface2d (RGBA)**。
:::

![Image](/images/game-runtimes/unreal/767f43eb-06c8-4d27-a144-f5fab0db13b8.webp)

图像资产也可以作为 **png**、**webp** 或 **jpg** 格式的字节数组加载。如果您想从 CDN、原始文件或互联网位置加载图像，这非常有用。开发者需要负责将图像作为字节数组提供。

![Image](/images/game-runtimes/unreal/2f6b73ef-9781-416b-b2ab-870466fa04e1.webp)

## 字体资产 (Font Assets)

字体资产可以作为存储在 Unreal 项目中的 **Font Face** 加载，也可以作为 **otf** 或 **ttf** 格式的字节数组加载。

![Image](/images/game-runtimes/unreal/93be7fe7-16cc-416c-aa75-0aafd94fb9e5.webp)

::: info
要加载的 FontFace 必须将其 **Loading Policy** 设置为 **Inline**。
:::

![Image](/images/game-runtimes/unreal/6ae7cc1e-6e8f-41eb-929e-0dde60b62868.webp)