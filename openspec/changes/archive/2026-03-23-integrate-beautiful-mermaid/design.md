# Technical Design: beautiful-mermaid Integration

## Context

当前项目是一个纯静态 HTML 应用，通过 CDN 加载所有依赖（Mermaid.js, marked.js, docx.js），用户可以直接在浏览器中打开 `index.html` 使用。集成 beautiful-mermaid 将保持这种简单架构，继续使用 CDN 方式加载依赖。

## Goals

1. **替换渲染引擎** - 用 beautiful-mermaid 完全替换 Mermaid.js，获得更好的美观性和主题能力
2. **添加主题系统** - 提供直观的 UI 让用户选择和自定义主题
3. **支持 ASCII 输出** - 为终端/纯文本场景提供 ASCII 图表渲染
4. **保持 PNG 导出** - 继续使用 PNG 嵌入 DOCX，确保最大兼容性
5. **保持易用性** - 无需构建步骤，直接打开 HTML 即可使用

## Non-Goals

- 不支持所有 Mermaid 图表类型（仅 beautiful-mermaid 支持的 5 种）
- 不保留原有的甘特图特定配置（依赖新的主题系统）
- 不使用 TypeScript 或模块化（保持单文件 HTML + JavaScript）
- 不使用 SVG 直接嵌入 DOCX（继续使用兼容性更好的 PNG）

## Decisions

### 1. CDN 加载策略

**决策**: 使用国内可用的 unpkg.com CDN 加载 beautiful-mermaid，保留原 mermaid.js CDN

**理由**:
- **保持简单** - 无需构建系统，直接打开 HTML 即可使用
- **国内可访问** - unpkg.com 和 cdnjs.cloudflare.com 在中国境内可用
- **全局可用** - beautiful-mermaid 提供 browser.global.js 版本，暴露全局 `beautifulMermaid` 对象
- **兼容性优先** - 保留原 mermaid.js，支持所有图表类型

**CDN 选择**（按优先级）:
```html
<!-- 原 Mermaid.js - 保留 -->
<script src="https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js"></script>

<!-- beautiful-mermaid - 新增，使用国内可用 CDN -->
<script src="https://unpkg.com/beautiful-mermaid@0.1.3/dist/beautiful-mermaid.browser.global.js"></script>

<!-- 备选 CDN（如 unpkg 不可用）:
<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.6.0/mermaid.min.js"></script>
-->
```

**避免使用**:
- ❌ **jsdelivr** - 在中国境内被屏蔽，不可用

**替代方案考虑**:
- ❌ **仅 beautiful-mermaid** - 不支持所有图表类型，会破坏兼容性
- ❌ **npm + 构建系统** - 增加复杂度，违背项目简单性原则

### 2. 混合渲染引擎策略

**决策**: 根据图表类型智能选择渲染引擎

**渲染引擎选择逻辑**:
```javascript
// 图表类型检测
function detectDiagramType(mermaidCode) {
  const trimmed = mermaidCode.trim()
  if (trimmed.startsWith('graph ') || trimmed.startsWith('flowchart ')) return 'flowchart'
  if (trimmed.startsWith('stateDiagram')) return 'state'
  if (trimmed.startsWith('sequenceDiagram')) return 'sequence'
  if (trimmed.startsWith('classDiagram')) return 'class'
  if (trimmed.startsWith('erDiagram')) return 'er'
  if (trimmed.startsWith('gantt')) return 'gantt'
  if (trimmed.startsWith('pie')) return 'pie'
  if (trimmed.startsWith('journey')) return 'journey'
  // 默认尝试 beautiful-mermaid
  return 'flowchart'
}

// 智能渲染器
async function renderDiagram(code, theme, mode) {
  const type = detectDiagramType(code)
  const supportedByBeautiful = ['flowchart', 'state', 'sequence', 'class', 'er']
  
  if (supportedByBeautiful.includes(type) && mode === 'svg') {
    // 使用 beautiful-mermaid（支持主题）
    return await beautifulMermaid.renderMermaid(code, theme)
  } else if (supportedByBeautiful.includes(type) && mode === 'ascii') {
    // ASCII 模式仅 beautiful-mermaid 支持
    return beautifulMermaid.renderMermaidAscii(code, { useAscii: false })
  } else {
    // 回退到原生 Mermaid.js（Gantt, Pie, Journey 等）
    const { svg } = await mermaid.render(`diagram-${Date.now()}`, code)
    return svg
  }
}
```

