# Design: beautiful-mermaid 0.1.3 → 1.1.3 升级

## Context

当前项目通过 CDN `<script>` 标签加载 `beautiful-mermaid@0.1.3` 的 browser global bundle（`dist/beautiful-mermaid.browser.global.js`），暴露全局变量 `beautifulMermaid`。`app.js` 通过 `typeof beautifulMermaid !== 'undefined'` 检测加载状态，直接调用 `beautifulMermaid.renderMermaid()` 和 `beautifulMermaid.THEMES`。

**核心约束**：项目是无构建系统的纯前端应用，直接浏览器打开 `index.html` 使用，不能引入 npm/bundler。

## Goals / Non-Goals

### Goals
- 升级到 beautiful-mermaid@1.1.3，获得 6 种图表类型 + 15 套主题 + ELK.js 布局
- 保持纯前端 CDN 架构，不引入构建系统
- 保持现有 `app.js` 调用 `renderMermaid()` / `THEMES` 的代码模式，最小化改动

### Non-Goals
- 不引入 npm/bundler 构建系统
- 不集成 Shiki 主题（`fromShikiTheme()` 可选，本次不做）
- 不重构 `app.js` 的渲染管线（仅适配加载方式和扩展 supportedTypes）
- 不改变 mermaid.js 的降级逻辑

## Decisions

### 决策 1：用 ESM import 替代 browser global script

**问题**：1.1.3 移除了 `dist/beautiful-mermaid.browser.global.js`，只提供 ESM `dist/index.js`。

**选择**：用 `<script type="module">` + `import` 加载，将导出挂到 `window.beautifulMermaid` 供 `app.js` 使用。

```html
<!-- 替代旧的 <script src="...browser.global.js"> -->
<!-- 注意：必须用 esm.sh，不能用 unpkg。1.1.3 的 dist/index.js 内部 import "entities"，
     unpkg 不会自动解析 bare module specifier，浏览器报 "Failed to resolve module specifier"。
     esm.sh 自动解析并打包依赖。 -->
<script type="module">
    import * as beautifulMermaid from 'https://esm.sh/beautiful-mermaid@1.1.3';
    window.beautifulMermaid = beautifulMermaid;
    window.dispatchEvent(new CustomEvent('beautiful-mermaid-loaded'));
</script>
```

**理由**：
- ESM 是 1.1.3 唯一可用的 bundle 形式
- `<script type="module">` 原生支持，无需 bundler
- 挂到 `window` 保持 `app.js` 的 `typeof beautifulMermaid !== 'undefined'` 检测不变
- **必须用 esm.sh**：1.1.3 的 `dist/index.js` 内部 `import "entities"`（bare module specifier），unpkg 不解析依赖，浏览器报错。esm.sh 自动解析并打包依赖

**备选方案**：
- **A. 用 unpkg + importmap**：`<script type="importmap">{"imports":{"entities":"https://unpkg.com/entities@4/lib/index.esm.js"}}</script>` 手动映射，但需维护依赖列表
- **B. 自己构建 browser global bundle**：fork 仓库加 tsup iife 配置，维护成本高
- **C. 锁定 1.0.2**：查 1.0.2 是否还有 browser global bundle——但 1.0.2 可能也有同样问题0.0 起就移除了 tsup.config.ts，大概率没有

选直接用 unpkg 的 ESM，最简单。

### 决策 2：异步加载时序处理

**问题**：`<script type="module">` 是异步执行的，`app.js`（普通 `<script>`）可能在 ESM 加载前就执行了，`window.beautifulMermaid` 还未定义。

**选择**：用 CustomEvent 通知加载完成，`app.js` 监听该事件后再执行依赖 beautiful-mermaid 的逻辑。

```javascript
// app.js 中
window.addEventListener('beautiful-mermaid-loaded', () => {
    // 重新执行渲染或标记 beautifulMermaid 可用
    if (currentMarkdown) scheduleUpdate();  // 触发重渲染
});
```

**理由**：避免轮询检测，用事件驱动。首次加载时如果 beautiful-mermaid 还没好，图表会先用 mermaid.js 渲染，加载完成后事件触发重渲染切到 beautiful-mermaid。

### 决策 3：API 兼容性确认

**验证结果**：1.1.3 的 ESM 导出包含 `renderMermaid`、`THEMES`、`renderMermaidASCII`、`parseMermaid`、`DEFAULTS`、`fromShikiTheme`，与 0.1.3 的 API 兼容。`renderMermaid()` 签名不变（`renderMermaid(text, options)` 返回 Promise<string>）。

**无需改动**：`app.js` 中 `beautifulMermaid.renderMermaid(mermaidDefinition, currentTheme)` 和 `beautifulMermaid.THEMES` 的调用方式保持不变。

