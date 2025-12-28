import os
import re
import urllib.parse
from pathlib import Path

# Configuration
DOCS_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IGNORE_DIRS = {'.git', 'node_modules', 'tools', '_book', 'dist'}
IGNORE_LINKS = {'#', 'mailto:'}

# Rive Official URL patterns to detect
RIVE_URL_PATTERNS = [
    r'https?://rive\.app/docs',
    r'https?://help\.rive\.app/docs',
]

def find_markdown_files(root_dir):
    md_files = []
    for root, dirs, files in os.walk(root_dir):
        # Filter ignored directories
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    return md_files

def check_link(file_path, link, link_text):
    original_link = link
    
    # 1. Check for External Rive Links (Request #2)
    for pattern in RIVE_URL_PATTERNS:
        if re.match(pattern, link):
            return "EXTERNAL_RIVE_DOCS", f"Should be local: {link}"

    # Ignore other external links and special links
    if link.startswith('http') or link.startswith('#') or link.startswith('mailto:'):
        return "OK", None

    # Remove anchors for file checking
    link_path = link.split('#')[0]
    if not link_path: # internal anchor only
        return "OK", None

    # 2. Check for Incorrect /docs/ prefix (Request #1 & #2)
    if link_path.startswith('/docs/'):
        return "INVALID_PREFIX", f"Contains /docs/ prefix: {link}"

    # Resolve Path
    if link_path.startswith('/'):
        # Absolute from root
        target_path = os.path.join(DOCS_ROOT, link_path.lstrip('/'))
    else:
        # Relative from check file
        target_path = os.path.join(os.path.dirname(file_path), link_path)

    # Check existence
    if os.path.exists(target_path):
         if os.path.isdir(target_path):
             return "OK", None # Directory link implies README or index, usually handled by docsify
         return "OK", None
    
    # Try appending .md
    if os.path.exists(target_path + '.md'):
        return "OK", None # Valid if .md is appended

    # Try checking if it's a directory containing README.md
    if os.path.isdir(target_path) and os.path.exists(os.path.join(target_path, 'README.md')):
        return "OK", None

    return "BROKEN", f"Target not found: {link}"

def main():
    print(f"Scanning for links in {DOCS_ROOT}...")
    md_files = find_markdown_files(DOCS_ROOT)
    
    broken_links = []
    external_docs_links = []
    invalid_prefix_links = []

    link_regex = re.compile(r'\[([^\]]+)\]\(([^)]+)\)')

    for file_path in md_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            rel_file_path = os.path.relpath(file_path, DOCS_ROOT)
            
            matches = link_regex.findall(content)
            for text, link in matches:
                status, msg = check_link(file_path, link, text)
                
                if status == "BROKEN":
                    broken_links.append((rel_file_path, text, link, msg))
                elif status == "EXTERNAL_RIVE_DOCS":
                    external_docs_links.append((rel_file_path, text, link, msg))
                elif status == "INVALID_PREFIX":
                    invalid_prefix_links.append((rel_file_path, text, link, msg))
                    
        except Exception as e:
            print(f"Error reading {file_path}: {e}")

    print("\n--- Report ---")
    
    if external_docs_links:
        print(f"\n[External Rive Docs Links Found] ({len(external_docs_links)} items)")
        print("User Request #2: These should be converted to local links.")
        for f, t, l, m in external_docs_links[:10]:
            print(f"  File: {f}\n    Link: {l}")
        if len(external_docs_links) > 10: print(f"    ... and {len(external_docs_links) - 10} more.")

    if invalid_prefix_links:
        print(f"\n[Invalid '/docs/' Prefix Found] ({len(invalid_prefix_links)} items)")
        print("User Request #1/2: These links cause 404s locally because 'docs' folder doesn't exist.")
        for f, t, l, m in invalid_prefix_links[:10]:
            print(f"  File: {f}\n    Link: {l}")
        if len(invalid_prefix_links) > 10: print(f"    ... and {len(invalid_prefix_links) - 10} more.")

    if broken_links:
        print(f"\n[Broken Internal Links (404)] ({len(broken_links)} items)")
        print("User Request #1: These point to non-existent files.")
        for f, t, l, m in broken_links[:10]:
            print(f"  File: {f}\n    Link: {l} -> {m}")
        if len(broken_links) > 10: print(f"    ... and {len(broken_links) - 10} more.")

if __name__ == "__main__":
    main()
