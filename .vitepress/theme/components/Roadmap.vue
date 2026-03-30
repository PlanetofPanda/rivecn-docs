<template>
  <div class="roadmap-container">
    <h2 class="roadmap-title">Rive 动画设计学习路线</h2>
    <div class="timeline">
      <!-- Stage 1 -->
      <div class="timeline-step">
        <div class="step-indicator">
          <div class="dot"></div>
          <div class="line"></div>
        </div>
        <div class="step-content">
          <div class="stage-tag">阶段一</div>
          <h3 class="step-title">入门与基础准备</h3>
          <div class="branches">
            <div class="branch">
              <h4>创建账户并访问文档</h4>
              <ul>
                <li>创建账户</li>
                <li>使用 Rive 编辑器</li>
                <li>阅读“入门”简介</li>
                <li>熟悉文档结构</li>
              </ul>
            </div>
            <div class="branch">
              <h4>查看快速链接与最佳实践</h4>
              <ul>
                <li>查阅快速链接</li>
                <li>了解最佳实践</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Stage 2 -->
      <div class="timeline-step">
        <div class="step-indicator">
          <div class="dot"></div>
          <div class="line"></div>
        </div>
        <div class="step-content">
          <div class="stage-tag">阶段二</div>
          <h3 class="step-title">核心设计与动画逻辑</h3>
          <div class="branches">
            <div class="branch">
              <h4>学习设计与动画基础</h4>
              <p class="sub-desc">建议文档或视频并重，结合实践操作。</p>
              <ul>
                <li>查阅 Rive 核心文档</li>
                <li>查看各功能界面概览</li>
                <li>观看 Rive 101 教程视频</li>
                <li>核心理解：画板和图层</li>
              </ul>
            </div>
            <div class="branch">
              <h4>掌握强大的状态机</h4>
              <ul>
                <li>利用状态机可视化构建逻辑</li>
                <li>实现复杂的不同动画混合</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Stage 3 -->
      <div class="timeline-step">
        <div class="step-indicator">
          <div class="dot"></div>
          <div class="line"></div>
        </div>
        <div class="step-content">
          <div class="stage-tag">阶段三</div>
          <h3 class="step-title">运行集成与应用</h3>
          <div class="branches">
            <div class="branch">
              <h4>学习应用运行时</h4>
              <p class="sub-desc">涵盖 Web, iOS, Android, Flutter, React Native 等框架</p>
              <ul>
                <li>查阅 App Runtimes 文档</li>
                <li>支持跨平台与框架原生接入</li>
                <li>提供快速入门、示例和代码片段</li>
              </ul>
            </div>
            <div class="branch">
              <h4>学习游戏运行时</h4>
              <p class="sub-desc">涵盖 Unity, Unreal, Defold 等主流引擎</p>
              <ul>
                <li>查阅 Game Rive Runtimes 文档</li>
                <li>灵活支持主流各大游戏引擎</li>
                <li>基于导出自定义引擎无缝集成</li>
                <li>提供快速入门、示例和代码片段</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Stage 4 -->
      <div class="timeline-step">
        <div class="step-indicator">
          <div class="dot"></div>
        </div>
        <div class="step-content">
          <div class="stage-tag">阶段四</div>
          <h3 class="step-title">拓展、社区与管理</h3>
          <div class="branches">
            <div class="branch" style="grid-column: 1 / -1;">
              <h4>探索高级用例与实践</h4>
              <ul>
                <li>查看案例研究、博客或官方用例页面</li>
                <li>学习完整项目的高阶组件设计</li>
              </ul>
            </div>
            <div class="branch">
              <h4>查阅高级功能和脚本</h4>
              <ul>
                <li>脚本接口与事件监听 (Scripting)</li>
                <li>特殊性能与图形支持 (Feature Support)</li>
              </ul>
            </div>
            <div class="branch">
              <h4>了解社区和账户管理</h4>
              <ul>
                <li>社区资源概览 (互助与讨论)</li>
                <li>市场概览 (发布、分享和获取创作)</li>
                <li>团队协作与账户订阅管理</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.roadmap-container {
  max-width: 1024px;
  margin: 64px auto;
  padding: 24px;
  font-family: var(--vp-font-family-base);
}

.roadmap-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 64px;
  background: -webkit-linear-gradient(315deg, var(--vp-c-brand-1) 25%, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.timeline-step {
  display: flex;
  position: relative;
}

.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32px;
}

.timeline-step:last-child .step-indicator {
  margin-right: 32px;
}

.timeline-step .dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1);
  box-shadow: 0 0 16px var(--vp-c-brand-1);
  margin-top: 6px;
  z-index: 2;
  position: relative;
}

.timeline-step .dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
}

.timeline-step .line {
  width: 2px;
  flex-grow: 1;
  background: linear-gradient(180deg, var(--vp-c-brand-1) 0%, rgba(59, 130, 246, 0.1) 100%);
  margin-top: 8px;
  margin-bottom: -6px;
}

.step-content {
  flex-grow: 1;
  padding-bottom: 56px;
}

.stage-tag {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  background: rgba(59, 130, 246, 0.1);
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.step-title {
  font-size: 26px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 28px;
  margin-top: 0;
}

.branches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.branch {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-bg-soft-up);
  border-radius: 12px;
  padding: 24px;
  transition: all 0.3s ease;
}

.branch:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.dark .branch:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.branch h4 {
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-top: 0;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sub-desc {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  margin-bottom: 16px;
  line-height: 1.5;
}

.branch ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.branch li {
  font-size: 14.5px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  line-height: 1.6;
}

.branch li::before {
  content: "→";
  color: var(--vp-c-brand-1);
  margin-right: 10px;
  font-weight: bold;
}

.branch li:last-child {
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .branches {
    grid-template-columns: 1fr;
  }
  .roadmap-title {
    font-size: 26px;
  }
  .step-indicator {
    margin-right: 20px;
  }
}
</style>
