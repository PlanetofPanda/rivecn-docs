脚本 (Scripting)

# 协议 (Protocols)

Rive 脚本协议和接口定义。

## [​](#overview) 概览

协议定义了脚本与 Rive 运行时交互的标准接口。

## [​](#node-protocol) 节点协议

所有可脚本化的节点都实现以下接口：

```typescript
interface ScriptableNode {
  x: number;
  y: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  opacity: number;
}
```

## [​](#layout-protocol) 布局协议

布局脚本实现以下接口：

```typescript
interface LayoutScript {
  onMeasure(width: number, height: number): void;
  onLayout(): void;
}
```

## [​](#event-protocol) 事件协议

事件处理接口：

```typescript
interface EventHandler {
  onPointerDown?(x: number, y: number): void;
  onPointerUp?(x: number, y: number): void;
  onPointerMove?(x: number, y: number): void;
  onPointerEnter?(): void;
  onPointerExit?(): void;
}
```

[布局脚本](/scripting/layout-scripts.md)[节点脚本](/scripting/node-scripts.md)
