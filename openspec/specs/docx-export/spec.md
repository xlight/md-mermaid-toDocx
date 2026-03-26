# docx-export Specification

## Purpose

定义 DOCX 文档导出功能的规范，特别是 Mermaid 图表的处理方式。确保导出的 DOCX 文件中的 Mermaid 图表能够自动适应页面宽度，提供良好的阅读和打印体验。

## Requirements

### Requirement: Mermaid 图表导出到 DOCX

系统 SHALL 使用混合渲染策略将 Mermaid 图表转换为 PNG 图片并嵌入到 DOCX 文档中。对于 beautiful-mermaid 支持的图表类型（Flowchart, State, Sequence, Class, ER），系统使用 beautiful-mermaid 渲染引擎并应用用户选择的主题；对于其他图表类型（Gantt, Pie, Journey 等），系统使用原 mermaid.js 渲染引擎。导出的图表必须不超出页面的可用宽度范围，并保持高清晰度。

#### Scenario: 导出 beautiful-mermaid 支持的图表类型（主题化）

- **GIVEN** 用户选择了 beautiful-mermaid 的内置主题（如 "tokyo-night"）
- **AND** 用户输入包含 Mermaid 流程图（`graph TD`）
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统检测图表类型为 "flowchart"
- **AND** 系统使用 `beautifulMermaid.renderMermaid()` 函数生成 SVG
- **AND** 系统将 SVG 通过 Canvas API 转换为 PNG（1.5x 缩放以保持清晰度）
- **AND** 系统使用 docx.js 的 ImageRun 将 PNG 嵌入 DOCX 文档
- **AND** PNG 背景色应用主题的 bg 颜色
- **AND** 导出的 DOCX 文件中图表清晰且符合主题风格

#### Scenario: 导出 mermaid.js 处理的图表类型（保持原样式）

- **GIVEN** 用户输入包含 Gantt 图表
- **AND** 用户选择了 beautiful-mermaid 主题（如 "catppuccin-mocha"）
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统检测图表类型为 "gantt"
- **AND** 系统使用 `mermaid.render()` 函数生成 SVG（不应用 beautiful-mermaid 主题）
- **AND** 系统应用原 `mermaid.initialize()` 配置（gantt, themeVariables）
- **AND** 系统将 SVG 通过 Canvas API 转换为 PNG
- **AND** 导出的 DOCX 中 Gantt 图表保持原 mermaid.js 样式

#### Scenario: 导出混合图表类型的文档

- **GIVEN** 用户输入包含 3 个图表：Flowchart, Sequence Diagram, Gantt Chart
- **AND** 用户选择了 beautiful-mermaid 主题 "nord"
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** Flowchart 使用 beautiful-mermaid 渲染，应用 "nord" 主题
- **AND** Sequence Diagram 使用 beautiful-mermaid 渲染，应用 "nord" 主题
- **AND** Gantt Chart 使用 mermaid.js 渲染，保持原样式
- **AND** 所有 3 个图表都成功嵌入 DOCX，PNG 格式，清晰度一致

#### Scenario: 导出使用自定义主题的 beautiful-mermaid 图表

- **GIVEN** 用户创建了自定义主题，设置了 bg="#1a1b26", fg="#a9b1d6", accent="#7aa2f7"
- **AND** 用户输入包含 Class Diagram（beautiful-mermaid 支持）
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统检测图表类型为 "class"
- **AND** 系统应用自定义主题配置到 beautiful-mermaid 渲染
- **AND** 生成的 SVG 反映用户选择的颜色
- **AND** SVG 转换为 PNG 时背景色为 #1a1b26
- **AND** DOCX 中的图表使用自定义主题颜色

#### Scenario: 导出超宽的 Mermaid 图表并自适应页面

- **GIVEN** 用户输入包含宽度为 1200 像素的 Mermaid 图表
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统使用 beautiful-mermaid 生成 SVG
- **AND** 系统解析 SVG 的 width 和 height 属性
- **AND** 系统通过 Canvas 以 1.5x 缩放渲染 SVG 为 PNG
- **AND** 如果生成的 PNG 宽度超过页面可用宽度（约 602 像素），系统在嵌入 DOCX 时按比例缩小
- **AND** 图表的宽高比保持不变
- **AND** PNG 高分辨率（1.5x）确保缩小后仍清晰

#### Scenario: 处理 beautiful-mermaid 图表渲染失败

