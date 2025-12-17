# CDN 配置说明

本文档说明项目使用的 CDN 源及备用方案。

## 📡 当前使用的 CDN

项目使用 [unpkg.com](https://unpkg.com/) 作为主要 CDN 源，原因如下：

- ✅ **国内访问友好**：在中国境内访问速度较快且稳定
- ✅ **自动版本管理**：支持 npm 包自动同步
- ✅ **无需注册**：免费使用，无需账户
- ✅ **全球 CDN**：Cloudflare 加速

## 📦 依赖库列表

| 库名 | 版本 | 用途 | CDN 地址 |
|------|------|------|----------|
| Mermaid.js | 11.6.0 | 图表渲染 | `https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js` |
| Marked.js | 15.0.12 | Markdown 解析 | `https://unpkg.com/marked@15.0.12/marked.min.js` |
| docx | 9.5.0 | DOCX 生成 | `https://unpkg.com/docx@9.5.0/dist/index.iife.js` |
| FileSaver.js | 2.0.5 | 文件保存 | `https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js` |

## 🔄 备用 CDN 方案

如果 unpkg.com 访问不稳定，可以使用以下备用方案：

### 方案 1：使用 jsdelivr（国内镜像）

```html
<!-- Mermaid 图表渲染 -->
<script src="https://fastly.jsdelivr.net/npm/mermaid@11.6.0/dist/mermaid.min.js"></script>

<!-- Markdown 解析 -->
<script src="https://fastly.jsdelivr.net/npm/marked@15.0.12/marked.min.js"></script>

<!-- DOCX 生成 -->
<script src="https://fastly.jsdelivr.net/npm/docx@9.5.0/dist/index.iife.js"></script>

<!-- 文件保存 -->
<script src="https://fastly.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js"></script>
```

### 方案 2：使用 BootCDN（国内 CDN）

BootCDN 是国内的公共 CDN 服务，但库可能不全：

```html
<!-- 注意：部分库可能不在 BootCDN 中，需要查询 -->
<script src="https://cdn.bootcdn.net/ajax/libs/mermaid/11.6.0/mermaid.min.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/marked/15.0.12/marked.min.js"></script>
```

查询地址：https://www.bootcdn.cn/

### 方案 3：使用 cdnjs

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.6.0/mermaid.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.12/marked.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
```

注意：docx 库在 cdnjs 中可能没有。

### 方案 4：本地托管

如果 CDN 都不可用，可以下载库文件到本地：

```bash
# 创建 libs 目录
mkdir libs

# 下载依赖库（需要 wget 或 curl）
wget -O libs/mermaid.min.js https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js
wget -O libs/marked.min.js https://unpkg.com/marked@15.0.12/marked.min.js
wget -O libs/docx.min.js https://unpkg.com/docx@9.5.0/dist/index.iife.js
wget -O libs/FileSaver.min.js https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js
```

然后在 `index.html` 中修改引用：

```html
<script src="libs/mermaid.min.js"></script>
<script src="libs/marked.min.js"></script>
<script src="libs/docx.min.js"></script>
<script src="libs/FileSaver.min.js"></script>
```

## 🚀 切换 CDN 源

### 手动切换

编辑 `index.html` 文件，找到以下部分（约第 246-250 行）：

```html
<script src="https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js"></script>
<script src="https://unpkg.com/marked@15.0.12/marked.min.js"></script>
<script src="https://unpkg.com/docx@9.5.0/dist/index.iife.js"></script>
<script src="https://unpkg.com/file-saver@2.0.5/dist/FileSaver.min.js"></script>
```

替换为备用 CDN 地址即可。

### 使用脚本批量替换

```bash
# 将 unpkg 替换为 fastly.jsdelivr.net
sed -i 's|https://unpkg.com|https://fastly.jsdelivr.net|g' index.html

# 恢复 unpkg
sed -i 's|https://fastly.jsdelivr.net|https://unpkg.com|g' index.html
```

## 📊 CDN 性能对比

| CDN 源 | 国内速度 | 稳定性 | 库完整度 | 推荐度 |
|--------|---------|--------|----------|--------|
| unpkg.com | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| fastly.jsdelivr.net | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| cdn.bootcdn.net | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| cdnjs.cloudflare.com | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 本地托管 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🔍 测试 CDN 可用性

### 方法 1：浏览器控制台测试

打开浏览器控制台（F12），运行：

```javascript
// 测试 unpkg
fetch('https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js')
  .then(r => console.log('unpkg 可用:', r.ok))
  .catch(e => console.error('unpkg 不可用:', e));

// 测试 jsdelivr
fetch('https://fastly.jsdelivr.net/npm/mermaid@11.6.0/dist/mermaid.min.js')
  .then(r => console.log('jsdelivr 可用:', r.ok))
  .catch(e => console.error('jsdelivr 不可用:', e));
```

### 方法 2：命令行测试

```bash
# 测试响应时间
curl -o /dev/null -s -w 'Total: %{time_total}s\n' https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js

# 测试是否可访问
curl -I https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js
```

### 方法 3：在线测速工具

- [17CE](https://www.17ce.com/) - 国内多地测速
- [Ping.pe](https://ping.pe/) - 全球测速

## 🛠️ 自动回退机制（可选）

可以在 HTML 中添加 CDN 自动回退：

```html
<!-- 主 CDN：unpkg -->
<script src="https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js"></script>

<!-- 备用 CDN：自动检测并加载 -->
<script>
if (typeof mermaid === 'undefined') {
    console.warn('unpkg CDN 加载失败，尝试备用 CDN...');
    var script = document.createElement('script');
    script.src = 'https://fastly.jsdelivr.net/npm/mermaid@11.6.0/dist/mermaid.min.js';
    script.onerror = function() {
        console.error('所有 CDN 均不可用！');
        alert('依赖库加载失败，请检查网络连接或联系管理员。');
    };
    document.head.appendChild(script);
}
</script>
```

## 📝 版本更新

### 查看最新版本

```bash
# 查看 npm 包的最新版本
npm view mermaid version
npm view marked version
npm view docx version
npm view file-saver version
```

### 更新依赖版本

修改 `index.html` 中的版本号：

```html
<!-- 将版本号替换为最新版本 -->
<script src="https://unpkg.com/mermaid@11.7.0/dist/mermaid.min.js"></script>
```

注意：
- 更新前请在开发环境测试
- 重大版本更新可能导致不兼容
- 建议锁定小版本号（如 `@11.6.x`）

## 🔒 安全建议

1. **使用 SRI（子资源完整性）**

```html
<script 
    src="https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js"
    integrity="sha384-xxx..."
    crossorigin="anonymous">
</script>
```

2. **定期检查依赖**
   - 关注安全漏洞公告
   - 及时更新有漏洞的版本

3. **考虑本地托管**
   - 生产环境建议本地托管
   - 避免 CDN 不稳定影响服务

## 📞 问题反馈

如果遇到 CDN 相关问题，请：
1. 查看浏览器控制台错误信息
2. 测试不同 CDN 源
3. 提交 Issue 并附上错误日志

## 相关链接

- [unpkg 官网](https://unpkg.com/)
- [jsDelivr 官网](https://www.jsdelivr.com/)
- [BootCDN 官网](https://www.bootcdn.cn/)
- [cdnjs 官网](https://cdnjs.com/)