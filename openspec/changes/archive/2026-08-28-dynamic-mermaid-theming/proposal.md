## Why

`unify-native-mermaid-theming` change 把 mermaid.js 的 `theme` 从 `'default'`（彩色）改成 `'base'` + 写死的 zinc-light `themeVariables`，导致两个问题：

1. **对比度灾难**：`primaryColor: '#18181b'`（深黑）被 pie/quadrantChart 用作填充色派生源，生成黑底扇形/象限，而 `primaryTextColor: '#09090b'`（近黑）的文字落在黑底上**完全看不见**。实测 quadrantChart 4 个象限全黑底 + 黑字，pie 5%/10% 标签看不见。
2. **主题切换不联动**：`mermaid.initialize` 只在页面加载时调用一次，themeVariables 写死 zinc-light。用户切到 dark 主题（如 tokyo-night）时，beautiful-mermaid 图表变深色，但 mermaid.js 图表（gantt/pie/journey 等）仍是白底深字，**两套图表视觉割裂**。

## What Changes

- **新增 `bmThemeToMermaidVariables(bmTheme)` 派生函数**：从 beautiful-mermaid 主题对象 `{bg, fg, line?, accent?, muted?, surface?, border?}` 动态生成 mermaid.js 完整的 `themeVariables`，覆盖所有图表类型（pie/quadrant/gantt/journey/gitGraph/mindmap/timeline/requirement/sankey/block/architecture/c4/packet/kanban/frontmatter 等）的对比度正确变量。
- **主题切换时重新初始化 mermaid.js**：在 `themePicker.change`、`applyThemeButton.click`、`saveCustomThemeButton.click` 三处事件回调中调用 `mermaid.initialize` 更新 themeVariables，让 mermaid.js 图表跟着 beautiful-mermaid 主题动态变化。
- **修正 pie/quadrantChart 对比度**：pie 的 `pie1-12` 扇形色和 `pieSectionTextColor` 文字色、quadrant 的 `quadrant1-4Fill` 象限背景和 `quadrant1-4TextFill` 文字色，根据主题深浅自适应生成浅底深字或深底浅字。
- **修正 DOCX 导出 PNG 背景色**：`renderMermaidToPng` 的 mermaid.js 分支 `bgColor` 从主题 `bg` 派生，不再硬编码 white。
- **复核所有图表类型**：逐一验证 flowchart/sequence/class/er/state/xyChart（beautiful-mermaid）+ gantt/pie/journey/gitGraph/mindmap/timeline/quadrantChart/requirement/sankey/block/architecture/c4/packet/kanban/frontmatter（mermaid.js）在 15 套主题下的对比度。

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `mermaid-rendering`：新增"主题动态派生"requirement——mermaid.js 图表的 themeVariables 应从当前 beautiful-mermaid 主题动态派生，主题切换时自动更新。

## Impact

- 影响的代码：`app.js` 的 `mermaid.initialize` 配置、`themePicker.change`/`applyThemeButton.click`/`saveCustomThemeButton.click` 事件处理、`renderMermaidToPng` 的 bgColor、新增 `bmThemeToMermaidVariables()`/`generateThemeCSS()` 模块级函数
- 影响的规范：`specs/mermaid-rendering`
- 向后兼容：**完全兼容** — 主题切换行为增强，不破坏现有 API
- 依赖：无新依赖，复用 beautiful-mermaid 主题对象 + mermaid.js themeVariables 机制
- 与 `unify-native-mermaid-theming` change 的关系：本 change 修正该 change 引入的 themeVariables 配置错误，将其静态配置改为动态派生
