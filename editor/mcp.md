---
title: "Rive MCP 集成 (Rive MCP Integration) - Rive 编辑器"
description: "MCP 处于 早期访问阶段 (Early Access)，尚未公开发布。 MCP 集成目前仅在 macOS 的 Rive Early Access 桌面版应用中提供。Windows 支持即将推出。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 编辑器, Rive MCP 集成
---

MCP

# Rive MCP 集成 (Rive MCP Integration)

MCP 处于 [早期访问阶段 (Early Access)](https://rive.app/blog/early-access-to-unreleased-features)，尚未公开发布。  
MCP 集成目前仅在 macOS 的 Rive Early Access 桌面版应用中提供。Windows 支持即将推出。

## [​](#getting-started) 入门指南 (Getting started)

你可以通过 **MCP (Model Context Protocol)** 将 Rive 编辑器连接到 AI 工具。首批推出的工具旨在让 AI 替你处理重复性任务，例如创建复杂的视图模型 (View Models)、拥有数百个状态/图层的状态机、响应式布局、以及各种形状等。

目前此功能仅支持少数支持 MCP 的 AI 工具。我们目前建议使用 **Cursor**，支持列表未来将会扩大。

## [​](#installation) 安装步骤 (Installation)

### [​](#mac) macOS

1. **安装 Rive Early Access**：下载并安装最新版的 [Rive Early Access](https://rive.app/downloads) macOS 桌面版应用。
2. **设置 Cursor**：创建 [Cursor](https://www.cursor.com/) 账号并安装应用。
3. **保存配置**：在你的电脑上新建一个文件 `mcp.json`，并将以下 JSON 代码片段存入其中：
   ```json
   {
     "mcpServers": {
         "rive": {
             "url": "http://localhost:9791/sse"
         }
     }
   }
   ```
4. **配置 MCP**：
   - 如果你在访达 (Finder) 中开启了显示隐藏文件：将 `mcp.json` 移动到家目录下的 `.cursor` 文件夹中。
   - 否则，请打开终端 (Terminal.app) 运行以下命令：
     ```bash
     cp /你的路径/mcp.json ~/.cursor
     ```
5. **在 Cursor 中启用**：
   - 打开 Cursor 设置面板（右上角图标）。
   - 导航至 **MCP** 部分。
   - **验证连接**：如果一切正常，你应该能看到 Rive 已作为一个可用的 MCP 服务器列出。
   - *注意：Rive 服务器必须在 Rive Early Access 应用开启的情况下才可用。*
   - 将 MCP 连接设置为 **On**。

更多设置信息可参考 [Cursor 文档](https://docs.cursor.com/context/model-context-protocol)。

## [​](#what-can-it-do) 它可以做什么？ (What can it do?)

一切就绪后，你就可以开始向 AI 发出指令了。

1. **打开你的 Rive 文件**：保持 Rive 文件开启并已创建一个画板。
2. **输入 Prompt**：在 Cursor 聊天框输入指令并回车。
   例如：`Create a State Machine about birds with 20 states and 2 layers` (创建一个关于鸟类的状态机，包含 20 个状态和 2 个图层)。
3. **完成交互**：AI 处理请求后，输入 **End Prompt** 以授权 AI 修改你的 Rive 文件。

### [​](#supported-features) 支持的功能

- 创建状态机、图层、状态、过渡和条件。
- 创建视图模型、属性和实例。
- 创建布局。
- 列出视图模型。
- 创建图形。

随着工具的增加，功能列表将不断演进。

[Framer 与 Rive](https://help.rive.app/editor/share-links/framer-and-rive)[标签系统 (Tagging)](/editor/tagging.md)