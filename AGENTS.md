# Agent 编码指南 - md-mermaid-toDocx

## 项目概述

将 Markdown、Mermaid 图表和 LaTeX 数学公式转换为 DOCX 的 Web 应用。

**技术栈**：纯前端应用，无构建系统，CDN 加载依赖
**核心文件**：`index.html` + `app.js` + `styles.css`

## 构建/测试命令

### 运行应用
直接使用浏览器打开 index.html

### 测试
- **无自动化测试**，仅手动测试
- 测试清单：
  - Markdown 渲染
  - Mermaid 图表渲染（Flowchart、Sequence、Gantt 等）
  - 数学公式渲染（行内公式 `$...$` 和块级公式 `$$...$$`）
  - DOCX 导出
  - 字体选择
  - 语言切换（中/英）
  - 主题应用
  - ASCII 输出模式
  - 同步滚动

### 代码检查
- 无配置 linter
- 遵循现有代码风格

## 代码规范

### 文件结构
```
index.html    # HTML 结构 + CDN 引用
app.js        # JavaScript 逻辑（已分离）
styles.css    # CSS 样式（已分离）
default.md    # 默认加载内容
```

### JavaScript 规范

**变量声明**：
```javascript
const statusDiv = document.getElementById('status');  // 不变值
let debounceTimer;                                     // 可变值
// 禁止使用 var
```

**命名**：
- 变量/函数：`camelCase`（`combinedContentInput`, `applyLanguage()`）
- 类：`PascalCase`（`new ThemeManager()`）
- DOM 元素引用：描述性名称（`documentPreviewDiv`）

**函数**：
```javascript
// 顶层函数声明
function applyLanguage(lang) { }

// 异步函数
async function loadDefaultMd() { }

// 回调使用箭头函数
input.addEventListener('input', () => scheduleUpdate());
```

**注释**：
```javascript
// 中文注释说明功能（中文特性）
// English comments for technical details
// 防止循环触发 (Prevent infinite loop)
```

### 异步处理
```javascript
// 优先使用 async/await，避免 .then() 链
async function renderMermaid(code) {
    try {
        const { svg } = await mermaid.render(id, code);
        return svg;
    } catch (e) {
        console.error('渲染失败:', e);
        throw e;
    }
}
```

### 错误处理
```javascript
try {
    const response = await fetch('default.md');
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
} catch (error) {
    console.error('加载失败:', error);
    statusDiv.textContent = t('error') + error.message;
}
```

### DOM 操作
```javascript
// 缓存 DOM 引用
const combinedContentInput = document.getElementById('combinedContentInput');

// 使用 querySelector
const codeElement = node.querySelector('code');

// 批量操作
nodes.forEach(node => processNode(node));
```

### 国际化 (i18n)
所有用户可见文本必须使用 i18n：

```javascript
// 1. 在 i18n 对象添加中英双语
const i18n = {
    'zh-CN': { myKey: '中文文本' },
    'en': { myKey: 'English Text' }
};

// 2. HTML 使用 data-i18n 属性
<button data-i18n="myKey">默认文本</button>

// 3. JS 中使用 t() 函数
statusDiv.textContent = t('myKey');
```

## 依赖库

所有库通过 CDN 加载（unpkg.com）：
- **Mermaid.js** v11.12.2：图表渲染
- **beautiful-mermaid** v0.1.3：主题化渲染
- **Marked.js** v15.0.12：Markdown 解析
- **MathJax** v3：数学公式渲染
- **html2canvas** v1.4.1：Mermaid/HTML 截图导出（保留用于其他场景）
- **docx** v9.5.0：DOCX 生成
- **FileSaver.js** v2.0.5：文件下载

**禁止**：安装 npm 包、创建 package.json、使用构建工具

## OpenSpec 工作流

本项目使用 OpenSpec 管理变更：

```bash
# 开始新变更
/opsx-new-change

# 继续当前变更
/opsx-continue-change

# 实施变更
/opsx-apply-change

# 验证变更
/opsx-verify-change

# 归档完成变更
/opsx-archive-change
```

## 重要实现细节

### 图表渲染策略
1. **beautiful-mermaid**：支持主题的图表（Flowchart、Sequence、Class、ER）
2. **原生 Mermaid.js**：其他图表类型（Gantt、Pie、Journey 等）

### 数学公式渲染策略
1. **MathJax v3**：渲染 LaTeX 数学公式
2. **行内公式**：`$...$` 语法，通过 Marked.js 扩展实现
3. **块级公式**：`$$...$$` 语法，通过 parseCombinedContentFromTextarea() 解析
4. **DOCX 导出**：先序列化 MathJax 生成的 SVG，再通过 Canvas 转换为 PNG 图片嵌入（避免公式双层重叠）

### 输出模式
- **SVG**：图形模式，支持主题
- **ASCII**：文本模式，仅支持 beautiful-mermaid 图表
- **Classic**：兼容模式，全部使用原生 Mermaid.js

### 性能优化
- 预览更新防抖：500ms
- 同步滚动使用百分比计算
- 图表渲染使用唯一 ID 防冲突

## Git 工作流

### 提交规范
- 使用英文描述性提交信息
- 相关中文可放括号内

### 部署
- 推送到 `main` 自动触发 GitHub Actions 部署到 Pages
- 无需构建步骤

## 常见任务

### 添加新功能
1. 编辑 `index.html`/`app.js`/`styles.css`
2. 添加 i18n 字符串
3. 本地 HTTP 服务器测试
4. 提交推送（自动部署）

### 更新依赖
修改 CDN URL 中的版本号：
```html
<script src="https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js"></script>
```

## 避免的反模式

❌ 不要添加 npm 依赖
❌ 不要使用 var
❌ 不要硬编码用户可见文本
❌ 不要忘记错误处理
❌ 不要忽略双语测试

## 最佳实践

✅ 保持代码在现有文件中
✅ 正确使用 const/let
✅ 中英文注释结合
✅ 使用 async/await
✅ 全面 i18n 支持
✅ 缓存 DOM 引用
✅ 描述性命名
✅ 浏览器手动测试
✅ try-catch 错误处理
