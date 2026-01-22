# docx-export Specification Delta

## ADDED Requirements

### Requirement: 甘特图时间轴刻度标签字体大小控制

系统 SHALL 通过 Mermaid themeVariables 配置和 CSS 样式双重方案控制甘特图时间轴刻度标签(tick labels)的字体大小,确保在网页预览和导出的 DOCX 文档中都具有良好的可读性。时间轴刻度标签的字体大小 MUST 设置为 20px (相当于默认大小的 2 倍)。

#### Scenario: Mermaid 配置层控制字体大小

- **GIVEN** 系统初始化 Mermaid 渲染引擎
- **WHEN** 设置 `themeVariables.gridTextSize: '20px'`
- **THEN** Mermaid 渲染甘特图 SVG 时,时间轴刻度标签字体大小为 20px
- **AND** 该配置在网页预览和 DOCX 导出(PNG 转换)中都生效
- **AND** 不影响其他类型的 Mermaid 图表

#### Scenario: CSS 样式层增强预览效果

- **GIVEN** 用户在编辑器中输入包含甘特图的 Mermaid 代码
- **WHEN** 系统渲染甘特图到预览区域
- **THEN** CSS 样式规则 `.tick text { font-size: 20px !important; }` 被应用
- **AND** 网页预览中时间轴刻度标签字体大小为 20px
- **AND** 提供额外的样式保障

#### Scenario: 甘特图在 DOCX 中导出时保持清晰

- **GIVEN** 用户输入包含甘特图的 Markdown 内容
- **WHEN** 用户点击"生成 DOCX"按钮
- **AND** 甘特图被转换为 PNG 图片
- **THEN** PNG 图片中的时间轴刻度标签字体大小为 20px (因为 themeVariables 在 SVG 渲染时生效)
- **AND** 导出的 DOCX 文档中,甘特图的时间轴刻度标签清晰可见
- **AND** 与标题(fontSize: 28)、section 标签(sectionFontSize: 20)形成合理的视觉层级

#### Scenario: 甘特图其他元素不受影响

- **GIVEN** 系统应用了 `gridTextSize: '20px'` 配置和 `.tick text` CSS 样式
- **WHEN** 渲染甘特图
- **THEN** 任务名称的字体大小保持为 `fontSize: 20`
- **AND** section 名称的字体大小保持为 `sectionFontSize: 20`
- **AND** 标题的字体大小保持为 `titleFontSize: 28`
- **AND** 任务条的高度和间距保持为 `barHeight: 50`, `barGap: 10`
- **AND** 仅时间轴刻度标签字体大小增加

#### Scenario: 其他图表类型不受影响

- **GIVEN** Markdown 文档包含流程图、序列图等其他 Mermaid 图表
- **WHEN** 渲染这些图表
- **THEN** `gridTextSize` 配置不影响非甘特图类型
- **AND** CSS 规则 `.tick text` 不影响其他图表类型的文本
- **AND** 只有甘特图的时间轴刻度标签字体大小改变

#### Scenario: 打印时刻度标签保持清晰

- **GIVEN** 用户在浏览器中查看包含甘特图的预览
- **WHEN** 用户点击"打印预览"或使用浏览器打印功能
- **THEN** 甘特图的时间轴刻度标签在打印时字体大小为 20px
- **AND** 打印输出中刻度标签清晰可读
