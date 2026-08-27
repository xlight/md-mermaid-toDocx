# Change: 修复 DOCX 导出中任务列表 checkbox 不显示的问题

## Why

在导出 DOCX 文档时,任务列表(task list)的 checkbox 符号(☑ / ☐)没有正常显示。根据测试文件 `test-lists.md` 第 6 部分"任务列表(应该是 level 0)"的测试结果,任务列表项在导出的 DOCX 中缺少勾选框前缀。

**根本原因**:
代码 `index.html` 第 784 行存在潜在的 null 引用错误:

```javascript
const isChecked = isTaskItem && li.querySelector("input[type='checkbox']").checked;
```

如果 `li.querySelector("input[type='checkbox']")` 返回 `null`,这行代码会抛出 `TypeError: Cannot read property 'checked' of null`,导致:
1. DOCX 生成过程异常中断
2. 任务列表项被跳过,checkbox 前缀符号不会被添加
3. 即使有 `prefix = isChecked ? "☑ " : "☐ ";`(第 787 行),由于错误发生在前面,prefix 永远不会被正确设置

**期望行为**:
- 任务列表项应该正确显示 ☐ (未完成)或 ☑ (已完成)前缀
- 顶级任务列表项使用 level 0 对应的缩进(720 单位)
- 嵌套子任务的缩进正确递增

## What Changes

修复 `index.html` 第 784 行的 null 引用错误,使用安全的链式调用(optional chaining):

**具体修改**:
```javascript
// 修改前(第 784 行):
const isChecked = isTaskItem && li.querySelector("input[type='checkbox']").checked;

// 修改后:
const isChecked = isTaskItem && li.querySelector("input[type='checkbox']")?.checked;
```

这个修改:
1. 使用 `?.` 可选链运算符避免 null 引用错误
2. 当 checkbox 元素不存在时,`isChecked` 会被设置为 `undefined`,在 if 判断中会被视为 falsy
3. 确保 `prefix` 能够正确设置为 "☐ "(对于未勾选或缺少 checkbox 的情况)

## Impact

- 影响的规范: `specs/docx-export`
- 影响的代码: `index.html` 第 784 行
- 向后兼容: **完全兼容** - 仅修复 bug,不改变现有正常工作的功能
- 用户体验: **显著改善** - 任务列表的 checkbox 符号能够正常显示在导出的 DOCX 中
- 其他功能: 不受影响,仅修复任务列表导出功能
