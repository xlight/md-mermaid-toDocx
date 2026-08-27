# Change: 升级 beautiful-mermaid 0.1.3 → 1.1.3

## Why

当前项目使用 `beautiful-mermaid@0.1.3`（2026-01-29 发布），这是该库的首个可用版本。经过 1 个月迭代，库已发布到 `1.1.3`（2026-02-26），跨过 1.0 大版本，带来显著的能力提升和 bug 修复。

升级的核心动机：

1. **图表类型覆盖不足** — 0.1.3 的 state 图支持存在问题，已在 `app.js` 中临时移除；xychart 完全不支持。1.1.3 修复了 state 图并新增 xychart（bar/line/combined）。
2. **主题数量落后** — 0.1.3 主题数较少；1.1.3 提供 15 套内置主题（zinc/tokyo-night/catppuccin/nord/dracula/github/solarized/one-dark 等），与 chathub-r 等现代应用一致。
3. **布局质量差距** — 0.1.3 使用 dagre 布局；1.0.0 起改用 ELK.js，边路由和子图处理更好，shape-aware edge clipping 让边终止于实际形状边界而非包围盒。
4. **渲染细节落后** — 1.0.0+ 新增语义 data 属性、改进箭头标记、更好的边标签药丸样式、多行标签 `<br>` 支持、内联格式化（bold/italic/underline/strikethrough）。

## What Changes

### CDN 版本升级

- `index.html` 中 `beautiful-mermaid@0.1.3` → `beautiful-mermaid@1.1.3`
- 确认 `beautiful-mermaid.browser.global.js` 文件名在 1.1.3 仍然存在（1.1.2 release notes 提到 dual exports，需验证 browser global bundle 路径）

### 图表类型支持扩展

- `app.js` 中 `supportedTypes` 数组加回 `'state'`（0.1.3 因 bug 移除，1.1.3 已修复）
- 新增 `'xychart'` 支持（1.1.0 引入，bar/line/combined）
- 支持类型从 4 种（Flowchart/Sequence/Class/ER）扩展到 6 种

### 主题系统适配

- 检查 `THEMES` 对象结构在 0.1.3 → 1.1.3 之间是否变化
- 检查 `renderMermaid()` API 签名是否变化（1.0.0 新增 `nodeSpacing`/`layerSpacing`/`componentSpacing`/`thoroughness` 布局选项）
- 1.0.0 新增 `fromShikiTheme()` API，可选集成 Shiki 主题（非本次必须）

### **BREAKING** — 布局引擎变更

- 1.0.0 将 dagre 替换为 ELK.js（API 不变，但布局结果会不同）
- 现有图表的视觉布局会变化（节点位置、边路径可能不同）——这是预期改进，但需回归测试

### 文档更新

- `AGENTS.md` 依赖版本号更新
- `default.md` 中"state 暂时移除"注释删除
- `default.md` 新增 xychart 示例

## Capabilities

### New Capabilities

- `xychart-support`: xychart-beta 语法支持（bar/line/combined 图表）

### Modified Capabilities

- `mermaid-rendering`: beautiful-mermaid 版本升级，支持类型扩展（+state, +xychart），布局引擎变更（dagre → ELK.js），主题数量增加

## Impact

### 影响的代码

- `index.html` — 1 行 CDN URL 变更
- `app.js` — `supportedTypes` 数组扩展（+2 行），可能的主题/API 适配（~10-20 行）
- `default.md` — 删除 state 移除注释，新增 xychart 示例
- `AGENTS.md` — 版本号更新

### 影响的规范

- `specs/mermaid-rendering` — MODIFIED: 支持类型扩展，布局引擎变更
- `specs/xychart-support` — NEW: xychart 渲染能力

### 破坏性变更

**BREAKING**:
- 布局引擎 dagre → ELK.js，现有图表视觉布局会变化（改进方向，但需回归）
- 0.1.3 的 `tsup.config.ts` 已移除（不影响 CDN 使用方）

### 风险

1. **API breaking changes** — 0.1.3 → 1.1.3 跨 1.0 大版本，`renderMermaid()` / `THEMES` API 可能有变化。缓解：升级前对比 0.1.3 和 1.1.3 的 `dist/beautiful-mermaid.browser.global.js` 导出结构。
2. **CDN bundle 路径** — 1.1.2 提到 dual exports 改动，browser global bundle 路径可能变化。缓解：先验证 `https://unpkg.com/beautiful-mermaid@1.1.3/dist/beautiful-mermaid.browser.global.js` 可访问。
3. **布局回归** — ELK.js 布局结果与 dagre 不同，现有 default.md 中的图表视觉会变。缓解：升级后逐个图表类型手动验证。
4. **elkjs 依赖** — 1.1.3 的 package.json 新增 `elkjs: ^0.11.0` 依赖。CDN global build 应已打包，但需确认。
