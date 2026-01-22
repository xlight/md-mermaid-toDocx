# Mermaid 图片宽度测试文档

此文档用于测试 DOCX 导出时 Mermaid 图片的自动缩放功能。

## 测试场景 1: 窄图（应保持原始尺寸）

简单的小流程图，宽度应该小于 602 像素：

```mermaid
graph LR
    A[开始] --> B[结束]
```

## 测试场景 2: 中等宽度图表

包含 4 个节点的流程图：

```mermaid
graph LR
    A[步骤1] --> B[步骤2]
    B --> C[步骤3]
    C --> D[步骤4]
```

## 测试场景 3: 超宽图表（应被缩放）

包含多个节点的宽流程图：

```mermaid
graph LR
    Start[开始] --> Input[输入数据]
    Input --> Validate[数据验证]
    Validate --> Process[数据处理]
    Process --> Transform[数据转换]
    Transform --> Store[存储数据]
    Store --> Output[输出结果]
    Output --> End[结束]
```

## 测试场景 4: 序列图（通常较宽）

```mermaid
sequenceDiagram
    participant User as 用户
    participant Browser as 浏览器
    participant Server as 服务器
    participant Database as 数据库
    
    User->>Browser: 输入 Markdown
    Browser->>Browser: 实时预览
    User->>Browser: 点击生成 DOCX
    Browser->>Server: 请求生成
    Server->>Database: 查询数据
    Database-->>Server: 返回数据
    Server-->>Browser: 返回 DOCX
    Browser-->>User: 下载文件
```

## 测试场景 5: 复杂流程图（极宽）

```mermaid
graph TB
    A[开始] --> B{判断条件}
    B -->|条件1| C[处理A]
    B -->|条件2| D[处理B]
    B -->|条件3| E[处理C]
    C --> F[子流程1]
    C --> G[子流程2]
    D --> H[子流程3]
    D --> I[子流程4]
    E --> J[子流程5]
    E --> K[子流程6]
    F --> L[汇总]
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    L --> M[输出结果]
    M --> N[结束]
```

## 测试验证清单

导出 DOCX 后，请在 Microsoft Word 中验证：

- [ ] 窄图（场景1）保持原始尺寸，未被放大
- [ ] 中等宽度图（场景2）显示正常，未超出页面
- [ ] 超宽图（场景3）被缩小以适应页面宽度
- [ ] 序列图（场景4）被缩小以适应页面宽度
- [ ] 复杂流程图（场景5）被缩小以适应页面宽度
- [ ] 所有图片的宽高比保持不变（无拉伸或压缩）
- [ ] 图片仍然清晰可读（得益于 1.5x PNG 缩放）
