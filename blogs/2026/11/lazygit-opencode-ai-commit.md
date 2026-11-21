---
title: 用 LazyGit + OpenCode 一键生成 AI Commit Message
created: 2026-05-30
tags:
  - git
  - lazygit
  - opencode
  - ai
  - workflow
summary: 在 LazyGit 中集成 OpenCode 实现 AI 一键提交
cover: /assets/default-cover.jpg
updated: 2026-05-30
lazynote_generated: true
lazynote_id: d249313d-c1ee-4ca1-8148-b7ac61a714da
date: 2026-11-10
source: lazygit-opencode-ai-commit.md
---

<!-- lazynote:body -->
---
title: 用 LazyGit + OpenCode 一键生成 AI Commit Message
created: '2026-05-30'
tags:
  - git
  - lazygit
  - opencode
  - ai
  - workflow
summary: 在 LazyGit 中集成 OpenCode 实现 AI 一键提交
cover: /assets/default-cover.jpg
updated: '2026-05-30'
---
# 用 LazyGit + OpenCode 一键生成 AI Commit Message

最近我把自己的 Git 提交流程又简化了一步：
在 LazyGit 里选好 staged files，按一个快捷键，就能自动调用 OpenCode 读取 staged diff，然后生成一条中文 Conventional Commit message，最后直接提交。

整体效果是：

```bash
feat(config): ✨ 添加 LazyGit AI 提交命令
```

不需要手写 commit message，也不需要离开 LazyGit。

---

## 安装 LazyGit

如果你用的是 macOS，可以直接通过 Homebrew 安装：

```bash
brew install lazygit
```

安装完成后运行：

```bash
lazygit
```

如果能正常打开 LazyGit，就说明安装成功了。

---

## 配置目录

macOS 下我的 LazyGit 配置目录是：

```bash
~/Library/Application Support/lazygit
```

可以先进入这个目录：

```bash
cd "$HOME/Library/Application Support/lazygit"
```

如果目录不存在，可以创建：

```bash
mkdir -p "$HOME/Library/Application Support/lazygit"
```

---

## 添加 LazyGit 自定义命令

编辑 `config.yml`：

```bash
vim config.yml
```

加入下面这段配置：

```yml
customCommands:
  - key: 'x'
    context: 'files'
    description: 'AI commit with OpenCode'
    command: 'sh "$HOME/Library/Application Support/lazygit/lazygit-ai-commit-opencode.sh"'
    output: terminal
```

这段配置的意思是：

* 在 `files` 面板中启用快捷键
* 按 `x` 触发命令
* 调用一个 shell 脚本
* 输出显示在 terminal 中

也就是说，之后在 LazyGit 的文件面板里，按 `x` 就可以自动生成 commit message 并提交。

---

## 编写 AI Commit 脚本

在同一个目录下创建脚本：

```bash
vim lazygit-ai-commit-opencode.sh
```

内容如下：

