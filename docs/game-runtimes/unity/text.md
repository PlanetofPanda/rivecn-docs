---
title: '文本 (Text)'
description: ''
---

import LegacyDataBindingNotice from '/snippets/unity/legacy-databinding-notice.mdx';

<LegacyDataBindingNotice subject="Text" />

有关 Rive 文本的更多信息，请查阅相应的运行时及编辑器文档。

**[文本 (Text)](/runtimes/text)**

    关于 Rive 文本的运行时文档。

**[文本概览 (Text Overview)](/editor/text/text-overview)**

    关于 Rive 文本的编辑器文档。

## 在 Unity 中更新 Rive 文本

::: info
必须在编辑器中设置唯一的 Text Run 名称，以便于在运行时被发现。详情请参阅文本运行时文档。
:::

可以通过提供 **名称** 和 **新值**，在画板（Artboard）实例中更新指定的 Text Run：

```json
Artboard artboard;

....

artboard.SetTextRun("textRunName", "newValue");
```

::: info
**注意：** 此 API 仅更新给定画板上的文本运行（Text Runs），不会更新组件实例上的文本运行。
:::

### 嵌套文本运行 (Nested Text Runs)

有关在 Unity 中更新嵌套文本运行的更多信息，请[参考此示例](/runtimes/text#read-update-nested-text-runs-at-runtime)。