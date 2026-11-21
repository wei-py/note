---
title: 最常见的事故给你预判
created: 2026-05-30
tags:
  - git
  - team
  - workflow
  - guide
summary: Git 团队协作常见事故预防与应急处理指南
cover: /assets/default-cover.jpg
updated: 2026-07-17
lazynote_generated: true
lazynote_id: 22f1d230-b962-48ac-b33b-be1fbfab2a2b
date: 2026-11-10
source: git-team-accident-prevention.md
---

<!-- lazynote:body -->
---
title: 最常见的事故给你预判
created: '2026-05-30'
tags:
  - git
  - team
  - workflow
  - guide
summary: Git 团队协作常见事故预防与应急处理指南
cover: /assets/default-cover.jpg
updated: '2026-07-17'
---
```text
第一类：预防
靠权限、流程、分支保护、CI、Review 防止他们把主分支搞坏。

第二类：救火
他们本地乱了、分支乱了、提交错了、合错了，你有固定 SOP 可以恢复。
```

下面我按真实企业里最常见的事故给你预判。

---

# 一、先建立团队规则，防止新手乱搞

## 1. 保护核心分支

核心分支必须保护：

```text
main
develop
release/*
```

规则：

```text
禁止直接 push
禁止 force push
必须走 MR / PR
必须 CI 通过
必须至少 1 人 Review
main 只能由负责人合并
release 只能由负责人或发布管理员合并
```

这样新手即使本地乱操作，也很难影响远程主线。

---

## 2. 新手只能操作自己的 feature 分支

给新手一句明确规则：

```text
你只允许在 feature/你的名字-任务号-描述 上开发。
不要直接改 develop。
不要直接改 main。
不要直接改 release。
```

例如：

```bash
feature/wei-PROJ-123-login-page
feature/tom-PROJ-188-order-list
```

---

## 3. 每天标准操作模板

让新手每天只按这个来：

```bash
git checkout develop
git pull origin develop

git checkout -b feature/PROJ-123-login-page

# 写代码
git add .
git commit -m "feat: add login page"

git push -u origin feature/PROJ-123-login-page
```

更新自己的功能分支：

```bash
git checkout feature/PROJ-123-login-page
git fetch origin
git rebase origin/develop
```

推送：

```bash
git push --force-with-lease
```

强调：

```text
只允许 force-with-lease 自己的 feature 分支。
禁止 force push develop/main/release。
```

---

# 二、新手最常见事故和解决方法

## 情况 1：他在 develop 上直接写代码了

### 现象

```bash
git branch
```

显示：

```text
* develop
```

但是他已经改了一堆代码，还没提交。

### 处理方式

不要慌，直接从当前修改切一个 feature 分支：

```bash
git checkout -b feature/PROJ-123-login-page
```

然后正常提交：

```bash
git add .
git commit -m "feat: add login page"
git push -u origin feature/PROJ-123-login-page
```

这样代码就从 `develop` 挪到了正确的 feature 分支。

---

## 情况 2：他在 develop 上已经 commit 了

### 现象

```text
develop 上多了不该有的提交
```

但还没有 push。

### 处理方式

先创建 feature 分支保存这些提交：

```bash
git checkout -b feature/PROJ-123-login-page
```

然后回到 develop，把 develop 恢复到远程状态：

```bash
git checkout develop
git fetch origin
git reset --hard origin/develop
```

然后继续在 feature 分支开发：

```bash
git checkout feature/PROJ-123-login-page
```

注意：

```text
reset --hard 会丢弃当前分支未保存的内容。
执行前一定要确认代码已经在 feature 分支里。
```

---

## 情况 3：他把代码 push 到 develop 了

如果你们没有保护分支，就会发生这个。

### 处理方式 A：如果 develop 还没人基于它继续开发

可以回滚 develop 到正确位置。

先找到错误提交之前的 commit：

```bash
git log --oneline
```

然后：

