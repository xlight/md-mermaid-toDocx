# 表格与代码块文档

## 表格

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据A | 数据B | 数据C |
| 数据D | 数据E | 数据F |
| 数据G | 数据H | 数据I |

## 代码块

```javascript
function example() {
    const data = [1, 2, 3, 4, 5];
    return data.map(x => x * 2);
}
```

```python
def process(data):
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
    return result
```

## 混合内容

表格和代码块之后的文本。测试 intra-block 锚点在多种块级元素混合时的匹配精度。

| 语言 | 用途 |
|------|------|
| JavaScript | 前端 |
| Python | 后端 |

更多文本内容。
