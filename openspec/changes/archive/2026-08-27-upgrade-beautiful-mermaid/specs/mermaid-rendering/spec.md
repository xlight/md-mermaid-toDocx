## MODIFIED Requirements

### Requirement: beautiful-mermaid 支持的图表类型

系统 SHALL 使用 beautiful-mermaid 引擎渲染以下 6 种图表类型：flowchart、sequence、class、er、state、xyChart。其余图表类型（gantt、pie、journey、gitgraph、mindmap、timeline 等）SHALL 回退到原生 mermaid.js 渲染。

**实现约束**：`supportedTypes` 数组在代码中有三处定义（`ThemeManager.constructor` `app.js:668`、`updateFullPreview` `app.js:1938`、`renderMermaidToPng` `app.js:2158`），SHALL 统一修改为同一数组。建议提取为模块级常量消除重复。类型标识 `'xyChart'` 的大小写 SHALL 与 `detectDiagramType()` `app.js:649` 的返回值一致。

#### Scenario: state 图恢复支持
- **WHEN** 用户输入 `stateDiagram-v2` 或 `stateDiagram` 语法的代码
- **THEN** 系统使用 beautiful-mermaid 渲染为带主题的 SVG（0.1.3 因 bug 移除，1.1.3 已修复）

#### Scenario: state 图 CJK 字符支持
- **WHEN** state 图中包含中文、日文、韩文等 Unicode 字符（状态名、转换、描述）
- **THEN** 系统正确解析并渲染，不出现乱码或解析错误

#### Scenario: 支持类型扩展到 6 种
- **WHEN** 系统初始化时构建 supportedTypes 列表
- **THEN** 列表包含 `['flowchart', 'sequence', 'class', 'er', 'state', 'xyChart']` 共 6 种类型（注意 `xyChart` 大写 C，与 `detectDiagramType()` 返回值一致）

#### Scenario: 不支持类型仍回退原生
- **WHEN** 用户输入 gantt、pie、journey 等非 beautiful-mermaid 支持的图表类型
- **THEN** 系统使用原生 mermaid.js 渲染，保持现有降级行为

### Requirement: beautiful-mermaid 版本与布局引擎

系统 SHALL 使用 beautiful-mermaid@1.1.3 或更高版本。布局引擎 SHALL 使用 ELK.js（1.0.0 起替换 dagre）。

#### Scenario: 布局引擎使用 ELK.js
- **WHEN** 渲染 flowchart 等图表
- **THEN** 布局由 ELK.js 计算，边路由终止于实际形状边界（shape-aware edge clipping），非包围盒

#### Scenario: 断开子图布局
- **WHEN** 图表包含多个不连通的子图
- **THEN** 各子图独立布局并合理排列，不重叠

#### Scenario: 子图方向覆盖
- **WHEN** 嵌套子图指定独立方向（LR/TD/BT/RL）
- **THEN** 各子图使用各自的方向设置，不继承父图方向

### Requirement: 主题系统

系统 SHALL 支持 beautiful-mermaid 内置的 15 套主题。主题切换 SHALL 通过 CSS 自定义属性实时生效，无需重新渲染。

#### Scenario: 15 套内置主题可选
- **WHEN** 用户打开主题选择器
- **THEN** 可选主题包含 zinc-light、zinc-dark、tokyo-night、tokyo-night-storm、tokyo-night-light、catppuccin-mocha、catppuccin-latte、nord、nord-light、dracula、github-light、github-dark、solarized-light、solarized-dark、one-dark 共 15 套

#### Scenario: 主题实时切换
- **WHEN** 用户在已渲染的图表上切换主题
- **THEN** 图表配色通过 CSS 变量级联立即更新，不触发重新渲染

### Requirement: 渲染细节改进

系统 SHALL 支持 beautiful-mermaid 1.0.0+ 引入的渲染细节特性。

#### Scenario: 多行标签
- **WHEN** 节点标签、边标签、子图标题中包含 `<br>` 标签
- **THEN** 标签正确换行显示

#### Scenario: 内联格式化
- **WHEN** 标签中包含 `<b>`、`<i>`、`<u>`、`<s>` 标签
- **THEN** 标签分别渲染为粗体、斜体、下划线、删除线

#### Scenario: 语义 data 属性
- **WHEN** beautiful-mermaid 生成 SVG
- **THEN** SVG 元素包含 `data-id`、`data-from`、`data-to`、`data-style`、`data-label` 等语义属性

#### Scenario: 边内联样式
- **WHEN** flowchart 或 state 图中使用 `linkStyle` 指定边样式
- **THEN** 指定边应用自定义 stroke、stroke-width 样式

#### Scenario: 文本嵌入边标签
- **WHEN** flowchart 中使用 `-- Yes -->`、`-. Maybe .->`、`== Sure ==>` 语法
- **THEN** 边标签正确显示，与管道语法 `-->|Yes|` 等价
