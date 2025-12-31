#!/usr/bin/env node

/**
 * Mintlify 到 VitePress 转换脚本
 * 
 * 功能:
 * 1. 解析 docs.json 生成 VitePress 配置
 * 2. 转换 .mdx 文件为 .md
 * 3. 替换 Mintlify 组件为 VitePress 语法
 * 4. 处理图片路径
 * 5. 创建项目结构
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const CONFIG = {
    sourceRoot: path.join(__dirname, '..'),
    docsJsonPath: path.join(__dirname, '../docs.json'),
    outputRoot: path.join(__dirname, '../docs'),
    vitepressDir: path.join(__dirname, '../docs/.vitepress'),
};

// 颜色输出
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// 1. 解析 docs.json
function parseDocsJson() {
    log('\n📖 正在解析 docs.json...', 'blue');

    const docsJson = JSON.parse(fs.readFileSync(CONFIG.docsJsonPath, 'utf-8'));
    log('✓ docs.json 解析成功', 'green');

    return docsJson;
}

// 2. 生成 VitePress 导航配置
function generateNav(docsJson) {
    const tabs = docsJson.navigation?.tabs || [];

    const nav = tabs.map(tab => {
        const firstPage = getFirstPage(tab.groups);
        return {
            text: tab.tab,
            link: firstPage ? `/${firstPage}.md` : '/',
        };
    });

    return nav;
}

// 获取第一个页面路径
function getFirstPage(groups) {
    if (!groups || groups.length === 0) return null;

    for (const group of groups) {
        if (group.pages && group.pages.length > 0) {
            const firstPage = group.pages[0];
            if (typeof firstPage === 'string') {
                return firstPage;
            } else if (firstPage.pages && firstPage.pages.length > 0) {
                return firstPage.pages[0];
            }
        }
    }

    return null;
}

// 3. 生成 VitePress 侧边栏配置
function generateSidebar(docsJson) {
    const tabs = docsJson.navigation?.tabs || [];
    const sidebar = {};

    tabs.forEach(tab => {
        const groups = tab.groups || [];
        const sidebarItems = [];

        groups.forEach(group => {
            const item = processGroup(group);
            if (item) {
                sidebarItems.push(item);
            }
        });

        // 为每个 tab 创建侧边栏
        const firstPage = getFirstPage(groups);
        if (firstPage) {
            const basePath = `/${firstPage.split('/')[0]}/`;
            sidebar[basePath] = sidebarItems;
        }
    });

    return sidebar;
}

// 处理分组
function processGroup(group) {
    if (!group.pages) return null;

    const items = [];

    group.pages.forEach(page => {
        if (typeof page === 'string') {
            // 简单页面
            const parts = page.split('/');
            const text = parts[parts.length - 1]
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            items.push({
                text: text,
                link: `/${page}.md`,
            });
        } else if (page.group) {
            // 嵌套分组
            const nestedItem = processGroup(page);
            if (nestedItem) {
                items.push(nestedItem);
            }
        }
    });

    return {
        text: group.group,
        items: items,
        collapsed: false,
    };
}

// 4. 生成 VitePress 配置文件
function generateVitePressConfig(docsJson) {
    log('\n⚙️  正在生成 VitePress 配置...', 'blue');

    const nav = generateNav(docsJson);
    const sidebar = generateSidebar(docsJson);

    // 侧边栏配置处理 (确保包含斜杠的 key 被引用)
    const sidebarConfig = JSON.stringify(sidebar, null, 6)
        .replace(/"([^"]+)":/g, (match, key) => {
            // 如果 key 包含 /，保留引号
            if (key.includes('/')) {
                return `"${key}":`;
            }
            return `${key}:`;
        });

    const config = `import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Rive 中文文档',
  description: 'Rive 官方文档中文版',
  
  // 语言设置
  lang: 'zh-CN',

  // 忽略死链
  ignoreDeadLinks: true,
  
  // 主题配置
  themeConfig: {
    logo: '/logo/rive_top_logo_black.svg',
    
    // 导航栏
    nav: ${JSON.stringify(nav, null, 6).replace(/"([^"]+)":/g, '$1:')},
    
    // 侧边栏
    sidebar: ${sidebarConfig},
    
    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/rive-app' },
      { icon: 'twitter', link: 'https://twitter.com/rive_app' },
      { icon: 'discord', link: 'https://discord.com/invite/FGjmaTr' },
    ],
    
    // 搜索
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Rive'
    },
    
    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    
    // 大纲标题
    outlineTitle: '页面导航',
    
    // 最后更新时间文本
    lastUpdatedText: '最后更新',
    
    // 返回顶部
    returnToTopLabel: '返回顶部',
  },
  
  // Markdown 配置
  markdown: {
    lineNumbers: true,
  },
})
`;

    // 创建 .vitepress 目录
    if (!fs.existsSync(CONFIG.vitepressDir)) {
        fs.mkdirSync(CONFIG.vitepressDir, { recursive: true });
    }

    // 写入配置文件
    const configPath = path.join(CONFIG.vitepressDir, 'config.ts');
    fs.writeFileSync(configPath, config, 'utf-8');

    log('✓ VitePress 配置文件已生成', 'green');
}

// 5. 转换 MDX 到 MD
function convertMdxToMd(content, filePath) {
    let converted = content;

    // 移除 frontmatter 中的多余字段 (保留 title 和 description)
    converted = converted.replace(
        /---\n([\s\S]*?)\n---/,
        (match, frontmatter) => {
            const lines = frontmatter.split('\n');
            const filtered = lines.filter(line =>
                line.includes('title:') || line.includes('description:')
            );
            return filtered.length > 0 ? `---\n${filtered.join('\n')}\n---` : '';
        }
    );

    // 移除 import 语句
    converted = converted.replace(/^import\s+.*from\s+['"].*['"]\s*$/gm, '');

    // 修复缩进：将所有代码块（```）对齐到行首
    converted = converted.replace(/^\s+```/gm, '```');

    // 处理 <Demos> 和 <RiveCard>
    // 先移除 <Demos> 标签
    converted = converted.replace(/<Demos[\s\S]*?>/g, '');
    converted = converted.replace(/<\/Demos>/g, '');

    // 处理 <RiveCard>
    converted = converted.replace(/<RiveCard([\s\S]*?)>/g, (match, attrs) => {
        const titleMatch = attrs.match(/title="([^"]+)"/);
        const descMatch = attrs.match(/description="([^"]+)"/);
        const linkMatch = attrs.match(/web:\s*"([^"]+)"/);

        let output = '';
        if (titleMatch) output += `\n### ${titleMatch[1]}\n\n`;
        if (descMatch) output += `${descMatch[1]}\n\n`;
        if (linkMatch) output += `[Web Demo](${linkMatch[1]})\n`;

        return output;
    });
    converted = converted.replace(/<\/RiveCard>/g, '\n');

    // 移除其他未处理的自闭合组件 (除了 YouTube, br, img 等常见 HTML)
    // 注意：要小心不要误删正常的 HTML 或已处理的组件
    // 这里主要移除 <Example... /> 这种
    converted = converted.replace(/<Example[a-zA-Z0-9]*\s*\/>/g, '');


    // 转换 <video> 为 Markdown Link
    converted = converted.replace(
        /<video[\s\S]*?src=["']([^"']+)["'][\s\S]*?><\/video>/g,
        '\n> [Watch Video]($1)\n'
    );
    converted = converted.replace(
        /<video[\s\S]*?src=["']([^"']+)["'][\s\S]*?\/>/g,
        '\n> [Watch Video]($1)\n'
    );

    // 转换 JSX style={{ ... }} 为 simple style="..."
    converted = converted.replace(
        /style={{\s*([a-zA-Z0-9-]+)\s*:\s*["']([^"']+)["']\s*}}/g,
        'style="$1: $2"'
    );
    converted = converted.replace(/style={{[^}]+}}/g, '');

    // 转换 JSX className="..." 为 class="..."
    converted = converted.replace(/className=(["'])/g, 'class=$1');

    // 转换 <br/> 为 <br>
    converted = converted.replace(/<br\/>/g, '<br>');


    // 转换 <Note> / <Info> 为 ::: info
    converted = converted.replace(
        /<(?:Note|Info)>([\s\S]*?)<\/(?:Note|Info)>/g,
        (match, content) => `\n::: info\n${content.trim()}\n:::\n`
    );

    // 转换 <Warning> 为 ::: warning
    converted = converted.replace(
        /<Warning>([\s\S]*?)<\/Warning>/g,
        (match, content) => `\n::: warning\n${content.trim()}\n:::\n`
    );

    // 转换 <Tip> 为 ::: tip
    converted = converted.replace(
        /<Tip>([\s\S]*?)<\/Tip>/g,
        (match, content) => `\n::: tip\n${content.trim()}\n:::\n`
    );

    // 转换 <Steps> 和 <Step>
    converted = converted.replace(/<Steps>/g, '');
    converted = converted.replace(/<\/Steps>/g, '');
    converted = converted.replace(
        /<Step\s+title=["']([^"']+)["'][^>]*>/g,
        '\n### $1\n'
    );
    // 处理没有 title 的 <Step>
    converted = converted.replace(/<Step>/g, '\n- ');
    converted = converted.replace(/<\/Step>/g, '\n');

    // 转换 <Tabs> 和 <Tab>
    converted = converted.replace(/<Tabs>/g, '');
    converted = converted.replace(/<\/Tabs>/g, '');
    converted = converted.replace(
        /<Tab\s+title=["']([^"']+)["'][^>]*>/g,
        '\n### $1\n'
    );
    converted = converted.replace(/<\/Tab>/g, '\n');

    // 转换 <Frame> (移除)
    converted = converted.replace(/<Frame[^>]*>/g, '');
    converted = converted.replace(/<\/Frame>/g, '');

    // 转换 <LegacyApiNotice />
    converted = converted.replace(
        /<LegacyApiNotice\s*\/>/g,
        '\n::: warning\n**Legacy API Notice**\n:::\n'
    );

    // 转换 <YouTube id="..." /> 为自定义组件
    converted = converted.replace(
        /<YouTube\s+id=["']([^"']+)["']\s*\/>/g,
        '<YouTube videoId="$1" />'
    );

    // 预处理：移除 Card 组件中的 icon 属性（包含复杂 SVG）
    converted = converted.replace(/icon={<svg[\s\S]*?<\/svg>}/g, '');

    // 转换 <Card> 组件
    converted = converted.replace(
        /<Card[\s\S]*?title=["']([^"']+)["'][\s\S]*?href=["']([^"']+)["'][\s\S]*?>([\s\S]*?)<\/Card>/g,
        '**[$1]($2)**\n\n$3\n'
    );

    // 转换 <CardGroup> (移除标签，保留内容)
    converted = converted.replace(/<CardGroup[^>]*>/g, '');
    converted = converted.replace(/<\/CardGroup>/g, '');

    // 清理多余的空行
    converted = converted.replace(/\n{3,}/g, '\n\n');

    return converted;
}

// 6. 复制并转换文件
function processFile(sourcePath, targetPath) {
    const content = fs.readFileSync(sourcePath, 'utf-8');
    const converted = convertMdxToMd(content, sourcePath);

    // 确保目标目录存在
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetPath, converted, 'utf-8');
}

// 7. 递归处理目录
function processDirectory(sourceDir, targetDir, extensions = ['.mdx', '.md']) {
    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

    entries.forEach(entry => {
        const sourcePath = path.join(sourceDir, entry.name);

        if (entry.isDirectory()) {
            // 跳过特殊目录
            if (['.git', 'node_modules', 'scripts', '.vitepress'].includes(entry.name)) {
                return;
            }

            const targetPath = path.join(targetDir, entry.name);
            processDirectory(sourcePath, targetPath, extensions);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name);

            if (extensions.includes(ext)) {
                // 转换 .mdx 为 .md
                const newName = entry.name.replace(/\.mdx$/, '.md');
                const targetPath = path.join(targetDir, newName);

                processFile(sourcePath, targetPath);
                log(`  转换: ${path.relative(CONFIG.sourceRoot, sourcePath)}`, 'yellow');
            }
        }
    });
}

// 8. 复制静态资源
function copyStaticAssets() {
    log('\n📦 正在复制静态资源...', 'blue');

    const publicDir = path.join(CONFIG.outputRoot, 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // 复制目录的辅助函数
    function copyDir(src, dest) {
        if (!fs.existsSync(src)) {
            log(`  跳过: ${src} (不存在)`, 'yellow');
            return;
        }

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const entries = fs.readdirSync(src, { withFileTypes: true });

        entries.forEach(entry => {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                copyDir(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        });
    }

    // 复制 images 目录
    const imagesSource = path.join(CONFIG.sourceRoot, 'images');
    const imagesTarget = path.join(publicDir, 'images');
    copyDir(imagesSource, imagesTarget);
    log('  ✓ 复制 images 目录', 'green');

    // 复制 logo 目录
    const logoSource = path.join(CONFIG.sourceRoot, 'logo');
    const logoTarget = path.join(publicDir, 'logo');
    copyDir(logoSource, logoTarget);
    log('  ✓ 复制 logo 目录', 'green');

    // 复制 favicon
    const faviconSource = path.join(CONFIG.sourceRoot, 'favicon.svg');
    const faviconTarget = path.join(publicDir, 'favicon.svg');
    if (fs.existsSync(faviconSource)) {
        fs.copyFileSync(faviconSource, faviconTarget);
        log('  ✓ 复制 favicon.svg', 'green');
    }

    // 复制根目录下的 gif, png, jpg 文件
    const rootFiles = fs.readdirSync(CONFIG.sourceRoot);
    rootFiles.forEach(file => {
        if (file.match(/\.(gif|png|jpg|jpeg)$/i)) {
            fs.copyFileSync(
                path.join(CONFIG.sourceRoot, file),
                path.join(publicDir, file)
            );
            log(`  ✓ 复制根目录资源: ${file}`, 'green');
        }
    });

}

// 9. 创建首页
function createIndexPage() {
    log('\n📄 正在创建首页...', 'blue');

    const indexContent = `---
layout: home

hero:
  name: "Rive"
  text: "官方文档中文版"
  tagline: 设计、动画、交互 - 实时渲染
  actions:
    - theme: brand
      text: 开始使用
      link: /getting-started/introduction
    - theme: alt
      text: 编辑器指南
      link: /editor/interface-overview/overview
    - theme: alt
      text: 运行时文档
      link: /runtimes/getting-started

features:
  - icon: 🎨
    title: 强大的编辑器
    details: 在 Rive 编辑器中创建和动画化设计，利用强大的状态机构建动画逻辑
  - icon: 📱
    title: 跨平台运行时
    details: 支持 Web、iOS、Android、Flutter、React Native 等多个平台
  - icon: 🎮
    title: 游戏引擎集成
    details: 无缝集成 Unity、Unreal Engine 和 Defold 等游戏引擎
  - icon: ⚡️
    title: 实时渲染
    details: 轻量级运行时，确保流畅的实时渲染性能
  - icon: 🔧
    title: 状态机
    details: 强大的状态机系统，轻松管理复杂的交互逻辑
  - icon: 📚
    title: 丰富的文档
    details: 详细的文档、教程和示例，帮助你快速上手
---
`;

    const indexPath = path.join(CONFIG.outputRoot, 'index.md');
    fs.writeFileSync(indexPath, indexContent, 'utf-8');

    log('✓ 首页已创建', 'green');
}

// 10. 创建自定义主题
function createCustomTheme() {
    log('\n🎨 正在创建自定义主题...', 'blue');

    const themeDir = path.join(CONFIG.vitepressDir, 'theme');
    if (!fs.existsSync(themeDir)) {
        fs.mkdirSync(themeDir, { recursive: true });
    }

    // 主题入口文件
    const themeIndex = `import DefaultTheme from 'vitepress/theme'
import YouTube from './components/YouTube.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('YouTube', YouTube)
  }
}
`;

    fs.writeFileSync(path.join(themeDir, 'index.ts'), themeIndex, 'utf-8');

    // 自定义样式
    const customCss = `/**
 * 自定义样式
 */

