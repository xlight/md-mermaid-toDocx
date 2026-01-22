## 1. 实现任务

- [x] 1.1 在单元格处理逻辑中读取 `colspan` 属性
- [x] 1.2 在单元格处理逻辑中读取 `rowspan` 属性
- [x] 1.3 将 `colspan` 属性值转换为整数并应用到 `TableCell` 的 `columnSpan` 配置
- [x] 1.4 将 `rowspan` 属性值转换为整数并应用到 `TableCell` 的 `rowSpan` 配置
- [x] 1.5 添加属性值验证（确保为正整数）

## 2. 测试验证

- [x] 2.1 创建包含 colspan 的测试表格文档
- [x] 2.2 创建包含 rowspan 的测试表格文档
- [x] 2.3 创建同时包含 colspan 和 rowspan 的复杂表格文档
- [ ] 2.4 导出 DOCX 并在 Microsoft Word 中验证单元格合并正确
- [ ] 2.5 验证无 colspan/rowspan 的表格仍正常工作
- [ ] 2.6 验证 GFM Markdown 表格（不受影响）仍正常工作

## 3. 文档更新

- [x] 3.1 添加代码注释说明 colspan/rowspan 处理逻辑
