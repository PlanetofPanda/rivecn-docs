import os
import re
import json
from pathlib import Path

# Configuration
DOCS_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IGNORE_DIRS = {'.git', 'node_modules', 'tools', '_book', 'dist'}
PAGES_CONFIG_PATH = os.path.join(DOCS_ROOT, 'tools', 'pages_config.json')

def load_url_map():
    url_map = {}
    if os.path.exists(PAGES_CONFIG_PATH):
        try:
            with open(PAGES_CONFIG_PATH, 'r', encoding='utf-8') as f:
                config = json.load(f)
                if 'pages' in config:
                    for section, pages in config['pages'].items():
                        for page in pages:
                            source = page.get('source', '')
                            target = page.get('target', '')
                            if source and target:
                                # Normalize source: remove leading slash, ensure consistency
                                src_norm = source.lstrip('/')
                                # Map source -> target (absolute path from root)
                                url_map[src_norm] = target
        except Exception as e:
            print(f"Warning: Failed to load pages_config.json: {e}")
    return url_map

def find_markdown_files(root_dir):
    md_files = []
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    return md_files

def fix_content(content, file_path, url_map):
    
    def replace_link(match):
        text = match.group(1)
        link = match.group(2)
        original_link = link
        
        # Ignored links
        if link.startswith('#') or link.startswith('mailto:'):
            return match.group(0)

        # 1. Clean up link prefix
        # Remove https://rive.app/docs/ or /docs/
        link_clean = re.sub(r'https?://(help\.)?rive\.app/docs/', '', link)
        link_clean = re.sub(r'^(/?docs/)+', '', link_clean)
        link_clean = link_clean.lstrip('/') # Remove leading slash for matching

        # Extract anchor if present
        anchor = ''
        if '#' in link_clean:
            parts = link_clean.split('#', 1)
            link_clean = parts[0]
            anchor = '#' + parts[1]

        # 2. Try exact map lookup
        if link_clean in url_map:
            new_target = '/' + url_map[link_clean] + anchor
            # print(f"  Mapped: {original_link} -> {new_target}")
            return f"[{text}]({new_target})"

        # 3. Fallback: Check local existence smart fix
        # If not mapped, maybe it points directly to a file?
        candidate = link_clean
        if not candidate.endswith('.md'):
            # Try appending .md
            candidate_md = candidate + '.md'
            candidate_abs = os.path.join(DOCS_ROOT, candidate_md)
            if os.path.exists(candidate_abs):
                 new_target = '/' + candidate_md + anchor
                 return f"[{text}]({new_target})"
        
        # Check if it was already correct (absolute path to existing md)
        candidate_abs = os.path.join(DOCS_ROOT, candidate)
        if os.path.exists(candidate_abs) and candidate.endswith('.md'):
             new_target = '/' + candidate + anchor
             return f"[{text}]({new_target})"

        # 4. Handle "overview" shorthand
        # Rive often links to /foo/bar which means /foo/bar/overview
        candidate_overview = os.path.join(link_clean, 'overview.md')
        candidate_overview_abs = os.path.join(DOCS_ROOT, candidate_overview)
        if os.path.exists(candidate_overview_abs):
             new_target = '/' + candidate_overview + anchor
             return f"[{text}]({new_target})"
        
        # If we modified the link (e.g. removed http or /docs/), return the cleaner version at least
        # But prefer keeping relative if we didn't map it? No, standardizing to absolute / is easier for docsify
        # If we modified the link (e.g. removed http or /docs/), return the cleaner version
        # This ensures even broken links point to the local structure
        if link != original_link or link_clean != link.strip('/'):
             final_link = '/' + link_clean + anchor
             return f"[{text}]({final_link})"

        return match.group(0)

    # Regex to find markdown links [text](url)
    new_content = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', replace_link, content)
    
    return new_content

def main():
    print(f"Loading link map from {PAGES_CONFIG_PATH}...")
    url_map = load_url_map()
    print(f"Loaded {len(url_map)} redirects.")
    
    print(f"Fixing links in {DOCS_ROOT}...")
    md_files = find_markdown_files(DOCS_ROOT)
    
    fixed_count = 0
    
    for file_path in md_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = fix_content(content, file_path, url_map)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                fixed_count += 1
                # print(f"Updated: {os.path.relpath(file_path, DOCS_ROOT)}")
                    
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    print(f"\nDone. Modified {fixed_count} files.")

if __name__ == "__main__":
    main()
