## ADDED Requirements

### Requirement: mermaid.js 主题动态派生

系统 SHALL 从当前 beautiful-mermaid 主题对象动态派生 mermaid.js 的 `themeVariables`，使原生 mermaid.js 渲染的图表（gantt、pie、journey、gitGraph、mindmap、timeline、quadrantChart、requirement、sankey、block、architecture、c4 等）与 beautiful-mermaid 渲染的图表在配色上协调一致。主题切换时 SHALL 重新调用 `mermaid.initialize` 更新 themeVariables，并触发重渲染。DOCX 导出（PNG）的背景色 SHALL 从主题 `bg` 派生，不再硬编码为 white。

**派生函数约束**：`bmThemeToMermaidVariables(bmTheme)` 接收 `{bg, fg, line?, accent?, muted?, surface?, border?}`，返回 mermaid.js 完整的 themeVariables 对象。派生逻辑 SHALL 根据主题深浅（由 `bg`/`fg` 亮度判断）自适应生成浅底深字或深底浅字的配色。当主题提供 `surface` 和 `border` 字段时，SHALL 优先用于 `secondaryColor`/`primaryBorderColor` 等变量。

#### Scenario: 主题切换联动 mermaid.js

- **WHEN** 用户在主题选择器切换主题（如从 zinc-light 切到 tokyo-night）
- **THEN** beautiful-mermaid 图表通过 CSS 变量实时更新配色
- **AND** mermaid.js 图表通过重新 `mermaid.initialize` + 重渲染更新配色
- **AND** 两套图表的背景色、文字色、强调色协调一致，不出现"白底深字 + 深底浅字"割裂

#### Scenario: pie 图对比度正确

- **WHEN** 用户渲染 pie 图，当前主题为任意 15 套主题之一
- **THEN** 扇形填充色（`pie1`-`pie12`）与扇形标签文字色（`pieSectionTextColor`）对比度足够（WCAG AA 标准，对比度 ≥ 4.5:1）
- **AND** 不出现"深色扇形 + 深色文字"导致标签看不见的情况
- **AND** 图例文字色（`pieLegendTextColor`）与图表背景色对比度足够

#### Scenario: quadrantChart 对比度正确

- **WHEN** 用户渲染 quadrantChart，当前主题为任意 15 套主题之一
- **THEN** 4 个象限背景色（`quadrant1Fill`-`quadrant4Fill`）与象限标题文字色（`quadrant1TextFill`-`quadrant4TextFill`）对比度足够
- **AND** 数据点标签文字色（`quadrantPointTextFill`）与象限背景色对比度足够
- **AND** 不出现"黑底黑字"导致象限标题或数据点标签看不见的情况

#### Scenario: light 主题派生浅底深字

- **WHEN** 当前主题为 light 系（zinc-light、tokyo-night-light、catppuccin-latte、nord-light、github-light、solarized-light）
- **THEN** mermaid.js themeVariables 的 `background` 为浅色（接近主题 `bg`）
- **AND** `primaryTextColor`、`pieSectionTextColor`、`quadrant1TextFill`-`quadrant4TextFill` 等文字色为深色（接近主题 `fg`）
- **AND** `pie1`-`pie12`、`quadrant1Fill`-`quadrant4Fill` 等填充色为浅色或彩色，确保深色文字可读

#### Scenario: dark 主题派生深底浅字

- **WHEN** 当前主题为 dark 系（zinc-dark、tokyo-night、catppuccin-mocha、nord、dracula、github-dark、solarized-dark、one-dark）
- **THEN** mermaid.js themeVariables 的 `background` 为深色（接近主题 `bg`）
- **AND** `primaryTextColor`、`pieSectionTextColor`、`quadrant1TextFill`-`quadrant4TextFill` 等文字色为浅色（接近主题 `fg`）
- **AND** `pie1`-`pie12`、`quadrant1Fill`-`quadrant4Fill` 等填充色为深色或彩色，确保浅色文字可读

#### Scenario: gantt 图主题协调

- **WHEN** 用户渲染 gantt 图，当前主题为任意 15 套主题之一
- **THEN** 任务条背景色（`taskBkgColor`）与任务文字色（`taskTextLightColor`/`taskTextDarkColor`）对比度足够
- **AND** 时间轴标签、section 标题文字色与图表背景色对比度足够

#### Scenario: 自定义主题也派生

- **WHEN** 用户通过自定义主题功能创建主题（`{bg, fg, line?, accent?, muted?, surface?, border?}`）
- **THEN** mermaid.js themeVariables 从自定义主题派生，行为与内置主题一致
- **AND** 当自定义主题包含 `surface`/`border` 字段时，派生函数 SHALL 利用这些字段生成 `secondaryColor`/`primaryBorderColor` 等

#### Scenario: 自定义主题保存也联动 mermaid.js

- **WHEN** 用户通过"保存自定义主题"按钮创建并应用主题
- **THEN** `saveCustomThemeButton.click` 事件回调 SHALL 调用 `mermaid.initialize` 更新 themeVariables
- **AND** mermaid.js 图表配色与 beautiful-mermaid 图表配色协调一致

#### Scenario: DOCX 导出 PNG 背景色从主题派生

- **WHEN** 用户导出 DOCX，当前主题为 dark 系（如 tokyo-night，bg=#1a1b26）
- **THEN** `renderMermaidToPng` 的 mermaid.js 分支 SHALL 使用 `currentTheme.bg` 作为 PNG canvas 背景色
- **AND** 不再硬编码 `bgColor = 'white'`，避免 dark 主题下白底与深色 SVG 内容割裂
- **AND** light 主题下 PNG 背景仍为浅色（接近 white）

#### Scenario: 页面初始加载用默认主题派生

- **WHEN** 页面初始加载，beautiful-mermaid ESM 异步加载完成
- **THEN** `mermaid.initialize` 使用默认主题（zinc-light）派生的 themeVariables
- **AND** 不再使用写死的静态 zinc-light themeVariables 配置

### Requirement: 所有图表类型对比度复核

系统 SHALL 保证所有支持的图表类型在所有 15 套主题下都满足对比度要求。图表类型包括：flowchart、sequence、class、er、state、xyChart（beautiful-mermaid 渲染）+ gantt、pie、journey、gitGraph、mindmap、timeline、quadrantChart、requirement、sankey、block、architecture、c4、packet、kanban、frontmatter（mermaid.js 渲染）。

#### Scenario: beautiful-mermaid 6 种类型对比度

- **WHEN** 用户渲染 flowchart/sequence/class/er/state/xyChart，当前主题为任意 15 套主题之一
- **THEN** 节点填充色与节点文字色对比度足够
- **AND** 边标签文字色与背景色对比度足够
- **AND** 子图标题文字色与子图背景色对比度足够

#### Scenario: mermaid.js 15 种类型对比度

- **WHEN** 用户渲染 gantt/pie/journey/gitGraph/mindmap/timeline/quadrantChart/requirement/sankey/block/architecture/c4/packet/kanban/frontmatter，当前主题为任意 15 套主题之一
- **THEN** 所有文字标签与其所在背景对比度足够（WCAG AA 标准）
- **AND** 不出现"字和底色一致导致看不见"的情况
