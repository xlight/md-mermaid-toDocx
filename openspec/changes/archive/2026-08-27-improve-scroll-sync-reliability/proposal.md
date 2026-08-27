## Why

混合滚动同步（`scroll-sync`）已实现并归档，但在实际使用中存在多处可靠性薄弱点：预览区图片加载后锚点失效导致漂移、intra-block 文本匹配对重复内容误命中、preview→editor 方向缺少歧义检测、单调化归一丢失关键边界锚点。这些缺陷在含图片、多代码块、或从预览区反向滚动的场景下会显著降低同步精度。

## What Changes

- 新增预览区尺寸变化监听（ResizeObserver），在图片加载、字体切换、窗口 resize 等场景下自动重建锚点索引
- 修复 `matchEditorByText` 缺失的歧义检测，与 `matchPreviewByText` 行为对齐
- 修复 `findInSource` 的 `searchCursor` 步进过小导致重复内容误命中
- 改进单调化归一策略，合并重复锚点时保留信息更丰富的条目，避免丢失段边界
- 方向锁由硬阻止改为软锁（限幅 + 更大 deadband），改善快速切换滚动方向的体验
- 新增锚点质量自检：重建索引后评估覆盖率与密度，质量不足时记录警告并考虑降级

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `scroll-sync`: 修改锚点索引重建时机（新增尺寸变化触发）、文本匹配歧义检测（双向对齐）、单调化归一策略、方向锁行为

## Impact

- `app.js`:
  - `rebuildScrollSyncIndex` — 新增 ResizeObserver 触发路径（debounce 重建）
  - `matchEditorByText` — 补充歧义检测逻辑
  - `findInSource` — 修改 searchCursor 步进策略
  - 单调化归一 — 改进合并逻辑
  - `syncScroll` — 方向锁从硬阻止改为软锁
  - 新增锚点质量自检函数
- `styles.css`: 无变更
- 性能：ResizeObserver 回调需 debounce（~200ms），避免频繁重建索引