```bash
git checkout develop
git reset --hard 正确的commit_id
git push --force-with-lease origin develop
```

但是这个操作有风险，应该由负责人执行。

---

### 处理方式 B：如果 develop 已经被别人拉取了

不要 reset，使用 revert：

```bash
git checkout develop
git pull origin develop
git revert 错误commit_id
git push origin develop
```

区别：

```text
reset：改历史，有风险
revert：新增一个反向提交，更安全
```

企业里推荐：

```text
公共分支出问题，优先 revert。
自己的 feature 分支出问题，可以 reset/rebase。
```

---

## 情况 4：他在 main 上开发了

### 如果没有提交

直接切分支：

```bash
git checkout -b feature/PROJ-123-fix
```

### 如果已经提交，但没 push

```bash
git checkout -b feature/PROJ-123-fix
git checkout main
git fetch origin
git reset --hard origin/main
```

### 如果已经 push 到 main

这是严重事故。

处理方式：

```bash
git checkout main
git pull origin main
git revert 错误commit_id
git push origin main
```

然后马上设置：

```text
main 禁止直接 push
main 禁止 force push
main 必须 MR
```

---

## 情况 5：他合错分支了

比如他把 `feature/A` 合进了 `feature/B`。

### 如果还没 push

可以直接 reset 回去：

```bash
git log --oneline
git reset --hard 合并前的commit_id
```

或者如果刚刚 merge 完：

```bash
git reset --hard ORIG_HEAD
```

### 如果已经 push

不要随便 reset 公共分支。

如果这是他自己的 feature 分支，可以：

```bash
git reset --hard 合并前的commit_id
git push --force-with-lease
```

如果别人也在用这个分支，使用 revert：

```bash
git revert -m 1 merge_commit_id
git push origin feature/xxx
```

---

## 情况 6：他 pull 之后出现一堆 merge commit

### 原因

他用了：

```bash
git pull
```

默认可能变成：

```bash
fetch + merge
```

于是提交历史变乱。

### 推荐设置

让团队统一使用 rebase pull：

```bash
git config --global pull.rebase true
```

或者每次明确写：

```bash
git pull --rebase origin develop
```

推荐新手用：

```bash
git fetch origin
git rebase origin/develop
```

比 `git pull` 更清楚。

---

## 情况 7：他 rebase 冲突不会处理

标准流程：

```bash
git status
```

找到冲突文件，手动解决：

```text
<<<<<<< HEAD
旧代码
=======
新代码
>>>>>>> feature
```

解决后：

```bash
git add 冲突文件
git rebase --continue
```

如果他搞不定，要退出 rebase：

```bash
git rebase --abort
```

你可以告诉新手：

```text
看到冲突不要乱删。
先 git status。
不会解决就 git rebase --abort，然后找人。
```

---

## 情况 8：他 commit 信息乱写

比如：

```text
update
fix
123
aaa
```

### 如果还没 push

改最后一次 commit：

```bash
git commit --amend -m "fix: handle null avatar url"
```

如果要改多个 commit：

```bash
git rebase -i HEAD~3
```

### 如果已经 push 到自己的 feature 分支

```bash
git commit --amend -m "fix: handle null avatar url"
git push --force-with-lease
```

### 如果已经合进 develop

不要为了改 commit message 去改公共历史。

---

## 情况 9：他把不该提交的文件提交了

比如：

```text
.env
node_modules
dist
target
.idea
.DS_Store
```

### 还没 push

从 Git 暂存/版本里移除，但保留本地文件：

```bash
git rm --cached .env
git commit -m "chore: remove env file from git"
```

然后加 `.gitignore`：

```bash
echo ".env" >> .gitignore
git add .gitignore
git commit -m "chore: update gitignore"
```

### 已经 push 了敏感信息

比如密码、token、密钥。

处理方式不是简单删除，而是：