- **GIVEN** 用户输入包含语法错误的 Flowchart 代码
- **WHEN** 系统调用 `beautifulMermaid.renderMermaid()` 时抛出异常
- **THEN** 系统捕获错误并在 DOCX 中插入错误提示文本
- **AND** 错误提示包含具体的错误信息（如 "[Mermaid Error: Syntax error in flowchart]"）
- **AND** 不中断整个 DOCX 导出流程，继续处理其他内容

#### Scenario: 处理 mermaid.js 图表渲染失败

- **GIVEN** 用户输入包含语法错误的 Gantt 图表代码
- **WHEN** 系统调用 `mermaid.render()` 时抛出异常
- **THEN** 系统捕获错误并在 DOCX 中插入错误提示文本
- **AND** 错误提示包含具体的错误信息（如 "[Mermaid Error: Invalid gantt syntax]"）
- **AND** 不中断整个 DOCX 导出流程，继续处理其他内容

### Requirement: Mermaid 图表主题配置

系统 SHALL 提供直观的用户界面让用户选择和自定义 Mermaid 图表主题。主题配置必须支持 beautiful-mermaid 的 15 个内置主题以及用户自定义主题，并能在预览和 DOCX 导出中一致应用到 beautiful-mermaid 支持的图表类型（Flowchart, State, Sequence, Class, ER）。对于 mermaid.js 处理的图表类型（Gantt, Pie, Journey 等），主题配置不生效，保持原样式。

#### Scenario: 选择内置主题仅影响 beautiful-mermaid 图表

- **GIVEN** 用户在工具栏看到"主题"下拉菜单
- **AND** 预览区域包含 Flowchart（beautiful-mermaid）和 Gantt（mermaid.js）
- **WHEN** 用户选择"tokyo-night"主题
- **THEN** Flowchart 立即更新为 tokyo-night 主题颜色
- **AND** Gantt 图表保持原 mermaid.js 默认样式
- **AND** 不需要重新渲染图表（利用 CSS 自定义属性）

#### Scenario: 创建自定义主题仅影响 beautiful-mermaid 图表

- **GIVEN** 用户点击"自定义主题"按钮
- **WHEN** 系统显示高级颜色配置面板
- **THEN** 面板包含以下颜色选择器：
  - 背景色 (bg) - 必填
  - 前景色 (fg) - 必填
  - 线条颜色 (line) - 可选
  - 强调色 (accent) - 可选
  - 柔和色 (muted) - 可选
  - 表面色 (surface) - 可选
  - 边框色 (border) - 可选
- **AND** 用户设置 bg="#0f0f0f", fg="#e0e0e0", accent="#ff6b6b"
- **AND** 用户点击"应用"按钮
- **AND** 预览区域的 beautiful-mermaid 图表（Flowchart, State, Sequence, Class, ER）实时更新为自定义颜色
- **AND** mermaid.js 图表（Gantt, Pie, Journey）不受影响

#### Scenario: 保存和加载自定义主题

- **GIVEN** 用户创建了自定义主题并命名为"我的主题"
- **WHEN** 用户点击"保存自定义主题"按钮
- **THEN** 系统将主题配置保存到 localStorage
- **AND** 主题选择器中新增"我的主题"选项
- **AND** 用户刷新页面后，"我的主题"仍在选择器中
- **AND** 选择"我的主题"可恢复之前的颜色配置

#### Scenario: 导出和导入主题 JSON

- **GIVEN** 用户创建了自定义主题
- **WHEN** 用户点击"导出主题"按钮
- **THEN** 系统生成 JSON 文件并下载，格式为：
```json
{
  "id": "my-theme-123",
  "name": "我的主题",
  "colors": {
    "bg": "#0f0f0f",
    "fg": "#e0e0e0",
    "accent": "#ff6b6b"
  }
}
```
- **AND** 用户在另一台设备上点击"导入主题"按钮
- **AND** 选择该 JSON 文件
- **THEN** 系统加载主题到主题选择器
- **AND** 主题可立即使用

#### Scenario: 主题配置持久化

- **GIVEN** 用户选择了"catppuccin-mocha"主题
- **WHEN** 用户关闭浏览器并重新打开页面
- **THEN** 系统自动加载上次选择的主题
- **AND** 预览区域使用"catppuccin-mocha"主题渲染图表
- **AND** 主题选择器显示当前选中"catppuccin-mocha"

### Requirement: ASCII 输出模式支持

