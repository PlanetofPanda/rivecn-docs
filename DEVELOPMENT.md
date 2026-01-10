# Rive 文档开发与部署指南

本项目基于 **VitePress** 构建。以下是常用的开发和预览命令。

## 1. 环境准备
确保已安装 Node.js (建议 v18+)，在项目根目录运行以下命令安装依赖：

```bash
npm install
```

## 2. 本地开发 (实时预览)
如果你在修改 `docs/` 下的 Markdown 文件或 `images/` 下的图片，可以使用开发服务器。**修改后浏览器会自动刷新，无需手动编译。**

```bash
npm run docs:dev
```
运行后访问：`http://localhost:5173`

## 3. 生产环境编译 (部署前必做)
如果你准备将修改推送到生产环境，需要先进行编译：

```bash
npm run docs:build
```
编译生成的静态文件会存放于 `docs/.vitepress/dist` 目录。

## 4. 本地预览编译后的版本
在部署之前，你可以预览编译后的静态文件，确保一切正常：

```bash
npm run docs:preview
```

## 5. 一键部署脚本
你也可以直接运行项目根目录下的部署脚本，它会自动安装依赖并执行构建：

```bash
bash deploy.sh
```

---

### 💡 常见问题 FAQ

**Q: 我更新了 index.md 和图片，一定要编译吗？**
- **本地查看**：不需要。只需运行 `npm run docs:dev`，任何修改都会实时显示。
- **线上生效**：需要。你需要运行 `npm run docs:build` 生成新的静态文件，然后将 `dist` 目录的内容提交或上传到服务器。
