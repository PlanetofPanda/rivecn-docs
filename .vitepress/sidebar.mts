import { readdirSync, statSync, readFileSync, existsSync } from 'fs'
import { join, basename, dirname, relative } from 'path'
import type { DefaultTheme } from 'vitepress'

// 文档目录映射（路径前缀 -> 显示名称）
const SECTION_TITLES: Record<string, string> = {
  'guide': '🏠 入门指南',
  'editor': '🎨 编辑器 (Editor)',
  'runtimes': '📱 应用运行时 (App Runtimes)',
  'games': '🎮 游戏运行时 (Game Runtimes)',
  'scripting': '💻 脚本 (Scripting)',
  'tutorials': '📚 教程与社区',
  'community': '🌐 社区'
}

// 子目录标题映射
const SUBDIR_TITLES: Record<string, string> = {
  'fundamentals': '基础概念',
  'interface-overview': '界面面板',
  'manipulating-shapes': '形状操控',
  'text': '文本',
  'constraints': '约束',
  'animate-mode': '动画模式',
  'state-machine': '状态机',
  'layouts': '布局',
  'data-binding': '数据绑定',
  'exporting': '导出',
  'events': '事件'
}

// 从 Markdown 文件中提取标题
function extractTitle(filePath: string): string {
  try {
    const content = readFileSync(filePath, 'utf-8')

    // 尝试从 frontmatter 获取 title
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/)
    if (frontmatterMatch) {
      const titleMatch = frontmatterMatch[1].match(/title:\s*['"]?(.+?)['"]?\s*$/m)
      if (titleMatch) return titleMatch[1]
    }

    // 尝试从第一个 # 标题获取
    const h1Match = content.match(/^#\s+(.+)$/m)
    if (h1Match) return h1Match[1]

    // 使用文件名作为后备
    return basename(filePath, '.md')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
  } catch {
    return basename(filePath, '.md')
  }
}

// 递归扫描目录生成侧边栏项
function scanDirectory(
  dir: string,
  baseDir: string,
  depth: number = 0
): DefaultTheme.SidebarItem[] {
  const items: DefaultTheme.SidebarItem[] = []

  if (!existsSync(dir)) return items

  const entries = readdirSync(dir).sort((a, b) => {
    // overview.md 排在最前
    if (a === 'overview.md') return -1
    if (b === 'overview.md') return 1
    // index.md 排在最前
    if (a === 'index.md') return -1
    if (b === 'index.md') return 1
    return a.localeCompare(b)
  })

  for (const entry of entries) {
    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)
    const relativePath = '/' + relative(baseDir, fullPath).replace(/\\/g, '/')

    if (stat.isDirectory()) {
      // 跳过隐藏目录和特殊目录
      if (entry.startsWith('.') || entry === 'node_modules' || entry === 'public') {
        continue
      }

      const subItems = scanDirectory(fullPath, baseDir, depth + 1)
      if (subItems.length > 0) {
        items.push({
          text: SUBDIR_TITLES[entry] || entry.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          collapsed: depth > 0,
          items: subItems
        })
      }
    } else if (entry.endsWith('.md') && entry !== 'index.md' && entry !== 'README.md') {
      const title = extractTitle(fullPath)
      items.push({
        text: title,
        link: relativePath.replace(/\.md$/, '')
      })
    }
  }

  return items
}

// 生成完整的侧边栏配置
export function generateSidebar(baseDir: string): DefaultTheme.Sidebar {
  const sidebar: DefaultTheme.Sidebar = {}

  for (const [section, title] of Object.entries(SECTION_TITLES)) {
    const sectionDir = join(baseDir, section)
    if (existsSync(sectionDir)) {
      const items = scanDirectory(sectionDir, baseDir)
      if (items.length > 0) {
        sidebar[`/${section}/`] = [{
          text: title,
          items: items
        }]
      }
    }
  }

  return sidebar
}

// 如果直接运行此脚本，打印生成的配置
if (import.meta.url.endsWith(process.argv[1]?.replace(/\\/g, '/'))) {
  const baseDir = process.cwd()
  console.log(JSON.stringify(generateSidebar(baseDir), null, 2))
}
