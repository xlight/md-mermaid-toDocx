# Scroll Sync Specification

## Purpose

Define the requirements for synchronizing scroll position between the editor (textarea) and preview (rendered HTML) panes. The sync strategy must handle heterogeneous content heights (mermaid diagrams, math formulas) and maintain block-level alignment accuracy.

## Requirements

### Requirement: 系统 SHALL 使用三层混合同步滚动策略

系统 SHALL 在编辑区与预览区同步滚动时采用三层策略，按优先级依次为：结构锚点分段映射（主）、文本指纹微调（辅）、百分比同步（兜底）。锚点可用时 100% 使用锚点映射结果，不与百分比混合。

#### Scenario: 锚点可用时完全使用锚点映射
- **WHEN** 用户滚动编辑区或预览区，且结构锚点索引可用
- **THEN** 系统 100% 依据锚点分段映射计算目标滚动位置
- **AND** 不混合百分比同步结果

#### Scenario: 锚点不可用时自动降级
- **WHEN** 锚点索引为空或包含不足 2 个锚点
- **THEN** 系统自动回退到百分比同步

### Requirement: 系统 SHALL 基于多层级锚点构建分段单调映射

系统 SHALL 基于以下三类锚点构建 `(editorPos, previewPos)` 对称映射序列，在每对相邻锚点之间做线性插值，整体保持单调递增。

锚点层级：
1. **Segment 起始锚点**：每个 segment（markdown / mermaid / math）的 `sourceStart` 字符偏移对应的编辑器像素位置，与预览中 segment 容器的 `offsetTop`
2. **Segment 结束锚点**：每个 segment 的 `sourceEnd` 对应的编辑器像素位置，与预览中 segment 容器的 `offsetTop + offsetHeight`
3. **Intra-segment 块级锚点**：仅对 markdown segment，遍历预览中的块级子元素（h1-h6, p, pre, table, ul, ol, blockquote, hr），通过文本匹配定位其在源文本中的字符偏移

#### Scenario: Mermaid/Math 段的高度差异被精确映射
- **GIVEN** 一个 mermaid 代码块在编辑器中占 15 行，但渲染后预览中占 400px
- **WHEN** 用户滚动经过该区域
- **THEN** 系统通过 segment 起始/结束锚点对精确地约束该区段的映射比例
- **AND** 不影响前后 markdown 段的映射精度

#### Scenario: Markdown 段内块级元素顶部对齐
- **GIVEN** 一个 markdown segment 内有标题 "### XY 图表"
- **WHEN** 该标题滚动到编辑区视口顶部
- **THEN** 预览区对应的 `<h3>XY 图表</h3>` 也应位于视口顶部附近
- **AND** 对齐精度依赖于文本匹配是否成功定位了该标题在源文本中的位置

#### Scenario: 映射结果保持单调
- **WHEN** 系统对原始锚点排序后执行单调化归一
- **THEN** 归一后的 editorPos 和 previewPos 序列均单调递增
- **AND** 重复位置的锚点被合并

### Requirement: 编辑器像素位置 SHALL 基于行号精确计算

系统 SHALL 使用 `paddingTop + lineNumber × lineHeight` 计算 textarea 中字符偏移对应的像素位置（scrollTop 值），而非使用比例映射（`charRatio × scrollableDistance`）。

#### Scenario: 字符偏移转换为行号再转换为像素
- **GIVEN** textarea 的 `paddingTop = 15px`，`lineHeight = 22.4px`
- **WHEN** 某个 segment 的 `sourceStart` 对应第 100 行
- **THEN** 计算得到的 `editorPos = 15 + 100 × 22.4 = 2255px`
- **AND** 行号通过对 lineBreaks 数组的二分查找获得

### Requirement: Intra-segment 锚点 SHALL 使用三遍匹配策略

系统 SHALL 对 markdown segment 内的块级元素采用三遍策略确定其在源文本中的字符偏移：

1. **第一遍：文本匹配** — 从预览元素提取搜索针（needles），在源文本中按顺序搜索。搜索支持三级回退：精确子串匹配 → 模糊正则匹配（忽略空格差异）→ 去 markdown 格式后匹配（去除 `*`、`` ` ``、`~`、`[]()` 等格式符号）
2. **第二遍：去乱序** — 确保匹配到的字符偏移序列单调递增，丢弃乱序结果
3. **第三遍：线性插值** — 对未匹配的块元素，用前后已匹配的邻居做线性插值

#### Scenario: 标题元素精确匹配
- **GIVEN** 预览中有 `<h3>功能特性</h3>`
- **WHEN** 系统在源文本中搜索 "功能特性"
- **THEN** 命中 `### 功能特性` 所在位置
- **AND** 返回该行的字符偏移

