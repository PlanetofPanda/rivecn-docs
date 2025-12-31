---
title: "在 Unity 2D 中使用 Rive"
description: ''
---

Rive 在 Unity 中渲染到**渲染纹理 (Render Texture)**，这使其与支持渲染纹理的 Unity 功能兼容。这种方法提供了灵活性，但在使用 Unity 的 2D 渲染管线时，需要进行一些特定的考虑。

## 与 Sprite Renderers 协作 (Working with Sprite Renderers)

虽然 Rive 整体上与 Unity 协作良好，但 **Sprite Renderers** [本身并不能最优地处理渲染纹理](https://discussions.unity.com/t/how-to-apply-a-render-texture-from-a-camera-to-a-sprite-for-an-object-with-sprite-renderer/257199)。有两种方法可以解决这个问题：

1. **配合 Quad 使用 Rive Texture Renderer (推荐)**

   * 使用 **Rive Texture Renderer** 组件将 Rive 图形渲染到 Quad（四边形网格）上。
   * 不需要修改 Shader。
   * 在 2D 和 3D 环境中表现一致。

2. **针对 Sprite Renderers 的自定义 Shader 方案**

   * 当您需要与其他 Sprite 保持精确的排序顺序（Sorting order）时非常有用。
   * 允许 Rive 内容在现有的 Sprite 渲染管线内工作。
   * 需要实现一个自定义 Shader。

::: warning
当使用自定义 Shader 方案配合 SpriteRenderers 时，系统不会自动支持指针输入（点击等）。这是因为 SpriteRenderers 和 SpriteColliders 不像 Quads 和 MeshColliders 那样提供 `textureCoords`（纹理坐标）。

如果您需要指针输入支持，请考虑使用推荐的 Quad 配合 RiveTextureRenderer 的方案。
:::

如果您在将 Rive 图形与 **Sprite Renderers** 混合使用时需要维护排序顺序，可以参考以下自定义 Shader 作为起点：

```hlsl
Shader "Custom/SpriteTextureOverride"
{
    Properties
    {
        // SpriteRenderer 在运行时会自动分配一个纹理到这里
        // 我们需要声明它，但不会用到它
        _MainTex ("Default Sprite", 2D) = "white" {}
        
        // 这是我们实际想要显示的纹理
        // 可以是 RenderTexture 或任何其他纹理
        _OverrideTexture ("Override Texture", 2D) = "white" {}
        
        // Sprite 渲染排序所必需的属性
        [HideInInspector] _Cutoff ("Cutoff", Float) = 0.5
        [HideInInspector] _Color ("Tint", Color) = (1,1,1,1)
    }
    
    SubShader
    {
        Tags
        { 
            "Queue"="Transparent" 
            "RenderType"="Transparent" 
            "IgnoreProjector"="True"
            "PreviewType"="Plane"
        }
        
        Cull Off
        Lighting Off
        ZWrite Off
        Blend One OneMinusSrcAlpha

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            
            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
                fixed4 color : COLOR;
            };
            
            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
                fixed4 color : COLOR;
            }; 
            
            sampler2D _MainTex;
            float4 _MainTex_ST;
            sampler2D _OverrideTexture;
            float4 _OverrideTexture_ST;
            fixed4 _Color;
            
            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = TRANSFORM_TEX(v.uv, _MainTex);
                o.color = v.color * _Color;
                return o;
            }
            
            fixed4 frag (v2f i) : SV_Target
            {
                fixed4 color = tex2D(_OverrideTexture, i.uv);
                color.rgb *= color.a;
                return color * i.color;
            }
            ENDCG
        }
    }
}
```

实现步骤如下：

1. 在项目中创建一个新的 Shader 文件，并粘贴上述代码。
2. 使用该 Shader 创建一个新的材质（Material）。
3. 将材质分配给您的 **Sprite Renderer**。
4. 使用 **Rive Texture Renderer** 将 `OverrideTexture` 属性设置为您的渲染纹理（Render Texture）。

![Setting the OverrideTexture property with a Rive Texture Renderer](/images/unity/spriterenderer-override-texture-property.jpg)