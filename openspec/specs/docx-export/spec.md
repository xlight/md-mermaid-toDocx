# docx-export Specification

## Purpose

定义 DOCX 文档导出功能的规范，特别是 Mermaid 图表的处理方式。确保导出的 DOCX 文件中的 Mermaid 图表能够自动适应页面宽度，提供良好的阅读和打印体验。
## Requirements
### Requirement: Mermaid 图表导出到 DOCX

系统 SHALL 将 Mermaid 图表转换为 PNG 图片并嵌入到 DOCX 文档中，同时确保图片不超出页面的可用宽度范围。

#### Scenario: 导出宽度适中的 Mermaid 图表

- **GIVEN** 用户输入包含宽度为 400 像素的 Mermaid 流程图
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统生成 DOCX 文件，其中图片保持原始尺寸（400 像素宽）
- **AND** 图片未超出页面边距

#### Scenario: 导出超宽的 Mermaid 图表

- **GIVEN** 用户输入包含宽度为 1200 像素的 Mermaid 序列图
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统生成 DOCX 文件，其中图片被按比例缩小以适应页面宽度
- **AND** 图片宽度不超过页面可用宽度（约 6.27 英寸或 602 像素在 96 DPI 下）
- **AND** 图片的宽高比保持不变

#### Scenario: 保持图片质量

- **GIVEN** 用户输入包含复杂的 Mermaid 图表
- **WHEN** 图表被缩小以适应页面
- **THEN** 图片仍保持清晰，因为 PNG 生成时使用了 1.5 倍缩放因子

### Requirement: 自动计算图片缩放比例

系统 SHALL 自动计算 Mermaid 图片的缩放比例，确保不超出 DOCX 页面的可用宽度。

#### Scenario: 计算缩放比例

- **GIVEN** 一张宽度为 W 像素的 Mermaid PNG 图片
- **AND** DOCX 页面的可用宽度为 MAX_WIDTH（基于 A4 纸张，左右边距各 1 英寸，约 6.27 英寸）
- **WHEN** 系统准备嵌入图片到 DOCX
- **THEN** 如果 W > MAX_WIDTH，计算缩放比例 scale = MAX_WIDTH / W
- **AND** 应用缩放后的宽度 = W * scale
- **AND** 应用缩放后的高度 = H * scale（H 为原始高度）

#### Scenario: 小图片不放大

- **GIVEN** 一张宽度为 300 像素的 Mermaid PNG 图片
- **AND** DOCX 页面的可用宽度为 602 像素（约 6.27 英寸在 96 DPI 下）
- **WHEN** 系统准备嵌入图片到 DOCX
- **THEN** 图片保持原始尺寸 300 像素
- **AND** 不进行放大操作

#### Scenario: 处理边缘情况

- **GIVEN** Mermaid 图表生成失败或尺寸无效（宽度或高度 <= 0）
- **WHEN** 系统尝试嵌入图片
- **THEN** 系统插入错误提示文本，如"[Mermaid image {id} invalid dimensions]"
- **AND** 不尝试应用缩放

### Requirement: HTML Table colspan 属性支持

系统 SHALL 在导出 DOCX 时保留 HTML table 单元格的 `colspan` 属性，正确合并列单元格。

#### Scenario: 导出带有 colspan 的表头

- **GIVEN** Markdown 文档包含 HTML table，其中表头行使用 `<th colspan="2">标题</th>`
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统生成 DOCX 文件，其中该单元格跨越 2 列
- **AND** 表格结构正确，单元格对齐正确

#### Scenario: 导出带有 colspan 的数据单元格

- **GIVEN** Markdown 文档包含 HTML table，其中数据行使用 `<td colspan="3">合并内容</td>`
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统生成 DOCX 文件，其中该单元格跨越 3 列
- **AND** 后续单元格位置正确调整

#### Scenario: 处理无效的 colspan 值

- **GIVEN** Markdown 文档包含 `<td colspan="abc">` 或 `<td colspan="-1">` 或 `<td colspan="0">`
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统将该单元格视为 colspan=1（不合并）
- **AND** 表格正常导出，不产生错误

### Requirement: HTML Table rowspan 属性支持

系统 SHALL 在导出 DOCX 时保留 HTML table 单元格的 `rowspan` 属性，正确合并行单元格。

#### Scenario: 导出带有 rowspan 的单元格

- **GIVEN** Markdown 文档包含 HTML table，其中某单元格使用 `<td rowspan="2">跨行内容</td>`
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统生成 DOCX 文件，其中该单元格跨越 2 行
- **AND** 下一行对应位置自动调整

#### Scenario: 同时使用 colspan 和 rowspan

- **GIVEN** Markdown 文档包含 HTML table，其中某单元格使用 `<td colspan="2" rowspan="3">复杂合并</td>`
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统生成 DOCX 文件，其中该单元格跨越 2 列和 3 行
- **AND** 表格结构完整，单元格位置正确

#### Scenario: 处理无效的 rowspan 值

- **GIVEN** Markdown 文档包含 `<td rowspan="xyz">` 或空 rowspan 属性
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统将该单元格视为 rowspan=1（不合并）
- **AND** 表格正常导出

### Requirement: 向后兼容性

系统 SHALL 确保不使用 colspan/rowspan 的表格和 GFM Markdown 表格保持原有行为。

#### Scenario: 导出普通 HTML 表格（无合并）

- **GIVEN** Markdown 文档包含不使用 colspan/rowspan 的 HTML table
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 表格正常导出，与之前版本行为一致
- **AND** 所有单元格都是 1x1 大小

#### Scenario: 导出 GFM Markdown 表格

- **GIVEN** Markdown 文档包含 GFM 格式的表格（使用 `|` 和 `-` 语法）
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 表格正常导出，与之前版本行为一致
- **AND** 不受本次变更影响

#### Scenario: 混合使用 HTML 和 GFM 表格

- **GIVEN** Markdown 文档同时包含 HTML table 和 GFM 表格
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** HTML table 的 colspan/rowspan 被正确处理
- **AND** GFM 表格保持原有格式
- **AND** 两种表格都正确显示在 DOCX 中

