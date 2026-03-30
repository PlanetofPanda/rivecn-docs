---
title: "示例 (Demos) - Rive 脚本"
description: "脚本 (Scripting) Rive 脚本示例和演示。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 脚本, 示例
---

脚本 (Scripting)

# 示例 (Demos)

Rive 脚本示例和演示。

## [​](#overview) 概览

本页收集了一些实用的 Rive 脚本示例，帮助你快速上手。

## [​](#basic-examples) 基础示例

### 跟随鼠标

```javascript
function onPointerMove(x, y) {
  const cursor = artboard.node("Cursor");
  cursor.x = x;
  cursor.y = y;
}
```

### 持续旋转

```javascript
let angle = 0;

function onAdvance(elapsed) {
  angle += elapsed * 90; // 每秒 90 度
  artboard.node("Spinner").rotation = angle;
}
```

### 弹跳动画

```javascript
let velocity = 0;
let position = 0;
const gravity = 500;
const bounce = 0.7;

function onAdvance(elapsed) {
  velocity += gravity * elapsed;
  position += velocity * elapsed;
  
  if (position > 300) {
    position = 300;
    velocity = -velocity * bounce;
  }
  
  artboard.node("Ball").y = position;
}
```

## [​](#interactive-examples) 交互示例

### 拖拽

```javascript
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

function onPointerDown(x, y) {
  const node = artboard.node("Draggable");
  isDragging = true;
  offsetX = node.x - x;
  offsetY = node.y - y;
}

function onPointerMove(x, y) {
  if (isDragging) {
    const node = artboard.node("Draggable");
    node.x = x + offsetX;
    node.y = y + offsetY;
  }
}

function onPointerUp() {
  isDragging = false;
}
```

## [​](#resources) 资源

- [官方示例库](https://github.com/rive-app/rive-examples)
- [社区论坛](https://community.rive.app)

[创建脚本](/scripting/creating-scripts.md)[脚本概览](/scripting/overview.md)
