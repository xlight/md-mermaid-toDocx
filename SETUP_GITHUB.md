# GitHub 仓库设置指南

本文档提供创建 GitHub 仓库并推送代码的详细步骤。

## 📋 前提条件

- [x] 已安装 Git
- [x] 拥有 GitHub 账户
- [x] 已配置 Git 用户信息

## 🚀 创建 GitHub 仓库并推送

### 步骤 1：在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `md-mermaid-toDocx`
   - **Description**: `一个基于 Web 的在线工具，支持将 Markdown 文档和 Mermaid 图表转换为 DOCX 格式文件。`
   - **Public/Private**: 选择 `Public`（公开仓库才能使用免费的 GitHub Pages）
   - **不要勾选**：❌ Add a README file
   - **不要勾选**：❌ Add .gitignore
   - **不要勾选**：❌ Choose a license
3. 点击 `Create repository` 按钮

### 步骤 2：推送本地代码到 GitHub

在项目目录中执行以下命令：

```bash
# 1. 确认当前在项目目录
pwd
# 应该显示: /Users/xlight/Projects/md-mermaid-toDocx

# 2. 查看当前状态
git status

# 3. 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/xlight/md-mermaid-toDocx.git

# 4. 验证远程仓库已添加
git remote -v

# 5. 推送代码到 GitHub
git push -u origin main
```

### 步骤 3：启用 GitHub Pages

推送成功后，配置 GitHub Pages：

1. 进入仓库页面：https://github.com/xlight/md-mermaid-toDocx
2. 点击 `Settings`（设置）标签
3. 在左侧菜单找到 `Pages`
4. 在 **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`
5. 保存设置

### 步骤 4：等待自动部署

1. 点击仓库页面的 `Actions` 标签
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待工作流完成（通常 1-2 分钟）
4. 部署成功后，访问：`https://xlight.github.io/md-mermaid-toDocx/`

## 📝 完整命令参考

```bash
# 如果之前没有初始化 Git，执行以下命令
cd /Users/xlight/Projects/md-mermaid-toDocx
git init
git add .
git commit -m "feat: 完整的 Markdown & Mermaid to DOCX 转换器"

# 添加远程仓库并推送
git remote add origin https://github.com/xlight/md-mermaid-toDocx.git
git branch -M main
git push -u origin main
```

## 🔧 常见问题

### Q1: 执行 `git push` 时提示输入用户名密码

**解决方案**：GitHub 已不再支持密码认证，需要使用个人访问令牌（PAT）或 SSH 密钥。

**方法 A：使用个人访问令牌（推荐）**

1. 访问：https://github.com/settings/tokens
2. 点击 `Generate new token (classic)`
3. 勾选 `repo` 权限
4. 生成令牌并复制（只显示一次）
5. 推送时使用令牌作为密码：
   ```bash
   Username: xlight
   Password: [粘贴你的令牌]
   ```

**方法 B：使用 SSH 密钥**

```bash
# 1. 生成 SSH 密钥（如果还没有）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 2. 复制公钥
cat ~/.ssh/id_ed25519.pub

# 3. 添加到 GitHub
# 访问：https://github.com/settings/keys
# 点击 "New SSH key"，粘贴公钥

# 4. 修改远程仓库 URL 为 SSH
git remote set-url origin git@github.com:xlight/md-mermaid-toDocx.git

# 5. 推送
git push -u origin main
```

### Q2: 提示 "remote origin already exists"

```bash
# 删除现有的 origin
git remote remove origin

# 重新添加
git remote add origin https://github.com/xlight/md-mermaid-toDocx.git
```

### Q3: GitHub Actions 部署失败

1. 检查 `.github/workflows/deploy.yml` 文件是否存在
2. 确认仓库是 Public（公开的）
3. 确认 GitHub Pages 设置为 "GitHub Actions"
4. 查看 Actions 标签页的错误日志

### Q4: GitHub Pages 显示 404

1. 确认部署已成功完成
2. 等待几分钟（DNS 生效需要时间）
3. 确认访问地址正确：`https://xlight.github.io/md-mermaid-toDocx/`
4. 清除浏览器缓存后重试

## 📦 后续更新

修改代码后，使用以下命令更新：

```bash
# 1. 添加修改的文件
git add .

# 2. 提交修改
git commit -m "描述你的修改内容"

# 3. 推送到 GitHub
git push

# GitHub Actions 会自动重新部署
```

## 🎯 验证部署成功

访问以下 URL 确认部署成功：

- **仓库地址**: https://github.com/xlight/md-mermaid-toDocx
- **在线应用**: https://xlight.github.io/md-mermaid-toDocx/
- **Actions 状态**: https://github.com/xlight/md-mermaid-toDocx/actions

## 📊 项目结构

推送后，GitHub 上应包含以下文件：

```
md-mermaid-toDocx/
├── .github/
│   └── workflows/
│       └── deploy.yml          # 自动部署配置
├── .gitignore                   # Git 忽略文件
├── index.html                   # 主应用文件
├── default.md                   # 默认示例内容
├── readme.md                    # 项目说明
├── DEPLOY.md                    # 部署指南
├── I18N.md                      # 多语言说明
├── CDN.md                       # CDN 配置说明
├── PROJECT_STRUCTURE.md         # 项目结构说明
├── QUICKSTART.md                # 快速开始指南
└── SETUP_GITHUB.md              # 本文件
```

## 🌟 项目特性展示

成功部署后，你的项目将具有以下特性：

- ✅ 在线访问无需安装
- ✅ 自动部署（推送代码后自动更新）
- ✅ 多语言支持（中英文）
- ✅ 响应式设计
- ✅ 20+ 种字体选择
- ✅ 实时预览和同步滚动
- ✅ 完整的中英文文档

## 🔗 相关资源

- [Git 官方文档](https://git-scm.com/doc)
- [GitHub 官方文档](https://docs.github.com/)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## 🎉 完成

恭喜！你已经成功创建并部署了项目。现在你可以：

1. ✅ 访问在线版本
2. ✅ 分享给其他人使用
3. ✅ 继续开发新功能
4. ✅ 接受其他开发者的贡献

如有问题，欢迎提交 Issue！