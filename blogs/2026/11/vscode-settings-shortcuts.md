---
title: vscode-settings-shortcuts
created: 2026-11-14
updated: 2026-11-14
tags:
  - VSCode
  - VSCodeVim
  - 快捷键
  - 编辑器配置
lazynote_generated: true
lazynote_id: d76c4520-c02a-4784-9aa0-0e61494b2825
date: 2026-11-14
source: vscode-settings-shortcuts.md
---

<!-- lazynote:body -->
---
title: vscode-settings-shortcuts
created: 2026-11-14
updated: 2026-11-14
tags:
  - VSCode
  - VSCodeVim
  - 快捷键
  - 编辑器配置
---
# 我的 VSCode 配置与快捷键

这篇文章整理我当前的 VSCode 配置：编辑区使用相对行号与 Vim 模式，界面搭配 Hyper Term Black 和 Material Icon Theme，格式化入口统一指向 Oxc。下面先介绍配置，再列出快捷键，最后放上两个可分别复制的完整配置文件。

记录于 2026-11-13。这是一份静态记录，不会自动同步后续修改。

## 配置文件与阅读说明

macOS 的用户设置位于 `~/Library/Application Support/Code/User/settings.json`，快捷键位于同目录的 `keybindings.json`。本文只记录这两个文件中未被注释的内容，不包含备份、默认快捷键全集或工作区设置。

当前共有 85 个顶层设置、92 条文件嵌套规则，以及 57 条用户快捷键规则（27 条绑定、30 条取消绑定）。配置文件、远程环境、工作区、文件夹和语言专属设置仍可能影响最终行为；本文没有逐项实测快捷键。

Python、Code Runner、Volar、LeetCode、Turbo Console Log、VSCodeVim、Oxc、图标与主题配置都依赖对应扩展或工具。文章不包含令牌、密钥或密码，个人主目录统一写作 `~`。文末 `oxc.path.oxfmt` 也做了同样替换：复制后请改为你机器上的绝对路径，不要假设扩展会展开 `~`。

## 界面、编辑与工具配置

| 类别 | 当前设置与影响 |
| --- | --- |
| 编辑体验 | 字号 16、字重 400、行高 1.5；字体 FiraCode Nerd Font / 霞鹜文楷 GB，启用连字；相对行号，缩进宽度 2；光标上下文 50 行，平滑光标与滚动；无障碍支持开启；内联建议关闭。 |
| 格式化 | 全局默认格式化器为 `oxc.oxc-vscode`；JS、JSX、JSON、JSONC、HTML、TS、TSX、Vue、Markdown、SCSS、CSS 也显式指定同一格式化器。`oxfmt` 指向 mise shim；配置未显式启用保存时格式化，`qq` 可手动格式化。扩展是否支持具体语言需以运行结果为准。 |
| 工作台 | 缩放 0.8；主题 Hyper Term Black，Material Icon Theme；活动栏在顶部并自动隐藏；状态栏显示；辅助侧栏默认隐藏，命令中心/布局控件/导航控件关闭；自定义标题栏。固定标签最大宽度 80，但是否使用该宽度还依赖标签布局模式。 |
| 文件树 | 按类型排序并反转；打开的编辑器按完整路径排序；目录不压缩，树缩进 18，不画缩进辅助线；自动定位采用 focusNoScroll；文件嵌套开启但默认不展开。92 条完整匹配规则见快照。 |
| 终端 | 集成终端字号 16、FiraCode Nerd Font、平滑滚动，终端标签靠左；macOS 外部终端 Warp.app。Windows 默认 Git Bash 设置仅适用于 Windows，不改变本机 macOS 默认集成终端。 |
| 文件与差异 | `*.uvue` 识别为 uvue，`*.vue` 识别为 vue；全局与 Markdown 均不忽略差异中的行首尾空白。不受信任文件配置为直接打开，不等于关闭全部工作区信任机制。 |
| 其他界面 | 忽略扩展推荐；聊天字号 8、会话视图及上下文用量关闭；编辑器空白提示隐藏；小地图右侧且鼠标悬停显示。woodfishTheme 的 overlay/glass/glow/cursor glow 关闭，实际影响取决于对应扩展和当前主题。 |
| Vim | 启用 EasyMotion、foldfix、搜索高亮/增量搜索、surround、Ctrl 键支持和系统剪贴板；禁用 sneak；leader 是空格。详细映射见后文。 |

## 用户快捷键完整表

保留原文件顺序。`cmd`=⌘、`alt`=⌥、`ctrl`=⌃；空格分隔的是先后按下的组合键，例如 `cmd+y cmd+t`，不是同时按下所有键；`[Backslash]` 为原文件中的物理键表示。`—` 表示本条未写 `when`，仍受其它快捷键及命令上下文影响。

命令前缀 `-` 表示移除匹配的默认/扩展快捷键规则，不是执行命令，也不是全局禁用该键。VSCode 通常从后往前匹配适用绑定；取消绑定与用户新增绑定不是简单的“后写删除前写”。`when` 原样保留，`&&` 优先于 `||`。

