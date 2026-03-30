import { defineConfig, type HeadConfig } from 'vitepress'
import { generateSidebar } from './sidebar.mts'

// 获取项目根目录
const baseDir = process.cwd()

// 站点基本信息
const SITE_URL = 'https://rive.org.cn'
const BASE_PATH = '/docs/'

export default defineConfig({
    // 网站标题和描述
    title: 'Rive 中文文档',
    description: 'Rive 官方文档中文翻译版 - 交互式动画设计与开发的完整指南，涵盖编辑器、运行时、脚本和游戏集成。',

    // 部署的基础路径
    base: BASE_PATH,

    // 忽略死链检查（暂时关闭以便排查 404 链接）
    ignoreDeadLinks: false,

    // 开启 Clean URLs (适应 Nginx 的去 .html 配置)
    cleanUrls: true,

    // 默认开启深邃发光科技模式 (Dark Mode)
    appearance: 'dark',

    // ==================== SEO 配置 ====================

    // Sitemap 自动生成
    sitemap: {
        hostname: SITE_URL,
    },

    // 全局 Head 标签
    head: [
        // 外部字体 (Inter & Fira Code)
        ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
        ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
        ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }],

        // Favicon
        ['link', { rel: 'icon', href: `${BASE_PATH}favicon.svg`, type: 'image/svg+xml' }],

        // 基础 SEO
        ['meta', { name: 'author', content: 'Rive 中文文档社区' }],
        ['meta', { name: 'theme-color', content: '#6c5ce7' }],

        // Open Graph 基础标签
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:site_name', content: 'Rive 中文文档' }],
        ['meta', { property: 'og:locale', content: 'zh_CN' }],
        ['meta', { property: 'og:url', content: SITE_URL }],

        // Twitter Card
        ['meta', { name: 'twitter:card', content: 'summary' }],
        ['meta', { name: 'twitter:site', content: '@rive_app' }],

        // 搜索引擎验证（替换为你的验证码）
        // ['meta', { name: 'baidu-site-verification', content: 'YOUR_BAIDU_CODE' }],
        // ['meta', { name: 'google-site-verification', content: 'YOUR_GOOGLE_CODE' }],

        // 百度统计自动推送（有助于收录）
        // ['script', {}, `
        //   var _hmt = _hmt || [];
        //   (function() {
        //     var hm = document.createElement("script");
        //     hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_ANALYTICS_ID";
        //     var s = document.getElementsByTagName("script")[0];
        //     s.parentNode.insertBefore(hm, s);
        //   })();
        // `],
    ],

    // 动态 Head：为每个页面注入 canonical、OG 标签和结构化数据
    transformHead({ pageData }) {
        const heads: HeadConfig[] = []

        // 构建 canonical URL (配合 Nginx 自动去掉 .html)
        const pagePath = pageData.relativePath
            .replace(/index\.md$/, '')
            .replace(/\.md$/, '')
        const canonicalUrl = `${SITE_URL}${BASE_PATH}${pagePath}`

        // Canonical 标签
        heads.push(['link', { rel: 'canonical', href: canonicalUrl }])

        // hreflang（中英文互指）
        heads.push(['link', { rel: 'alternate', hreflang: 'zh-Hans', href: canonicalUrl }])

        // OG 动态标签
        const title = pageData.frontmatter.title || pageData.title || 'Rive 中文文档'
        const description = pageData.frontmatter.description || pageData.description || 'Rive 官方文档中文翻译版'

        heads.push(['meta', { property: 'og:title', content: title }])
        heads.push(['meta', { property: 'og:description', content: description }])
        heads.push(['meta', { property: 'og:url', content: canonicalUrl }])
        heads.push(['meta', { property: 'og:image', content: `${SITE_URL}${BASE_PATH}og-image.jpg` }])

        // Twitter 动态标签
        heads.push(['meta', { name: 'twitter:title', content: title }])
        heads.push(['meta', { name: 'twitter:description', content: description }])

        // JSON-LD 结构化数据
        const jsonLd = {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            'headline': title,
            'description': description,
            'inLanguage': 'zh-CN',
            'url': canonicalUrl,
            'publisher': {
                '@type': 'Organization',
                'name': 'Rive 中文文档',
                'url': SITE_URL,
            },
            'isPartOf': {
                '@type': 'WebSite',
                'name': 'Rive 中文文档',
                'url': SITE_URL,
            },
        }

        heads.push([
            'script',
            { type: 'application/ld+json' },
            JSON.stringify(jsonLd),
        ])

        return heads
    },

    // ==================== 最后更新时间 ====================
    lastUpdated: true,

    // ==================== 主题配置 ====================
    themeConfig: {
        // 导航栏
        nav: [
            { text: '🏠 入门指南', link: '/guide/introduction' },
            { text: '🎨 编辑器 (Editor)', link: '/editor/interface-overview/overview' },
            { text: '📱 应用运行时 (App Runtimes)', link: '/runtimes/overview' },
            { text: '🎮 游戏运行时 (Game Runtimes)', link: '/games/unity' },
            { text: '💻 脚本 (Scripting)', link: '/scripting/overview' },
            { text: '📚 教程与社区', link: '/tutorials/learn-rive' }
        ],

        // 自动生成的侧边栏
        sidebar: generateSidebar(baseDir),

        // 社交链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/PlanetofPanda/rivecn-docs' }
        ],

        // 搜索配置
        search: {
            provider: 'local',
            options: {
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
                            navigateText: '切换',
                            closeText: '关闭'
                        }
                    }
                }
            }
        },

        // 页脚导航
        editLink: {
            pattern: 'https://github.com/PlanetofPanda/rivecn-docs/edit/main/:path',
            text: '在 GitHub 上编辑此页'
        },

        // 首页页脚（仅在使用默认 layout: home 时生效）
            footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener" style="color:var(--vp-c-text-2);text-decoration:hover:underline;">京ICP备2023007831号-7</a> <span style="margin: 0 8px;">|</span> <img src="https://beian.mps.gov.cn/web/assets/logo01.6189a29f.png" width="16" style="display:inline;vertical-align:middle;margin-top:-2px;"> <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11011502030362" target="_blank" rel="noopener" style="color:var(--vp-c-text-2);text-decoration:hover:underline;">京公网安备11011502030362号</a>',
      copyright: '版权所有 © 2024 Rive'
    },

        // 文档页脚
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },

        // 最后更新时间
        lastUpdated: {
            text: '最后更新于'
        },

        // 大纲配置
        outline: {
            label: '页面导航',
            level: [2, 3]
        },

        // 返回顶部
        returnToTopLabel: '回到顶部',

        // 侧边栏菜单标签
        sidebarMenuLabel: '菜单',

        // 深色模式切换标签
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
    },

    // Markdown 配置
    markdown: {
        lineNumbers: true
    }
})