系统 SHALL 提供 ASCII/Unicode 文本模式输出 Mermaid 图表的能力，使用 beautiful-mermaid 的 `renderMermaidAscii()` 函数。此功能仅适用于 beautiful-mermaid 支持的图表类型（Flowchart, State, Sequence, Class, ER）。对于 mermaid.js 处理的图表类型（Gantt, Pie, Journey 等），ASCII 模式不可用，系统应显示提示或保持 SVG 模式。

#### Scenario: 切换到 ASCII 输出模式（仅 beautiful-mermaid 图表）

- **GIVEN** 用户在工具栏看到"输出模式"选择器，默认为"SVG (图形)"
- **AND** 预览区域包含 Flowchart（beautiful-mermaid）和 Gantt（mermaid.js）
- **WHEN** 用户选择"ASCII (文本)"
- **THEN** Flowchart 切换为 ASCII/Unicode 文本渲染
- **AND** Flowchart 显示在 `<pre><code>` 代码块中，使用等宽字体
- **AND** Flowchart 旁边显示"复制"按钮
- **AND** Gantt 图表保持 SVG 模式显示（或显示"ASCII 模式不支持此图表类型"提示）

#### Scenario: ASCII 模式渲染流程图

- **GIVEN** 用户输入简单的流程图代码：
```
graph LR
A --> B --> C
```
- **AND** 用户选择 ASCII 输出模式
- **WHEN** 系统调用 `renderMermaidAscii(code, { useAscii: false })`
- **THEN** 预览区域显示 Unicode 框绘字符：
```
┌───┐   ┌───┐   ┌───┐
│   │   │   │   │   │
│ A │───▶│ B │───▶│ C │
│   │   │   │   │   │
└───┘   └───┘   └───┘
```

#### Scenario: 切换到纯 ASCII 字符集

- **GIVEN** 用户在 ASCII 输出模式下
- **WHEN** 用户勾选"纯 ASCII"复选框
- **THEN** 系统调用 `renderMermaidAscii(code, { useAscii: true })`
- **AND** 预览区域显示纯 ASCII 字符（无 Unicode 框绘）：
```
+---+   +---+   +---+
|   |   |   |   |   |
| A |--->| B |--->| C |
|   |   |   |   |   |
+---+   +---+   +---+
```
- **AND** 适用于不支持 Unicode 的环境

#### Scenario: 复制 ASCII 输出

- **GIVEN** 预览区域显示 ASCII 图表
- **WHEN** 用户点击"复制"按钮
- **THEN** 系统将 ASCII 文本复制到剪贴板
- **AND** 显示提示"已复制到剪贴板"
- **AND** 用户可粘贴到任何文本编辑器或终端

#### Scenario: ASCII 模式不影响 DOCX 导出

- **GIVEN** 用户在预览中使用 ASCII 输出模式
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统仍使用 SVG 格式导出 Mermaid 图表到 DOCX
- **AND** ASCII 模式仅影响预览显示，不影响导出格式
- **AND** DOCX 文档保持高质量矢量图表

### Requirement: 构建系统保持静态 HTML 架构（混合渲染引擎）

系统 SHALL 保持纯静态 HTML + JavaScript 架构，通过 CDN 加载所有依赖（beautiful-mermaid, mermaid.js, marked, docx, file-saver）。用户必须能够直接在浏览器中打开 index.html 文件使用，无需任何构建步骤或 npm 安装。两个渲染引擎（beautiful-mermaid 和 mermaid.js）必须共存且不产生冲突。

#### Scenario: 通过 CDN 加载两个渲染引擎

- **GIVEN** 用户在浏览器中打开 index.html
- **WHEN** 页面加载
- **THEN** 系统通过 unpkg CDN 加载 mermaid.js（保留原引擎）
- **AND** 系统通过 unpkg CDN 加载 beautiful-mermaid.browser.global.js
- **AND** 全局 `mermaid` 对象可用（原引擎）
- **AND** 全局 `beautifulMermaid` 对象可用（新引擎）
- **AND** 两个对象不冲突，可以在不同场景使用

#### Scenario: 验证混合渲染引擎共存

- **GIVEN** 页面已加载两个 CDN 脚本
- **WHEN** 用户在控制台输入 `typeof mermaid` 和 `typeof beautifulMermaid`
- **THEN** 两者都返回 "object"
- **AND** `mermaid.initialize()` 配置仍然生效（gantt, themeVariables）
- **AND** `beautifulMermaid.THEMES` 返回 15 个内置主题
- **AND** 两个引擎可以在同一页面独立工作

