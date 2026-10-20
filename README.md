# hijeffery.github.io

Lingyan Ran（冉令燕）的个人主页：https://hijeffery.github.io/

## 更新论文

1. 编辑 `src/papers.js`（论文列表的唯一数据源）。
2. 在仓库根目录运行：

   ```bash
   node tools/build.js
   ```

   脚本把论文列表预渲染进 `index.html`，并同步生成 `llms.txt`、`sitemap.xml` 与页面中的 JSON-LD 元数据。
   本地仓库已安装 git pre-commit 钩子，提交时会自动执行这一步（找不到 Node.js 时只提示、不阻止提交）。
3. 提交并推送。

`index.html` 中 `<!-- BUILD:xxx:START -->` 与 `<!-- BUILD:xxx:END -->` 之间的内容由脚本生成，手工修改会被覆盖。

## 其他需要手工维护的内容

| 内容 | 位置 |
| --- | --- |
| 简介 | `index.html` 中的 `<p id="bio">` |
| 一句话摘要 | `index.html` 中的 `<meta name="description">` |
| 学术档案链接（图标行、JSON-LD `sameAs`） | `tools/build.js` 顶部的 `PROFILES` 与 `EXTRA_SAME_AS` |

## 为什么要预渲染

原先论文列表由浏览器端 JavaScript 生成，不执行 JavaScript 的搜索引擎爬虫与大模型网页读取工具只能看到空列表。
预渲染后，完整列表直接写在 HTML 中；`llms.txt` 提供一份纯文本版简介与论文列表，JSON-LD 将每篇论文与作者实体关联，便于检索系统做作者消歧。
