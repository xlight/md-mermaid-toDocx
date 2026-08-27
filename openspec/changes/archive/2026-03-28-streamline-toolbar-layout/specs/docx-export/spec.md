## MODIFIED Requirements

### Requirement: Mermaid 图表导出到 DOCX

系统 SHALL 使用混合渲染策略将 Mermaid 图表转换为 PNG 图片并嵌入到 DOCX 文档中。对于 beautiful-mermaid 支持的图表类型（Flowchart, State, Sequence, Class, ER），系统使用 beautiful-mermaid 渲染引擎并应用用户选择的主题；对于其他图表类型（Gantt, Pie, Journey 等），系统使用原 mermaid.js 渲染引擎。导出的图表必须不超出页面的可用宽度范围，并保持高清晰度。导出入口在单层工具栏中 MUST 保持清晰、稳定且高优先级，以支持用户快速完成导出操作。

#### Scenario: 导出 beautiful-mermaid 支持的图表类型（主题化）

- **GIVEN** 用户选择了 beautiful-mermaid 的内置主题（如 "tokyo-night"）
- **AND** 用户输入包含 Mermaid 流程图（`graph TD`）
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统检测图表类型为 "flowchart"
- **AND** 系统使用 `beautifulMermaid.renderMermaid()` 函数生成 SVG
- **AND** 系统将 SVG 通过 Canvas API 转换为 PNG（1.5x 缩放以保持清晰度）
- **AND** 系统使用 docx.js 的 ImageRun 将 PNG 嵌入 DOCX 文档
- **AND** PNG 背景色应用主题的 bg 颜色
- **AND** 导出的 DOCX 文件中图表清晰且符合主题风格

#### Scenario: 导出 mermaid.js 处理的图表类型（保持原样式）

- **GIVEN** 用户输入包含 Gantt 图表
- **AND** 用户选择了 beautiful-mermaid 主题（如 "catppuccin-mocha"）
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统检测图表类型为 "gantt"
- **AND** 系统使用 `mermaid.render()` 函数生成 SVG（不应用 beautiful-mermaid 主题）
- **AND** 系统应用原 `mermaid.initialize()` 配置（gantt, themeVariables）
- **AND** 系统将 SVG 通过 Canvas API 转换为 PNG
- **AND** 导出的 DOCX 中 Gantt 图表保持原 mermaid.js 样式

#### Scenario: 导出混合图表类型的文档

- **GIVEN** 用户输入包含 3 个图表：Flowchart, Sequence Diagram, Gantt Chart
- **AND** 用户选择了 beautiful-mermaid 主题 "nord"
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** Flowchart 使用 beautiful-mermaid 渲染，应用 "nord" 主题
- **AND** Sequence Diagram 使用 beautiful-mermaid 渲染，应用 "nord" 主题
- **AND** Gantt Chart 使用 mermaid.js 渲染，保持原样式
- **AND** 所有 3 个图表都成功嵌入 DOCX，PNG 格式，清晰度一致

#### Scenario: 导出使用自定义主题的 beautiful-mermaid 图表

- **GIVEN** 用户创建了自定义主题，设置了 bg="#1a1b26", fg="#a9b1d6", accent="#7aa2f7"
- **AND** 用户输入包含 Class Diagram（beautiful-mermaid 支持）
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统检测图表类型为 "class"
- **AND** 系统应用自定义主题配置到 beautiful-mermaid 渲染
- **AND** 生成的 SVG 反映用户选择的颜色
- **AND** SVG 转换为 PNG 时背景色为 #1a1b26
- **AND** DOCX 中的图表使用自定义主题颜色

#### Scenario: 导出超宽的 Mermaid 图表并自适应页面

- **GIVEN** 用户输入包含宽度为 1200 像素的 Mermaid 图表
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统使用 beautiful-mermaid 生成 SVG
- **AND** 系统解析 SVG 的 width 和 height 属性
- **AND** 系统通过 Canvas 以 1.5x 缩放渲染 SVG 为 PNG
- **AND** 如果生成的 PNG 宽度超过页面可用宽度（约 602 像素），系统在嵌入 DOCX 时按比例缩小
- **AND** 图表的宽高比保持不变
- **AND** PNG 高分辨率（1.5x）确保缩小后仍清晰

#### Scenario: 处理 beautiful-mermaid 图表渲染失败

- **GIVEN** 用户输入包含语法错误的 Flowchart 代码
- **WHEN** 系统调用 `beautifulMermaid.renderMermaid()` 时抛出异常
- **THEN** 系统捕获错误并在 DOCX 中插入错误提示文本
- **AND** 错误提示包含具体的错误信息（如 "[Mermaid Error: Syntax error in flowchart]"）
- **AND** 不中断整个 DOCX 导出流程，继续处理其他内容

#### Scenario: 处理 mermaid.js 图表渲染失败

- **GIVEN** 用户输入包含语法错误的 Gantt 图表代码
- **WHEN** 系统调用 `mermaid.render()` 时抛出异常
- **THEN** 系统捕获错误并在 DOCX 中插入错误提示文本
- **AND** 错误提示包含具体的错误信息（如 "[Mermaid Error: Invalid gantt syntax]"）
- **AND** 不中断整个 DOCX 导出流程，继续处理其他内容

#### Scenario: 单层工具栏中导出入口优先级明确

- **WHEN** 用户查看顶部单层工具栏
- **THEN** "生成 DOCX" 入口在视觉上保持高优先级，易于快速识别和触发

#### Scenario: 单层工具栏布局调整后导出入口仍稳定可见

- **WHEN** 工具栏经过信息层级整理与空间压缩
- **THEN** 用户仍可在不展开额外设置层的情况下直接访问 DOCX 导出入口
