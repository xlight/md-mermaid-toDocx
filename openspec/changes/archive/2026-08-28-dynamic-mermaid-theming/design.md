## Context

当前 `app.js:652` 的 `mermaid.initialize` 写死了 zinc-light themeVariables（`primaryColor: '#18181b'` 深黑等），导致 pie/quadrantChart 的填充色派生为黑底，与 `primaryTextColor: '#09090b'` 近黑文字冲突，标签看不见。主题切换时（`app.js:960` `themePicker.change`）只更新 beautiful-mermaid 主题，不重新初始化 mermaid.js，导致 dark 主题下两套图表割裂。DOCX 导出路径 `renderMermaidToPng`（`app.js:2367`）在 mermaid.js 分支硬编码 `bgColor = 'white'`（`app.js:2392`），dark 主题下 PNG 背景与 SVG 内容冲突。

beautiful-mermaid 主题对象结构：`{bg, fg, line?, accent?, muted?, surface?, border?}`（2-7 个颜色）。内置 15 套主题只用前 5 个字段，但自定义主题 UI（`app.js:1096-1103`）允许用户设 `surface` 和 `border`，且 beautiful-mermaid 渲染时确实消费这两个字段（SVG 输出含 `--surface`/`--border` CSS 变量）。mermaid.js themeVariables 体系庞大（pie1-12、quadrant1-4Fill、taskBkgColor 等），从 `theme-default.js` 源码可知各图表类型如何消费这些变量。

## Goals / Non-Goals

**Goals**:
- mermaid.js 图表配色从当前 beautiful-mermaid 主题动态派生
- 主题切换时 mermaid.js 自动重新初始化并重渲染
- DOCX 导出（PNG）的背景色从主题 `bg` 派生，不再硬编码 white
- 所有 21 种图表类型（6 beautiful-mermaid + 15 mermaid.js）在所有 15 套主题下对比度满足 WCAG AA

**Non-Goals**:
- 不改变 beautiful-mermaid 的主题机制（它用 CSS 变量，已正常工作）
- 不扩大 beautiful-mermaid 的支持类型（pie/quadrant 等仍走 mermaid.js）
- 不引入新依赖（颜色操作用现有 JS 或轻量内联函数）

## Decisions

### Decision 1: 派生函数 `bmThemeToMermaidVariables(bmTheme)` 的颜色算法

**选择**：基于 HSL 色相旋转 + 亮度自适应的派生算法。

**算法**：
1. **判断主题深浅**：计算 `bg` 的相对亮度（WCAG 公式 `L = 0.2126*R + 0.7152*G + 0.0722*B`），`L > 0.5` 为 light 主题，否则为 dark。
2. **基础变量**：
   - `background = bg`
   - `primaryTextColor = fg`
   - `lineColor = line ?? mix(fg, bg, 50%)`
   - `primaryColor = accent ?? mix(fg, bg, 15%)`（浅色填充，非深黑）
   - `secondaryColor = surface ?? mix(fg, bg, 8%)`、`tertiaryColor = mix(fg, bg, 12%)`（优先用主题 `surface` 字段）
   - `primaryBorderColor = border ?? mix(fg, bg, 20%)`（优先用主题 `border` 字段）
3. **Pie 扇形色**：从 `accent ?? fg` 做 HSL 色相旋转生成 12 色（每 30°），light 主题用浅饱和度（S=70%, L=85%），dark 主题用深饱和度（S=60%, L=35%）。文字色统一用 `fg`。
4. **Quadrant 象限色**：4 个象限用 `accent` 的 4 个色相变体（0°/90°/180°/270°），light 主题浅填充 + `fg` 深字，dark 主题深填充 + `fg` 浅字。
5. **Gantt**：`taskBkgColor` 用 `accent` 派生，`taskTextLightColor`/`taskTextDarkColor` 根据主题深浅选择 `bg`/`fg`。
6. **其他图表**（journey/gitGraph/mindmap/timeline/requirement/c4）：从 `accent` 派生调色板，文字用 `fg`。

**备选方案**：
- A. 直接用 mermaid.js `theme: 'default'`（彩色）+ 不联动 → 简单但 dark 主题割裂，且不符合"主题驱动"目标
- B. 为每个主题写死一套 themeVariables 映射表 → 15 套主题 × 几十变量 = 维护噩梦
- C. HSL 派生算法（本选择）→ 通用、自动适配新主题、代码量小

**选择 C 的理由**：beautiful-mermaid 主题只有 2-5 色，无法为每套主题手写完整映射。HSL 派生是 mermaid.js 自身（`theme-default.js` 用 `adjust(color, {h: 30})`）和 Tailwind 等主流方案的做法，通用且可预测。

