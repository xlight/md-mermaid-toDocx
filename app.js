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
                viewModeSplit: '分栏',
                viewModeEditor: '仅编辑',
                viewModePreview: '仅预览',
                more: '更多'
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
                viewModeSplit: 'Split',
                viewModeEditor: 'Editor',
                viewModePreview: 'Preview',
                more: 'More'
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
            const langPickerMobileEl = document.getElementById('langPickerMobile');
            if (langPickerMobileEl) {
                langPickerMobileEl.value = lang;
            }
        }

        // 获取翻译文本
        function t(key) {
            return i18n[currentLang][key] || key;
        }

        const combinedContentInput = document.getElementById('combinedContentInput');
        const generateDocxButton = document.getElementById('generateDocxButton');
        const printPreviewButton = document.getElementById('printPreviewButton');
        const statusDiv = document.getElementById('status');
        const toastContainer = document.getElementById('toastContainer');
        const toolbarProgressLine = document.getElementById('toolbarProgress');
        const documentPreviewDiv = document.getElementById('documentPreview');
        const fontPicker = document.getElementById('fontPicker');
        const langPicker = document.getElementById('langPicker');
        const langPickerMobile = document.getElementById('langPickerMobile');

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

        // 工作区布局相关 DOM 元素
        const editorPreviewContainer = document.querySelector('.editor-preview-container');
        const editorWrapper = document.querySelector('.editor-wrapper');
        const previewWrapper = document.querySelector('.preview-wrapper');
        const splitDivider = document.getElementById('splitDivider');
        const viewModeSplitButton = document.getElementById('viewModeSplit');
        const viewModeEditorButton = document.getElementById('viewModeEditor');
        const viewModePreviewButton = document.getElementById('viewModePreview');

        let debounceTimerPreview;
        let isSyncingScroll = false; // 防止循环触发
        let isUpdatingPreview = false; // 防止预览更新时触发同步滚动
        let syncDirectionLock = null;
        let syncDirectionLockUntil = 0;
        let syncReleaseTimer = null;
        let scrollSyncIndex = {
            anchors: [],
            editorRawContent: '',
            structure: [],
            previewTextIndex: []
        };

        const syncConfig = {
            deadbandPx: 5,
            lockMs: 150,
            textWeight: 0.15,          // 文本微调权重（仅在锚点稀疏区域生效）
            textWindowPx: 520,
            textConfidenceThreshold: 0.7,
            maxTextAdjustPx: 80,
            anchorDenseThresholdPx: 200 // 锚点间距小于此值视为"密集"，跳过文本微调
        };

        window.__scrollSyncDebug = {
            enabled: false,
            setEnabled(value) {
                this.enabled = !!value;
                console.log(`[scroll-sync] debug ${value ? 'ON' : 'OFF'} — 滚动时会输出锚点命中日志`);
            },
            getSnapshot() {
                return {
                    anchorCount: scrollSyncIndex.anchors.length,
                    anchors: scrollSyncIndex.anchors.map(a => ({
                        id: a.segmentId,
                        editor: Math.round(a.editorPos),
                        preview: Math.round(a.previewPos)
                    })),
                    config: { ...syncConfig },
                    lock: {
                        direction: syncDirectionLock,
                        until: syncDirectionLockUntil
                    }
                };
            },
            // 实时监听：每帧打印当前锚点位置，调用 watch() 开始，再调用一次停止
            _watchTimer: null,
            watch() {
                if (this._watchTimer) {
                    clearInterval(this._watchTimer);
                    this._watchTimer = null;
                    console.log('[scroll-sync] watch 已停止');
                    return;
                }
                console.log('[scroll-sync] watch 已启动，再次调用 __scrollSyncDebug.watch() 停止');
                this._watchTimer = setInterval(() => {
                    const eTop = combinedContentInput.scrollTop;
                    const pTop = documentPreviewDiv.scrollTop;
                    const anchors = scrollSyncIndex.anchors;
                    // 找当前编辑器位置所在锚点段
                    let seg = '(无锚点)';
                    for (let i = 0; i < anchors.length - 1; i++) {
                        if (eTop >= anchors[i].editorPos && eTop <= anchors[i + 1].editorPos) {
                            seg = `[${anchors[i].segmentId}] → [${anchors[i + 1].segmentId}]`;
                            break;
                        }
                    }
                    console.log(`[scroll-sync] editor=${Math.round(eTop)} preview=${Math.round(pTop)} | 锚点段: ${seg} | 锚点总数: ${anchors.length}`);
                }, 500);
            }
        };

        function debugSyncLog(message, payload) {
            if (!window.__scrollSyncDebug || !window.__scrollSyncDebug.enabled) return;
            console.log(`[scroll-sync] ${message}`, payload || '');
        }

        // ===== 工作区模式状态（会话内） =====
        const WORKSPACE_MODE = {
            SPLIT: 'split',
            EDITOR_ONLY: 'editor-only',
            PREVIEW_ONLY: 'preview-only'
        };
        const DESKTOP_BREAKPOINT = 1024;
        const EDITOR_MIN_WIDTH = 280;
        const PREVIEW_MIN_WIDTH = 320;
        const DEFAULT_SPLIT_RATIO = 0.5;
        const NARROW_EDITOR_MIN_HEIGHT = 180;
        const NARROW_PREVIEW_MIN_HEIGHT = 200;
        const NARROW_EMERGENCY_EDITOR_MIN_HEIGHT = 140;
        const NARROW_EMERGENCY_PREVIEW_MIN_HEIGHT = 150;

        let workspaceMode = WORKSPACE_MODE.SPLIT;
        let lastSplitRatio = DEFAULT_SPLIT_RATIO;
        let isDividerDragging = false;
        let pendingSplitRatio = DEFAULT_SPLIT_RATIO;

        function setStatusText(message) {
            if (!statusDiv) return;
            statusDiv.textContent = message || '';
        }

        function setToolbarProgress(active) {
            if (!toolbarProgressLine) return;
            if (active) {
                toolbarProgressLine.classList.add('active');
            } else {
                toolbarProgressLine.classList.remove('active');
            }
        }

        function showToast(message, type = 'info', options = {}) {
            if (!toastContainer || !message) return;

            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            const content = document.createElement('span');
            content.textContent = message;
            toast.appendChild(content);

            const persistent = options.persistent || type === 'error';
            const duration = options.duration || (type === 'success' ? 2200 : 1800);

            if (persistent) {
                const closeButton = document.createElement('button');
                closeButton.className = 'toast-close';
                closeButton.type = 'button';
                closeButton.textContent = '×';
                closeButton.addEventListener('click', () => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 180);
                });
                toast.appendChild(closeButton);
            }

            toastContainer.appendChild(toast);
            requestAnimationFrame(() => toast.classList.add('show'));

            if (!persistent) {
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => toast.remove(), 180);
                }, duration);
            }
        }

        function isDesktopLayout() {
            return window.innerWidth >= DESKTOP_BREAKPOINT;
        }

        function clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }

        function setViewModeButtonsState(mode) {
            if (!viewModeSplitButton || !viewModeEditorButton || !viewModePreviewButton) return;

            viewModeSplitButton.classList.toggle('active', mode === WORKSPACE_MODE.SPLIT);
            viewModeEditorButton.classList.toggle('active', mode === WORKSPACE_MODE.EDITOR_ONLY);
            viewModePreviewButton.classList.toggle('active', mode === WORKSPACE_MODE.PREVIEW_ONLY);
        }

        function applySplitRatio(ratio) {
            if (!editorWrapper || !previewWrapper) return;
            const safeRatio = clamp(ratio, 0.15, 0.85);
            editorWrapper.style.flexBasis = `${(safeRatio * 100).toFixed(2)}%`;
            previewWrapper.style.flexBasis = `${((1 - safeRatio) * 100).toFixed(2)}%`;
            pendingSplitRatio = safeRatio;
        }

        function applyWorkspaceMode(mode, options = {}) {
            if (!editorPreviewContainer || !editorWrapper || !previewWrapper) return;

            const shouldRender = options.triggerRender === true;
            const isDesktop = isDesktopLayout();
            const skipNarrowFallback = options.skipNarrowFallback === true;

            workspaceMode = mode;
            editorPreviewContainer.dataset.viewMode = mode;

            if (mode === WORKSPACE_MODE.SPLIT) {
                editorWrapper.style.display = '';
                previewWrapper.style.display = '';
                if (isDesktop) {
                    applySplitRatio(lastSplitRatio);
                } else {
                    editorWrapper.style.flexBasis = '';
                    previewWrapper.style.flexBasis = '';
                }
            } else if (mode === WORKSPACE_MODE.EDITOR_ONLY) {
                editorWrapper.style.display = '';
                previewWrapper.style.display = 'none';
                editorPreviewContainer.classList.remove('narrow-split-emergency');
            } else if (mode === WORKSPACE_MODE.PREVIEW_ONLY) {
                editorWrapper.style.display = 'none';
                previewWrapper.style.display = '';
                editorPreviewContainer.classList.remove('narrow-split-emergency');
            }

            if (!skipNarrowFallback && mode === WORKSPACE_MODE.SPLIT) {
                const fallbackMode = evaluateNarrowSplitFallbackMode();
                if (fallbackMode) {
                    applyWorkspaceMode(fallbackMode, {
                        triggerRender: shouldRender,
                        skipNarrowFallback: true
                    });
                    showToast('可用高度不足，已自动切换到仅编辑模式', 'info', { duration: 1500 });
                    return;
                }
            }

            setViewModeButtonsState(mode);

            if (shouldRender) {
                schedulePreviewUpdate();
            }
        }

        function evaluateNarrowSplitFallbackMode() {
            if (!editorPreviewContainer) return null;
            if (isDesktopLayout() || workspaceMode !== WORKSPACE_MODE.SPLIT) {
                editorPreviewContainer.classList.remove('narrow-split-emergency');
                return null;
            }

            const availableHeight = editorPreviewContainer.clientHeight;
            const standardMinHeight = NARROW_EDITOR_MIN_HEIGHT + NARROW_PREVIEW_MIN_HEIGHT;
            const emergencyMinHeight = NARROW_EMERGENCY_EDITOR_MIN_HEIGHT + NARROW_EMERGENCY_PREVIEW_MIN_HEIGHT;

            if (availableHeight >= standardMinHeight) {
                editorPreviewContainer.classList.remove('narrow-split-emergency');
                return null;
            }

            if (availableHeight >= emergencyMinHeight) {
                editorPreviewContainer.classList.add('narrow-split-emergency');
                return null;
            }

            editorPreviewContainer.classList.remove('narrow-split-emergency');
            return WORKSPACE_MODE.EDITOR_ONLY;
        }

        function calculateSplitRatioByPointer(clientX) {
            const rect = editorPreviewContainer.getBoundingClientRect();
            const rawX = clientX - rect.left;
            const clampedX = clamp(rawX, 0, rect.width);
            return rect.width > 0 ? clampedX / rect.width : DEFAULT_SPLIT_RATIO;
        }

        function handleDividerMouseMove(event) {
            if (!isDividerDragging || workspaceMode !== WORKSPACE_MODE.SPLIT || !isDesktopLayout()) return;
            const ratio = calculateSplitRatioByPointer(event.clientX);
            applySplitRatio(ratio);
        }

        function handleDividerMouseUp() {
            if (!isDividerDragging) return;

            isDividerDragging = false;
            editorPreviewContainer.classList.remove('resizing');
            window.removeEventListener('mousemove', handleDividerMouseMove);
            window.removeEventListener('mouseup', handleDividerMouseUp);

            const totalWidth = editorPreviewContainer.getBoundingClientRect().width;
            const editorWidth = pendingSplitRatio * totalWidth;
            const previewWidth = totalWidth - editorWidth;

            if (editorWidth < EDITOR_MIN_WIDTH) {
                applyWorkspaceMode(WORKSPACE_MODE.PREVIEW_ONLY, { triggerRender: true });
                showToast('已自动切换到仅预览模式', 'info', { duration: 1200 });
                return;
            }

            if (previewWidth < PREVIEW_MIN_WIDTH) {
                applyWorkspaceMode(WORKSPACE_MODE.EDITOR_ONLY, { triggerRender: true });
                showToast('已自动切换到仅编辑模式', 'info', { duration: 1200 });
                return;
            }

            lastSplitRatio = pendingSplitRatio;
            applyWorkspaceMode(WORKSPACE_MODE.SPLIT, { triggerRender: true });
        }

        // 初始化语言
        applyLanguage(currentLang);

        // 语言切换事件（同步桌面端和移动端选择器）
        langPicker.addEventListener('change', (e) => {
            const newLang = e.target.value;
            langPickerMobile.value = newLang;
            applyLanguage(newLang);
        });

        if (langPickerMobile) {
            langPickerMobile.addEventListener('change', (e) => {
                const newLang = e.target.value;
                langPicker.value = newLang;
                applyLanguage(newLang);
            });
        }

        // 工作区模式切换事件
        if (viewModeSplitButton) {
            viewModeSplitButton.addEventListener('click', () => {
                applyWorkspaceMode(WORKSPACE_MODE.SPLIT, { triggerRender: true });
            });
        }

        if (viewModeEditorButton) {
            viewModeEditorButton.addEventListener('click', () => {
                if (workspaceMode === WORKSPACE_MODE.SPLIT) {
                    lastSplitRatio = pendingSplitRatio;
                }
                applyWorkspaceMode(WORKSPACE_MODE.EDITOR_ONLY, { triggerRender: true });
            });
        }

        if (viewModePreviewButton) {
            viewModePreviewButton.addEventListener('click', () => {
                if (workspaceMode === WORKSPACE_MODE.SPLIT) {
                    lastSplitRatio = pendingSplitRatio;
                }
                applyWorkspaceMode(WORKSPACE_MODE.PREVIEW_ONLY, { triggerRender: true });
            });
        }

        if (splitDivider) {
            splitDivider.addEventListener('mousedown', (event) => {
                if (!isDesktopLayout() || workspaceMode !== WORKSPACE_MODE.SPLIT) return;
                event.preventDefault();
                isDividerDragging = true;
                editorPreviewContainer.classList.add('resizing');
                pendingSplitRatio = lastSplitRatio;
                window.addEventListener('mousemove', handleDividerMouseMove);
                window.addEventListener('mouseup', handleDividerMouseUp);
            });
        }

        window.addEventListener('resize', () => {
            if (workspaceMode === WORKSPACE_MODE.SPLIT) {
                applyWorkspaceMode(WORKSPACE_MODE.SPLIT);
            }
        });

        // 初始化工作区模式（默认 split，刷新回默认比例）
        applyWorkspaceMode(WORKSPACE_MODE.SPLIT);

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

            setStatusText('主题已应用');
            showToast('主题已应用', 'success');
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

            setStatusText(`自定义主题 "${name}" 已保存`);
            showToast(`自定义主题 "${name}" 已保存`, 'success');
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

            setStatusText('主题已导出');
            showToast('主题已导出', 'success');
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

                    setStatusText('主题已导入');
                    showToast('主题已导入', 'success');
                } catch (error) {
                    alert('导入失败: ' + error.message);
                }
            };
            reader.readAsText(file);

            // 重置文件输入
            e.target.value = '';
        });

        async function loadDefaultMd() {
            setStatusText(t('loadingDefault'));
            try {
                const response = await fetch('default.md');
                if (!response.ok) throw new Error(`${t('defaultLoadError')}${response.statusText} (Status: ${response.status}). Ensure page is served via HTTP/S.`);
                combinedContentInput.value = await response.text();
                setStatusText(t('defaultLoaded'));
                showToast(t('defaultLoaded'), 'info', { duration: 1200 });
            } catch (error) {
                console.error("Error loading default.md:", error);
                setStatusText(`${t('defaultLoadError')}${error.message}. ${t('defaultLoadInfo')}`);
                showToast(`${t('defaultLoadError')}${error.message}`, 'error', { persistent: true });
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
            let searchCursor = 0;

            const locatePart = (part) => {
                const start = rawText.indexOf(part, searchCursor);
                const safeStart = start >= 0 ? start : searchCursor;
                const end = safeStart + part.length;
                searchCursor = end;
                return { start: safeStart, end };
            };

            for (const part of parts) {
                if (!part || part.trim() === "") continue;
                const partRange = locatePart(part);
                
                // Match Mermaid code blocks
                const mermaidMatch = part.match(/^\n?```mermaid\n([\s\S]*?)\n```\n?$/);
                if (mermaidMatch) {
                    structure.push({
                        type: 'mermaid',
                        content: mermaidMatch[1].trim(),
                        id: `mermaid-${counter++}`,
                        sourceStart: partRange.start,
                        sourceEnd: partRange.end
                    });
                    continue;
                }
                
                // Match block math formulas ($$...$$)
                const blockMathMatch = part.match(/^\$\$([\s\S]*?)\$\$$/);
                if (blockMathMatch) {
                    structure.push({ 
                        type: 'math', 
                        content: blockMathMatch[1].trim(), 
                        id: `math-${counter++}`,
                        isBlock: true,
                        sourceStart: partRange.start,
                        sourceEnd: partRange.end
                    });
                    continue;
                }
                
                // Regular markdown content
                if (part.trim()) {
                    structure.push({
                        type: 'markdown',
                        content: part,
                        id: `md-${counter++}`,
                        sourceStart: partRange.start,
                        sourceEnd: partRange.end
                    });
                }
            }
            return structure;
        }

        function getScrollableDistance(element) {
            return Math.max(1, element.scrollHeight - element.clientHeight);
        }

        function getScrollPercent(element) {
            return clamp(element.scrollTop / getScrollableDistance(element), 0, 1);
        }

        function mapByPercentage(sourceElement, targetElement, sourceTop) {
            const sourceDistance = getScrollableDistance(sourceElement);
            const targetDistance = getScrollableDistance(targetElement);
            return clamp((sourceTop / sourceDistance) * targetDistance, 0, targetDistance);
        }

        function normalizeSyncText(text) {
            return (text || '')
                .replace(/\s+/g, ' ')
                .replace(/[\u200B-\u200D\uFEFF]/g, '')
                .trim()
                .toLowerCase();
        }

        function rebuildPreviewTextIndex() {
            const blocks = Array.from(documentPreviewDiv.querySelectorAll('.markdown-preview-segment, .math-display-segment, .mermaid-preview-segment'));
            scrollSyncIndex.previewTextIndex = blocks.map(node => ({
                top: node.offsetTop,
                text: normalizeSyncText(node.textContent).slice(0, 200),
                node
            })).filter(item => item.text);
        }

        // 从预览块级元素中提取用于匹配的搜索针（多个候选，按优先级）
        // Returns array of needles to search for in source text, ordered by specificity
        function extractSearchNeedles(element) {
            const tag = element.tagName.toLowerCase();
            const needles = [];

            // 标题：在源文本中有 # 前缀，直接搜索文本内容
            // e.g. "## 功能特性" → search for "功能特性" (会命中 "## 功能特性")
            if (/^h[1-6]$/.test(tag)) {
                const text = element.textContent.trim();
                if (text) needles.push(text);
                return needles;
            }

            // 代码块：search for the opening ```language line
            if (tag === 'pre') {
                const code = element.querySelector('code');
                if (code) {
                    // 检测语言类（如 class="language-javascript"）
                    const langClass = Array.from(code.classList || []).find(c => c.startsWith('language-'));
                    if (langClass) {
                        const lang = langClass.replace('language-', '');
                        needles.push('```' + lang);
                    }
                    // 也用代码第一行作为备选
                    const firstLine = code.textContent.trim().split('\n')[0];
                    if (firstLine) needles.push(firstLine);
                }
                return needles;
            }

            // 表格：搜索表头内容（markdown 中 | 分隔）
            if (tag === 'table') {
                const ths = element.querySelectorAll('th');
                if (ths.length > 0) {
                    // 第一个表头单元格通常足够定位
                    const firstTh = ths[0].textContent.trim();
                    if (firstTh) needles.push(firstTh);
                    // 完整表头行（用 | 连接，与 markdown 源文本匹配）
                    const headerRow = Array.from(ths).map(th => th.textContent.trim()).join(' | ');
                    if (headerRow) needles.push(headerRow);
                }
                return needles;
            }

            // 列表：搜索第一项的文本（markdown 中有 - 或 1. 前缀）
            if (tag === 'ul' || tag === 'ol') {
                const firstLi = element.querySelector('li');
                if (firstLi) {
                    // 提取第一项的纯文本（去掉 checkbox 等）
                    let liText = firstLi.textContent.trim().slice(0, 60);
                    // 去掉 markdown 格式字符（**、*、`）后搜索
                    const cleanText = liText.replace(/[*`~]/g, '').trim().slice(0, 40);
                    if (cleanText.length >= 4) needles.push(cleanText);
                    if (liText.length >= 3) needles.push(liText.slice(0, 40));
                }
                return needles;
            }

            // blockquote：搜索引用文本（源文本中有 > 前缀）
            if (tag === 'blockquote') {
                const text = element.textContent.trim().slice(0, 60);
                if (text) needles.push(text);
                return needles;
            }

            // 分割线
            if (tag === 'hr') {
                needles.push('---');
                return needles;
            }

            // 段落：提取纯文本内容，去掉内联格式后搜索
            // e.g. "这是 **粗体文本**" → "这是" 或 "粗体文本"
            const text = element.textContent.trim();
            if (text) {
                // 取前50个字符，去掉可能的 markdown 格式符号
                const clean = text.replace(/[*`~\[\]()]/g, '').trim().slice(0, 50);
                if (clean.length >= 4) needles.push(clean);
                // 也用原始文本前30字符
                needles.push(text.slice(0, 30));
            }
            return needles;
        }

        // 在源文本中用多个候选针按顺序搜索，返回最先命中的字符偏移
        // Search source text with multiple needles, return first match offset
        function findInSource(needles, sourceText, searchFrom) {
            if (!needles || needles.length === 0) return -1;

            const searchArea = sourceText.slice(searchFrom);
            for (const needle of needles) {
                if (!needle || needle.length < 2) continue;

                // 直接搜索
                const idx = searchArea.indexOf(needle);
                if (idx >= 0) {
                    return searchFrom + idx;
                }
            }

            // 所有精确匹配都失败，尝试用第一个 needle 做模糊搜索（忽略多余空格）
            const primary = (needles[0] || '').slice(0, 20).trim();
            if (primary.length >= 3) {
                try {
                    const escaped = primary.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const fuzzy = escaped.replace(/\s+/g, '\\s+');
                    const regex = new RegExp(fuzzy);
                    const match = regex.exec(searchArea);
                    if (match) {
                        return searchFrom + match.index;
                    }
                } catch (e) {
                    // regex 构造失败，忽略
                }
            }

            // 去 markdown 格式后匹配：构建 [cleanChar → origIndex] 映射表
            // Strip markdown formatting then match, mapping back to original offset
            if (needles[0] && needles[0].length >= 4) {
                const stripMap = []; // stripMap[cleanIdx] = origIdx (在 searchArea 中的偏移)
                let cleanChars = [];
                for (let i = 0; i < searchArea.length; i++) {
                    const ch = searchArea[i];
                    // 跳过 markdown 内联格式字符：* ` ~ [ ] ( )
                    if ('*`~[]()'.includes(ch)) continue;
                    stripMap.push(i);
                    cleanChars.push(ch);
                }
                const cleanArea = cleanChars.join('');
                // 对 needle 也做同样的清理
                const cleanNeedle = needles[0].replace(/[*`~\[\]()]/g, '');
                if (cleanNeedle.length >= 4) {
                    const cidx = cleanArea.indexOf(cleanNeedle);
                    if (cidx >= 0) {
                        return searchFrom + stripMap[cidx];
                    }
                }
            }

            return -1;
        }

        // 为 markdown segment 内部的块级元素生成细粒度锚点
        // Generate fine-grained anchors for block elements inside a markdown segment
        function buildIntraSegmentAnchors(segment, previewNode, sourceLength, charOffsetToEditorPos) {
            const anchors = [];
            const topLevelBlocks = [];

            // 收集 previewNode 的直接子元素中的块级元素
            for (const child of previewNode.children) {
                const tag = child.tagName.toLowerCase();
                if (/^h[1-6]$/.test(tag) || tag === 'p' || tag === 'pre' || 
                    tag === 'table' || tag === 'ul' || tag === 'ol' || 
                    tag === 'blockquote' || tag === 'hr') {
                    topLevelBlocks.push(child);
                }
            }

            if (topLevelBlocks.length === 0) return anchors;

            const segStart = segment.sourceStart || 0;
            const segEnd = segment.sourceEnd || sourceLength;
            const segSource = segment.content || '';
            let searchCursor = 0;
            let matchedCount = 0;
            let failedCount = 0;

            // 第一遍：用文本匹配计算每个 block 的 charOffset，未匹配的标记为 -1
            const charOffsets = topLevelBlocks.map((block, idx) => {
                const needles = extractSearchNeedles(block);
                if (needles.length === 0) return -1;

                const localOffset = findInSource(needles, segSource, searchCursor);
                if (localOffset >= 0) {
                    searchCursor = localOffset + 1;
                    matchedCount++;
                    return segStart + localOffset;
                }
                failedCount++;
                return -1;
            });

            // 第二遍：修复乱序——确保 charOffset 序列单调递增
            // 如果某个匹配结果比前一个已确认的位置还小，丢弃它（标记为 -1）
            let lastConfirmed = -1;
            for (let i = 0; i < charOffsets.length; i++) {
                if (charOffsets[i] >= 0) {
                    if (charOffsets[i] <= lastConfirmed) {
                        charOffsets[i] = -1; // 乱序，丢弃
                    } else {
                        lastConfirmed = charOffsets[i];
                    }
                }
            }

            // 第三遍：对未匹配的 block（-1），用相邻已匹配 block 做线性插值
            for (let i = 0; i < charOffsets.length; i++) {
                if (charOffsets[i] >= 0) continue;

                // 找前一个已匹配的
                let prevIdx = -1, prevOffset = segStart;
                for (let j = i - 1; j >= 0; j--) {
                    if (charOffsets[j] >= 0) { prevIdx = j; prevOffset = charOffsets[j]; break; }
                }
                // 找后一个已匹配的
                let nextIdx = charOffsets.length, nextOffset = segEnd;
                for (let j = i + 1; j < charOffsets.length; j++) {
                    if (charOffsets[j] >= 0) { nextIdx = j; nextOffset = charOffsets[j]; break; }
                }
                // 在 [prevOffset, nextOffset] 之间按位置比例插值
                const span = nextIdx - prevIdx;
                const pos = i - prevIdx;
                charOffsets[i] = prevOffset + (nextOffset - prevOffset) * (pos / span);
            }

            // 生成锚点
            topLevelBlocks.forEach((block, idx) => {
                const editorPos = charOffsetToEditorPos(charOffsets[idx]);

                let previewTop = block.offsetTop;
                let parent = block.offsetParent;
                while (parent && parent !== documentPreviewDiv && parent !== document.body) {
                    previewTop += parent.offsetTop;
                    parent = parent.offsetParent;
                }

                anchors.push({
                    editorPos,
                    previewPos: previewTop,
                    segmentId: `${segment.id}-block-${idx}`
                });
            });

            debugSyncLog('intra-segment anchors', {
                segmentId: segment.id,
                total: topLevelBlocks.length,
                matched: matchedCount,
                failed: failedCount,
                anchors: anchors.slice(-3).map(a => ({ 
                    id: a.segmentId, 
                    editor: Math.round(a.editorPos), 
                    preview: Math.round(a.previewPos) 
                }))
            });

            return anchors;
        }

        function rebuildScrollSyncIndex(rawContent, structure) {
            const sourceLength = Math.max(1, rawContent.length);
            const editorDistance = getScrollableDistance(combinedContentInput);
            const previewDistance = getScrollableDistance(documentPreviewDiv);

            // 预算行号映射表：charOffset → lineNumber
            const lineBreaks = [0]; // 每行的起始字符偏移
            for (let i = 0; i < rawContent.length; i++) {
                if (rawContent[i] === '\n') lineBreaks.push(i + 1);
            }
            const totalLines = lineBreaks.length;

            // 编辑器行高和内边距（用于精确像素定位）
            const editorStyle = window.getComputedStyle(combinedContentInput);
            const editorLineHeight = parseFloat(editorStyle.lineHeight) || 24;
            const editorPaddingTop = parseFloat(editorStyle.paddingTop) || 0;

            // 字符偏移 → 编辑器像素位置（基于行号 × 行高 + paddingTop）
            // textarea 的 scrollTop 直接对应内容区的像素偏移，
            // 第 n 行的顶部位置 = paddingTop + n * lineHeight
            function charOffsetToEditorPos(charOffset) {
                // 二分查找所在行
                let lo = 0, hi = lineBreaks.length - 1;
                while (lo < hi) {
                    const mid = (lo + hi + 1) >> 1;
                    if (lineBreaks[mid] <= charOffset) lo = mid; else hi = mid - 1;
                }
                const pixelPos = editorPaddingTop + lo * editorLineHeight;
                return clamp(pixelPos, 0, editorDistance);
            }

            debugSyncLog('rebuild start', {
                sourceLength,
                totalLines,
                editorDistance,
                previewDistance,
                editorLineHeight,
                editorPaddingTop,
                contentHeight: editorPaddingTop + totalLines * editorLineHeight,
                segmentCount: structure.length
            });

            // Build raw anchor pairs: editorPos <-> previewPos
            const rawAnchors = [{ editorPos: 0, previewPos: 0, segmentId: 'start' }];

            structure.forEach(segment => {
                if (!segment.id) return;
                const previewNode = document.getElementById(`preview-${segment.id}`) || documentPreviewDiv.querySelector(`[data-segment-id="${segment.id}"]`);
                if (!previewNode) return;

                const sourceStart = clamp(segment.sourceStart || 0, 0, sourceLength);
                const sourceEnd = clamp(segment.sourceEnd || sourceLength, 0, sourceLength);
                const editorPosStart = charOffsetToEditorPos(sourceStart);
                const previewPosStart = previewNode.offsetTop;

                // segment 起始锚点
                rawAnchors.push({ editorPos: editorPosStart, previewPos: previewPosStart, segmentId: segment.id });

                // segment 结束锚点（用段底部位置，确保 mermaid/math 等非文本段的区间精确）
                // 对于 mermaid/math 段尤其重要：源码只有几行但预览可能很高
                const editorPosEnd = charOffsetToEditorPos(sourceEnd);
                const previewPosEnd = previewPosStart + previewNode.offsetHeight;
                rawAnchors.push({ editorPos: editorPosEnd, previewPos: previewPosEnd, segmentId: `${segment.id}-end` });

                // 对 markdown segment，深入提取块级元素的细粒度锚点
                // For markdown segments, extract fine-grained anchors from block-level elements
                if (segment.type === 'markdown') {
                    const intraAnchors = buildIntraSegmentAnchors(segment, previewNode, sourceLength, charOffsetToEditorPos);
                    rawAnchors.push(...intraAnchors);
                }
            });

            rawAnchors.push({
                editorPos: editorDistance,
                previewPos: previewDistance,
                segmentId: 'end'
            });

            // Sort by editorPos, then normalize to ensure both axes are monotonically non-decreasing
            rawAnchors.sort((a, b) => a.editorPos - b.editorPos || a.previewPos - b.previewPos);

            const normalizedAnchors = [];
            let lastEditor = -1;
            let lastPreview = -1;
            rawAnchors.forEach(anchor => {
                const safeEditor = Math.max(anchor.editorPos, lastEditor);
                const safePreview = Math.max(anchor.previewPos, lastPreview);
                if (normalizedAnchors.length > 0 && safeEditor === lastEditor && safePreview === lastPreview) return;
                normalizedAnchors.push({ editorPos: safeEditor, previewPos: safePreview, segmentId: anchor.segmentId });
                lastEditor = safeEditor;
                lastPreview = safePreview;
            });

            scrollSyncIndex.anchors = normalizedAnchors;
            scrollSyncIndex.editorRawContent = rawContent;
            scrollSyncIndex.structure = structure;
            rebuildPreviewTextIndex();
            debugSyncLog('index rebuilt', { anchors: normalizedAnchors.length });
        }

        // Piecewise linear interpolation through anchors.
        // direction: 'editor-to-preview' or 'preview-to-editor'
        function mapByAnchors(scrollPos, direction) {
            const anchors = scrollSyncIndex.anchors;
            if (!anchors || anchors.length < 2) return null;

            // Pick the correct axis based on direction
            const fromKey = direction === 'editor-to-preview' ? 'editorPos' : 'previewPos';
            const toKey = direction === 'editor-to-preview' ? 'previewPos' : 'editorPos';

            // Clamp to bounds
            if (scrollPos <= anchors[0][fromKey]) return anchors[0][toKey];
            if (scrollPos >= anchors[anchors.length - 1][fromKey]) return anchors[anchors.length - 1][toKey];

            // 二分查找：找到 scrollPos 所在的锚点区间 [anchors[lo], anchors[lo+1]]
            let lo = 0, hi = anchors.length - 2;
            while (lo < hi) {
                const mid = (lo + hi + 1) >> 1;
                if (anchors[mid][fromKey] <= scrollPos) lo = mid; else hi = mid - 1;
            }

            const a = anchors[lo];
            const b = anchors[lo + 1];
            const span = Math.max(1, b[fromKey] - a[fromKey]);
            const progress = (scrollPos - a[fromKey]) / span;
            return a[toKey] + (b[toKey] - a[toKey]) * progress;
        }

        function getEditorTopFingerprint() {
            const text = combinedContentInput.value || '';
            const editorStyle = window.getComputedStyle(combinedContentInput);
            const lineHeight = parseFloat(editorStyle.lineHeight) || 24;
            const paddingTop = parseFloat(editorStyle.paddingTop) || 0;
            // scrollTop 包含 paddingTop 区域，减去 padding 后再算行号
            const topLine = Math.max(0, Math.floor((combinedContentInput.scrollTop - paddingTop) / lineHeight));
            const lines = text.split('\n');
            const sample = lines.slice(topLine, topLine + 4).map(normalizeSyncText).filter(Boolean);
            if (!sample.length) return null;
            return {
                text: sample.join(' '),
                topLine,
                lineHeight
            };
        }

        function getPreviewTopFingerprint() {
            const viewportTop = documentPreviewDiv.scrollTop;
            const blocks = Array.from(documentPreviewDiv.querySelectorAll('.markdown-preview-segment, .math-display-segment, .mermaid-preview-segment'));
            const visible = blocks.find(node => node.offsetTop + node.offsetHeight >= viewportTop + 12);
            if (!visible) return null;
            const normalized = normalizeSyncText(visible.textContent);
            if (!normalized) return null;
            return {
                text: normalized.slice(0, 220),
                top: visible.offsetTop
            };
        }

        function matchPreviewByText(baseTop, fingerprint) {
            if (!fingerprint || !fingerprint.text) return null;
            const candidates = scrollSyncIndex.previewTextIndex.filter(item => Math.abs(item.top - baseTop) <= syncConfig.textWindowPx);
            if (!candidates.length) return null;

            const hits = candidates.map(item => {
                const contains = item.text.includes(fingerprint.text) || fingerprint.text.includes(item.text);
                if (!contains) return null;
                const lengthRatio = Math.min(item.text.length, fingerprint.text.length) / Math.max(item.text.length, fingerprint.text.length);
                const distanceScore = 1 - clamp(Math.abs(item.top - baseTop) / syncConfig.textWindowPx, 0, 1);
                return {
                    top: item.top,
                    confidence: 0.65 * lengthRatio + 0.35 * distanceScore
                };
            }).filter(Boolean).sort((x, y) => y.confidence - x.confidence);

            if (!hits.length) return null;
            if (hits.length > 1 && Math.abs(hits[0].confidence - hits[1].confidence) < 0.06) return null;
            return hits[0];
        }

        function matchEditorByText(baseTop, fingerprint) {
            if (!fingerprint || !fingerprint.text) return null;
            const text = combinedContentInput.value || '';
            const lines = text.split('\n');
            const editorStyle = window.getComputedStyle(combinedContentInput);
            const lineHeight = parseFloat(editorStyle.lineHeight) || 24;
            const paddingTop = parseFloat(editorStyle.paddingTop) || 0;
            // baseTop 包含 paddingTop，需要减去 padding 再转行号
            const baseLine = Math.max(0, Math.floor((baseTop - paddingTop) / lineHeight));
            const searchRadius = Math.max(12, Math.floor(syncConfig.textWindowPx / lineHeight));
            const start = clamp(baseLine - searchRadius, 0, Math.max(0, lines.length - 1));
            const end = clamp(baseLine + searchRadius, 0, Math.max(0, lines.length - 1));
            let best = null;

            for (let i = start; i <= end; i++) {
                const candidate = normalizeSyncText(lines.slice(i, i + 4).join(' '));
                if (!candidate) continue;
                const contains = candidate.includes(fingerprint.text) || fingerprint.text.includes(candidate);
                if (!contains) continue;
                const lengthRatio = Math.min(candidate.length, fingerprint.text.length) / Math.max(candidate.length, fingerprint.text.length);
                const distanceScore = 1 - clamp(Math.abs(i - baseLine) / Math.max(1, searchRadius), 0, 1);
                const confidence = 0.6 * lengthRatio + 0.4 * distanceScore;
                if (!best || confidence > best.confidence) {
                    // 返回像素位置也要加上 paddingTop，与锚点坐标系一致
                    best = { top: paddingTop + i * lineHeight, confidence };
                }
            }

            return best;
        }

        function applyTextRefinement(sourceType, baseTargetTop) {
            if (sourceType === 'editor') {
                const fingerprint = getEditorTopFingerprint();
                const match = matchPreviewByText(baseTargetTop, fingerprint);
                if (!match || match.confidence < syncConfig.textConfidenceThreshold) {
                    return baseTargetTop;
                }
                const adjust = clamp(match.top - baseTargetTop, -syncConfig.maxTextAdjustPx, syncConfig.maxTextAdjustPx);
                return baseTargetTop + adjust * syncConfig.textWeight;
            }

            const fingerprint = getPreviewTopFingerprint();
            const match = matchEditorByText(baseTargetTop, fingerprint);
            if (!match || match.confidence < syncConfig.textConfidenceThreshold) {
                return baseTargetTop;
            }
            const adjust = clamp(match.top - baseTargetTop, -syncConfig.maxTextAdjustPx, syncConfig.maxTextAdjustPx);
            return baseTargetTop + adjust * syncConfig.textWeight;
        }

        // Compute target scroll position: anchors as primary, percentage as fallback, text refinement only in sparse areas
        function computeSyncTarget(sourceType, sourceElement, targetElement) {
            const sourceTop = sourceElement.scrollTop;
            const sourceDistance = getScrollableDistance(sourceElement);
            const targetDistance = getScrollableDistance(targetElement);

            // 百分比作为兜底
            const percentFallback = sourceDistance > 0 ? (sourceTop / sourceDistance) * targetDistance : 0;

            // 尝试使用锚点映射
            const direction = sourceType === 'editor' ? 'editor-to-preview' : 'preview-to-editor';
            const anchorResult = mapByAnchors(sourceTop, direction);

            let baseTarget;
            let mappingMode;
            let anchorSpan = Infinity; // 当前所在锚点段的跨度（用于判断是否密集）
            if (anchorResult !== null) {
                // 锚点可用：100% 使用锚点结果，不混合百分比
                baseTarget = anchorResult;
                mappingMode = 'anchor';

                // 计算当前锚点段的跨度（二分查找）
                const anchors = scrollSyncIndex.anchors;
                const fromKey = direction === 'editor-to-preview' ? 'editorPos' : 'previewPos';
                let lo = 0, hi = anchors.length - 2;
                while (lo < hi) {
                    const mid = (lo + hi + 1) >> 1;
                    if (anchors[mid][fromKey] <= sourceTop) lo = mid; else hi = mid - 1;
                }
                if (lo < anchors.length - 1) {
                    anchorSpan = anchors[lo + 1][fromKey] - anchors[lo][fromKey];
                }
            } else {
                // 锚点不可用：降级到百分比同步
                baseTarget = percentFallback;
                mappingMode = 'percent-fallback';
            }

            // 文本锚点微调：仅在锚点稀疏区域（跨度大于阈值）时生效
            // 在密集锚点区域，锚点本身已足够精确，文本微调反而会引入噪声
            let refined = baseTarget;
            if (anchorSpan > syncConfig.anchorDenseThresholdPx || mappingMode === 'percent-fallback') {
                refined = applyTextRefinement(sourceType, baseTarget);
            }

            if (window.__scrollSyncDebug && window.__scrollSyncDebug.enabled) {
                const anchors = scrollSyncIndex.anchors;
                // 找当前位置所在锚点段
                let segInfo = '(无锚点)';
                for (let i = 0; i < anchors.length - 1; i++) {
                    const fromKey = direction === 'editor-to-preview' ? 'editorPos' : 'previewPos';
                    if (sourceTop >= anchors[i][fromKey] && sourceTop <= anchors[i + 1][fromKey]) {
                        segInfo = `[${anchors[i].segmentId}]→[${anchors[i + 1].segmentId}] span=${Math.round(anchorSpan)}`;
                        break;
                    }
                }
                const targetActual = targetElement.scrollTop;
                const applied = Math.round(refined);
                const skipped = Math.abs(refined - targetActual) < syncConfig.deadbandPx ? ' DEADBAND' : '';
                const textSkipped = anchorSpan <= syncConfig.anchorDenseThresholdPx ? ' TEXT_SKIP' : '';
                console.log(
                    `[sync] ${sourceType} src=${Math.round(sourceTop)} → ${mappingMode}` +
                    ` anchor=${anchorResult !== null ? Math.round(anchorResult) : 'n/a'}` +
                    ` pct=${Math.round(percentFallback)}` +
                    ` target=${applied} target_actual=${Math.round(targetActual)} diff=${applied - Math.round(targetActual)}${skipped}${textSkipped}` +
                    ` | ${segInfo} (${anchors.length} anchors)`
                );
            }

            return clamp(refined, 0, targetDistance);
        }

        function syncScroll(sourceType, sourceElement, targetElement) {
            if (isUpdatingPreview) return;
            if (workspaceMode !== WORKSPACE_MODE.SPLIT) return;

            // 如果当前正在同步且来源不是本方向，拦截（防双向互拉）
            if (isSyncingScroll && isSyncingScroll !== sourceType) return;

            // Direction lock: prevent the other side from triggering sync
            const now = Date.now();
            if (syncDirectionLock && syncDirectionLock !== sourceType && now < syncDirectionLockUntil) {
                return;
            }

            const targetTop = computeSyncTarget(sourceType, sourceElement, targetElement);
            const currentTop = targetElement.scrollTop;

            // Dead band: skip if change is tiny
            if (Math.abs(targetTop - currentTop) < syncConfig.deadbandPx) return;

            // Apply directly (no incremental smoothing -- that was causing the chaos)
            isSyncingScroll = sourceType;  // 记录是哪个方向在驱动
            syncDirectionLock = sourceType;
            syncDirectionLockUntil = now + syncConfig.lockMs;

            targetElement.scrollTop = targetTop;

            // Release the sync guard after a short delay (one frame + margin)
            if (syncReleaseTimer) clearTimeout(syncReleaseTimer);
            syncReleaseTimer = setTimeout(() => {
                isSyncingScroll = false;
            }, syncConfig.lockMs + 20);
        }

        function syncFromEditor() {
            syncScroll('editor', combinedContentInput, documentPreviewDiv);
        }

        function syncFromPreview() {
            syncScroll('preview', documentPreviewDiv, combinedContentInput);
        }

        // 为输入框和预览区域添加滚动事件监听
        combinedContentInput.addEventListener('scroll', () => {
            syncFromEditor();
        });

        documentPreviewDiv.addEventListener('scroll', () => {
            syncFromPreview();
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

            setStatusText(t('loadingDefault'));
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
                    previewSegmentDiv.id = `preview-${segment.id}`;
                    previewSegmentDiv.dataset.segmentId = segment.id;
                    previewSegmentDiv.innerHTML = marked.parse(segment.content, markedOptions);
                    documentPreviewDiv.appendChild(previewSegmentDiv);
                } else if (segment.type === 'math' && segment.id) {
                    // 处理数学公式段落
                    const container = document.createElement('div');
                    container.className = 'math-display-segment';
                    container.id = `preview-${segment.id}`;
                    container.dataset.segmentId = segment.id;
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
                    container.dataset.segmentId = segment.id;
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
            setStatusText('');

            // 延迟恢复同步滚动，等待 DOM 更新完成
            setTimeout(() => {
                rebuildScrollSyncIndex(rawContent, documentStructure);

                // 恢复编辑器和预览区的滚动位置（基于之前的百分比）
                // 用 isSyncingScroll 防止恢复动作触发互相同步
                isSyncingScroll = true;

                const newEditorScrollHeight = combinedContentInput.scrollHeight;
                const newEditorClientHeight = combinedContentInput.clientHeight;
                if (!isNaN(editorScrollPercentage) && isFinite(editorScrollPercentage)) {
                    combinedContentInput.scrollTop = editorScrollPercentage * (newEditorScrollHeight - newEditorClientHeight);
                }

                if (!isNaN(editorScrollPercentage) && isFinite(editorScrollPercentage)) {
                    const previewScrollHeight = documentPreviewDiv.scrollHeight;
                    const previewClientHeight = documentPreviewDiv.clientHeight;
                    documentPreviewDiv.scrollTop = editorScrollPercentage * (previewScrollHeight - previewClientHeight);
                }

                // 恢复同步滚动
                isUpdatingPreview = false;

                // 短延迟后释放同步锁，让恢复的 scroll 事件安静下来
                setTimeout(() => {
                    isSyncingScroll = false;
                    // 用锚点做一次精确同步
                    syncFromEditor();
                }, 80);
            }, 100);
        }

        combinedContentInput.addEventListener('input', schedulePreviewUpdate);
        fontPicker.addEventListener('change', schedulePreviewUpdate);
        document.addEventListener('DOMContentLoaded', loadDefaultMd);

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
            } catch (e) {
                console.error(`Error in renderMermaidToPng for ${diagramId}:`, e);
                setStatusText(`Error PNG ${diagramId}: ${e.message}`);
                showToast(`Mermaid 转 PNG 失败: ${diagramId}`, 'error', { persistent: true });
                return null;
            }
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
            setStatusText(t('generating'));
            setToolbarProgress(true);
            showToast(t('generating'), 'info', { duration: 1200 });
            const selectedFont = fontPicker.value;
            const docxGlobal = window.docx;
            if (!docxGlobal) {
                setStatusText(t('error') + 'DOCX library not loaded.');
                showToast(t('error') + 'DOCX library not loaded.', 'error', { persistent: true });
                setToolbarProgress(false);
                generateDocxButton.disabled = false;
                return;
            }

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
                        setStatusText(`${t('generating')} Math ${segment.id}...`);
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
                        setStatusText(`${t('generating')} Mermaid ${segment.id}...`);
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

                setStatusText(t('success'));
                showToast(t('success'), 'success');
            } catch (e) {
                console.error("Error DOCX gen:", e, e.stack);
                setStatusText(`${t('error')}${e.message}`);
                showToast(`${t('error')}${e.message}`, 'error', { persistent: true });
            } finally {
                setToolbarProgress(false);
                generateDocxButton.disabled = false;
            }
        });

        printPreviewButton.addEventListener('click', () => {
            setStatusText(t('printPrompt'));
            showToast(t('printPrompt'), 'info', { duration: 1400 });
            window.print();
        });

        // 移动端按钮处理
        const printPreviewButtonMobile = document.getElementById('printPreviewButtonMobile');
        const mermaidConfigButtonMobile = document.getElementById('mermaidConfigButtonMobile');

        if (printPreviewButtonMobile) {
            printPreviewButtonMobile.addEventListener('click', () => {
                setStatusText(t('printPrompt'));
                showToast(t('printPrompt'), 'info', { duration: 1400 });
                window.print();
            });
        }

        if (mermaidConfigButtonMobile) {
            mermaidConfigButtonMobile.addEventListener('click', () => {
                mermaidConfigModal.style.display = 'block';
            });
        }
