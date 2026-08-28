# Native Mermaid Theming Specification

## Purpose

统一原生 Mermaid.js 渲染的 18+ 图表类型的颜色和样式，使其与 beautiful-mermaid 主题风格协调。涵盖默认输出模式、原生 mermaid 主题配置、ASCII 模式降级策略等方面。

## Requirements

### Requirement: 默认输出模式为混合模式

系统 SHALL 将输出模式默认值设为 `svg`（混合模式），而非 `classic`。

#### Scenario: 首次加载默认为混合模式
- **WHEN** 用户首次打开应用，未选择过输出模式
- **THEN** `outputMode` 的值为 `svg`
- **AND** 4 种图表（flowchart、sequence、class、er）使用 beautiful-mermaid 渲染
- **AND** 其余图表使用 mermaid.js 渲染

#### Scenario: 混合模式下 beautiful-mermaid 图表使用主题渲染
- **WHEN** 输出模式为 `svg`（混合模式）
- **AND** 图表类型为 flowchart、sequence、class 或 er
- **AND** beautiful-mermaid 已加载
- **THEN** 使用 `beautifulMermaid.renderMermaid()` 渲染
- **AND** 应用当前选中的主题

#### Scenario: 混合模式下其他图表使用 mermaid.js 渲染
- **WHEN** 输出模式为 `svg`（混合模式）
- **AND** 图表类型不为 flowchart、sequence、class、er
- **THEN** 使用 `mermaid.render()` 渲染
- **AND** 应用 `theme: 'base'` + zinc-light themeVariables

### Requirement: 输出模式选项文本更新

系统 SHALL 将 SVG 模式的显示文本从"SVG (主题)"更新为"混合 (推荐)"。

#### Scenario: 中文界面模式文本
- **WHEN** 界面语言为中文
- **THEN** 输出模式选项依次为："混合 (推荐)"、"ASCII (文本)"、"经典 (兼容)"

#### Scenario: 英文界面模式文本
- **WHEN** 界面语言为英文
- **THEN** 输出模式选项依次为："Mixed (Recommended)"、"ASCII (Text)"、"Classic (Compat)"

### Requirement: ASCII 模式降级为 SVG 渲染

系统 SHALL 在 ASCII 模式下，对 beautiful-mermaid 不支持的图表类型降级为 SVG 渲染，而非显示错误提示。

#### Scenario: ASCII 模式下 beautiful-mermaid 支持的图表
- **WHEN** 输出模式为 `ascii`
- **AND** 图表类型为 flowchart、sequence、class 或 er
- **AND** beautiful-mermaid 已加载
- **THEN** 使用 `beautifulMermaid.renderMermaidAscii()` 渲染
- **AND** 输出为纯文本格式

#### Scenario: ASCII 模式下不支持的图表降级为 SVG
- **WHEN** 输出模式为 `ascii`
- **AND** 图表类型不为 flowchart、sequence、class、er
- **THEN** 使用 `mermaid.render()` 渲染 SVG
- **AND** 在图表容器上方显示提示标签，内容为 "SVG (ASCII 不可用)"
- **AND** 不显示硬错误提示

#### Scenario: ASCII 降级提示标签样式
- **WHEN** ASCII 模式下图表降级为 SVG 渲染
- **THEN** 提示标签使用 `ascii-fallback-hint` CSS 类
- **AND** 标签文本为小字体、低对比度，不干扰图表阅读

### Requirement: 原生 mermaid 图表使用统一配色渲染

系统 SHALL 使用 `theme: 'base'` 配合完整的 `themeVariables` 配置初始化 Mermaid.js，使所有非 beautiful-mermaid 渲染的图表类型使用与 zinc-light 色系协调的配色方案。

#### Scenario: 原生 mermaid 使用 base 主题初始化
- **WHEN** 应用加载完成，`mermaid.initialize()` 被调用
- **THEN** `theme` 配置为 `'base'`，而不是 `'default'`
- **AND** `themeVariables` 包含 `background`、`primaryTextColor`、`lineColor`、`primaryColor`、`secondaryColor`、`tertiaryColor`、`primaryBorderColor`、`noteBkgColor`、`noteBorderColor`、`noteTextColor`、`titleColor`

#### Scenario: themeVariables 颜色值与 zinc-light 一致
- **WHEN** 检查 `mermaid.initialize()` 的 `themeVariables` 配置
- **THEN** `background` 等于 `#ffffff`
- **AND** `primaryTextColor` 等于 `#09090b`
- **AND** `lineColor` 等于 `#d4d4d8`
- **AND** `primaryColor` 等于 `#18181b`
- **AND** `tertiaryColor` 等于 `#f4f4f5`
- **AND** `secondaryColor` 等于 `#fafafa`
- **AND** `primaryBorderColor` 等于 `#e4e4e7`

### Requirement: themeCSS 注入统一样式

系统 SHALL 在 `mermaid.initialize()` 中配置 `themeCSS`，向 SVG 注入统一样式规则。

#### Scenario: themeCSS 包含节点和连线样式
- **WHEN** 检查 `mermaid.initialize()` 的 `themeCSS` 配置
- **THEN** `themeCSS` 包含 `.node rect` 的 `rx` 和 `ry` 属性（圆角节点）
- **AND** `themeCSS` 包含 `.edgePath .path` 的 `stroke-width` 属性（连线粗细）
- **AND** `themeCSS` 包含 `.marker` 的 `fill` 属性（箭头颜色）

### Requirement: beautiful-mermaid 不受影响

系统 SHALL 确保变更 `mermaid.initialize()` 不影响 beautiful-mermaid 渲染的 4 种图表类型（flowchart、sequence、class、er）。

#### Scenario: beautiful-mermaid 图表渲染不变
- **WHEN** 渲染 flowchart 图表且 beautiful-mermaid 已加载
- **THEN** 仍然使用 `beautifulMermaid.renderMermaid()` 路径
- **AND** 输出 SVG 不受 `mermaid.initialize()` 配置影响

#### Scenario: DOCX 导出路径不变
- **WHEN** 导出 DOCX 且图表类型为 flowchart
- **THEN** DOCX 导出仍然使用 `beautifulMermaid.renderMermaid()` 路径

### Requirement: 经典模式也受益于新主题

系统 SHALL 确保 Classic 模式（`outputMode === 'classic'`）下，所有图表（包括 beautiful-mermaid 的 4 种类型）使用新的 `themeVariables` 和 `themeCSS` 配置渲染。

#### Scenario: Classic mode 使用新配置
- **WHEN** 输出模式为 Classic
- **THEN** 所有图表使用 `mermaid.render()` 路径
- **AND** 渲染结果应用了新的 `themeVariables` 和 `themeCSS`

### Requirement: Gantt 图表保留独立配置

系统 SHALL 在改用 `theme: 'base'` 后，保留 Gantt 图表的独立配置（字体大小、柱高、间距等）。

#### Scenario: Gantt 配置保留
- **WHEN** 检查 `mermaid.initialize()` 配置
- **THEN** `gantt` 配置对象中 `fontSize` 等于 `20`
- **AND** `sectionFontSize` 等于 `20`
- **AND** `titleFontSize` 等于 `28`
- **AND** `barHeight` 等于 `50`
- **AND** `barGap` 等于 `10`