### Decision 2: 颜色操作函数的实现

**选择**：内联轻量 HSL 转换函数，不引入 chroma.js / khroma 等库。

**理由**：
- 只需要 `hexToHsl`、`hslToHex`、`relativeLuminance`、`mix` 四个函数
- mermaid.js 内部用 khroma，但我们不能依赖它（它是 mermaid 内部模块）
- 内联约 60 行代码，无依赖风险

### Decision 3: 主题切换时重新初始化 mermaid.js 的时机

**选择**：在所有调用 `themeManager.saveTheme()` 的事件回调中，`saveTheme()` 之后、`schedulePreviewUpdate()` 之前，调用 `mermaid.initialize` 更新 themeVariables。涉及三处事件回调：
- `themePicker.change`（`app.js:960`）— 内置主题切换
- `applyThemeButton.click`（`app.js:1083`）— 自定义主题即时应用
- `saveCustomThemeButton.click`（`app.js:1114`）— 自定义主题保存并应用

**注意**：`mermaid.initialize` 重复调用是 mermaid.js 支持的用法（官方文档示例有动态切换主题，实测 mermaid 11.15.0 重复 initialize 后 pie 颜色确实更新）。需要保留 `startOnLoad: false`、`securityLevel: 'loose'`、`flowchart`、`gantt` 等现有配置，只更新 `themeVariables` 和 `themeCSS`。

### Decision 4: `themeCSS` 的动态生成

**选择**：新增 `generateThemeCSS(bmTheme)` 函数，根据主题深浅生成 `.taskText { fill: ... }` 等 CSS 规则。

**理由**：现有 `themeCSS` 写死了 `.taskText { fill: #ffffff; }`（白字），dark 主题下白字 on 浅条会看不见。需要根据主题动态生成。

### Decision 5: 页面初始加载的派生时机

**选择**：在 `beautiful-mermaid-loaded` 事件回调中（`app.js:699`），用默认主题（zinc-light）派生 themeVariables 并调用 `mermaid.initialize`。

**理由**：ESM 异步加载完成后才能拿到 `beautifulMermaid.THEMES`，此时才能派生。初始 `mermaid.initialize`（`app.js:652`）可以用一个临时空 themeVariables 或直接在 ESM 加载后覆盖。

### Decision 6: DOCX 导出 PNG 背景色从主题派生

**选择**：修改 `renderMermaidToPng`（`app.js:2367`）的 mermaid.js 分支，将 `bgColor = 'white'`（`app.js:2392`）改为 `bgColor = currentTheme.bg || 'white'`，与 beautiful-mermaid 分支（`app.js:2387` `bgColor = currentTheme.bg || 'white'`）保持一致。

**理由**：dark 主题下 mermaid.js 图表的 SVG 内容是深色背景，如果 PNG canvas 填充 white，会导致 SVG 的透明区域显示白底，与深色内容割裂。`currentTheme` 已在 `app.js:2372` 获取，直接复用即可。

## Risks / Trade-offs

- **[HSL 派生颜色可能不"好看"]** → 派生算法参考 mermaid.js 自身和 Tailwind 的做法，颜色虽不如手调精致但可读性有保证。后续可微调饱和度/亮度参数优化美观度。
- **[mermaid.initialize 重复调用可能有副作用]** → mermaid.js 官方支持动态重新初始化，但需验证 `look: 'neo'` 等配置不被重置。Mitigation: 保留完整配置对象，不只传 themeVariables。
- **[15 套主题 × 21 种图表类型 = 315 组合无法全测]** → 实现后用浏览器自动化抽检关键组合（light/dark 各选 3 套主题 × 问题图表 pie/quadrant/gantt + 代表性 beautiful-mermaid 类型），其余靠算法正确性保证。
- **[自定义主题可能产生极端颜色]** → 派生函数对极端输入（如 bg=fg）做兜底，保证至少有对比度。

## Open Questions

- **pie 扇形色用单色系渐变还是彩色色相旋转？** 彩色色相旋转（12 色 × 30°）更易区分扇形，但与 beautiful-mermaid 的单色 zinc 风格不完全统一。倾向彩色（pie 本身是分类数据，彩色更合适），但可在实现时微调饱和度让 light 主题的彩色柔和一些。
- **mindmap/timeline 等图表的节点色如何派生？** 实测确认：mindmap 和 timeline 复用 `git0` + `primaryColor`/`primaryTextColor`/`lineColor`，不消费独立的 `nodeBkg`/`timelineBkg` 变量。因此派生函数只需正确设置 `git0-git7`，mindmap/timeline 会自动消费。gantt 额外消费 `taskTextClickableColor`/`taskTextOutsideColor`（需补充到派生函数），不消费 `taskTextLightColor`。
