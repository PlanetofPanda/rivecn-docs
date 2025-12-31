---
title: '过程化渲染 (Procedural Rendering)'
description: '在 Unity 中使用 Rive 过程化地绘制形状和路径'
---

在此章节中，您将学习如何创建自定义的画笔 (paint) 和路径 (path) 对象。这使您能够利用 Rive 渲染器执行自定义计算的绘制命令。

## 概览 (Overview)

以下类可供使用：

- **BlendMode**：决定源像素与目标像素的混合方式。
- **Color**：决定形状的颜色。
- **Gradient**：决定形状的渐变色（`LinearGradient` 线型渐变或 `RadialGradient` 径向渐变）。
- **Paint**：描述如何绘制形状 —— 参见 [**Paint**](#paint)。
- **PaintingStyle**：决定形状是填充（filled）还是描边（stroked）。
- **Path**：定义形状的轮廓或裁剪遮罩 —— 参见 [**Path**](#path)。
- **StrokeCap**：决定路径末端的绘制样式。
- **StrokeJoin**：决定路径各段之间连接处的修饰样式。

### 渲染队列 (RenderQueue)

创建一个 `Rive.RenderQueue` 和一个 `Rive.Renderer`：
```csharp
public RenderTexture renderTexture;
private Rive.RenderQueue m_renderQueue;
private Rive.Renderer m_riveRenderer;

...

m_renderQueue = new RenderQueue(renderTexture);
m_riveRenderer = m_renderQueue.Renderer();
```

在渲染队列上调用 `draw` 并传入 `Path` 和 `Paint` 对象。
```csharp
m_path = new Path();
m_paint = new Paint();
m_riveRenderer.Draw(m_path, m_paint);
```

### 路径 (Path)

路径是一系列绘图命令。路径用于定义形状的轮廓或裁剪遮罩。

创建新路径：
```csharp
m_path = new Path();
```

`Path` 类提供了多种构建的方法：

- `moveTo`：将当前点移动到指定坐标。
- `lineTo`：从当前点到指定坐标画一条直线。
- `circle`：向路径添加一个圆。
- `cubicTo`：向路径添加一条三次贝塞尔曲线。
- `quadTo`：向路径添加一条二次贝塞尔曲线段。
- `addPath`：将另一个路径的子路径添加到当前路径，并应用提供的矩阵变换。
- `close`：闭合路径。这将从当前点到路径的第一个点画一条直线。
- `reset`：将路径重置为空状态。
- `flush`：将路径刷新（同步）到原生内存。

### 画笔 (Paint)

Paint 用于描述如何绘制一个形状。

创建新画笔：
```csharp
m_paint = new Paint();
```

Paint 描述了形状的颜色、渐变、样式（填充或描边）、粗细、混合模式、描边末端样式和描边连接样式。

调用 `.Flush()` 将画笔配置刷新到原生内存。参见下方的[示例](#example)。

## 示例 (Example)

此示例演示了如何向 [渲染纹理 (RenderTexture)](https://docs.unity3d.com/ScriptReference/RenderTexture.html) 绘制一个动画三角形。

![Image](https://ucarecdn.com/e280a09f-7200-4732-921b-105db28f9df5/)

Rive Unity：过程化渲染

创建上述效果的 `MonoBehaviour` 脚本：
```csharp
using System.Collections;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEditor;
using Rive;

public class RiveProcedural : MonoBehaviour
{
    public RenderTexture renderTexture;
    private Rive.RenderQueue m_renderQueue;
    private Rive.Renderer m_riveRenderer;
    private CommandBuffer m_commandBuffer;

    private Camera m_camera;

    Path m_path;
    Paint m_paint;
    private void Start()
    {
        m_renderQueue = new RenderQueue(renderTexture);
        m_riveRenderer = m_renderQueue.Renderer();
        m_path = new Path();
        m_paint = new Paint();
        m_paint.Color = new Rive.Color(0xFFFF0000); // 红色
        m_paint.Style = PaintingStyle.stroke; // 描述为描边
        m_paint.Join = StrokeJoin.round;
        m_paint.Thickness = 20.0f;
        m_riveRenderer.Draw(m_path, m_paint);

        m_commandBuffer = new CommandBuffer();
        m_commandBuffer.SetRenderTarget(renderTexture);
        m_riveRenderer.AddToCommandBuffer(m_commandBuffer);
        m_camera = Camera.main;
        if (m_camera != null)
        {
            Camera.main.AddCommandBuffer(CameraEvent.AfterEverything, m_commandBuffer);
        }
    }

    private void Update()
    {
        if (m_path == null)
        {
            return;
        }
        m_path.Reset();

        float expand = Time.fixedTime * 10;
        m_path.MoveTo(256, 256 - 100 - expand);
        m_path.LineTo(256 + 50 + expand, 256 + 50 + expand);
        m_path.LineTo(256 - 50 - expand, 256 + 50 + expand);
        m_path.Close();
        m_path.Flush(); // 刷新路径数据到原生层

        // 根据时间动态改变描边粗细
        m_paint.Thickness = (Mathf.Sin(Time.fixedTime * Mathf.PI * 2) + 1.0f) * 20.0f + 1.0f;
        m_paint.Flush(); // 刷新画笔数据到原生层
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

### 额外资源

要查看完整示例，请参考示例库中的 **getting-started** 项目，并打开 **ProceduralRenderingScene** 场景。