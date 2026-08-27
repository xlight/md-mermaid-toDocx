# Tasks for fix-task-list-checkbox

## Implementation Tasks

1. [x] 修改 `index.html` 第 784 行,将 `li.querySelector("input[type='checkbox']").checked` 改为 `li.querySelector("input[type='checkbox']")?.checked`
   - 验证: 代码编译无误,浏览器支持可选链运算符(ES2020+)

2. [x] 测试任务列表导出功能
   - 使用 `test-lists.md` 中的"6. 任务列表"部分作为测试用例
   - 验证: 未完成任务显示 ☐ 前缀
   - 验证: 已完成任务显示 ☑ 前缀
   - 验证: 顶级任务列表使用 level 0 缩进(left: 720)

3. [x] 测试嵌套任务列表
   - 验证: 嵌套子任务的 checkbox 符号正常显示
   - 验证: 缩进正确递增(level 1: 1440, level 2: 2160)

4. [x] 测试边缘情况
   - 验证: 空任务列表不会导致错误
   - 验证: 普通无序列表不受影响(不会错误地添加 checkbox 前缀)
   - 验证: 有序列表和其他列表类型正常工作

5. [x] 更新规范文件 `openspec/specs/docx-export/spec.md`
   - 在"列表缩进级别正确映射" requirement 下添加新的 Scenario
   - 记录任务列表 checkbox 显示的正确行为和错误处理

## Validation Tasks

6. [x] 手动测试完整的 DOCX 导出流程
   - 在浏览器中打开 `index.html`
   - 加载 `test-lists.md` 内容
   - 生成 DOCX 文件
   - 在 Word 或其他 DOCX 阅读器中打开,验证任务列表显示正确

7. [x] 确认向后兼容性
   - 验证: 之前能够正常导出的文档仍然正常
   - 验证: 不包含任务列表的文档不受影响
