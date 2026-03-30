---
title: "Vector (矢量) - Rive 脚本"
description: "Rive 脚本中的矢量和几何工具。 Rive 脚本提供了用于处理 2D 矢量和几何运算的 API。"
head:
  - - meta
    - name: keywords
      content: Rive, Rive 中文文档, Rive 脚本, API 参考, Vector
---

脚本 API

# Vector (矢量)

Rive 脚本中的矢量和几何工具。

## [​](#overview) 概览

Rive 脚本提供了用于处理 2D 矢量和几何运算的 API。

## [​](#vec2d) Vec2D

`Vec2D` 是一个 2D 矢量类，用于表示位置、方向或位移。

### 创建矢量

```javascript
// 创建零矢量
const v1 = new Vec2D();

// 从坐标创建
const v2 = new Vec2D(10, 20);

// 从另一个矢量复制
const v3 = Vec2D.copy(v2);
```

### 属性

```javascript
v.x // X 坐标
v.y // Y 坐标
```

### 运算

```javascript
// 加法
const sum = Vec2D.add(v1, v2);

// 减法
const diff = Vec2D.subtract(v1, v2);

// 缩放
const scaled = Vec2D.scale(v, 2.0);

// 归一化（单位矢量）
const normalized = Vec2D.normalize(v);

// 长度
const length = Vec2D.length(v);

// 点积
const dot = Vec2D.dot(v1, v2);
```

## [​](#mat2d) Mat2D

`Mat2D` 是一个 2D 变换矩阵。请参阅 [Mat2D API](/scripting/api-mat2d.md) 了解详情。

## [​](#aabb) AABB (轴对齐边界框)

用于碰撞检测和边界计算的轴对齐边界框。

```javascript
// 获取画板边界
const bounds = artboard.bounds;

// 访问边界属性
const minX = bounds.minX;
const minY = bounds.minY;
const maxX = bounds.maxX;
const maxY = bounds.maxY;
const width = bounds.width;
const height = bounds.height;
```

[Mat2D API](/scripting/api-mat2d.md)[脚本概览](/scripting/overview.md)
