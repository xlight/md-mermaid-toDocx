## MODIFIED Requirements

### Requirement: 系统 SHALL 基于多层级锚点构建分段单调映射

系统 SHALL 基于以下三类锚点构建 `(editorPos, previewPos)` 对称映射序列，在每对相邻锚点之间做线性插值，整体保持单调递增。

锚点层级：
1. **Segment 起始锚点**：每个 segment（markdown / mermaid / math）的 `sourceStart` 字符偏移对应的编辑器像素位置，与预览中 segment 容器的 `offsetTop`
2. **Segment 结束锚点**：每个 segment 的 `sourceEnd` 对应的编辑器像素位置，与预览中 segment 容器的 `offsetTop + offsetHeight`
3. **Intra-segment 块级锚点**：仅对 markdown segment，遍历预览中的块级子元素（h1-h6, p, pre, table, ul, ol, blockquote, hr），通过文本匹配定位其在源文本中的字符偏移

文本匹配 SHALL 使用递进式游标（searchCursor），每次匹配成功后游标前进至 `localOffset + needle.length`，避免在同一 segment 内重复命中先前匹配位置。

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
- **AND** 重复位置的锚点被合并，合并时保留携带 intra-block 子锚点信息的条目

#### Scenario: 重复内容不导致误命中
- **GIVEN** 同一 markdown segment 内有两个以 ` ```python ` 开头的代码块
- **WHEN** 系统为第二个代码块执行文本匹配
- **THEN** 匹配游标已越过第一个代码块的匹配位置
- **AND** 第二个代码块的锚点正确映射到其在源文本中的实际位置

### Requirement: 系统 SHALL 在稀疏锚点区域应用文本指纹微调

系统 SHALL 仅在锚点稀疏区域（当前锚点区间跨度大于 `anchorDenseThresholdPx`）或锚点不可用时应用文本指纹微调。文本微调在锚点映射结果基础上做有限幅度修正，受 `maxTextAdjustPx` 和 `textWeight` 限制。

文本匹配 SHALL 在两个方向（editor→preview 和 preview→editor）上均执行歧义检测：当最高置信度与次高置信度的差距小于 0.06 时，视为歧义，跳过文本微调。

#### Scenario: 稀疏锚点区域应用文本微调
- **WHEN** 当前锚点区间跨度大于 `anchorDenseThresholdPx`（默认 200px）
- **THEN** 系统计算目标滚动位置时应用文本指纹微调
- **AND** 微调幅度受 `maxTextAdjustPx` 和 `textWeight` 限制

#### Scenario: 文本匹配歧义时不修正（双向）
- **WHEN** 文本匹配存在多个置信度相近的候选（差距 < 0.06），无论同步方向是 editor→preview 还是 preview→editor
- **THEN** 系统忽略文本微调
- **AND** 继续使用锚点映射结果

### Requirement: 系统 SHALL 控制双向滚动互拉

系统 SHALL 通过方向锁（direction lock）和同步状态标记防止编辑区与预览区滚动事件互相触发导致的拉扯循环。

方向锁 SHALL 采用软锁策略：同方向滚动立即响应；反方向滚动在锁定期内不直接跳过，而是应用更大的 deadband 阈值和位移限幅，避免完全阻止用户的主动切换操作。

#### Scenario: 方向锁防止反向触发
- **WHEN** 用户正在滚动编辑区（方向锁 = 'editor'），且冷却时间未到期
- **THEN** 系统对来自预览区的 scroll 事件应用软锁处理（放大 deadband + 限幅），而非直接忽略
- **AND** 冷却时间到期后方向锁自动释放

#### Scenario: 方向锁对反方向采用软锁
- **WHEN** 用户正在滚动编辑区（方向锁 = 'editor'），且冷却时间未到期，用户随后滚动预览区
- **THEN** 系统不直接忽略预览区的 scroll 事件
- **AND** 对预览区的同步目标应用更大的 deadband 阈值和位移限幅
- **AND** 冷却时间到期后方向锁自动释放，恢复正常 deadband

#### Scenario: 同步状态标记防止递归
- **WHEN** 系统正在将编辑区的滚动同步到预览区（`isSyncingScroll = 'editor'`）
- **THEN** 预览区的 scroll 事件回调中检测到来源不匹配，跳过 syncFromPreview

#### Scenario: 小位移不触发同步
- **WHEN** 计算得到的目标位移与当前位置差距小于 `deadbandPx`
- **THEN** 系统不执行滚动更新

### Requirement: 系统 SHALL 在预览重建后重建同步索引

系统 SHALL 在预览内容重新渲染完成后重建锚点索引与文本索引，确保同步映射基于最新 DOM 布局。重建期间使用 `isUpdatingPreview` 标记阻止同步滚动逻辑。

系统 SHALL 同时监听预览区尺寸变化（包括但不限于图片异步加载、字体切换、窗口 resize），在尺寸变化后 debounce 重建锚点索引。

#### Scenario: 内容更新后索引重建
- **WHEN** Markdown、Mermaid 或数学公式导致预览重新渲染
- **THEN** 系统在渲染完成后调用 `rebuildScrollSyncIndex(rawContent, structure)`
- **AND** 随后调用 `rebuildPreviewTextIndex()` 更新文本索引

#### Scenario: 重建期间阻止同步
- **WHEN** `isUpdatingPreview = true`
- **THEN** `syncScroll()` 直接返回，不执行任何同步逻辑

#### Scenario: 预览区尺寸变化后重建索引
- **GIVEN** 预览区包含异步加载的 `<img>` 元素
- **WHEN** 图片加载完成导致预览区 scrollHeight 变化
- **THEN** 系统在 debounce 延迟后重建锚点索引
- **AND** 重建基于最新的 DOM 布局，修正因图片加载导致的锚点偏移

## ADDED Requirements

### Requirement: 系统 SHALL 在重建索引后执行锚点质量自检

系统 SHALL 在 `rebuildScrollSyncIndex` 完成后评估锚点索引质量，包括锚点数量、覆盖率（锚点覆盖的 editorPos 范围占可滚动距离的比例）、以及因单调化合并丢失的锚点比例。质量不足时 SHALL 记录警告并通过调试接口暴露质量指标。

#### Scenario: 锚点质量良好
- **WHEN** 重建后锚点数量充足（≥ 4）且覆盖率高（≥ 80%）
- **THEN** 系统正常使用锚点映射，不记录警告

#### Scenario: 锚点质量不足时记录警告
- **WHEN** 重建后锚点数量不足（< 4）或覆盖率低（< 50%）
- **THEN** 系统通过调试日志记录警告，包含锚点数量、覆盖率、合并丢失数
- **AND** 同步逻辑自动降级到百分比同步（因锚点 < 2 时 mapByAnchors 返回 null）

#### Scenario: 调试接口暴露质量指标
- **WHEN** 执行 `__scrollSyncDebug.getSnapshot()`
- **THEN** 返回结果包含质量指标字段（anchorCount、coverage、mergedLoss）

### Requirement: 系统 SHALL 提供滚动同步不变量自检能力

系统 SHALL 通过 `window.__scrollSyncDebug.runSelfTest()` 提供纯函数不变量自检，验证映射逻辑的数学性质，无需真实 DOM 布局。自检 SHALL 覆盖以下不变量：

1. **mapByAnchors 单调性**：对单调递增的 scrollPos 序列，映射结果单调递增
2. **mapByAnchors 锚点精确**：scrollPos 等于某锚点的 fromKey 时，返回该锚点的 toKey
3. **mapByAnchors 边界 clamp**：超出锚点范围的 scrollPos 返回首/末锚点值
4. **mapByAnchors 双向对称**：editor→preview 再 preview→editor，在锚点位置回到原值
5. **findInSource 三级回退**：精确→模糊→去格式，逐级尝试
6. **findInSource searchFrom**：从指定位置开始搜索，不命中之前内容
7. **单调化归一合并策略**：重复锚点保留非 `-end` 的 segmentId

#### Scenario: 自检全部通过
- **WHEN** 执行 `__scrollSyncDebug.runSelfTest()`
- **THEN** 返回 `{ passed: N, failed: 0, details: [...] }`，所有不变量通过

#### Scenario: 自检发现回归
- **WHEN** 映射逻辑被修改后违反某不变量
- **THEN** `runSelfTest()` 返回 `failed > 0`，details 包含失败的不变量名称和原因

#### Scenario: 纯函数测试页
- **WHEN** 在浏览器中打开 `test/scroll-sync-test.html`
- **THEN** 页面加载并运行纯函数不变量测试
- **AND** 测试结果以可读形式展示（通过/失败/详情）
- **AND** 测试通过 CDN 加载测试框架，不依赖 npm 或构建系统

### Requirement: 系统 SHALL 提供可验证的同步映射不变量

系统 SHALL 通过 `window.__scrollSyncTest` 暴露纯逻辑函数，并 SHALL 提供浏览器内测试页面（`test/scroll-sync-test.html`）验证以下不变量，确保滚动同步的数学正确性可自动化验证：

1. **mapByAnchors 单调性**：对单调递增的 scrollPos 序列，映射结果也单调递增
2. **mapByAnchors 锚点精确**：`scrollPos = anchors[i].editorPos` 时返回 `anchors[i].previewPos`
3. **mapByAnchors 边界 clamp**：超出首/末锚点范围的 scrollPos 返回首/末锚点的映射值
4. **mapByAnchors 对称性**：editor→preview 再 preview→editor，在锚点位置回到原值
5. **findInSource 三级回退**：精确匹配→模糊正则→去格式，逐级尝试
6. **findInSource searchFrom**：从指定位置开始搜索，不命中之前的内容
7. **findInSource 重复内容**：同一 needle 多次出现时，searchFrom 控制命中位置
8. **parseCombinedContentFromTextarea 分割正确**：mermaid/math/markdown 混合输入产生正确的 segment 列表和 sourceStart/sourceEnd
9. **单调化归一合并策略**：重复锚点合并时保留非 `-end` 后缀的 segmentId

#### Scenario: 纯函数不变量测试通过
- **WHEN** 在浏览器中打开 `test/scroll-sync-test.html`
- **THEN** 所有不变量测试自动运行并全部通过
- **AND** 页面显示通过/失败计数和失败详情

#### Scenario: 纯函数通过 __scrollSyncTest 暴露
- **WHEN** 在浏览器控制台执行 `window.__scrollSyncTest`
- **THEN** 返回对象包含 mapByAnchors、findInSource、normalizeSyncText、parseCombinedContentFromTextarea、normalizeAnchors 等纯函数引用
- **AND** 这些函数不依赖 DOM 布局 API（offsetTop/scrollHeight 等）

#### Scenario: mapByAnchors 单调性验证
- **GIVEN** 一组单调递增的 anchors
- **WHEN** 对单调递增的 scrollPos 序列依次调用 mapByAnchors
- **THEN** 返回的映射结果序列也单调递增

#### Scenario: mapByAnchors 对称性验证
- **GIVEN** anchors 数组
- **WHEN** 对锚点 `anchors[i].editorPos` 做 editor→preview 映射，再对结果做 preview→editor 映射
- **THEN** 最终结果等于原始的 `anchors[i].editorPos`

#### Scenario: findInSource 重复内容不误命中
- **GIVEN** 源文本含两个 ` ```python ` 代码块，分别在偏移 100 和 300
- **WHEN** 以 searchFrom=101 搜索 ` ```python `
- **THEN** 命中偏移 300 处的第二个代码块，而非偏移 100 处的第一个

### Requirement: 系统 SHALL 提供运行时同步自检接口

系统 SHALL 通过 `window.__scrollSyncDebug` 扩展以下自检方法，支持在运行时验证同步映射的实际行为：

- `runSelfTest()`：执行纯函数不变量测试子集，返回 `{ passed, failed, details }`
- `verifySync(editorScrollTop)`：在指定编辑器滚动位置验证双向映射，返回 `{ editorToPreview, previewToEditor, roundTripError, anchorSpan }`

#### Scenario: 运行时自检通过
- **WHEN** 在浏览器控制台执行 `__scrollSyncDebug.runSelfTest()`
- **THEN** 返回结果包含 passed/failed 计数
- **AND** failed 为 0 时表示纯函数不变量全部满足

#### Scenario: 双向映射验证
- **GIVEN** 当前锚点索引已建立
- **WHEN** 执行 `__scrollSyncDebug.verifySync(500)`
- **THEN** 返回 editor→preview 映射值、反向映射值、round-trip 误差、所在锚点段跨度
- **AND** roundTripError 在锚点位置为 0
