---
title: '字体 (Fonts)'
description: '在运行时动态加载和替换字体。'
---

## 在运行时切换字体 (Swapping Fonts at Runtime)

字体可以在运行时动态加载。这允许您在不增加导出的 .riv 文件大小的情况下实现 Rive 内容的本地化。更多信息请参见 [资源加载 (Loading Assets)](/runtimes/loading-assets)。

## 备用字体 (Fallback Fonts)

在渲染文本时，并非所有字符（字形）都可以在当前活动字体中找到。这通常发生在以下情况：

- 使用不支持所有语言或 Unicode 范围的自定义字体
- 嵌入的字体是源字体的子集
- 用户生成或动态文本包含意外字符

为了避免字形缺失或不可见，某些平台支持备用字体。当主字体无法渲染特定字形时，会自动使用备用字体。这些通常是系统字体，通常提供广泛的 Unicode 覆盖。

::: info
**Web 端不支持** 备用字体。

由于安全原因，浏览器不允许 canvas 访问本地系统文件（包括字体）。因此，只能使用显式提供给 Rive 的字体。
:::

::: info
在 iOS 和 Android 上，为备用字体指定的字体大小会被忽略。平台会选择最匹配运行时文本运行（text run）样式和动画的系统字体。
:::

### Apple

从 v6.1 版本开始，在 iOS 和 macOS 上可以使用各种备用选项。Apple 运行时提供了根据请求样式选择系统字体的辅助工具。此外，可以直接使用 `UIFont` / `NSFont`。

::: info
如果未注册任何备选字体，将使用常规粗细和宽度的默认系统字体。
:::

```swift
// 在应用生命周期的早期，调用类似以下的代码：
RiveFont.fallbackFonts = [
    RiveFallbackFontDescriptor(), // 使用默认系统字体
    RiveFallbackFontDescriptor(design: .default, weight: .bold, width: .expanded), // 使用加粗、宽体系统字体
    UIFont(name: "...", size: 20)!
]

// 或者，您可以在运行时根据样式提供不同的字体
```

从 v6.4 版本开始，在 iOS 和 macOS 上，您可以利用更动态的基于回调的选择 API，根据文本运行中设置的样式，为任何缺失字符返回各种字体。

```swift
// 与类似的 fallbackFonts API 一样，您可以使用 Rive 辅助类型
// 或原生 UIFont/NSFont 类型
RiveFont.fallbackFontsCallback = { style in
    switch style.weight {
        case .thin: return [
            RiveFallbackFontDescriptor(weight: .thin),
            UIFont.systemFont(ofSize: 20, weight: .thin)
        ]
        case .bold: return [
            RiveFallbackFontDescriptor(weight: .bold),
            UIFont.systemFont(ofSize: 20, weight: .bold)
        ]
        default: return [
            RiveFallbackFontDescriptor(),
            UIFont.systemFont(ofSize: 20)
        ]
    }
}

// 或者，您也可以使用原始粗细 (raw weight) 来返回各种字体
RiveFont.fallbackFontsCallback = { style in
    switch style.rawWeight {
        case 100: return [
            RiveFallbackFontDescriptor(weight: .thin),
            UIFont.systemFont(ofSize: 20, weight: .thin)
        ]
        case 700: return [
            RiveFallbackFontDescriptor(weight: .bold),
            UIFont.systemFont(ofSize: 20, weight: .bold)
        ]
        default: return [
            RiveFallbackFontDescriptor(),
            UIFont.systemFont(ofSize: 20)
        ]
    }
}
```

### Android

从 v9.12.0 版本开始，Android 上可以使用各种备用字体选项。

::: info
如果未注册备用字体，将使用常规粗细（400, NORMAL）和正常样式的默认系统字体（"sans-serif"）。
:::

`Fonts` 类提供了处理和自定义字体的方法，包括检索系统字体、定义字体选项以及根据特定特征查找备用字体。

#### 1. 设置备用字体

从 v9.12.0 开始，运行时提供了一个新的 API，通过扩展 `FontFallbackStrategy` 接口来将缺失的字体与特定的粗细进行匹配。

