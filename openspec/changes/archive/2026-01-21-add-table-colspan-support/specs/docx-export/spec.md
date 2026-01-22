## ADDED Requirements

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
