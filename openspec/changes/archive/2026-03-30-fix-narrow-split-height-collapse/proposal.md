# Proposal: Fix Narrow-Screen Split Height Collapse

## Why

当前窄屏（<1024px）下的上下分栏在预览内容增长后会持续挤压编辑区高度，导致编辑区可视空间不断缩小，影响连续输入体验。该问题已在真实使用中复现，需尽快通过布局约束保证编辑区和预览区的稳定可用性。

## What Changes

1. 调整窄屏 split 模式的高度分配策略，从“内容驱动挤压”改为“弹性分配 + 最小高度约束”。
2. 明确编辑区与预览区在窄屏 split 下的最小高度要求，超过内容通过各自内部滚动承载。
3. 补充极短视口（含移动端软键盘弹出）下的兜底行为，避免出现某一侧高度塌陷到不可用。
4. 将该行为写入 workspace-layout 规范，作为后续改动和回归测试基线。

## Capabilities

### New Capabilities

- （无）

### Modified Capabilities

- `workspace-layout`: 更新窄屏 split 模式的高度分配要求、最小高度约束和极端视口下的回退行为。

## Impact

- 修改 `styles.css`：新增/调整窄屏分栏高度与最小高度规则。
- 可能修改 `app.js`：在模式切换、窗口变化和极短视口场景下应用或回退布局策略。
- 更新 `openspec/specs/workspace-layout/spec.md` 对应 delta：补充可验证的需求与场景。
