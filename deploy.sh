#!/bin/bash

# Rive 文档 VitePress 构建和部署脚本

set -e

echo "🚀 开始构建 Rive 文档..."
echo "================================"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未安装 Node.js"
    exit 1
fi

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 构建文档
echo "🔨 构建生产版本..."
npm run docs:build

# 检查构建结果
if [ -d "docs/.vitepress/dist" ]; then
    echo ""
    echo "================================"
    echo "✅ 构建成功!"
    echo ""
    echo "📂 构建文件位置: docs/.vitepress/dist"
    echo ""
    echo "📋 部署步骤:"
    echo "  1. 将 docs/.vitepress/dist 目录上传到服务器"
    echo "  2. Nginx 配置示例:"
    echo ""
    echo "     server {"
    echo "         listen 80;"
    echo "         server_name your-domain.com;"
    echo "         root /path/to/dist;"
    echo "         index index.html;"
    echo ""
    echo "         location / {"
    echo "             try_files \$uri \$uri/ \$uri.html /index.html;"
    echo "         }"
    echo "     }"
    echo ""
    echo "  3. 重启 Nginx: sudo systemctl restart nginx"
    echo ""
    echo "🎉 本地预览: npm run docs:preview"
else
    echo "❌ 构建失败"
    exit 1
fi