该接口包含一个方法：
```kotlin
fun getFont(weight: Fonts.Weight): List<FontBytes>
```

实现者需要覆盖此方法。用户的实现必须接着通过 `FontFallbackStrategy.stylePicker` 设置为当前的备选策略。

**示例：**
```kotlin
class FontFallback : AppCompatActivity(), FontFallbackStrategy {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // 设置备选策略
        FontFallbackStrategy.stylePicker = this
    }

    override fun getFont(weight: Fonts.Weight): List<FontBytes> {
        val desiredWeight = weight.weight
        val fonts = listOf(
            Fonts.FontOpts(
                familyName = "sans-serif",
                weight = Fonts.Weight(weight = desiredWeight) // 查找匹配粗细的字体
            ),
            // 非拉丁语 Unicode 备选
            Fonts.FontOpts("NotoSansThai-Regular.ttf")
        )
        return fonts.mapNotNull {
            // 过滤掉系统中找不到的字体
            FontHelper.getFallbackFontBytes(it)
        }
    }
}
```

该方法返回 `FontBytes` (`ByteArray`) 列表。运行时会按照先进先出 (FIFO) 的顺序尝试使用列表中的字体匹配字符。

备用字体也可以使用 `Rive.setFallbackFont()` 设置，并在 `Fonts.FontOpts` 中定义可选的字体偏好。只有在尝试了 `FontFallbackStrategy.getFont()` 返回的字体后，才会尝试这些字体。

#### 2. Fonts.FontOpts - 字体选项

定义选择备用字体时的字体特征。

- **参数**
  - `familyName`: 字体系列名称 (例如 "Roboto", "NotoSansThai-Regular.ttf")。默认为 `null`。
  - `lang`: 可选的语言规范。默认为 `null`。
  - `weight`: 使用 `Fonts.Weight` 的字体粗细 (例如 `Fonts.Weight.NORMAL`, `Fonts.Weight.BOLD`)。默认为 `Weight.NORMAL`。
  - `style`: 字体样式，`Fonts.Font.STYLE_NORMAL` 或 `Fonts.Font.STYLE_ITALIC`。默认为 `STYLE_NORMAL`。
- **默认示例**
```kotlin
val defaultFontOpts = Fonts.FontOpts.DEFAULT
```

#### 3. 检索备用字体

使用 `FontHelper.getFallbackFont()` 根据指定选项查找合适的备用字体。返回 `Fonts.Font` 对象，如果未找到匹配项则返回 `null`。

**示例：**
```kotlin
val fontOpts = Fonts.FontOpts(familyName = "Roboto", weight = Fonts.Weight.BOLD)
val fallbackFont = FontHelper.getFallbackFont(fontOpts)
```

#### 4. 获取字体文件和字节

- `FontHelper.getFontFile(font: Fonts.Font)`: 检索指定字体的文件。
- `FontHelper.getFontBytes(font: Fonts.Font)`: 读取字体文件并返回其字节。

**示例：**
```kotlin
val fontFile = FontHelper.getFontFile(fallbackFont)
val fontBytes = FontHelper.getFontBytes(fallbackFont)
```

#### 5. Fonts.Weight - 字体粗细

表示字体粗细，允许 0 到 1000 之间的值。

- **预定义粗细**
  - `Fonts.Weight.NORMAL` (400)
  - `Fonts.Weight.BOLD` (700)

**示例：**
```kotlin
val normalWeight = Fonts.Weight.NORMAL
val customWeight = Fonts.Weight.fromInt(500)
```

#### 6. Fonts.Style - 字体样式

表示字体样式，允许 "normal" (常规) 和 "italic" (斜体)。

- **预定义样式**
  - `Fonts.Font.STYLE_NORMAL`
  - `Fonts.Font.STYLE_ITALIC`

**示例：**
```kotlin
val normalStyle = Fonts.Font.STYLE_NORMAL
val italicStyle = Fonts.Font.STYLE_ITALIC
```

#### 7. 获取系统字体

- `FontHelper.getSystemFonts()`: 返回所有可用系统字体系列的映射。

**示例：**
```kotlin
val systemFonts = FontHelper.getSystemFonts()
```