```text
1. 立刻废弃泄露的 token / password / key
2. 从代码中删除
3. 必要时清理 Git 历史
4. 通知负责人
```

企业里重点是：

```text
泄露密钥之后，第一件事是换密钥，不是删 Git 记录。
```

---

## 情况 10：他本地改了一半，想切分支但切不了

### 现象

```text
Your local changes would be overwritten by checkout
```

### 处理方式 A：临时保存

```bash
git stash push -m "work in progress"
```

切分支：

```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-task
```

恢复修改：

```bash
git stash pop
```

### 处理方式 B：直接在当前修改上建分支

如果当前修改本来就应该属于新任务：

```bash
git checkout -b feature/PROJ-123-task
```

---

## 情况 11：他误删了分支

### 本地分支删了，但远程还在

```bash
git fetch origin
git checkout -b feature/xxx origin/feature/xxx
```

### 本地和远程都删了，但之前提交过

用 reflog 找回来：

```bash
git reflog
```

找到 commit 后：

```bash
git checkout -b feature/recovered commit_id
```

---

## 情况 12：他 reset --hard 把代码搞没了

Git 大部分时候还能救。

```bash
git reflog
```

找到之前的提交：

```bash
git checkout -b recover-lost-code commit_id
```

所以你可以教新手一句救命命令：

```bash
git reflog
```

`reflog` 是 Git 后悔药。

---

## 情况 13：他把别人的代码覆盖了

常见原因：

```bash
git push --force
```

### 预防

禁止他们用：

```bash
git push --force
```

只允许：

```bash
git push --force-with-lease
```

而且只允许在自己的 feature 分支用。

### 救援

找远程之前的提交：

```bash
git reflog
git log --oneline --all
```

或者让被覆盖的人本地查看：

```bash
git reflog
```

再重新建恢复分支：

```bash
git checkout -b recover/xxx commit_id
git push origin recover/xxx
```

---

# 三、你作为管理者应该怎么"对付"

这里不是靠骂新手，而是靠机制。

## 1. 给他们一张 Git 操作红线

明确禁止：

```text
禁止直接 push main
禁止直接 push develop
禁止直接 push release/*
禁止 force push 公共分支
禁止本地长期不更新 develop
禁止一个分支做多个需求
禁止把 .env、密钥、node_modules 提交上来
禁止没有 Review 就合并
```

---

## 2. 给他们一套固定命令

新手不要自由发挥，只按模板做。

### 开新需求

```bash
git checkout develop
git pull origin develop
git checkout -b feature/PROJ-123-description
```

### 提交代码

```bash
git status
git add .
git commit -m "feat: description"
git push -u origin feature/PROJ-123-description
```

### 更新分支

```bash
git fetch origin
git rebase origin/develop
```

### 冲突退出

```bash
git rebase --abort
```

### 查看自己在哪个分支

```bash
git branch
```

### 查看当前状态

```bash
git status
```

---

## 3. 让他们提交 MR 前自查

可以要求他们贴这个 checklist：

```text
[ ] 我确认当前分支不是 main/develop/release
[ ] 我已经 git pull/rebase 最新 develop
[ ] 我本地测试通过
[ ] 我没有提交 .env、密钥、日志、大文件
[ ] commit message 符合规范
[ ] MR 目标分支正确
[ ] MR 描述写清楚改了什么
```

---

## 4. MR 模板

你可以在 GitLab / GitHub 配这个模板：

```markdown
## 变更内容

说明本次修改了什么。

## 关联需求

PROJ-xxx

## 测试情况

- [ ] 本地测试通过
- [ ] 单元测试通过
- [ ] 没有影响主流程

## 风险点

说明是否影响登录、支付、订单、权限等核心模块。

## 检查项

- [ ] 目标分支正确
- [ ] 没有提交敏感文件
- [ ] 没有无关代码
- [ ] 已经同步最新 develop
```

---

# 四、你要记住的救火原则

## 原则 1：先保现场