| 序号 | 按键 | 类型 | 动作 | 原始 command | when |
| --- | --- | --- | --- | --- | --- |
| 1 | `alt+cmd+=` | 绑定 | 在终端运行 Python 文件 | `python.execInTerminal` | — |
| 2 | `alt+cmd+[Backslash]` | 绑定 | Code Runner 运行代码 | `code-runner.run` | — |
| 3 | `ctrl+alt+n` | 取消绑定 | Code Runner 运行代码 | `-code-runner.run` | — |
| 4 | `alt+cmd+-` | 绑定 | Code Runner 停止运行 | `code-runner.stop` | — |
| 5 | `ctrl+alt+m` | 取消绑定 | Code Runner 停止运行 | `-code-runner.stop` | — |
| 6 | `cmd+m` | 绑定 | 更改全部匹配项 | `editor.action.changeAll` | `editorTextFocus && editorTextFocus && !editorReadonly` |
| 7 | `cmd+f2` | 取消绑定 | 更改全部匹配项 | `-editor.action.changeAll` | `editorTextFocus && editorTextFocus && !editorReadonly` |
| 8 | `cmd+k` | 取消绑定 | 清空集成终端 | `-workbench.action.terminal.clear` | `terminalFocus && terminalProcessSupported` |
| 9 | `cmd+k left` | 取消绑定 | 视图左移 | `-views.moveViewLeft` | `focusedView != ''` |
| 10 | `cmd+k down` | 取消绑定 | 视图下移 | `-views.moveViewDown` | `focusedView != ''` |
| 11 | `cmd+l` | 取消绑定 | 扩展为整行选择 | `-expandLineSelection` | `textInputFocus` |
| 12 | `cmd+k right` | 取消绑定 | 视图右移 | `-views.moveViewRight` | `focusedView != ''` |
| 13 | `cmd+k up` | 取消绑定 | 视图上移 | `-views.moveViewUp` | `focusedView != ''` |
| 14 | `shift+alt+x` | 绑定 | 折叠资源管理器文件夹 | `workbench.files.action.collapseExplorerFolders` | — |
| 15 | `cmd+k up` | 取消绑定 | 活动编辑器组上移 | `-workbench.action.moveActiveEditorGroupUp` | — |
| 16 | `cmd+k down` | 取消绑定 | 活动编辑器组下移 | `-workbench.action.moveActiveEditorGroupDown` | — |
| 17 | `cmd+k right` | 取消绑定 | 活动编辑器组右移 | `-workbench.action.moveActiveEditorGroupRight` | — |
| 18 | `cmd+k left` | 取消绑定 | 活动编辑器组左移 | `-workbench.action.moveActiveEditorGroupLeft` | — |
| 19 | `cmd+k` | 绑定 | 清空集成终端 | `workbench.action.terminal.clear` | `terminalFocus && terminalHasBeenCreated &#124;&#124; terminalFocus && terminalProcessSupported` |
| 20 | `cmd+k` | 取消绑定 | 清空集成终端 | `-workbench.action.terminal.clear` | `terminalFocus && terminalHasBeenCreated &#124;&#124; terminalFocus && terminalProcessSupported` |
| 21 | `cmd+[` | 取消绑定 | 减少行缩进 | `-editor.action.outdentLines` | `editorTextFocus && !editorReadonly` |
| 22 | `cmd+]` | 取消绑定 | 增加行缩进 | `-editor.action.indentLines` | `editorTextFocus && !editorReadonly` |
| 23 | `ctrl+tab` | 绑定 | 切换下一编辑器 | `workbench.action.nextEditor` | — |
| 24 | `alt+cmd+right` | 取消绑定 | 切换下一编辑器 | `-workbench.action.nextEditor` | — |
| 25 | `ctrl+shift+tab` | 绑定 | 切换上一编辑器 | `workbench.action.previousEditor` | — |
| 26 | `alt+cmd+left` | 取消绑定 | 切换上一编辑器 | `-workbench.action.previousEditor` | — |
| 27 | `cmd+y cmd+t` | 绑定 | Volar 拆分编辑器 | `volar.action.splitEditors` | — |
| 28 | `cmd+[ cmd+]` | 绑定 | 切换活动栏显示 | `workbench.action.toggleActivityBarVisibility` | — |
| 29 | `ctrl+cmd+enter` | 绑定 | LeetCode 提交解答 | `leetcode.submitSolution` | — |
| 30 | `cmd+u` | 绑定 | 选择上一建议 | `selectPrevSuggestion` | `suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus &#124;&#124; suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion` |
| 31 | `ctrl+p` | 取消绑定 | 选择上一建议 | `-selectPrevSuggestion` | `suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus &#124;&#124; suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion` |
| 32 | `cmd+n` | 绑定 | 选择下一建议 | `selectNextSuggestion` | `suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus &#124;&#124; suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion` |
| 33 | `ctrl+n` | 取消绑定 | 选择下一建议 | `-selectNextSuggestion` | `suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus &#124;&#124; suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion` |
| 34 | `cmd+n` | 取消绑定 | 新建无标题文件 | `-workbench.action.files.newUntitledFile` | — |
| 35 | `down` | 绑定 | 选择下一代码操作 | `selectNextCodeAction` | `codeActionMenuVisible` |
| 36 | `cmd+down` | 取消绑定 | 选择下一代码操作 | `-selectNextCodeAction` | `codeActionMenuVisible` |
| 37 | `ctrl+n` | 取消绑定 | 选择下一代码操作 | `-selectNextCodeAction` | `codeActionMenuVisible` |
| 38 | `down` | 取消绑定 | 选择下一代码操作 | `-selectNextCodeAction` | `codeActionMenuVisible` |
| 39 | `cmd+down` | 取消绑定 | 选择下一建议 | `-selectNextSuggestion` | `suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus &#124;&#124; suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion` |
| 40 | `cmd+up` | 取消绑定 | 选择上一建议 | `-selectPrevSuggestion` | `suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus &#124;&#124; suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion` |
| 41 | `shift+alt+l` | 绑定 | 注释全部日志 | `turboConsoleLog.commentAllLogMessages` | — |
| 42 | `shift+alt+c` | 取消绑定 | 注释全部日志 | `-turboConsoleLog.commentAllLogMessages` | — |
| 43 | `shift+cmd+c` | 取消绑定 | 打开外部终端 | `-workbench.action.terminal.openNativeConsole` | `!terminalFocus` |
| 44 | `cmd+e` | 绑定 | 聚焦侧栏 | `workbench.action.focusSideBar` | `!sideBarFocus` |
| 45 | `cmd+e` | 绑定 | 聚焦活动编辑器组 | `workbench.action.focusActiveEditorGroup` | `sideBarFocus` |
| 46 | `cmd+e` | 取消绑定 | 快速打开 | `-workbench.action.quickOpen` | — |
| 47 | `alt+e` | 绑定 | 聚焦侧栏 | `workbench.action.focusSideBar` | `!sideBarFocus` |
| 48 | `alt+e` | 绑定 | 聚焦活动编辑器组 | `workbench.action.focusActiveEditorGroup` | `sideBarFocus` |
| 49 | `n` | 绑定 | 新建文件 | `explorer.newFile` | `explorerViewletVisible && filesExplorerFocus && !inputFocus` |
| 50 | `r` | 绑定 | 重命名文件 | `renameFile` | `explorerViewletVisible && filesExplorerFocus && !inputFocus` |
| 51 | `a` | 绑定 | 新建文件夹 | `explorer.newFolder` | `explorerViewletVisible && filesExplorerFocus && !inputFocus` |
| 52 | `shift+r` | 绑定 | 重命名文件 | `renameFile` | `explorerViewletVisible && filesExplorerFocus && !inputFocus` |
| 53 | `d` | 绑定 | 删除文件 | `deleteFile` | `explorerViewletVisible && filesExplorerFocus && !inputFocus` |
| 54 | `x` | 绑定 | 在系统文件管理器显示 | `revealFileInOS` | `explorerViewletVisible && filesExplorerFocus && !inputFocus` |
| 55 | `o` | 绑定 | 选择/打开列表项 | `list.select` | `explorerViewletVisible && filesExplorerFocus && !inputFocus` |
| 56 | `ctrl+w` | 取消绑定 | Vim Ctrl+W 窗口操作前缀 | `-extension.vim_ctrl+w` | `editorTextFocus && vim.active && vim.use<C-w> && !inDebugRepl` |
| 57 | `ctrl+shift+c` | 绑定 | 聚焦源代码管理 | `workbench.scm.focus` | — |

