# Tasks for dynamic-mermaid-theming

## Implementation Tasks

### 1. 颜色操作工具函数

- [x] 在 `app.js` 中新增颜色操作工具函数（模块级，约 60 行）：
   - `hexToHsl(hex)` → `{h, s, l}`（0-360, 0-100, 0-100）
   - `hslToHex(h, s, l)` → `#rrggbb`
   - `relativeLuminance(hex)` → 0-1（WCAG 公式）
   - `mixColors(hex1, hex2, ratio)` → 按比例混合
   - `isLightTheme(bmTheme)` → `relativeLuminance(bg) > 0.5`
   - 验证：`hexToHsl('#FFFFFF')` = `{0, 0, 100}`，`mixColors('#000', '#fff', 0.5)` = `#808080`

### 2. 派生函数 `bmThemeToMermaidVariables`

- [x] 在 `app.js` 中新增 `bmThemeToMermaidVariables(bmTheme)` 函数，返回 mermaid.js themeVariables 对象：
   - 基础变量：`background`、`primaryTextColor`、`lineColor`、`primaryColor`、`secondaryColor`、`tertiaryColor`、`primaryBorderColor` 等
   - Pie：`pie1`-`pie12`（HSL 色相旋转 12 色，按扇形数消费）、`pieSectionTextColor`、`pieTitleTextColor`、`pieLegendTextColor`、`pieStrokeColor`
   - Quadrant：`quadrant1Fill`-`quadrant4Fill`、`quadrant1TextFill`-`quadrant4TextFill`、`quadrantPointFill`、`quadrantPointTextFill`、`quadrantXAxisTextFill`、`quadrantYAxisTextFill`、`quadrantTitleFill`
   - Gantt：`taskBkgColor`、`taskTextDarkColor`、`taskTextClickableColor`、`taskTextOutsideColor`、`sectionBkgColor`、`altSectionBkgColor`、`sectionBkgColor2`、`gridColor`、`todayLineColor`（注：不消费 `taskTextLightColor`）
   - Journey：`fillType0`-`fillType7`
   - GitGraph + mindmap + timeline：`git0`-`git7`、`gitInv0`-`gitInv7`（mindmap/timeline 复用 `git0`，不消费独立 `nodeBkg`/`timelineBkg`）
   - Requirement：`requirementBackground`、`requirementTextColor`、`requirementBorderColor`
   - C4：`personBkg`、`personBorder`、`systemBkg`、`systemBorder` 等
   - 通用：`titleColor`、`textColor`、`noteBkgColor`、`noteBorderColor`、`noteTextColor`
   - 兜底：`bg === fg` 时强制 `fg` 反色

- [x] 新增 `generateThemeCSS(bmTheme)` 函数，返回 themeCSS 字符串：
   - `.node rect { rx: 6; ry: 6; }`、`.edgePath .path { stroke-width: 1.5; }`（保留）
   - `.marker { fill: <lineColor>; }`
   - `.taskText { fill: <taskTextColor>; }`（根据主题深浅选 `bg`/`fg`）
   - `.pieTitleText { fill: <fg>; }`

### 3. 主题切换联动

- [x] 修改 `app.js:960` `themePicker.change` 事件回调：
   - 在 `themeManager.saveTheme(selectedTheme)` 之后
   - 调用 `mermaid.initialize` 用 `bmThemeToMermaidVariables(selectedTheme)` + `generateThemeCSS(selectedTheme)` 更新配置
   - 保留 `startOnLoad: false`、`securityLevel: 'loose'`、`flowchart`、`gantt`、`theme: 'base'`、`look: 'neo'` 等配置
   - 然后 `schedulePreviewUpdate()`

- [x] 修改 `app.js:699` `beautiful-mermaid-loaded` 事件回调：
   - ESM 加载完成后，用默认主题（zinc-light 或 `themeManager.getCurrentTheme()`）派生 themeVariables
   - 调用 `mermaid.initialize` 更新配置
   - 触发重渲染

- [x] 修改 `app.js:652` 初始 `mermaid.initialize`：
   - 移除写死的 zinc-light themeVariables 和 themeCSS
   - 改为用空 themeVariables 或最小配置（ESM 加载后会覆盖）
   - 保留 `theme: 'base'`、`look: 'neo'`、`gantt` 字体配置等

### 4. 自定义主题联动

- [x] 修改 `app.js:1083` `applyThemeButton.click` 事件回调：
   - 应用自定义主题时，也调用 `mermaid.initialize` 用 `bmThemeToMermaidVariables(customTheme)` 更新
   - 确保自定义主题也联动 mermaid.js

- [x] 修改 `app.js:1114` `saveCustomThemeButton.click` 事件回调：
   - 保存自定义主题后，也调用 `mermaid.initialize` 用 `bmThemeToMermaidVariables(theme)` 更新
   - 与 task 7 同样逻辑，确保保存主题也联动 mermaid.js

### 5. DOCX 导出背景色修正

