Android

# Android

Rive 的 Android 运行时。

请注意，某些 Rive 功能可能尚未在特定运行时中受支持，或者可能需要使用 Rive 渲染器。有关更多详细信息，请参阅 [功能支持](/docs/feature-support) 和 [选择渲染器](/docs/runtimes/choose-a-renderer) 页面。

## [​](#overview) 概览

欢迎在 Android 上使用 Rive。Rive 运行时库是开源的，Android 版本可在 [rive-android](https://github.com/rive-app/rive-android) GitHub 仓库中找到。

### [​](#note-on-android-apis) 关于 Android API 的说明

Rive for Android 提供了两个主要 API 用于将 Rive 集成到你的应用程序中。
**旧版基于视图的 API (Legacy View-based API)**
此 API 基于 Android Views 和 XML 布局。它是稳定的，并广泛部署在生产应用程序中。它也通过使用 [AndroidView 支持 Compose](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LegacyComposeActivity.kt)，尽管它需要一些样板代码来设置。
此 API 的入口点是 `RiveAnimationView`，可以将其添加到 XML 布局中或以编程方式实例化。
我们称之为“旧版”API，因为我们未来的开发工作重点是新的 Compose API，尽管此 API 在一段时间内将继续受到支持和维护。
**新 Compose API (技术预览)**
此 API 专为 Jetpack Compose 设计，允许以更现代和声明性的方式构建 UI。目前处于技术预览阶段，这意味着它仍处于积极开发中，并可能在未来版本中通过重大更改 (breaking changes)。**目前不建议用于生产环境**。非常鼓励对此 API 的反馈，以帮助我们改进它。
此 API 的入口点是 `RiveUI` composable 函数，可以直接在 Compose UI 代码中使用。
除了提供更符合习惯的 Compose 体验外，此 API 还由更强大的线程模型提供支持，具有更高的稳定性和灵活性，可将 Rive 工作分散到多个线程中。

## [​](#example-app) 示例应用

要探索 Android API，你可以运行我们的 Android 示例应用。

```bash
git clone https://github.com/rive-app/rive-android
```

在 Android Studio 中打开克隆的文件夹，然后选择 `app` 配置和目标设备。通过打开菜单 `Build - Select Build Variant...` 并为 `app` 选择 `preview (default)` 变体，确保存储构建变体设置为 `preview (default)`。
其他构建变体用于开发目的，需要额外的配置。请参阅 [CONTRIBUTING.MD](https://github.com/rive-app/rive-android/blob/master/CONTRIBUTING.md)。

## [​](#getting-started) 快速开始

按照以下步骤开始将 Rive 集成到你的 Android 应用中。

1.  **添加 Rive 依赖**

    将以下依赖项添加到项目中的 `build.gradle` 文件中。我们建议使用最新版本的 Rive Android 运行时，可以在 [Maven Central](https://central.sonatype.com/artifact/app.rive/rive-android) 上找到。

    ```gradle
    dependencies {
        ...
        implementation 'app.rive:rive-android:<Latest Version>'
        // For initialization, you may want to add a dependency on Jetpack Startup
        // 为了初始化，你可能需要添加对 Jetpack Startup 的依赖
        implementation "androidx.startup:startup-runtime:1.1.1"
    }
    ```

2.  **初始化 Rive**

    Rive 需要链接并初始化其 C++ 运行时才能使其 Kotlin 绑定工作。这可以通过 [initializer](https://developer.android.com/topic/libraries/app-startup) 来完成，该初始化程序会在应用启动时自动执行此操作。初始化提供程序可以直接在应用的 manifest 文件中设置：

    ```xml
    <manifest ...>
      <application ...>
        <provider
          android:name="androidx.startup.InitializationProvider"
          android:authorities="${applicationId}.androidx-startup"
          android:exported="false"
          tools:node="merge">
            <meta-data android:name="app.rive.runtime.kotlin.RiveInitializer"
              android:value="androidx.startup" />
        </provider>
      </application>
    </manifest>
    ```

    或者，可以通过在代码中调用初始化程序来实现：

    ```kotlin
    AppInitializer.getInstance(applicationContext)
      .initializeComponent(RiveInitializer::class.java)
    ```

    如果你想自己初始化 Rive，可以使用以下代码在代码中完成。这是最灵活的选项，因为你可以延迟加载本机库，但请务必在使用了任何 Rive 功能之前调用它。

    ```kotlin
    Rive.init(context)
    ```

3.  **将 RiveAnimation 添加到你的布局**

    你现在可以将 `RiveAnimationView` 添加到你的布局或以编程方式创建它。有关设置它的各种方法的更多详细信息，请参阅 [构建 RiveAnimationView](#building-a-riveanimationview)。

### [​](#building-a-riveanimationview) 构建 RiveAnimationView

有多种方法可以将 Rive 动画添加到 Android 应用程序中。
开始之前，请确保你的 Rive 文件 (.riv) 包含在 Android 项目中。推荐的方法是将它们添加到项目的 raw resources (`res/raw`) 文件夹中。

#### [​](#using-setriveresource-or-setriveurl) 使用 setRiveResource 或 setRiveUrl

对于最简单的编程初始化，请使用 `setRiveResource` (本地) 或 `setRiveUrl` (网络) 方法。它们具有许多可选参数来自定义视图。

```kotlin
class MyActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val riveView = RiveAnimationView(this)
        riveView.setRiveResource(R.raw.my_rive_file)
        // or
        riveView.setRiveUrl("https://mycdn.myorg.com/my_rive_file.riv")

        setContentView(riveView)
    }
}
```

#### [​](#using-riveanimationview-builder) 使用 RiveAnimationView.Builder

Rive 还提供了一种用于构建 `RiveAnimationView` 的构建器模式，该模式允许交错初始化步骤。请注意，`setResource` 方法可以接受原始资源 ID、URL（字符串）、字节数组或 Rive `File`。

```kotlin
val riveView = RiveAnimationView.Builder(this)
    .setResource(R.raw.my_rive_file)
    // or
    .setResource("https://mycdn.myorg.com/my_rive_file.riv")
    .build()

setContentView(riveView)
```

#### [​](#using-a-rive-file) 使用 Rive 文件

如果你已经加载了 Rive `File` 实例，你也可以使用它来初始化视图。有关如何以及为何加载 Rive 文件的更多详细信息，请参阅 [缓存 Rive 文件](../caching-a-rive-file)。

```kotlin
// Loads bytes on the main thread for simplicity; consider loading on a background thread for production use.
// 为了简单起见，在主线程上加载字节；对于生产使用，请考虑在后台线程上加载。
val bytes = resources.openRawResource(R.raw.rating).use { res -> res.readBytes() }
val riveFile = File(bytes)
val riveView = RiveAnimationView(this)
riveView.setRiveFile(riveFile)
// Release the file if you no longer need it, keep if you plan to reuse it.
// 如果不再需要文件，请释放它；如果计划重用它，请保留。
riveFile.release()

setContentView(riveView)
```

#### [​](#using-compose-androidview) 使用 Compose (AndroidView)

你还可以使用 `AndroidView` composable 在 Compose UI 中使用 `RiveAnimationView`。另请参阅示例应用中的 [LegacyComposeActivity](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LegacyComposeActivity.kt)。

```kotlin
setContent {
    AndroidView(
        factory = { context ->
            RiveAnimationView(context).also {
                it.setRiveResource(R.raw.my_rive_file)
            }
        }
    )
}
```

#### [​](#using-xml) 使用 XML

要使用 XML，请将其包含在你的布局中。它具有许多可选属性来自定义视图。

```xml
<app.rive.runtime.kotlin.RiveAnimationView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:riveResource="@raw/my_rive_file"
    ... />
```

如果你更愿意从托管位置加载 Rive 文件，请使用 `app:riveUrl` 属性。确保你有必要的 [互联网权限](#internet-permissions)。

```xml
<app.rive.runtime.kotlin.RiveAnimationView
    app:riveUrl="https://mycdn.myorg.com/my_rive_file.riv"
    ... />
```

在你的 activity 中，你可以像往常一样加载它：

```kotlin
setContentView(R.layout.my_layout)
```

### [​](#internet-permissions) 互联网权限

如果你通过网络检索 Rive 文件，你的应用程序将需要在 `AndroidManifest.xml` 中访问互联网的权限：

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

请注意，如果你将 .riv 文件包含在 Android 项目中并作为原始资源加载，则不需要这样做。
请阅“运行时基础”部分中的页面，了解如何控制动画播放、状态机等。

## [​](#resources) 资源

[GitHub](https://github.com/rive-app/rive-android)
[示例](https://github.com/rive-app/rive-android/tree/master/app/src/main/java/app/rive/runtime/example)

[资源使用](/docs/runtimes/apple/resource-usage)[C#](/docs/runtimes/community-runtimes/c-sharp)