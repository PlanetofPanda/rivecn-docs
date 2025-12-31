#!/usr/bin/env python3
"""
单文件翻译脚本 - 用于快速测试翻译效果
使用方法: python scripts/translate_single.py <文件路径>
例如: python scripts/translate_single.py docs/getting-started/introduction.md
"""

import asyncio
from pathlib import Path
import sys

async def translate_file(file_path: str):
    """翻译单个文件"""
    import google.generativeai as genai
    
    # API 配置
    api_key = "AIzaSyCTXcejCoCmusoQIuuQdJSttlrs9Zt0SQo"
    
    if not api_key:
        print(f"❌ 未找到 API KEY")
        return False
    
    genai.configure(api_key=api_key)
    # 使用 flash-latest，速率限制可能更宽松
    model_name = 'gemini-flash-latest'
    model = genai.GenerativeModel(model_name)
    
    file_path = Path(file_path)
    
    if not file_path.exists():
        print(f"❌ 文件不存在: {file_path}")
        return False
    
    print(f"\n📄 文件: {file_path}")
    print(f"🤖 模型: {model_name}")
    print(f"\n{'='*50}")
    
    try:
        # 读取文件
        print("📖 正在读取文件...", end="", flush=True)
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        print(" ✅")
        
        if not content.strip():
            print("⚠️  文件为空")
            return False
        
        # 检查是否已经是中文
        chinese_chars = sum(1 for char in content if '\u4e00' <= char <= '\u9fff')
        total_chars = sum(1 for char in content if char.strip())
        
        if total_chars > 0 and (chinese_chars / total_chars) > 0.15:
            print("⏭️  文件已经是中文，无需翻译")
            return True
        
        print(f"📊 文件大小: {len(content)} 字符")
        print(f"\n🌐 开始翻译...")
        
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
   - State Machine -> 状态机
   - Artboard -> 画板
   - Timeline -> 时间轴
   - Hierarchy -> 层级面板
   - Inspector -> 检查器
   - Toolbar -> 工具栏
   - Stage -> 舞台
   - Canvas -> 画布
   - Rive -> Rive
   - Runtime -> 运行时
   - Animation -> 动画
   - Component -> 组件
9. 风格: 专业技术文档风格，简洁清晰。
10. 如果内容已经是中文，原样返回。

原始 Markdown:
{content}

翻译后的 Markdown:"""
        
        # 调用 API
        try:
            response = await model.generate_content_async(prompt)
            translated = response.text.strip()
        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "quota" in error_str.lower():
                print(f"\n❌ 速率限制错误:")
                print(f"   {error_str}")
                print(f"\n💡 建议:")
                print(f"   1. 等待几分钟后重试")
                print(f"   2. 或者使用不同的 API key")
                return False
            else:
                print(f"\n❌ 翻译错误: {e}")
                return False
        
        print("✅ 翻译完成")
        
        # 移除可能的 markdown 代码块标记
        if translated.startswith("```markdown"):
            translated = translated[11:]
        if translated.startswith("```"):
            translated = translated[3:]
        if translated.endswith("```"):
            translated = translated[:-3]
        
        translated = translated.strip()
        
        # 备份原文件
        backup_path = file_path.with_suffix('.md.backup')
        print(f"\n💾 备份原文件到: {backup_path.name}")
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # 保存翻译
        print(f"💾 保存翻译到: {file_path.name}")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(translated)
        
        print(f"\n{'='*50}")
        print("✅ 翻译成功!")
        print(f"\n📋 翻译统计:")
        print(f"   原文: {len(content)} 字符")
        print(f"   译文: {len(translated)} 字符")
        
        # 显示前几行预览
        print(f"\n📄 翻译预览 (前 10 行):")
        print("─" * 50)
        lines = translated.split('\n')
        for i, line in enumerate(lines[:10], 1):
            print(f"{i:2d}: {line}")
        if len(lines) > 10:
            print(f"... (共 {len(lines)} 行)")
        print("─" * 50)
        
        return True
        
    except Exception as e:
        print(f"\n❌ 处理失败: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """主函数"""
    if len(sys.argv) != 2:
        print("使用方法: python scripts/translate_single.py <文件路径>")
        print("例如: python scripts/translate_single.py docs/getting-started/introduction.md")
        sys.exit(1)
    
    file_path = sys.argv[1]
    
    print(f"\n🚀 单文件翻译工具")
    success = asyncio.run(translate_file(file_path))
    
    if success:
        print(f"\n✅ 全部完成!")
        print(f"\n💡 下一步:")
        print(f"   1. 检查翻译质量: cat {file_path}")
        print(f"   2. 查看效果: npm run docs:dev")
        print(f"   3. 如果不满意: mv {file_path}.backup {file_path}")
        sys.exit(0)
    else:
        print(f"\n❌ 翻译失败")
        sys.exit(1)

if __name__ == "__main__":
    main()
