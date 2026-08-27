## MODIFIED Requirements

### Requirement: 工具栏 SHALL 为视图模式预留稳定入口

系统 SHALL 在单层工具栏中提供可操作的工作区视图模式入口，支持用户在 `split`、`editor-only`、`preview-only` 之间快速切换，并保持入口位置稳定，避免未来功能扩展导致主布局重排。

#### Scenario: 视图模式入口位置稳定
- **WHEN** 用户查看工具栏中的工作区控制区域
- **THEN** 视图模式入口位于与字体、图表配置相邻的工作区控制区域中

#### Scenario: 从 split 切换到纯编辑模式
- **WHEN** 用户在 `split` 模式点击 `editor-only`
- **THEN** 编辑区独占工作区
- **AND** 预览区与分割线隐藏

#### Scenario: 从 split 切换到纯预览模式
- **WHEN** 用户在 `split` 模式点击 `preview-only`
- **THEN** 预览区独占工作区
- **AND** 编辑区与分割线隐藏

#### Scenario: 从单栏模式返回 split
- **WHEN** 用户在 `editor-only` 或 `preview-only` 模式点击 `split`
- **THEN** 工作区恢复双栏布局
- **AND** 使用会话内最近一次有效分栏比例

## ADDED Requirements

### Requirement: Split 模式 SHALL 支持鼠标拖拽分割线调整宽度

系统 SHALL 在桌面端 `split` 模式提供可拖拽分割线，允许用户通过鼠标调整编辑区与预览区宽度占比。

#### Scenario: 桌面端拖拽分割线
- **WHEN** 用户在桌面端按下并拖动分割线
- **THEN** 编辑区和预览区宽度随拖拽位置更新

#### Scenario: 非 split 模式隐藏分割线
- **WHEN** 用户处于 `editor-only` 或 `preview-only` 模式
- **THEN** 分割线不显示且不可拖拽

### Requirement: 拖拽过程 SHALL 在松手后才触发预览重渲染

系统 SHALL 在拖拽过程中避免触发实时重渲染，仅在拖拽结束（鼠标松开）后触发一次预览更新。

#### Scenario: 拖拽中不重渲染
- **WHEN** 用户持续拖拽分割线（`mousemove`）
- **THEN** 系统不触发完整预览重渲染

#### Scenario: 松手后一次性渲染
- **WHEN** 用户结束拖拽（`mouseup`）
- **THEN** 系统提交最终分栏比例
- **AND** 仅触发一次预览更新

### Requirement: 宽度越界 SHALL 自动切换单栏模式

系统 SHALL 定义编辑区与预览区最小宽度阈值。当拖拽提交结果导致任一侧小于阈值时，自动切换到对应单栏模式。

#### Scenario: 编辑区低于最小宽度
- **WHEN** 拖拽提交后编辑区宽度小于编辑区最小阈值
- **THEN** 系统自动切换为 `preview-only` 模式

#### Scenario: 预览区低于最小宽度
- **WHEN** 拖拽提交后预览区宽度小于预览区最小阈值
- **THEN** 系统自动切换为 `editor-only` 模式

### Requirement: 分栏比例 SHALL 仅在会话内保留

系统 SHALL 在当前页面会话中保留最近一次有效 `split` 比例，但 MUST NOT 持久化到 localStorage 或其他跨刷新存储。

#### Scenario: 会话内恢复比例
- **WHEN** 用户从单栏模式返回 `split`
- **THEN** 系统恢复本次会话最近一次有效分栏比例

#### Scenario: 刷新后回默认比例
- **WHEN** 用户刷新页面后重新进入 `split`
- **THEN** 系统使用默认分栏比例而非上次会话比例

### Requirement: 移动端 SHALL 不启用拖拽交互

系统 SHALL 在移动端保持简化交互，不启用分割线拖拽；仅通过视图模式入口完成布局切换。

#### Scenario: 移动端无拖拽
- **WHEN** 用户在移动端查看页面
- **THEN** 分割线拖拽交互不可用

#### Scenario: 移动端可切换单栏模式
- **WHEN** 用户在移动端点击视图模式入口
- **THEN** 系统可在 `editor-only`、`preview-only`、`split` 之间切换（按移动端布局规则展示）
