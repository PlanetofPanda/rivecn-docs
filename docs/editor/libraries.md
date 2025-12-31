---
title: "库 (Libraries)"
description: "只需发布一次带有动态数据的组件，即可在项目的任何地方重用它们。"
---

::: info
"库"功能仅在 Voyager 和 Enterprise 方案中提供。[了解更多关于我们的方案和定价](https://rive.app/pricing)。
:::

## 简介 (Introduction)

"库"（Libraries）极大地方便了在不同 Rive 文件之间共享[组件 (components)](editor/fundamentals/components) 及其视图模型。过去，您可能依赖嵌套画板和复制粘贴的工作流来共享元素。这对于个人来说可行，但难以规模化：导出文件臃肿、版本混乱、团队也难以跟踪更改细节。

有了"库"功能：

- 组件可以发布并在整个项目文件中重用。
- 更新通过版本历史和更改通知向下游传递。
- 团队可以协作而无需担心资产不匹配的问题。

::: info
"库"功能仅在 Voyager 和 Enterprise 方案中提供。[了解更多关于我们的方案和定价](https://rive.app/pricing)。
:::

## 创建库 (Creating a Library)

任何文件都可以变成一个库。首先，您需要先创建一个[组件](editor/fundamentals/components)或视图模型（View Model），然后才能将该文件发布为库。在舞台上选中一个画板，点击检查器中的组件图标或按 `Shift` + `N` 切换其状态为组件。

![Image](/images/editor/libraries/01-component.webp)

文件中有了组件或视图模型后，通过工具栏上的导出动作，或通过文件菜单，选择 **Publish Library**（发布库）选项。发布面板允许您选择哪些组件、视图模型和枚举（enums）将作为库的一部分被发布。

![Image](/images/editor/libraries/15-publish-alt.webp)

::: tip
您可以通过标签栏和文件浏览器中的图标来识别库文件。
:::

## 从库导入 (Importing from a Library)

要开始使用已发布库中的组件和视图模型，请选择资产面板（Asset settings）或数据面板（Data settings）中的库图标。库面板将显示在层级/资产/数据列旁边，并列出当前活跃文件可用的库列表。

![Image](/images/editor/libraries/05-browse.webp)

::: info
目前，一个 Rive 文件只能访问同一项目内的库。跨项目（或跨工作空间）的库支持即将推出。在那之后不久，我们也计划推出公共库。
:::

在面板中选择一个列出的库，将展示其可用的组件、视图模型和枚举。选择您想要添加到文件中的元素，并使用检查器中的 **Add to File**（添加到文件）动作进行导入。

![Image](/images/editor/libraries/06-add-component.webp)

::: tip
您可以使用版本下拉菜单浏览并导入库及其组件的历史迭代版本。
:::

![Image](/images/editor/libraries/07-version-dropdown.webp)

将所选元素添加到文件后，您可以通过资产和数据面板访问并重用这些组件和视图模型。源自库的元素可以根据常规图标右下角显示的库图标来识别。

![Image](/images/editor/libraries/08-assets.webp)

## 更新库 (Updating a Library)

发布后，您可以继续进行更改，添加或删除组件、视图模型和枚举。通过导出或文件菜单中的相同选项重新发布库（Republish）。发布库的更新版本后，任何已导入该库元素的下游文件都会显示一个小徽标，指示有可用更新。

![Image](/images/editor/libraries/09-update-badge.webp)

要更新组件，在资产面板中右键点击该组件，然后从右键菜单中选择 **Library Options** -> **Update Component**（更新组件）。选择您想要更新的库元素，并点击 **Update Selected**（更新选定项）。

![Image](/images/editor/libraries/10-update.webp)

## 分离 (Detatching)

从库导入组件并在舞台上创建实例后，您可以选择将其分离。分离（Detaching）组件会解除其与源库的耦合，并将其内容复制到您的当前活跃文件中。任何对它的引用都将重定向到这个新的本地副本。如果您想修改某个组件而不更改源文件，可以选择分离它。

::: info
组件一旦被分离，就无法重新连接回原来的库。
:::

![Image](/images/editor/libraries/13-detach.webp)

## 导出选项 (Export Options)

通过使用库，您在文件之间建立了一系列依赖关系。例如，一个导入组件的实例依赖于它所属的库文件，而该库文件可能又依赖于组件中使用的某个图像资产，甚至是另一个完全不同的库中的另一个组件。

导出选项控制着组件及其依赖的所有资产如何导出到 `.riv` 文件中。这些选项在资产和组件层级均可用，对于库则有额外的特殊设置。

要访问给定组件、资产或库的导出选项，请在资产面板中选中它，并在检查器中进行设置。

![Image](/images/editor/libraries/12-component-level-options.webp)

- **Automatic (自动)：** 如果该资产/组件在舞台上的某处被使用，则包含在导出中。对于包含在库中的资产，此选项继承自源文件。
- **Force Export (强制导出)：** 无论文件内是否引用了该资产/组件，都强制将其导出。
- **Prevent Export (禁止导出)：** 无论文件内是否引用了该资产/组件，都不将其包含在导出中。

您可能需要根据运行时的需求（而非设计时的需求）来调整这些选项。例如，设计中使用的图像将在运行时从外部源提供，因此不需要包含在 `.riv` 文件中。或者，您打算通过数据绑定在多个 Rive 文件中同时使用同一个库组件，通过单独导出该库组件并从宿主文件中排除它，可以防止重复导出。

::: info
目前，对于库组件内的资产，导出行为只能在库级别设置，而不能针对每个组件单独设置。操作方法是：将面板显示模式改为 "Source/Type"（源/类型），然后在资产面板中选择该库项。
:::

![Image](/images/editor/libraries/11-library-wide-options.webp)

## 取消发布库 (Unpublishing a Library)

使用文件菜单中的 **Unpublish Library**（取消发布库）动作，可以防止新文件访问该库及其组件。取消发布不会从已经导入了它们的宿主文件中删除库组件。已导入库组件的宿主文件将保留对该库先前发布版本的访问权限。您可以随时重新发布库。

![Image](/images/editor/libraries/14-unpublish.webp)
