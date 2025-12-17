# 快速开始指南 / Quick Start Guide

## 🚀 5 分钟快速上手

### 中文版

#### 1. 获取项目

**方法 A：直接使用在线版本**
访问 GitHub Pages 部署的地址即可使用，无需安装。

**方法 B：克隆到本地**
```bash
git clone https://github.com/你的用户名/md-mermaid-toDocx.git
cd md-mermaid-toDocx
```

#### 2. 本地运行（可选）

如果你想在本地运行，需要启动一个 HTTP 服务器：

```bash
# 使用 Python 3
python -m http.server 8000

# 或使用 Python 2
python -m SimpleHTTPServer 8000

# 或使用 Node.js
npx serve

# 或使用 PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

#### 3. 开始使用

1. **输入内容**：在左侧编辑器输入 Markdown 文本
2. **查看预览**：右侧实时显示渲染效果
3. **插入图表**：使用 Mermaid 语法添加图表
4. **选择字体**：从工具栏选择合适的字体
5. **导出文档**：点击"生成 DOCX"按钮下载

#### 4. 示例：创建第一个文档

```markdown
# 我的第一个文档

这是一个简单的 **Markdown** 示例。

## 功能列表

- 支持 Markdown 语法
- 支持 Mermaid 图表
- 一键导出 DOCX

## 流程图示例

​```mermaid
graph LR
    A[开始] --> B[编辑]
    B --> C[预览]
    C --> D[导出]
    D --> E[完成]
​```

## 表格示例

| 项目 | 状态 |
|------|------|
| 编辑器 | ✅ |
| 预览 | ✅ |
| 导出 | ✅ |
```

---

### English Version

#### 1. Get the Project

**Option A: Use Online Version**
Simply visit the GitHub Pages deployment URL - no installation needed.

**Option B: Clone Locally**
```bash
git clone https://github.com/your-username/md-mermaid-toDocx.git
cd md-mermaid-toDocx
```

#### 2. Run Locally (Optional)

To run locally, start an HTTP server:

```bash
# Using Python 3
python -m http.server 8000

# Or using Python 2
python -m SimpleHTTPServer 8000

# Or using Node.js
npx serve

# Or using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

#### 3. Start Using

1. **Input Content**: Type Markdown in the left editor
2. **View Preview**: See real-time rendering on the right
3. **Insert Diagrams**: Add Mermaid diagrams using code blocks
4. **Choose Font**: Select a font from the toolbar
5. **Export Document**: Click "Generate DOCX" to download

#### 4. Example: Create Your First Document

```markdown
# My First Document

This is a simple **Markdown** example.

## Features

- Markdown syntax support
- Mermaid diagrams support
- One-click DOCX export

## Flowchart Example

​```mermaid
graph LR
    A[Start] --> B[Edit]
    B --> C[Preview]
    C --> D[Export]
    D --> E[Done]
​```

## Table Example

| Item | Status |
|------|--------|
| Editor | ✅ |
| Preview | ✅ |
| Export | ✅ |
```

---

## 📚 常见问题 / FAQ

### Q: 为什么本地打开 HTML 文件不工作？
**A:** 由于浏览器安全限制，需要通过 HTTP 服务器运行。使用上述方法启动服务器即可。

### Q: Why doesn't it work when I open the HTML file directly?
**A:** Due to browser security restrictions, you need to run it through an HTTP server. Use one of the methods above.

---

### Q: 如何添加 Mermaid 图表？
**A:** 使用以下格式：
```markdown
​```mermaid
graph TD
    A --> B
​```
```

### Q: How do I add Mermaid diagrams?
**A:** Use this format:
```markdown
​```mermaid
graph TD
    A --> B
​```
```

---