```sh
#!/bin/sh
set -eu

MODEL="${OPENCODE_COMMIT_MODEL:-deepseek/deepseek-v4-flash}"

diff_file=$(mktemp /tmp/lazygit-ai-commit-diff.XXXXXX)
raw_file=$(mktemp /tmp/lazygit-ai-commit-raw.XXXXXX)
err_file=$(mktemp /tmp/lazygit-ai-commit-err.XXXXXX)

cleanup() {
  rm -f "$diff_file" "$raw_file" "$err_file"
}
trap cleanup EXIT INT TERM

git diff --cached --no-ext-diff --unified=1 > "$diff_file"

if [ ! -s "$diff_file" ]; then
  echo "No staged changes."
  exit 1
fi

if ! command -v opencode >/dev/null 2>&1; then
  echo "opencode not found."
  echo "Check: which opencode"
  exit 1
fi

prompt='你是 Git commit message 生成器。

根据 staged diff 生成一条 commit message。

要求：
- 极简输出
- 使用 Conventional Commits
- 格式：type(scope): summary
- type 只能是 feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
- summary 使用中文
- 要 markdown
- 不要解释
- 不要引号
- 要 emoji
- 不要修改任何文件'

echo "Generating commit message with OpenCode..."
echo "Model: $MODEL"
echo

if ! opencode run "$prompt" \
  --model "$MODEL" \
  --agent plan \
  --file "$diff_file" \
  > "$raw_file" 2> "$err_file"; then

  echo "opencode failed."
  echo
  echo "stderr:"
  cat "$err_file"
  echo
  echo "stdout:"
  cat "$raw_file"
  exit 1
fi

msg=$(
  grep -Eom1 '^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^)]+\))?: .+' "$raw_file" \
    | sed 's/^["`'"'"' ]*//; s/["`'"'"' ]*$//' \
    || true
)

if [ -z "$msg" ]; then
  msg=$(
    grep -v '^[[:space:]]*$' "$raw_file" \
      | tail -n 1 \
      | sed 's/^["`'"'"' ]*//; s/["`'"'"' ]*$//' \
      || true
  )
fi

if [ -z "$msg" ]; then
  echo "AI commit message is empty."
  echo
  echo "opencode raw output:"
  cat "$raw_file"
  echo
  echo "opencode stderr:"
  cat "$err_file"
  exit 1
fi

echo "AI commit message:"
echo "$msg"
echo

git commit -m "$msg"
```

然后给脚本添加执行权限：

```bash
chmod +x "$HOME/Library/Application Support/lazygit/lazygit-ai-commit-opencode.sh"
```

---

## 使用方式

进入一个 Git 项目：

```bash
lazygit
```

然后：

1. 修改代码
2. 在 LazyGit 里 stage 想提交的文件
3. 切到 files 面板
4. 按 `x`
5. OpenCode 会读取 staged diff
6. 自动生成 commit message
7. 自动执行 `git commit -m`

如果没有 staged changes，会提示：

```bash
No staged changes.
```

如果没有安装或找不到 OpenCode，会提示：

```bash
opencode not found.
Check: which opencode
```

---

## 自定义模型

脚本里默认使用：

```sh
deepseek/deepseek-v4-flash
```

也可以通过环境变量覆盖：

```bash
export OPENCODE_COMMIT_MODEL="your-model-name"
```

例如：

```bash
OPENCODE_COMMIT_MODEL="deepseek/deepseek-v4-flash" lazygit
```

这样就可以在不同项目里使用不同模型。

---

## 为什么用 staged diff？

脚本里用的是：

```bash
git diff --cached --no-ext-diff --unified=1
```

也就是说，它只会读取已经 staged 的内容。

这样有几个好处：

* 不会把未准备提交的改动也交给 AI
* commit message 更准确
* 更符合 Git 的提交习惯
* 可以按提交粒度分批 stage

我觉得这是这个脚本最重要的一点。

AI 不应该根据整个工作区猜 commit message，而应该只根据即将提交的 diff 生成 message。

---

## Commit 格式约束

我让模型只输出 Conventional Commits 格式：

```text
type(scope): summary
```

其中 `type` 只能是：

```text
feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
```

并且要求：

* summary 使用中文
* 带 emoji
* 不要解释
* 不要引号
* 不要修改任何文件

这样生成出来的 commit message 会比较稳定，比如：

```bash
feat(lazygit): ✨ 添加 OpenCode AI 提交命令
```

或者：

```bash
fix(script): 🐛 修复空提交信息处理逻辑
```

---

## 总结

这套配置之后，我在 LazyGit 里的提交流程变成了：

```text
stage files -> press x -> AI commit
```

不用切换窗口，不用复制 diff，不用手写 commit message。

它适合这类场景：

* 经常使用 LazyGit
* 想保持 Conventional Commits
* 喜欢中文 commit summary
* 希望 AI 只基于 staged diff 生成提交信息
* 想把提交动作压缩成一个快捷键

最终只需要两个文件：

```text
~/Library/Application Support/lazygit/config.yml
~/Library/Application Support/lazygit/lazygit-ai-commit-opencode.sh
```

一个配置快捷键，一个负责调用 OpenCode。

简单、直接、够用。

<!-- lazynote:end -->
