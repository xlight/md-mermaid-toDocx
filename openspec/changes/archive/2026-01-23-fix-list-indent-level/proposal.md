# Change: 修复 DOCX 导出中列表缩进级别错误

## Why

当前导出 DOCX 文档时,顶级列表(无嵌套的列表)被错误地渲染为二级缩进:
- 使用空心圆(○)作为项目符号(这是 level 1 的样式)
- 缩进较深(left: 1440,对应二级缩进)

**期望行为**:
- 顶级列表应该使用实心圆(●)作为项目符号
- 缩进应该较浅(left: 720,对应一级缩进)
- 对应 DOCX 的 level 0

**根本原因**:
`getListLevel()` 函数的计算逻辑错误。当计算顶级列表项时:
- `<li>` 的父元素是 `<ul>`/`<ol>` (计数 +1)
- `<ul>`/`<ol>` 的父元素是 `tempDiv` (结束循环)
- 返回 level = 1,但实际应该返回 0

## What Changes

修改 `getListLevel()` 函数的返回值:
- 将返回值减 1,使顶级列表对应 level 0
- 确保返回值最小为 0 (使用 `Math.max(0, l - 1)`)

**具体修改**:
```javascript
// 修改前:
const getListLevel = (elementNode) => { 
    let l=0; 
    let c=elementNode.parentElement; 
    while(c&&c!==tempDiv){
        if(c.tagName==='UL'||c.tagName==='OL')l++; 
        c=c.parentElement;
    } 
    return Math.max(0,l);  // 顶级列表返回 1 ❌
};

// 修改后:
const getListLevel = (elementNode) => { 
    let l=0; 
    let c=elementNode.parentElement; 
    while(c&&c!==tempDiv){
        if(c.tagName==='UL'||c.tagName==='OL')l++; 
        c=c.parentElement;
    } 
    return Math.max(0, l - 1);  // 顶级列表返回 0 ✅
};
```

## Impact

- 影响的规范: `specs/docx-export`
- 影响的代码: `index.html` 第 748 行 `getListLevel` 函数
- 向后兼容: **有影响** - 现有 DOCX 导出的列表缩进会改变
  - 所有列表的缩进级别会减少 1
  - 顶级列表从 level 1 变为 level 0
  - 二级嵌套列表从 level 2 变为 level 1
  - 依此类推
- 用户体验: **显著改善** - 列表缩进符合 Word 文档标准规范
- 其他功能: 不受影响,仅改变列表的缩进级别和项目符号样式
