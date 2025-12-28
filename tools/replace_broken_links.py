import os
import re

# Configuration
DOCS_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IGNORE_DIRS = {'.git', 'node_modules', 'tools', '_book', 'dist'}

def find_markdown_files(root_dir):
    md_files = []
    for root, dirs, files in os.walk(root_dir):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        for file in files:
            if file.endswith('.md'):
                md_files.append(os.path.join(root, file))
    return md_files

def fix_broken_links(content):
    # Fix 1: Missing opening bracket [
    # Pattern: \nText Description](/path/to/file) -> \n[Text Description](/path/to/file)
    # Be careful not to match existing valid links [Text](/path)
    
    # We look for lines starting with text (not [) that end with ](/path)
    # But wait, the user example was:
    # [## 界面概览 (Interface Overview)
    # ...
    # ... ](/path)
    # This is a multi-line link block, which is valid in some markdown flavors but maybe not docsify?
    # actually user said: "从 Rive 编辑器工具栏访问设计和动画工具](/editor/interface-overview/toolbar.md)"
    # This looks like: "Text](/path)"
    
    # Regex to find: (start of line or non-bracket char) + Text + ](path)
    # But we must avoid matching `[Text](path)`
    
    # Let's try to match `](` and see what's before it.
    
    def replacer(match):
        full_match = match.group(0)
        # If it already has a [, ignore
        # We need to backtrack or check context. 
        # Simpler approach: Look for `\nSome text...](/path)`
        return full_match

    # Strategy:
    # Find patterns like:  `\n(.*?)]\((.*?)\)`
    # If group 1 does NOT start with [, add it?
    
    new_lines = []
    lines = content.split('\n')
    for line in lines:
        # Check for `](`
        if '](' in line:
            # Check if it starts with [
            stripped = line.strip()
            if not stripped.startswith('[') and not stripped.startswith('!') and not stripped.startswith('- [') and not stripped.startswith('* ['):
                # Potential broken link.
                # User example: "从 Rive 编辑器工具栏访问设计和动画工具](/editor/interface-overview/toolbar.md)"
                # This line ends with )
                if stripped.endswith(')'):
                     # Add [ at the beginning of the text part?
                     # Be careful with indentation
                     indent = line[:len(line)-len(stripped)]
                     new_line = indent + '[' + stripped
                     new_lines.append(new_line)
                     continue
        new_lines.append(line)
        
    return '\n'.join(new_lines)

def fix_content_regex(content):
    # Regex approach for more robust handling
    # Match: (Start of multiline string or newline) (Effective content that doesn't start with [ or !) ](url)
    
    # Case 1: Single line missing `[`
    # "Some text](/foo)" -> "[Some text](/foo)"
    # Avoid: "[Some text](/foo)" or "![Img](/foo)"
    
    pattern = re.compile(r'(^|\n)(?![\[!\-\*])([^\[\n]+)\]\((/[^)]+)\)')
    
    def replace(m):
        prefix = m.group(1)
        text = m.group(2)
        url = m.group(3)
        # print(f"Found broken link: {text} -> {url}")
        return f'{prefix}[{text}]({url})'
        
    return pattern.sub(replace, content)

def main():
    print(f"Fixing broken link syntax in {DOCS_ROOT}...")
    md_files = find_markdown_files(DOCS_ROOT)
    
    fixed_count = 0
    for file_path in md_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = fix_content_regex(content)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                fixed_count += 1
                # print(f"Fixed: {os.path.relpath(file_path, DOCS_ROOT)}")
                    
        except Exception as e:
            print(f"Error processing {file_path}: {e}")

    print(f"Start Processing... Modified {fixed_count} files.")

if __name__ == "__main__":
    main()
