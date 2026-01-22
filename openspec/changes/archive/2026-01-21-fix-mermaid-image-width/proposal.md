# Change: 修复 DOCX 中 Mermaid 图片超出页面宽度问题

## Why

当前导出的 DOCX 文件中，Mermaid 图表会按照其原始尺寸（PNG 图片的 naturalWidth 和 naturalHeight）嵌入文档，这导致较宽的图表会超出 Word 文档的页面边距，影响文档的阅读和打印效果。用户需要在 Word 中手动调整图片大小才能正常查看。

## What Changes

- 在 `generateDocxButton` 的点击事件处理函数中，修改 Mermaid 图片嵌入 DOCX 的逻辑
- 计算图片的实际可用页面宽度（考虑页边距）
- 当图片宽度超过可用宽度时，按比例缩小图片以适应页面
- 保持图片的宽高比不变

## Impact

### 受影响的 Specs
- `docx-export` - DOCX 导出功能

### 受影响的代码
- `index.html:900-985` - `generateDocxButton` 事件处理函数
- `index.html:920-929` - Mermaid 图片嵌入逻辑

### 用户体验影响
- **正面影响**: 导出的 DOCX 文件中的图表将自动适应页面宽度，无需手动调整
- **负面影响**: 极大的图表可能会被缩小，但仍保持清晰度（因为使用了 1.5 倍的缩放生成 PNG）

### 兼容性
- 不会影响现有的 Markdown 编辑、预览功能
- 不会影响打印预览功能
- 仅影响 DOCX 导出功能
