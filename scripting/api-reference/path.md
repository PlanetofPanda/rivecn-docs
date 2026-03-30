---
title: "Path (路径) - Rive 脚本"
description: "Rive 脚本中的路径操作 API。 Path API 允许你在脚本中操作和查询路径数据。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 脚本, API 参考, Path
---

脚本 API

# Path (路径)

Rive 脚本中的路径操作 API。

## [​](#overview) 概览

Path API 允许你在脚本中操作和查询路径数据。

## [​](#accessing-paths) 访问路径

```javascript
// 获取路径节点
const path = artboard.node("MyPath");

// 检查是否是路径
if (path.isPath) {
  // 执行路径操作
}
```

## [​](#path-properties) 路径属性

```javascript
// 获取路径长度
const length = path.length;

// 获取路径边界
const bounds = path.bounds;
```

## [​](#path-operations) 路径操作

### 获取路径上的点

```javascript
// 获取路径上某一位置的点 (0-1 范围)
const point = path.positionAt(0.5);
console.log("X:", point.x, "Y:", point.y);
```

### 获取切线

```javascript
// 获取路径上某一位置的切线方向
const tangent = path.tangentAt(0.5);
```

## [​](#use-cases) 使用场景

- 沿路径动画对象
- 计算路径交点
- 动态修改路径形状

[Vector API](/scripting/api-reference/vector.md)[Mat2D API](/scripting/api-mat2d.md)
