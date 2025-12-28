Fundamentals

# Groups

Use groups to organize your graphics or to add extra transform spaces.

Activate the Group tool with the `G` shortcut. Click anywhere in an artboard to add a new group. Now drag and drop objects into the group in the Hierarchy.
You can also wrap a selection of shapes into a group with `⌘`+`G` in macOS or `Ctrl`+`G` in Windows.
Unwrap a group with `⌘`+`Shift`+`G` in macOS or `Ctrl`+`Shift` +`G` in Windows.

## [​](#group-style) Group Style

The Style property of a group can be set to Group or Target.

### [​](#group) Group

Group is the default behavior, which behaves as described in the [Selecting and Navigating Groups](/docs/editor/fundamentals/selecting-and-navigating-groups).

### [​](#target) Target

The Target option draws a different icon on the Stage that is always visible, regardless of whether the group has children (usually a group only displays an icon if it is empty). When a group displays as a Target, it also disables the functionality described in [Selecting and Navigating Groups](/docs/editor/fundamentals/selecting-and-navigating-groups) section. This means you can immediately click through to any child of the group (no need to double-click, enter/esc, or Deep Select).
![Groups change Target](images/groups-targets.gif)
The Target option is particularly useful when working with Constraints.
[## Constraints

Constraints are a way to control the properties of an object through another target object. Some constraints can set limits on these properties (and their hierarchical relationships), while others can copy properties from one object to another.](/docs/editor/constraints)

[Procedural Shapes](/docs/editor/fundamentals/procedural-shapes)[Selecting and Navigating Groups](/docs/editor/fundamentals/selecting-and-navigating-groups)