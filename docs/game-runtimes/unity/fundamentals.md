---
title: '基础知识 (Fundamentals)'
description: ''
---

import LegacyApiNotice from '/snippets/unity/legacy-api-notice.mdx';

## 添加 Rive 资产

要将 `.riv` 文件添加到 Unity 项目中，只需将其拖入项目窗口（Project Window）。放置后，系统会自动创建一个 **Rive Asset**。

现在，您就可以在 **Rive Panel**（Rive 面板）和 **Rive Widget**（Rive 挂件）中显示该 Rive 资产了。

## 文件 (File)

一个 `Rive.File` 实例包含画板（Artboards）、状态机（StateMachines）和动画。

::: info
如果您正在使用 Rive Panel 和 Rive Widgets 组件，Rive Widget 会自动处理从分配的资产中加载底层 Rive 文件的工作。<br>
 只有在您想要手动控制 Rive 文件的生命周期，或者需要从外部来源（如 CDN）加载文件时，才需要直接使用此类。
:::

`Rive.File` 类还提供了几种将 Rive 内容加载到 Unity 中的方法：

::: info
如果文件已经存在于内存中，将返回一个缓存版本，以提高性能并避免重复加载。
:::

#### 1. 从 Rive 资产 (.riv 文件) 加载

可以在检查器中从已导入的 `.riv` 资产加载 `Rive.File`：
```csharp
public Rive.Asset asset; // 在检查器中传入 .riv 资产
private Rive.File m_file;

...

private void Start()
{
    if (asset != null)
    {
        m_file = Rive.File.Load(asset);
    }
}
```

#### 2. 从 Unity TextAsset 加载

您可以从 Unity 的 `TextAsset` 加载 `Rive.File`。如果您将字节数据作为 `TextAsset` 捆绑在 Unity 项目中，这将非常有用。
```csharp
public TextAsset riveTextAsset; // 在检查器中分配
private Rive.File m_file;

...

private void Start()
{
    if (riveTextAsset != null)
    {
        m_file = Rive.File.Load(riveTextAsset);
    }
}
```

#### 3. 从字节数组 (Byte Array) 加载

如果您拥有 `.riv` 文件的原始字节数据，可以直接从字节数组加载它。如果您是从自定义来源或动态加载文件（例如从 CDN 存储的文件）时，此方法提供了很大的灵活性：
```csharp
private byte[] riveFileBytes; // 您的字节数组，例如从远程存储加载。
private Rive.File m_file;

...

private void Start()
{
    if (riveFileBytes != null)
    {
        m_file = Rive.File.Load(riveFileBytes, "myRiveFileName");
    }
}
```

## 画板 (Artboards)

[画板 (Artboards)](/editor/fundamentals/artboards) 包含 [状态机 (State Machines)](/editor/state-machine/state-machine) 和 动画。

### 组件 API (Components)

使用 **Rive Widget** 组件，您可以从给定的 **Rive File** 中可用的画板列表中进行选择。

![Image](/images/game-runtimes/unity/f5612996-b42e-46d4-879a-5da744ea688f.webp)

### 旧版 API (Legacy API)

::: warning
**旧版 API 通知**
:::

 画板是从 `Rive.File` 实例中实例化的：
```csharp
 private Artboard m_artboard;

 ...

 m_artboard = m_file.Artboard(0); // 通过索引获取
 m_artboard = m_file.Artboard("Arboard 1"); // 通过名称获取
```

## 状态机 (State Machines)

有关更多信息，请参阅 [状态机 (State Machines)](/game-runtimes/unity/state-machines)。

### 组件 API (Components)

使用 **Rive Widget** 组件，您可以从给定的画板中可用的状态机列表中进行选择。

![Image](/images/game-runtimes/unity/157836bb-4e86-4893-8565-12905d477500.webp)

### 旧版 API (Legacy API)

::: warning
**旧版 API 通知**
:::

 状态机是从画板（Artboard）实例中实例化的：
```csharp
 private StateMachine m_stateMachine;

 ...

 m_stateMachine = m_artboard?.StateMachine(); // 默认状态机
 m_stateMachine = m_artboard?.StateMachine(0); // 索引为 0 的状态机
 m_stateMachine = m_artboard?.StateMachine("Name"); // 名称为 "Name" 的状态机
```

 它们还负责控制动画的推进（播放）：
```csharp
 private void Update()
 {
     m_stateMachine?.Advance(Time.deltaTime);
 }
```

