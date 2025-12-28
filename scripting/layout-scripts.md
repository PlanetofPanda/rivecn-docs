Protocols

# Layout Scripts

Layout Scripts extend the behavior of [Node Scripts](/docs/scripting/protocols/node-scripts), giving you programmatic control over Layout components. They let you measure, size, and react to changes in your Layout’s geometry. They are ideal for building custom layout behaviors such as masonry grids, carousels, spacing logic, and more.

## [​](#examples) Examples

## [​](#adding-a-layout-script-to-a-layout) Adding a Layout Script to a Layout

1. Add a new [Layout](/docs/editor/layouts/layouts-overview) to the scene.
2. [Create a new script](/docs/scripting/creating-scripts) and select **Layout** as the type.
3. Add your script as a child of the Layout.

## [​](#lifecycle) Lifecycle

Layout Scripts add two additional lifecycle functions:

- `measure(self): Vec2D` — optional
- `resize(self, size: Vec2D)` — required

### [​](#measure) Measure

Measure lets your script propose an ideal size for the layout.
Rive will use this value unless a Fit rule overrides it.
Measure only has an effect on layouts with a Fit type of Hug.

Copy

Ask AI

```
function measure(self: MyLayout): Vec2D
  -- Always declare that this layout would like to be 100×100
  return Vec2D.xy(100, 100)
end
```

### [​](#resize) Resize

Resize runs whenever the Layout receives a new size from its parent or from your measure function.
This is where you position or update child nodes, recalculate flow, or react to container changes.

Copy

Ask AI

```
-- Called whenever the Layout is resized.
function resize(self: MyLayout, size: Vec2D)
  print("New size:")
  print("x:", size.x)
  print("y:", size.y)
end
```

[Node Scripts](/docs/scripting/protocols/node-scripts)[Converter Scripts](/docs/scripting/protocols/converter-scripts)