### Q: 支持哪些 Mermaid 图表类型？
**A:** 支持流程图、时序图、类图、状态图、甘特图、饼图、ER图等。详见 [Mermaid 官方文档](https://mermaid.js.org/)。

### Q: What Mermaid diagram types are supported?
**A:** Flowcharts, sequence diagrams, class diagrams, state diagrams, Gantt charts, pie charts, ER diagrams, etc. See [Mermaid Documentation](https://mermaid.js.org/).

---

### Q: 如何切换语言？
**A:** 点击工具栏右侧的"语言"下拉菜单，选择"简体中文"或"English"。

### Q: How do I switch languages?
**A:** Click the "Language" dropdown in the toolbar and select "简体中文" or "English".

---

### Q: 生成的 DOCX 文件在哪里？
**A:** 点击"生成 DOCX"按钮后，文件会自动下载到浏览器的默认下载目录。

### Q: Where is the generated DOCX file?
**A:** After clicking "Generate DOCX", the file will be automatically downloaded to your browser's default download folder.

---

## 🎯 快速技巧 / Quick Tips

### 中文

1. **同步滚动**：编辑器和预览区域会同步滚动，方便对照编辑
2. **自动保存**：浏览器会记住你的语言和字体选择
3. **响应式布局**：在大屏幕上自动切换为左右布局
4. **键盘快捷键**：
   - `Ctrl/Cmd + P` - 打印预览
   - `Ctrl/Cmd + F` - 在编辑器中查找

### English

1. **Sync Scroll**: Editor and preview scroll together for easy comparison
2. **Auto Save**: Browser remembers your language and font choices
3. **Responsive Layout**: Automatically switches to side-by-side on large screens
4. **Keyboard Shortcuts**:
   - `Ctrl/Cmd + P` - Print preview
   - `Ctrl/Cmd + F` - Find in editor

---

## 📖 更多资源 / More Resources

- 📄 [完整文档 / Full Documentation](readme.md)
- 🚀 [部署指南 / Deployment Guide](DEPLOY.md)
- 🌍 [多语言说明 / i18n Guide](I18N.md)
- 📡 [CDN 配置 / CDN Configuration](CDN.md)
- 🏗️ [项目结构 / Project Structure](PROJECT_STRUCTURE.md)

---

## 💡 示例模板 / Example Templates

### 技术文档模板 / Technical Documentation

```markdown
# 项目名称

## 概述
简要说明项目用途...

## 架构图
​```mermaid
graph TB
    A[用户] --> B[前端]
    B --> C[API]
    C --> D[数据库]
​```

## 安装
1. 步骤一
2. 步骤二

## 使用方法
详细说明...
```

### 会议纪要模板 / Meeting Minutes

```markdown
# 会议纪要

**日期**：2024-01-01  
**参与者**：张三、李四、王五

## 议题
1. 项目进度
2. 问题讨论
3. 下一步计划

## 决议
- [ ] 任务一 - 负责人：张三
- [ ] 任务二 - 负责人：李四

## 时间表
​```mermaid
gantt
    title 项目计划
    section 阶段一
    任务A :a1, 2024-01-01, 7d
    任务B :a2, after a1, 5d
​```
```

### 项目报告模板 / Project Report

```markdown
# 季度项目报告

## 执行摘要
本季度完成...

## 数据分析
​```mermaid
pie title 工作时间分配
    "开发" : 45
    "测试" : 25
    "文档" : 20
    "会议" : 10
​```

## 关键指标
| 指标 | 目标 | 实际 | 状态 |
|------|------|------|------|
| 完成度 | 100% | 95% | ⚠️ |
| 质量 | 优秀 | 良好 | ✅ |
```

---

## 🎓 学习路径 / Learning Path

1. **第 1 天**：熟悉 Markdown 基础语法
2. **第 2 天**：学习 Mermaid 流程图和时序图
3. **第 3 天**：掌握高级功能（表格、任务列表等）
4. **第 4 天**：创建自己的文档模板
5. **第 5 天**：部署到 GitHub Pages 分享给团队

---

## 🤝 获取帮助 / Get Help

- 💬 提交 Issue：报告问题或建议
- 📧 联系维护者：通过 GitHub
- 📖 查看文档：本项目包含详细的中英文文档

---

**祝使用愉快！ / Happy documenting!** 🎉