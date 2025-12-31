---
title: '运行时资产替换 (Runtime Asset Swapping)'
description: ''
---

您可以使用 `CustomAssetLoaderCallback` 在运行时动态地替换 Rive 动画中的资产。这允许您在 Rive 文件播放时更改字体、图像或音频文件，从而实现动态视觉效果。

## 设置资产加载 (Setting Up Asset Loading)

要在运行时替换资产，请在加载 Rive 文件时提供一个回调函数：
```csharp
File.Load(Asset asset, CustomAssetLoaderCallback customAssetLoaderCallback);
File.Load(TextAsset asset, CustomAssetLoaderCallback customAssetLoaderCallback);
File.Load(byte[] riveFileByteContents, CustomAssetLoaderCallback customAssetLoaderCallback);
```

每当运行时需要加载资产时，都会调用您的回调函数。如果您的回调函数处理了该资产的加载，应返回 `true`；如果返回 `false`，则运行时将采用默认的加载行为来处理。

以下是一个展示如何在运行时替换字体的示例：
```csharp
private FontOutOfBandAsset m_fontOobAsset;
private File m_file;
FontEmbeddedAssetReference fontEmbeddedAssetReference

private bool OobAssetLoaderDelegate(EmbeddedAssetReference assetReference)
{
    // 保留对 fontEmbeddedAssetReference 的引用，以便稍后再次更新字体
    fontEmbeddedAssetReference = assetReference as FontEmbeddedAssetReference;
    if (fontEmbeddedAssetReference != null)
    {
        fontEmbeddedAssetReference.SetFont(m_fontOobAsset);
        return true;
    }
    return false;
}

private void Start()
{    
    m_fontOobAsset.Load();  
    m_file = Rive.File.Load(asset, OobAssetLoaderDelegate);

    // 之后您可以再次调用 fontEmbeddedAssetReference.SetFont() 来更换字体
}

private void OnDestroy()
{  
    m_fontOobAsset.Unload();  
    m_file.Dispose();
}
```

#### 带有回退机制的重载方法

`Rive.File.Load()` 的一个重载版本包含 `fallbackToAssignedAssets` 参数。

如果将其设置为 `true`，且您的自定义加载器没有处理某个特定的资产，运行时将查找 Unity 检查器中分配给该 Rive 资产的引用，并在其存在时自动加载。当您只想替换部分资产，而对其余资产依赖默认引用时，这非常方便。
```csharp
var file = File.Load(myRiveAsset, MyCustomAssetLoader, fallbackToAssignedAssets: true);
```

## 资产类型 (Asset Types)

您可以在运行时替换以下类型的资产：

* `FontOutOfBandAsset`：用于字体文件
* `ImageOutOfBandAsset`：用于图像文件
* `AudioOutOfBandAsset`：用于音频文件

## 资产引用类型 (Asset Reference Types)

在回调函数中处理资产时，您需要在设置资产之前检查 `EmbeddedAssetReference` 的具体类型。每种资产类型都有其对应的引用类，并带有特定的设置方法：
```csharp
private bool AssetLoaderDelegate(EmbeddedAssetReference assetReference)
{
    // 处理字体资产
    if (assetReference is FontEmbeddedAssetReference fontReference)
    {
        fontReference.SetFont(myFontAsset);
        return true;
    }
    
    // 处理图像资产
    if (assetReference is ImageEmbeddedAssetReference imageReference)
    {
        imageReference.SetImage(myImageAsset);
        return true;
    }
    
    // 处理音频资产
    if (assetReference is AudioEmbeddedAssetReference audioReference)
    {
        audioReference.SetAudio(myAudioAsset);
        return true;
    }
    
    return false;
}
```

## 内存管理 (Memory Management)

在使用运行时资产替换时，我们建议遵循以下最佳实践：

1. 在回调函数中使用带外资产（Out-Of-Band asset）之前，务必先调用其 `Load()` 方法。

2. 正确释放资源：
   * 当不再需要资产时，调用其 `Unload()` 方法。
   * 完成 Rive 文件的使用后，调用其 `Dispose()` 方法。

## 动态创建带外资产 (Creating Out-of-Band Assets Dynamically)

如果您有一个资产在构建时不在 Unity 项目中（例如，您正在从 CDN 加载图像），您可以使用 `OutOfBandAsset.Create<T>()` 方法在运行时创建一个带外资产。在这里，`bytes` 参数应该是该资产的原始文件数据。

这适用于字体、图像和音频，只要您使用相应的类型（`FontOutOfBandAsset`、`ImageOutOfBandAsset` 或 `AudioOutOfBandAsset`）。
```csharp
byte[] imageBytes = /* 从 CDN 或其他地方获取 */;
var myImageAsset = OutOfBandAsset.Create<ImageOutOfBandAsset>(imageBytes);
```

## 示例 (Example)

要查看 Unity 运行时资产替换的演示，请参考 [Rive Unity 示例库](https://github.com/rive-app/rive-unity-examples) 中的 **Image Swapping** 场景。