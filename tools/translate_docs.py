#!/usr/bin/env python3
"""
Rive 文档批量汉化工具
使用 HTTP 并行抓取，高效处理大量页面
"""

import asyncio
import json
import os
import re
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse

# Windows 控制台编码修复
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import aiofiles
import aiohttp
from bs4 import BeautifulSoup
from markdownify import markdownify as md


# ============== 配置 ==============
BASE_URL = "https://rive.app/docs/"
CONCURRENT_LIMIT = 5  # 并发请求数
REQUEST_TIMEOUT = 30  # 请求超时(秒)
RETRY_COUNT = 3       # 失败重试次数


class RiveDocTranslator:
    """Rive 文档翻译器"""
    
    def __init__(self, config_path: str, output_base: str):
        self.config_path = Path(config_path)
        self.output_base = Path(output_base)
        self.session: aiohttp.ClientSession = None
        self.semaphore = asyncio.Semaphore(CONCURRENT_LIMIT)
        self.stats = {"success": 0, "failed": 0, "images": 0}
    
    async def __aenter__(self):
        timeout = aiohttp.ClientTimeout(total=REQUEST_TIMEOUT)
        # 禁用 SSL 验证以解决部分 CDN 证书问题
        import ssl
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE
        connector = aiohttp.TCPConnector(ssl=ssl_context)
        self.session = aiohttp.ClientSession(timeout=timeout, connector=connector)
        return self
    
    async def __aexit__(self, *args):
        await self.session.close()
    
    def load_config(self) -> dict:
        """加载页面配置"""
        with open(self.config_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    async def fetch_page(self, url: str) -> str | None:
        """HTTP 获取页面内容"""
        async with self.semaphore:
            for attempt in range(RETRY_COUNT):
                try:
                    async with self.session.get(url) as resp:
                        if resp.status == 200:
                            return await resp.text()
                        print(f"  ⚠️  {url} 返回 {resp.status}")
                except Exception as e:
                    if attempt < RETRY_COUNT - 1:
                        await asyncio.sleep(1)
                    else:
                        print(f"  ❌ 获取失败: {url} - {e}")
        return None
    
    def html_to_markdown(self, html: str) -> str:
        """将 HTML 转换为 Markdown"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # 查找主要内容区域 (Rive 文档结构)
        # 首选: #content-area (包含标题和正文)
        content = soup.find(id='content-area')
        
        # 备选: 组合 #header + #content
        if not content:
            header = soup.find(id='header')
            main_content = soup.find(id='content')
            if header or main_content:
                from bs4 import Tag
                content = soup.new_tag('div')
                if header:
                    content.append(header.extract())
                if main_content:
                    content.append(main_content.extract())
        
        # 最后备选: .prose 类
        if not content:
            content = soup.find(class_='prose')
        
        # 兜底方案
        if not content:
            content = soup.body if soup.body else soup
        
        # 移除不需要的元素
        remove_selectors = [
            'script', 'style', 'nav', 'footer', 'aside',
            '[class*="feedback"]',  # 反馈元素
            '[class*="sidebar"]',   # 侧边栏
            '[class*="toc"]',       # 目录
            'button',               # 按钮
        ]
        for selector in remove_selectors:
            for tag in content.select(selector):
                tag.decompose()
        
        # 移除 "Was this page helpful?" 等反馈文本
        for tag in content.find_all(string=re.compile(r'Was this page helpful|Suggest edits|Raise issue|YesNo')):
            parent = tag.find_parent()
            if parent:
                parent.decompose()
        
        # 转换为 Markdown
        markdown = md(str(content), heading_style="ATX", bullets="-")
        
        # 清理多余空行
        markdown = re.sub(r'\n{3,}', '\n\n', markdown)
        
        # 移除页面底部的导航链接和快捷键提示
        # 移除单独一行的导航链接（如 [Best Practices](/docs/...)）
        markdown = re.sub(r'\n\[[\w\s-]+\]\(/docs/[^)]+\)\s*$', '', markdown)
        # 移除快捷键提示
        markdown = re.sub(r'\n⌘[A-Z]\s*$', '', markdown)
        
        return markdown.strip()
    
    def extract_images(self, markdown: str, source_url: str) -> list[tuple[str, str]]:
        """提取 Markdown 中的图片 URL"""
        images = []
        pattern = r'!\[([^\]]*)\]\(([^)]+)\)'
        
        for match in re.finditer(pattern, markdown):
            alt_text, img_url = match.groups()
            
            # 处理相对路径
            if not img_url.startswith(('http://', 'https://')):
                img_url = urljoin(source_url, img_url)
            
            # 生成本地文件名
            parsed = urlparse(img_url)
            filename = os.path.basename(parsed.path) or f"image_{len(images)}.png"
            
            images.append((img_url, filename))
        
        return images
    
    async def download_image(self, url: str, dest_path: Path) -> bool:
        """下载单张图片"""
        async with self.semaphore:
            try:
                async with self.session.get(url) as resp:
                    if resp.status == 200:
                        dest_path.parent.mkdir(parents=True, exist_ok=True)
                        async with aiofiles.open(dest_path, 'wb') as f:
                            await f.write(await resp.read())
                        self.stats["images"] += 1
                        return True
            except Exception as e:
                print(f"  ⚠️  图片下载失败: {url} - {e}")
        return False
    
    def replace_image_paths(self, markdown: str, images: list[tuple[str, str]]) -> str:
        """替换图片路径为本地路径"""
        result = markdown
        for url, filename in images:
            # 替换为本地 images/ 路径
            result = result.replace(f']({url})', f'](images/{filename})')
        return result
    
    async def translate_to_chinese(self, text: str) -> str:
        """使用 Google Gemini API 翻译为中文"""
        try:
            import google.generativeai as genai
            import os
            
            # 尝试从环境变量获取API密钥
            api_key = os.environ.get('GEMINI_API_KEY')
            if not api_key:
                print("  ⚠️  未找到 GEMINI_API_KEY，跳过翻译")
                return text
            
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-2.0-flash-exp')
            
            prompt = f"""将以下 Rive 文档内容翻译为中文。要求：
1. 保持 Markdown 格式不变
2. 保留所有链接、图片路径、代码块
3. 专业术语翻译一致：State Machine → 状态机, Artboard → 画板, Timeline → 时间轴
4. 翻译要流畅自然，符合中文表达习惯
5. 保留原文中的专有名词（如 Rive, Lottie 等）

原文：
{text}

翻译："""
            
            response = model.generate_content(prompt)
            return response.text.strip()
            
        except ImportError:
            print("  ⚠️  google-generativeai 未安装，跳过翻译")
            return text
        except Exception as e:
            print(f"  ⚠️  翻译失败: {e}")
            return text
    
    async def process_page(self, source: str, target: str) -> bool:
        """处理单个页面"""
        url = urljoin(BASE_URL, source)
        target_path = self.output_base / target
        images_dir = target_path.parent / "images"
        
        print(f"📄 处理: {source}")
        
        # 1. 获取页面
        html = await self.fetch_page(url)
        if not html:
            self.stats["failed"] += 1
            return False
        
        # 2. 转换为 Markdown
        markdown = self.html_to_markdown(html)
        
        # 2.5 翻译为中文 (暂时跳过，先抓取英文)
        # print(f"  🌐 正在翻译...")
        # markdown = await self.translate_to_chinese(markdown)
        
        # 3. 提取并下载图片
        images = self.extract_images(markdown, url)
        if images:
            print(f"  🖼️  发现 {len(images)} 张图片")
            download_tasks = [
                self.download_image(img_url, images_dir / filename)
                for img_url, filename in images
            ]
            await asyncio.gather(*download_tasks)
            
            # 替换图片路径
            markdown = self.replace_image_paths(markdown, images)
        
        # 4. 保存 Markdown 文件
        target_path.parent.mkdir(parents=True, exist_ok=True)
        async with aiofiles.open(target_path, 'w', encoding='utf-8') as f:
            await f.write(markdown)
        
        self.stats["success"] += 1
        print(f"  ✅ 保存: {target}")
        return True
    
    async def run(self, limit: int = None, section: str = None):
        """运行批量处理"""
        config = self.load_config()
        pages = config.get("pages", {})
        
        all_pages = []
        for sec_name, sec_pages in pages.items():
            if section and section not in sec_name:
                continue
            all_pages.extend(sec_pages)
        
        if limit:
            all_pages = all_pages[:limit]
        
        print(f"\n🚀 开始处理 {len(all_pages)} 个页面 (并发: {CONCURRENT_LIMIT})\n")
        
        tasks = [
            self.process_page(p["source"], p["target"])
            for p in all_pages
        ]
        
        await asyncio.gather(*tasks)
        
        print(f"\n{'='*50}")
        print(f"✅ 成功: {self.stats['success']} | ❌ 失败: {self.stats['failed']} | 🖼️  图片: {self.stats['images']}")


async def main():
    """主函数"""
    script_dir = Path(__file__).parent
    config_path = script_dir / "pages_config.json"
    output_base = script_dir.parent  # 项目根目录
    
    # 解析命令行参数
    limit = None
    section = None
    
    for i, arg in enumerate(sys.argv[1:], 1):
        if arg == "--test":
            limit = 3
        elif arg == "--limit" and i < len(sys.argv) - 1:
            limit = int(sys.argv[i + 1])
        elif arg == "--section" and i < len(sys.argv) - 1:
            section = sys.argv[i + 1]
    
    async with RiveDocTranslator(config_path, output_base) as translator:
        await translator.run(limit=limit, section=section)


if __name__ == "__main__":
    asyncio.run(main())