**理由**:
- **完全兼容** - 所有 Mermaid 图表类型都支持
- **最佳体验** - 支持的类型享受 beautiful-mermaid 的主题和美观性
- **平滑降级** - 不支持的类型自动回退到原生渲染
- **用户透明** - 用户无需关心使用哪个引擎

### 3. 单文件架构

**决策**: 在 `index.html` 内部组织代码，而非拆分文件

**代码组织**:
```html
<script>
  // 1. 常量和配置
  const THEMES = { ... }
  const i18n = { ... }
  
  // 2. 图表类型检测
  function detectDiagramType(code) { ... }
  
  // 3. 主题管理
  class ThemeManager { ... }
  
  // 4. 混合渲染逻辑
  async function renderDiagram(code, theme, mode) { ... }
  
  // 5. DOCX 导出
  async function exportToDocx(...) { ... }
  
  // 6. UI 事件处理
  function initializeApp() { ... }
  
  // 7. 初始化（保留原 mermaid.initialize）
  mermaid.initialize({ gantt: { ... }, themeVariables: { ... } })
  document.addEventListener('DOMContentLoaded', initializeApp)
</script>
```

**理由**:
- **简单部署** - 单个 HTML 文件包含所有逻辑
- **易于理解** - 代码集中在一处，便于阅读
- **无需编译** - 直接编辑即可生效
- **保留配置** - 甘特图特定配置继续生效

### 3. 主题系统架构

**决策**: 双层主题系统 - 内置主题 + 自定义主题

**实现方案**:
```javascript
// 在 index.html 的 <script> 标签内
const { THEMES } = beautifulMermaid // 从全局对象获取内置主题

class ThemeManager {
  constructor() {
    this.currentTheme = this.loadTheme()
    this.customThemes = this.loadCustomThemes()
  }
  
  loadTheme() {
    const saved = localStorage.getItem('selectedTheme')
    return saved ? JSON.parse(saved) : THEMES['zinc-light']
  }
  
  saveTheme(colors) {
    localStorage.setItem('selectedTheme', JSON.stringify(colors))
  }
  
  loadCustomThemes() {
    const saved = localStorage.getItem('customThemes')
    return saved ? JSON.parse(saved) : []
  }
  
  saveCustomThemes() {
    localStorage.setItem('customThemes', JSON.stringify(this.customThemes))
  }
  
  // 注意：主题仅应用于 beautiful-mermaid 支持的图表类型
  // Gantt、Pie 等图表继续使用原生 Mermaid.js 的主题配置
}
```

**UI 设计**:
- **主题选择器** - Dropdown 显示 15 个内置主题 + 自定义主题
- **高级面板** - 模态框或可折叠侧边栏，包含：
  - 必填：bg（背景色）, fg（前景色）颜色选择器
  - 可选：line, accent, muted, surface, border 颜色选择器
  - "启用可选颜色"复选框（默认只显示 bg/fg）
  - "保存为自定义主题"按钮
  - "导出主题"和"导入主题"按钮（JSON 格式）

**实时预览机制**:
```javascript
// 利用 CSS 自定义属性实现无重渲染主题切换
function applyTheme(colors) {
  document.querySelectorAll('.mermaid-preview-segment svg').forEach(svg => {
    svg.style.setProperty('--bg', colors.bg)
    svg.style.setProperty('--fg', colors.fg)
    if (colors.line) svg.style.setProperty('--line', colors.line)
    // ... 其他颜色
  })
}
```

