## Context

当前实现仅通过 `scrollTop` 百分比在编辑区与预览区之间同步，算法简单但在异构内容高度下会偏移：
- Mermaid/MathJax 块导致预览高度局部膨胀
- Markdown 文本与预览排版行高不一致
- 异步渲染使映射在渲染前后变化

用户明确期望"混合处理同步滚动"，并接受分段比例与阶段性非均匀速度。关键难点已经从"算目标位置"转为"如何避免跳动"。

## Goals / Non-Goals

**Goals:**
- 提供混合同步策略：结构锚点映射（主）+ 文本指纹微调（辅）+ 百分比降级（兜底）
- 支持分段映射，不同内容区段允许不同滚动比例
- 实现块级精度的顶部对齐——编辑器某标题在视口顶部时，预览中对应标题也在视口顶部
- 在双向滚动中显著减少突跳、抖动和来回拉扯
- 在锚点不足时可稳定降级到百分比同步

**Non-Goals:**
- 不保证逐像素绝对一致（目标是块级别的内容位置对齐）
- 不在本次引入外部依赖库
- 不在本次实现复杂可视化调参面板（仅保留轻量调试开关）

## Decisions

### 1) 锚点 100% 信任，不与百分比混合

锚点映射可用时，目标位置 = 锚点分段线性插值结果，不乘以任何百分比权重。

**Rationale:** 早期实现用 `segmentWeight = 0.95` 混合锚点和百分比，但即使 5% 的百分比混入，当两者差距 200px 时也会产生 10px（约半行）的偏移。去掉百分比混合后锚点精度完全传递到最终结果。

**历史:** 初始设计使用 `segmentWeight = 0.72`，后调至 0.95，最终移除该参数改为 100% 信任。

### 2) 三层级锚点：segment-start + segment-end + intra-block

每个 segment 生成起始和结束两个锚点；markdown segment 额外生成块级元素锚点。

**Rationale:**
- **Segment-end 锚点**解决了 mermaid/math 段的高度差异问题——源码 15 行的图表渲染出 400px 高度，没有结束锚点时后续段落的映射起点就不准确。
- **Intra-block 锚点**实现标题/段落/表格等元素的精确对齐。
- 三层锚点结合后，锚点密度足以覆盖大多数块级边界。

### 3) 编辑器像素位置用 paddingTop + lineNumber × lineHeight

Textarea 的 scrollTop 直接对应内容区的像素偏移。第 n 行的 scrollTop = paddingTop + n × lineHeight。

**Rationale:** 早期实现使用 `lineRatio × editorDistance`（比例映射），但 `editorDistance = scrollHeight - clientHeight`，而非 `totalLines × lineHeight`。比例映射将 `clientHeight` 的扣除均匀分摊到所有行上，导致越靠后的行偏移越大（565 行文档中第 248 行偏移约 15 行 / 345px）。

**Alternative discarded:** 字符偏移比例映射 `charOffset / totalChars × editorDistance` — 这更糟，因为 mermaid 代码块每行字符少但行数多。

### 4) 文本指纹微调仅在锚点稀疏区域生效

引入 `anchorDenseThresholdPx = 200`，当前锚点区间跨度小于此阈值时跳过文本微调。

**Rationale:** 密集锚点区域（每 100-200px 有一个锚点），锚点本身的线性插值已足够精确。文本匹配的结果可能因重复文本、格式差异等原因偏离真实位置，在密集区域反而引入噪声。

### 5) 去 markdown 格式后匹配提高锚点覆盖率

