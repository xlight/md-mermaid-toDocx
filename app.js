        // 多语言文本定义
        const i18n = {
            'zh-CN': {
                title: 'Markdown & Mermaid to DOCX',
                fontLabel: '字体:',
                chineseFonts: '中文字体',
                englishFonts: '英文字体',
                themeLabel: '主题:',
                customThemeButton: '🎨 自定义',
                outputModeLabel: '输出:',
                pureAsciiLabel: '纯 ASCII 字符',
                generateButton: '生成 DOCX',
                printButton: '打印预览',
                languageLabel: '语言:',
                editorHeader: '编辑器 (支持 Markdown 和 Mermaid)',
                editorPlaceholder: '在此输入 Markdown 和 Mermaid 内容...',
                previewHeader: '实时预览',
                previewPlaceholder: '预览将显示在此处...',
                loadingDefault: '正在加载 default.md...',
                defaultLoaded: 'default.md 已加载。',
                defaultLoadError: '无法加载 default.md: ',
                defaultLoadInfo: '(可选) 在项目根目录创建 default.md 文件以自动加载默认内容。',
                generating: '正在生成 DOCX...',
                success: 'DOCX 已生成！',
                error: '生成失败: ',
                printPrompt: '请使用浏览器的打印功能 (Ctrl+P / Cmd+P)',
                viewOnGithub: 'GitHub',
                starButton: '加星',
                customThemeTitle: '自定义主题',
                themeBgLabel: '背景色 (bg):',
                themeFgLabel: '前景色 (fg):',
                optionalColorsLabel: '启用可选颜色',
                themeLineLabel: '线条色 (line):',
                themeAccentLabel: '强调色 (accent):',
                themeMutedLabel: '柔和色 (muted):',
                themeSurfaceLabel: '表面色 (surface):',
                themeBorderLabel: '边框色 (border):',
                applyThemeButton: '应用主题',
                saveCustomThemeButton: '保存为自定义',
                exportThemeButton: '导出 JSON',
                importThemeButton: '导入 JSON',
                copyAsciiButton: '复制',
                asciiCopied: '已复制到剪贴板',
                mermaidConfigButton: '⚙️ 图表配置',
                mermaidConfigTitle: 'Mermaid 图表配置',
                themeSectionTitle: '主题设置',
                themeHint: '主题仅适用于流程图、时序图、类图和 ER 图',
                outputSectionTitle: '输出模式',
                outputModeHelpTitle: '输出模式说明：',
                svgModeDesc: '应用主题到支持的图表，其他图表使用原生样式',
                asciiModeDesc: '将图表转换为纯文本格式，适合终端和聊天工具',
                classicModeDesc: '所有图表使用原生 Mermaid.js 渲染，最大兼容性',
                closeButton: '关闭',
                mathRendering: '数学公式',
                mathGenerating: '正在渲染数学公式...',
                mathRenderError: '数学公式渲染失败',
                mathExportError: '数学公式导出失败',
                mathJaxNotLoaded: 'MathJax 未加载，数学公式功能不可用',
                viewModePlaceholder: 'Split / Preview（即将支持）'
            },
            'en': {
                title: 'Markdown & Mermaid to DOCX',
                fontLabel: 'Font:',
                chineseFonts: 'Chinese Fonts',
                englishFonts: 'English Fonts',
                themeLabel: 'Theme:',
                customThemeButton: '🎨 Custom',
                outputModeLabel: 'Output:',
                pureAsciiLabel: 'Pure ASCII',
                generateButton: 'Generate DOCX',
                printButton: 'Print Preview',
                languageLabel: 'Language:',
                editorHeader: 'Editor (Markdown & Mermaid Support)',
                editorPlaceholder: 'Enter Markdown and Mermaid content here...',
                previewHeader: 'Live Preview',
                previewPlaceholder: 'Preview will appear here...',
                loadingDefault: 'Loading default.md...',
                defaultLoaded: 'default.md loaded.',
                defaultLoadError: 'Failed to load default.md: ',
                defaultLoadInfo: '(Optional) Create default.md in the root directory to load default content automatically.',
                generating: 'Generating DOCX...',
                success: 'DOCX generated!',
                error: 'Generation failed: ',
                printPrompt: 'Please use browser print function (Ctrl+P / Cmd+P)',
                viewOnGithub: 'GitHub',
                starButton: 'Star',
                customThemeTitle: 'Custom Theme',
                themeBgLabel: 'Background (bg):',
                themeFgLabel: 'Foreground (fg):',
                optionalColorsLabel: 'Enable Optional Colors',
                themeLineLabel: 'Line Color:',
                themeAccentLabel: 'Accent Color:',
                themeMutedLabel: 'Muted Color:',
                themeSurfaceLabel: 'Surface Color:',
                themeBorderLabel: 'Border Color:',
                applyThemeButton: 'Apply Theme',
                saveCustomThemeButton: 'Save as Custom',
                exportThemeButton: 'Export JSON',
                importThemeButton: 'Import JSON',
                copyAsciiButton: 'Copy',
                asciiCopied: 'Copied to clipboard',
                mermaidConfigButton: '⚙️ Chart Config',
                mermaidConfigTitle: 'Mermaid Chart Configuration',
                themeSectionTitle: 'Theme Settings',
                themeHint: 'Themes only apply to Flowchart, Sequence, Class, and ER diagrams',
                outputSectionTitle: 'Output Mode',
                outputModeHelpTitle: 'Output Mode Description:',
                svgModeDesc: 'Apply themes to supported diagrams, others use native styles',
                asciiModeDesc: 'Convert diagrams to plain text, suitable for terminals and chat tools',
                classicModeDesc: 'All diagrams use native Mermaid.js rendering for maximum compatibility',
                closeButton: 'Close',
                mathRendering: 'Math Formula',
                mathGenerating: 'Rendering math formula...',
                mathRenderError: 'Math formula rendering failed',
                mathExportError: 'Math formula export failed',
                mathJaxNotLoaded: 'MathJax not loaded, math formula feature unavailable',
                viewModePlaceholder: 'Split / Preview (Coming Soon)'
            }
        };

        // 当前语言
        let currentLang = localStorage.getItem('preferredLang') ||
                         (navigator.language.startsWith('zh') ? 'zh-CN' : 'en');

        // 应用多语言
        function applyLanguage(lang) {
            currentLang = lang;
            localStorage.setItem('preferredLang', lang);

            const texts = i18n[lang];

            // 更新所有带 data-i18n 属性的元素
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (texts[key]) {
                    if (el.tagName === 'OPTGROUP') {
                        el.label = texts[key];
                    } else {
                        el.textContent = texts[key];
                    }
                }
            });

            // 更新 placeholder
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (texts[key]) {
                    el.placeholder = texts[key];
                }
            });

            // 更新语言选择器
            document.getElementById('langPicker').value = lang;
        }

        // 获取翻译文本
        function t(key) {
            return i18n[currentLang][key] || key;
        }

        const combinedContentInput = document.getElementById('combinedContentInput');
        const generateDocxButton = document.getElementById('generateDocxButton');
        const printPreviewButton = document.getElementById('printPreviewButton');
        const statusDiv = document.getElementById('status');
        const documentPreviewDiv = document.getElementById('documentPreview');
        const fontPicker = document.getElementById('fontPicker');
        const langPicker = document.getElementById('langPicker');

        // 主题和输出模式相关 DOM 元素
        const themePicker = document.getElementById('themePicker');
        const customThemeButton = document.getElementById('customThemeButton');
        const outputMode = document.getElementById('outputMode');
        const asciiCharsetLabel = document.getElementById('asciiCharsetLabel');
        const useAscii = document.getElementById('useAscii');
        const customThemeModal = document.getElementById('customThemeModal');
        const closeCustomThemeModal = document.getElementById('closeCustomThemeModal');
        const enableOptionalColors = document.getElementById('enableOptionalColors');
        const optionalColorsContent = document.getElementById('optionalColorsContent');
        const applyThemeButton = document.getElementById('applyThemeButton');
        const saveCustomThemeButton = document.getElementById('saveCustomThemeButton');
        const exportThemeButton = document.getElementById('exportThemeButton');
        const importThemeButton = document.getElementById('importThemeButton');
        const importThemeFile = document.getElementById('importThemeFile');

        // Mermaid 配置模态框相关 DOM 元素
        const mermaidConfigButton = document.getElementById('mermaidConfigButton');
        const mermaidConfigModal = document.getElementById('mermaidConfigModal');
        const closeMermaidConfigModal = document.getElementById('closeMermaidConfigModal');
        const closeMermaidConfigButton = document.getElementById('closeMermaidConfigButton');

        let debounceTimerPreview;
        let isSyncingScroll = false; // 防止循环触发
        let isUpdatingPreview = false; // 防止预览更新时触发同步滚动

        // 初始化语言
        applyLanguage(currentLang);

        // 语言切换事件
        langPicker.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
        });

        // ===== 保留原 Mermaid.js 配置（用于 Gantt, Pie 等图表） =====
        mermaid.initialize({
            startOnLoad: false, securityLevel: 'loose',
            flowchart: { htmlLabels: false, useMaxWidth: true }, theme: 'default',
            gantt: {
                fontSize: 20,
                sectionFontSize: 20,
                titleFontSize: 28,
                barHeight: 50,
                barGap: 10
            },
            themeVariables: {
                // 甘特图时间轴相关字体大小配置
                gridTextSize: '20px',      // 时间轴刻度标签字体大小 (默认约10px)
            }
        });

