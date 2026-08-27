## 1. CDN 依赖集成

- [x] 1.1 在 index.html 中添加 MathJax v3 CDN 引用（CSS 和 JS）
- [x] 1.2 在 index.html 中添加 html2canvas CDN 引用
- [x] 1.3 添加 MathJax 和 html2canvas 加载检测逻辑（控制台日志）
- [x] 1.4 添加 CDN 加载失败的错误处理和用户提示

## 2. 数学公式解析

- [x] 2.1 扩展 parseCombinedContentFromTextarea() 函数识别 `$$...$$` 块级公式
- [x] 2.2 为数学公式段落添加新类型 `type: 'math'`
- [x] 2.3 为块级公式添加 `isBlock: true` 标记
- [x] 2.4 确保代码块中的 `$` 符号不被误识别为公式

## 3. Marked.js 扩展（行内公式）

- [x] 3.1 创建 Marked.js tokenizer 扩展识别 `$...$` 行内公式
- [x] 3.2 创建 Marked.js renderer 扩展渲染行内公式
- [x] 3.3 注册扩展到 Marked.js（使用 marked.use()）
- [ ] 3.4 测试行内公式与 Markdown 文本混合渲染

## 4. MathJax 渲染集成

- [x] 4.1 创建 renderMath() 函数调用 MathJax 渲染块级公式
- [x] 4.2 配置 MathJax 渲染选项（SVG 输出模式、错误处理）
- [x] 4.3 在 updateFullPreview() 中添加数学公式段落处理逻辑
- [x] 4.4 为 MathJax 渲染添加错误捕获和用户友好错误消息
- [ ] 4.5 测试复杂 LaTeX 语法（矩阵、多行公式、希腊字母等）

## 5. CSS 样式添加

- [x] 5.1 在 styles.css 中添加 `.math-inline` 样式（行内公式）
- [x] 5.2 在 styles.css 中添加 `.math-display` 样式（块级公式）
- [x] 5.3 调整公式与周围文本的间距和对齐
- [x] 5.4 确保公式在不同字体设置下的显示效果

## 6. DOCX 导出功能

- [x] 6.1 创建 renderMathToPng() 函数将公式转换为 PNG
- [x] 6.2 实现使用 html2canvas 截图公式 DOM 元素
- [x] 6.3 配置图片渲染质量（scale: 2，高清输出）
- [x] 6.4 确保图片背景透明
- [x] 6.5 修改 DOCX 生成逻辑，将数学公式作为图片嵌入
- [x] 6.6 处理行内公式的垂直对齐
- [x] 6.7 处理块级公式的居中和间距
- [x] 6.8 测试包含多个公式的文档导出

## 7. 错误处理和边界情况

- [x] 7.1 处理无效 LaTeX 语法的错误提示
- [x] 7.2 处理 MathJax 渲染失败的情况
- [x] 7.3 处理 html2canvas 加载失败的情况
- [x] 7.4 确保 CDN 加载失败时应用的优雅降级
- [ ] 7.5 测试大量公式（10+）的性能表现

## 8. 国际化支持

- [x] 8.1 在 i18n 对象中添加数学公式相关的中文文本
- [x] 8.2 在 i18n 对象中添加数学公式相关的英文文本
- [x] 8.3 添加数学公式渲染/导出相关的状态消息
- [ ] 8.4 测试中英文界面切换功能

## 9. 文档和测试

- [x] 9.1 更新 readme.md 添加数学公式功能说明
- [x] 9.2 在 default.md 中添加数学公式示例（行内、块级、复杂公式）
- [x] 9.3 更新 AGENTS.md 文档（如有必要）
- [ ] 9.4 手动测试所有支持的 LaTeX 语法类型
- [ ] 9.5 测试在不同浏览器中的兼容性（Chrome、Firefox、Safari、Edge）
- [ ] 9.6 测试 DOCX 文件在不同 Word 版本中的打开效果

## 10. 性能优化

- [x] 10.1 优化 MathJax 加载策略（defer/async）
- [x] 10.2 为公式渲染添加防抖机制（如果需要）
- [x] 10.3 优化公式图片文件大小（PNG 压缩）
- [ ] 10.4 测试文档加载和预览更新的性能
