---
title: 向量 (Vector)
---

代表一个具有 x 和 y 分量的向量。

## 字段 (Fields)

### `x`

x 分量。请注意，此字段是只读的。
```lua
local v = Vector.xy(10, -5)
local xValue = v.x  -- 10
```

### `y`

y 分量。请注意，此字段是只读的。
```lua
local v = Vector.xy(10, -5)
local yValue = v.y  -- -5
```

## 构造函数 (Constructors)

### `xy`

创建一个具有指定 x 和 y 分量的向量。
```lua
local v = Vector.xy(5, -2)  -- (5, -2)
```

### `origin`

返回零向量 (0, 0)。
```lua
local origin = Vector.origin()  -- (0, 0)
```

## 方法 (Methods)

### `length`

提供对向量分量的索引访问。
```lua
local v = Vector.xy(3, 4)
print(v[1], v[2]) -- 3  4
```
返回向量的长度。
```lua
local v = Vector.xy(3, 4)
local len = v:length()  -- 5
```

### `lengthSquared`

返回向量长度的平方。
```lua
local v = Vector.xy(3, 4)
local len2 = v:lengthSquared()  -- 25
```

### `normalized`

返回向量的归一化副本。如果长度为零，则结果为零向量。
```lua
local v = Vector.xy(10, 0)
local n = v:normalized()  -- (1,0)
```

### `__eq`

如果两个向量的分量相等，则返回 true。
```lua
local a = Vector.xy(1, 2)
local b = Vector.xy(1, 2)
local c = Vector.xy(2, 1)
print(a == b)  -- true
print(a == c)  -- false
```

### `__unm`

返回取反后的向量。
```lua
local v = Vector.xy(2, -3)
local neg = -v   -- (-2, 3)
```

### `__add`

返回两个向量之和。
```lua
local a = Vector.xy(2, 3)
local b = Vector.xy(-1, 5)
local c = a + b  -- (1, 8)
```

### `__sub`

返回两个向量之差。
```lua
local a = Vector.xy(2, 3)
local b = Vector.xy(-1, 5)
local c = a - b  -- (3, -2)
```

### `__mul`

返回经由给定数值缩放后的向量。
```lua
local v = Vector.xy(3, -2)
local doubled = v * 2    -- (6, -4)
```

### `__div`

返回经由给定数值除后的向量。
```lua
local v = Vector.xy(6, -4)
local half = v / 2    -- (3, -2)
```

### `distance`

返回到另一个向量的距离。
```lua
local a = Vector.xy(0, 0)
local b = Vector.xy(3, 4)
print(a:distance(b))  -- 5
```

### `distanceSquared`

返回到另一个向量距离的平方。
```lua
local a = Vector.xy(0, 0)
local b = Vector.xy(3, 4)
print(a:distanceSquared(b))  -- 25
```

### `dot`

返回该向量与另一个向量的点积 (dot product)。
```lua
local a = Vector.xy(1, 2)
local b = Vector.xy(3, 4)
print(a:dot(b))  -- 11  (1*3 + 2*4)
```

### `lerp`

返回该向量与另一个向量之间的线性插值。使用参数 `t`，其中 0 返回原向量，1 返回另一个向量。
