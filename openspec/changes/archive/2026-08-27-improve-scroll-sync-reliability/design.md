## Context

当前 `scroll-sync` 已实现三层混合策略（结构锚点→文本微调→百分比兜底）+ 抗抖控制，核心架构合理。但实现中存在以下已确认的可靠性缺陷（详见 proposal.md - Why）：

1. 预览区尺寸动态变化（图片加载、字体切换）后不重建索引——无 ResizeObserver
2. `matchEditorByText` 缺少歧义检测，与 `matchPreviewByText` 不对称
3. `findInSource` 的 `searchCursor` 步进仅 +1，重复内容误命中
4. 单调化归一用 `Math.max` 强制合并，丢失段边界锚点
5. 方向锁 150ms 硬阻止，影响快速切换滚动体验

现有代码中 `#documentPreview` 已设置 `position: relative`，segment 级 `offsetTop` 计算正确；mermaid/math 渲染在 `updateFullPreview` 的 for 循环中 await 完成，时序可靠。本次改进不改变核心架构，仅修补缺陷并增加自适应能力。

## Goals / Non-Goals

**Goals:**
- 覆盖预览尺寸动态变化场景，确保锚点索引始终基于最新 DOM 布局
- 双向文本微调行为对齐，消除 preview→editor 方向的误命中
- 重复内容场景下 intra-block 锚点正确映射
- 单调化合并保留关键段边界信息
- 方向锁不阻止用户主动切换滚动方向
- 锚点质量可观测，质量不足时自动降级

**Non-Goals:**
- 不改变三层策略的优先级和整体架构
- 不引入 marked token → source range 的精确映射（长期增强，另案处理）
- 不改变 `syncConfig` 现有参数的默认值（除非新增参数）
- 不重构 `parseCombinedContentFromTextarea` 的 segment 分割逻辑

## Decisions

### 1) ResizeObserver + debounce 重建索引

在 `updateFullPreview` 完成后注册（或更新）一个 `ResizeObserver` 监听 `documentPreviewDiv`。回调中 debounce 200ms 后调用 `rebuildScrollSyncIndex`。

**重要：** ResizeObserver 触发的重建**仅重建锚点索引**，不保存/恢复滚动位置。与 `updateFullPreview` 中的重建不同——`updateFullPreview` 会保存编辑器滚动百分比并在渲染后恢复（L2055-2064），但 ResizeObserver 触发时用户可能正在滚动，保存/恢复会导致跳回之前的百分比位置而非保持当前位置。重建后下一次 scroll 事件会自然基于新索引同步。

**Rationale:** 图片加载、字体切换、窗口 resize 都会改变预览区 scrollHeight，导致锚点 `previewPos` 偏移。ResizeObserver 是浏览器原生 API，能捕获所有尺寸变化来源。200ms debounce 避免渲染过程中频繁重建。

**Alternative discarded:** 监听 `img.onload` — 无法覆盖字体切换和窗口 resize 场景，且需要为每个 img 单独绑定。

### 2) matchEditorByText 补充歧义检测

在 `matchEditorByText` 中收集所有命中候选并按 confidence 排序，当 `hits.length > 1 && |hits[0].confidence - hits[1].confidence| < 0.06` 时返回 null，与 `matchPreviewByText` L1738 逻辑一致。

**Rationale:** spec L98-101 要求双向歧义检测，当前实现只做了一半。

### 3) searchCursor 步进改为实际命中 needle 长度

`findInSource` 匹配成功后，`searchCursor = localOffset + matchedNeedle.length` 而非 `+1`。由于 `findInSource` 有三级回退（精确→模糊正则→去格式），实际命中的 needle 可能不是 `needles[0]`，因此 `findInSource` SHALL 返回实际命中的 needle 及其长度，调用方据此设置 searchCursor。

