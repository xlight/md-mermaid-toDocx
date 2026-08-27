## Context

当前应用是一个纯前端的 Markdown + Mermaid 转 DOCX 工具，使用 CDN 加载所有依赖。用户需要编辑和导出包含数学公式的学术/技术文档，但目前缺少 LaTeX 数学公式支持。

**约束条件**：
- 纯前端架构，无后端服务
- 所有依赖通过 CDN 加载
- 无构建系统（无 webpack/rollup）
- 需要支持离线使用（CDN 加载后）

**利益相关者**：
- 学术研究人员（需要撰写论文）
- 教师/学生（需要制作教学材料）
- 技术文档作者（需要编写技术规范）

## Goals / Non-Goals

**Goals:**
- 支持标准的 LaTeX 数学公式语法（`$...$` 行内，`$$...$$` 块级）
- 在浏览器预览中提供高质量的数学公式渲染
- 在导出的 DOCX 文档中保留公式的视觉效果
- 保持应用的轻量级和快速加载
- 与现有功能（Markdown、Mermaid）无缝集成

**Non-Goals:**
- 不支持完整的 LaTeX 文档（仅限数学公式）
- 不支持 DOCX 中的可编辑公式（OMML）- 优先使用图片嵌入以简化实现
- 不支持实时协作编辑
- 不支持公式的语音读取（可访问性）

## Decisions

### Decision 1: 使用 MathJax 而非 KaTeX

**选择**: MathJax v3

**理由**:
- 更完整的 LaTeX 支持（包括复杂的多行公式、定理环境）
- 更好的可访问性支持（MathML 输出）
- 更专业的数学排版质量
- 体积差异在 CDN 环境下可接受

**备选方案**:
- KaTeX: 更快但功能受限，不支持某些高级 LaTeX 语法
- Math.js: 功能过于简单

### Decision 2: DOCX 导出使用图片而非 OMML

**选择**: 将公式渲染为高清 PNG 图片嵌入

**理由**:
- 实现简单，无需复杂的 MathML→OMML 转换
- 100% 保真度（所见即所得）
- 兼容性好（所有 Word 版本支持图片）
- 文件体积增加可控

**备选方案**:
- OMML (Office Math ML): 需要额外的转换库，复杂度高，转换可能不完美
- SVG 嵌入: Word 对 SVG 支持有限，兼容性问题

### Decision 3: 使用 Marked.js 扩展而非独立解析

**选择**: 通过 Marked.js 的 tokenizer/renderer 扩展机制

**理由**:
- 与现有架构一致
- 支持混合内容（Markdown + 公式 + Mermaid）
- 避免重复解析文本
- 易于维护

**备选方案**:
- 独立预处理: 需要额外的文本扫描，可能影响性能
- 使用 markdown-it: 需要替换整个 Markdown 引擎，影响面大

### Decision 4: 使用 html2canvas 进行公式截图

**选择**: html2canvas 库

**理由**:
- 成熟稳定，广泛使用
- 支持复杂 DOM 结构
- 可配置渲染质量（scale 参数）
- CDN 可用

**备选方案**:
- dom-to-image: 功能相似，但社区支持较少
- 手动 Canvas API: 实现复杂，难以处理 MathJax 的复杂 DOM

## Risks / Trade-offs

### Risk 1: MathJax 加载影响页面性能
**影响**: MathJax 核心文件较大（~300KB gzipped）
**缓解**: 使用 `defer` 加载，不阻塞页面渲染；用户编辑时不立即渲染公式

### Risk 2: 大量公式导致预览卡顿
**影响**: 文档包含数十个公式时，渲染可能变慢
**缓解**: 使用防抖机制（已有 500ms）；考虑添加虚拟滚动

### Risk 3: 行内公式与 shell 变量冲突
**影响**: `$HOME` 等 shell 变量会被误识别为公式
**缓解**: 要求公式必须闭合（`$...$`）；优先识别代码块

### Risk 4: 图片导出的公式不可编辑
**影响**: 用户无法在 Word 中修改导出的公式
**缓解**: 在文档说明中告知用户；未来可考虑添加 OMML 支持

### Risk 5: MathJax 与现有库冲突
**影响**: MathJax 可能与 Mermaid/Marked 产生冲突
**缓解**: 使用命名空间隔离；配置 MathJax 不处理已有内容