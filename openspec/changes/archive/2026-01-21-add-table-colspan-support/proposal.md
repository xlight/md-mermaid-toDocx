# Change: 支持 HTML Table 的 colspan 和 rowspan 属性导出到 DOCX

## Why

当前 Markdown 文档中的 HTML table 标签在导出到 DOCX 时，不会保留 `colspan` 和 `rowspan` 属性。这导致使用了单元格合并的表格在导出后结构错乱，无法正确显示合并的单元格。

用户在编写包含复杂表格的文档时，经常需要使用 `colspan` 来合并多列单元格（如表头），使用 `rowspan` 来合并多行单元格。如果这些属性在 DOCX 中丢失，表格将无法正确呈现。

## What Changes

- 在 `parseMarkdownToDocxElements` 函数的 table 处理逻辑中，读取 HTML 单元格的 `colspan` 和 `rowspan` 属性
- 将这些属性应用到 `docx.TableCell` 的 `columnSpan` 和 `rowSpan` 配置中
- 确保合并单元格后的表格结构在 DOCX 中正确显示

## Impact

### 受影响的 Specs
- `docx-export` - DOCX 导出功能

### 受影响的代码
- `index.html:803-831` - table 解析和 DOCX 转换逻辑
- `index.html:807-822` - 单元格处理逻辑

### 用户体验影响
- **正面影响**: 
  - 支持复杂表格的正确导出
  - HTML table 的 colspan/rowspan 属性将被保留
  - 表格结构在 DOCX 中与原始 HTML 保持一致
  
- **负面影响**: 无

### 兼容性
- 不会影响现有的 Markdown 表格（GFM 表格）
- 不会影响不使用 colspan/rowspan 的 HTML 表格
- 向后兼容，仅增强功能

### 边界情况
- 如果 colspan/rowspan 值无效（如非数字、小于1），将使用默认值 1（不合并）
- 如果合并范围超出表格实际列/行数，由 docx 库和 Word 处理
