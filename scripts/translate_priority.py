#!/usr/bin/env python3
"""
翻译高优先级文档
先翻译最重要的页面，用于快速验证翻译效果
"""

import asyncio
from pathlib import Path
import sys

# 复用 batch_translate.py 的函数
from batch_translate import is_chinese_content, translate_file_with_gemini

async def main():
    """翻译高优先级文件"""
    import google.generativeai as genai
    
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
    
    # 高优先级文件列表
    priority_files = [
        "getting-started/introduction.md",
        "getting-started/best-practices.md",
        "getting-started/quick-links.md",
        "editor/interface-overview/overview.md",
        "editor/interface-overview/toolbar.md",
        "editor/interface-overview/hierarchy.md",
        "editor/interface-overview/inspector.md",
        "editor/interface-overview/stage.md",
        "runtimes/getting-started.md",
        "game-runtimes/unreal/unreal.md",
        "game-runtimes/unity/unity.md",
        "scripting/getting-started.md",
    ]
    
    print(f"\n🎯 翻译高优先级文档 ({len(priority_files)} 个文件)")
    print(f"📁 文档目录: {docs_dir}")
    print(f"🤖 使用模型: {model_name}\n")
    
    success_count = 0
    skip_count = 0
    fail_count = 0
    
    for i, rel_path in enumerate(priority_files):
        file_path = docs_dir / rel_path
        
        if not file_path.exists():
            print(f"[{i+1}/{len(priority_files)}] ⚠️  文件不存在: {rel_path}")
            fail_count += 1
            continue
        
        try:
            print(f"[{i+1}/{len(priority_files)}] 检查: {rel_path} ...", end="", flush=True)
            
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
            
            # 限速: 每个文件之间等待 10 秒
            await asyncio.sleep(10)
                
        except Exception as e:
            print(f" ❌ 错误: {e}")
            fail_count += 1
    
    print(f"\n{'='*50}")
    print(f"✅ 高优先级文档翻译完成!")
    print(f"   成功: {success_count}")
    print(f"   跳过: {skip_count}")
    print(f"   失败: {fail_count}")
    print(f"\n💡 下一步:")
    print(f"   1. 检查翻译质量: 在浏览器中查看 http://localhost:4173/")
    print(f"   2. 如果质量满意，运行: python scripts/batch_translate.py")
    print(f"   3. 重新构建: npm run docs:build")

if __name__ == "__main__":
    asyncio.run(main())