**Rationale:** `+1` 只前进 1 字符，如果 needle（如 ` ```python `）在源文本中多次出现，第二次搜索会从第一次命中位置 +1 处开始，重新命中第一次匹配的内部。越过整个命中 needle 长度确保游标不再重复命中。若误用 `needles[0].length` 而实际由回退 needle 命中，会导致步进不足或过度。

### 4) 单调化合并保留信息丰富的锚点

当两个锚点的 `editorPos` 和 `previewPos` 都相同时，不直接丢弃后一个，而是比较 `segmentId`：保留不含 `-end` 后缀的（通常是 segment-start 或 intra-block，携带更多定位信息），丢弃 `-end` 类锚点。

**Rationale:** mermaid-end 锚点的 editorPos 常与下一个 markdown-start 相同（都映射到同一行），合并时丢失段边界。保留 start 类锚点能维持后续 intra-block 锚点的参照系。

**Alternative discarded:** 对重复锚点做 +1px 微调保留两者——会引入虚假精度，mapByAnchors 插值时产生微小偏差。

### 5) 方向锁改软锁

反方向滚动在锁定期内不 `return`，而是将 `deadbandPx` 临时放大到 `deadbandPx * 4`（20px），并对位移限幅到 `maxFrameStepPx`（如 100px）。同方向滚动维持原有 `deadbandPx`。

**Rationale:** 硬阻止会将用户的主动切换误判为互拉。软锁允许大位移通过（用户主动切换），但抑制小位移抖动（互拉的特征是小幅高频）。

### 6) 锚点质量自检

`rebuildScrollSyncIndex` 末尾计算：
- `coverage = (lastAnchor.editorPos - firstAnchor.editorPos) / editorDistance`
- `mergedLoss = rawAnchors.length - normalizedAnchors.length`
- `quality = { anchorCount, coverage, mergedLoss }`

存入 `scrollSyncIndex.quality`，在 `getSnapshot()` 中暴露。`coverage < 0.5 || anchorCount < 4` 时 `debugSyncLog` 记录警告。

**Rationale:** 锚点质量不可观测时，同步漂移难以诊断。自检不改变运行时行为（锚点 < 2 时 `mapByAnchors` 已自动返回 null 降级），但提供诊断信息。

### 7) 纯函数暴露策略：window.__scrollSyncTest

当前所有函数定义在 `DOMContentLoaded` 闭包内，外部无法访问。为支持自动化测试，SHALL 在初始化末尾通过 `window.__scrollSyncTest` 暴露以下纯逻辑函数（不依赖 DOM 布局 API）：

- `mapByAnchors(anchors, scrollPos, direction)` — 改为接受 anchors 参数而非读模块级变量
- `findInSource(needles, sourceText, searchFrom)` — 已是纯函数
- `normalizeSyncText(text)` — 已是纯函数
- `parseCombinedContentFromTextarea(rawText)` — 已是纯函数
- `normalizeAnchors(rawAnchors)` — 将单调化归一逻辑提取为独立函数

**Rationale:** 不改变运行时行为，仅暴露已有函数供测试调用。mapByAnchors 需要参数化 anchors 以支持注入测试数据。normalizeAnchors 需从 rebuildScrollSyncIndex 提取为独立函数。

**Alternative discarded:** 提取到独立 ESM 文件 — 项目约束为无构建系统、CDN 依赖，不引入模块化。暴露到 window 是最低成本方案。

### 8) 测试策略分层：浏览器内测试页 + 调试接口自检

**层 1 — 浏览器内测试页（`test/scroll-sync-test.html`）：**
通过 CDN 加载 QUnit，调用 `window.__scrollSyncTest` 暴露的纯函数，验证 9 项不变量（见 specs）。测试页面可独立打开运行，也可在 CI 中用 Playwright headless 自动执行。

**层 2 — 调试接口自检（`__scrollSyncDebug` 扩展）：**
- `runSelfTest()`：执行层 1 的子集，返回 JSON 结果，方便控制台快速验证
- `verifySync(editorScrollTop)`：在真实运行环境中验证双向映射精度和 round-trip 误差

**层 3 — Playwright E2E（可选，独立于本项目）：**
独立 `test/e2e/` 目录，不修改本项目的文件结构。启动 HTTP 服务后用 Playwright 自动化滚动操作，验证真实浏览器中的同步精度。此层为可选增强，不阻塞本次变更。

**Rationale:** 项目约束为无构建系统、无 npm 依赖，因此选择 CDN 加载测试框架的浏览器内测试方案。纯函数不变量测试 ROI 最高——覆盖单调性、对称性、边界等数学性质，无需 DOM 布局。调试接口自检复用现有 `__scrollSyncDebug` 架构，零额外依赖。

## Risks / Trade-offs

- **ResizeObserver 频繁触发** → 200ms debounce + 仅监听 `documentPreviewDiv`（不监听子元素），限制回调频率
- **软锁降低抗抖效果** → 限幅 + 放大 deadband 仍能抑制小幅互拉，仅放行用户主动的大位移切换；需实测验证参数
- **searchCursor +needle.length 跳过合法重复** → needle 通常是足够特异的文本（标题、代码首行），跳过整个 needle 长度不会遗漏合法的后续匹配；若 needle 极短（如单字标题），findInSource 的三级回退已用更长的 needle
- **单调化合并策略改变** → 仅影响 `editorPos && previewPos` 完全相同的锚点对，不影响有差异的锚点；需验证不产生非单调序列
- **ResizeObserver 重建重置滚动位置** → ResizeObserver 触发的重建 SHALL 仅调用 `rebuildScrollSyncIndex`，不保存/恢复滚动位置（与 `updateFullPreview` 中的重建不同）。用户可能在图片加载时正在滚动，重置会造成跳变。重建后下一次 scroll 事件会自然基于新索引同步
