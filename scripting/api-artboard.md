Scripting API

# Artboard

Represents a Rive artboard instance, providing drawing, advancing,
interaction handling, and access to named nodes and data.

## [​](#fields) Fields

### [​](#frameorigin) `frameOrigin`

If true, the artboard’s origin is treated as the frame origin.

### [​](#data) `data`

The typed data associated with the artboard.

### [​](#width) `width`

The width of the artboard.

Copy

Ask AI

```
self.artboardInstance = self.myArtboard:instance()
if self.artboardInstance then
   self.artboardInstance.width = 20
end
```

### [​](#height) `height`

The height of the artboard.

Copy

Ask AI

```
self.artboardInstance = self.myArtboard:instance()
if self.artboardInstance then
   self.artboardInstance.height = 20
end
```

## [​](#methods) Methods

### [​](#draw) `draw`

Draws the artboard using the provided renderer.

### [​](#advance) `advance`

Advances the artboard by the given time in seconds. Returns true if the
artboard should continue receiving advance calls.

### [​](#instance) `instance`

Creates a new instance of the artboard with independent state.

### [​](#bounds) `bounds`

Returns the bounding box of the artboard as two [Vector](/docs/scripting/api-reference/vector) values: the
minimum point and the maximum point.

Copy

Ask AI

```
local minPt, maxPt = self.myArtboard:bounds()
print("Bounds width", maxPt.x - minPt.x)
print("Bounds height", maxPt.y - minPt.y)
```

### [​](#node) `node`

Returns the node with the given name, or nil if no such node exists.

### [​](#pointerdown) `pointerDown`

Pointer event down handler. Each returns a hit-test result, where 0
indicates no hit and non-zero values indicate a hit.

### [​](#pointerup) `pointerUp`

Pointer event up handler. Each returns a hit-test result, where 0
indicates no hit and non-zero values indicate a hit.

### [​](#pointermove) `pointerMove`

Pointer event move handler. Each returns a hit-test result, where 0
indicates no hit and non-zero values indicate a hit.

### [​](#pointerexit) `pointerExit`

Pointer event exit handler. Each returns a hit-test result, where 0
indicates no hit and non-zero values indicate a hit.

### [​](#addtopath) `addToPath`

Adds the artboard’s geometry to the given path, optionally transformed
by the provided matrix.

[Keyboard Shortcuts](/docs/scripting/keyboard-shortcuts)[BlendMode](/docs/scripting/api-reference/blend-mode)