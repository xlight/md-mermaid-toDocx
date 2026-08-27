# docx-export Specification Delta

## ADDED Requirements

### Requirement: 列表缩进级别正确映射

系统 SHALL 正确计算 Markdown 列表的嵌套级别,确保顶级列表(无嵌套)对应 DOCX 的 level 0,嵌套列表依次递增。列表的缩进和项目符号样式必须符合 Word 文档的标准规范。

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

## MODIFIED Requirements

### Requirement: Markdown 列表导出到 DOCX

系统 SHALL 将 Markdown 列表(有序列表、无序列表、任务列表)正确转换为 DOCX 格式,保持嵌套结构,并使用正确的缩进级别和项目符号样式。顶级列表(level 0)必须使用浅缩进和标准的一级项目符号。

#### Scenario: 无序列表正确导出

- **GIVEN** Markdown 文档包含无序列表
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 顶级列表项使用实心圆(●)和 level 0 缩进
- **AND** 二级嵌套使用空心圆(○)和 level 1 缩进
- **AND** 三级嵌套使用方块(■)和 level 2 缩进

#### Scenario: 有序列表正确导出

- **GIVEN** Markdown 文档包含有序列表
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 顶级列表项使用数字格式(1. 2. 3.)和 level 0 缩进
- **AND** 二级嵌套使用小写字母(a) b))和 level 1 缩进
- **AND** 三级嵌套使用小写罗马数字(i. ii.)和 level 2 缩进

#### Scenario: 混合嵌套列表正确导出

- **GIVEN** Markdown 文档包含混合嵌套列表(有序列表内嵌无序列表,反之亦然)
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 每个列表项的缩进级别根据其嵌套深度正确设置
- **AND** 项目符号/编号样式根据列表类型和级别正确选择
- **AND** 嵌套结构在 DOCX 中正确保留
