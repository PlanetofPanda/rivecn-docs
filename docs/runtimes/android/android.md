---
title: 'Android'
description: 'Rive 的 Android 运行时。'
---

<NoteOnFeatureSupport />

## 概述 (Overview)

欢迎在 Android 上使用 Rive。Rive 运行时库是开源的，Android 版本可以在 [rive-android](https://github.com/rive-app/rive-android) GitHub 仓库中找到。

### 关于 Android API 的说明

适用于 Android 的 Rive 提供了两个主要的 API，用于将 Rive 集成到您的应用程序中。

**旧版基于 View 的 API (Legacy View-based API)**

该 API 基于 Android View 和 XML 布局。它很稳定，并已在生产应用中广泛部署。它还支持 [通过使用 AndroidView 的 Compose](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LegacyComposeActivity.kt)，尽管这需要一些样板代码来设置。

该 API 的入口点是 `RiveAnimationView`，它可以添加到您的 XML 布局中或以编程方式实例化。

我们将其称为“旧版”API，因为我们未来的开发重点是新的 Compose API，但该 API 将在一段时间内继续得到支持和维护。

**新版 Compose API (技术预览版)**

该 API 专为 Jetpack Compose 设计，允许使用更现代和声明式的方法来构建 UI。它目前处于技术预览阶段，这意味着它仍在积极开发中，并且在未来的版本中可能会有破坏性变更。**目前不建议在生产环境中使用**。我们非常鼓励提供关于此 API 的反馈，以帮助我们改进它。

该 API 的入口点是 `RiveUI` 可组合函数，它可以直接在您的 Compose UI 代码中使用。

除了提供更符合 Compose 习惯的体验外，该 API 还由更强大的线程模型驱动，具有更高的稳定性和灵活性，可以将 Rive 工作分散到多个线程中。

## 示例应用 (Example App)

要探索 Android API，您可以运行我们的 Android 示例应用。

```bash
git clone https://github.com/rive-app/rive-android
```

在 Android Studio 中打开克隆的文件夹，选择 `app` 配置和目标设备。通过打开菜单 `Build - Select Build Variant...` 并为 `app` 选择 `preview (default)` 变体，确保构建变体设置为 `preview (default)`。

其他构建变体用于开发目的，需要额外的配置。参见 [CONTRIBUTING.MD](https://github.com/rive-app/rive-android/blob/master/CONTRIBUTING.md)。

## 入门 (Getting Started)

按照以下步骤开始将 Rive 集成到您的 Android 应用中。

### 添加 Rive 依赖项

在项目的 `build.gradle` 文件中添加以下依赖项。我们建议使用最新版本的 Rive Android 运行时，可以在 [Maven Central](https://central.sonatype.com/artifact/app.rive/rive-android) 上找到。

```groovy
    dependencies {
        ...
        implementation 'app.rive:rive-android:<Latest Version>'
        // 对于初始化，您可能需要添加对 Jetpack Startup 的依赖
        implementation "androidx.startup:startup-runtime:1.1.1"
    }
```

### 初始化 Rive

Rive 需要链接并初始化其 C++ 运行时，以便其 Kotlin 绑定能够工作。

这可以通过 [initializer](https://developer.android.com/topic/libraries/app-startup) 来完成，它在应用启动时自动执行此操作。初始化提供程序可以直接在应用的清单 (manifest) 文件中设置：

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

或者，也可以在代码中调用初始化程序来实现：

```kotlin
    AppInitializer.getInstance(applicationContext)
      .initializeComponent(RiveInitializer::class.java)
```

如果您想自己初始化 Rive，可以在代码中使用以下方式完成。这是最灵活的选项，因为您可以延迟加载原生库，但请务必在使用任何 Rive 功能之前调用它。

```kotlin
    Rive.init(context)
```

### 将 RiveAnimation 添加到布局中

您现在可以将 `RiveAnimationView` 添加到布局中，或以编程方式创建它。有关各种设置方式的更多详细信息，请参见 [构建 RiveAnimationView](#构建-riveanimationview-building-a-riveanimationview)。

## 构建 RiveAnimationView (Building a RiveAnimationView)

有多种方法可以将 Rive 动画添加到您的 Android 应用中。

在开始之前，请确保您的 Rive 文件 (.riv) 已包含在 Android 项目中。推荐的方法是将它们添加到项目的原始资源 (`res/raw`) 文件夹中。

#### 使用 setRiveResource 或 setRiveUrl

对于最简单的编程初始化，请使用 `setRiveResource`（本地）或 `setRiveUrl`（网络）方法。它们有多个可选参数来自定义视图。

```kotlin
class MyActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val riveView = RiveAnimationView(this)
        riveView.setRiveResource(R.raw.my_rive_file)
        // 或
        riveView.setRiveUrl("https://mycdn.myorg.com/my_rive_file.riv")

        setContentView(riveView)
    }
}
```

#### 使用 RiveAnimationView.Builder

Rive 还提供了一种用于构建 `RiveAnimationView` 的构建器模式，它允许分阶段初始化步骤。请注意，`setResource` 方法可以接受原始资源 ID、URL（字符串）、字节数组或 Rive `File`。

```kotlin
val riveView = RiveAnimationView.Builder(this)
    .setResource(R.raw.my_rive_file)
    // 或
    .setResource("https://mycdn.myorg.com/my_rive_file.riv")
    .build()

setContentView(riveView)
```

#### 使用 Rive 文件 (Using a Rive File)

如果您已经加载了 Rive `File` 实例，也可以使用它来初始化视图。有关如何以及为何加载 Rive 文件的更多详细信息，请参见 [缓存 Rive 文件](../caching-a-rive-file)。

```kotlin
// 为简单起见，在主线程加载字节；在生产环境请考虑在后台线程加载。
val bytes = resources.openRawResource(R.raw.rating).use { res -> res.readBytes() }
val riveFile = File(bytes)
val riveView = RiveAnimationView(this)
riveView.setRiveFile(riveFile)
// 如果不再需要文件则释放它，如果打算重用它则保留它。
riveFile.release()

setContentView(riveView)
```

#### 使用 Compose (AndroidView)

您还可以使用 `AndroidView` 可组合组件在 Compose UI 中使用 `RiveAnimationView`。另请参阅示例应用中的 [LegacyComposeActivity](https://github.com/rive-app/rive-android/blob/master/app/src/main/java/app/rive/runtime/example/LegacyComposeActivity.kt)。

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

#### 使用 XML

要使用 XML，请将其作为布局的一部分包含在内。它具有多个可选属性来自定义视图。

```xml
<app.rive.runtime.kotlin.RiveAnimationView
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:riveResource="@raw/my_rive_file"
    ... />
```

如果您更愿意从托管位置加载 Rive 文件，请使用 `app:riveUrl` 属性。确保您已获得必要的 [互联网权限](#互联网权限-internet-permissions)。

```xml
<app.rive.runtime.kotlin.RiveAnimationView
    app:riveUrl="https://mycdn.myorg.com/my_rive_file.riv"
    ... />
```

从 Activity 中，您可以像往常一样加载它：

```kotlin
setContentView(R.layout.my_layout)
```

### 互联网权限 (Internet Permissions)

如果您是通过网络检索 Rive 文件，您的应用需要在 `AndroidManifest.xml` 中获得访问互联网的权限：

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

请注意，如果您将 .riv 文件包含在 Android 项目中并作为原始资源加载，则不需要这样做。

参见“运行时基础”部分的页面，了解如何控制动画播放、状态机等。

## 资源 (Resources)

[GitHub](https://github.com/rive-app/rive-android)

[示例 (Examples)](https://github.com/rive-app/rive-android/tree/master/app/src/main/java/app/rive/runtime/example)