:root {
  --vp-c-brand: #ffa41c;
  --vp-c-brand-light: #ffb84d;
  --vp-c-brand-lighter: #ffcc7a;
  --vp-c-brand-dark: #e69316;
  --vp-c-brand-darker: #cc8212;
}

/* YouTube 视频容器 */
.youtube-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  margin: 1rem 0;
}

.youtube-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`;

    fs.writeFileSync(path.join(themeDir, 'custom.css'), customCss, 'utf-8');

    log('✓ 自定义主题已创建', 'green');
}

// 11. 创建 YouTube 组件
function createYouTubeComponent() {
    const componentsDir = path.join(CONFIG.vitepressDir, 'theme/components');
    if (!fs.existsSync(componentsDir)) {
        fs.mkdirSync(componentsDir, { recursive: true });
    }

    const youtubeComponent = `<template>
  <div class="youtube-container">
    <iframe
      :src="'https://www.youtube.com/embed/' + videoId"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  videoId: string
}>()
</script>
`;

    fs.writeFileSync(
        path.join(componentsDir, 'YouTube.vue'),
        youtubeComponent,
        'utf-8'
    );

    log('  ✓ YouTube 组件已创建', 'green');
}

// 12. 主执行流程
async function main() {
    log('\n🚀 开始转换 Mintlify 到 VitePress...', 'blue');
    log('='.repeat(50), 'blue');

    try {
        // 1. 解析配置
        const docsJson = parseDocsJson();

        // 2. 生成 VitePress 配置
        generateVitePressConfig(docsJson);

        // 3. 创建自定义主题
        createCustomTheme();
        createYouTubeComponent();

        // 4. 转换文档文件
        log('\n📝 正在转换文档文件...', 'blue');

        // 需要转换的目录列表
        const dirsToConvert = [
            'getting-started',
            'editor',
            'runtimes',
            'game-runtimes',
            'scripting',
            'community',
            'account-admin',
            'legal',
            'tutorials',
        ];

        dirsToConvert.forEach(dir => {
            const sourceDir = path.join(CONFIG.sourceRoot, dir);
            const targetDir = path.join(CONFIG.outputRoot, dir);

            if (fs.existsSync(sourceDir)) {
                processDirectory(sourceDir, targetDir);
                log(`  ✓ ${dir} 目录转换完成`, 'green');
            }
        });

        // 转换根目录的 mdx 文件
        const rootMdxFiles = fs.readdirSync(CONFIG.sourceRoot)
            .filter(file => file.endsWith('.mdx'));

        rootMdxFiles.forEach(file => {
            const sourcePath = path.join(CONFIG.sourceRoot, file);
            const targetPath = path.join(CONFIG.outputRoot, file.replace('.mdx', '.md'));
            processFile(sourcePath, targetPath);
            log(`  转换: ${file}`, 'yellow');
        });

        // 5. 复制静态资源
        copyStaticAssets();

        // 6. 创建首页
        createIndexPage();

        log('\n' + '='.repeat(50), 'green');
        log('✅ 转换完成!', 'green');
        log('\n接下来的步骤:', 'blue');
        log('  1. cd 到项目目录', 'yellow');
        log('  2. 运行: npm install', 'yellow');
        log('  3. 运行: npm run docs:dev (开发预览)', 'yellow');
        log('  4. 运行: npm run docs:build (构建生产版本)', 'yellow');

    } catch (error) {
        log('\n❌ 转换失败:', 'red');
        console.error(error);
        process.exit(1);
    }
}

// 执行
main();
