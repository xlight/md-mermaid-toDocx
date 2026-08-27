## Context

当前应用在 `app.js:561-575` 使用 `mermaid.initialize()` 配置原生 Mermaid.js，采用 `theme: 'default'`（默认主题），仅添加了甘特图字体大小和 `look: 'neo'`。beautiful-mermaid 渲染的 4 种图表（流程图、时序图、类图、ER 图）使用 15 套精心设计的配色，而其他 18+ 类型（Gantt、Pie、Journey、GitGraph、mindmap、timeline、sankey、quadrantChart、xyChart、block、state 等）使用 `theme: 'default'` 的原始配色。

输出模式默认为 `classic`（经典/兼容），即所有图表都用 mermaid.js 渲染，beautiful-mermaid 完全不参与。ASCII 模式下，非 4 种图表直接显示错误提示。

**关键约束**：
- 纯前端 SPA，无构建系统，所有依赖通过 CDN 加载
- beautiful-mermaid 不走 `mermaid.render()` 路径，修改 `mermaid.initialize()` 对其无影响
- 用户可见的效果是：同一页面出现两种主题对比较强
- mermaid.js 本身没有 ASCII 输出能力，只有 beautiful-mermaid 提供 `renderMermaidAscii()`

## Goals / Non-Goals

**Goals:**
- 默认使用混合渲染模式（SVG 模式），最大化 beautiful-mermaid 主题利用率
- 统一原生 Mermaid.js 所有 18+ 图表类型的配色风格，使其与 zinc-light 色系协调
- 通过 `themeCSS` 增加统一的视觉细节（圆角节点、连线粗细、文字颜色等）
- ASCII 模式下不支持的图表类型降级为 SVG 渲染，而非显示错误提示
- 保持向后兼容——Classic 模式保留为降级选项

**Non-Goals:**
- 不改变 flowchart、sequence、class、er 四种图表的渲染路径（仍然使用 beautiful-mermaid）
- 不做 ELK.js 布局引擎集成（dagre + neo 已足够）
- 不做主题选择器与 mermaid themeVariables 的实时同步（future work）
- 不为 mermaid.js 实现 ASCII 输出能力（这需要完全不同的渲染管线）

## Decisions

### Decision 1: 默认输出模式从 `classic` 改为 `svg`

- **选择**: `<option value="svg" selected>` 作为默认
- **理由**: 混合模式（SVG）是最佳体验——4 种图表用 beautiful-mermaid 主题，其余用优化后的 mermaid.js。默认 classic 让 beautiful-mermaid 完全闲置，用户感知不到主题能力。
- **代价**: 首次加载时如果 beautiful-mermaid CDN 加载失败，4 种图表会降级到 mermaid.js 渲染（已有 `beautifulMermaidLoaded` 检测逻辑处理此情况）。

### Decision 2: 模式选项文本调整

| 值 | 当前文本 | 新文本 | 说明 |
|---|---|---|---|
| `svg` | SVG (主题) | **混合 (推荐)** | 语义更准确：4种用 beautiful-mermaid，其余用 mermaid.js |
| `ascii` | ASCII (文本) | ASCII (文本) | 不变 |
| `classic` | 经典 (兼容) | 经典 (兼容) | 不变，保留为降级/调试选项 |

- **理由**: "SVG (主题)" 容易让用户以为所有图表都有主题，"混合"更准确描述实际行为。

### Decision 3: ASCII 模式降级策略 — SVG 渲染 + 提示标签

- **选择**: 不支持的图表类型降级为 SVG 渲染，并在图表上方显示小标签 "SVG (ASCII 不可用)"
- **理由**:
  - 选项 A（纯 SVG 降级）：用户选了 ASCII 但看到 SVG，可能困惑
  - 选项 B（保留错误提示）：图表完全不可见，体验最差
  - **选项 C（SVG + 提示标签）**：图表可见 + 诚实告知用户，最实用
- **实现**: 在 mermaid.js 渲染的 SVG 容器前插入一个 `<div class="ascii-fallback-hint">` 标签

```
┌─────────────────────────────────────────────┐
│  ASCII 模式渲染路由                          │
├─────────────────────────────────────────────┤
│                                             │
│  diagramType ∈ [flowchart, sequence,        │
│                  class, er]                 │
│    → beautifulMermaid.renderMermaidAscii()  │
│    → 纯文本输出                              │
│                                             │
│  diagramType ∉ supported                    │
│    → mermaid.render() (SVG)                 │
│    → + 提示标签 "SVG (ASCII 不可用)"         │
│                                             │
└─────────────────────────────────────────────┘
```

