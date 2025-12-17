# 部署说明

本文档介绍如何将项目部署到 GitHub Pages。

## 前置要求

- GitHub 账户
- Git 已安装并配置

## 部署步骤

### 1. 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角的 `+` 号，选择 `New repository`
3. 填写仓库名称（如 `md-mermaid-toDocx`）
4. 选择 `Public`（公开仓库才能使用免费的 GitHub Pages）
5. 点击 `Create repository`

### 2. 推送代码到 GitHub

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/你的仓库名.git

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 进入你的 GitHub 仓库页面
2. 点击 `Settings`（设置）
3. 在左侧菜单中找到 `Pages`
4. 在 `Build and deployment` 部分：
   - **Source**：选择 `GitHub Actions`
5. 保存设置

### 4. 触发自动部署

推送代码后，GitHub Actions 会自动触发部署：

```bash
# 修改文件后
git add .
git commit -m "更新内容"
git push
```

### 5. 查看部署状态

1. 在仓库页面点击 `Actions` 标签
2. 查看最新的工作流运行状态
3. 等待部署完成（通常需要 1-2 分钟）

### 6. 访问网站

部署成功后，访问地址为：

```
https://你的用户名.github.io/你的仓库名/
```

例如：
- 用户名：`xlight`
- 仓库名：`md-mermaid-toDocx`
- 访问地址：`https://xlight.github.io/md-mermaid-toDocx/`

## GitHub Actions 工作流说明

项目中的 `.github/workflows/deploy.yml` 文件配置了自动部署：

- **触发条件**：
  - 推送到 `main` 或 `master` 分支
  - 手动触发（在 Actions 页面点击 `Run workflow`）

- **部署流程**：
  1. 检出代码
  2. 配置 GitHub Pages
  3. 上传构建产物
  4. 部署到 GitHub Pages

## 自定义域名（可选）

如果你有自己的域名，可以配置自定义域名：

1. 在仓库根目录创建 `CNAME` 文件
2. 在文件中写入你的域名（如 `example.com`）
3. 在你的域名服务商处添加 DNS 记录：
   - 类型：`CNAME`
   - 主机：`@` 或 `www`
   - 值：`你的用户名.github.io`

## 本地预览

在部署前，建议先在本地预览：

```bash
# 使用 Python（Python 3）
python -m http.server 8000

# 使用 Python 2
python -m SimpleHTTPServer 8000

# 使用 Node.js
npx serve

# 使用 PHP
php -S localhost:8000
```

然后在浏览器访问 `http://localhost:8000`

## 故障排查

### 部署失败

1. 检查 Actions 页面的错误日志
2. 确认仓库是 Public（公开的）
3. 确认 GitHub Pages 已启用
4. 检查工作流文件语法是否正确

### 页面 404

1. 确认部署已成功完成
2. 检查访问地址是否正确
3. 等待几分钟，DNS 生效需要时间
4. 尝试清除浏览器缓存

### 内容未更新

1. 确认代码已推送到 GitHub
2. 检查 Actions 是否成功运行
3. 清除浏览器缓存（Ctrl+F5 或 Cmd+Shift+R）
4. 在隐私模式下访问

## 更新项目

后续更新项目时，只需：

```bash
# 修改文件
# ...

# 提交并推送
git add .
git commit -m "描述你的修改"
git push
```

GitHub Actions 会自动重新部署。

## 回滚版本

如果新版本有问题，可以回滚到之前的版本：

```bash
# 查看提交历史
git log

# 回滚到指定提交（替换为实际的 commit hash）
git reset --hard <commit-hash>

# 强制推送
git push -f origin main
```

## 安全说明

- 不要在代码中提交敏感信息（API 密钥、密码等）
- 使用环境变量存储敏感配置
- 定期更新依赖库的版本

## 性能优化

GitHub Pages 的一些优化建议：

1. **启用缓存**：合理设置静态资源的缓存策略
2. **压缩资源**：压缩 HTML、CSS、JavaScript 文件
3. **使用 CDN**：外部库使用 CDN 加速
4. **图片优化**：压缩图片大小

## 参考资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [自定义域名设置](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 技术支持

如遇问题，可以：

1. 查看项目 Issues
2. 提交新的 Issue
3. 参考 GitHub Pages 官方文档