Interface Overview

# Stage

The Stage is an infinite canvas where you can place artboards containing all your graphics.

## [​](#selection) Selection

Select an object by simply clicking on it, or click and drag over a number of shapes to perform a marquee selection. Hold the `Shift` modifier key to add or remove from an existing selection (by either single clicking or marqueeing).

### [​](#double-click) Double-click

To select an object in a group, double-click on the object you want to select. This takes you down one level in the hierarchy and allows you to select any object on that level.

### [​](#deep-select) Deep select

In order to select an object within a group, hold `⌘` (macOS) or `Ctrl` (Windows) and click directly on it. This is a quick way to cut through multiple layers of nested groups and directly select a shape. This can be a very fast way to navigate a complex file, especially when used together with the Select behind technique and the Enter and Esc shortcuts described below.

### [​](#select-behind) Select behind

When you hover over an object on the stage, Rive draws an outline around it. This is a hint to let you know that if you click, this object will be selected. Sometimes multiple objects can overlap one another, making it difficult to select the exact one you want. In this case, press `Alt` to cycle to the next object under your cursor. You can continue to press `Alt` until the object you want is outlined. Now click to select it.

### [​](#enter-and-esc-shortcuts) Enter and Esc shortcuts

Use the `Enter` key to quickly navigate down the Hierarchy. If you have a group selected, this allows you to quickly select the first child.
Use the `Esc` key to quickly navigate up the Hierarchy. This allows you to quickly select the parent of your current selection.

## [​](#navigating) Navigating

### [​](#panning) Panning

![Image](images/image_0.png)
To pan the Stage, right-click and drag your mouse. If you have a trackpad, scroll left and right. Alternatively, hold `Spacebar` to trigger the Pan Tool. With the Pan Tool enabled, click and drag to move to your desired point on the Stage.

### [​](#zooming) Zooming

![Image](images/image_1.png)
With your cursor positioned over the Stage, hold `⌘` / `Ctrl` and scroll your mouse or trackpad to zoom in and out. Alternatively, use the `+` / `-` keys to zoom between preset points. You can quickly revert back to 100% with `⌘` / `Ctrl` and `0`.

### [​](#fit) Fit

![Image](images/image_2.png)
Tap `F` to simultaneously zoom and position your active artboard to fit within the viewable Stage area. Note that if you have an object within the Hierarchy selected this action will be performed on the object as opposed to the artboard.
> There are a few scenarios where you may have “lost” an artboard, while still seeing the hierarchy. This typically happens when the position of an artboard is accidentially keyed or the zoom level is too far out. Using the `F`shortcut will help you fix the issue by Filling the stage with the selected object or artboard.

[Inspector](/docs/editor/interface-overview/inspector)[Overview](/docs/editor/fundamentals/overview)