## 1. 验证阶段

- [x] 1.1 在浏览器控制台验证 `https://esm.sh/beautiful-mermaid@1.1.3` 可通过 ESM import 加载，`window.beautifulMermaid.THEMES` 可访问（15 套主题）
- [x] 1.2 验证 `renderMermaid('graph TD; A-->B')` 返回有效 SVG 字符串（2725 chars）
- [x] 1.3 验证 `renderMermaid('stateDiagram-v2; A-->B')` 和 `renderMermaid('xychart-beta; bar..."')` 正常渲染（state 3147 chars, xychart-bar 32991 chars, xychart-combined 34587 chars, state-CJK 3509 chars）
- [x] 1.4 **【阻断性验证】** 验证 ESM import 在 `file://` 协议下：unpkg 的 `dist/index.js` 内部 `import "entities"` 无法被浏览器解析（bare module specifier），改用 esm.sh 自动解析依赖后 HTTP 协议下成功。`file://` 协议下 ESM import 跨域被浏览器阻止，但 esm.sh 在 HTTP 下可用。结论：需用 esm.sh CDN，且 `file://` 协议不支持（需本地 HTTP 服务器）

## 2. 替换 CDN 加载方式

- [x] 2.1 在 `index.html` 中删除旧的 `<script src="https://unpkg.com/beautiful-mermaid@0.1.3/dist/beautiful-mermaid.browser.global.js"></script>`
- [x] 2.2 在 `index.html` 中添加 `<script type="module">` ESM import（esm.sh），将导出挂到 `window.beautifulMermaid`，加载完成后 `dispatchEvent(new CustomEvent('beautiful-mermaid-loaded'))`
- [x] 2.3 更新 `index.html` 中的备选 CDN 注释（jsdelivr 需 importmap）

## 3. 适配 app.js 加载时序

- [x] 3.1 在 `app.js` 中添加 `window.addEventListener('beautiful-mermaid-loaded', ...)` 事件监听
- [x] 3.2 事件回调中触发重渲染（`schedulePreviewUpdate()`），让已用 mermaid.js 渲染的图表切换到 beautiful-mermaid。同时重新创建 `themeManager`（`const` → `let`）并重新填充主题选择器
- [x] 3.3 保留 `typeof beautifulMermaid !== 'undefined'` 检测逻辑（`const` → `let`），确保 ESM 加载前不报错，降级到 mermaid.js

## 4. 扩展图表类型支持

- [x] 4.1 在 `app.js` 中提取模块级常量 `const BEAUTIFUL_MERMAID_SUPPORTED_TYPES = ['flowchart', 'sequence', 'class', 'er', 'state', 'xyChart']`，消除三处重复定义
- [x] 4.2 修改 `ThemeManager.constructor()` `app.js:707` 的 `this.supportedTypes` 引用该常量（原为 `['flowchart', 'state', 'sequence', 'class', 'er']`，含 state 但无 xyChart）
- [x] 4.3 修改 `updateFullPreview()` `app.js:1980` 的 `supportedTypes` 引用该常量（原为 `['flowchart', 'sequence', 'class', 'er']`，无 state 无 xyChart）
- [x] 4.4 修改 `renderMermaidToPng()` `app.js:2200` 的 `supportedTypes` 引用该常量（原为 `['flowchart', 'sequence', 'class', 'er']`，无 state 无 xyChart）
- [x] 4.5 验证 `detectDiagramType()` `app.js:687` 已能识别 `xychart-beta` 返回 `'xyChart'`（大写 C，与常量一致）

## 5. 回归测试

- [x] 5.1 手动测试 flowchart 渲染（10848 chars，ELK.js 布局正常）
- [x] 5.2 手动测试 sequence diagram 渲染（5991 + 8923 chars）
- [x] 5.3 手动测试 class diagram 渲染（6882 chars）
- [x] 5.4 手动测试 ER diagram 渲染（10378 chars）
- [x] 5.5 手动测试 state diagram 渲染（7961 chars，含 CJK 字符正常）
- [x] 5.6 手动测试 xychart 渲染（36125 chars，bar/line/combined）
- [x] 5.7 手动测试 gantt/pie/journey 等降级到 mermaid.js 的图表仍正常（sankey frontmatter 降级已修复）
- [x] 5.8 手动测试主题切换（15 套主题，已验证 zinc-light vs tokyo-night 输出不同 SVG，主题生效）
- [x] 5.9 手动测试 DOCX 导出：点击 Generate DOCX 成功下载 `Markdown_&_Mermaid_示例文档.docx`。flownchart/sequence/class/er/state/xychart 通过 beautiful-mermaid 转 PNG。radar（预存不支持）导致两个原生 mermaid.js 渲染错误（pre-existing）
- [x] 5.10 手动测试 ASCII 模式（`renderMermaidAscii` 返回有效字符串）

## 6. 更新文档

- [x] 6.1 在 `AGENTS.md` 中将 `beautiful-mermaid v0.1.3` 更新为 `beautiful-mermaid v1.1.3`
- [x] 6.2 在 `AGENTS.md` 的"图表渲染策略"部分更新支持类型（4 种 → 6 种，加 state 和 xyChart）
- [x] 6.3 在 `default.md` 中更新三处 state 相关文档：
  - L533 "不支持主题的图表（State, Gantt, Pie 等）" → 移除 State
  - L552 "不支持主题的图表：State（状态图）..." → 移除 State
  - L556 "状态图暂时使用原生 Mermaid.js 渲染" 注释 → 删除整段
- [x] 6.4 验证 `default.md` 现有 xychart 示例（L358-364 bar+line combined）升级后渲染正确（36125 chars），无需新增
- [x] 6.5 验证 `default.md` 现有 state diagram 示例（L172-180 含 CJK 字符）升级后渲染正确（7961 chars），无需新增

## 7. 最终验证

- [x] 7.1 浏览器控制台无升级引入的错误（elkjs 加载正常、CORS 无错误。仅 radar-beta mermaid.js 解析错误为 pre-existing，与本次升级无关）
- [x] 7.2 `file://` 协议不支持 ESM import（已确认），需在 README 添加"需用本地 HTTP 服务器"提示。降级逻辑会自动回退到 mermaid.js 渲染
- [x] 7.3 确认与 `unify-native-mermaid-theming` change 的执行顺序：**upgrade-beautiful-mermaid 已先实施**，state/xyChart 从 mermaid.js 路径移走。unify 的 tasks 5.12（XYChart 配色验证）和 5.14（State 配色验证）需改为"确认走 beautiful-mermaid 主题渲染"
