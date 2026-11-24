# 我的 LazyNote

这里只维护两个入口：todos.md 放待办，links.md 放待收藏网址。博客直接在本目录自己命名。

## 1. 待办：todos.md

日期分组表示截止日期；没有截止日期放在待安排。补充说明缩进写在任务下面。

```md
## 2026-12-01

- [ ] 给客户发送报价
  附上最新价格表。

## 待安排

- [ ] 整理书架
```

把示例改成自己的任务，再运行：

```sh
lazynote todo
```

完成时在 todos.md 将 [ ] 改成 [x]，再运行 todo。成功归档到 dones/年/月/日.md 后才从入口移除；失败保留。不调用 AI。

可选：在本目录现有的 `.env` 中填写 `HABITICA_USER_ID` 和 `HABITICA_API_TOKEN`（从 [Habitica 设置 → API](https://habitica.com/user/settings/api) 获取）。仍运行 `lazynote todo`，即可双向同步个人待办；不配置则只在本机处理。习惯、日常任务和奖励在 Habitica 单独管理。不要提交或分享令牌。

## 2. 收藏：links.md

每行只写一个真实 HTTP(S) 网址，不加标题、备注或分隔符：

```text
https://example.com/article-a
https://example.com/article-b
```

以上网址仅展示格式，请替换为自己的文章地址。

```sh
lazynote link
```

命令依次获取公开正文、生成 AI 标签、保存到 links/年/月/标题-标识.md，成功后移除入口链接；失败项保留。不绕过登录或付费墙。

## 3. 博客：任意文件名.md

例如新建“我的文章.md”：

```md
# 我的文章

在这里写正文，可以继续补充章节。
```

```sh
# 可选：写作尚未完成时先生成标签
lazynote tag 我的文章.md

# 写完后归档；没有标签也可以
lazynote blog 我的文章.md
```

归档保存到 blogs/年/月/原文件名.md，成功后移走原稿；冲突不覆盖，失败保留。blog 不调用 AI。已归档文章可继续本地编辑，用 archive 刷新正文和索引标签。

## 4. 只读网页

```sh
lazynote web
```

打开终端显示的本机地址。保持该终端运行，另开终端整理内容，完成后刷新网页。网页提供待办、收藏、博客分类以及已打标签草稿；不能编辑、勾选或执行整理。

## 5. 模型配置

只有 link 和 tag 需要模型。在本目录创建 .env，填写自己的 OpenAI 兼容接口配置：

```dotenv
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=填写服务商提供的模型名
OPENAI_API_KEY=填写自己的密钥
```

不提交或分享密钥。init、todo、blog、archive 和浏览不需要模型。收藏及标签生成可能产生模型费用。

## 6. 公开发布博客与收藏

本机网页和公开站点是两回事。公开站点保留「博客」「收藏」及年月分组，没有「待办」。`publish.txt` 每行填写一个允许公开的 `blogs/年/月/*.md` 或 `links/年/月/*.md` 归档路径。选中的博客原始 `.md` 按原路径完整上传到 GitHub，收藏只公开标题、标签和原文链接。

在本目录导出到独立发布仓库：

```sh
lazynote publish "$HOME/Documents/note-public"
```

`lazynote init` 会补齐当前目录的 `.github/workflows/pages.yml`，也会升级 LazyNote 以前生成的模板。自定义工作流保留，不会提交或推送。

公开仓库保存选中博客的原始 Markdown、公开网页数据、博客引用的图片，以及 `.github/workflows/pages.yml`。推送到 `master` 后，GitHub Actions 构建并部署网页；原始 Markdown 留在 GitHub 仓库。无需提交 `site/` 或生成好的 `index.html`，**不要把整个 `life` 推到公开仓库。**

首次设置 [wei-py/note](https://github.com/wei-py/note)：

1. 在 **Settings → General → Default branch** 保持默认分支为 `master`。
2. 在 **Settings → Pages**，将 **Source** 设为 **GitHub Actions**。不需要选模板。
3. 若需要手动部署，到 [Actions → Publish LazyNote site](https://github.com/wei-py/note/actions/workflows/pages.yml) 点 **Run workflow**，选 `master`。成功后访问 [公开站点](https://wei-py.github.io/note/)；以后推送到 `master` 会自动部署。

公开仓库的提交历史同样可见。不要提交原始收藏正文、周报或草稿；替换分支也不能撤回已下载的副本。

## 备份与安全

备份整个内容目录，包含 .lazynote/ 的索引与原文历史。不要手动修改程序生成的标识。重复 init 只补齐缺失文件，不覆盖已有文件；这些示例不会自动变成任务或收藏。
