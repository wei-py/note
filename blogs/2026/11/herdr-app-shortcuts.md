---
title: 我的 Herdr app 快捷键配置
created: 2026-11-13
updated: 2026-11-14
tags:
  - Herdr
  - 快捷键配置
  - 终端
  - 转义序列
  - herdr
  - terminal
  - keymap
  - config
summary: 我的 macOS Herdr app 快捷键配置，包含空间、标签页、窗格、Agent 导航和终端操作，文末附可直接复制的完整 keys.json。
cover: /assets/default-cover.jpg
lazynote_generated: true
lazynote_id: ed85b1fd-f07c-49ec-9925-4d46f8afccdf
date: 2026-11-14
source: herdr-app-shortcuts.md
---

<!-- lazynote:body -->
---
title: 我的 Herdr app 快捷键配置
created: 2026-11-13
updated: 2026-11-14
tags:
  - Herdr
  - 快捷键配置
  - 终端
  - 转义序列
  - herdr
  - terminal
  - keymap
  - config
summary: 我的 macOS Herdr app 快捷键配置，包含空间、标签页、窗格、Agent 导航和终端操作，文末附可直接复制的完整 keys.json。
cover: /assets/default-cover.jpg
---

# 我的 Herdr app 快捷键配置

这篇记录我在 macOS 上的 Herdr app 快捷键配置，方便以后查阅和迁移。前面按使用场景整理，最后放一份完整的 `keys.json`，需要时可以直接复制。

配置文件位于 `~/.config/herdr-app/keys.json`，修改后会实时生效，不需要重启应用。本文记录的是 2026-11-13 的配置，后续修改不会自动同步到文章。

符号：Cmd = ⌘，Ctrl = ⌃，Alt = Option / ⌥，Shift = ⇧。方向键用 ←、→、↑、↓ 表示。

## 空间（Space）

