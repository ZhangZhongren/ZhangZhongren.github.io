## 使用 treer 生成文件结构

### 安装

```
npm install treer -g
```

### 生成文件结构

```
treer -e ./result.txt -i .git
```

### 忽略多个文件

```
treer -i "/node_modules|.git|.idea/" -e "structure.md"
```

### 生成前N曾结构

```
treer -e ./result.txt -i .git -L {n}
```