### 4. DOCX PNG 嵌入策略

**决策**: 保留现有的 SVG 转 PNG 再嵌入 DOCX 的方式

**实现方案**:
```javascript
// 更新现有的 renderMermaidToPng 函数 - 支持混合渲染
async function renderMermaidToPng(mermaidCode, diagramId, theme) {
  if (!mermaidCode.trim()) return null
  
  try {
    const type = detectDiagramType(mermaidCode)
    const supportedByBeautiful = ['flowchart', 'state', 'sequence', 'class', 'er']
    
    let svg
    if (supportedByBeautiful.includes(type)) {
      // 1. 使用 beautiful-mermaid 生成 SVG（带主题）
      svg = await beautifulMermaid.renderMermaid(mermaidCode, theme)
    } else {
      // 1. 使用原生 Mermaid.js 生成 SVG（Gantt, Pie 等）
      const result = await mermaid.render(`pngSvg-${diagramId}-${Date.now()}`, mermaidCode)
      svg = result.svg
    }
    
    // 2. 解析 SVG 字符串
    const parser = new DOMParser()
    const svgDoc = parser.parseFromString(svg, "image/svg+xml")
    const svgElement = svgDoc.documentElement
    
    if (svgElement.tagName === "parsererror") {
      throw new Error("Failed to parse SVG")
    }
    
    // 3. 设置背景色和清理 XML 属性
    // 仅对 beautiful-mermaid SVG 应用主题背景色
    if (supportedByBeautiful.includes(type)) {
      svgElement.style.backgroundColor = theme.bg || "white"
    } else {
      svgElement.style.backgroundColor = "white" // 原生 Mermaid 使用白色背景
    }
    svgElement.querySelectorAll("tspan, text").forEach(t => t.removeAttribute("xml:space"))
    const cleanedSvgString = new XMLSerializer().serializeToString(svgElement)
    
    // 4. 转换为 PNG（保留现有逻辑）
    return new Promise((resolve, reject) => {
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      img.onload = () => {
        let svgW = parseFloat(svgElement.getAttribute('width')) || img.naturalWidth || 600
        let svgH = parseFloat(svgElement.getAttribute('height')) || img.naturalHeight || 400
        
        const viewBox = svgElement.getAttribute('viewBox')
        if (viewBox) {
          const parts = viewBox.split(/[\s,]+/)
          if (parts.length === 4) {
            svgW = parseFloat(parts[2]) || svgW
            svgH = parseFloat(parts[3]) || svgH
          }
        }
        
        if (svgW <= 0 || svgH <= 0) {
          reject(new Error(`Invalid SVG dimensions for ${diagramId}`))
          return
        }
        
        const scale = 1.5
        canvas.width = Math.max(1, Math.round(svgW * scale))
        canvas.height = Math.max(1, Math.round(svgH * scale))
        
        ctx.fillStyle = theme.bg || 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        if (scale !== 1.0) ctx.scale(scale, scale)
        ctx.drawImage(img, 0, 0, svgW, svgH)
        
        canvas.toBlob(blob => {
          blob ? resolve(blob) : reject(new Error("Canvas toBlob failed."))
        }, 'image/png')
      }
      
      img.onerror = () => reject(new Error("Failed to load SVG Data URL"))
      img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(cleanedSvgString)))
    })
  } catch (e) {
    console.error(`Error rendering Mermaid to PNG for ${diagramId}:`, e)
    return null
  }
}
```

**兼容性考虑**:
- **所有 Word 版本** - PNG 格式具有最广泛的兼容性
- **打印质量** - 1.5x 缩放确保打印时清晰

### 5. ASCII 输出模式实现

**决策**: 在预览区域支持 SVG/ASCII 切换，ASCII 输出可复制