#### Scenario: CDN 加载失败时的错误处理

- **GIVEN** 用户网络环境无法访问 CDN 或 CDN 服务故障
- **WHEN** beautiful-mermaid CDN 加载失败
- **THEN** 系统检测到 `beautifulMermaid` 对象未定义
- **AND** 系统在页面顶部显示友好错误提示："无法加载 beautiful-mermaid 库，请检查网络连接或尝试备选 CDN"
- **AND** 提示中包含备选 CDN 链接（如 jsDelivr）

#### Scenario: 无需构建直接使用

- **GIVEN** 用户下载或 clone 项目仓库
- **WHEN** 用户通过 HTTP 服务器（如 Python http.server 或 VS Code Live Server）打开 index.html
- **THEN** 应用正常运行，所有功能可用
- **AND** 无需运行 `npm install` 或 `npm run build`
- **AND** 修改代码后刷新浏览器即可看到变化

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

### Requirement: 甘特图时间轴刻度标签字体大小控制

系统 SHALL 通过 Mermaid themeVariables 配置和 CSS 样式双重方案控制甘特图时间轴刻度标签(tick labels)的字体大小,确保在网页预览和导出的 DOCX 文档中都具有良好的可读性。时间轴刻度标签的字体大小 MUST 设置为 20px (相当于默认大小的 2 倍)。

#### Scenario: Mermaid 配置层控制字体大小

- **GIVEN** 系统初始化 Mermaid 渲染引擎
- **WHEN** 设置 `themeVariables.gridTextSize: '20px'`
- **THEN** Mermaid 渲染甘特图 SVG 时,时间轴刻度标签字体大小为 20px
- **AND** 该配置在网页预览和 DOCX 导出(PNG 转换)中都生效
- **AND** 不影响其他类型的 Mermaid 图表

#### Scenario: CSS 样式层增强预览效果

- **GIVEN** 用户在编辑器中输入包含甘特图的 Mermaid 代码
- **WHEN** 系统渲染甘特图到预览区域
- **THEN** CSS 样式规则 `.tick text { font-size: 20px !important; }` 被应用
- **AND** 网页预览中时间轴刻度标签字体大小为 20px
- **AND** 提供额外的样式保障

#### Scenario: 甘特图在 DOCX 中导出时保持清晰

- **GIVEN** 用户输入包含甘特图的 Markdown 内容
- **WHEN** 用户点击"生成 DOCX"按钮
- **AND** 甘特图被转换为 PNG 图片
- **THEN** PNG 图片中的时间轴刻度标签字体大小为 20px (因为 themeVariables 在 SVG 渲染时生效)
- **AND** 导出的 DOCX 文档中,甘特图的时间轴刻度标签清晰可见
- **AND** 与标题(fontSize: 28)、section 标签(sectionFontSize: 20)形成合理的视觉层级

#### Scenario: 甘特图其他元素不受影响

- **GIVEN** 系统应用了 `gridTextSize: '20px'` 配置和 `.tick text` CSS 样式
- **WHEN** 渲染甘特图
- **THEN** 任务名称的字体大小保持为 `fontSize: 20`
- **AND** section 名称的字体大小保持为 `sectionFontSize: 20`
- **AND** 标题的字体大小保持为 `titleFontSize: 28`
- **AND** 任务条的高度和间距保持为 `barHeight: 50`, `barGap: 10`
- **AND** 仅时间轴刻度标签字体大小增加

#### Scenario: 其他图表类型不受影响

- **GIVEN** Markdown 文档包含流程图、序列图等其他 Mermaid 图表
- **WHEN** 渲染这些图表
- **THEN** `gridTextSize` 配置不影响非甘特图类型
- **AND** CSS 规则 `.tick text` 不影响其他图表类型的文本
- **AND** 只有甘特图的时间轴刻度标签字体大小改变

#### Scenario: 打印时刻度标签保持清晰

- **GIVEN** 用户在浏览器中查看包含甘特图的预览
- **WHEN** 用户点击"打印预览"或使用浏览器打印功能
- **THEN** 甘特图的时间轴刻度标签在打印时字体大小为 20px
- **AND** 打印输出中刻度标签清晰可读

### Requirement: 列表缩进级别正确映射

