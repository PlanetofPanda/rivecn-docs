#!/usr/bin/env python3
"""
替换 rive.app 外部链接为本地链接

将 https://rive.app/docs/... 替换为本地链接格式
仅当本地文件存在时才进行替换
"""

import os
import re
from pathlib import Path

# 配置
DOCS_ROOT = Path(__file__).parent.parent
LOCAL_SITE_BASE = "http://rive.org.cn/docs/#"
RIVE_APP_PATTERN = r'https://rive\.app/docs/([^)"\'\s#]+)(?:#[^)"\'\s]*)?'

def path_to_local_file(url_path: str) -> Path:
    """将 URL 路径转换为本地文件路径"""
    # 移除可能的锚点
    path = url_path.split('#')[0]
    # 尝试多种可能的文件路径
    candidates = [
        DOCS_ROOT / f"{path}.md",
        DOCS_ROOT / path / "overview.md", 
        DOCS_ROOT / path / "README.md",
        DOCS_ROOT / path,
    ]
    for candidate in candidates:
        if candidate.exists():
            return candidate
    return None

def url_path_to_local_link(url_path: str) -> str:
    """将 rive.app URL 路径转换为本地链接"""
    # 保留锚点
    if '#' in url_path:
        path, anchor = url_path.split('#', 1)
        return f"{LOCAL_SITE_BASE}/{path}#{anchor}"
    return f"{LOCAL_SITE_BASE}/{url_path}"

def replace_links_in_file(file_path: Path, dry_run: bool = True) -> list:
    """替换文件中的链接"""
    replacements = []
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    
    # 查找所有 rive.app 链接
    for match in re.finditer(RIVE_APP_PATTERN, content):
        full_url = match.group(0)
        url_path = match.group(1)
        
        # 检查本地文件是否存在
        local_file = path_to_local_file(url_path)
        
        if local_file:
            # 构建本地链接
            local_link = url_path_to_local_link(url_path)
            replacements.append({
                'original': full_url,
                'replacement': local_link,
                'local_file': str(local_file.relative_to(DOCS_ROOT))
            })
            new_content = new_content.replace(full_url, local_link)
    
    if not dry_run and replacements:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    
    return replacements

def scan_and_replace(dry_run: bool = True):
    """扫描所有 Markdown 文件并替换链接"""
    all_replacements = {}
    not_replaced = {}
    
    for md_file in DOCS_ROOT.rglob("*.md"):
        # 跳过 node_modules 和隐藏目录
        if 'node_modules' in str(md_file) or '/.' in str(md_file):
            continue
        
        replacements = replace_links_in_file(md_file, dry_run)
        if replacements:
            rel_path = str(md_file.relative_to(DOCS_ROOT))
            all_replacements[rel_path] = replacements
    
    # 输出结果
    print(f"\n{'[DRY RUN] ' if dry_run else ''}链接替换报告")
    print("=" * 60)
    
    total_replaced = 0
    for file_path, replacements in all_replacements.items():
        print(f"\n📄 {file_path}")
        for r in replacements:
            print(f"   ✅ {r['original']}")
            print(f"      → {r['replacement']}")
            total_replaced += 1
    
    print(f"\n{'=' * 60}")
    print(f"总计: {total_replaced} 个链接{'将被' if dry_run else '已'}替换")
    
    if dry_run:
        print("\n💡 运行 `python tools/replace_links.py --execute` 执行实际替换")

if __name__ == "__main__":
    import sys
    dry_run = "--execute" not in sys.argv
    scan_and_replace(dry_run)
