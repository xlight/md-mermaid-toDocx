# HTML Table colspan/rowspan 测试文档

此文档用于测试 DOCX 导出时 HTML table 的 colspan 和 rowspan 属性支持。

## 测试场景 1: 仅使用 colspan（列合并）

### 表头合并示例

<table border="1">
  <thead>
    <tr>
      <th colspan="3">合并的表头（跨 3 列）</th>
    </tr>
    <tr>
      <th>列 1</th>
      <th>列 2</th>
      <th>列 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>数据 1-1</td>
      <td>数据 1-2</td>
      <td>数据 1-3</td>
    </tr>
    <tr>
      <td>数据 2-1</td>
      <td>数据 2-2</td>
      <td>数据 2-3</td>
    </tr>
  </tbody>
</table>

### 数据行合并示例

<table border="1">
  <tr>
    <td>普通单元格</td>
    <td>普通单元格</td>
    <td>普通单元格</td>
  </tr>
  <tr>
    <td colspan="2">合并 2 列的单元格</td>
    <td>普通单元格</td>
  </tr>
  <tr>
    <td colspan="3">合并 3 列的单元格</td>
  </tr>
</table>

## 测试场景 2: 仅使用 rowspan（行合并）

<table border="1">
  <tr>
    <td rowspan="3">跨 3 行的单元格</td>
    <td>第 1 行，第 2 列</td>
    <td>第 1 行，第 3 列</td>
  </tr>
  <tr>
    <td>第 2 行，第 2 列</td>
    <td>第 2 行，第 3 列</td>
  </tr>
  <tr>
    <td>第 3 行，第 2 列</td>
    <td>第 3 行，第 3 列</td>
  </tr>
  <tr>
    <td>第 4 行，第 1 列</td>
    <td>第 4 行，第 2 列</td>
    <td>第 4 行，第 3 列</td>
  </tr>
</table>

## 测试场景 3: 同时使用 colspan 和 rowspan（复杂合并）

<table border="1">
  <tr>
    <th colspan="2" rowspan="2">跨 2 列 2 行</th>
    <th>列 3</th>
    <th>列 4</th>
  </tr>
  <tr>
    <td>数据 1-3</td>
    <td>数据 1-4</td>
  </tr>
  <tr>
    <td>数据 2-1</td>
    <td>数据 2-2</td>
    <td colspan="2">跨 2 列</td>
  </tr>
  <tr>
    <td rowspan="2">跨 2 行</td>
    <td>数据 3-2</td>
    <td>数据 3-3</td>
    <td>数据 3-4</td>
  </tr>
  <tr>
    <td>数据 4-2</td>
    <td colspan="2">跨 2 列</td>
  </tr>
</table>

## 测试场景 4: 课程表示例（实际应用）

<table border="1">
  <thead>
    <tr>
      <th>时间</th>
      <th>星期一</th>
      <th>星期二</th>
      <th>星期三</th>
      <th>星期四</th>
      <th>星期五</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>8:00-9:00</td>
      <td>数学</td>
      <td>英语</td>
      <td>物理</td>
      <td>化学</td>
      <td>生物</td>
    </tr>
    <tr>
      <td>9:00-10:00</td>
      <td rowspan="2">体育（大课）</td>
      <td>历史</td>
      <td>地理</td>
      <td>政治</td>
      <td>音乐</td>
    </tr>
    <tr>
      <td>10:00-11:00</td>
      <td>语文</td>
      <td colspan="2">实验课（跨 2 节）</td>
      <td>美术</td>
    </tr>
    <tr>
      <td>11:00-12:00</td>
      <td>英语</td>
      <td>数学</td>
      <td>化学</td>
      <td>物理</td>
      <td>计算机</td>
    </tr>
  </tbody>
</table>

## 测试场景 5: 无效值处理

<table border="1">
  <tr>
    <td colspan="abc">无效 colspan（字母）</td>
    <td>普通单元格</td>
  </tr>
  <tr>
    <td colspan="-1">无效 colspan（负数）</td>
    <td>普通单元格</td>
  </tr>
  <tr>
    <td colspan="0">无效 colspan（零）</td>
    <td>普通单元格</td>
  </tr>
  <tr>
    <td rowspan="xyz">无效 rowspan（字母）</td>
    <td>普通单元格</td>
  </tr>
</table>

## 测试场景 6: GFM Markdown 表格（确保不受影响）

| 列 1 | 列 2 | 列 3 |
|------|------|------|
| A    | B    | C    |
| D    | E    | F    |
| G    | H    | I    |

这是标准的 GFM Markdown 表格，应该正常显示，不受 colspan/rowspan 功能影响。

## 测试场景 7: 普通 HTML 表格（无合并）

<table border="1">
  <tr>
    <td>A1</td>
    <td>A2</td>
    <td>A3</td>
  </tr>
  <tr>
    <td>B1</td>
    <td>B2</td>
    <td>B3</td>
  </tr>
</table>

## 验证清单

导出 DOCX 后，请在 Microsoft Word 中验证：

### colspan 功能
- [ ] 场景 1：表头合并正确，跨 3 列
- [ ] 场景 1：数据行合并正确，分别跨 2 列和 3 列
- [ ] 场景 4：课程表中"实验课"跨 2 列显示正确

### rowspan 功能
- [ ] 场景 2：第一个单元格跨 3 行显示正确
- [ ] 场景 4：课程表中"体育（大课）"跨 2 行显示正确

### colspan + rowspan 组合
- [ ] 场景 3：复杂表格中同时使用 colspan 和 rowspan 的单元格正确合并
- [ ] 场景 3：表格结构完整，无错位

### 无效值处理
- [ ] 场景 5：无效的 colspan 值（abc、-1、0）被视为 1，表格正常显示
- [ ] 场景 5：无效的 rowspan 值（xyz）被视为 1，表格正常显示

### 向后兼容性
- [ ] 场景 6：GFM Markdown 表格正常显示
- [ ] 场景 7：普通 HTML 表格（无合并）正常显示
- [ ] 所有表格边框和格式正确
