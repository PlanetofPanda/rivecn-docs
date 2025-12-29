脚本 (Scripting)

# 调试面板 (Debug Panel)

使用调试面板诊断脚本问题。

## [​](#overview) 概览

Rive 编辑器内置了调试工具，帮助你开发和调试脚本。

## [​](#accessing-debug-panel) 访问调试面板

1. 在编辑器中打开你的 Rive 文件
2. 点击底部工具栏的 **Debug** 按钮
3. 调试面板将显示在编辑器底部

## [​](#features) 功能

### 控制台输出

脚本中的 `console.log()` 输出将显示在调试面板中：

```javascript
console.log("调试信息");
console.warn("警告信息");
console.error("错误信息");
```

### 变量监视

你可以监视脚本变量的值：

1. 在调试面板中点击 **Add Watch**
2. 输入变量名
3. 变量值将实时更新

### 断点

在脚本中添加断点以暂停执行：

1. 在代码行号旁点击设置断点
2. 当执行到断点时，脚本将暂停
3. 你可以检查当前变量状态

## [​](#common-issues) 常见问题

### 脚本不执行
- 确保脚本已正确附加到节点
- 检查状态机是否正在运行

### 控制台无输出
- 确保 `console.log` 语句语法正确
- 检查调试面板是否打开

[创建脚本](/scripting/creating-scripts.md)[脚本概览](/scripting/overview.md)