### 决策 4：supportedTypes 扩展

**选择**：将 `app.js` 中的三处 `supportedTypes` 统一扩展为 `['flowchart', 'sequence', 'class', 'er', 'state', 'xyChart']`。

**代码现状（三处不一致）**：
- `ThemeManager.constructor()` `app.js:668` — `['flowchart', 'state', 'sequence', 'class', 'er']`（含 state）
- `updateFullPreview()` `app.js:1938` — `['flowchart', 'sequence', 'class', 'er']`（无 state）
- `renderMermaidToPng()` `app.js:2158` — `['flowchart', 'sequence', 'class', 'er']`（无 state）

**实施要求**：
- 三处 SHALL 统一为同一数组，建议提取为模块级常量 `const BEAUTIFUL_MERMAID_SUPPORTED_TYPES = ['flowchart', 'sequence', 'class', 'er', 'state', 'xyChart']` 消除重复
- 类型标识 `'xyChart'` 大写 C SHALL 与 `detectDiagramType()` `app.js:649` 的返回值一致（代码已返回 `'xyChart'`）

**理由**：
- `state`：0.1.3 因 bug 移除，1.1.3 已修复（1.1.0 release notes 提到 CJK state diagram support）
- `xyChart`：1.1.0 新增，`detectDiagramType` 已能识别 `xychart-beta` 语法

## Risks / Trade-offs

### [ESM 加载时序] → 事件驱动重渲染
ESM 异步加载可能导致首屏图表先用 mermaid.js 渲染，加载后闪烁切换。缓解：加载完成事件触发平滑重渲染，用户感知为"主题加载完成"。

### [ELK.js 布局结果与 dagre 不同] → 回归测试
现有 `default.md` 中的图表布局会变化。缓解：升级后逐个图表类型手动验证，更新 `default.md` 中因布局变化导致的截图/描述。

### [elkjs 依赖打包] → 验证 ESM bundle 自包含
1.1.3 的 `dist/index.js`（335KB）应已打包 elkjs。缓解：升级后在浏览器控制台确认无 "elkjs not found" 错误。

### [CDN 可用性] → 备选 CDN
unpkg 在国内偶尔不稳定。缓解：保留 0.1.3 的 cdnjs 备选注释，新增 esm.sh 备选。

### [ESM CORS] → 验证 unpkg CORS
`<script type! type="module">` 跨域 import 需要 CDN 支持 CORS。unpkg 默认支持。缓解：如遇!遇 CORS 问题，切到 esm.sh。

## Migration Plan

1. **验证阶段**：在 `index.html` 临时加 ESM import，浏览器控制台确认 `window.beautifulMermaid.THEMES` 可访问，确认 `renderMermaid('graph TD; A-->B')` 返回 SVG
2. **替换加载方式**：删除旧 `<script src="...browser.global.js">`，加 `<script type="module">` import
3. **加!加事件监听**：`app.js` 加 `beautiful-mermaid-loaded` 事件监听
4. **扩展 supportedTypes**：加回 `state`，新增 `xychart`
5. **回归测试**：逐个图表类型手动验证（flowchart/sequence/class/er/state/xychart/gantt/pie/journey）
6. **更新文档**：`AGENTS.md` 版本号，`default.md` 删 state 移除注释 + 加 xychart 示例

**回滚**：如升级失败，将 `index.html` 的 ESM import 换回 0.1.3 的 browser global script，`supportedTypes` 移除 state/xychart。

## Open Questions

1. **1.1.3 的 `renderMermaidASCII` 是否兼容 0.1.3 的 `renderMermaidAscii`？**——1.1.3 导出里两个都有（`renderMermaidASCII` 和 `renderMermaidAscii`），应该兼容，但需验证 ASCII 模式实际渲染效果。

## 前置阻断性验证

**ESM import 在 `file://` 协议下是否工作？**——已验证：**不工作**。

- **验证结果**：`file://` 协议下 ESM import 跨域被浏览器同源策略阻止。此外，unpkg 的 `dist/index.js` 内部 `import "entities"`（bare module specifier），即使 HTTP 下也无法直接用 unpkg。
- **解决方案**：
  1. **CDN 改用 esm.sh**：`https://esm.sh/beautiful-mermaid@1.1.3` 自动解析 `entities` 依赖，HTTP 协议下验证全部通过（15 主题 + 8 图表类型 + ASCII）
  2. **`file://` 协议限制**：用户双击打开 `index.html` 时 ESM import 不工作。需在 README 添加提示："如需使用 beautiful-mermaid 主题功能，请用本地 HTTP 服务器打开（`python -m http.server`）"。降级逻辑会自动回退到 mermaid.js 渲染，基本功能不受影响
