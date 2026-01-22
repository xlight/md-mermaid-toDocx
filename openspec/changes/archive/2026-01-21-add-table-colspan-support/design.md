## Context

当前的 DOCX 导出功能使用 `docx` 库（v9.5.0）处理 Markdown 和 HTML 内容。Markdown 通过 `marked.js` 解析为 HTML，然后转换为 DOCX 元素。

### 当前实现

表格处理逻辑位于 `parseMarkdownToDocxElements` 函数的 `case 'table':` 分支（index.html:803-831）：

1. 遍历所有 `<tr>` 元素
2. 对每个 `<tr>`，遍历其 `<th>` 和 `<td>` 子元素
3. 为每个单元格创建 `docx.TableCell` 对象
4. 目前**未读取**单元格的 `colspan` 和 `rowspan` 属性

### 问题

HTML table 支持通过 `colspan` 和 `rowspan` 属性合并单元格：
- `<td colspan="2">` - 合并 2 列
- `<td rowspan="3">` - 合并 3 行

但当前代码在创建 `TableCell` 时未传递这些属性，导致：
- 所有单元格都是 1x1 大小
- 使用了合并的表格结构错乱
- 内容位置不正确

### 约束条件

- 必须保持与现有 GFM Markdown 表格的兼容性
- 必须处理无效的 colspan/rowspan 值（如负数、非数字）
- 应该支持 `<th>` 和 `<td>` 元素的 colspan/rowspan

### docx 库支持

`docx` 库的 `TableCell` 构造函数支持以下配置：
```javascript
new docx.TableCell({
    children: [...],
    columnSpan: 2,  // 合并列数
    rowSpan: 3,     // 合并行数
    // ... 其他配置
})
```

## Goals / Non-Goals

### Goals
- 支持 HTML table 的 `colspan` 属性导出到 DOCX
- 支持 HTML table 的 `rowspan` 属性导出到 DOCX
- 正确处理无效属性值
- 保持现有功能不受影响

### Non-Goals
- 不添加对 GFM Markdown 表格的 colspan/rowspan 支持（GFM 不支持这些属性）
- 不修改表格的其他样式或行为
- 不验证合并范围的逻辑正确性（交由 docx 库和 Word 处理）

## Decisions

### Decision 1: 属性读取方式

**选择**: 使用 `getAttribute()` 方法读取 colspan 和 rowspan

**理由**:
- 标准 DOM API，兼容性好
- 可以统一处理 `<th>` 和 `<td>` 元素
- 返回字符串，便于进行验证和转换

**实现**:
```javascript
const colspan = parseInt(cellElement.getAttribute('colspan')) || 1;
const rowspan = parseInt(cellElement.getAttribute('rowspan')) || 1;
```

### Decision 2: 属性值验证

**选择**: 使用 `parseInt()` 转换并提供默认值 1

**理由**:
- `parseInt()` 会将非数字字符串转换为 `NaN`
- 使用 `|| 1` 作为默认值，确保无效值时不合并单元格
- 简单且健壮

**替代方案**:
- 使用正则表达式验证：更复杂，收益不大
- 使用 `Number()` 转换：对空字符串处理不同，不如 parseInt 直观

### Decision 3: 负数和零的处理

**选择**: 任何小于 1 的值都使用默认值 1

**理由**:
- colspan/rowspan 的语义要求至少为 1
- 0 或负数没有意义
- 与浏览器的处理方式一致

**实现**:
```javascript
const colspan = Math.max(1, parseInt(cellElement.getAttribute('colspan')) || 1);
const rowspan = Math.max(1, parseInt(cellElement.getAttribute('rowspan')) || 1);
```

## Risks / Trade-offs

### Risk 1: 表格结构复杂性

- **风险**: 复杂的 colspan/rowspan 组合可能导致表格难以理解或编辑
- **缓解**: 
  - 这是 HTML table 本身的限制，不是本功能引入的
  - Word 可以正常处理合并单元格
  - 用户应对自己创建的表格结构负责

### Risk 2: 与 Word 的兼容性

- **风险**: docx 库生成的合并单元格可能在某些版本的 Word 中显示异常
- **缓解**: 
  - docx 库（v9.5.0）已广泛使用，兼容性良好
  - 测试时使用 Microsoft Word、LibreOffice、Google Docs 验证
  - 如有问题，可以考虑降级到不支持合并

### Trade-off: 简单实现 vs 完整验证

- **当前**: 简单的 parseInt + 默认值处理
- **优点**: 代码简洁，易于维护
- **缺点**: 不验证合并范围是否超出表格边界
- **决定**: 接受这个 trade-off，因为 Word 会处理不合理的合并

## Migration Plan

### 实施步骤

1. 修改 `index.html:807-822` 的单元格处理代码
2. 读取 colspan 和 rowspan 属性
3. 应用到 TableCell 配置
4. 测试各种合并场景
5. 无需数据迁移或用户配置

### 回滚

- 如果发现问题，移除 columnSpan 和 rowSpan 配置即可恢复原行为
- 不影响已存在的 DOCX 文件

### 验证

创建测试用例：
- 仅 colspan 的表格
- 仅 rowspan 的表格  
- colspan + rowspan 的复杂表格
- 无效值的表格
- GFM Markdown 表格（确保不受影响）

在 Microsoft Word、LibreOffice、Google Docs 中验证导出结果。

## Open Questions

无待解决问题。实现方案清晰明确。