| 快捷键 | 功能 | 配置动作 |
|---|---|---|
| Cmd+Shift+T / Cmd+N | 新建空间 | `space.new` |
| Cmd+Alt+] / Cmd+Shift+2 | 下一个空间 | `space.next` |
| Cmd+Alt+[ / Cmd+Shift+1 | 上一个空间 | `space.prev` |
| Ctrl+1 … Ctrl+9 | 选择第 1 … 9 个空间 | `space.select:1` … `space.select:9` |
| Shift+F2 / Cmd+Shift+R | 重命名空间 | `space.rename` |
| Cmd+Shift+W | 关闭空间 | `space.close` |

## 标签页（Tab）

| 快捷键 | 功能 | 配置动作 |
|---|---|---|
| Cmd+T | 新建标签页 | `tab.new` |
| Ctrl+Tab | 调用标签页循环切换命令（下一项） | `cycle-tabs.next` |
| Ctrl+Shift+Tab | 调用标签页循环切换命令（上一项） | `cycle-tabs.prev` |
| Cmd+Shift+] | 下一个标签页 | `tab.next` |
| Cmd+Shift+[ | 上一个标签页 | `tab.prev` |
| Cmd+3 … Cmd+9 | 选择第 3 … 9 个标签页 | `tab.select:3` … `tab.select:9` |
| F2 / Cmd+R | 重命名标签页 | `tab.rename` |

这份配置没有绑定 Cmd+1、Cmd+2。`cycle-tabs.next` / `cycle-tabs.prev` 是 mod 命令，只有当前布局显示对应 mod 时才会生效；单独复制快捷键配置并不会安装这个 mod。

## 窗格（Pane）与 Agent

| 快捷键 | 功能 | 配置动作 |
|---|---|---|
| Cmd+W | 关闭当前窗格 | `pane.close` |
| Cmd+Shift+D | 向下分割窗格 | `pane.split:down` |
| Cmd+Shift+Enter | 切换窗格放大 / 还原 | `pane.zoom` |
| Cmd+Alt+← / → / ↑ / ↓ | 聚焦对应方向窗格 | `pane.go:left/right/up/down` |
| Cmd+Alt+Shift+← / → / ↑ / ↓ | 与对应方向窗格交换位置 | `pane.swap:left/right/up/down` |
| Cmd+] | 下一个 Agent | `agent.next` |
| Cmd+[ | 上一个 Agent | `agent.prev` |

注意：当前配置的 Cmd+D 不用于分割窗格，见下方终端快捷键。

## 界面与应用

| 快捷键 | 功能 | 配置动作 |
|---|---|---|
| Cmd+Shift+L | 循环切换布局 | `layout.switch` |
| Cmd+P | 打开 / 关闭 picker 面板 | `mod.open:picker` |
| Cmd+Shift+P | 打开命令面板 | `app.palette` |
| Cmd+, | 打开设置 | `app.settings` |
| Cmd+/ / Cmd+Shift+/ | 打开 / 关闭帮助 | `app.help` |
| Cmd+B | 显示 / 隐藏侧栏 | `layout.toggle:sidebar` |
| Cmd+= / Cmd++ | 放大应用界面 | `app.zoom_in` |
| Cmd+- | 缩小应用界面 | `app.zoom_out` |
| Cmd+0 | 重置应用缩放 | `app.zoom_reset` |
| Cmd+H | 隐藏 Herdr app | `app.hide` |
| Cmd+Alt+H | 隐藏其他应用 | `app.hide_others` |
| Cmd+Q | 退出 Herdr app | `app.quit` |

## 终端获得焦点时

`terminal` 区段比 `global` 区段优先。以下“常见含义”由终端内程序决定，不保证所有程序都采用相同解释。

| 快捷键 | 动作 / 常见含义 | 配置动作 |
|---|---|---|
| Cmd+D | 发送 F12 转义序列，不是分割窗格 | `send:\u001b[24~` |
| Cmd+C | 复制 | `terminal.copy` |
| Cmd+V | 粘贴文本或剪贴板文件 | `terminal.paste` |
| Ctrl+V | 粘贴剪贴板图片 | `terminal.paste_image` |
| Alt+← | 发送 Esc+b，常见为后退一个单词 | `send:\u001bb` |
| Alt+→ | 发送 Esc+f，常见为前进一个单词 | `send:\u001bf` |
| Alt+Backspace | 发送 Ctrl+W，常见为删除前一个单词 | `send:\u0017` |
| Cmd+← | 发送 Ctrl+A，常见为移到行首 | `send:\u0001` |
| Cmd+→ | 发送 Ctrl+E，常见为移到行尾 | `send:\u0005` |
| Cmd+Backspace | 发送 Ctrl+U，常见为删除到行首 | `send:\u0015` |

## 内置补充（不在 keys.json 中）

- **Ctrl+Alt+Shift+Escape**：不可重绑定的恢复快捷键。将当前布局与 `keys.json` 另存为带时间戳的 reset 文件，然后恢复默认 main 布局。
- **Cmd+F**：macOS 上打开当前终端的搜索栏；搜索框获得焦点时，Enter / Shift+Enter 跳转下一个 / 上一个匹配，Escape 关闭搜索栏。

这两个是 Herdr app 自带的行为，不需要放进下面的配置。

## 完整配置（可直接复制）

下面是我的完整配置。使用前先备份自己的 `~/.config/herdr-app/keys.json`，再将代码块整体复制进去；这会替换原文件的全部快捷键绑定。`cycle-tabs` 相关快捷键仍依赖对应 mod。

```json
{
  "global": {
    "cmd-q": "app.quit",
    "cmd-h": "app.hide",
    "cmd-alt-h": "app.hide_others",
    "cmd-t": "tab.new",
    "cmd-shift-t": "space.new",
    "cmd-w": "pane.close",
    "ctrl-tab": "cycle-tabs.next",
    "ctrl-shift-tab": "cycle-tabs.prev",
    "cmd-shift-]": "tab.next",
    "cmd-shift-[": "tab.prev",
    "cmd-alt-]": "space.next",
    "cmd-alt-[": "space.prev",
    "cmd-shift-1": "space.prev",
    "cmd-shift-2": "space.next",
    "cmd-]": "agent.next",
    "cmd-[": "agent.prev",
    "cmd-shift-l": "layout.switch",
    "cmd-n": "space.new",
    "cmd-p": "mod.open:picker",
    "cmd-shift-p": "app.palette",
    "cmd-,": "app.settings",
    "cmd-shift-d": "pane.split:down",
    "cmd-shift-w": "space.close",
    "cmd-shift-enter": "pane.zoom",
    "cmd-alt-left": "pane.go:left",
    "cmd-alt-right": "pane.go:right",
    "cmd-alt-up": "pane.go:up",
    "cmd-alt-down": "pane.go:down",
    "cmd-alt-shift-left": "pane.swap:left",
    "cmd-alt-shift-right": "pane.swap:right",
    "cmd-alt-shift-up": "pane.swap:up",
    "cmd-alt-shift-down": "pane.swap:down",
    "f2": "tab.rename",
    "shift-f2": "space.rename",
    "cmd-r": "tab.rename",
    "cmd-shift-r": "space.rename",
    "cmd-/": "app.help",
    "cmd-shift-/": "app.help",
    "cmd-b": "layout.toggle:sidebar",
    "cmd-=": "app.zoom_in",
    "cmd-+": "app.zoom_in",
    "cmd--": "app.zoom_out",
    "cmd-0": "app.zoom_reset",
    "cmd-3": "tab.select:3",
    "cmd-4": "tab.select:4",
    "cmd-5": "tab.select:5",
    "cmd-6": "tab.select:6",
    "cmd-7": "tab.select:7",
    "cmd-8": "tab.select:8",
    "cmd-9": "tab.select:9",
    "ctrl-1": "space.select:1",
    "ctrl-2": "space.select:2",
    "ctrl-3": "space.select:3",
    "ctrl-4": "space.select:4",
    "ctrl-5": "space.select:5",
    "ctrl-6": "space.select:6",
    "ctrl-7": "space.select:7",
    "ctrl-8": "space.select:8",
    "ctrl-9": "space.select:9"
  },
  "terminal": {
    "cmd-d": "send:\u001b[24~",
    "cmd-c": "terminal.copy",
    "cmd-v": "terminal.paste",
    "ctrl-v": "terminal.paste_image",
    "alt-left": "send:\u001bb",
    "alt-right": "send:\u001bf",
    "alt-backspace": "send:\u0017",
    "cmd-left": "send:\u0001",
    "cmd-right": "send:\u0005",
    "cmd-backspace": "send:\u0015"
  }
}
```

<!-- lazynote:end -->