### 覆盖与潜在冲突

- `cmd+e` 与 `alt+e` 均按 `sideBarFocus` 在侧栏和活动编辑器之间切换；`cmd+e` 原快速打开绑定被移除。
- `cmd+n` 在建议列表上下文选择下一项，原新建无标题文件被取消；`cmd+u` 在相同上下文选择上一项，其它上下文的默认行为不由本文件完整描述。`ctrl+p` / `ctrl+n` 及 `cmd+up` / `cmd+down` 的部分建议导航绑定被移除。
- `ctrl+tab` / `ctrl+shift+tab` 改为依编辑器顺序前后切换，而非依赖默认最近使用列表行为；`alt+cmd+right` / `alt+cmd+left` 对应规则被取消。
- `cmd+k` 清屏在文件中同时出现新增和两条取消规则；取消条目主要移除匹配的默认规则，不能直接认定新增用户清屏失效。`cmd+k` 也是组合键前缀，相关视图/编辑器组方向移动默认绑定均被移除，最终冲突需在快捷键故障排查界面确认。
- `down` 的下一代码操作同样同时有新增与取消规则；不能将取消条目误读成删除前面的用户绑定。
- `cmd+[` / `cmd+]` 默认缩进操作被取消，同时存在 `cmd+[ cmd+]` 切换活动栏组合键。`cmd+m` 自定义为更改全部匹配项，可能替代 macOS 常用的最小化行为。
- 资源管理器的单键操作均要求文件树可见、文件树获焦且不在输入框；因此输入文件名时不会由这些规则触发 `n/r/a/d/x/o` 操作。`r` 与 `shift+r` 都执行重命名。
- `ctrl+w` 取消的是 VSCodeVim 注册的窗口操作键，不意味着所有编辑器上下文的 Ctrl+W 行为都被禁用。

## settings.json 中的 Vim 映射

以下 `before`/`after` 均保留为数组，表示按键序列；`commands` 按数组顺序执行。`NonRecursive` 表示不递归重映射；普通模式递归映射数组为空。表中含重复键的原始条目，以免掩盖冲突。

| 模式 / 配置数组 | 输入 before | 输出类型 | 完整动作链 |
| --- | --- | --- | --- |
| Insert（递归） | `["j", "k"]` | after | `["<Esc>"]` |
| Normal（非递归） | `["<C-n>"]` | commands | `[":nohl"]` |
| Normal（非递归） | `["H"]` | after | `["^"]` |
| Normal（非递归） | `["L"]` | after | `["$"]` |
| Normal（非递归） | `["f"]` | after | `["\\"]` |
| Normal（非递归） | `["f"]` | after | `["<leader>", "<leader>", "s"]` |
| Normal（非递归） | `["n", "n"]` | commands | `["workbench.action.focusSideBar"]` |
| Normal（非递归） | `["q", "q"]` | commands | `["editor.action.formatDocument"]` |
| Normal（非递归） | `["[", "e"]` | commands | `["editor.action.marker.prev"]` |
| Normal（非递归） | `["]", "e"]` | commands | `["editor.action.marker.next"]` |
| Normal（非递归） | `["[", "d"]` | commands | `["editor.action.marker.prev"]` |
| Normal（非递归） | `["]", "d"]` | commands | `["editor.action.marker.next"]` |
| Normal（非递归） | `["[", "D"]` | commands | `["editor.action.marker.first"]` |
| Normal（非递归） | `["]", "D"]` | commands | `["editor.action.marker.last"]` |
| Visual（非递归） | `["H"]` | after | `["^"]` |
| Visual（非递归） | `["L"]` | after | `["$"]` |
| Visual（非递归） | `["S"]` | after | `[""]` |
| Visual（非递归） | `["j", "k"]` | after | `["<Esc>"]` |
| Visual（非递归） | `["c", "o", "s"]` | commands | `["editor.action.transformToSnakecase"]` |
| Visual（非递归） | `["c", "o", "c"]` | commands | `["editor.action.transformToCamelcase"]` |
| Visual（非递归） | `["c", "o", "k"]` | commands | `["editor.action.transformToKebabcase"]` |

### Vim 动作说明与重复映射

- Insert 的 `jk` 退出至普通模式；Visual 的 `jk` 退出选择。`H` → `^`（首个非空白字符），`L` → `$`（行尾）。
- Normal：`Ctrl+N` 执行 `:nohl` 清除搜索高亮；`nn` 聚焦侧栏；`qq` 格式化整个文档。`[e` / `[d` 调上一诊断，`]e` / `]d` 调下一诊断，`[D` / `]D` 调首个/末个诊断。
- Normal 的 `f` 定义了两次：先映射为反斜杠，再映射为 `<leader><leader>s`（空格、空格、s），意图触发 EasyMotion 搜索。它们不能作为两个独立 `f` 功能同时使用；最终保留哪条取决于当前 VSCodeVim 的重复键注册实现，本文未实测，不将其静默合并。原生 `f` 行内查找也因此存在被覆盖的风险。
- Visual：`cos` 转 snake_case，`coc` 转 camelCase，`cok` 转 kebab-case。`S` 的 after 是单个空字符串 `[""]`，不是空数组或明确命令；不要把它当作已验证的“禁用 S”，其具体效果需运行验证。
- `vim.handleKeys` 将 `<C-a>`、`<C-b>`、`<C-d>`、`<C-f>`、`<C-j>`、`<C->`、`<C-p>`、`<C-v>`、`<C-z>`、`b`、`m` 设为 false，意图交还 VSCode 处理；`<C->` 形式可疑，单字母 `b/m` 的接管效果也依赖扩展支持，不能据此认定原生 Vim 动作必然关闭。
- `vim.useCtrlKeys=true` 与上述局部 false 配合使用，并非接管所有 Ctrl 快捷键。未配置专门的 operator-pending、replace 或命令行模式用户映射，不能据此推断这些模式没有扩展默认键。

## 完整 settings.json

