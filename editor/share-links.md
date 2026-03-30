---
title: "分享链接概览 (Share Links Overview) - Rive 编辑器"
description: "编辑器 (Editor) 分享链接是一种快速、无需代码的方法，可以让你的 Rive 文件在网站上运行，或向客户展示你的图形作品。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, 分享链接概览
---

编辑器 (Editor)

# 分享链接概览 (Share Links Overview)

分享链接是一种快速、无需代码的方法，可以让你的 Rive 文件在网站上运行，或向客户展示你的图形作品。

生成分享链接功能适用于 Voyager 和 Enterprise 方案。[了解更多关于我们的方案和定价的信息](https://rive.app/pricing)。

通过分享链接分享你当前处理的文件版本。请注意，这并不等同于让某人访问包含所有版本历史记录的实时文件。分享链接是文件当前状态的“冻结”版本。如果你对文件进行了更改，则需要生成一个新的分享链接。

某些功能（如 [矢量羽化](https://rive.app/blog/introducing-vector-feathering)）仅通过 Rive 渲染器 (Rive Renderer) 支持。更多信息请参阅我们的 [功能支持](/feature-support.md) 页面。

## [​](#creating-a-share-link) 创建分享链接 (Creating a share link)

你可以从“导出 (Export)”菜单生成分享链接。该链接可以分享给任何人，而不仅仅是你的团队成员。
![创建分享链接示例](https://help.rive.app/images/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2FpdTtfPZWSbUO2F68xJAi%2FCleanShot%202022-08-01%20at%2015.25.06%402x.png)
在分享链接弹窗中，选择你想要分享的画板、动画或状态机。
![分享链接选项选择](https://help.rive.app/images/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2FHboa00GCgDOCjmOMJQwu%2FScreen%20Shot%202022-05-19%20at%204.02.59%20PM.png)

### [​](#share-link-options) 分享链接选项 (Share link options)

点击“Generate link”按钮后，会出现几种分享链接类型：

- **Share link (分享链接)**：在 Rive 网站的一个唯一 URL 上展示，带有边框。适用于快速向客户展示 Rive 作品。
- **Embed link (嵌入链接)**：独立显示你的 Rive 作品，不带边框。适用于将作品嵌入 Notion、Tome、Telegram 等支持“预览展开 (unfurling)”的第三方平台。
- **Embed code (嵌入代码)**：一段 iframe 代码片段。适用于 Webflow、WordPress 等可以编辑 HTML 的平台，无需配置 Web 运行时即可快速部署。
- **Framer code (已弃用)**：请参阅新的官方 [Rive Framer 插件](https://www.framer.com/marketplace/plugins/rive/)。

其他选项包括：
- **Enable (启用)**：关闭开关可防止他人查看该链接。
- **Rive Renderer**：在使用 Rive 渲染器（推荐）和 Canvas 渲染器之间切换。

## [​](#integrations) 平台集成 (Integrations)

使用分享链接将你的 Rive 文件嵌入到其他知名工具和平台中。

### [​](#notion) Notion
1. 复制 **Share link** 或 **Embed link**。
2. 在 Notion 中粘贴链接。
3. 在菜单中选择 **Embed** 选项。
![Notion 嵌入示例](https://help.rive.app/images/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2F1QHWSbe4L4gdwkaTLV4x%2FCleanShot%202022-08-01%20at%2015.32.03%402x.png)

### [​](#webflow) Webflow
1. 复制带有 iframe 的 **Embed code**。
2. 在 Webflow 中添加一个 **Embed** 组件以访问 HTML 编辑器。
3. 粘贴从 Rive 编辑器复制的代码。
![Webflow 嵌入示例](https://help.rive.app/images/spaces%2F-M3EXlibk6bj2FzPQW-9%2Fuploads%2FJUt6rSYoE1TJYJHHUHvW%2FScreen%20Shot%202022-05-19%20at%207.30.30%20PM.png)

### [​](#tome) Tome
1. 复制 **Embed link**。
2. 在 Tome 幻灯片上添加一个 **Weblink**。
3. 粘贴链接。

## [​](#managing-share-links) 管理分享链接 (Managing share links)

访问设置中的 [Share Links](https://rive.app/profile/?section=share%20links) 部分来管理你生成的链接。你可以通过关闭 **Active** 开关来禁用链接。

[导出为备份](https://help.rive.app/editor/exporting/exporting-for-backup)[Framer 与 Rive](https://help.rive.app/editor/share-links/framer-and-rive)