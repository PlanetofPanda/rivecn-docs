<script setup>
import { withBase } from 'vitepress'
</script>

<template>
  <main class="home-container">
    <div class="background-grid"></div>
    <div class="glow orb-1"></div>
    <div class="glow orb-2"></div>

    <section class="hero-section">
      <div class="badge">
        <span class="badge-dot"></span>
        <span class="badge-text">Rive 中文文档正式上线 2.0</span>
      </div>

      <h1 class="headline">
        用交互动画<br/>
        <span class="gradient-text">重塑数字产品体验</span>
      </h1>
      
      <p class="tagline">
        抛弃笨重的 GIF 与视频。使用 Rive 状态机与实时渲染引擎，跨平台构建具有毫秒级动态响应的高性能极速矢量图形。
      </p>

      <div class="action-group">
        <a :href="withBase('/guide/introduction')" class="btn btn-primary">
          立即开始构建
          <svg class="arrow" viewBox="0 0 24 24" width="18" height="18"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="https://github.com/rive-app" target="_blank" class="btn btn-secondary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.699-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          查看 GitHub
        </a>
      </div>
    </section>

    <section class="features">
      <div class="feature-card">
        <div class="feature-icon bg-blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
        </div>
        <h3 class="feature-title">毫秒级极速渲染</h3>
        <p class="feature-desc">专为性能打造。告别传统 GIF 的高资源消耗，Rive 提供丝滑原生的矢量渲染引擎，即使在最低端的设备上也能 60FPS 满帧运行。</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon bg-purple">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        </div>
        <h3 class="feature-title">状态机交互逻辑</h3>
        <p class="feature-desc">不只是动画，更是交互应用。通过所见即所得的状态机 (State Machine) 面板，轻松绑定悬停、点击以及各种应用层逻辑。</p>
      </div>

      <div class="feature-card">
        <div class="feature-icon bg-indigo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/></svg>
        </div>
        <h3 class="feature-title">跨端全平台支持</h3>
        <p class="feature-desc">一份图形资源，随处运行。全面拥抱 React、Vue、iOS、Android、Flutter 乃至 C++ 游戏引擎，多端视觉体验完美统一。</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* 终极现代官网风格：高定毛玻璃与冷科技美学 */
/* 由开源极简思潮 (Apple/Vercel) 汲取设计精髓 */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.home-container {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  min-height: calc(100vh - var(--vp-nav-height));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 2rem 8rem;
  background-color: var(--vp-c-bg); /* 跟随宿主主题 */
  z-index: 1;
}

/* 呼吸流光背景光晕 */
.glow {
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  filter: blur(120px);
  z-index: -1;
  opacity: 0.15;
  animation: float 20s infinite ease-in-out alternate;
  pointer-events: none;
}
.orb-1 {
  background: radial-gradient(circle, #3b82f6 0%, rgba(59,130,246,0) 70%);
  top: -10%;
  left: -10%;
}
.orb-2 {
  background: radial-gradient(circle, #8b5cf6 0%, rgba(139,92,246,0) 70%);
  bottom: 0;
  right: -20%;
  animation-delay: -10s;
}

/* 科技风网格背景 */
.background-grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(var(--vp-c-divider) 1px, transparent 1px),
                    linear-gradient(90deg, var(--vp-c-divider) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(circle at center, black 10%, transparent 60%);
  -webkit-mask-image: radial-gradient(circle at center, black 10%, transparent 60%);
  z-index: -2;
  opacity: 0.3;
}

/* ================= 核心视觉：英雄区域 ================= */
.hero-section {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* 开源流行的“新功能徽章”标签 */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.3s ease;
  cursor: pointer;
}
.badge:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}
.badge-dot {
  width: 8px;
  height: 8px;
  background-color: #3b82f6;
  border-radius: 50%;
  box-shadow: 0 0 8px #3b82f6;
  animation: pulse 2s infinite;
}

/* 超巨大标题：极具压迫感的设计 */
.headline {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: var(--vp-c-text-1);
  margin: 0 0 1.5rem;
  text-wrap: balance;
}

.gradient-text {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shine 8s linear infinite;
}

.tagline {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0 auto 3rem;
  max-width: 680px;
  text-wrap: balance;
  font-weight: 400;
}

/* ================= 按钮组 ================= */
.action-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: -0.01em;
}

.btn-primary {
  background: linear-gradient(to bottom, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.39);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.23);
  color: white;
}
.btn-primary .arrow {
  transition: transform 0.2s ease;
}
.btn-primary:hover .arrow {
  transform: translateX(4px);
}

.btn-secondary {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}
.btn-secondary:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-text-1);
  color: var(--vp-c-text-1);
  transform: translateY(-2px);
}

/* ================= 高端毛玻璃特性卡片 ================= */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1100px;
  margin-top: 5rem;
  opacity: 0;
  animation: slideUpFade 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
}

.feature-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.02);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(800px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.05), transparent 40%);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}
.feature-card:hover::before {
  opacity: 1;
}

.feature-icon {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
}
.bg-blue { background: linear-gradient(135deg, #60a5fa, #3b82f6); box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2); }
.bg-purple { background: linear-gradient(135deg, #a78bfa, #8b5cf6); box-shadow: 0 8px 16px rgba(139, 92, 246, 0.2); }
.bg-indigo { background: linear-gradient(135deg, #818cf8, #6366f1); box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2); }

.feature-icon svg {
  width: 28px;
  height: 28px;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 0.75rem;
  letter-spacing: -0.01em;
}

.feature-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* ================= 极客物理动效 ================= */
@keyframes slideUpFade {
  0% { transform: translateY(40px) scale(0.98); opacity: 0; }
  100% { transform: translateY(0) scale(1); opacity: 1; }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
@keyframes shine {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* ================= 移动端适配 ================= */
@media (max-width: 768px) {
  .headline { font-size: 2.5rem; }
  .tagline { font-size: 1rem; }
  .action-group { flex-direction: column; width: 100%; }
  .btn { width: 100%; justify-content: center; }
  .home-container { padding: 4rem 1.5rem 6rem; }
}
</style>