下面保留全部有效设置键，包括 Vim 映射及文件嵌套字符串，仅将 `oxc.path.oxfmt` 的个人主目录替换为 `~`；复制前需改成实际绝对路径，因此这不是逐字还原本机文件的备份。其余部分去掉注释和尾逗号，可作为完整 JSONC 文件。嵌套匹配中的 `.bak` 是有效文件名规则，不代表读取了备份。语言专属设置对相应语言有覆盖意义；未显式写入的默认值不在这里。

```jsonc
{
  "window.zoomLevel": 0.8,
  "editor.accessibilitySupport": "on",
  "editor.cursorSmoothCaretAnimation": "on",
  "workbench.secondarySideBar.defaultVisibility": "hidden",
  "editor.cursorSurroundingLines": 50,
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "oxc.path.oxfmt": "~/.local/share/mise/shims/oxfmt",
  "editor.fontFamily": "FiraCode Nerd Font, 霞鹜文楷 GB",
  "terminal.integrated.fontSize": 16,
  "editor.fontLigatures": true,
  "editor.fontSize": 16,
  "chat.fontSize": 8,
  "editor.fontWeight": "400",
  "editor.inlineSuggest.enabled": false,
  "editor.lineHeight": 1.5,
  "editor.lineNumbers": "relative",
  "editor.smoothScrolling": true,
  "editor.tabSize": 2,
  "editor.minimap.side": "right",
  "editor.minimap.autohide": "mouseover",
  "terminal.integrated.defaultProfile.windows": "Git Bash",
  "terminal.integrated.fontFamily": "FiraCode Nerd Font",
  "terminal.integrated.smoothScrolling": true,
  "explorer.autoReveal": "focusNoScroll",
  "workbench.tree.indent": 18,
  "workbench.tree.renderIndentGuides": "none",
  "security.workspace.trust.untrustedFiles": "open",
  "window.commandCenter": false,
  "window.density.editorTabHeight": "default",
  "window.titleBarStyle": "custom",
  "workbench.activityBar.location": "top",
  "workbench.editor.tabSizingFixedMaxWidth": 80,
  "workbench.iconTheme": "material-icon-theme",
  "workbench.layoutControl.enabled": false,
  "workbench.list.smoothScrolling": true,
  "workbench.fontAliasing": "default",
  "workbench.navigationControl.enabled": false,
  "workbench.statusBar.visible": true,
  "[javascript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[markdown]": {
    "diffEditor.ignoreTrimWhitespace": false,
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "oxc.oxc-vscode"
  },
  "vim.easymotion": true,
  "vim.easymotionJumpToAnywhereRegex": "\\b[A-Za-z0-9]|[A-Za-z0-9]\\b|_.|#.|[a-z][A-Z]",
  "vim.foldfix": true,
  "vim.handleKeys": {
    "<C-a>": false,
    "<C-b>": false,
    "<C-d>": false,
    "<C-f>": false,
    "<C-j>": false,
    "<C->": false,
    "<C-p>": false,
    "<C-v>": false,
    "<C-z>": false,
    "b": false,
    "m": false
  },
  "vim.hlsearch": true,
  "vim.incsearch": true,
  "vim.insertModeKeyBindings": [
    {
      "before": [
        "j",
        "k"
      ],
      "after": [
        "<Esc>"
      ]
    }
  ],
  "vim.leader": "<space>",
  "vim.normalModeKeyBindings": [],
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": [
        "<C-n>"
      ],
      "commands": [
        ":nohl"
      ]
    },
    {
      "before": [
        "H"
      ],
      "after": [
        "^"
      ]
    },
    {
      "before": [
        "L"
      ],
      "after": [
        "$"
      ]
    },
    {
      "before": [
        "f"
      ],
      "after": [
        "\\"
      ]
    },
    {
      "before": [
        "f"
      ],
      "after": [
        "<leader>",
        "<leader>",
        "s"
      ]
    },
    {
      "before": [
        "n",
        "n"
      ],
      "commands": [
        "workbench.action.focusSideBar"
      ]
    },
    {
      "before": [
        "q",
        "q"
      ],
      "commands": [
        "editor.action.formatDocument"
      ]
    },
    {
      "before": [
        "[",
        "e"
      ],
      "commands": [
        "editor.action.marker.prev"
      ]
    },
    {
      "before": [
        "]",
        "e"
      ],
      "commands": [
        "editor.action.marker.next"
      ]
    },
    {
      "before": [
        "[",
        "d"
      ],
      "commands": [
        "editor.action.marker.prev"
      ]
    },
    {
      "before": [
        "]",
        "d"
      ],
      "commands": [
        "editor.action.marker.next"
      ]
    },
    {
      "before": [
        "[",
        "D"
      ],
      "commands": [
        "editor.action.marker.first"
      ]
    },
    {
      "before": [
        "]",
        "D"
      ],
      "commands": [
        "editor.action.marker.last"
      ]
    }
  ],
  "vim.sneak": false,
  "vim.surround": true,
  "vim.useCtrlKeys": true,
  "vim.useSystemClipboard": true,
  "vim.visualModeKeyBindingsNonRecursive": [
    {
      "before": [
        "H"
      ],
      "after": [
        "^"
      ]
    },
    {
      "before": [
        "L"
      ],
      "after": [
        "$"
      ]
    },
    {
      "before": [
        "S"
      ],
      "after": [
        ""
      ]
    },
    {
      "before": [
        "j",
        "k"
      ],
      "after": [
        "<Esc>"
      ]
    },
    {
      "before": [
        "c",
        "o",
        "s"
      ],
      "commands": [
        "editor.action.transformToSnakecase"
      ]
    },
    {
      "before": [
        "c",
        "o",
        "c"
      ],
      "commands": [
        "editor.action.transformToCamelcase"
      ]
    },
    {
      "before": [
        "c",
        "o",
        "k"
      ],
      "commands": [
        "editor.action.transformToKebabcase"
      ]
    }
  ],
  "explorer.sortOrder": "type",
  "explorer.sortOrderReverse": true,
  "explorer.openEditors.sortOrder": "fullPath",
  "explorer.compactFolders": false,
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.expand": false,
  "explorer.fileNesting.patterns": {
    ".clang-tidy": ".clang-format, .clangd, compile_commands.json",
    ".env": "*.env, .env.*, .envrc, env.d.ts",
    ".gitignore": ".gitattributes, .gitmodules, .gitmessage, .lfsconfig, .mailmap, .git-blame*",
    ".project": ".classpath",
    "+layout.svelte": "+layout.ts,+layout.ts,+layout.js,+layout.server.ts,+layout.server.js,+layout.gql",
    "+page.svelte": "+page.server.ts,+page.server.js,+page.ts,+page.js,+page.gql",
    "ansible.cfg": "ansible.cfg, .ansible-lint, requirements.yml",
    "app.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, react-router.config.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "application.properties": "*.properties",
    "artisan": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, react-router.config.*, rspack.config.*, server.php, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, webpack.mix.js, windi.config.*",
    "astro.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, react-router.config.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "build-wrapper.log": "build-wrapper*.log, build-wrapper-dump*.json, build-wrapper-win*.exe, build-wrapper-linux*, build-wrapper-macosx*",
    "BUILD.bazel": "*.bzl, *.bazel, *.bazelrc, bazel.rc, .bazelignore, .bazelproject, .bazelversion, MODULE.bazel.lock, WORKSPACE",
    "Cargo.toml": ".clippy.toml, .rustfmt.toml, Cargo.Bazel.lock, Cargo.lock, clippy.toml, cross.toml, insta.yaml, rust-toolchain.toml, rustfmt.toml",
    "CMakeLists.txt": "*.cmake, *.cmake.in, .cmake-format.yaml, CMakePresets.json, CMakeCache.txt",
    "composer.json": ".php*.cache, composer.lock, phpunit.xml*, psalm*.xml",
    "default.nix": "shell.nix",
    "deno.json*": "*.env, .env.*, .envrc, api-extractor.json, deno.lock, env.d.ts, import-map.json, import_map.json, jsconfig.*, tsconfig.*, tsdoc.*",
    "Dockerfile": "*.dockerfile, .devcontainer.*, .dockerignore, captain-definition, compose.*, docker-compose.*, dockerfile*",
    "flake.nix": "flake.lock",
    "gatsby-config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, gatsby-browser.*, gatsby-node.*, gatsby-ssr.*, gatsby-transformer.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, react-router.config.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "gemfile": ".ruby-version, gemfile.lock",
    "go.mod": ".air*, go.sum",
    "go.work": "go.work.sum",
    "hatch.toml": ".editorconfig, .flake8, .isort.cfg, .python-version, hatch.toml, requirements*.in, requirements*.pip, requirements*.txt, tox.ini",
    "I*.cs": "$(capture).cs",
    "Makefile": "*.mk",
    "mix.exs": ".credo.exs, .dialyzer_ignore.exs, .formatter.exs, .iex.exs, .tool-versions, mix.lock",
    "next.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, next-env.d.ts, next-i18next.config.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, react-router.config.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "nuxt.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .nuxtignore, .nuxtrc, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, quasar.extensions.json, react-router.config.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "package.json": "*.code-workspace, .browserslist*, .circleci*, .commitlint*, .cspell*, .cursor*, .cz-config.js, .czrc, .dlint.json, .dprint.json*, .editorconfig, .eslint*, .firebase*, .flowconfig, .github*, .gitlab*, .gitmojirc.json, .gitpod*, .huskyrc*, .jslint*, .knip.*, .lintstagedrc*, .ls-lint.yml, .markdownlint*, .node-version, .nodemon*, .npm*, .nvmrc, .oxlintrc.json, .oxlintrc.json.bak, .pm2*, .pnp.*, .pnpm*, .prettier*, .pylintrc, .release-please*.json, .releaserc*, .ruff.toml, .sentry*, .shellcheckrc, .simple-git-hooks*, .stackblitz*, .styleci*, .stylelint*, .tazerc*, .textlint*, .tool-versions, .travis*, .versionrc*, .vscode*, .watchman*, .windsurfrules, .xo-config*, .yamllint*, .yarnrc*, Procfile, apollo.config.*, appveyor*, azure-pipelines*, biome.json*, bower.json, build.config.*, bun.lock, bun.lockb, bunfig.toml, colada.options.ts, commitlint*, crowdin*, cspell*, dangerfile*, dlint.json, dprint.json*, ec.config.*, electron-builder.*, eslint*, firebase.json, grunt*, gulp*, jenkins*, knip.*, lerna*, lint-staged*, nest-cli.*, netlify*, nixpacks*, nodemon*, npm-shrinkwrap.json, nx.*, package-lock.json, package.nls*.json, phpcs.xml, pm2.*, pnpm*, prettier*, pullapprove*, pyrightconfig.json, release-please*.json, release-tasks.sh, release.config.*, renovate*, rolldown.config.*, rollup.config.*, rspack*, ruff.toml, sentry.*.config.ts, simple-git-hooks*, sonar-project.properties, stylelint*, tsdown.config.*, tslint*, tsup.config.*, turbo*, typedoc*, unlighthouse*, vercel*, vetur.config.*, webpack*, workspace.json, wrangler.*, xo.config.*, yarn*",
    "Pipfile": ".editorconfig, .flake8, .isort.cfg, .python-version, Pipfile, Pipfile.lock, requirements*.in, requirements*.pip, requirements*.txt, tox.ini",
    "pom.xml": "mvnw*",
    "pubspec.yaml": ".metadata, .packages, all_lint_rules.yaml, analysis_options.yaml, build.yaml, pubspec.lock, pubspec_overrides.yaml",
    "pyproject.toml": ".commitlint*, .cspell*, .dlint.json, .dprint.json*, .editorconfig, .eslint*, .flake8, .flowconfig, .isort.cfg, .jslint*, .lintstagedrc*, .ls-lint.yml, .markdownlint*, .oxlintrc.json, .oxlintrc.json.bak, .pdm-python, .pdm.toml, .prettier*, .pylintrc, .python-version, .ruff.toml, .shellcheckrc, .stylelint*, .textlint*, .xo-config*, .yamllint*, MANIFEST.in, Pipfile, Pipfile.lock, biome.json*, commitlint*, cspell*, dangerfile*, dlint.json, dprint.json*, eslint*, hatch.toml, lint-staged*, pdm.lock, phpcs.xml, poetry.lock, poetry.toml, prettier*, pyproject.toml, pyrightconfig.json, requirements*.in, requirements*.pip, requirements*.txt, ruff.toml, setup.cfg, setup.py, stylelint*, tox.ini, tslint*, uv.lock, uv.toml, xo.config.*",
    "quasar.conf.js": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, quasar.extensions.json, react-router.config.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "readme*": "AUTHORS, Authors, BACKERS*, Backers*, CHANGELOG*, CITATION*, CODEOWNERS, CODE_OF_CONDUCT*, CONTRIBUTING*, CONTRIBUTORS, COPYING*, CREDITS, Changelog*, Citation*, Code_Of_Conduct*, Codeowners, Contributing*, Contributors, Copying*, Credits, GOVERNANCE.MD, Governance.md, HISTORY.MD, History.md, LICENSE*, License*, MAINTAINERS, Maintainers, README-*, README_*, RELEASE_NOTES*, ROADMAP.MD, Readme-*, Readme_*, Release_Notes*, Roadmap.md, SECURITY.MD, SPONSORS*, Security.md, Sponsors*, authors, backers*, changelog*, citation*, code_of_conduct*, codeowners, contributing*, contributors, copying*, credits, governance.md, history.md, license*, maintainers, readme-*, readme_*, release_notes*, roadmap.md, security.md, sponsors*",
    "Readme*": "AUTHORS, Authors, BACKERS*, Backers*, CHANGELOG*, CITATION*, CODEOWNERS, CODE_OF_CONDUCT*, CONTRIBUTING*, CONTRIBUTORS, COPYING*, CREDITS, Changelog*, Citation*, Code_Of_Conduct*, Codeowners, Contributing*, Contributors, Copying*, Credits, GOVERNANCE.MD, Governance.md, HISTORY.MD, History.md, LICENSE*, License*, MAINTAINERS, Maintainers, README-*, README_*, RELEASE_NOTES*, ROADMAP.MD, Readme-*, Readme_*, Release_Notes*, Roadmap.md, SECURITY.MD, SPONSORS*, Security.md, Sponsors*, authors, backers*, changelog*, citation*, code_of_conduct*, codeowners, contributing*, contributors, copying*, credits, governance.md, history.md, license*, maintainers, readme-*, readme_*, release_notes*, roadmap.md, security.md, sponsors*",
    "README*": "AUTHORS, Authors, BACKERS*, Backers*, CHANGELOG*, CITATION*, CODEOWNERS, CODE_OF_CONDUCT*, CONTRIBUTING*, CONTRIBUTORS, COPYING*, CREDITS, Changelog*, Citation*, Code_Of_Conduct*, Codeowners, Contributing*, Contributors, Copying*, Credits, GOVERNANCE.MD, Governance.md, HISTORY.MD, History.md, LICENSE*, License*, MAINTAINERS, Maintainers, README-*, README_*, RELEASE_NOTES*, ROADMAP.MD, Readme-*, Readme_*, Release_Notes*, Roadmap.md, SECURITY.MD, SPONSORS*, Security.md, Sponsors*, authors, backers*, changelog*, citation*, code_of_conduct*, codeowners, contributing*, contributors, copying*, credits, governance.md, history.md, license*, maintainers, readme-*, readme_*, release_notes*, roadmap.md, security.md, sponsors*",
    "remix.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, react-router.config.*, remix.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "requirements.txt": ".editorconfig, .flake8, .isort.cfg, .python-version, requirements*.in, requirements*.pip, requirements*.txt, tox.ini",
    "rush.json": "*.code-workspace, .browserslist*, .circleci*, .commitlint*, .cspell*, .cursor*, .cz-config.js, .czrc, .dlint.json, .dprint.json*, .editorconfig, .eslint*, .firebase*, .flowconfig, .github*, .gitlab*, .gitmojirc.json, .gitpod*, .huskyrc*, .jslint*, .knip.*, .lintstagedrc*, .ls-lint.yml, .markdownlint*, .node-version, .nodemon*, .npm*, .nvmrc, .oxlintrc.json, .oxlintrc.json.bak, .pm2*, .pnp.*, .pnpm*, .prettier*, .pylintrc, .release-please*.json, .releaserc*, .ruff.toml, .sentry*, .shellcheckrc, .simple-git-hooks*, .stackblitz*, .styleci*, .stylelint*, .tazerc*, .textlint*, .tool-versions, .travis*, .versionrc*, .vscode*, .watchman*, .windsurfrules, .xo-config*, .yamllint*, .yarnrc*, Procfile, apollo.config.*, appveyor*, azure-pipelines*, biome.json*, bower.json, build.config.*, bun.lock, bun.lockb, bunfig.toml, colada.options.ts, commitlint*, crowdin*, cspell*, dangerfile*, dlint.json, dprint.json*, ec.config.*, electron-builder.*, eslint*, firebase.json, grunt*, gulp*, jenkins*, knip.*, lerna*, lint-staged*, nest-cli.*, netlify*, nixpacks*, nodemon*, npm-shrinkwrap.json, nx.*, package-lock.json, package.nls*.json, phpcs.xml, pm2.*, pnpm*, prettier*, pullapprove*, pyrightconfig.json, release-please*.json, release-tasks.sh, release.config.*, renovate*, rolldown.config.*, rollup.config.*, rspack*, ruff.toml, sentry.*.config.ts, simple-git-hooks*, sonar-project.properties, stylelint*, tsdown.config.*, tslint*, tsup.config.*, turbo*, typedoc*, unlighthouse*, vercel*, vetur.config.*, webpack*, workspace.json, wrangler.*, xo.config.*, yarn*",
    "sanity.config.*": "sanity.cli.*, sanity.types.ts, schema.json",
    "setup.cfg": ".editorconfig, .flake8, .isort.cfg, .python-version, MANIFEST.in, requirements*.in, requirements*.pip, requirements*.txt, setup.cfg, tox.ini",
    "setup.py": ".editorconfig, .flake8, .isort.cfg, .python-version, MANIFEST.in, requirements*.in, requirements*.pip, requirements*.txt, setup.cfg, setup.py, tox.ini",
    "shims.d.ts": "*.d.ts",
    "svelte.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, houdini.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, mdsvex.config.js, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, react-router.config.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vite.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "vite.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, react-router.config.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "vue.config.*": "*.env, .babelrc*, .codecov, .cssnanorc*, .env.*, .envrc, .htmlnanorc*, .lighthouserc.*, .mocha*, .postcssrc*, .terserrc*, api-extractor.json, ava.config.*, babel.config.*, capacitor.config.*, content.config.*, contentlayer.config.*, cssnano.config.*, cypress.*, env.d.ts, formkit.config.*, formulate.config.*, histoire.config.*, htmlnanorc.*, i18n.config.*, ionic.config.*, jasmine.*, jest.config.*, jsconfig.*, karma*, lighthouserc.*, panda.config.*, playwright.config.*, postcss.config.*, puppeteer.config.*, react-router.config.*, rspack.config.*, sst.config.*, svgo.config.*, tailwind.config.*, tsconfig.*, tsdoc.*, uno.config.*, unocss.config.*, vitest.config.*, vuetify.config.*, webpack.config.*, windi.config.*",
    "*.asax": "$(capture).*.cs, $(capture).*.vb",
    "*.ascx": "$(capture).*.cs, $(capture).*.vb",
    "*.ashx": "$(capture).*.cs, $(capture).*.vb",
    "*.aspx": "$(capture).*.cs, $(capture).*.vb",
    "*.axaml": "$(capture).axaml.cs",
    "*.bloc.dart": "$(capture).event.dart, $(capture).state.dart",
    "*.c": "$(capture).h",
    "*.cc": "$(capture).hpp, $(capture).h, $(capture).hxx, $(capture).hh",
    "*.cjs": "$(capture).cjs.map, $(capture).*.cjs, $(capture)_*.cjs",
    "*.component.ts": "$(capture).component.html, $(capture).component.spec.ts, $(capture).component.css, $(capture).component.scss, $(capture).component.sass, $(capture).component.less",
    "*.cpp": "$(capture).hpp, $(capture).h, $(capture).hxx, $(capture).hh",
    "*.cs": "$(capture).*.cs",
    "*.cshtml": "$(capture).cshtml.cs, $(capture).cshtml.css",
    "*.csproj": "*.config, *proj.user, appsettings.*, bundleconfig.json",
    "*.css": "$(capture).css.map, $(capture).*.css",
    "*.cxx": "$(capture).hpp, $(capture).h, $(capture).hxx, $(capture).hh",
    "*.dart": "$(capture).freezed.dart, $(capture).g.dart",
    "*.db": "*.db-shm, *.db-wal",
    "*.ex": "$(capture).html.eex, $(capture).html.heex, $(capture).html.leex",
    "*.fs": "$(capture).fs.js, $(capture).fs.js.map, $(capture).fs.jsx, $(capture).fs.ts, $(capture).fs.tsx, $(capture).fs.rs, $(capture).fs.php, $(capture).fs.dart",
    "*.gd": "$(capture).gd.uid",
    "*.go": "$(capture)_test.go",
    "*.java": "$(capture).class",
    "*.js": "$(capture).js.map, $(capture).*.js, $(capture)_*.js, $(capture).d.ts, $(capture).d.ts.map, $(capture).js.flow",
    "*.jsx": "$(capture).js, $(capture).*.jsx, $(capture)_*.js, $(capture)_*.jsx, $(capture).css, $(capture).module.css, $(capture).less, $(capture).module.less, $(capture).module.less.d.ts, $(capture).scss, $(capture).module.scss, $(capture).module.scss.d.ts",
    "*.master": "$(capture).*.cs, $(capture).*.vb",
    "*.md": "$(capture).*",
    "*.mjs": "$(capture).mjs.map, $(capture).*.mjs, $(capture)_*.mjs",
    "*.module.ts": "$(capture).resolver.ts, $(capture).controller.ts, $(capture).service.ts",
    "*.mts": "$(capture).mts.map, $(capture).*.mts, $(capture)_*.mts",
    "*.proto": "$(capture).pb.go, $(capture).pb.micro.go",
    "*.pubxml": "$(capture).pubxml.user",
    "*.py": "$(capture).pyi",
    "*.razor": "$(capture).razor.cs, $(capture).razor.css, $(capture).razor.scss",
    "*.resx": "$(capture).*.resx, $(capture).designer.cs, $(capture).designer.vb",
    "*.tex": "$(capture).acn, $(capture).acr, $(capture).alg, $(capture).aux, $(capture).bbl, $(capture).bbl-SAVE-ERROR, $(capture).bcf, $(capture).bib, $(capture).blg, $(capture).fdb_latexmk, $(capture).fls, $(capture).glg, $(capture).glo, $(capture).gls, $(capture).idx, $(capture).ind, $(capture).ist, $(capture).lof, $(capture).log, $(capture).lot, $(capture).nav, $(capture).out, $(capture).run.xml, $(capture).snm, $(capture).synctex.gz, $(capture).toc, $(capture).xdv",
    "*.ts": "$(capture).js, $(capture).d.ts.map, $(capture).*.ts, $(capture)_*.js, $(capture)_*.ts",
    "*.tsx": "$(capture).ts, $(capture).*.tsx, $(capture)_*.ts, $(capture)_*.tsx, $(capture).css, $(capture).module.css, $(capture).less, $(capture).module.less, $(capture).module.less.d.ts, $(capture).scss, $(capture).module.scss, $(capture).module.scss.d.ts, $(capture).css.ts",
    "*.vbproj": "*.config, *proj.user, appsettings.*, bundleconfig.json",
    "*.vue": "$(capture).*.ts, $(capture).*.js, $(capture).story.vue",
    "*.w": "$(capture).*.w, I$(capture).w",
    "*.wat": "$(capture).wasm",
    "*.xaml": "$(capture).xaml.cs"
  },
  "terminal.external.osxExec": "Warp.app",
  "extensions.ignoreRecommendations": true,
  "terminal.integrated.tabs.location": "left",
  "files.associations": {
    "*.uvue": "uvue",
    "*.vue": "vue"
  },
  "workbench.editor.empty.hint": "hidden",
  "diffEditor.ignoreTrimWhitespace": false,
  "chat.viewSessions.enabled": false,
  "chat.contextUsage.enabled": false,
  "workbench.activityBar.autoHide": true,
  "woodfishTheme.overlay.enabled": false,
  "woodfishTheme.glass.enabled": false,
  "woodfishTheme.glow.enabled": false,
  "woodfishTheme.cursor.glow": false,
  "workbench.colorTheme": "Hyper Term Black"
}
```

