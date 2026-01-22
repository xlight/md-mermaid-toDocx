## ADDED Requirements

### Requirement: Mermaid 图表导出到 DOCX

系统 SHALL 将 Mermaid 图表转换为 PNG 图片并嵌入到 DOCX 文档中，同时确保图片不超出页面的可用宽度范围。

#### Scenario: 导出宽度适中的 Mermaid 图表

- **GIVEN** 用户输入包含宽度为 400 像素的 Mermaid 流程图
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统生成 DOCX 文件，其中图片保持原始尺寸（400 像素宽）
- **AND** 图片未超出页面边距

#### Scenario: 导出超宽的 Mermaid 图表

- **GIVEN** 用户输入包含宽度为 1200 像素的 Mermaid 序列图
- **WHEN** 用户点击"生成 DOCX"按钮
- **THEN** 系统生成 DOCX 文件，其中图片被按比例缩小以适应页面宽度
- **AND** 图片宽度不超过页面可用宽度（约 6.27 英寸或 602 像素在 96 DPI 下）
- **AND** 图片的宽高比保持不变

#### Scenario: 保持图片质量

- **GIVEN** 用户输入包含复杂的 Mermaid 图表
- **WHEN** 图表被缩小以适应页面
- **THEN** 图片仍保持清晰，因为 PNG 生成时使用了 1.5 倍缩放因子


### Requirement: 自动计算图片缩放比例

系统 SHALL 自动计算 Mermaid 图片的缩放比例，确保不超出 DOCX 页面的可用宽度。

#### Scenario: 计算缩放比例

- **GIVEN** 一张宽度为 W 像素的 Mermaid PNG 图片
- **AND** DOCX 页面的可用宽度为 MAX_WIDTH（基于 A4 纸张，左右边距各 1 英寸，约 6.27 英寸）
- **WHEN** 系统准备嵌入图片到 DOCX
- **THEN** 如果 W > MAX_WIDTH，计算缩放比例 scale = MAX_WIDTH / W
- **AND** 应用缩放后的宽度 = W * scale
- **AND** 应用缩放后的高度 = H * scale（H 为原始高度）

#### Scenario: 小图片不放大

- **GIVEN** 一张宽度为 300 像素的 Mermaid PNG 图片
- **AND** DOCX 页面的可用宽度为 602 像素（约 6.27 英寸在 96 DPI 下）
- **WHEN** 系统准备嵌入图片到 DOCX
- **THEN** 图片保持原始尺寸 300 像素
- **AND** 不进行放大操作

#### Scenario: 处理边缘情况

- **GIVEN** Mermaid 图表生成失败或尺寸无效（宽度或高度 <= 0）
- **WHEN** 系统尝试嵌入图片
- **THEN** 系统插入错误提示文本，如"[Mermaid image {id} invalid dimensions]"
- **AND** 不尝试应用缩放