系统 SHALL 正确计算 Markdown 列表的嵌套级别,确保顶级列表(无嵌套)对应 DOCX 的 level 0,嵌套列表依次递增。列表的缩进和项目符号样式必须符合 Word 文档的标准规范。任务列表(task list)的 checkbox 符号必须正确显示。

#### Scenario: 顶级无序列表使用 level 0

- **GIVEN** Markdown 文档包含顶级无序列表(无嵌套)
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 导出的 DOCX 文档中,顶级列表项使用 `bullet: { level: 0 }`
- **AND** 使用实心圆(●)作为项目符号
- **AND** 缩进为 left: 720 (一级缩进,浅缩进)

#### Scenario: 顶级有序列表使用 level 0

- **GIVEN** Markdown 文档包含顶级有序列表(无嵌套)
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 导出的 DOCX 文档中,顶级列表项使用 `numbering: { reference: "default-numbering", level: 0 }`
- **AND** 使用数字格式(1. 2. 3.)作为编号
- **AND** 缩进为 left: 720, hanging: 360

#### Scenario: 嵌套列表级别正确递增

- **GIVEN** Markdown 文档包含嵌套列表:一级项目,内含二级子项目,内含三级子项目
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 一级列表项使用 level 0 (实心圆/数字,left: 720)
- **AND** 二级列表项使用 level 1 (空心圆/小写字母,left: 1440)
- **AND** 三级列表项使用 level 2 (方块/小写罗马数字,left: 2160)
- **AND** 缩进依次递增 720 单位

#### Scenario: getListLevel 函数正确计算级别

- **GIVEN** `getListLevel()` 函数接收一个 `<li>` 元素
- **WHEN** 该 `<li>` 元素是顶级列表项(父级 `<ul>`/`<ol>` 直接在 `tempDiv` 下)
- **THEN** 函数返回 0
- **AND** 当 `<li>` 是二级嵌套时(父级 `<ul>`/`<ol>` 嵌套在另一个 `<ul>`/`<ol>` 中),返回 1
- **AND** 级别计算公式为: `Math.max(0, 向上遍历的 UL/OL 数量 - 1)`

#### Scenario: 任务列表 checkbox 符号正确显示

- **GIVEN** Markdown 文档包含任务列表,包括已完成 `- [x]` 和未完成 `- [ ]` 任务
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 未完成任务在 DOCX 中显示 ☐ 前缀符号
- **AND** 已完成任务在 DOCX 中显示 ☑ 前缀符号
- **AND** 前缀符号紧跟任务文本内容
- **AND** 不显示原始的 HTML checkbox 元素

#### Scenario: 处理任务列表的边缘情况

- **GIVEN** Markdown 文档包含任务列表,但 marked.js 解析后某些列表项缺少 `<input type="checkbox">` 元素
- **WHEN** 代码检测 `li.classList.contains("task-list-item")` 为 true
- **AND** 执行 `li.querySelector("input[type='checkbox']")` 返回 null
- **THEN** 系统使用可选链运算符 `?.checked` 安全地获取 checked 属性
- **AND** 当 checkbox 元素不存在时,isChecked 为 undefined 或 false
- **AND** 任务列表项显示默认的 ☐ 前缀(未勾选)
- **AND** 不抛出 TypeError 异常,DOCX 生成正常完成

#### Scenario: 任务列表缩进正确

- **GIVEN** Markdown 文档包含任务列表(checkbox 列表),包括嵌套的子任务
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 任务列表项的缩进级别正确(顶级任务使用 level 0 对应的缩进 720)
- **AND** 嵌套子任务的缩进正确递增(level 1 对应 1440, level 2 对应 2160)
- **AND** 任务前缀 ☑ 或 ☐ 正常显示
- **AND** 不使用 bullet 样式(因为有 prefix),而是通过手动设置段落缩进 `indent: { left: 720 * (level + 1) }` 实现

#### Scenario: 向后兼容性说明

- **GIVEN** 用户之前导出的 DOCX 文档使用旧的缩进级别(level 1 起始)
- **WHEN** 应用此修复后重新导出相同的 Markdown 内容
- **THEN** 新导出的 DOCX 中所有列表的缩进级别减少 1
- **AND** 顶级列表从深缩进变为浅缩进,符合 Word 标准
- **AND** 项目符号样式从空心圆变为实心圆(对于无序列表)
- **AND** 这是预期的修复行为,不是 bug
