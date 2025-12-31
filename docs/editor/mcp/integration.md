---
title: "Rive MCP 集成"
---

<EarlyAccess featureName="MCP">
   MCP 集成最初在 Mac 桌面应用的 Early Access（抢先体验）版本中提供。Windows 支持即将推出。
</EarlyAccess>

## 入门

您可以通过 MCP（Model Context Protocol，模型上下文协议）将 Rive 编辑器连接到 AI 工具。第一套工具旨在让 AI 处理重复性任务，例如创建复杂的视图模型（View Models）、包含数百个状态/图层的状态机、布局、形状等。

::: info
目前的初始版本仅适用于少数支持 MCP 的 AI 工具。我们目前建议使用 Cursor，支持列表未来将会扩大。
:::

## 安装

### Mac

### 安装 Rive Early Access

    安装最新版本的 Mac [Rive Early Access](https://rive.app/downloads) 桌面应用。

### 设置 Cursor

    创建一个 [Cursor](https://www.cursor.com/) 账户并安装该应用。

### 保存配置

    将以下 JSON 代码片段保存到您的电脑，命名为 `mcp.json`。
```json
  {
    "mcpServers": {
        "rive": {
            "url": "http://localhost:9791/sse"
        }
    }
  }
```

### 配置 MCP

    如果您在访达（Finder）中启用了显示隐藏文件和文件夹，请将 `mcp.json` 移动到主目录下的 `.cursor` 文件夹中。
    或者，您可以使用终端（Terminal）。打开终端应用并运行以下命令：
```bash
    cp /path/to/mcp.json ~/.cursor
```

### 在 Cursor 中启用

### 打开设置

        打开 Cursor，导航到右上角的设置面板。
        ![](/images/editor/cursor-settings-button.png)

### 导航到 MCP 部分

      ![](/images/editor/cursor-mcp-settings.png)

### 验证连接

        如果一切安装正确，您应该能看到 Rive 作为一个可用的 MCP 服务器出现在列表中。
        ![](/images/editor/cursor-mcp-connection.png)

::: info
要使 Rive 服务器可用，您必须已经打开了 Rive Early Access 应用。
:::

### 启用连接

        将 MCP 连接设置为 `On`（开启）。

关于设置 MCP 的更多信息可以在[这里](https://docs.cursor.com/context/model-context-protocol)找到。

## 它能做什么？

一旦 Cursor 安装并配置正确，就可以开始向 AI 发出指令（prompt）了。

### 打开您的 Rive 文件

    打开一个 Rive 文件并创建一个画板。

### 输入您的指令

    在聊天界面输入您的指令并回车。AI 会花一点时间处理请求。
    
    示例指令：
```
    创建一个关于鸟类的状态机，包含 20 个状态和 2 个图层
```

### 完成交互

    请求处理完毕后，输入 **End Prompt**（结束指令），以允许 AI 对 Rive 文件进行更改。

### 支持的功能

- 创建状态机、图层、状态、过渡和条件
- 创建视图模型（View Models）、属性和实例
- 创建布局
- 列出视图模型
- 创建形状

::: info
随着更多工具的加入，此功能列表将随时间不断演进。
:::
