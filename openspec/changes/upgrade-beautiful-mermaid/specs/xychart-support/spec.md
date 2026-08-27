## Purpose

支持 Mermaid `xychart-beta` 语法的渲染，包括柱状图（bar）、折线图（line）以及两者组合图，使用 beautiful-mermaid 引擎生成带主题的 SVG。

## ADDED Requirements

### Requirement: xychart 渲染支持

系统 SHALL 识别 `xychart-beta` 开头的 mermaid 代码块，并使用 beautiful-mermaid 引擎渲染为 SVG。支持 bar、line、combined 三种图表类型。`detectDiagramType()` 返回的类型标识为 `'xyChart'`（大写 C，与现有代码 `app.js:649` 一致）。

#### Scenario: 柱状图渲染
- **WHEN** 用户输入 `xychart-beta` 语法的柱状图代码
- **THEN** 系统使用 beautiful-mermaid 渲染为带主题的 SVG，柱子使用主题 accent 色系，圆角柱子样式

#### Scenario: 折线图渲染
- **WHEN** 用户输入 `xychart-beta` 语法的折线图代码
- **THEN** 系统使用 beautiful-mermaid 渲染为带主题的 SVG，使用三次样条插值平滑曲线

#### Scenario: 组合图渲染
- **WHEN** 用户输入同时包含 bar 和 line 的 `xychart-beta` 代码
- **THEN** 系统渲染为组合图，柱状和折线在同一图表中显示

#### Scenario: xychart 主题响应
- **WHEN** 用户切换主题
- **THEN** xychart 的配色随主题变化，多系列使用从主题 accent 派生的单色系调色板

#### Scenario: xychart 降级到原生 mermaid.js
- **WHEN** beautiful-mermaid 加载失败或用户选择 Classic 输出模式
- **THEN** xychart 使用原生 mermaid.js 渲染（如 mermaid.js 支持），否则显示错误提示

#### Scenario: xychart 在 DOCX 导出中
- **WHEN** 用户导出 DOCX 且文档包含 xychart 代码块
- **THEN** xychart 渲染为 SVG 后转 PNG 嵌入 DOCX，与其他图表类型导出流程一致
