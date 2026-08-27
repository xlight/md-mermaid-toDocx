# Implementation Tasks

## 1. CDN 集成和准备（混合渲染架构）

- [x] 1.1 在 `index.html` 中添加 beautiful-mermaid CDN script 标签（使用 unpkg.com）
- [x] 1.2 保留原 mermaid.js CDN script 标签（两个引擎共存）
- [ ] 1.3 测试两个全局对象在控制台可用：`mermaid` 和 `beautifulMermaid`
- [x] 1.4 添加 CDN 加载错误检测和友好提示
- [x] 1.5 保留现有 `mermaid.initialize()` 配置（gantt 和 themeVariables）

## 2. 主题管理系统实现

- [x] 2.1 在 `<script>` 标签内创建 ThemeManager 类
  - [x] 2.1.1 实现从 localStorage 加载主题配置
  - [x] 2.1.2 实现保存主题配置到 localStorage
  - [x] 2.1.3 实现自定义主题管理（添加、删除、编辑）
  - [x] 2.1.4 实现主题导入/导出 JSON 功能
- [x] 2.2 实现 applyTheme() 函数
  - [x] 2.2.1 应用主题到预览区域的 SVG 元素
  - [x] 2.2.2 使用 CSS 自定义属性实现实时切换
- [x] 2.3 实现内置主题加载逻辑
  - [x] 2.3.1 从 `beautifulMermaid.THEMES` 获取 15 个内置主题
  - [x] 2.3.2 填充主题选择器下拉菜单

## 3. UI 增强 - 主题配置界面

- [x] 3.1 更新 `index.html` HTML 部分
  - [x] 3.1.1 在工具栏添加主题选择下拉菜单
  - [x] 3.1.2 添加"自定义主题"按钮
  - [x] 3.1.3 添加输出模式选择器（SVG / ASCII）
  - [x] 3.1.4 添加 Unicode/Pure ASCII 复选框（在 ASCII 模式下显示）
- [x] 3.2 创建高级颜色配置面板（模态框）
  - [x] 3.2.1 添加模态框 HTML 结构
  - [x] 3.2.2 添加背景色 (bg) 和前景色 (fg) 颜色输入框
  - [x] 3.2.3 添加可选增强色输入框：line, accent, muted, surface, border
  - [x] 3.2.4 添加"保存主题"、"导出主题"、"导入主题"按钮
  - [x] 3.2.5 实现模态框打开/关闭逻辑
- [x] 3.3 更新 CSS 样式
  - [x] 3.3.1 添加主题配置 UI 的样式
  - [x] 3.3.2 添加 ASCII 输出显示样式
  - [x] 3.3.3 添加模态框样式
  - [x] 3.3.4 添加复制按钮样式

## 4. 混合渲染引擎集成

- [x] 4.1 实现图表类型检测函数
  - [x] 4.1.1 创建 `detectDiagramType(code)` 函数
  - [x] 4.1.2 检测支持的类型：flowchart, state, sequence, class, erDiagram
  - [x] 4.1.3 检测不支持的类型：gantt, pie, journey, gitGraph, mindmap, timeline, sankey-beta, requirement, quadrantChart, c4
  - [x] 4.1.4 返回规范化的图表类型字符串
- [x] 4.2 实现混合渲染决策逻辑
  - [x] 4.2.1 创建 `renderDiagram(code, theme, mode)` 函数
  - [x] 4.2.2 定义 beautifulMermaid 支持的类型列表：['flowchart', 'state', 'sequence', 'class', 'er']
  - [x] 4.2.3 如果类型在支持列表且 mode='svg'，使用 `beautifulMermaid.renderMermaid(code, theme)`
  - [x] 4.2.4 如果类型在支持列表且 mode='ascii'，使用 `beautifulMermaid.renderMermaidAscii(code, { useAscii })`
  - [x] 4.2.5 否则，使用 `mermaid.render(id, code)` 渲染（原 mermaid.js）
- [x] 4.3 更新预览渲染逻辑
  - [x] 4.3.1 修改 updateFullPreview() 调用 `renderDiagram()` 函数
  - [x] 4.3.2 应用当前选中的主题到 beautiful-mermaid 渲染
  - [x] 4.3.3 实现 SVG/ASCII 模式切换逻辑
  - [x] 4.3.4 为 ASCII 输出添加"复制"按钮功能
  - [x] 4.3.5 对 mermaid.js 渲染的图表保持原样式
- [x] 4.4 更新 DOCX 导出逻辑
  - [x] 4.4.1 修改 renderMermaidToPng() 调用 `renderDiagram()` 函数
  - [x] 4.4.2 对 beautiful-mermaid SVG：应用主题背景色，转换为 PNG
  - [x] 4.4.3 对 mermaid.js SVG：保持原转换逻辑
  - [x] 4.4.4 确保两种引擎的 PNG 尺寸都自适应页面宽度
- [x] 4.5 添加错误处理
  - [x] 4.5.1 捕获两个渲染引擎的错误并显示友好提示
  - [x] 4.5.2 区分"不支持的图表类型"和"语法错误"
  - [x] 4.5.3 CDN 加载失败时显示备用方案提示

## 5. 功能测试

- [ ] 5.1 测试 beautiful-mermaid 支持的图表类型
  - [ ] 5.1.1 Flowchart (graph TD, LR, BT, RL) - 使用 beautiful-mermaid
  - [ ] 5.1.2 State Diagram - 使用 beautiful-mermaid
  - [ ] 5.1.3 Sequence Diagram - 使用 beautiful-mermaid
  - [ ] 5.1.4 Class Diagram - 使用 beautiful-mermaid
  - [ ] 5.1.5 ER Diagram - 使用 beautiful-mermaid