**UI 设计**:
```html
<!-- 工具栏添加输出模式切换 -->
<div class="toolbar-group">
  <label>输出模式:</label>
  <select id="outputMode">
    <option value="svg">SVG (图形)</option>
    <option value="ascii">ASCII (文本)</option>
  </select>
  <label id="asciiCharsetLabel" style="display:none;">
    <input type="checkbox" id="useAscii"> 纯 ASCII
  </label>
</div>
```

**渲染逻辑**:
```javascript
// 在 updateFullPreview() 函数中 - 支持混合渲染
async function renderDiagramSegment(segment, outputMode, useAscii, theme) {
  const type = detectDiagramType(segment.content)
  const supportedByBeautiful = ['flowchart', 'state', 'sequence', 'class', 'er']
  
  if (supportedByBeautiful.includes(type)) {
    // beautiful-mermaid 渲染
    if (outputMode === 'svg') {
      const svg = await beautifulMermaid.renderMermaid(segment.content, theme)
      return { type: 'svg', content: svg, engine: 'beautiful' }
    } else {
      const ascii = beautifulMermaid.renderMermaidAscii(segment.content, { useAscii })
      return { type: 'ascii', content: ascii }
    }
  } else {
    // 原生 Mermaid.js 渲染（不支持 ASCII）
    if (outputMode === 'svg') {
      const renderId = `preview-${segment.id}-${Date.now()}`
      const { svg } = await mermaid.render(renderId, segment.content)
      return { type: 'svg', content: svg, engine: 'mermaid' }
    } else {
      // ASCII 模式不支持，显示提示
      return { 
        type: 'error', 
        content: `ASCII 模式不支持此图表类型 (${type})，仅显示 SVG`
      }
    }
  }
}
```

**ASCII 显示样式**:
```html
<!-- ASCII 输出容器 -->
<div class="ascii-preview-segment">
  <pre><code>{{ asciiOutput }}</code></pre>
  <button class="copy-ascii-btn">复制</button>
</div>
```

```css
.ascii-preview-segment {
  position: relative;
  background: #f9f9f9;
  border: 1px solid #ddd;
  margin: 15px auto;
  padding: 10px;
}

.ascii-preview-segment pre {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.2;
  overflow-x: auto;
}

.copy-ascii-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 4px 8px;
  font-size: 11px;
}
```

## Risks / Trade-offs

### 风险 1: CDN 可用性

**风险**: CDN 服务可能不稳定或在中国境内访问受限

**影响**: 中等 - 影响页面加载

**缓解措施**:
1. 使用国内可访问的 CDN（unpkg.com, cdnjs.cloudflare.com）
2. 避免使用被屏蔽的 CDN（jsdelivr）
3. 在 HTML 注释中提供备选 CDN 链接
4. 文档中说明如何切换 CDN 源或使用本地副本

### 风险 2: 图表类型检测准确性

**风险**: 图表类型检测错误可能导致使用错误的渲染引擎

**影响**: 中等 - 可能导致渲染失败或样式错误

**缓解措施**:
1. 使用严格的关键字匹配（startsWith）检测图表类型
2. 对于无法识别的类型，默认尝试 beautiful-mermaid
3. 如果 beautiful-mermaid 渲染失败，自动回退到原生 Mermaid.js
4. 在控制台记录渲染引擎选择信息，便于调试

### 风险 3: DOCX SVG 兼容性

**风险**: 某些旧版 Word 或其他软件可能无法显示 SVG

**影响**: 中等 - 影响用户的文档查看

**缓解措施**:
1. 优先测试主流版本（Word 2016+, Office 365, LibreOffice 6+）
2. 在文档中说明最低兼容版本要求
3. 如果测试发现严重兼容性问题，保留 PNG 转换作为备选方案（用户可配置）

### 权衡: 性能 vs 功能

**权衡**: beautiful-mermaid 号称高性能，但引入构建步骤增加了开发时间

