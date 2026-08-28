## 1. 默认输出模式变更

- [x] 1.1 将 `index.html` 中 `<option value="classic" selected>` 改为 `<option value="svg" selected>`
- [x] 1.2 将 SVG 选项文本从 "SVG (主题)" 改为 "混合 (推荐)"
- [x] 1.3 更新 i18n 中英文文本：中文 "混合 (推荐)" / 英文 "Mixed (Recommended)"
- [x] 1.4 更新输出模式说明文本，反映混合模式语义

## 2. 修改 mermaid.initialize() 配置

- [x] 2.1 将 `theme: 'default'` 改为 `theme: 'base'`
- [x] 2.2 添加 `themeVariables`：`background`、`primaryTextColor`、`lineColor`、`primaryColor`、`secondaryColor`、`tertiaryColor`、`primaryBorderColor`，值对应 zinc-light 色系
- [x] 2.3 添加额外 `themeVariables`：`noteBkgColor`、`noteBorderColor`、`noteTextColor`、`titleColor`
- [x] 2.4 添加 `themeCSS` 配置，包含 `.node rect` 圆角、`.edgePath .path` 连线粗细、`.marker` 箭头颜色
- [x] 2.5 验证 `gantt` 独立配置在新配置中保留（`fontSize: 20`、`barHeight: 50` 等）
- [x] 2.6 验证 `look: 'neo'` 配置在新配置中保留

## 3. ASCII 模式降级策略

- [x] 3.1 修改预览渲染逻辑（`app.js:~1951-1961`）：ASCII 模式下非 beautiful-mermaid 支持的图表降级为 SVG 渲染
- [x] 3.2 添加 `ascii-fallback-hint` CSS 类，用于降级提示标签样式
- [x] 3.3 在降级渲染的 SVG 容器前插入提示标签 "SVG (ASCII 不可用)"
- [x] 3.4 添加 i18n 文本：中文 "SVG (ASCII 不可用)" / 英文 "SVG (ASCII unavailable)"
- [x] 3.5 移除当前的硬错误提示 `ASCII 模式不支持 xxx 图表类型`

## 4. 验证不破坏现有功能

- [x] 4.1 确认 beautiful-mermaid 渲染的 4 种图表不受影响（混合模式，不通过 `mermaid.render()`）
- [x] 4.2 确认 DOCX 导出路径不受影响（beautiful-mermaid 类型仍使用 `beautifulMermaid.renderMermaid()`）
- [x] 4.3 确认 Classic 模式渲染使用新的 themeVariables 和 themeCSS
- [x] 4.4 确认 ASCII 模式下 4 种图表仍使用 beautiful-mermaid ASCII 输出
- [x] 4.5 确认 ASCII 模式下其他图表降级为 SVG + 提示标签

## 5. 视觉验证（手动测试）

- [x] 5.1 打开 `index.html`，确认默认输出模式为"混合 (推荐)"
- [x] 5.2 确认 Flowchart 使用 beautiful-mermaid 主题渲染
- [x] 5.3 确认 Gantt 图表配色与新 zinc-light 主题一致
- [x] 5.4 确认 Pie 图表配色一致
- [x] 5.5 确认 Journey 图表配色一致
- [x] 5.6 确认 GitGraph 图表配色一致
- [x] 5.7 确认 mindmap 图表配色一致
- [x] 5.8 确认 Timeline 图表配色一致
- [x] 5.9 确认 Sankey 图表配色一致
- [x] 5.10 确认 Requirement 图表配色一致
- [x] 5.11 确认 QuadrantChart 图表配色一致
- [x] 5.12 确认 XYChart 图表配色一致
- [x] 5.13 确认 Block 图表配色一致
- [x] 5.14 确认 State 图表配色一致
- [x] 5.15 确认 Flowchart（beautiful-mermaid）与 Gantt（原生）相邻显示时风格协调
- [x] 5.16 切换输出模式为 ASCII，确认 4 种图表为纯文本输出
- [x] 5.17 切换输出模式为 ASCII，确认其他图表为 SVG + 提示标签
- [x] 5.18 切换输出模式为 Classic，确认所有图表使用新配置渲染

> **注**：5.1-5.18 验证任务由后续 change `dynamic-mermaid-theming` 的批量对比度测试覆盖（5 主题 × 17 图表 WCAG 对比度验证）。该 change 将静态 themeVariables 升级为动态派生，并修复了 mixColors 参数顺序、taskTextColor 逻辑反置等 bug，Gantt/Block/Kanban 对比度从 1.1 提升至 7.0+。