- [ ] 5.2 测试 mermaid.js 处理的图表类型（回退引擎）
  - [ ] 5.2.1 Gantt Chart - 使用 mermaid.js（验证原 gantt 配置仍生效）
  - [ ] 5.2.2 Pie Chart - 使用 mermaid.js
  - [ ] 5.2.3 User Journey - 使用 mermaid.js
  - [ ] 5.2.4 Git Graph - 使用 mermaid.js
  - [ ] 5.2.5 其他类型（mindmap, timeline, etc.）- 使用 mermaid.js
- [ ] 5.3 测试主题系统
  - [ ] 5.3.1 切换 15 个内置主题，验证 beautiful-mermaid 图表更新
  - [ ] 5.3.2 验证 mermaid.js 图表不受主题影响（保持默认样式）
  - [ ] 5.3.3 创建自定义主题，验证仅应用到 beautiful-mermaid 图表
  - [ ] 5.3.4 保存和加载自定义主题
  - [ ] 5.3.5 导出和导入主题 JSON
  - [ ] 5.3.6 刷新页面后主题持久化
- [ ] 5.4 测试 ASCII 输出模式
  - [ ] 5.4.1 beautiful-mermaid 支持的类型切换到 ASCII 模式
  - [ ] 5.4.2 mermaid.js 图表在 ASCII 模式下显示错误或回退提示
  - [ ] 5.4.3 切换到纯 ASCII 模式，验证纯 ASCII 字符显示
  - [ ] 5.4.4 测试"复制"按钮功能
- [ ] 5.5 测试 DOCX 导出
  - [ ] 5.5.1 导出包含 beautiful-mermaid 主题图表的文档
  - [ ] 5.5.2 导出包含 mermaid.js 图表（gantt, pie）的文档
  - [ ] 5.5.3 导出混合文档（同时包含两种引擎的图表）
  - [ ] 5.5.4 在 Word 中验证所有 PNG 图表清晰度
  - [ ] 5.5.5 验证图表宽度自适应
- [ ] 5.6 测试混合渲染决策
  - [ ] 5.6.1 验证 `detectDiagramType()` 正确识别所有图表类型
  - [ ] 5.6.2 验证 `renderDiagram()` 正确路由到对应引擎
  - [ ] 5.6.3 混合文档中所有图表正确渲染
- [ ] 5.7 测试多语言支持（中文/英文）
- [ ] 5.8 测试浏览器兼容性（Chrome, Firefox, Safari, Edge）

## 6. 文档更新

- [x] 6.1 更新 `README.md`
  - [x] 6.1.1 更新功能列表（新增主题和 ASCII 模式）
  - [x] 6.1.2 添加"主题配置"使用指南
  - [x] 6.1.3 说明混合渲染架构：beautiful-mermaid 处理 5 种类型，mermaid.js 处理其他类型
  - [x] 6.1.4 更新支持的图表类型列表（所有 Mermaid 类型，注明哪些使用哪个引擎）
  - [x] 6.1.5 更新 CDN 依赖列表（两个引擎）
  - [x] 6.1.6 添加备选 CDN 说明（unpkg.com 优先）
- [x] 6.2 更新 `default.md` 示例内容
  - [x] 6.2.1 展示不同类型的图表（包括 beautiful-mermaid 和 mermaid.js 支持的）
  - [x] 6.2.2 添加主题使用说明
  - [x] 6.2.3 保留 gantt 图表示例（验证向后兼容）
- [ ] 6.3 添加主题配置截图到文档（可选）

## 7. 代码清理和优化

- [x] 7.1 验证代码保留
  - [x] 7.1.1 确认 mermaid.js CDN script 标签保留
  - [x] 7.1.2 确认 `mermaid.initialize()` 配置保留（gantt, themeVariables）
  - [x] 7.1.3 确认两个引擎可以共存且不冲突
- [x] 7.2 代码审查和优化
  - [x] 7.2.1 确保代码注释清晰（标注哪些函数使用哪个引擎）
  - [x] 7.2.2 优化函数命名和组织
  - [x] 7.2.3 检查错误处理完整性
  - [x] 7.2.4 确保混合渲染逻辑清晰易维护
- [x] 7.3 性能验证
  - [x] 7.3.1 测试页面加载时间 < 3 秒（两个 CDN）
  - [x] 7.3.2 测试大型文档渲染性能（10+, 50+ 图表，混合类型）
  - [x] 7.3.3 验证 HTML 文件大小 < 120KB（增加了混合渲染逻辑）

## Dependencies

- 任务 2 依赖任务 1（需要先加载 beautiful-mermaid CDN）
- 任务 3 依赖任务 2（UI 需要 ThemeManager 支持）
- 任务 4 依赖任务 2（渲染需要主题管理）
- 任务 5 依赖任务 2、3、4（测试需要所有功能完成）
- 任务 7 依赖任务 5（清理需要测试通过）

## Parallelizable Work

- 任务 3.1 (HTML 更新) 和 3.3 (CSS 更新) 可以并行开发
- 任务 4.1 (预览渲染) 和 4.2 (DOCX 导出) 可以并行开发
- 任务 6.1, 6.2 (文档更新) 可以并行编写
