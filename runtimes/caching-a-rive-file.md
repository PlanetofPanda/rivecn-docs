运行时 (Runtimes)

# 缓存 Rive 文件 (Caching a Rive File)

在多个 Rive 实例之间缓存并复用 Rive 文件对象以提高性能。

## [​](#overview) 概览

当你的应用中有多个 Rive 实例使用同一个 `.riv` 文件时，缓存文件对象可以显著提高性能并减少内存使用。

## [​](#why-cache) 为什么要缓存？

- **减少网络请求**：避免多次下载同一个文件
- **减少内存占用**：多个实例共享同一个文件对象
- **提高加载速度**：已缓存的文件可以立即使用
- **减少解析开销**：文件只需解析一次

## [​](#implementation) 实现方式

### Web (JS)

```javascript
// 加载并缓存文件
let cachedFile = null;

async function getRiveFile() {
  if (!cachedFile) {
    const response = await fetch("my-animation.riv");
    const buffer = await response.arrayBuffer();
    cachedFile = await rive.load(new Uint8Array(buffer));
  }
  return cachedFile;
}

// 在多个实例中使用
const file = await getRiveFile();
const r1 = new rive.Rive({ rivFile: file, canvas: canvas1 });
const r2 = new rive.Rive({ rivFile: file, canvas: canvas2 });
```

### Flutter

```dart
// 使用 FileLoader 缓存
final fileLoader = FileLoader.fromAsset(
  "assets/animation.riv",
  riveFactory: Factory.rive,
);

// FileLoader 会自动管理缓存，可在多个 widget 中复用
RiveWidgetBuilder(fileLoader: fileLoader, ...)
```

### iOS/macOS (Swift)

```swift
// 缓存 RiveFile 实例
class RiveCache {
    static let shared = RiveCache()
    private var cache: [String: RiveFile] = [:]
    
    func getFile(name: String) -> RiveFile? {
        if let cached = cache[name] {
            return cached
        }
        if let file = try? RiveFile(name: name) {
            cache[name] = file
            return file
        }
        return nil
    }
}
```

### Android (Kotlin)

```kotlin
// 使用单例模式缓存
object RiveFileCache {
    private val cache = mutableMapOf<Int, File>()
    
    fun getFile(context: Context, resourceId: Int): File {
        return cache.getOrPut(resourceId) {
            context.resources.openRawResource(resourceId).use { 
                File(it.readBytes()) 
            }
        }
    }
}
```

## [​](#best-practices) 最佳实践

1. **提前加载**：在需要之前预加载文件
2. **适时释放**：不再需要时释放缓存以节省内存
3. **错误处理**：处理加载失败的情况
4. **线程安全**：确保缓存操作是线程安全的

[加载资产 (Loading Assets)](/runtimes/loading-assets.md)[数据绑定 (Data Binding)](/runtimes/data-binding.md)
