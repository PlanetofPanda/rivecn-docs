# Rive 文档 VitePress 中文化任务清单

## 当前状态
- ✅ VitePress 已配置和安装
- ✅ 基本的配置文件已创建 (`docs/.vitepress/config.ts`)
- ⚠️ 导航栏和侧边栏标签仍为英文
- ⚠️ 文档内容仍为英文

## 待完成任务

### 阶段一:配置文件中文化

#### 任务 1.1: 更新导航栏(Nav)为中文 🔄
**文件:** `docs/.vitepress/config.ts`
**当前状态:** 导航项使用英文标签
**目标:** 
- "Home" → "首页"
- "Editor" → "编辑器"
- "Scripting" → "脚本编程"
- "App Runtimes" → "应用运行时"
- "Game Runtimes" → "游戏运行时"
- "Feature Support" → "功能支持"
- "Tutorials" → "教程"

#### 任务 1.2: 更新侧边栏(Sidebar)为中文 🔄
**文件:** `docs/.vitepress/config.ts`
**影响范围:** 所有侧边栏分组和菜单项
**当前状态:** 所有侧边栏标签为英文
**目标:** 将所有侧边栏文本翻译为中文,包括:
- Getting Started → 快速开始
- Community → 社区
- Account Admin → 账户管理
- Legal → 法律条款
- Editor → 编辑器
- Interface Overview → 界面概览
- Fundamentals → 基础知识
- 等等...

**估计条目数:** 约300+个标签需要翻译

### 阶段二:文档内容中文化

#### 任务 2.1: 批量翻译Markdown文档 ⏳
**范围:** 所有 `docs/**/*.md` 文件
**估计文件数:** 约200+个文件
**方法选项:**
1. 使用翻译API(如之前的 `batch_translate.py` 脚本)
2. 手动翻译关键页面
3. 混合方式:关键页面人工翻译,其他使用API

**优先级文件:**
- `/docs/getting-started/*.md` - 快速开始(高优先级)
- `/docs/editor/interface-overview/*.md` - 编辑器界面(高优先级)
- `/docs/runtimes/getting-started.md` - 运行时入门(高优先级)

### 阶段三:质量检查和优化

#### 任务 3.1: 验证所有链接 ⏳
- 检查文档间的内部链接
- 确保翻译后链接仍然有效

#### 任务 3.2: 检查图片和资源 ⏳
- 确保所有图片路径正确
- 验证图片在VitePress中正常显示

#### 任务 3.3: 测试构建和部署 ⏳
- 运行 `npm run docs:build`
- 修复任何构建错误
- 测试 `npm run docs:preview`

## 建议执行顺序

1. **立即开始:** 任务 1.1 和 1.2 (更新配置文件中的中文标签)
   - 这个工作量适中,可以快速看到中文界面效果
   
2. **然后:** 任务 2.1 (翻译文档内容)
   - 建议先翻译高优先级页面
   - 可以使用之前的翻译脚本加速
   
3. **最后:** 阶段三的质量检查

## 技术注意事项

1. **链接格式:** VitePress 的链接格式与 Docsify 可能不同,需要注意 `.md` 扩展名的处理
2. **组件语法:** 某些组件(如 `<YouTube>`)可能需要在 VitePress 中重新配置
3. **前置元数据:** 确保每个 `.md` 文件的 frontmatter 格式正确

## 下一步行动

**现在应该做什么?**
- [ ] 开始任务 1.1 和 1.2:更新 `config.ts` 中的所有英文标签为中文
- [ ] 创建/更新翻译脚本,用于批量翻译文档内容
- [ ] 重新打开预览,查看中文化效果

