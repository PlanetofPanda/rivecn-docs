---
title: '共享链接概览 (Share Links Overview)'
description: '共享链接是一种快速、无代码的方法，可以让您的 Rive 文件在网站上运行，或者向客户展示您的图形设计。'
---

::: info
生成共享链接功能仅在 Voyager 和 Enterprise 方案中提供。[了解更多关于我们的方案和定价](https://rive.app/pricing)。
:::

通过共享链接，您可以分享当前正在处理的文件版本。请注意，这与授予他人访问包含所有修订历史的实时文件权限不同。此链接是该文件当前状态的一个"冻结"版本。如果您对文件进行了更改，则需要生成一个新的共享链接。

::: warning
某些功能（例如 [矢量羽化](https://rive.app/blog/introducing-vector-feathering)）仅通过 Rive 渲染器（Rive Renderer）支持。请参阅我们的[功能支持列表](/feature-support)页面了解更多信息。
:::

## 创建共享链接

从导出菜单（Export menu）生成共享链接。此链接可以分享给任何人，而不仅限于您的团队成员。

![Image](https://1159711764-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2FpdTtfPZWSbUO2F68xJAi%2FCleanShot%202022-08-01%20at%2015.25.06%402x.png?alt=media&token=637d1c42-e6ed-4ab0-8ee8-2d4aff8df50e)

在共享链接弹窗中，选择您想要共享的画板、动画或状态机。

![Image](https://1159711764-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2FHboa00GCgDOCjmOMJQwu%2FScreen%20Shot%202022-05-19%20at%204.02.59%20PM.png?alt=media&token=dc61a4f5-ef03-490e-8145-cb79eee8b01c)

### 共享链接选项

点击 "Generate link"（生成链接）按钮后，会出现几种共享链接类型：

- **Share link (共享链接)** - 在 Rive 网站的一个带有边框的独立 URL 页面中显示。适用于向客户快速展示您的 Rive 作品，而无需您自己在 Web 应用环境中搭建。
- **Embed link (嵌入链接)** - 独立显示您的 Rive 作品，不带边框。当您想要将 Rive 作品嵌入到支持自动解析并预览的其他第三方平台（如 Notion, Tome, Telegram）时，请使用此链接。
- **Embed code (嵌入代码)** - 一段允许您在 iframe 中嵌入 Rive 作品的代码片段。这对于需要在支持编辑 HTML 的平台（如 Webflow, WordPress 等）上放置 Rive 作品，且不想亲自处理 Web 运行时设置的情况非常有用。
- **Framer code (已弃用)** - 请参阅新的官方 [Rive Framer 插件](https://www.framer.com/marketplace/plugins/rive/)。

其它选项包括：
- **Enable (启用)**：禁用链接以防止他人查看。
- **Rive Renderer (Rive 渲染器)**：在 Rive 渲染器（推荐）和 Canvas 渲染器之间切换。

::: info
某些功能（例如 [矢量羽化](https://rive.app/blog/introducing-vector-feathering)）仅在使用 Rive 渲染器时可用。请参阅我们的[功能支持列表](/feature-support)页面了解更多信息。
:::

## 集成 (Integrations)

使用共享链接将您的 Rive 文件嵌入到其它著名的工具和平台中！这并不是一份完整的列表。大多数工具都会通过此处描述的方法支持 Rive 共享链接。

### Notion

1. 复制 *共享链接 (share link)* 或 *嵌入链接 (embed link)*。
2. 将链接粘贴到 Notion 中。
3. 在弹出的菜单中选择 "Embed"（嵌入）选项。

在 Notion 中嵌入共享链接：

![Image](https://1159711764-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2F1QHWSbe4L4gdwkaTLV4x%2FCleanShot%202022-08-01%20at%2015.32.03%402x.png?alt=media&token=a209136e-fe69-4da2-884f-bad0c1e25532)

### Webflow

1. 复制带有 iframe HTML 块的 *嵌入代码 (embed code)*。
2. 在 Webflow 中，点击 + 号添加组件，然后添加一个 Embed（嵌入）以访问 HTML 嵌入代码编辑器。
3. 粘贴从 Rive 编辑器复制的嵌入代码。

![Embed code in Webflow](https://1159711764-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2FJUt6rSYoE1TJYJHHUHvW%2FScreen%20Shot%202022-05-19%20at%207.30.30%20PM.png?alt=media&token=13c06ac2-c719-44b2-b931-9e484b74a556)

### Tome

1. 复制 *嵌入链接 (embed link)*。
2. 在 Tome 选定的幻灯片上，添加一个 weblink。
3. 粘贴从 Rive 编辑器复制的嵌入链接。

![Embed share link in Tome](https://1159711764-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2FRQDfIWCWxjJ9XBGC3wBG%2FScreen%20Shot%202022-05-19%20at%207.32.34%20PM.png?alt=media&token=f88e48a4-cfd4-4fc6-890d-acc24b479f71)

### 社交媒体 (Social Media)

1. 复制 *共享链接 (share link)*。
2. 将其粘贴到您最喜欢的平台上。
3. 发布后即可看到 Rive 作品自动解析并展开预览。

## 管理共享链接

访问您设置中 [Share Links](https://rive.app/profile/?section=share%20links) 部分，管理您生成的链接。您可以将 "Active" 开关设为关闭来停用共享链接。