#### Scenario: 含格式符号的段落匹配
- **GIVEN** 源文本为 `这是 **粗体** 文本`，预览元素文本为 "这是 粗体 文本"
- **WHEN** 精确匹配和模糊正则均失败
- **THEN** 系统去掉源文本中的 `**` 后再匹配
- **AND** 成功定位到该段落的字符偏移

#### Scenario: 匹配失败时线性插值
- **GIVEN** 某个块元素的所有搜索针均未命中
- **WHEN** 前一个已匹配元素在字符偏移 500，后一个在字符偏移 800
- **THEN** 该元素的偏移按位置比例插值于 [500, 800] 之间

### Requirement: 文本指纹微调 SHALL 仅在锚点稀疏区域生效

系统 SHALL 在锚点密集区域（相邻锚点间距小于阈值）时跳过文本指纹微调，仅在锚点稀疏区域或百分比降级模式下启用。

#### Scenario: 密集锚点区域跳过文本微调
- **GIVEN** 当前滚动位置所在的锚点区间跨度为 80px（小于 `anchorDenseThresholdPx = 200`）
- **WHEN** 系统计算目标滚动位置
- **THEN** 跳过文本指纹微调，直接使用锚点映射结果

#### Scenario: 稀疏锚点区域启用文本微调
- **GIVEN** 当前锚点区间跨度为 500px
- **WHEN** 系统计算目标滚动位置
- **THEN** 在锚点映射结果基础上应用文本指纹微调
- **AND** 微调幅度受 `maxTextAdjustPx` 和 `textWeight` 限制

#### Scenario: 文本匹配歧义时不修正
- **WHEN** 文本匹配存在多个置信度相近的候选（差距 < 0.06）
- **THEN** 系统忽略文本微调
- **AND** 继续使用锚点映射结果

### Requirement: 系统 SHALL 控制双向滚动互拉

系统 SHALL 通过方向锁（direction lock）和同步状态标记防止编辑区与预览区滚动事件互相触发导致的拉扯循环。

#### Scenario: 方向锁防止反向触发
- **WHEN** 用户正在滚动编辑区（方向锁 = 'editor'），且冷却时间未到期
- **THEN** 系统忽略来自预览区的 scroll 事件
- **AND** 冷却时间到期后方向锁自动释放

#### Scenario: 同步状态标记防止递归
- **WHEN** 系统正在将编辑区的滚动同步到预览区（`isSyncingScroll = 'editor'`）
- **THEN** 预览区的 scroll 事件回调中检测到来源不匹配，跳过 syncFromPreview

#### Scenario: 小位移不触发同步
- **WHEN** 计算得到的目标位移与当前位置差距小于 `deadbandPx`
- **THEN** 系统不执行滚动更新

### Requirement: 系统 SHALL 在预览重建后重建同步索引

系统 SHALL 在预览内容重新渲染完成后重建锚点索引与文本索引，确保同步映射基于最新 DOM 布局。重建期间使用 `isUpdatingPreview` 标记阻止同步滚动逻辑。

#### Scenario: 内容更新后索引重建
- **WHEN** Markdown、Mermaid 或数学公式导致预览重新渲染
- **THEN** 系统在渲染完成后调用 `rebuildScrollSyncIndex(rawContent, structure)`
- **AND** 随后调用 `rebuildPreviewTextIndex()` 更新文本索引

#### Scenario: 重建期间阻止同步
- **WHEN** `isUpdatingPreview = true`
- **THEN** `syncScroll()` 直接返回，不执行任何同步逻辑

### Requirement: 系统 SHALL 提供调试接口

系统 SHALL 通过 `window.__scrollSyncDebug` 对象提供滚动同步调试能力，方便开发和问题诊断。

#### Scenario: 启用调试日志
- **WHEN** 在浏览器控制台执行 `__scrollSyncDebug.setEnabled(true)`
- **THEN** 每次同步滚动事件输出详细日志，包括：源位置、映射模式（anchor/percent-fallback）、锚点结果、百分比结果、最终目标、实际差值、所在锚点段、锚点总数

#### Scenario: 查看锚点快照
- **WHEN** 执行 `__scrollSyncDebug.getSnapshot()`
- **THEN** 返回当前锚点列表（含 segmentId、editorPos、previewPos）、配置参数、方向锁状态

#### Scenario: 实时监控
- **WHEN** 执行 `__scrollSyncDebug.watch()`
- **THEN** 每 500ms 输出当前编辑器/预览滚动位置及所在锚点段
- **AND** 再次调用停止监控
