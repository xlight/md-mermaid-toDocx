# Change: 集成 beautiful-mermaid 渲染引擎并添加主题配置

## Why

当前项目使用原生 Mermaid.js (v11.6.0) 进行图表渲染，存在以下局限性：

1. **美观性不足** - 默认主题较为简单，专业感不强
2. **主题定制复杂** - 需要深入了解 Mermaid 的 themeVariables 和 CSS 类系统
3. **缺少终端输出** - 无法在命令行工具中渲染 ASCII 图表
4. **功能扩展受限** - 当前的甘特图字体配置等定制需要手动维护多处配置

[beautiful-mermaid](https://github.com/lukilabs/beautiful-mermaid) 是专为 AI 时代设计的现代化 Mermaid 渲染引擎，提供：
- **15 个精美内置主题**（Tokyo Night, Catppuccin, Nord, Dracula, GitHub 等）
- **双输出模式** - SVG（富交互界面）+ ASCII/Unicode（终端）
- **简单的双色系统** - 仅需 bg/fg 两色即可生成协调图表，或提供更多颜色进行精细控制
- **实时主题切换** - 基于 CSS 自定义属性，无需重新渲染
- **零 DOM 依赖** - 纯 TypeScript，性能优异
- **Shiki 兼容** - 可直接使用任何 VS Code 主题

## What Changes

### 核心架构变更

1. **保持 CDN 架构**
   - 继续使用 CDN 方式加载依赖，无需构建系统
   - 直接在浏览器中打开 `index.html` 即可使用

2. **混合 Mermaid 渲染引擎**
   - 保留 `mermaid@11.6.0` CDN 依赖（用于不支持的图表类型）
   - 通过国内可用 CDN 加载 `beautiful-mermaid` 浏览器全局版本
   - 实现智能渲染器：
     - 支持的类型（Flowchart, State, Sequence, Class, ER）使用 `beautifulMermaid.renderMermaid()`
     - 不支持的类型（Gantt, Pie, Journey 等）回退到 `mermaid.render()`
   - 使用 `beautifulMermaid.renderMermaidAscii()` 提供 ASCII/Unicode 输出（仅支持的类型）

3. **添加主题配置 UI**
   - 添加主题选择下拉菜单（15 个内置主题）
   - 添加高级颜色配置面板：
     - 背景色 (bg) 和前景色 (fg) 选择器
     - 可选增强色：line, accent, muted, surface, border
     - 实时预览颜色变化
   - 添加输出模式切换开关（SVG / ASCII）
   - 主题配置持久化到 localStorage

4. **更新 DOCX 导出逻辑**
   - 保留 PNG 转换步骤（SVG 转 PNG）
   - 支持的类型：使用 beautiful-mermaid SVG（带主题）转 PNG
   - 不支持的类型：使用原生 Mermaid.js SVG 转 PNG
   - 继续使用现有的 PNG 嵌入逻辑，确保最大兼容性
   - 保留甘特图特定配置（`gantt`, `themeVariables`），用于原生 Mermaid.js 渲染

5. **更新项目文档**
   - 更新 README 说明新的主题功能
   - 添加主题配置使用指南
   - 更新 CDN 依赖列表和版本

### 新增功能

- **主题管理系统**
  - 内置主题选择器
  - 自定义主题创建器
  - 主题导入/导出（JSON 格式）
  
- **ASCII 输出模式**
  - 在预览区域显示 ASCII 图表
  - 支持复制 ASCII 输出
  - Unicode/Pure ASCII 切换

- **实时主题预览**
  - 无需重新渲染即可切换主题
  - 颜色调整实时反映在预览中

## Impact

### 影响的规范
- `specs/docx-export` - MODIFIED: Mermaid 图表导出方式从 PNG 改为 SVG

### 影响的代码
- `index.html` - MODERATE REFACTOR: 在单文件内重构
  - 添加 beautiful-mermaid CDN script 标签（保留原 mermaid.js）
  - 添加主题管理 JavaScript 代码（在 `<script>` 标签内）
  - 添加主题配置 UI 元素（HTML）
  - 实现混合渲染逻辑：根据图表类型选择渲染引擎
  - 更新 CSS 样式支持主题和 ASCII 显示
- 更新 `default.md` 示例内容展示新主题和混合图表

### 破坏性变更

**BREAKING CHANGES**:
- **无破坏性变更** - 所有现有功能保持兼容，仅新增 beautiful-mermaid 主题功能

### 向后兼容性
- **Markdown 解析** - 保持不变，继续使用 marked.js CDN
- **DOCX 导出格式** - 最终文档格式兼容，仍使用 docx.js CDN
- **PNG 嵌入方式** - 保持现有的 PNG 转换和嵌入逻辑
- **用户内容** - 用户编写的 Markdown 和 Mermaid 代码完全无需修改，所有图表类型都支持
- **甘特图配置** - 保留 `mermaid.initialize()` 中的 `gantt` 和 `themeVariables` 配置
- **本地存储** - 字体和语言偏好设置保持兼容，新增主题偏好存储
- **使用方式** - 仍可直接打开 index.html 使用，无需构建步骤

### 用户体验提升
- ✅ 更美观的图表渲染
- ✅ 丰富的主题选择
- ✅ 简单直观的颜色定制
- ✅ ASCII 模式支持终端/纯文本场景
- ✅ 更快的渲染性能（beautiful-mermaid 声称 100+ 图表 <500ms）
- ✅ DOCX 中的高质量 PNG 图表（beautiful-mermaid 生成的美观图表）

### 风险和缓解

1. **beautiful-mermaid 功能覆盖**
   - 风险：beautiful-mermaid 支持 5 种图表类型，可能不覆盖所有 Mermaid 图表
   - 缓解：在文档中明确说明支持的图表类型（Flowchart, State, Sequence, Class, ER）

3. **CDN 可用性**
   - 风险：CDN 服务可能不稳定或在中国境内访问受限
   - 缓解：使用国内可用的 CDN（unpkg.com, cdnjs.cloudflare.com），避免使用被屏蔽的 jsdelivr

4. **依赖维护**
   - 风险：beautiful-mermaid 是相对新的项目（2026年1月发布）
   - 缓解：项目由 Craft 团队维护，有 5.2k stars，活跃度高
