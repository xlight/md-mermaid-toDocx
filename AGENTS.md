<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# Agent Coding Guidelines for md-mermaid-toDocx

## 使用中文
 - LLM 输出的 thinking 和内容使用中文
 - 代码注释使用中文
 - 文档使用中文

## Overview
This document provides guidelines for agentic coding assistants working in this repository.

## Project Overview

This is a single-file web application (`index.html`) that converts Markdown and Mermaid diagrams to DOCX format. It runs entirely in the browser with no build system, no package.json, and no npm dependencies. All libraries are loaded via CDN.

## Build/Lint/Test Commands

### No Build System
This project has **NO build system**. There is no `package.json`, no npm, no webpack, no bundler.

### Running the Application
Since the app uses ES modules and Fetch API, it must be served over HTTP:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if available)
npx serve

# PHP
php -S localhost:8000
```

Then access: `http://localhost:8000`

### Testing
- **No automated tests** exist in this project
- Manual testing only: Open `http://localhost:8000` and verify functionality
- Test checklist:
  - Markdown rendering in preview
  - Mermaid diagram rendering
  - DOCX generation and download
  - Font selection
  - Language switching (Chinese/English)
  - Scroll synchronization between editor and preview
  - Print preview functionality

### Linting
- No linters configured
- Code is vanilla JavaScript (ES6+)
- Follow existing code style patterns

## Code Style Guidelines

### File Organization
- **ALL code is in `index.html`**: HTML structure, CSS styles, and JavaScript logic
- No separate `.js` or `.css` files
- No build process or file concatenation

### JavaScript Style

#### Variable Declarations
```javascript
// Use const for values that won't be reassigned
const documentPreviewDiv = document.getElementById('documentPreview');
const i18n = { /* ... */ };

// Use let for values that will change
let debounceTimerPreview;
let isSyncingScroll = false;
let currentLang = 'zh-CN';

// NEVER use var
```

#### Naming Conventions
- **camelCase** for variables and functions: `combinedContentInput`, `applyLanguage()`
- **PascalCase** for classes (when using external libraries): `new docx.Document()`
- **Descriptive names**: Prefer clarity over brevity
  - Good: `documentPreviewDiv`, `updateFullPreview()`
  - Bad: `div`, `update()`

#### Function Declarations
```javascript
// Use function declarations for top-level functions
function applyLanguage(lang) { /* ... */ }

// Use async functions for asynchronous operations
async function loadDefaultMd() { /* ... */ }
async function updateFullPreview() { /* ... */ }

// Use arrow functions for callbacks
combinedContentInput.addEventListener('input', schedulePreviewUpdate);
document.querySelectorAll('[data-i18n]').forEach(el => { /* ... */ });
```

#### Comments
- Use Chinese comments for Chinese-language specific features
- Use English comments for technical implementation details
- Include explanatory comments for complex logic:
```javascript
// 防止循环触发 (Prevent infinite loop)
let isSyncingScroll = false;

// Debounce preview updates to improve performance
clearTimeout(debounceTimerPreview);
```

### HTML/CSS Style

#### HTML
- Use semantic HTML5 elements
- Use `data-*` attributes for internationalization: `data-i18n="key"`
- Keep accessibility in mind (ARIA attributes where needed)

#### CSS
```css
/* Use clear class names */
.toolbar { }
.editor-wrapper { }
.preview-wrapper { }

/* Use media queries for responsive design */
@media (min-width: 1024px) {
    .editor-preview-container {
        flex-direction: row;
    }
}

/* Use print-specific styles */
@media print {
    /* ... */
}
```

### Error Handling
```javascript
// Use try-catch for async operations
try {
    const response = await fetch('default.md');
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    // ...
} catch (error) {
    console.error("Error loading default.md:", error);
    statusDiv.textContent = `${t('defaultLoadError')}${error.message}`;
}

// Provide user-friendly error messages
// Use i18n for error messages
statusDiv.textContent = `${t('error')}${e.message}`;
```

### Async/Await Patterns
```javascript
// Prefer async/await over .then() chains
async function renderMermaidToPng(mermaidDefinition, diagramId) {
    try {
        const { svg } = await mermaid.render(`pngSvg-${diagramId}`, mermaidDefinition);
        // ... process svg
        return pngBlob;
    } catch (e) {
        console.error(`Error in renderMermaidToPng:`, e);
        return null;
    }
}
```

### DOM Manipulation
```javascript
// Cache DOM element references
const combinedContentInput = document.getElementById('combinedContentInput');

// Use querySelector for complex selections
const codeElement = node.querySelector('code');

// Use querySelectorAll with forEach for multiple elements
document.querySelectorAll('[data-i18n]').forEach(el => {
    // ...
});

// Manipulate DOM efficiently
documentPreviewDiv.innerHTML = ''; // Clear before rebuilding
```