**决策**: 接受构建步骤的开销，因为：
- 生产构建仅需执行一次
- 开发时 Vite 的 HMR 速度极快，体验优于手动刷新
- bundle 优化后的加载性能优于 CDN（可 tree-shake 未使用代码）

## Migration Plan

### 阶段 1: CDN 集成（无破坏性）
1. 添加 beautiful-mermaid CDN script 标签（使用 unpkg.com）
2. 保留原 mermaid.js CDN（继续使用）
3. 在控制台测试 `beautifulMermaid` 全局对象可用

### 阶段 2: 混合渲染引擎实现
1. 实现图表类型检测函数 `detectDiagramType()`
2. 创建智能渲染函数 `renderDiagram()`，根据类型选择引擎
3. 在预览中集成混合渲染逻辑
4. 测试所有图表类型（支持的和不支持的）
5. 确认两个引擎都能正确工作

### 阶段 3: 主题系统
1. 添加 ThemeManager 类（在 `<script>` 标签内）
2. 添加主题选择 UI
3. 实现自定义主题创建和保存
4. 测试主题切换和持久化

### 阶段 4: DOCX 导出更新
1. 更新 `renderMermaidToPng` 支持混合渲染（根据类型选择引擎）
2. 测试两种引擎生成的 PNG 导出
3. 确保 Gantt 图表继续使用原配置正常工作
4. 确保 PNG 质量满足要求

### 阶段 5: 文档更新
1. 更新 README 说明新功能
2. 添加主题配置使用指南
3. 更新示例 `default.md`

### 回滚计划

如果集成过程中遇到无法解决的问题：
1. **移除 beautiful-mermaid** - 删除 beautiful-mermaid CDN script 标签
2. **移除混合渲染逻辑** - 恢复到原单一渲染逻辑
3. **保留原配置** - mermaid.initialize() 配置无需更改
4. **版本控制** - Git 历史记录便于回退任何更改

回滚影响：仅移除新增的主题功能，所有原有功能完全不受影响。

## Open Questions

1. **CDN 依赖管理**
   - beautiful-mermaid 的 CDN 版本是否稳定？是否需要锁定版本号？
   - 建议：使用固定版本号（如 `@0.1.3`）而非 `@latest`，避免意外更新
   - 确认 unpkg.com 在中国境内的可访问性和稳定性

2. **DOCX 中 ASCII 模式如何处理？**
   - 用户选择 ASCII 输出模式时，DOCX 导出应该嵌入 ASCII 文本还是仍用 SVG？
   - 建议：DOCX 始终使用 SVG（更专业），ASCII 仅用于预览和复制

3. **甘特图和主题的关系**
   - Gantt 图表使用原生 Mermaid.js 渲染，不应用 beautiful-mermaid 主题
   - 建议：在文档中说明主题功能仅对 beautiful-mermaid 支持的图表类型生效

4. **错误处理策略**
   - 如果 CDN 加载失败或 beautiful-mermaid 不可用，如何处理？
   - 建议：添加错误检测，显示友好提示引导用户检查网络或使用备选 CDN

## Success Metrics

集成成功的标准：
- ✅ 所有 Mermaid 图表类型正常渲染（Flowchart, State, Sequence, Class, ER 使用 beautiful-mermaid；Gantt, Pie 等使用原生 Mermaid.js）
- ✅ 5 种支持的图表类型可使用 ASCII 模式
- ✅ 15 个内置主题可切换，自定义主题可保存和加载
- ✅ 主题正确应用于支持的图表类型
- ✅ Gantt 图表保持原有样式和配置
- ✅ DOCX 导出包含清晰的 PNG 图表（两种引擎都支持）
- ✅ 页面加载时间 < 3 秒（包括两个 CDN 资源）
- ✅ 单个 HTML 文件大小 < 120KB（不含 CDN 资源）
- ✅ 主流 Word 版本正确显示导出的 DOCX
- ✅ README 文档完整，新用户可直接打开 HTML 使用
- ✅ unpkg.com CDN 在中国境内可访问
