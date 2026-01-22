# Change: 增加甘特图时间轴刻度标签字体大小

## Why

当前甘特图的时间轴刻度标签(tick labels,即横轴上的日期/时间标记)字体过小,在导出的 DOCX 文档中或打印时难以清晰阅读。用户需要将这些刻度标签的文字大小加大一倍,以提高可读性和用户体验。

## What Changes

**双重方案确保预览和导出都生效**:

1. **Mermaid 配置层** (确保 DOCX 导出时生效):
   - 在 `mermaid.initialize()` 中添加 `themeVariables.gridTextSize: '20px'`
   - 这会在 SVG 渲染层面设置字体大小,影响所有使用场景

2. **CSS 样式层** (增强网页预览效果):
   - 添加 CSS 规则 `.tick text { font-size: 20px !important; }`
   - 确保网页预览中字体大小正确显示

刻度标签字号从默认大小(约 10px)提升到 20px (2 倍)

## Impact

- 影响的规范: `specs/docx-export` (甘特图导出功能)
- 影响的代码: 
  - `index.html` 第 264-267 行: CSS 样式规则
  - `index.html` 第 509-512 行: Mermaid themeVariables 配置
- 向后兼容: ✅ 完全兼容,仅影响甘特图的视觉呈现,不影响功能
- 用户体验: 提升甘特图在**预览和导出 DOCX** 中的可读性
- 其他图表: 不受影响,配置仅针对甘特图的 grid/tick 元素