// ===== CDN 加载检测 =====
        // 检测 beautiful-mermaid 是否成功加载
        const beautifulMermaidLoaded = typeof beautifulMermaid !== 'undefined';
        if (!beautifulMermaidLoaded) {
            console.warn('beautiful-mermaid CDN 加载失败，主题功能不可用。所有图表将使用原生 Mermaid.js 渲染。');
            console.warn('备选 CDN: https://cdnjs.cloudflare.com/ajax/libs/beautiful-mermaid/0.1.3/beautiful-mermaid.browser.global.js');
        } else {
            console.log('✓ beautiful-mermaid 加载成功');
            console.log('✓ Mermaid.js 加载成功');
        }

        // 检测 MathJax 是否成功加载
        const mathJaxLoaded = typeof MathJax !== 'undefined';
        if (!mathJaxLoaded) {
            console.warn('MathJax CDN 加载失败，数学公式渲染功能不可用。');
            console.warn('备选 CDN: https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js');
        } else {
            console.log('✓ MathJax 加载成功');
        }

// 检测 html2canvas 是否成功加载
        const html2canvasLoaded = typeof html2canvas !== 'undefined';
        if (!html2canvasLoaded) {
            console.warn('html2canvas CDN 加载失败，数学公式导出为图片功能不可用。');
            console.warn('备选 CDN: https://unpkg.com/html2canvas@1.4.1/dist/html2canvas.min.js');
        } else {
            console.log('✓ html2canvas 加载成功');
        }

        // ===== 图表类型检测函数 =====
        /**
         * 检测 Mermaid 图表类型
         * @param {string} code - Mermaid 代码
         * @returns {string} 图表类型
         */
        function detectDiagramType(code) {
            const trimmed = code.trim().toLowerCase();
            if (trimmed.startsWith('graph ') || trimmed.startsWith('flowchart ')) return 'flowchart';
            if (trimmed.startsWith('statediagram')) return 'state';
            if (trimmed.startsWith('sequencediagram')) return 'sequence';
            if (trimmed.startsWith('classdiagram')) return 'class';
            if (trimmed.startsWith('erdiagram')) return 'er';
            if (trimmed.startsWith('gantt')) return 'gantt';
            if (trimmed.startsWith('pie')) return 'pie';
            if (trimmed.startsWith('journey')) return 'journey';
            if (trimmed.startsWith('gitgraph')) return 'gitGraph';
            if (trimmed.startsWith('mindmap')) return 'mindmap';
            if (trimmed.startsWith('timeline')) return 'timeline';
            if (trimmed.startsWith('sankey-beta')) return 'sankey';
            if (trimmed.startsWith('requirementdiagram')) return 'requirement';
            if (trimmed.startsWith('quadrantchart')) return 'quadrantChart';
            if (trimmed.startsWith('xychart-beta')) return 'xyChart';
            if (trimmed.startsWith('block-beta')) return 'block';
            if (trimmed.startsWith('packet-beta')) return 'packet';
            if (trimmed.startsWith('zenuml')) return 'zenuml';
            if (trimmed.startsWith('kanban')) return 'kanban';
            if (trimmed.startsWith('architecture-beta')) return 'architecture';
            if (trimmed.startsWith('c4context') || trimmed.startsWith('c4container') || trimmed.startsWith('c4component') || trimmed.startsWith('c4dynamic') || trimmed.startsWith('c4deployment')) return 'c4';
            // 默认尝试作为 flowchart
            return 'flowchart';
        }

        // ===== 主题管理系统 =====
        /**
         * ThemeManager 类 - 管理 beautiful-mermaid 主题
         */
        class ThemeManager {
            constructor() {
                // beautiful-mermaid 支持的图表类型
                this.supportedTypes = ['flowchart', 'state', 'sequence', 'class', 'er'];

                // 加载当前主题
                this.currentTheme = this.loadTheme();

                // 加载自定义主题列表
                this.customThemes = this.loadCustomThemes();
            }

            /**
             * 从 localStorage 加载主题
             */
            loadTheme() {
                try {
                    const saved = localStorage.getItem('selectedTheme');
                    if (saved) {
                        return JSON.parse(saved);
                    }
                } catch (e) {
                    console.error('加载主题失败:', e);
                }

                // 默认主题：zinc-light (如果 beautiful-mermaid 可用)
                if (beautifulMermaidLoaded && beautifulMermaid.THEMES && beautifulMermaid.THEMES['zinc-light']) {
                    return beautifulMermaid.THEMES['zinc-light'];
                }

                // 备用默认主题
                return { bg: '#ffffff', fg: '#09090b' };
            }

            /**
             * 保存主题到 localStorage
             */
            saveTheme(colors) {
                try {
                    localStorage.setItem('selectedTheme', JSON.stringify(colors));
                    this.currentTheme = colors;
                } catch (e) {
                    console.error('保存主题失败:', e);
                }
            }

            /**
             * 从 localStorage 加载自定义主题列表
             */
            loadCustomThemes() {
                try {
                    const saved = localStorage.getItem('customThemes');
                    if (saved) {
                        return JSON.parse(saved);
                    }
                } catch (e) {
                    console.error('加载自定义主题失败:', e);
                }
                return [];
            }

            /**
             * 保存自定义主题列表到 localStorage
             */
            saveCustomThemes() {
                try {
                    localStorage.setItem('customThemes', JSON.stringify(this.customThemes));
                } catch (e) {
                    console.error('保存自定义主题失败:', e);
                }
            }

            /**
             * 添加自定义主题
             */
            addCustomTheme(name, colors) {
                const theme = { id: `custom-${Date.now()}`, name, colors };
                this.customThemes.push(theme);
                this.saveCustomThemes();
                return theme;
            }

            /**
             * 删除自定义主题
             */
            deleteCustomTheme(id) {
                this.customThemes = this.customThemes.filter(t => t.id !== id);
                this.saveCustomThemes();
            }

            /**
             * 获取当前主题
             */
            getCurrentTheme() {
                return this.currentTheme;
            }

            /**
             * 判断图表类型是否支持主题
             */
            isTypeSupported(type) {
                return this.supportedTypes.includes(type);
            }
        }

        // 初始化主题管理器
        const themeManager = beautifulMermaidLoaded ? new ThemeManager() : null;

        // ===== 初始化主题选择器 =====
        if (beautifulMermaidLoaded && beautifulMermaid.THEMES) {
            // 清空现有选项
            themePicker.innerHTML = '';

            // 添加内置主题
            const themeNames = Object.keys(beautifulMermaid.THEMES);
            themeNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                // 格式化主题名称：zinc-light => Zinc Light
                option.textContent = name.split('-').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                themePicker.appendChild(option);
            });

            // 添加自定义主题
            if (themeManager && themeManager.customThemes.length > 0) {
                const separator = document.createElement('option');
                separator.disabled = true;
                separator.textContent = '--- ' + t('customThemes') + ' ---';
                themePicker.appendChild(separator);

                themeManager.customThemes.forEach(theme => {
                    const option = document.createElement('option');
                    option.value = theme.id;
                    option.textContent = theme.name;
                    themePicker.appendChild(option);
                });
            }
        } else {
            // beautiful-mermaid 未加载，禁用主题选择器
            themePicker.disabled = true;
            customThemeButton.disabled = true;
            themePicker.innerHTML = '<option>主题功能不可用</option>';
        }

        // ===== UI 事件处理 =====

        // 输出模式切换事件
        outputMode.addEventListener('change', (e) => {
            const mode = e.target.value;
            asciiCharsetLabel.style.display = mode === 'ascii' ? 'inline' : 'none';
            schedulePreviewUpdate();
        });

        // Pure ASCII 复选框切换
        useAscii.addEventListener('change', () => {
            if (outputMode.value === 'ascii') {
                schedulePreviewUpdate();
            }
        });

        // 主题选择事件
        themePicker.addEventListener('change', (e) => {
            if (!beautifulMermaidLoaded || !themeManager) return;

            const selectedValue = e.target.value;
            let selectedTheme;

            // 检查是否是内置主题
            if (beautifulMermaid.THEMES[selectedValue]) {
                selectedTheme = beautifulMermaid.THEMES[selectedValue];
            } else {
                // 检查是否是自定义主题
                const customTheme = themeManager.customThemes.find(t => t.id === selectedValue);
                if (customTheme) {
                    selectedTheme = customTheme.colors;
                }
            }

            if (selectedTheme) {
                themeManager.saveTheme(selectedTheme);
                schedulePreviewUpdate();
            }
        });

        // 自定义主题按钮点击事件
        customThemeButton.addEventListener('click', () => {
            if (!beautifulMermaidLoaded) {
                alert('beautiful-mermaid 未加载，主题功能不可用。');
                return;
            }

            // 加载当前主题到表单
            const currentTheme = themeManager ? themeManager.getCurrentTheme() : { bg: '#ffffff', fg: '#09090b' };
            document.getElementById('themeBg').value = currentTheme.bg || '#ffffff';
            document.getElementById('themeBgColor').value = currentTheme.bg || '#ffffff';
            document.getElementById('themeFg').value = currentTheme.fg || '#09090b';
            document.getElementById('themeFgColor').value = currentTheme.fg || '#09090b';

            if (currentTheme.line) {
                document.getElementById('themeLine').value = currentTheme.line;
                document.getElementById('themeLineColor').value = currentTheme.line;
            }
            if (currentTheme.accent) {
                document.getElementById('themeAccent').value = currentTheme.accent;
                document.getElementById('themeAccentColor').value = currentTheme.accent;
            }
            if (currentTheme.muted) {
                document.getElementById('themeMuted').value = currentTheme.muted;
                document.getElementById('themeMutedColor').value = currentTheme.muted;
            }
            if (currentTheme.surface) {
                document.getElementById('themeSurface').value = currentTheme.surface;
                document.getElementById('themeSurfaceColor').value = currentTheme.surface;
            }
            if (currentTheme.border) {
                document.getElementById('themeBorder').value = currentTheme.border;
                document.getElementById('themeBorderColor').value = currentTheme.border;
            }

            customThemeModal.style.display = 'block';
        });

        // 关闭模态框
        closeCustomThemeModal.addEventListener('click', () => {
            customThemeModal.style.display = 'none';
        });

        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            if (e.target === customThemeModal) {
                customThemeModal.style.display = 'none';
            }
        });

        // 启用可选颜色复选框
        enableOptionalColors.addEventListener('change', (e) => {
            if (e.target.checked) {
                optionalColorsContent.classList.add('show');
            } else {
                optionalColorsContent.classList.remove('show');
            }
        });

        // Mermaid 配置按钮点击事件
        mermaidConfigButton.addEventListener('click', () => {
            mermaidConfigModal.style.display = 'block';
        });

        // 关闭 Mermaid 配置模态框
        closeMermaidConfigModal.addEventListener('click', () => {
            mermaidConfigModal.style.display = 'none';
        });

        closeMermaidConfigButton.addEventListener('click', () => {
            mermaidConfigModal.style.display = 'none';
        });

        // 点击模态框外部关闭
        window.addEventListener('click', (e) => {
            if (e.target === mermaidConfigModal) {
                mermaidConfigModal.style.display = 'none';
            }
        });

        // 同步颜色选择器和文本输入框
        ['Bg', 'Fg', 'Line', 'Accent', 'Muted', 'Surface', 'Border'].forEach(colorName => {
            const colorInput = document.getElementById(`theme${colorName}Color`);
            const textInput = document.getElementById(`theme${colorName}`);

            if (colorInput && textInput) {
                colorInput.addEventListener('input', (e) => {
                    textInput.value = e.target.value;
                });

                textInput.addEventListener('input', (e) => {
                    const value = e.target.value;
                    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
                        colorInput.value = value;
                    }
                });
            }
        });

        // 应用主题按钮
        applyThemeButton.addEventListener('click', () => {
            if (!themeManager) return;

            const theme = {
                bg: document.getElementById('themeBg').value,
                fg: document.getElementById('themeFg').value
            };

            if (enableOptionalColors.checked) {
                const line = document.getElementById('themeLine').value;
                const accent = document.getElementById('themeAccent').value;
                const muted = document.getElementById('themeMuted').value;
                const surface = document.getElementById('themeSurface').value;
                const border = document.getElementById('themeBorder').value;

                if (line) theme.line = line;
                if (accent) theme.accent = accent;
                if (muted) theme.muted = muted;
                if (surface) theme.surface = surface;
                if (border) theme.border = border;
            }

            themeManager.saveTheme(theme);
            schedulePreviewUpdate();

            statusDiv.textContent = '主题已应用';
            setTimeout(() => statusDiv.textContent = '', 2000);
        });

        // 保存自定义主题按钮
        saveCustomThemeButton.addEventListener('click', () => {
            if (!themeManager) return;

            const name = prompt('请输入自定义主题名称:');
            if (!name) return;

            const theme = {
                bg: document.getElementById('themeBg').value,
                fg: document.getElementById('themeFg').value
            };

            if (enableOptionalColors.checked) {
                const line = document.getElementById('themeLine').value;
                const accent = document.getElementById('themeAccent').value;
                const muted = document.getElementById('themeMuted').value;
                const surface = document.getElementById('themeSurface').value;
                const border = document.getElementById('themeBorder').value;

                if (line) theme.line = line;
                if (accent) theme.accent = accent;
                if (muted) theme.muted = muted;
                if (surface) theme.surface = surface;
                if (border) theme.border = border;
            }

            const customTheme = themeManager.addCustomTheme(name, theme);

            // 添加到选择器
            const option = document.createElement('option');
            option.value = customTheme.id;
            option.textContent = name;
            themePicker.appendChild(option);
            themePicker.value = customTheme.id;

            themeManager.saveTheme(theme);
            customThemeModal.style.display = 'none';
            schedulePreviewUpdate();

            statusDiv.textContent = `自定义主题 "${name}" 已保存`;
            setTimeout(() => statusDiv.textContent = '', 2000);
        });

        // 导出主题按钮
        exportThemeButton.addEventListener('click', () => {
            if (!themeManager) return;

            const theme = {
                bg: document.getElementById('themeBg').value,
                fg: document.getElementById('themeFg').value
            };

            if (enableOptionalColors.checked) {
                const line = document.getElementById('themeLine').value;
                const accent = document.getElementById('themeAccent').value;
                const muted = document.getElementById('themeMuted').value;
                const surface = document.getElementById('themeSurface').value;
                const border = document.getElementById('themeBorder').value;

                if (line) theme.line = line;
                if (accent) theme.accent = accent;
                if (muted) theme.muted = muted;
                if (surface) theme.surface = surface;
                if (border) theme.border = border;
            }

            const exportData = {
                id: `custom-${Date.now()}`,
                name: 'Exported Theme',
                colors: theme
            };

            const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `theme-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);

            statusDiv.textContent = '主题已导出';
            setTimeout(() => statusDiv.textContent = '', 2000);
        });

        // 导入主题按钮
        importThemeButton.addEventListener('click', () => {
            importThemeFile.click();
        });

        importThemeFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedTheme = JSON.parse(event.target.result);

                    if (!importedTheme.colors || !importedTheme.colors.bg || !importedTheme.colors.fg) {
                        alert('无效的主题文件格式');
                        return;
                    }

                    // 加载到表单
                    document.getElementById('themeBg').value = importedTheme.colors.bg;
                    document.getElementById('themeBgColor').value = importedTheme.colors.bg;
                    document.getElementById('themeFg').value = importedTheme.colors.fg;
                    document.getElementById('themeFgColor').value = importedTheme.colors.fg;

                    if (importedTheme.colors.line) {
                        document.getElementById('themeLine').value = importedTheme.colors.line;
                        document.getElementById('themeLineColor').value = importedTheme.colors.line;
                        enableOptionalColors.checked = true;
                        optionalColorsContent.classList.add('show');
                    }
                    if (importedTheme.colors.accent) {
                        document.getElementById('themeAccent').value = importedTheme.colors.accent;
                        document.getElementById('themeAccentColor').value = importedTheme.colors.accent;
                    }
                    if (importedTheme.colors.muted) {
                        document.getElementById('themeMuted').value = importedTheme.colors.muted;
                        document.getElementById('themeMutedColor').value = importedTheme.colors.muted;
                    }
                    if (importedTheme.colors.surface) {
                        document.getElementById('themeSurface').value = importedTheme.colors.surface;
                        document.getElementById('themeSurfaceColor').value = importedTheme.colors.surface;
                    }
                    if (importedTheme.colors.border) {
                        document.getElementById('themeBorder').value = importedTheme.colors.border;
                        document.getElementById('themeBorderColor').value = importedTheme.colors.border;
                    }

                    statusDiv.textContent = '主题已导入';
                    setTimeout(() => statusDiv.textContent = '', 2000);
                } catch (error) {
                    alert('导入失败: ' + error.message);
                }
            };
            reader.readAsText(file);

            // 重置文件输入
            e.target.value = '';
        });

        async function loadDefaultMd() {
            statusDiv.textContent = t('loadingDefault');
            try {
                const response = await fetch('default.md');
                if (!response.ok) throw new Error(`${t('defaultLoadError')}${response.statusText} (Status: ${response.status}). Ensure page is served via HTTP/S.`);
                combinedContentInput.value = await response.text();
                statusDiv.textContent = t('defaultLoaded');
            } catch (error) {
                console.error("Error loading default.md:", error);
                statusDiv.textContent = `${t('defaultLoadError')}${error.message}. ${t('defaultLoadInfo')}`;
            }
            schedulePreviewUpdate();
        }

        // ===== Marked.js 扩展：支持行内数学公式 =====
        const inlineMathExtension = {
            name: 'inlineMath',
            level: 'inline',
            start(src) {
                // Match $ that's not part of $$
                const match = src.match(/(?<!\$)\$(?!\$)/);
                return match ? match.index : -1;
            },
            tokenizer(src, tokens) {
                // Match inline math: $...$ (not preceded or followed by another $)
                const rule = /(?<!\$)\$(?!\$)([^\$\n]+?)\$(?!\$)/;
                const match = rule.exec(src);
                if (match) {
                    return {
                        type: 'inlineMath',
                        raw: match[0],
                        text: match[1].trim()
                    };
                }
                return undefined;
            },
            renderer(token) {
                if (!mathJaxLoaded) {
                    return `<span class="math-inline math-error">${token.text}</span>`;
                }
                try {
                    // Render inline math using MathJax
                    return `<span class="math-inline">${MathJax.tex2svg(token.text, {display: false}).outerHTML}</span>`;
                } catch (e) {
                    console.error('Math rendering error:', e);
                    return `<span class="math-inline math-error">${token.text}</span>`;
                }
            }
        };

        // Register the extension with Marked.js
        marked.use({ extensions: [inlineMathExtension] });

        function parseCombinedContentFromTextarea(rawText) {
            const structure = [];
            // Split by code blocks (mermaid) and block math formulas ($$...$$)
            const parts = rawText.split(/(\n?```(?:mermaid)\n[\s\S]*?\n```\n?|\$\$[\s\S]*?\$\$)/g);
            let counter = 0;
            for (const part of parts) {
                if (!part || part.trim() === "") continue;
                
                // Match Mermaid code blocks
                const mermaidMatch = part.match(/^\n?```mermaid\n([\s\S]*?)\n```\n?$/);
                if (mermaidMatch) {
                    structure.push({ type: 'mermaid', content: mermaidMatch[1].trim(), id: `mermaid-${counter++}` });
                    continue;
                }
                
                // Match block math formulas ($$...$$)
                const blockMathMatch = part.match(/^\$\$([\s\S]*?)\$\$$/);
                if (blockMathMatch) {
                    structure.push({ 
                        type: 'math', 
                        content: blockMathMatch[1].trim(), 
                        id: `math-${counter++}`,
                        isBlock: true 
                    });
                    continue;
                }
                
                // Regular markdown content
                if (part.trim()) {
                    structure.push({ type: 'markdown', content: part });
                }
            }
            return structure;
        }

        // 同步滚动函数
        function syncScroll(source, target) {
            // 如果正在同步滚动或正在更新预览，则不执行
            if (isSyncingScroll || isUpdatingPreview) return;
            isSyncingScroll = true;

            const sourceScrollPercentage = source.scrollTop / (source.scrollHeight - source.clientHeight);
            const targetScrollTop = sourceScrollPercentage * (target.scrollHeight - target.clientHeight);
            target.scrollTop = targetScrollTop;

            setTimeout(() => {
                isSyncingScroll = false;
            }, 50);
        }

        // 为输入框和预览区域添加滚动事件监听
        combinedContentInput.addEventListener('scroll', () => {
            // 只有用户主动滚动编辑器时才同步到预览
            if (!isUpdatingPreview) {
                syncScroll(combinedContentInput, documentPreviewDiv);
            }
        });

        documentPreviewDiv.addEventListener('scroll', () => {
            // 只有用户主动滚动预览时才同步到编辑器
            if (!isUpdatingPreview) {
                syncScroll(documentPreviewDiv, combinedContentInput);
            }
        });

        function schedulePreviewUpdate() {
            clearTimeout(debounceTimerPreview);
            debounceTimerPreview = setTimeout(updateFullPreview, 500);
        }

        async function updateFullPreview() {
            // 标记正在更新预览，防止触发同步滚动
            isUpdatingPreview = true;

            // 保存编辑器当前的滚动位置
            const editorScrollTop = combinedContentInput.scrollTop;
            const editorScrollHeight = combinedContentInput.scrollHeight;
            const editorClientHeight = combinedContentInput.clientHeight;
            const editorScrollPercentage = editorScrollTop / (editorScrollHeight - editorClientHeight);

            statusDiv.textContent = t('loadingDefault');
            documentPreviewDiv.innerHTML = '';
            let selectedFontFamily = fontPicker.value;
            if (selectedFontFamily === 'Aptos') selectedFontFamily = 'Aptos, Calibri, sans-serif';
            documentPreviewDiv.style.fontFamily = selectedFontFamily;

            const rawContent = combinedContentInput.value;
            const documentStructure = parseCombinedContentFromTextarea(rawContent);
            const markedOptions = { gfm: true, breaks: true,mangle: false, headerIds: false }; // breaks: true for line breaks like in GitHub

            for (const segment of documentStructure) {
                if (segment.type === 'markdown') {
                    const previewSegmentDiv = document.createElement('div');
                    previewSegmentDiv.className = 'markdown-preview-segment';
                    previewSegmentDiv.innerHTML = marked.parse(segment.content, markedOptions);
                    documentPreviewDiv.appendChild(previewSegmentDiv);
                } else if (segment.type === 'math' && segment.id) {
                    // 处理数学公式段落
                    const container = document.createElement('div');
                    container.className = 'math-display-segment';
                    container.id = `preview-${segment.id}`;
                    documentPreviewDiv.appendChild(container);
                    
                    if (segment.content.trim()) {
                        try {
                            // 渲染数学公式
                            const renderedMath = await renderMath(segment.content, segment.id);
                            container.innerHTML = renderedMath;
                        } catch (e) {
                            console.error('[数学公式渲染错误]', e);
                            container.innerHTML = `<div class="error-message">Math Rendering Error: ${e.message}</div>`;
                        }
                    } else {
                        container.innerHTML = `<p><i>Empty math formula (ID: ${segment.id})</i></p>`;
                    }
                } else if (segment.type === 'mermaid' && segment.id) {
                    const container = document.createElement('div');
                    container.className = 'mermaid-preview-segment';
                    container.id = `preview-${segment.id}`;
                    documentPreviewDiv.appendChild(container);
                    if (segment.content.trim()) {
                        try {
                            // ===== 混合渲染逻辑 =====
                            const diagramType = detectDiagramType(segment.content);
                            const currentTheme = themeManager ? themeManager.getCurrentTheme() : { bg: '#ffffff', fg: '#09090b' };
                            const currentOutputMode = outputMode.value;
                            const useAsciiMode = useAscii.checked;

                            // beautiful-mermaid 支持的类型
                            // 注意：当前 beautiful-mermaid 0.1.3 的状态图渲染可能有问题，暂时使用 mermaid.js
                            const supportedTypes = ['flowchart', 'sequence', 'class', 'er']; // 'state' 暂时移除

                            // 检查是否强制使用经典模式
                            const forceClassic = (currentOutputMode === 'classic');

                            if (beautifulMermaidLoaded && supportedTypes.includes(diagramType) && !forceClassic) {
                                // 使用 beautiful-mermaid 渲染
                                console.log(`[beautiful-mermaid] 渲染类型: ${diagramType}, 模式: ${currentOutputMode}`);
                                if (currentOutputMode === 'svg') {
                                    // SVG 模式
                                    const svg = await beautifulMermaid.renderMermaid(segment.content, currentTheme);
                                    console.log(`[beautiful-mermaid] SVG 长度: ${svg.length}`);
                                    container.innerHTML = svg;
                                } else {
                                    // ASCII 模式
                                    const asciiArt = beautifulMermaid.renderMermaidAscii(segment.content, { useAscii: useAsciiMode });
                                    container.className = 'ascii-preview-segment';
                                    const pre = document.createElement('pre');
                                    pre.textContent = asciiArt;

                                    const copyBtn = document.createElement('button');
                                    copyBtn.className = 'copy-ascii-btn';
                                    copyBtn.textContent = t('copyAsciiButton');
                                    copyBtn.onclick = () => {
                                        navigator.clipboard.writeText(asciiArt).then(() => {
                                            copyBtn.textContent = t('asciiCopied');
                                            setTimeout(() => copyBtn.textContent = t('copyAsciiButton'), 2000);
                                        });
                                    };

                                    container.appendChild(pre);
                                    container.appendChild(copyBtn);
                                }
                            } else {
                                // 使用原生 Mermaid.js 渲染（经典模式 / Gantt / Pie / Journey 等）
                                if (currentOutputMode === 'ascii') {
                                    // mermaid.js 不支持 ASCII，显示提示
                                    container.innerHTML = `<div class="error-message">ASCII 模式不支持 ${diagramType} 图表类型（仅支持 Flowchart, Sequence, Class, ER）</div>`;
                                } else {
                                    // SVG 模式（包括 classic 模式）
                                    const renderId = `previewSvg-${segment.id}-${Date.now()}${Math.random().toString(16).slice(2)}`;
                                    const { svg } = await mermaid.render(renderId, segment.content);
                                    container.innerHTML = svg;
                                }
                            }
                        } catch (e) {
                            console.error(`[渲染错误] 图表类型: ${detectDiagramType(segment.content)}`, e);
                            console.error(`[渲染错误] 代码:`, segment.content);
                            container.innerHTML = `<div class="error-message">Preview Error: ${e.str || e.message || e}</div>`;
                        }
                    } else { container.innerHTML = `<p><i>Empty Mermaid diagram (ID: ${segment.id})</i></p>`; }
                }
            }
            if (!documentStructure.length && rawContent.trim() === "") documentPreviewDiv.innerHTML = `<p><i>${t('previewPlaceholder')}</i></p>`;
            statusDiv.textContent = '';

            // 延迟恢复同步滚动，等待 DOM 更新完成
            setTimeout(() => {
                // 恢复编辑器的滚动位置（基于之前的百分比）
                const newEditorScrollHeight = combinedContentInput.scrollHeight;
                const newEditorClientHeight = combinedContentInput.clientHeight;
                if (!isNaN(editorScrollPercentage) && isFinite(editorScrollPercentage)) {
                    combinedContentInput.scrollTop = editorScrollPercentage * (newEditorScrollHeight - newEditorClientHeight);
                }

                // 预览区域同步到编辑器位置
                if (!isNaN(editorScrollPercentage) && isFinite(editorScrollPercentage)) {
                    const previewScrollHeight = documentPreviewDiv.scrollHeight;
                    const previewClientHeight = documentPreviewDiv.clientHeight;
                    documentPreviewDiv.scrollTop = editorScrollPercentage * (previewScrollHeight - previewClientHeight);
                }

                // 恢复同步滚动
                isUpdatingPreview = false;
            }, 100);
        }

        combinedContentInput.addEventListener('input', schedulePreviewUpdate);
        fontPicker.addEventListener('change', schedulePreviewUpdate);
        document.addEventListener('DOMContentLoaded', loadDefaultMd);
        printPreviewButton.addEventListener('click', () => window.print());

        // ===== 数学公式渲染函数 =====
        /**
         * 渲染块级数学公式
         * @param {string} latex - LaTeX 代码
         * @param {string} containerId - 容器 ID
         * @returns {Promise<string>} 渲染后的 HTML
         */
        async function renderMath(latex, containerId) {
            if (!mathJaxLoaded) {
                return `<div class="error-message">MathJax 未加载，无法渲染数学公式</div>`;
            }
            
            try {
                // 使用 MathJax 渲染公式
                const svg = MathJax.tex2svg(latex, { display: true });
                return svg.outerHTML;
            } catch (e) {
                console.error('数学公式渲染错误:', e);
                return `<div class="error-message">数学公式渲染失败: ${e.message}</div>`;
            }
        }

        /**
         * 将数学公式渲染为 PNG 图片（用于 DOCX 导出）
         * @param {string} latex - LaTeX 代码
         * @param {string} formulaId - 公式 ID
         * @param {boolean} isBlock - 是否为块级公式
         * @returns {Promise<Blob|null>} PNG Blob 或 null
         */
        async function renderMathToPng(latex, formulaId, isBlock = true) {
            if (!latex.trim()) return null;
            if (!mathJaxLoaded) {
                console.warn('MathJax 未加载，无法导出数学公式');
                return null;
            }
            
            try {
                // 创建临时容器（用于获得稳定的 SVG 尺寸）
                const tempContainer = document.createElement('div');
                tempContainer.style.position = 'absolute';
                tempContainer.style.left = '-9999px';
                tempContainer.style.top = '-9999px';
                tempContainer.style.display = 'inline-block';
                tempContainer.style.width = 'auto';
                tempContainer.style.backgroundColor = 'transparent';
                tempContainer.style.padding = '10px';
                tempContainer.style.whiteSpace = 'nowrap';
                document.body.appendChild(tempContainer);
                
                // 渲染数学公式（MathJax 返回容器，内部包含真正的 <svg>）
                const mathNode = MathJax.tex2svg(latex, { display: isBlock });
                tempContainer.appendChild(mathNode);
                const svgElement = mathNode.querySelector('svg') || mathNode;
                
                // 等待布局稳定
                await new Promise(resolve => requestAnimationFrame(resolve));

                // 直接将 SVG 转为 PNG，避免 html2canvas 捕获辅助层导致重叠
                const rect = svgElement.getBoundingClientRect();
                const width = Math.max(1, Math.ceil(rect.width));
                const height = Math.max(1, Math.ceil(rect.height));

                const clonedSvg = svgElement.cloneNode(true);
                clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                clonedSvg.setAttribute('width', String(width));
                clonedSvg.setAttribute('height', String(height));
                if (!clonedSvg.getAttribute('viewBox')) {
                    clonedSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
                }

                const serializedSvg = new XMLSerializer().serializeToString(clonedSvg);
                const svgBlob = new Blob([serializedSvg], { type: 'image/svg+xml;charset=utf-8' });
                const svgUrl = URL.createObjectURL(svgBlob);

                const image = new Image();
                image.src = svgUrl;
                await new Promise((resolve, reject) => {
                    image.onload = resolve;
                    image.onerror = reject;
                });

                const scale = 2;
                const canvas = document.createElement('canvas');
                canvas.width = width * scale;
                canvas.height = height * scale;
                const ctx = canvas.getContext('2d');
                ctx.scale(scale, scale);
                ctx.drawImage(image, 0, 0, width, height);

                URL.revokeObjectURL(svgUrl);
                
                // 移除临时容器
                document.body.removeChild(tempContainer);
                
                // 转换为 Blob
                return new Promise((resolve, reject) => {
                    canvas.toBlob(blob => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Canvas toBlob failed'));
                        }
                    }, 'image/png');
                });
            } catch (e) {
                console.error(`Error in renderMathToPng for ${formulaId}:`, e);
                return null;
            }
        }

        async function renderMermaidToPng(mermaidDefinition, diagramId) {
            if (!mermaidDefinition.trim()) return null;
            try {
                // ===== 混合渲染逻辑（DOCX 导出） =====
                const diagramType = detectDiagramType(mermaidDefinition);
                const currentTheme = themeManager ? themeManager.getCurrentTheme() : { bg: '#ffffff', fg: '#09090b' };
                const currentOutputMode = outputMode.value;

                // beautiful-mermaid 支持的类型
                // 注意：当前 beautiful-mermaid 0.1.3 的状态图渲染可能有问题，暂时使用 mermaid.js
                const supportedTypes = ['flowchart', 'sequence', 'class', 'er']; // 'state' 暂时移除

                let svg;
                let bgColor = 'white';

                // DOCX 导出时，如果当前是经典模式，则所有图表使用 mermaid.js
                const forceClassic = (currentOutputMode === 'classic');

                if (beautifulMermaidLoaded && supportedTypes.includes(diagramType) && !forceClassic) {
                    // 使用 beautiful-mermaid 渲染（应用主题）
                    svg = await beautifulMermaid.renderMermaid(mermaidDefinition, currentTheme);
                    bgColor = currentTheme.bg || 'white';
                } else {
                    // 使用原生 Mermaid.js 渲染（经典模式 / Gantt / Pie / Journey 等）
                    const result = await mermaid.render(`pngSvg-${diagramId}-${Date.now()}`, mermaidDefinition);
                    svg = result.svg;
                    bgColor = 'white';
                }

                if (!svg) throw new Error("Mermaid.render failed: no SVG string.");
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svg, "image/svg+xml");
                const svgElement = svgDoc.documentElement;
                if (svgElement.tagName === "parsererror" || !svgElement || svgElement.querySelector("parsererror")) throw new Error("Failed to parse SVG.");

                svgElement.style.backgroundColor = bgColor;
                svgElement.querySelectorAll("tspan, text").forEach(t => t.removeAttribute("xml:space"));
                const cleanedSvgString = new XMLSerializer().serializeToString(svgElement);

                return new Promise((resolve, reject) => {
                    const img = new Image();
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    img.onload = () => {
                        let svgW = parseFloat(svgElement.getAttribute('width')) || img.naturalWidth || 600;
                        let svgH = parseFloat(svgElement.getAttribute('height')) || img.naturalHeight || 400;
                        const viewBox = svgElement.getAttribute('viewBox');
                        if (viewBox) { const parts = viewBox.split(/[\s,]+/); if (parts.length === 4) { svgW = parseFloat(parts[2]) || svgW; svgH = parseFloat(parts[3]) || svgH; }}
                        if (svgW <= 0 || svgH <= 0) { reject(new Error(`Invalid SVG dimensions for ${diagramId}`)); return; }

                        const scale = 1.5;
                        canvas.width = Math.max(1, Math.round(svgW * scale));
                        canvas.height = Math.max(1, Math.round(svgH * scale));
                        ctx.fillStyle = bgColor; ctx.fillRect(0, 0, canvas.width, canvas.height);
                        if(scale !== 1.0) ctx.scale(scale, scale);
                        ctx.drawImage(img, 0, 0, svgW, svgH);
                        canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("Canvas toBlob failed.")), 'image/png');
                    };
                    img.onerror = () => reject(new Error("Failed to load SVG Data URL into image."));
                    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(cleanedSvgString)));
                });
            } catch (e) { console.error(`Error in renderMermaidToPng for ${diagramId}:`, e); statusDiv.textContent = `Error PNG ${diagramId}: ${e.message}`; return null; }
        }

        function processInlineFormatting(parentNode, docxGlobal, options = {}) {
            const runs = [];
            const selectedFont = fontPicker.value;

            Array.from(parentNode.childNodes).forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    runs.push(new docxGlobal.TextRun({ text: child.textContent, ...options }));
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    let currentOptions = { ...options }; // Inherit options from parent
                    const tagName = child.tagName.toLowerCase();

                    if (['ul', 'ol', 'table', 'thead', 'tbody', 'tr', 'th', 'td'].includes(tagName)) return; // Handled by block parser

                    switch (tagName) {
                        case 'strong': case 'b': currentOptions.bold = true; break;
                        case 'em': case 'i': currentOptions.italics = true; break;
                        case 'u': currentOptions.underline = {}; break;
                        case 'br': runs.push(new docxGlobal.TextRun({ break: 1, ...options })); return;
                        case 'del': case 's': currentOptions.strike = true; break;
                        case 'code': // Inline code
                            currentOptions.font = { name: "Courier New" }; // Monospace font
                            currentOptions.size = 20; // 10pt size
                            currentOptions.shading = { type: docxGlobal.ShadingType.SOLID, color: "auto", fill: "F0F0F0" }; // Light gray background
                            break;
                        case 'a': // Links
                            const href = child.getAttribute('href');
                            if (href) {
                                // Recursively process children of <a> to get TextRuns for the link text
                                const linkTextRuns = processInlineFormatting(child, docxGlobal, { ...currentOptions, style: "Hyperlink" }); // Apply Hyperlink style
                                linkTextRuns.forEach(run => {
                                    // The Hyperlink object itself will contain these runs.
                                    // For ExternalHyperlink, children should be TextRun[]
                                });
                                runs.push(new docxGlobal.ExternalHyperlink({
                                    children: linkTextRuns,
                                    link: href,
                                }));
                            }
                            return; // Handled link, stop further processing of this node here
                    }
                    // Recursively process children with current options
                    runs.push(...processInlineFormatting(child, docxGlobal, currentOptions));
                }
            });
            return runs;
        }

        function parseMarkdownToDocxElements(markdownText, docxGlobal) {
            const elements = [];
            // GFM tables, strikethrough, task lists. breaks: true for GFM line breaks (2 spaces at end of line)
            const markedOptions = { gfm: true, breaks: true, mangle: false, headerIds: false };
            const html = marked.parse(markdownText, markedOptions);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            const selectedFont = fontPicker.value;

            // 获取列表项的嵌套层级。顶层列表（直接在 tempDiv 下）应返回 0。
            // 因为 li 的父元素是 ul/ol，所以计数需要减 1 才能得到正确的层级。
            const getListLevel = (elementNode) => { /* ... same ... */  let l=0; let c=elementNode.parentElement; while(c&&c!==tempDiv){if(c.tagName==='UL'||c.tagName==='OL')l++; c=c.parentElement;} return Math.max(0, l - 1);};

            const processNode = (node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    const tagName = node.tagName.toLowerCase();
                    let paragraphOptions = { style: "Normal" }; // Default to Normal style for paragraphs

                    switch (tagName) {
                        case 'h1': paragraphOptions = { heading: docxGlobal.HeadingLevel.HEADING_1 }; break;
                        case 'h2': paragraphOptions = { heading: docxGlobal.HeadingLevel.HEADING_2 }; break;
                        case 'h3': paragraphOptions = { heading: docxGlobal.HeadingLevel.HEADING_3 }; break;
                        case 'h4': paragraphOptions = { heading: docxGlobal.HeadingLevel.HEADING_4 }; break;
                        case 'h5': paragraphOptions = { heading: docxGlobal.HeadingLevel.HEADING_5 }; break;
                        case 'h6': paragraphOptions = { heading: docxGlobal.HeadingLevel.HEADING_6 }; break;
                        case 'p': break; // Will use default paragraphOptions ("Normal")
                        case 'blockquote': paragraphOptions = { style: "IntenseQuote" }; break;
                        case 'hr': elements.push(new docxGlobal.Paragraph({ thematicBreak: true })); return;
                        case 'pre':
                            const codeElement = node.querySelector('code');
                            const codeText = codeElement ? codeElement.textContent : node.textContent;
                            // Split by lines and create a paragraph for each to preserve line breaks
                            codeText.split('\n').forEach(line => {
                                elements.push(new docxGlobal.Paragraph({
                                    children: [new docxGlobal.TextRun({ text: line })], // Font & size from style
                                    style: "SourceCode"
                                }));
                            });
                            return;
                        case 'ul': case 'ol':
                            Array.from(node.children).forEach(li => {
                                if (li.tagName.toLowerCase() === 'li') {
                                    const level = getListLevel(li);
                                    // Handle task list items (GFM extension for marked.js)
                                    const isTaskItem = li.classList.contains("task-list-item");
                                    const isChecked = isTaskItem && li.querySelector("input[type='checkbox']")?.checked;

                                    let prefix = "";
                                    if (isTaskItem) { prefix = isChecked ? "☑ " : "☐ "; }

                                    const contentDiv = document.createElement('div');
                                    Array.from(li.childNodes).forEach(childNode => {
                                        if (childNode.nodeType === Node.ELEMENT_NODE && childNode.tagName === 'INPUT' && childNode.type === 'checkbox') return;
                                        if (childNode.nodeType === Node.ELEMENT_NODE && (childNode.tagName === 'UL' || childNode.tagName === 'OL')) return;
                                        contentDiv.appendChild(childNode.cloneNode(true));
                                    });

                                    let textRuns = processInlineFormatting(contentDiv, docxGlobal);
                                    if (prefix) {
                                        textRuns.unshift(new docxGlobal.TextRun({ text: prefix, font: { name: selectedFont }, size: 20 }));
                                    }

                                    // 为任务列表项设置缩进，每级缩进 720 单位（0.5 英寸）
                                    const paragraphOptions = {
                                        children: textRuns,
                                        bullet: tagName === 'ul' && !isTaskItem ? { level: level } : undefined, // No bullet for task items if prefix is used
                                        numbering: tagName === 'ol' ? { reference: "default-numbering", level: level } : undefined
                                    };

                                    // 如果是任务列表项，手动添加缩进以匹配列表层级
                                    if (isTaskItem) {
                                        paragraphOptions.indent = { left: 720 * (level + 1) }; // 每级 720 单位
                                    }

                                    elements.push(new docxGlobal.Paragraph(paragraphOptions));
                                    Array.from(li.children).forEach(childNodeInLi => {
                                        if (childNodeInLi.tagName.toLowerCase() === 'ul' || childNodeInLi.tagName.toLowerCase() === 'ol') {
                                            processNode(childNodeInLi);
                                        }
                                    });
                                }
                            });
                            return;
                        case 'table':
                            const rows = [];
                            Array.from(node.querySelectorAll('tr')).forEach(trElement => {
                                const cells = [];
                                Array.from(trElement.querySelectorAll('th, td')).forEach(cellElement => {
                                    const cellContentDiv = document.createElement('div');
                                    // Preserve inline elements within table cells
                                    Array.from(cellElement.childNodes).forEach(child => cellContentDiv.appendChild(child.cloneNode(true)));

                                    // 读取 colspan 和 rowspan 属性，支持 HTML table 的单元格合并
                                    const colspan = Math.max(1, parseInt(cellElement.getAttribute('colspan')) || 1);
                                    const rowspan = Math.max(1, parseInt(cellElement.getAttribute('rowspan')) || 1);

                                    cells.push(new docxGlobal.TableCell({
                                        children: [new docxGlobal.Paragraph({ children: processInlineFormatting(cellContentDiv, docxGlobal) })],
                                        columnSpan: colspan,  // 列合并
                                        rowSpan: rowspan,     // 行合并
                                        borders: { // Add default borders to table cells
                                            top: { style: docxGlobal.BorderStyle.SINGLE, size: 1, color: "auto" },
                                            bottom: { style: docxGlobal.BorderStyle.SINGLE, size: 1, color: "auto" },
                                            left: { style: docxGlobal.BorderStyle.SINGLE, size: 1, color: "auto" },
                                            right: { style: docxGlobal.BorderStyle.SINGLE, size: 1, color: "auto" },
                                        },
                                        // Vertical align can be set here if needed: verticalAlign: docx.VerticalAlign.TOP
                                    }));
                                });
                                rows.push(new docxGlobal.TableRow({ children: cells }));
                            });
                            if (rows.length > 0) {
                                elements.push(new docxGlobal.Table({
                                    rows: rows,
                                    width: { size: 100, type: docxGlobal.WidthType.PERCENTAGE } // Make table full width
                                }));
                            }
                            return;
                        default: // For unhandled block elements or raw HTML (like the <p style="color:red">)
                             if (node.textContent.trim()) { // Process its text content as a normal paragraph
                                paragraphOptions = { style: "Normal" };
                             } else return;
                    }
                    // Common processing for text-based block elements (h1-h6, p, blockquote default)
                    elements.push(new docxGlobal.Paragraph({
                        children: processInlineFormatting(node, docxGlobal),
                        ...paragraphOptions
                    }));

                } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    // This should ideally be caught by a parent element's processing of inline content
                    elements.push(new docxGlobal.Paragraph({ children: [new docxGlobal.TextRun(node.textContent.trim())], style: "Normal" }));
                }
            };
            Array.from(tempDiv.childNodes).forEach(processNode);
            return elements;
        }

        // 从内容中提取文件名
        function extractFileName(content) {
            if (!content || !content.trim()) {
                return 'document';
            }

            // 尝试匹配第一个标题 (# 标题)
            const headingMatch = content.match(/^#+\s+(.+)$/m);
            if (headingMatch && headingMatch[1]) {
                return sanitizeFileName(headingMatch[1].trim());
            }

            // 如果没有标题，取第一行非空文本
            const lines = content.split('\n');
            for (const line of lines) {
                const trimmed = line.trim();
                // 跳过空行、代码块标记、分隔线等
                if (trimmed &&
                    !trimmed.startsWith('```') &&
                    !trimmed.startsWith('---') &&
                    !trimmed.startsWith('===') &&
                    trimmed !== '***' &&
                    trimmed !== '___') {
                    return sanitizeFileName(trimmed);
                }
            }

            return 'document';
        }

        // 清理文件名，移除非法字符
        function sanitizeFileName(name) {
            // 移除或替换文件名中的非法字符
            let cleaned = name
                .replace(/[<>:"/\\|?*]/g, '') // 移除 Windows 非法字符
                .replace(/\s+/g, '_')          // 空格替换为下划线
                .replace(/[^\u0000-\u007F\u4e00-\u9fa5]/g, '') // 保留 ASCII 和中文
                .trim();

            // 限制长度
            if (cleaned.length > 50) {
                cleaned = cleaned.substring(0, 50);
            }

            // 如果清理后为空，返回默认名称
            return cleaned || 'document';
        }

        generateDocxButton.addEventListener('click', async () => {
            generateDocxButton.disabled = true;
            statusDiv.textContent = t('generating');
            const selectedFont = fontPicker.value;
            const docxGlobal = window.docx;
            if (!docxGlobal) { statusDiv.textContent = t('error') + 'DOCX library not loaded.'; generateDocxButton.disabled = false; return; }

            try {
                // DOCX 图片尺寸约束：基于 A4 纸张（8.27英寸宽）减去左右边距（各1英寸）
                // 可用宽度 = 8.27 - 2 = 6.27 英寸 ≈ 602 像素（在 96 DPI 下）
                const MAX_IMAGE_WIDTH_PIXELS = 602;

                const finalDocChildren = [];
                const rawContent = combinedContentInput.value;
                const documentStructure = parseCombinedContentFromTextarea(rawContent);

                for (const segment of documentStructure) {
                    if (segment.type === 'markdown' && segment.content.trim()) {
                        const markdownElements = parseMarkdownToDocxElements(segment.content, docxGlobal);
                        finalDocChildren.push(...markdownElements);
                    } else if (segment.type === 'math' && segment.id) {
                        // 处理数学公式导出
                        statusDiv.textContent = `${t('generating')} Math ${segment.id}...`;
                        const pngBlob = await renderMathToPng(segment.content, segment.id, segment.isBlock);
                        if (pngBlob) {
                            const imageBuffer = await pngBlob.arrayBuffer();
                            const tempImg = new Image(); tempImg.src = URL.createObjectURL(pngBlob);
                            await new Promise(r => tempImg.onload=r); URL.revokeObjectURL(tempImg.src);
                            if (tempImg.naturalWidth > 0 && tempImg.naturalHeight > 0) {
                                // 计算缩放比例以适应页面宽度
                                let finalWidth = tempImg.naturalWidth;
                                let finalHeight = tempImg.naturalHeight;
                                
                                if (finalWidth > MAX_IMAGE_WIDTH_PIXELS) {
                                    const scale = MAX_IMAGE_WIDTH_PIXELS / finalWidth;
                                    finalWidth = MAX_IMAGE_WIDTH_PIXELS;
                                    finalHeight = Math.round(tempImg.naturalHeight * scale);
                                }
                                
                                finalDocChildren.push(new docxGlobal.Paragraph({
                                    children: [new docxGlobal.ImageRun({ 
                                        data: imageBuffer, 
                                        transformation: { width: finalWidth, height: finalHeight }, 
                                        type: "png", 
                                        fileName: `${segment.id}.png` 
                                    })],
                                    alignment: docxGlobal.AlignmentType.CENTER,
                                    spacing: { before: 200, after: 200 }
                                }));
                            } else {
                                finalDocChildren.push(new docxGlobal.Paragraph({
                                    children: [new docxGlobal.TextRun({
                                        text: `[Math formula ${segment.id} invalid dimensions]`,
                                        italics: true
                                    })]
                                }));
                            }
                        } else {
                            finalDocChildren.push(new docxGlobal.Paragraph({
                                children: [new docxGlobal.TextRun({
                                    text: `[Math formula ${segment.id} could not generate]`,
                                    italics: true
                                })]
                            }));
                        }
                    } else if (segment.type === 'mermaid' && segment.id) {
                        statusDiv.textContent = `${t('generating')} Mermaid ${segment.id}...`;
                        const pngBlob = await renderMermaidToPng(segment.content, segment.id);
                        if (pngBlob) {
                            const imageBuffer = await pngBlob.arrayBuffer();
                            const tempImg = new Image(); tempImg.src = URL.createObjectURL(pngBlob);
                            await new Promise(r => tempImg.onload=r); URL.revokeObjectURL(tempImg.src);
                            if (tempImg.naturalWidth > 0 && tempImg.naturalHeight > 0) {
                                // 计算缩放比例以适应页面宽度（仅缩小不放大）
                                let finalWidth = tempImg.naturalWidth;
                                let finalHeight = tempImg.naturalHeight;

                                if (finalWidth > MAX_IMAGE_WIDTH_PIXELS) {
                                    const scale = MAX_IMAGE_WIDTH_PIXELS / finalWidth;
                                    finalWidth = MAX_IMAGE_WIDTH_PIXELS;
                                    finalHeight = Math.round(tempImg.naturalHeight * scale);
                                }

                                finalDocChildren.push(new docxGlobal.Paragraph({
                                    children: [new docxGlobal.ImageRun({ data: imageBuffer, transformation: { width: finalWidth, height: finalHeight }, type:"png", fileName: `${segment.id}.png` })],
                                    alignment: docxGlobal.AlignmentType.CENTER, spacing: { before: 200, after: 200 }
                                }));
                            } else { finalDocChildren.push(new docxGlobal.Paragraph({children: [new docxGlobal.TextRun({text: `[Mermaid image ${segment.id} invalid dimensions]`, italics: true})]}))}
                        } else { finalDocChildren.push(new docxGlobal.Paragraph({children: [new docxGlobal.TextRun({text: `[Mermaid image ${segment.id} could not generate]`, italics: true})]}))}
                    }
                }

                const documentStyles = {
                    default: {
                        document: { run: { font: selectedFont } }, // Base font for document, size set by Normal style
                        heading1: { run: { font: selectedFont, bold: true, size: 36 } },
                        heading2: { run: { font: selectedFont, bold: true, size: 28 } },
                        heading3: { run: { font: selectedFont, bold: true, size: 24 } },
                        heading4: { run: { font: selectedFont, italics: true, size: 24 } },
                        heading5: { run: { font: selectedFont, bold: true, size: 22 } },
                        heading6: { run: { font: selectedFont, bold: true, size: 20 } },
                    },
                     paragraphStyles: [
                         { id: "Normal", name: "Normal", basedOn: "Normal", next: "Normal", run: { font: selectedFont, size: 20 }, paragraph: { spacing: { line: 360, rule: docxGlobal.LineRuleType.AUTO } } }, // 10pt, 1.5倍行距
                         { id: "SourceCode", name: "Source Code", basedOn: "Normal", next: "Normal",
                             run: { font: { name: "Courier New" }, size: 18 }, // Code blocks: 9pt
                             paragraph: { indent: { left: 400 }, spacing: { before: 100, after: 100, line: 360, rule: docxGlobal.LineRuleType.AUTO }, keepLines: true }, // Keep lines together for code, 1.5倍行距
                         },
                         { id: "IntenseQuote", name: "Intense Quote", basedOn: "Normal", next: "Normal",
                             run: { italics: true, color: "4F81BD", font: { name: selectedFont }, size: 20 }, // Changed color to match Word's default
                             paragraph: { indent: { left: 720, right: 720 }, spacing: { line: 360, rule: docxGlobal.LineRuleType.AUTO } }, // 1.5倍行距
                         },
                     ],
                    characterStyles: [ // Define Hyperlink character style
                        { id: "Hyperlink", name: "Hyperlink", basedOn: "DefaultParagraphFont", run: { color: "0563C1", underline: { type: docxGlobal.UnderlineType.SINGLE } } }
                    ]
                };

                const fullDoc = new docxGlobal.Document({
                    creator: "MarkdownMermaidToDocx", styles: documentStyles,
                    sections: [{ properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }}},
                        children: finalDocChildren.length > 0 ? finalDocChildren : [new docxGlobal.Paragraph("Document is empty.")]
                    }],
                    numbering: { config: [{ reference: "default-numbering",
                        levels: [
                            { level: 0, format: "decimal", text: "%1.", style: { paragraph: { indent: { left: 720, hanging: 360 }}}, run: { font: selectedFont, size: 20 } },
                            { level: 1, format: "lowerLetter", text: "%2)", style: { paragraph: { indent: { left: 1440, hanging: 360 }}}, run: { font: selectedFont, size: 20 } },
                            { level: 2, format: "lowerRoman", text: "%3.", style: { paragraph: { indent: { left: 2160, hanging: 360 }}}, run: { font: selectedFont, size: 20 } },
                            // Add more levels if needed based on default.md nesting
                            { level: 3, format: "decimal", text: "%4.", style: { paragraph: { indent: { left: 2880, hanging: 360 }}}, run: { font: selectedFont, size: 20 } },
                            { level: 4, format: "lowerLetter", text: "%5)", style: { paragraph: { indent: { left: 3600, hanging: 360 }}}, run: { font: selectedFont, size: 20 } },
                            { level: 5, format: "lowerRoman", text: "%6.", style: { paragraph: { indent: { left: 4320, hanging: 360 }}}, run: { font: selectedFont, size: 20 } },
                        ],
                    }]},
                });
                const blob = await docxGlobal.Packer.toBlob(fullDoc);

                // 从内容中提取文件名
                const fileName = extractFileName(rawContent);
                saveAs(blob, `${fileName}_${window.location.host}.docx`);

                statusDiv.textContent = t('success');
            } catch (e) { console.error("Error DOCX gen:", e, e.stack); statusDiv.textContent = `${t('error')}${e.message}`; }
            finally { generateDocxButton.disabled = false; }
        });

        printPreviewButton.addEventListener('click', () => {
            statusDiv.textContent = t('printPrompt');
            window.print();
        });
