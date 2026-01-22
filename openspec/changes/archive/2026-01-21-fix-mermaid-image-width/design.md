## Context

当前的 DOCX 导出功能使用 `docx` 库（v9.5.0）将 Mermaid 图表转换为 PNG 图片并嵌入到 Word 文档中。图片嵌入时使用的是原始尺寸（`naturalWidth` 和 `naturalHeight`），没有考虑 Word 文档的页面边距和可用宽度。

### 当前实现
- 页面设置：上下左右边距均为 1440 twips (1 英寸 = 1440 twips)
- Mermaid 转 PNG：使用 1.5 倍缩放因子生成高分辨率图片
- 图片嵌入：直接使用 PNG 的原始像素尺寸

### 问题
- Mermaid 图表通常生成较宽的 SVG（如流程图、序列图）
- PNG 图片的像素尺寸直接对应 DOCX 中的点（points）或 EMU（English Metric Units）
- 缺少对页面宽度的约束，导致图片超出边距

### 约束条件
- 必须保持图片宽高比
- 不能改变现有的页面边距设置
- 应支持标准 A4 和 Letter 纸张尺寸
- 不应影响已经适合页面的小图片

## Goals / Non-Goals

### Goals
- Mermaid 图表在 DOCX 中不超出页面宽度
- 保持图片清晰度和宽高比
- 自动计算合适的缩放比例

### Non-Goals
- 不改变预览区域的图片显示
- 不改变打印预览的行为
- 不调整页面边距或纸张大小
- 不实现用户可配置的缩放选项（本次变更）

## Decisions

### Decision 1: 使用固定的可用页面宽度

**选择**: 基于 A4 纸张和 1 英寸边距计算固定可用宽度

**理由**:
- A4 纸张宽度：8.27 英寸 (210mm)
- 左右边距：各 1 英寸
- 可用宽度：8.27 - 2 = 6.27 英寸
- 转换为 EMU（docx 使用的单位）：6.27 * 914400 ≈ 5,733,288 EMU

**替代方案**:
- Letter 纸张（8.5 x 11 英寸）：可用宽度 6.5 英寸
- 选择 A4 因为它是国际标准，且稍窄，能在两种纸张上都适用

### Decision 2: 像素到 EMU 的转换

**选择**: 使用 9525 作为像素到 EMU 的转换系数

**理由**:
- 1 像素 ≈ 9525 EMU（基于 96 DPI 标准）
- docx 库使用 EMU 作为内部单位
- 这是常见的转换标准

### Decision 3: 仅缩小不放大

**选择**: 只对超宽图片进行缩小，不放大小图片

**理由**:
- 放大会降低图片质量
- 小图片保持原始尺寸更清晰
- 符合用户期望（解决超出问题，不改变正常图片）

**实现**:
```javascript
const maxWidthEMU = 5733288; // ~6.27 inches in EMU
const pixelWidthEMU = naturalWidth * 9525;
const pixelHeightEMU = naturalHeight * 9525;

let finalWidth = pixelWidthEMU;
let finalHeight = pixelHeightEMU;

if (pixelWidthEMU > maxWidthEMU) {
    const scale = maxWidthEMU / pixelWidthEMU;
    finalWidth = maxWidthEMU;
    finalHeight = Math.round(pixelHeightEMU * scale);
}
```

## Risks / Trade-offs

### Risk 1: 图片可能过小难以阅读
- **风险**: 超宽的复杂图表缩小后可能难以阅读细节
- **缓解**: 
  - PNG 生成时已使用 1.5 倍缩放，提供更高分辨率
  - 用户可以在 Word 中双击图片查看原始尺寸
  - 可以考虑未来添加"原始尺寸"选项

### Risk 2: 不同纸张大小的兼容性
- **风险**: Letter 纸张宽度更大（6.5 vs 6.27 英寸），可能有轻微浪费
- **缓解**: 差异很小（< 4%），不影响实际使用
- **未来**: 可以添加纸张大小配置选项

### Trade-off: 像素单位 vs EMU 单位
- **当前**: ImageRun 的 transformation 属性接受像素单位，但内部会转换为 EMU
- **决定**: 在应用层计算好缩放后的像素值，传递给 ImageRun
- **原因**: 更直观，易于理解和调试

## Migration Plan

### 实施步骤
1. 定义常量（可用宽度、转换系数）
2. 在图片嵌入代码处添加缩放计算逻辑
3. 测试各种尺寸的 Mermaid 图表
4. 无需数据迁移或用户配置

### 回滚
- 如果发现问题，移除缩放逻辑即可恢复原行为
- 不影响已存在的 DOCX 文件

### 验证
- 创建测试用例：窄图、宽图、极宽图
- 在 Microsoft Word、LibreOffice、Google Docs 中验证
- 确认打印效果符合预期

## Open Questions

无待解决问题。实现方案清晰明确。
