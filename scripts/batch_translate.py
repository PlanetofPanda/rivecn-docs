#!/usr/bin/env python3
"""
批量翻译 VitePress Markdown 文档
基于 rivecn-docs 的翻译脚本，适配到当前 VitePress 项目
"""

import asyncio
from pathlib import Path
import sys
import os
import re
import time

# Windows 控制台编码修复
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

def is_chinese_content(text: str) -> bool:
    """检查内容是否主要是中文"""
    chinese_chars = 0
    total_chars = 0
    for char in text:
        if '\u4e00' <= char <= '\u9fff':
            chinese_chars += 1
        if char.strip():
            total_chars += 1
    
    if total_chars == 0:
        return False
    
    # 如果 > 15% 是中文字符，认为已经翻译或是中文文档
    return (chinese_chars / total_chars) > 0.15

async def translate_with_retry(model, prompt, retries=5):
    """带重试机制的翻译函数"""
    delay = 10
    for attempt in range(retries):
        try:
            response = await model.generate_content_async(prompt)
            return response.text.strip()
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "Quota exceeded" in error_str:
                wait_time = 60
                # 尝试提取等待时间
                match = re.search(r'retry in (\d+(\.\d+)?)s', error_str)
                if match:
                    wait_time = float(match.group(1)) + 5  # 添加缓冲
                
                print(f"\n    ⏳ 触发速率限制。等待 {wait_time:.1f}秒 (尝试 {attempt+1}/{retries})...", end="", flush=True)
                await asyncio.sleep(wait_time)
                delay *= 2  # 指数退避
            else:
                print(f"  ❌ 错误: {e}")
                return None
    return None

async def translate_file_with_gemini(file_path: Path, model) -> str:
    """使用 Gemini API 翻译文件内容"""
    
    try:
        # 读取文件
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if not content.strip():
            return None

        prompt = f"""任务: 将以下 Rive 文档的 Markdown 翻译为中文。

要求:
1. 保持 Markdown 格式完整(标题、列表、链接、图片、HTML 标签)。
2. 保持所有图片路径 `/images/xxx` 原样。
3. 保持所有 URL 原样。
4. 保持代码块不翻译。
5. 保持 frontmatter (--- 之间的内容) 不翻译。
6. 保持 VitePress 组件语法不翻译 (如 `<YouTube videoId="..." />`)。
7. 保持 VitePress 容器语法不翻译 (如 `::: info`, `::: warning`)。
8. 术语对照:
   - State Machine -> 状态机 (State Machine)
   - Artboard -> 画板 (Artboard)
   - Timeline -> 时间轴 (Timeline)
   - Hierarchy -> 层级面板 (Hierarchy)
   - Inspector -> 检查器 (Inspector)
   - Toolbar -> 工具栏 (Toolbar)
   - Stage -> 舞台 (Stage)
   - Canvas -> 画布 (Canvas)
   - Rive -> Rive
   - Runtime -> 运行时 (Runtime)
   - Input -> 输入 (Input)
   - Listener -> 监听器 (Listener)
   - Bone -> 骨骼 (Bone)
   - Mesh -> 网格 (Mesh)
   - Constraints -> 约束 (Constraints)
   - Animation -> 动画 (Animation)
   - Component -> 组件 (Component)
   - Layout -> 布局 (Layout)
9. 风格: 专业技术文档风格，简洁清晰。
10. 如果内容已经是中文，原样返回(或小幅修正)。

原始 Markdown:
{content}

翻译后的 Markdown:"""
        
        text = await translate_with_retry(model, prompt)
        if not text:
            return None
            
        # 移除 markdown 代码块标记(如果存在)
        if text.startswith("```markdown"):
            text = text[11:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
            
        return text.strip()
        
    except Exception as e:
        print(f"  ❌ 翻译失败: {e}")
        return None


async def main():
    """批量翻译所有文件"""
    import google.generativeai as genai
    
    # 获取项目根目录 (脚本在 scripts/ 下)
    script_dir = Path(__file__).parent
    base_dir = script_dir.parent
    docs_dir = base_dir / 'docs'
    
    # API 配置
    api_key = "AIzaSyCTXcejCoCmusoQIuuQdJSttlrs9Zt0SQo"
    
    if not api_key:
        print(f"  ⚠️  未找到 API KEY")
        return
    
    genai.configure(api_key=api_key)
    model_name = 'gemini-2.0-flash-exp'
    model = genai.GenerativeModel(model_name)
    
    print(f"\n🔍 扫描 Markdown 文件: {docs_dir}")
    
    files_to_translate = []
    
    # 排除目录
    exclude_dirs = {'node_modules', '.vitepress', '.git', 'dist', 'public'}
    # 排除文件
    exclude_files = {'index.md'}  # index.md 已经是中文
    
    for path in docs_dir.rglob('*.md'):
        # 检查是否在排除目录中
        if any(part in exclude_dirs for part in path.parts):
            continue
        # 检查是否是排除文件
        if path.name in exclude_files:
            continue
        files_to_translate.append(path)
    
    print(f"📋 找到 {len(files_to_translate)} 个 markdown 文件。")
    print(f"\n🌐 开始翻译 (模型: {model_name})...\n")
    
    success_count = 0
    skip_count = 0
    fail_count = 0
    
    for i, file_path in enumerate(files_to_translate):
        try:
            rel_path = file_path.relative_to(base_dir)
            print(f"[{i+1}/{len(files_to_translate)}] 检查: {rel_path} ...", end="", flush=True)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if is_chinese_content(content):
                print(f" ⏭️  已是中文 (跳过)")
                skip_count += 1
                continue
            
            print(f"\n    翻译中...", end="", flush=True)
            translated = await translate_file_with_gemini(file_path, model)
            
            if translated:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(translated)
                print(f" ✅ 已保存")
                success_count += 1
            else:
                print(f" ⚠️  失败")
                fail_count += 1
            
            # 基本限速: 每个文件之间等待 10 秒
            await asyncio.sleep(10)
                
        except Exception as e:
            print(f" ❌ 错误: {e}")
            fail_count += 1
    
    print(f"\n{'='*40}")
    print(f"✅ 完成! 成功: {success_count}, 跳过: {skip_count}, 失败: {fail_count}")

if __name__ == "__main__":
    asyncio.run(main())
