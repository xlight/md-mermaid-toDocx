## Why

当前应用存在两个问题：

1. **默认模式不合理**：输出模式默认为"经典 (兼容)"，即所有图表都用原生 Mermaid.js 渲染，beautiful-mermaid 的主题能力完全闲置。用户需要手动切换到"SVG (主题)"才能享受精美主题，但大多数用户不会发现这个选项。

2. **原生图表主题粗糙**：beautiful-mermaid 为 4 种图表类型（流程图、时序图、类图、ER 图）提供精美主题渲染，但其余 18+ 图表类型（Gantt、Pie、Journey、GitGraph、Mindmap、Timeline 等）使用原生 Mermaid.js 的 `theme: 'default'`，视觉效果差距明显。用户在同一页面切换图表类型时，风格不统一。

3. **ASCII 模式体验差**：ASCII 模式下，非 beautiful-mermaid 支持的图表类型直接显示错误提示，而不是降级渲染。

## What Changes

### 默认模式变更
- 将输出模式默认值从 `classic` 改为 `svg`（混合模式）
- 调整模式选项文本，使"混合"语义更清晰
- 保留"经典 (兼容)"作为降级选项，但不再是默认

### 原生 Mermaid.js 主题优化
- 将 `mermaid.initialize()` 的 `theme: 'default'` 改为 `theme: 'base'`，使用可自定义的基底主题
- 添加完整的 `themeVariables` 配置（背景色、文字色、线条色、边框色、标签色等），统一 18+ 图表类型的配色方案
- 添加 `themeCSS` 注入 SVG `<style>`，统一节点圆角、连线样式、文字样式等视觉效果
- 保持 `look: 'neo'` 配置，叠加 neo 风格的自定义样式
- 不改变 beautiful-mermaid 渲染路径（4 种支持类型仍然使用 beautiful-mermaid 独立渲染）

### ASCII 模式降级策略
- ASCII 模式下，beautiful-mermaid 支持的 4 种图表继续使用 `beautifulMermaid.renderMermaidAscii()`
- ASCII 模式下，不支持的图表类型降级为 SVG 渲染（mermaid.js），并显示提示标签"SVG (ASCII 不可用)"
- 移除当前的硬错误提示

## Capabilities

### New Capabilities
- `native-mermaid-theming`: 统一原生 Mermaid.js 渲染的 18+ 图表类型的颜色和样式，使其与 beautiful-mermaid 主题风格协调
- `default-mixed-mode`: 默认使用混合渲染模式，最大化 beautiful-mermaid 主题利用率
- `ascii-fallback`: ASCII 模式下不支持的图表类型降级为 SVG 渲染而非显示错误

### Modified Capabilities
- `output-mode-default`: 输出模式默认值从 `classic` 变为 `svg`

## Impact

- 修改 `app.js` 中 `mermaid.initialize()` 的配置对象（约 30 行 config 变更）
- 修改 `index.html` 中 `outputMode` 默认选项和文本（约 5 行）
- 修改 `app.js` 中预览渲染逻辑的 ASCII 降级分支（约 15 行）
- 修改 `app.js` 中 DOCX 导出渲染逻辑的 ASCII 降级分支（约 10 行）
- 不影响 beautiful-mermaid 渲染路径（beautiful-mermaid 不走 `mermaid.render()`）
- 不影响 DOCX 导出的 SVG/PNG 生成逻辑
- 无新增依赖，无 CDN 变更
