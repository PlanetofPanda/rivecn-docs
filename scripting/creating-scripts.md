---
title: "创建脚本 (Creating Scripts) - Rive 脚本"
description: "脚本 (Scripting) 学习如何在 Rive 中创建和使用脚本。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 脚本, 创建脚本
---

脚本 (Scripting)

# 创建脚本 (Creating Scripts)

学习如何在 Rive 中创建和使用脚本。

## [​](#overview) 概览

Rive 脚本允许你在编辑器中添加自定义逻辑，扩展动画的交互能力。

## [​](#getting-started) 入门

### 创建新脚本

1. 在层级面板中选择要添加脚本的对象
2. 在检查器中点击 **Add Script** 按钮
3. 选择脚本类型或创建新脚本

### 脚本类型

Rive 支持多种脚本类型：

- **Node Scripts (节点脚本)**：附加到特定节点的脚本
- **Layout Scripts (布局脚本)**：处理布局逻辑的脚本
- **Global Scripts (全局脚本)**：应用于整个画板的脚本

## [​](#script-lifecycle) 脚本生命周期

```javascript
// 初始化时调用
function onLoad() {
  console.log("脚本已加载");
}

// 每帧调用
function onAdvance(elapsedSeconds) {
  // 更新逻辑
}

// 状态机输入变化时调用
function onInputChanged(input) {
  console.log("输入变化:", input.name);
}
```

## [​](#accessing-nodes) 访问节点

```javascript
// 通过名称获取节点
const node = artboard.node("MyNode");

// 访问节点属性
node.x = 100;
node.y = 200;
node.rotation = 45;
node.scaleX = 2;
```

## [​](#examples) 示例

### 跟随鼠标

```javascript
function onPointerMove(x, y) {
  const node = artboard.node("Cursor");
  node.x = x;
  node.y = y;
}
```

### 随时间旋转

```javascript
let totalTime = 0;

function onAdvance(elapsed) {
  totalTime += elapsed;
  const node = artboard.node("Spinner");
  node.rotation = totalTime * 90; // 每秒旋转 90 度
}
```

[脚本概览](/scripting/overview.md)[节点脚本](/scripting/node-scripts.md)