`findInSource` 在精确匹配和模糊正则都失败时，去掉 markdown 内联格式符号（`*`、`` ` ``、`~`、`[]()` ）后再做子串搜索。

**Rationale:** 预览元素的 `textContent` 是纯文本（已渲染），但源文本含格式符号。如 `这是 **粗体** 文本` vs. `这是 粗体 文本`。不做去格式匹配会导致段落/列表等元素匹配失败，退化为线性插值。

### 6) 抗跳动采用直接赋值 + 方向锁 + 死区

去掉增量平滑（`requestAnimationFrame` 动画逼近），改为直接赋值 `scrollTop`。通过方向锁（direction lock + 冷却时间）和同步状态标记（`isSyncingScroll`）防止双向互拉。

**Rationale:** 增量平滑在首次实现中导致严重问题——每帧只移 `alpha × delta` 像素但没有 rAF 循环驱动后续帧，目标永远追不上。直接赋值配合方向锁在实测中足够稳定。

### 7) #documentPreview 添加 position: relative

确保预览容器的子元素 `offsetTop` 正确地相对于滚动容器，而非更上层的定位祖先元素。

**Rationale:** 没有 `position: relative` 时，`offsetTop` 的参考点取决于浏览器的 `offsetParent` 解析规则，在不同布局下可能指向 `<body>` 或其他定位元素，导致锚点 `previewPos` 全部错误。

### 8) mapByAnchors 使用二分查找

锚点数量可达 150+ 个（每个 segment 2 个 + markdown 段内 N 个块级元素），用二分查找 O(log n) 替代线性扫描 O(n)。

**Rationale:** 滚动事件 60fps，每帧调用 mapByAnchors 1 次 + computeSyncTarget 中查找锚点区间跨度 1 次。线性扫描在当前规模可接受，但二分查找是更正确的选择。

## Risks / Trade-offs

- **锚点重建开销** → 仅在预览重建完成后执行，滚动中不重建。构建 lineBreaks 数组 + 遍历 DOM = O(n) 一次性开销
- **文本匹配误命中** → 三级回退（精确 → 模糊正则 → 去格式）+ 单调性检查丢弃乱序结果 + 文本微调仅在稀疏区域且高置信度下生效
- **双向滚动互相触发** → 方向锁（`syncDirectionLock` + `lockMs = 150`）+ 同步状态标记（`isSyncingScroll` 区分方向）
- **去格式匹配性能** → 仅在前两级匹配都失败时构建 stripMap，且只处理当前 segment 的源文本片段
- **offsetTop 依赖 position: relative** → 已在 CSS 中添加，需确保后续 CSS 修改不移除此属性

## Final Parameters

```
deadbandPx = 5                  // 小于此像素差不触发同步
lockMs = 150                    // 方向锁冷却时间
textWeight = 0.15               // 文本微调权重系数
textWindowPx = 520              // 文本搜索邻域窗口
textConfidenceThreshold = 0.7   // 文本匹配置信度门限
maxTextAdjustPx = 80            // 文本微调最大像素偏移
anchorDenseThresholdPx = 200    // 锚点间距小于此值时跳过文本微调
```

### 已移除的参数

- `segmentWeight`：改为 100% 信任锚点，不再需要权重
- `maxStepPx`、`minAlpha`、`maxAlpha`、`hysteresisPx`：随增量平滑一起移除

## Parameter Evolution History

| 阶段 | 关键变化 | 原因 |
|------|---------|------|
| v1 初始设计 | `segmentWeight=0.72`, `textWeight=0.28`, 含增量平滑参数 | 保守起步 |
| v2 Bug Fix | `segmentWeight=0.75`, 移除增量平滑 | 增量平滑无 rAF 续航导致混乱 |
| v3 精度提升 | `segmentWeight=0.95`, `textWeight=0.15` | 提高锚点权重 |
| v4 最终版 | 移除 `segmentWeight`（=1.0），增加 `anchorDenseThresholdPx=200` | 100% 信任锚点，文本微调限于稀疏区域 |

## Architecture Overview

```
滚动事件 (editor/preview scroll)
    │
    ▼
syncScroll(sourceType, sourceElement, targetElement)
    │
    ├── 检查 isUpdatingPreview → 如是，跳过
    ├── 检查 workspaceMode → 非 SPLIT 时跳过
    ├── 检查 isSyncingScroll → 方向不匹配时跳过
    ├── 检查 syncDirectionLock → 冷却期内反向事件跳过
    │
    ▼
computeSyncTarget(sourceType, sourceElement, targetElement)
    │
    ├── 计算 percentFallback = sourcePercent × targetDistance
    │
    ├── mapByAnchors(scrollPos, direction)  ← 二分查找 + 分段线性插值
    │   │
    │   └── 锚点数据来自 rebuildScrollSyncIndex():
    │       ├── [start]  editorPos=0, previewPos=0
    │       ├── [segment-start]  paddingTop + lineNum × lineHeight ↔ offsetTop
    │       ├── [segment-end]    paddingTop + lineNum × lineHeight ↔ offsetTop + offsetHeight
    │       ├── [intra-block]    文本匹配定位 ↔ block.offsetTop (遍历 offsetParent)
    │       └── [end]  editorDistance ↔ previewDistance
    │
    ├── 判断锚点区间跨度 → 密集(<200px)则跳过文本微调
    │
    └── applyTextRefinement()  ← 仅稀疏区域
        ├── getEditorTopFingerprint() / getPreviewTopFingerprint()
        └── matchPreviewByText() / matchEditorByText()
            └── 邻域搜索 + 置信度门限 + 歧义过滤
    │
    ▼
deadband 检查 → 差值 < 5px 则跳过
    │
    ▼
targetElement.scrollTop = targetTop  (直接赋值)
    │
    ▼
设置 isSyncingScroll = sourceType
设置 syncDirectionLock + lockMs 冷却
setTimeout 释放 isSyncingScroll
```

### 锚点索引构建流程 (rebuildScrollSyncIndex)

```
输入: rawContent (textarea 原文), structure (parseCombinedContentFromTextarea 结果)
    │
    ├── 构建 lineBreaks[] 数组: 每行起始字符偏移
    ├── 获取 editorStyle: lineHeight, paddingTop
    ├── 定义 charOffsetToEditorPos(): 二分查找行号 → paddingTop + line × lineHeight
    │
    ├── 遍历 structure:
    │   ├── segment 起始锚点: charOffsetToEditorPos(sourceStart) ↔ previewNode.offsetTop
    │   ├── segment 结束锚点: charOffsetToEditorPos(sourceEnd) ↔ offsetTop + offsetHeight
    │   └── [markdown only] buildIntraSegmentAnchors():
    │       ├── 收集块级子元素 (h1-h6, p, pre, table, ul, ol, blockquote, hr)
    │       ├── 第一遍: extractSearchNeedles() → findInSource() 文本匹配
    │       │   └── 三级回退: 精确 → 模糊正则 → 去 markdown 格式
    │       ├── 第二遍: 去乱序 (丢弃非单调递增结果)
    │       ├── 第三遍: 线性插值 (填充未匹配项)
    │       └── 生成锚点: charOffsetToEditorPos(charOffset) ↔ block 绝对 offsetTop
    │
    ├── 排序: editorPos 升序, previewPos 升序
    ├── 单调化归一: 确保两轴均单调递增, 合并重复
    │
    └── 输出: scrollSyncIndex.anchors[]
```
