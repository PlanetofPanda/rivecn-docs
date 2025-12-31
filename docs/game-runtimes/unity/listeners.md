---
title: '监听器 (Listeners)'
description: '在 Unity 中启用 Rive 动画监听器'
---

import LegacyApiNotice from '/snippets/unity/legacy-api-notice.mdx';

有关 Rive 监听器的更多信息，请参阅[编辑器文档](/editor/state-machine/listeners)。

**[监听器 (Listeners)](/editor/state-machine/listeners)**

    监听器为设计师提供了将状态机更进一步的工具。设计师可以定义缩放、悬停和鼠标移动动作，这些动作可以在编辑器和运行时更改输入，而无需开发者的参与。

### 组件 API (Components)

[面板渲染器 (Panel Renderers)](/game-runtimes/unity/components#panel-renderers) 负责将指针输入（pointer input）传递给 **Rive Panels**。

**要求**

- 如果您希望 **Rive Panel** 接收指针事件，请在任何 **Panel Renderer** 上将 `Pointer Input Mode` 设置为 `Enable Pointer Input`。
- 向场景中添加一个 **EventSystem**。这为面板渲染器提供了来自 Unity 的输入，并允许它们支持 Unity 中的任何输入系统（只要该系统使用了 EventSystem）。
- 对于 **Rive Canvas Renderer**，请确保其父级 Canvas 上附加了 **Graphics Raycaster**。
- 对于 **Rive Texture Renderer**，请确保事件照相机（event camera）附加了 **Physics Raycaster** 组件。

::: warning
附带 **Rive Texture Renderer** 的游戏对象（GameObject）还必须附带一个 **MeshCollider**。
:::

### 命中测试 (Hit Testing)

命中测试（Hit testing）控制指针事件如何与 **Rive Widgets** 及其背后的内容进行交互。您可以在 **Rive Widget** 的 `Hit Test Behavior` 设置中配置此行为：

\- **Opaque (不透明)**：挂件将拦截其边界内的所有指针事件，无论指针位置是否存在交互元素（监听器）。挂件背后的内容将不会收到任何指针事件。

\- **Translucent (半透明)**：挂件仅在指针位置存在交互元素（监听器）时拦截指针事件。如果未触及任何监听器，则事件将传递给挂件后面的内容。

\- **Transparent (透明)**：所有指针事件都会传递给挂件背后的内容，但 Rive 监听器仍然会检测并响应这些指针事件。这允许同时与挂件和背景内容进行交互。

\- **None (无)**：挂件不执行任何命中测试，忽略所有指针事件。

这种灵活性允许您创建具有层次感的交互体验，同时精准控制每一层处理指针事件的方式。

### 旧版 API (Legacy API)

::: warning
**旧版 API 通知**
:::

## 指针位置

在 rive-unity 中，可以将指针（鼠标/触摸）事件传递给画板，以启用 Rive 监听器。这是通过将指针位置转换为画板的本地坐标（local coordinate）来实现的。

要查看完整示例，请参考 [示例库](https://github.com/rive-app/rive-unity-examples) 中的 **getting-started** 项目并打开以下示例场景：

- **DrawToCameraScene**：针对照相机的指针事件。
- **DrawToCubeScene**：针对网格（mesh）的指针事件。

#### 照相机命中测试 (Camera Hit Test)

参阅示例库中 **getting-started** 项目的 **DrawToCameraScene** 场景。

![Image](/images/game-runtimes/unity/c4b499ac-b42b-4b40-a071-b34f9e82e62a.webp)

此代码片段展示了如何将照相机上的鼠标位置转换为画板坐标：

```csharp
private Artboard m_artboard;
private StateMachine m_stateMachine;

...

Camera camera = gameObject.GetComponent<Camera>();
if (camera != null)
{
    Vector3 mousePos = camera.ScreenToViewportPoint(Input.mousePosition);
    Vector2 mouseRiveScreenPos = new Vector2(
        mousePos.x * camera.pixelWidth,
        (1 - mousePos.y) * camera.pixelHeight
    );
    if (m_artboard != null && m_lastMousePosition != mouseRiveScreenPos)
    {
        Vector2 local = m_artboard.LocalCoordinate(
            mouseRiveScreenPos,
            new Rect(0, 0, camera.pixelWidth, camera.pixelHeight),
            fit,
            alignment
        );
        m_stateMachine?.PointerMove(local);
        m_lastMousePosition = mouseRiveScreenPos;
    }
    if (Input.GetMouseButtonDown(0))
    {
        Vector2 local = m_artboard.LocalCoordinate(
            mouseRiveScreenPos,
            new Rect(0, 0, camera.pixelWidth, camera.pixelHeight),
            fit,
            alignment
        );
        m_stateMachine?.PointerDown(local);
        m_wasMouseDown = true;
    }
    else if (m_wasMouseDown)
    {
        m_wasMouseDown = false;
        Vector2 local = m_artboard.LocalCoordinate(
            mouseRiveScreenPos,
            new Rect(0, 0, camera.pixelWidth, camera.pixelHeight),
            fit,
            alignment
        );
        m_stateMachine?.PointerUp(local);
    }
}
```

#### 网格命中测试 (Mesh Hit Test)

参阅示例库中 **getting-started** 项目的 **DrawToCubeScene** 场景。

![Image](/images/game-runtimes/unity/376abe7c-09b9-4234-b98f-fb8a67f24aa1.webp)

此代码片段展示了如何将对象上的 [RaycastHit](https://docs.unity3d.com/ScriptReference/RaycastHit.html) 转换为画板的本地坐标。

::: info
该 **GameObject** 必须附带一个 **MeshCollider**。
:::

```csharp
void HitTesting()
{
    Camera camera = Camera.main;

    if (camera == null || renderTexture == null || m_artboard == null) return;

    if (!Physics.Raycast(camera.ScreenPointToRay(Input.mousePosition), out RaycastHit hit))
        return;

    Renderer rend = hit.transform.GetComponent<Renderer>();
    MeshCollider meshCollider = hit.collider as MeshCollider;

    if (rend == null || rend.sharedMaterial == null || rend.sharedMaterial.mainTexture == null || meshCollider == null)
        return;

    Vector2 pixelUV = hit.textureCoord;

    pixelUV.x *= renderTexture.width;
    pixelUV.y *= renderTexture.height;

    Vector3 mousePos = camera.ScreenToViewportPoint(Input.mousePosition);
    Vector2 mouseRiveScreenPos = new(mousePos.x * camera.pixelWidth, (1 - mousePos.y) * camera.pixelHeight);

    if (m_lastMousePosition != mouseRiveScreenPos || transform.hasChanged)
    {
        Vector2 local = m_artboard.LocalCoordinate(pixelUV, new Rect(0, 0, renderTexture.width, renderTexture.height), fit, alignment);
        m_stateMachine?.PointerMove(local);
        m_lastMousePosition = mouseRiveScreenPos;
    }
    if (Input.GetMouseButtonDown(0))
    {
        Vector2 local = m_artboard.LocalCoordinate(pixelUV, new Rect(0, 0, renderTexture.width, renderTexture.height), fit, alignment);
        m_stateMachine?.PointerDown(local);
        m_wasMouseDown = true;
    }
    else if (m_wasMouseDown)
    {
        m_wasMouseDown = false;
        Vector2 local = m_artboard.LocalCoordinate(mouseRiveScreenPos, new Rect(0, 0, renderTexture.width, renderTexture.height), fit, alignment);
        m_stateMachine?.PointerUp(local);
    }
}
```
