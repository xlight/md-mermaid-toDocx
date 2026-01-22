# 实现任务清单

## 1. 配置调整

- [x] 1.1 研究 Mermaid.js gantt 配置中控制 tick 标签字体大小的参数
- [x] 1.2 在 `index.html` 中添加 CSS 样式规则 `.tick text { font-size: 20px !important; }`
- [x] 1.3 设置 tick 标签字体大小为 20px (默认值的 2 倍)

## 2. 测试验证

- [x] 2.1 代码审查验证:CSS 选择器正确定位甘特图时间轴刻度标签元素
- [x] 2.2 代码审查验证:字体大小设置为 20px,是默认大小的 2 倍
- [x] 2.3 代码审查验证:CSS 选择器 `.tick text` 仅影响 tick 元素,其他图表元素不受影响
- [x] 2.4 代码审查验证:甘特图的其他配置(fontSize, sectionFontSize, titleFontSize)保持不变

## 3. 文档更新

- [x] 3.1 无需更新用户文档(用户界面无变化,仅视觉优化)
- [x] 3.2 已在 proposal.md 和 spec.md 中记录此改进

## 手动测试说明

用户可以通过以下步骤手动测试:

1. 启动本地服务器: `python3 -m http.server 8000`
2. 在浏览器访问: `http://localhost:8000`
3. 在编辑器中粘贴甘特图示例(default.md 中已包含)
4. 查看预览区域,验证时间轴刻度标签字体是否明显增大
5. 点击"生成 DOCX"按钮,打开生成的文档验证效果
6. 验证其他 Mermaid 图表(流程图、序列图等)显示正常
