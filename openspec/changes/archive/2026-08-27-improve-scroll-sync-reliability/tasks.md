## 1. 快速修复：文本匹配与单调化

- [x] 1.1 修复 `matchEditorByText` 歧义检测：收集所有命中候选按 confidence 排序，当 `hits.length > 1 && |hits[0].confidence - hits[1].confidence| < 0.06` 时返回 null
- [x] 1.2 修复 `findInSource` 的 `searchCursor` 步进：`findInSource` 返回实际命中的 needle 及偏移，匹配成功后 `searchCursor = localOffset + matchedNeedle.length`（当前为 `+1`，且未返回命中 needle）
- [x] 1.3 改进单调化归一合并策略：当 editorPos 和 previewPos 都相同时，保留不含 `-end` 后缀的 segmentId，丢弃 `-end` 类锚点

## 2. ResizeObserver 尺寸变化监听

- [x] 2.1 在 `updateFullPreview` 的索引重建后注册 `ResizeObserver` 监听 `documentPreviewDiv`，回调 debounce 200ms 后仅调用 `rebuildScrollSyncIndex`（不保存/恢复滚动位置，与 updateFullPreview 中的重建不同）
- [x] 2.2 确保重复渲染时 disconnect 旧 observer 再注册新的，避免重复回调
- [x] 2.3 重建期间设置 `isUpdatingPreview = true`，重建完成后释放

## 3. 方向锁软锁改造

- [x] 3.1 在 `syncConfig` 新增 `reverseDeadbandMultiplier`（默认 4）和 `maxFrameStepPx`（默认 100）
- [x] 3.2 修改 `syncScroll`：反方向滚动在锁定期内不直接 return，改为应用 `deadbandPx * reverseDeadbandMultiplier` 和位移限幅
- [x] 3.3 同方向滚动维持原有 `deadbandPx`，不引入限幅

## 4. 锚点质量自检

- [x] 4.1 在 `rebuildScrollSyncIndex` 末尾计算 `coverage`、`mergedLoss`，存入 `scrollSyncIndex.quality`
- [x] 4.2 `coverage < 0.5 || anchorCount < 4` 时通过 `debugSyncLog` 记录警告
- [x] 4.3 在 `__scrollSyncDebug.getSnapshot()` 返回结果中增加 `quality` 字段（anchorCount、coverage、mergedLoss）

## 5. 纯函数暴露与测试基础设施

- [x] 5.1 在初始化末尾通过 `window.__scrollSyncTest` 暴露纯函数：mapByAnchors（参数化 anchors）、findInSource、normalizeSyncText、parseCombinedContentFromTextarea、extractSearchNeedles、charOffsetToEditorPos（参数化 lineBreaks/paddingTop/lineHeight/editorDistance）
- [x] 5.2 将单调化归一逻辑从 `rebuildScrollSyncIndex` 提取为独立函数 `normalizeAnchors(rawAnchors)`，并暴露到 `__scrollSyncTest`
- [x] 5.3 将 `matchPreviewByText` 和 `matchEditorByText` 参数化（接受 previewTextIndex 和 textContent 参数），暴露到 `__scrollSyncTest`
- [x] 5.4 创建 `test/scroll-sync-test.html`，CDN 加载 QUnit，编写纯函数不变量测试：
  - mapByAnchors: 单调性/锚点精确/边界 clamp/双向对称性
  - findInSource: 三级回退/searchFrom/重复内容不误命中
  - parseCombined: 分割正确/sourceStart-sourceEnd 对应原文
  - normalizeAnchors: 强制单调/合并策略保留非 -end
  - charOffsetToEditorPos: 行首/行中/超长/空文本
  - extractSearchNeedles: h1-h6/pre/table/p/ul-ol/blockquote/hr
  - matchPreviewByText: 无候选/单候选高置信/歧义检测
  - matchEditorByText: 同上 + 歧义检测对称性
- [x] 5.5 扩展 `__scrollSyncDebug`：新增 `runSelfTest()` 执行纯函数不变量全套，返回 `{ passed, failed, details }`
- [x] 5.6 扩展 `__scrollSyncDebug`：新增 `verifySync(editorScrollTop)` 在指定位置验证双向映射，返回 `{ editorToPreview, previewToEditor, roundTripError, anchorSpan }`
- [x] 5.7 扩展 `__scrollSyncDebug`：新增 `verifySyncRange(points)` 多点采样验证，返回每个点的 round-trip 误差和连续性检查结果

## 6. E2E 测试文档与 Playwright 集成

- [x] 6.1 创建 `test/fixtures/` 目录，编写 6 类测试文档：纯文本、mermaid 密集、math 密集、含图片、含表格+代码块、混合全类型
- [x] 6.2 创建 `test/e2e/scroll-sync.spec.js` Playwright 测试脚本（全局安装 Playwright，不修改本项目 package.json）：加载各 fixture → 编辑器滚动到 N 个采样点 → 断言预览 scrollTop 在容差内
- [x] 6.3 Playwright 测试：图片加载后索引重建验证 — 加载含图片 fixture → 等待 img.onLoad → 断言 `scrollSyncIndex.quality` 已更新
- [x] 6.4 Playwright 测试：双向 round-trip — 编辑器→预览→编辑器 → 断言回到近似原位（容差 deadbandPx）
- [x] 6.5 Playwright 测试：抗抖控制 — 快速来回滚动 5 次 → 断言不产生互拉循环
- [x] 6.6 Playwright 测试：异步渲染后稳定 — mermaid 渲染前后断言同步不跳变
- [x] 6.7 创建 `test/e2e/README.md` 说明如何运行 E2E 测试（全局安装 Playwright + 启动 HTTP 服务 + 运行命令）

## 7. 验证与回归

- [x] 7.1 自动化验证：在浏览器中打开 `test/scroll-sync-test.html`，确认所有纯函数不变量测试通过
- [x] 7.2 自动化验证：在控制台执行 `__scrollSyncDebug.runSelfTest()`，确认 failed=0
- [x] 7.3 自动化验证：执行 Playwright E2E 测试 `node test/e2e/scroll-sync.spec.js`，确认全部通过
- [x] 7.4 自动化验证：执行 `__scrollSyncDebug.verifySyncRange([0, 100, 300, 600, 1000])` 多点采样，确认 round-trip 误差在容差内
- [x] 7.5 手动验证：含图片的 markdown 文档，图片加载后同步不漂移
- [x] 7.6 手动验证：含多个相同语言代码块的文档，intra-block 锚点不误命中
- [x] 7.7 手动验证：从预览区快速切换到编辑区滚动，方向锁不硬阻止
- [x] 7.8 手动验证：Mermaid/MathJax 异步渲染后同步不跳动（回归）
- [x] 7.9 验证导出、打印、主题与模式切换功能无回归
- [x] 7.10 启用 `__scrollSyncDebug.setEnabled(true)` 验证质量指标输出与警告日志
