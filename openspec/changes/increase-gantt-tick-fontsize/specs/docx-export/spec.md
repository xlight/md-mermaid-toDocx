# docx-export Specification Delta

## ADDED Requirements

### Requirement: 甘特图时间轴刻度标签字体大小控制

系统 SHALL 通过 CSS 样式控制甘特图时间轴刻度标签(tick labels)的字体大小,确保在预览和导出的 DOCX 文档中具有良好的可读性。时间轴刻度标签的字体大小 MUST 设置为 20px (相当于普通文本的 2 倍)。

#### Scenario: 甘特图时间轴刻度标签字体大小正确

- **GIVEN** 用户在编辑器中输入包含甘特图的 Mermaid 代码
- **WHEN** 系统渲染甘特图到预览区域
- **THEN** CSS 样式规则 `.tick text { font-size: 20px !important; }` 被应用到甘特图 SVG 的刻度标签元素
- **AND** 时间轴的刻度标签字体大小为 20px
- **AND** 刻度标签在预览中清晰可读

#### Scenario: 甘特图在 DOCX 中导出时保持清晰

- **GIVEN** 用户输入包含甘特图的 Markdown 内容
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 甘特图被转换为 PNG 图片时,时间轴刻度标签的字体大小为 20px
- **AND** 导出的 DOCX 文档中,甘特图的时间轴刻度标签清晰可见
- **AND** 与标题(fontSize: 28)、section 标签(sectionFontSize: 20)形成合理的视觉层级

#### Scenario: 甘特图其他元素不受影响

- **GIVEN** 系统应用了 `.tick text` CSS 样式规则
- **WHEN** 渲染甘特图
- **THEN** 任务名称的字体大小保持为 `fontSize: 20`
- **AND** section 名称的字体大小保持为 `sectionFontSize: 20`
- **AND** 标题的字体大小保持为 `titleFontSize: 28`
- **AND** 任务条的高度和间距保持为 `barHeight: 50`, `barGap: 10`
- **AND** 仅时间轴刻度标签(`.tick text`)字体大小增加

#### Scenario: CSS 选择器不影响其他图表类型

- **GIVEN** Markdown 文档包含流程图、序列图等其他 Mermaid 图表
- **WHEN** 渲染这些图表
- **THEN** `.tick text` CSS 规则不影响其他图表类型的文本
- **AND** 只有甘特图的时间轴刻度标签字体大小改变
- **AND** 其他图表保持默认样式

#### Scenario: 打印时刻度标签保持清晰

- **GIVEN** 用户在浏览器中查看包含甘特图的预览
- **WHEN** 用户点击"打印预览"或使用浏览器打印功能
- **THEN** 甘特图的时间轴刻度标签在打印时字体大小为 20px
- **AND** 打印输出中刻度标签清晰可读