新手说"我 Git 乱了"，你第一句话让他执行：

```bash
git status
git branch
git log --oneline -5
```

不要让他继续乱敲命令。

---

## 原则 2：先备份再修

不确定时，先建备份分支：

```bash
git checkout -b backup/当前问题-日期
```

例如：

```bash
git checkout -b backup/wei-login-20260519
```

这样后面即使用错命令，也能回来。

---

## 原则 3：公共分支少用 reset

```text
自己的 feature 分支：可以 reset、rebase
公共分支 develop/main/release：优先 revert
```

---

## 原则 4：不会处理冲突就 abort

```bash
git merge --abort
```

或：

```bash
git rebase --abort
```

先退出，再找人。

---

## 原则 5：救命三件套

```bash
git status
git reflog
git reset --hard commit_id
```

不过 `reset --hard` 要谨慎，最好先建备份分支。

---

# 五、推荐你定一套最终团队规范

你可以直接发给团队：

```text
1. main 是生产分支，任何人不得直接 push。
2. develop 是开发集成分支，必须通过 MR 合入。
3. release/* 是发布分支，只允许发布修复，不允许新功能。
4. feature/* 从 develop 切出，开发完成后 MR 到 develop。
5. bugfix/* 从 develop 切出，修复完成后 MR 到 develop。
6. hotfix/* 从 main 切出，修复完成后同时合回 main 和 develop。
7. 所有 MR 必须至少一人 Review。
8. 所有 MR 必须 CI 通过。
9. 禁止 force push 公共分支。
10. 新手遇到冲突或分支异常，先停手，执行 git status，把结果发给负责人。
```

---

# 六、最实用的"事故处理速查表"

| 事故                        | 处理                                    |
| ------------------------- | ------------------------------------- |
| 在 develop 改了代码但没提交        | `git checkout -b feature/xxx`         |
| 在 develop commit 了但没 push | 先切 feature 保存，再 reset develop         |
| push 到 develop 了          | 公共分支优先 `git revert`                   |
| 在 main 上开发了               | 切 feature 保存，main reset 回 origin/main |
| 合错分支                      | 没 push 用 `reset`，push 了用 `revert`     |
| rebase 冲突乱了               | `git rebase --abort`                  |
| merge 冲突乱了                | `git merge --abort`                   |
| reset 后代码没了               | `git reflog` 找回                       |
| 删除了分支                     | 从远程恢复，或用 `reflog`                     |
| 提交了敏感文件                   | 先废弃密钥，再清理代码和历史                        |
| force push 覆盖别人           | 用 `reflog` 找回，恢复分支                    |

---

你可以把新手 Git 管理理解成一句话：

```text
不要指望新手永远不犯错。
要让他们的错误只能发生在自己的 feature 分支里，
不能污染 develop、release、main。
```

最有效的组合是：

```text
分支保护 + MR Review + CI 检查 + 固定命令模板 + 事故 SOP
```

---

## 📝 口诀

```
主分支要设防火墙，禁止直接 push 和 force，
MR Review CI 过，公共分支不轻动。

新手只能 feature 上耍，develop main 别乱插，
每天拉最新再切支，rebase 同步不打架。

发现改错不用慌，git status 先看场，
没提交就切分支走，提交未 push 先备份再清场。
已经 push 到公共线，revert 回滚最安全，
feature 分支随便整，reset rebase 任你选。

合错分支分两步，没 push 直接 reset 回，
push 之后用 revert，-m 1 指第一父。

冲突不会别硬撑，abort 退出再找人，
误删误 reset 别怕，reflog 后悔药救命。

敏感文件莫提交，.gitignore 先写好，
万一泄露先换密钥，再清历史不迟了。

git stash 临时存，git reflog 救星灯，
backup 分支保底牌，公共分支 revert 行。

流程固定模板化，红线清单墙上挂，
不怕新人犯错误，机制兜底最可靠！
```

<!-- lazynote:end -->
