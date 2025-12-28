#!/usr/bin/env python3
"""
批量翻译已抓取的英文 Markdown 文件
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
    """Check if content is mostly Chinese"""
    chinese_chars = 0
    total_chars = 0
    for char in text:
        if '\u4e00' <= char <= '\u9fff':
            chinese_chars += 1
        if char.strip():
            total_chars += 1
    
    if total_chars == 0:
        return False
    
    # If > 15% Chinese characters, assume it's already translated or is a Chinese doc
    return (chinese_chars / total_chars) > 0.15

async def translate_with_retry(model, prompt, retries=5):
    delay = 10
    for attempt in range(retries):
        try:
            response = await model.generate_content_async(prompt)
            return response.text.strip()
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "Quota exceeded" in error_str:
                wait_time = 60
                # Try to extract wait time
                match = re.search(r'retry in (\d+(\.\d+)?)s', error_str)
                if match:
                    wait_time = float(match.group(1)) + 5 # Add buffer
                
                print(f"\n    ⏳ Rate limit hit. Waiting {wait_time:.1f}s (Attempt {attempt+1}/{retries})...", end="", flush=True)
                await asyncio.sleep(wait_time)
                delay *= 2 # Exponential backoff for subsequent failures
            else:
                print(f"  ❌ Error: {e}")
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

        prompt = f"""task: Translate the following Rive documentation Markdown to Chinese.

Requirements:
1. Keep Markdown format intact (headers, lists, links, images, HTML tags).
2. Keep all image paths `images/xxx` as is.
3. Keep all URLs as is.
4. Terminology:
   - State Machine -> 状态机 (State Machine)
   - Artboard -> 画板 (Artboard)
   - Timeline -> 时间轴 (Timeline)
   - Hierarchy -> 层级面板 (Hierarchy)
   - Inspector -> 检查器 (Inspector)
   - Toolbar -> 工具栏 (Toolbar)
   - Stage -> 舞台 (Stage)
   - Rive -> Rive
   - Run -> 运行
   - Input -> 输入
   - Listener -> 监听器
   - Bone -> 骨骼
   - Mesh -> 网格
   - Constraints -> 约束
5. Style: Professional technical documentation style. Simple and clear.
6. REMOVE any navigation links (e.g. 'Overview', 'Next', 'Previous') at the very top or bottom if they are just lists of links. Keep the main content.
7. If the content is ALREADY Chinese, return it exactly as is (or minimal fix).

Original Markdown:
{content}

Translated Markdown:"""
        
        text = await translate_with_retry(model, prompt)
        if not text:
            return None
            
        # Strip markdown code blocks if present
        if text.startswith("```markdown"):
            text = text[11:]
        if text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
            
        return text.strip()
        
    except Exception as e:
        print(f"  ❌ Translation failed: {e}")
        return None


async def main():
    """批量翻译所有文件"""
    import google.generativeai as genai
    
    script_dir = Path(__file__).parent
    base_dir = script_dir.parent
    
    # API Configuration
    api_key = "AIzaSyCTXcejCoCmusoQIuuQdJSttlrs9Zt0SQo"
    
    if not api_key:
        print(f"  ⚠️  No API KEY found")
        return
    
    genai.configure(api_key=api_key)
    # Using 1.5 flash for potentially better rate limits, if 2.0 fails too much.
    # But sticking to user preference first.
    model_name = 'gemini-flash-latest'
    model = genai.GenerativeModel(model_name)
    
    print(f"\n🔍 Scanning for Markdown files in: {base_dir}")
    
    files_to_translate = []
    
    # Excludes
    exclude_dirs = {'node_modules', 'tools', '.git', '_book', 'dist'}
    exclude_files = {'_sidebar.md', '_navbar.md', 'README.md', 'SUMMARY.md'}
    
    for path in base_dir.rglob('*.md'):
        if any(part in exclude_dirs for part in path.parts):
            continue
        if path.name in exclude_files:
            continue
        files_to_translate.append(path)
    
    print(f"📋 Found {len(files_to_translate)} markdown files.")
    print(f"\n🌐 Starting Translation (Model: {model_name})...\n")
    
    success_count = 0
    skip_count = 0
    fail_count = 0
    
    for i, file_path in enumerate(files_to_translate):
        try:
            rel_path = file_path.relative_to(base_dir)
            print(f"[{i+1}/{len(files_to_translate)}] Checking: {rel_path} ...", end="", flush=True)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if is_chinese_content(content):
                print(f" ⏭️  Already Chinese (Skipping)")
                skip_count += 1
                continue
            
            print(f"\n    Translating...", end="", flush=True)
            translated = await translate_file_with_gemini(file_path, model)
            
            if translated:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(translated)
                print(f" ✅ Saved")
                success_count += 1
            else:
                print(f" ⚠️  Failed")
                fail_count += 1
            
            # Basic rate limit avoidance: wait 10s between files
            await asyncio.sleep(10)
                
        except Exception as e:
            print(f" ❌ Error: {e}")
            fail_count += 1
    
    print(f"\n{'='*40}")
    print(f"✅ Finished! Success: {success_count}, Skipped: {skip_count}, Failed: {fail_count}")

if __name__ == "__main__":
    asyncio.run(main())