## 完整 keybindings.json（可独立复制）

上节代码块整体对应 `settings.json`（其中工具路径需按说明修改），本节整体对应 `keybindings.json`。请分别复制到两个文件，不要合成一个 JSON。两段均保留全部有效配置；除已说明的工具路径外，没有敏感值占位符。复制会替换目标文件内容，请先保留自己的后续修改。

```jsonc
[
  {
    "key": "alt+cmd+=",
    "command": "python.execInTerminal"
  },
  {
    "key": "alt+cmd+[Backslash]",
    "command": "code-runner.run"
  },
  {
    "key": "ctrl+alt+n",
    "command": "-code-runner.run"
  },
  {
    "key": "alt+cmd+-",
    "command": "code-runner.stop"
  },
  {
    "key": "ctrl+alt+m",
    "command": "-code-runner.stop"
  },
  {
    "key": "cmd+m",
    "command": "editor.action.changeAll",
    "when": "editorTextFocus && editorTextFocus && !editorReadonly"
  },
  {
    "key": "cmd+f2",
    "command": "-editor.action.changeAll",
    "when": "editorTextFocus && editorTextFocus && !editorReadonly"
  },
  {
    "key": "cmd+k",
    "command": "-workbench.action.terminal.clear",
    "when": "terminalFocus && terminalProcessSupported"
  },
  {
    "key": "cmd+k left",
    "command": "-views.moveViewLeft",
    "when": "focusedView != ''"
  },
  {
    "key": "cmd+k down",
    "command": "-views.moveViewDown",
    "when": "focusedView != ''"
  },
  {
    "key": "cmd+l",
    "command": "-expandLineSelection",
    "when": "textInputFocus"
  },
  {
    "key": "cmd+k right",
    "command": "-views.moveViewRight",
    "when": "focusedView != ''"
  },
  {
    "key": "cmd+k up",
    "command": "-views.moveViewUp",
    "when": "focusedView != ''"
  },
  {
    "key": "shift+alt+x",
    "command": "workbench.files.action.collapseExplorerFolders"
  },
  {
    "key": "cmd+k up",
    "command": "-workbench.action.moveActiveEditorGroupUp"
  },
  {
    "key": "cmd+k down",
    "command": "-workbench.action.moveActiveEditorGroupDown"
  },
  {
    "key": "cmd+k right",
    "command": "-workbench.action.moveActiveEditorGroupRight"
  },
  {
    "key": "cmd+k left",
    "command": "-workbench.action.moveActiveEditorGroupLeft"
  },
  {
    "key": "cmd+k",
    "command": "workbench.action.terminal.clear",
    "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
  },
  {
    "key": "cmd+k",
    "command": "-workbench.action.terminal.clear",
    "when": "terminalFocus && terminalHasBeenCreated || terminalFocus && terminalProcessSupported"
  },
  {
    "key": "cmd+[",
    "command": "-editor.action.outdentLines",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "cmd+]",
    "command": "-editor.action.indentLines",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "ctrl+tab",
    "command": "workbench.action.nextEditor"
  },
  {
    "key": "alt+cmd+right",
    "command": "-workbench.action.nextEditor"
  },
  {
    "key": "ctrl+shift+tab",
    "command": "workbench.action.previousEditor"
  },
  {
    "key": "alt+cmd+left",
    "command": "-workbench.action.previousEditor"
  },
  {
    "key": "cmd+y cmd+t",
    "command": "volar.action.splitEditors"
  },
  {
    "key": "cmd+[ cmd+]",
    "command": "workbench.action.toggleActivityBarVisibility"
  },
  {
    "key": "ctrl+cmd+enter",
    "command": "leetcode.submitSolution"
  },
  {
    "key": "cmd+u",
    "command": "selectPrevSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus || suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion"
  },
  {
    "key": "ctrl+p",
    "command": "-selectPrevSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus || suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion"
  },
  {
    "key": "cmd+n",
    "command": "selectNextSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus || suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion"
  },
  {
    "key": "ctrl+n",
    "command": "-selectNextSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus || suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion"
  },
  {
    "key": "cmd+n",
    "command": "-workbench.action.files.newUntitledFile"
  },
  {
    "key": "down",
    "command": "selectNextCodeAction",
    "when": "codeActionMenuVisible"
  },
  {
    "key": "cmd+down",
    "command": "-selectNextCodeAction",
    "when": "codeActionMenuVisible"
  },
  {
    "key": "ctrl+n",
    "command": "-selectNextCodeAction",
    "when": "codeActionMenuVisible"
  },
  {
    "key": "down",
    "command": "-selectNextCodeAction",
    "when": "codeActionMenuVisible"
  },
  {
    "key": "cmd+down",
    "command": "-selectNextSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus || suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion"
  },
  {
    "key": "cmd+up",
    "command": "-selectPrevSuggestion",
    "when": "suggestWidgetMultipleSuggestions && suggestWidgetVisible && textInputFocus || suggestWidgetVisible && textInputFocus && !suggestWidgetHasFocusedSuggestion"
  },
  {
    "key": "shift+alt+l",
    "command": "turboConsoleLog.commentAllLogMessages"
  },
  {
    "key": "shift+alt+c",
    "command": "-turboConsoleLog.commentAllLogMessages"
  },
  {
    "key": "shift+cmd+c",
    "command": "-workbench.action.terminal.openNativeConsole",
    "when": "!terminalFocus"
  },
  {
    "key": "cmd+e",
    "command": "workbench.action.focusSideBar",
    "when": "!sideBarFocus"
  },
  {
    "key": "cmd+e",
    "command": "workbench.action.focusActiveEditorGroup",
    "when": "sideBarFocus"
  },
  {
    "key": "cmd+e",
    "command": "-workbench.action.quickOpen"
  },
  {
    "key": "alt+e",
    "command": "workbench.action.focusSideBar",
    "when": "!sideBarFocus"
  },
  {
    "key": "alt+e",
    "command": "workbench.action.focusActiveEditorGroup",
    "when": "sideBarFocus"
  },
  {
    "key": "n",
    "command": "explorer.newFile",
    "when": "explorerViewletVisible && filesExplorerFocus && !inputFocus"
  },
  {
    "key": "r",
    "command": "renameFile",
    "when": "explorerViewletVisible && filesExplorerFocus && !inputFocus"
  },
  {
    "key": "a",
    "command": "explorer.newFolder",
    "when": "explorerViewletVisible && filesExplorerFocus && !inputFocus"
  },
  {
    "key": "shift+r",
    "command": "renameFile",
    "when": "explorerViewletVisible && filesExplorerFocus && !inputFocus"
  },
  {
    "key": "d",
    "command": "deleteFile",
    "when": "explorerViewletVisible && filesExplorerFocus && !inputFocus"
  },
  {
    "key": "x",
    "command": "revealFileInOS",
    "when": "explorerViewletVisible && filesExplorerFocus && !inputFocus"
  },
  {
    "key": "o",
    "command": "list.select",
    "when": "explorerViewletVisible && filesExplorerFocus && !inputFocus"
  },
  {
    "key": "ctrl+w",
    "command": "-extension.vim_ctrl+w",
    "when": "editorTextFocus && vim.active && vim.use<C-w> && !inDebugRepl"
  },
  {
    "key": "ctrl+shift+c",
    "command": "workbench.scm.focus"
  }
]
```

<!-- lazynote:end -->