## 渲染 (Rendering)

在 Unity 中，Rive 渲染到一个 [渲染纹理 (RenderTexture)](https://docs.unity3d.com/ScriptReference/RenderTexture.html)。您可以通将其附加到 [材质 (Material)](https://docs.unity3d.com/ScriptReference/Material.html) 或项目中任何可以使用渲染纹理的地方来显示它。

### 组件 API (Components)

 **Rive Panel** 负责自动将其所含的 **Rive Widgets** 渲染到渲染纹理中。

 使用 **Rive Canvas Renderer**，您可以在 uGUI Canvas 中显示 **Rive Panel**。

 若要在游戏对象的网格（mesh）上显示 **Rive Panel**，请使用 **Rive Texture Renderer**。

### 旧版 API (Legacy API)

::: warning
**旧版 API 通知**
:::

 布局（Layout）和绘制（Draw）命令通过 `Rive.Renderer` 进行管理。

 有关直接将纹理绘制到相机的复杂示例，请查看 [示例库](https://github.com/rive-app/rive-unity-examples) 中的 **getting-started** 项目。

 以下是一个基本的脚本行为示例，用于将给定的 Rive 资产渲染到提供的 `renderTexture`。通过调用状态机的 `.Advance()` 方法来播放动画。

 参阅 [动画播放](/runtimes/animation-playback) 了解更多在运行时播放动画和状态机的通用信息。

```csharp
 using System.Collections;
 using UnityEngine;
 using UnityEngine.Rendering;
 using UnityEditor;
 using Rive;

 using LoadAction = UnityEngine.Rendering.RenderBufferLoadAction;
 using StoreAction = UnityEngine.Rendering.RenderBufferStoreAction;

 public class RiveTexture : MonoBehaviour
 {
     public Rive.Asset asset;
     public RenderTexture renderTexture;
     public Fit fit = Fit.contain;
     public Alignment alignment = Alignment.Center;

     private Rive.RenderQueue m_renderQueue;
     private Rive.Renderer m_riveRenderer;
     private CommandBuffer m_commandBuffer;

     private Rive.File m_file;
     private Artboard m_artboard;
     private StateMachine m_stateMachine;

     private Camera m_camera;

     private void Start()
     {
         // 如果在 D3d11 上，这是必需的
         renderTexture.enableRandomWrite = true;
         m_renderQueue = new Rive.RenderQueue(renderTexture);
         m_riveRenderer = m_renderQueue.Renderer();
         if (asset != null)
         {
             m_file = Rive.File.Load(asset);
             m_artboard = m_file.Artboard(0);
             m_stateMachine = m_artboard?.StateMachine();
         }

         if (m_artboard != null && renderTexture != null)
         {
             m_riveRenderer.Align(fit, alignment, m_artboard);
             m_riveRenderer.Draw(m_artboard);

             m_commandBuffer = m_riveRenderer.ToCommandBuffer();
             m_commandBuffer.SetRenderTarget(renderTexture);
             m_commandBuffer.ClearRenderTarget(true, true, UnityEngine.Color.clear, 0.0f);
             m_riveRenderer.AddToCommandBuffer(m_commandBuffer);
             m_camera = Camera.main;
             if (m_camera != null)
             {
                 Camera.main.AddCommandBuffer(CameraEvent.AfterEverything, m_commandBuffer);
             }
         }
     }

     private void Update()
     {
         if (m_stateMachine != null)
         {
             m_stateMachine.Advance(Time.deltaTime);
         }
     }

     private void OnDisable()
     {
         if (m_camera != null && m_commandBuffer != null)
         {
             m_camera.RemoveCommandBuffer(CameraEvent.AfterEverything, m_commandBuffer);
         }
     }
 }
```

 1. 在资产（Assets）中创建一个 Unity [渲染纹理 (RenderTexture)](https://docs.unity.cn/ru/2020.1/Manual/class-RenderTexture.html) 和 [材质 (Material)](https://docs.unity3d.com/2019.3/Documentation/Manual/Materials.html)。
 2. 将 **RenderTexture** 分配给 **Material**。
 3. 将此脚本附加到一个 **GameObject** 上，并为其附加该材质。
 4. 在 **RiveTexture**（自定义脚本）中链接 .riv 资产和 **RenderTexture**。

 ![Image](/images/game-runtimes/unity/dfa37834-61a2-442c-bb8f-d8d171a2d0fb.webp)
