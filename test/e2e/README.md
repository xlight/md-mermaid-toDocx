# Scroll Sync E2E 测试

## 前置条件

1. **全局安装 Playwright**（不修改本项目 package.json）：
   ```bash
   npm install -g playwright
   npx playwright install chromium
   ```

2. **启动 HTTP 服务**（在项目根目录）：
   ```bash
   python3 -m http.server 8000
   ```

## 运行测试

```bash
# 在项目根目录执行
node test/e2e/scroll-sync.spec.js
```

## 测试覆盖

| # | 测试 | 说明 |
|---|------|------|
| 1 | 纯文本文档滚动同步 | 基本功能验证 |
| 2 | Mermaid 密集文档 | segment-end 锚点精度 |
| 3 | 图片加载后索引重建 | ResizeObserver 触发验证 |
| 4 | 双向 round-trip | editor→preview→editor 误差 |
| 5 | 多点采样连续性 | 映射结果无大跳变 |
| 6 | 抗抖控制 | 快速来回滚动不互拉 |
| 7 | 重复代码块不误命中 | searchCursor 步进验证 |
| 8 | runSelfTest 通过 | 纯函数不变量自检 |

## Fixtures

| 文件 | 内容类型 |
|------|----------|
| `plain-text.md` | 纯文本 |
| `mermaid-dense.md` | Mermaid 流程图/时序图/甘特图 |
| `math-dense.md` | 数学公式 |
| `with-images.md` | 含异步加载图片 |
| `tables-code.md` | 表格 + 代码块 |
| `mixed-all.md` | 全类型混合 |

## CI 集成

```yaml
# GitHub Actions 示例
- name: Install Playwright
  run: |
    npm install -g playwright
    npx playwright install chromium

- name: Start HTTP server
  run: python3 -m http.server 8000 &

- name: Run E2E tests
  run: node test/e2e/scroll-sync.spec.js
```
