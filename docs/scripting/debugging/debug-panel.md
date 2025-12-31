---
title: "调试面板 (Debug Panel)"
description: ""
---

调试面板允许您检查脚本输出并检测代码中的问题。

## 工具栏 (Toolbar)

使用面板左侧的选项卡在 [控制台 (Console)](#console) 和 [问题 (Problems)](#problems) 之间切换。使用面板右端的图标可以打开/关闭面板以及切换全屏模式。当“控制台”选项卡处于活动状态时，会显示复制和清空控制台的额外选项。

![调试面板工具栏](/images/scripting/debugging/debug-panel-toolbar.png)

## 控制台 (Console)

控制台显示脚本在播放期间的所有日志输出。您可以使用标准的 [Luau print()](https://create.roblox.com/docs/reference/engine/globals/LuaGlobals#print) 函数来记录信息、变量值和消息。

```lua
print("Rive 太酷了！")
print("已用时间：", seconds)
```

![控制台打印](/images/scripting/debugging/console-print.png)

## 问题 (Problems)

“问题”选项卡列出了在脚本运行 *之前* 检测到的问题，例如类型不匹配、语法错误或缺少数据绑定。

选项卡上的徽标显示了在所有脚本中发现的问题数量。

点击一个问题将直接跳转到受影响的代码行。
您还可以将鼠标悬停在编辑器中任何带有下划线的代码上，以查看解释或建议的修复方法。

![问题面板](/images/scripting/debugging/problems-panel.png)