### Decision 4: 使用 `theme: 'base'` 替代 `theme: 'default'`

- **选择**: `theme: 'base'`
- **理由**: `base` 是 Mermaid 5 个内置主题中唯一可通过 `themeVariables` 自定义的主题。`default`、`neutral`、`dark`、`forest` 不支持 `themeVariables` 覆盖。
- **代价**: 需要显式配置所有 `themeVariables`，否则 base 的默认值可能比 default 朴素。

### Decision 5: 采用 zinc-light 色系作为默认配色

| themeVariables | 值 | 对应 beautiful-mermaid zinc-light |
|---|---|---|
| `background` | `#ffffff` | `bg` |
| `primaryTextColor` | `#09090b` | `fg` |
| `lineColor` | `#d4d4d8` | `line` |
| `primaryColor` | `#18181b` | `accent` |
| `tertiaryColor` | `#f4f4f5` | `muted` |
| `secondaryColor` | `#fafafa` | `surface` |
| `primaryBorderColor` | `#e4e4e7` | `border` |
| `noteBkgColor` | `#f4f4f5` | - |
| `noteBorderColor` | `#e4e4e7` | - |
| `noteTextColor` | `#09090b` | - |
| `titleColor` | `#09090b` | - |

- **理由**: beautiful-mermaid 的默认主题就是 zinc-light，两边使用同一色系，用户切换图表类型不会感到突兀
- **代价**: 如果用户选了非 zinc-light 的 beautiful-mermaid 主题（如 dracula），原生类型不会同步变化。但这是纯粹的 show-stopper 吗？不——亮色/暗色至少一致，只是具体色相不同（Future Work 可做同步）。

### Decision 6: 使用 `themeCSS` 增加视觉细节

`themeCSS` 注入 SVG 内部的 `<style>` 标签，可以精确控制几乎所有 SVG 元素：

```css
.node rect { rx: 6; ry: 6; }                    /* 节点圆角 */
.edgePath .path { stroke-width: 1.5; }           /* 连线粗细 */
.marker { fill: #d4d4d8; }                       /* 箭头颜色 */
.taskText { fill: #ffffff; }                     /* 甘特图文字 */
.pieTitleText { fill: #09090b; }                 /* 饼图标题 */
```

- **理由**: `themeVariables` 控制颜色，`themeCSS` 控制形状和布局细节。两者互补。
- **注意**: themeCSS 的 CSS 选择器对某些图表类型可能不生效（原生 mermaid 内部的 SVG 结构因图表类型而异）。

### Decision 7: 不做主题同步（Future Work）

不将 beautiful-mermaid 的主题选择器联动到 `mermaid.initialize()`。理由：
- 每次切换需要 `mermaid.initialize()` + 全部重新渲染，增加复杂度
- 一色系（zinc-light）对所有类型已经够统一
- 后续可独立实现"同步主题"功能

### Decision 8: 保持 `look: 'neo'` + dagre 布局

neo 模式提供更现代的节点样式，dagre 布局引擎适合流程图类。这对所有原生类型都有正向影响。

## Risks / Trade-offs

| 风险 | 缓解方案 |
|---|---|
| 默认混合模式首次加载 beautiful-mermaid CDN 失败 | 已有 `beautifulMermaidLoaded` 检测，自动降级到 mermaid.js |
| `theme: 'base'` 的默认值在某些图表类型上表现不佳 | 测试所有 18+ 类型，逐一对齐 themeVariables |
| `themeCSS` 选择器对某些图表无效 | 对每种类型单独验证，无效的选择器移除 |
| `mermaid.initialize()` 重复调用可能产生渲染问题 | 只在初始化时调用一次，不动态变更 |
| zinc-light 是亮色主题，暗色模式下原生类型会刺眼 | 后续可加 dark mode 检测 + 切换 themeVariables |
| ASCII 降级为 SVG 可能让用户困惑 | 提示标签 "SVG (ASCII 不可用)" 明确告知 |
| 模式文本从"SVG (主题)"改为"混合 (推荐)" | i18n 需同步更新中英文文本 |
