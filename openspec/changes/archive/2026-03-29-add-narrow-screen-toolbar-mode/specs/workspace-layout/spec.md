## MODIFIED Requirements

### Requirement: 工具栏 SHALL 在窄屏下采用紧凑布局模式

系统 SHALL 当屏幕宽度小于 1024px 时，工具栏自动切换为紧凑布局模式，优先保证核心操作的可访问性。

#### Scenario: 窄屏工具栏紧凑显示
- **GIVEN** 用户在宽度为 800px 的设备上打开页面
- **WHEN** 页面加载完成
- **THEN** 工具栏控件自动采用紧凑间距排列
- **AND** 核心操作（字体、视图模式、导出）保持可见

#### Scenario: 控件间距在窄屏下缩减
- **GIVEN** 屏幕宽度 < 1024px
- **WHEN** 工具栏渲染
- **THEN** 控件之间的间距从桌面端的 6-8px 缩减到 4px
- **AND** 按钮 padding 适当缩减

### Requirement: 次要控件 SHALL 在窄屏下收纳到折叠菜单

系统 SHALL 将 GitHub、Star、语言切换等低频入口收纳到可展开的"更多"菜单中，仅在用户点击时显示。

#### Scenario: 窄屏下显示更多按钮
- **GIVEN** 屏幕宽度 < 1024px
- **WHEN** 工具栏渲染
- **THEN** 显示"更多"按钮或等效图标
- **AND** 点击后展开包含收纳控件的菜单

#### Scenario: 展开菜单显示收纳的控件
- **WHEN** 用户点击"更多"按钮
- **THEN** 菜单展开显示 GitHub、Star、语言切换等控件
- **AND** 再次点击或点击外部可收起菜单

#### Scenario: 桌面端不显示折叠菜单
- **GIVEN** 屏幕宽度 ≥ 1024px
- **WHEN** 工具栏渲染
- **THEN** 所有控件正常显示，不显示折叠菜单

### Requirement: 极窄屏 SHALL 进一步简化工具栏

系统 SHALL 当屏幕宽度小于 480px 时，工具栏进一步简化，仅保留最核心的操作入口。

#### Scenario: 极窄屏工具栏极度紧凑
- **GIVEN** 屏幕宽度 < 480px
- **WHEN** 工具栏渲染
- **THEN** 工具栏采用最小化显示
- **AND** 核心操作仍然可访问

#### Scenario: 极窄屏下视图模式简化
- **GIVEN** 屏幕宽度 < 480px
- **WHEN** 用户查看视图模式控件
- **THEN** 视图模式以更紧凑的图标或文字形式呈现

### Requirement: 工具栏 SHALL 为窄屏提供稳定的视图模式入口

系统 SHALL 在窄屏工具栏中仍保持视图模式入口的稳定可见性，允许用户快速切换编辑/预览/分栏模式。

#### Scenario: 窄屏下视图模式入口可见
- **GIVEN** 屏幕宽度 < 1024px
- **WHEN** 用户查看工具栏
- **THEN** 视图模式切换按钮始终可见
- **AND** 可在 split / editor-only / preview-only 之间切换
