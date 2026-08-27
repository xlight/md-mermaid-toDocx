## Why

用户需要在 Markdown 文档中显示数学公式，特别是在学术、技术文档中常见的 LaTeX 数学表达式（如 `$E=mc^2$` 和 `$$...$$` 块级公式）。当前应用仅支持 Markdown 文本和 Mermaid 图表，缺少数学公式支持限制了其在教育和科研领域的应用。

## What Changes

- **新增数学公式渲染功能**：支持 LaTeX 语法的行内公式（`$...$`）和块级公式（`$$...$$`）
- **集成 MathJax 渲染引擎**：使用 MathJax v3 提供高质量的数学公式渲染
- **扩展 Markdown 解析器**：在 Marked.js 中添加数学公式 tokenizer 和 renderer
- **DOCX 导出支持**：将数学公式以高清图片形式嵌入到生成的 Word 文档中
- **新增 CSS 样式**：为数学公式提供美观的显示样式
- **i18n 支持**：添加数学公式相关的界面文本（中/英双语）

## Capabilities

### New Capabilities
- `math-rendering`: LaTeX 数学公式渲染，支持行内和块级公式，包含完整的 MathJax 集成
- `math-docx-export`: 数学公式到 DOCX 的导出功能，确保公式在 Word 中清晰可读

### Modified Capabilities
- 无（此功能为全新添加，不修改现有功能的行为）

## Impact

- **index.html**: 添加 MathJax CDN 引用
- **app.js**: 
  - 扩展 `parseCombinedContentFromTextarea()` 识别 `$$...$$` 块级公式
  - 扩展 Marked.js tokenizer/renderer 支持 `$...$` 行内公式
  - 新增 `renderMath()` 函数调用 MathJax 渲染
  - 修改 `updateFullPreview()` 处理数学公式段落
  - 新增 `renderMathToPng()` 函数用于 DOCX 导出
  - 修改 DOCX 生成逻辑，将数学公式转为图片嵌入
- **styles.css**: 添加 `.math-inline` 和 `.math-display` 样式
- **i18n 对象**: 添加数学公式相关的界面文本键值