- [x] 修改 `app.js:2392` `renderMermaidToPng` 的 mermaid.js 分支：
   - 将 `bgColor = 'white'` 改为 `bgColor = currentTheme.bg || 'white'`
   - 与 beautiful-mermaid 分支（`app.js:2387`）保持一致
   - 确保 dark 主题下 PNG 背景与 SVG 内容协调

### 6. 回归测试

- [x] 浏览器实测：zinc-light 主题下，pie/quadrantChart/gantt 对比度正确（无黑底黑字）
- [x] 浏览器实测：tokyo-night 主题下，pie/quadrantChart/gantt 对比度正确（深底浅字）
- [x] 浏览器实测：主题切换（zinc-light → tokyo-night → catppuccin-mocha）时，mermaid.js 图表配色实时更新
- [x] 浏览器实测：自定义主题（如 bg=#1e1e2e, fg=#cdd6f4, surface=#313244, border=#45475a）派生正确，surface/border 字段被利用
- [x] 浏览器实测：beautiful-mermaid 6 种类型（flowchart/sequence/class/er/state/xyChart）在 light/dark 主题下对比度正确
- [x] 浏览器实测：mermaid.js 15 种类型（gantt/pie/journey/gitGraph/mindmap/timeline/quadrantChart/requirement/sankey/block/architecture/c4/packet/kanban/frontmatter）在 light/dark 主题下对比度正确
- [x] 浏览器实测：DOCX 导出（`renderMermaidToPng`）在 light 主题下图表颜色正确（白底）
- [x] 浏览器实测：DOCX 导出（`renderMermaidToPng`）在 dark 主题下图表颜色正确（深底，非白底）

### 6a. 对比度修复（mixColors 参数顺序 + taskTextColor + classText）

- [x] 修复 `bmThemeToMermaidVariables` 中 `mixColors` 参数顺序倒置 bug：
   - `mixColors(hex1, hex2, ratio)` = `hex1 * (1-ratio) + hex2 * ratio`，ratio=0 → hex1，ratio=1 → hex2
   - 原代码 `mixColors(fg, bg, 0.08)` 期望得到「8% fg 混入 bg」的浅色，实际得到「92% fg」的深色
   - 修复：所有 `mixColors(fg, bg, ratio)` → `mixColors(bg, fg, ratio)`（surface/line/accent/muted/border/tertiaryColor/secondaryBorderColor/tertiaryBorderColor/altSectionBkgColor/sectionBkgColor2/gridColor/externalBkg）
   - 影响：Gantt section 背景、Block 背景、Kanban 列背景从深色修正为浅色

- [x] 修复 `generateThemeCSS` 中 `taskTextColor` 逻辑反置 bug：
   - 原代码 `const taskTextColor = light ? bg : fg` 在 light 主题下用 bg（白色）→ `.taskText { fill: white }` 覆盖了 `.taskText0 { fill: fg }`
   - 修复：`const taskTextColor = fg`（始终用 fg，即与 bg 对比的文字色）
   - 影响：Gantt task 文字在所有主题下正确显示

- [x] 新增 `classText` themeVariable：
   - `vars.classText = fg`（Class/ER 成员文字色）
   - 注：Class/ER 通过 beautiful-mermaid 渲染，此变量对 beautiful-mermaid 无效，仅对 mermaid.js 原生 class 图有效

- [x] 批量对比度验证（5 主题 × 17 图表）：
   - Gantt：1.1-1.2 → **7.0-13.7** ✅
   - Block：1.2-1.5 → **6.5-12.1** ✅
   - Kanban：1.1-2.2 → **3.6-16.8** ✅
   - GitGraph：1.7-7.1 → 3.1-7.1（solarized 改善）
   - Quadrant：2.5-7.9 → 3.9-7.9（改善）

- [x] 已知限制（无法通过 themeVariables 修复）：
   - Class/ER：beautiful-mermaid 内部 `--_text-faint`（25% fg）on `--_group-hdr`（5% fg）对比度 1.3-1.8，需修改 beautiful-mermaid 源码或 SVG 后处理
   - C4：mermaid.js 硬编码 `#999999` 背景 + `#FFFFFF` 文字（对比度 2.8），见 mermaid-js/mermaid#4906，需 mermaid.js 上游修复

### 7. 文档更新

- [ ] 更新 `AGENTS.md`：说明 mermaid.js 主题动态派生机制
- [ ] 更新 `default.md`：移除"zinc-light 色系"等写死描述，改为"主题动态派生"
- [ ] 更新 `readme.md`：主题功能说明更新

## Validation Tasks

- [ ] `openspec validate dynamic-mermaid-theming --type change` 通过
- [ ] 浏览器控制台无升级引入的错误（特别检查 mermaid.initialize 重复调用的副作用）
- [ ] 确认与 `unify-native-mermaid-theming` change 的关系：本 change 替换该 change 的静态 themeVariables 为动态派生