### Event Handling
```javascript
// Add event listeners after DOM is ready
document.addEventListener('DOMContentLoaded', loadDefaultMd);

// Use named functions or arrow functions
combinedContentInput.addEventListener('input', schedulePreviewUpdate);
generateDocxButton.addEventListener('click', async () => {
    // ... handler code
});
```

## Internationalization (i18n)

### Adding New Translatable Text
1. Add key-value pairs to both `zh-CN` and `en` objects in the `i18n` object
2. Use `data-i18n="key"` attribute in HTML for element text
3. Use `data-i18n-placeholder="key"` for input placeholders
4. In JavaScript, use `t('key')` to get translated text

```javascript
// i18n object
const i18n = {
    'zh-CN': { newKey: '中文文本' },
    'en': { newKey: 'English Text' }
};

// HTML
<button data-i18n="newKey">Default Text</button>

// JavaScript
statusDiv.textContent = t('newKey');
```

## Libraries and Dependencies

All dependencies loaded via CDN (unpkg.com):
- **Mermaid.js** v11.6.0: Diagram rendering
- **Marked.js** v15.0.12: Markdown parsing
- **docx** v9.5.0: DOCX generation
- **FileSaver.js** v2.0.5: File download

**NEVER** install npm packages or create package.json. All libraries must be CDN-based.

## Important Implementation Details

### Scroll Synchronization
- Uses `isSyncingScroll` flag to prevent infinite loops
- Uses `isUpdatingPreview` flag to prevent sync during preview updates
- Calculates scroll percentage: `scrollTop / (scrollHeight - clientHeight)`

### Preview Updates
- Debounced with 500ms delay to improve performance
- Clears and rebuilds entire preview on each update
- Preserves scroll position by calculating percentage before update

### Mermaid Rendering
- Preview: Uses `mermaid.render()` to generate SVG
- DOCX: Converts SVG to PNG via canvas for embedding
- Each diagram needs unique ID to prevent conflicts

### DOCX Generation
- Uses custom styles for headings, code blocks, quotes
- Supports inline formatting: bold, italic, strikethrough, code
- Tables rendered with borders
- Mermaid diagrams embedded as PNG images
- Filename extracted from first heading or first non-empty line

## File Naming Conventions

### Documentation Files
- `readme.md`: Main project documentation
- `DEPLOY.md`, `QUICKSTART.md`, etc.: Uppercase for guides
- `default.md`: Default content loaded in editor

### Code Files
- `index.html`: Single application file
- `.github/workflows/deploy.yml`: GitHub Actions workflow

## Git Workflow

### Commits
- Use descriptive commit messages in English
- Include Chinese translation in parentheses if relevant

### Deployment
- Pushing to `main` or `master` triggers GitHub Actions
- Deploys to GitHub Pages automatically
- No build step required

## Common Tasks

### Adding a New Feature
1. Edit `index.html` directly
2. Add HTML structure, CSS styles, and JavaScript logic in appropriate sections
3. Add i18n strings if feature has UI text
4. Test locally with HTTP server
5. Commit and push (auto-deploys)

### Fixing a Bug
1. Locate code in `index.html` (all code is there)
2. Make fix
3. Test thoroughly in browser
4. Commit with descriptive message

### Updating Dependencies
Change version numbers in CDN URLs:
```html
<script src="https://unpkg.com/mermaid@11.6.0/dist/mermaid.min.js"></script>
```

## Browser Compatibility
- Target: Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Uses ES6+ features: async/await, arrow functions, template literals
- Uses Fetch API (no XMLHttpRequest)
- Uses modern CSS (Flexbox, CSS Grid not used but supported)

## Performance Considerations
- **Debouncing**: Preview updates debounced at 500ms
- **Large files**: No special handling; may be slow
- **Image rendering**: Mermaid PNG conversion can be slow for complex diagrams
- **DOM manipulation**: Full rebuild on each preview update

## Security Considerations
- Mermaid `securityLevel: 'loose'` allows HTML in diagrams
- No user data sent to servers (fully client-side)
- No authentication/authorization needed

## Anti-Patterns to Avoid
- ❌ Don't create separate .js or .css files
- ❌ Don't add package.json or npm dependencies
- ❌ Don't use build tools (webpack, rollup, etc.)
- ❌ Don't use var for variable declarations
- ❌ Don't use .then() chains (prefer async/await)
- ❌ Don't hardcode user-facing text (use i18n)
- ❌ Don't ignore error handling
- ❌ Don't forget to test in both languages (Chinese/English)

## Best Practices
- ✅ Keep all code in `index.html`
- ✅ Use const/let appropriately
- ✅ Add both English and Chinese comments where helpful
- ✅ Use async/await for asynchronous code
- ✅ Add i18n support for all user-facing text
- ✅ Cache DOM element references
- ✅ Use descriptive variable and function names
- ✅ Test manually in browser after changes
- ✅ Use try-catch for error handling
- ✅ Preserve existing code style and patterns
