---
title: zed-settings-shortcuts
created: 2026-11-14
updated: 2026-11-14
tags:
  - Zed
  - 编辑器配置
  - 快捷键
  - Helix 键位
  - LSP 诊断
lazynote_generated: true
lazynote_id: 79ab7830-00ab-465c-a3d7-0aa25d3500b4
date: 2026-11-14
source: zed-settings-shortcuts.md
---

<!-- lazynote:body -->
---
title: zed-settings-shortcuts
created: 2026-11-14
updated: 2026-11-14
tags:
  - Zed
  - 编辑器配置
  - 快捷键
  - Helix 键位
  - LSP 诊断
---
# 我的 Zed 配置：Helix 键位、编辑体验与快捷键

更新于 2026-11-13。

这份 Zed 配置以 VSCode 基础键位搭配 Helix 模式，使用深色主题、相对行号和中文字体回退；格式化交给手动操作，代码诊断、编辑预测和 Agent 则保持开启。下面整理各部分设置、常用键位，以及文末可以完整复制的两个配置文件。

配置来自 `~/.config/zed/settings.json` 和 `~/.config/zed/keymap.json`，只整理有效内容，不包含注释和备份。这是一份静态快照，不会自动同步，也不包含 Zed 默认配置、项目级覆盖或系统快捷键。命令可能依赖版本、扩展和平台，未逐项实测。

阅读快捷键时，`cmd` 是 macOS Command，`ctrl` 是 Control，`alt` 是 Option；空格表示依次按键，例如 `j k`。大写 `H`、`L`、`G` 保留配置原义，不等同于小写。虽然配置保留了 Vim context，但当前启用的是 `helix_mode: true`、`vim_mode: false`；具体能否触发仍取决于焦点、模式和菜单状态。

完整配置中没有令牌、密钥或密码值。`MIMO_TOKEN` 只是模型提供商的标识；本地 MCP 地址也按原样保留，复制后需要自己的模型凭据与服务环境。

## 配置说明

### 窗口、面板与项目

CLI 默认新窗口打开；底部 dock 占全宽。大纲与 Agent 在右侧，协作、Git、项目面板在左侧。Git diff 基线为 `head`，Git 面板启用树视图；diff 编辑器为左右分栏。

项目面板默认宽 480、缩进 25，文件优先排序、隐藏根节点、不自动折叠目录；显示图标和 Git 状态、自动定位当前条目，不显示诊断徽标。工具栏显示面包屑；代码导航保留预览标签。Markdown 预览不限制内容宽度。

### 主题、字体与显示

固定深色模式，深色主题 `XY-Zed`，浅色备选 `Gruvbox Light Soft`；图标使用 Zed 默认主题。UI 字体 `.SystemUIFont`，18.5、字重 480；编辑区 `FiraMono Nerd Font Propo`，18、字重 300；中文回退 `LXGW WenKai Mono GB`。Agent 的 UI 与正文分别设置字体和字号，终端另有独立字体。

行高 `comfortable`，显示相对行号、折叠标记和所有编辑器的 minimap；缩进线普通宽 1、活动宽 2。高亮最低对比度 48；无用代码淡化为 0。光标为闪烁竖线（实际模式显示仍由编辑器决定）。

### 编辑、滚动与搜索

软缩进、Tab 宽 2、自动包围；启用 which-key 与 sticky scroll。垂直边距 20，水平边距 0，末行之后允许滚至垂直边距；滚动灵敏度 10，快速滚动灵敏度 4，点击不自动滚动。

关闭 smartcase；搜索默认不区分大小写、全词匹配，匹配结果居中。使用系统路径选择提示；代理字符串为空。

### 格式化、语言覆盖与 LSP

全局 formatter 为 `auto`，但保存格式化关闭；格式化流程配置 `source.fixAll.eslint: true`。Vue.js、TypeScript、JavaScript 各自用 `formatter: []` 覆盖全局自动 formatter，并分别启用 ESLint 修复动作。不要据此认为保存会自动格式化，也不要把空 formatter 列表等同于删除代码动作；具体动作需 ESLint/LSP 支持。JSON 的语言覆盖为空对象。

ESLint 工作目录模式为 `auto`。将 `.uvue`、`.vue` 识别为 Vue.js，`.uts` 识别为 TypeScript；关闭 Vue 扩展自动更新。扫描额外包含 `.env`、`.env*`，这只是包含规则，不代表本文读取了这些文件；共享上下文时应注意其中的敏感内容。

### 提示与诊断

开启 inlay hints：显示值、参数和其他提示，不显示类型提示和背景；编辑/滚动延迟分别 700/50 ms。所有临时修饰键触发开关为 false。

诊断按钮与警告开启；LSP pull diagnostics 开启、延迟 50 ms。行内诊断开启、更新延迟 150 ms、padding 4、起始列 0，`max_severity: null` 未指定严重程度上限。

### AI、Agent 与服务

AI 未禁用；Zed 编辑预测开启，模式 `eager`。自定义 OpenAI-compatible 提供商 `MIMO_TOKEN` 指向小米 MIMO 接口；模型为 `mimo-v2.6-pro`，上下文/输出额度和能力标志见快照。

Agent 默认 profile 为 `ask`，默认、行内助手、提交消息、线程摘要均引用该模型；默认模型 `enable_thinking: false`。发送使用修饰键，完成总是播放声音。工具默认权限为 `allow`，没有逐工具覆盖；不要将 `ask` profile 名称等同于所有工具都会逐次询问。提交说明要求中文 Conventional Commits 标题、不超过 50 字符。

登记 `pi-acp`、`codex-acp`、`opencode` 三个 registry Agent 服务；启用本地 `browseros`（9200）与 `browseros-neo`（9010）MCP 服务。这里只记录配置，不证明服务已连接或可用。

遥测 diagnostics、metrics 为 true；`anthropic_retention` 为 false，并非关闭全部遥测。

### 终端

Shell 为 `/bin/zsh`；字体 `FiraMono Nerd Font`、字号 18、字重 400；显示面包屑，`flexible: false`，默认高度 600。

## 快捷键速查

按原文件块顺序记录。`（未提供）` 表示没有 context 字段；`""` 表示显式空字符串，二者均不添加模式限制，但仍受动作路由与默认绑定影响。`bindings` 为绑定，`unbind` 为针对指定动作的取消绑定，不是绑定到另一个动作。参数数组完整保留。

| 原块 | context（原文） | 类型 | 按键 | 动作及参数 | 用途 |
|---|---|---|---|---|---|
| 2 | （未提供） | bindings | `ctrl-tab` | `pane::ActivateNextItem` | 下一个标签项 |
| 2 | （未提供） | bindings | `ctrl-shift-tab` | `pane::ActivatePreviousItem` | 上一个标签项 |
| 3 | `VimControl && !menu` | bindings | `H` | `vim::StartOfLine` | 行首 |
| 3 | `VimControl && !menu` | bindings | `L` | `vim::EndOfLine` | 行尾 |
| 3 | `VimControl && !menu` | bindings | `q q` | `editor::Format` | 格式化 |
| 4 | `Editor && vim_mode == insert` | bindings | `j k` | `vim::NormalBefore` | 返回普通模式 |
| 5 | `Editor && vim_mode == visual` | bindings | `j k` | `vim::NormalBefore` | 返回普通模式 |
| 6 | （未提供） | bindings | `cmd-e` | `project_panel::ToggleFocus` | 切换项目面板焦点 |
| 6 | （未提供） | bindings | `alt-e` | `project_panel::ToggleFocus` | 同上 |
| 7 | `ProjectPanel && !editing` | bindings | `n` | `project_panel::NewFile` | 新建文件 |
| 7 | `ProjectPanel && !editing` | bindings | `a` | `project_panel::NewDirectory` | 新建目录 |
| 7 | `ProjectPanel && !editing` | bindings | `r` | `project_panel::Rename` | 重命名 |
| 7 | `ProjectPanel && !editing` | bindings | `d` | `project_panel::Delete` | 删除 |
| 7 | `ProjectPanel && !editing` | bindings | `o` | `["workspace::SendKeystrokes", "enter"]` | 发送 Enter |
| 8 | `""` | bindings | `cmd-k cmd-k` | `project_panel::CollapseAllEntries` | 折叠全部项目条目 |
| 9 | `Editor && vim_mode == insert` | bindings | `j k` | `vim::NormalBefore` | 与原块 4 重复 |
| 10 | `Editor && vim_mode == normal && !menu` | bindings | `t t` | `editor::FoldFunctionBodies` | 折叠函数体 |
| 11 | `Editor && vim_mode == visual` | bindings | `ctrl-enter` | `assistant::InlineAssist` | 行内助手 |
| 11 | `Editor && vim_mode == visual` | bindings | `cmd-enter` | `assistant::InlineAssist` | 行内助手 |
| 12 | `Editor && vim_mode == normal && !menu` | bindings | `ctrl-enter` | `assistant::InlineAssist` | 行内助手 |
| 12 | `Editor && vim_mode == normal && !menu` | bindings | `cmd-enter` | `assistant::InlineAssist` | 行内助手 |
| 13 | `!AcpThread > Editor && mode == full` | unbind | `ctrl-enter` | `assistant::InlineAssist` | 取消此 context 中该按键的行内助手动作 |
| 14 | `Terminal` | unbind | `ctrl-enter` | `assistant::InlineAssist` | 取消终端中该按键的行内助手动作 |
| 15 | `vim_mode == insert` | unbind | `ctrl-x ctrl-a` | `assistant::InlineAssist` | 取消插入模式中的该动作 |
| 16 | `Editor && vim_mode == normal && !menu` | bindings | `s s` | `assistant::InlineAssist` | 行内助手 |
| 17 | `Editor && vim_mode == helix_normal && !menu` | bindings | `r r` | `vim::HelixJumpToWord` | Helix 普通模式单词跳转 |
| 17 | `Editor && vim_mode == helix_normal && !menu` | bindings | `G` | `vim::EndOfDocument` | 文档末尾 |

### 空绑定、重复与覆盖说明

- 原块 1 是 `context: "Workspace"`、`bindings: {}`，没有实际用户绑定。原文件中注释掉的快捷键不在表中。
- 共 17 个有效配置块：24 条 `bindings` 记录（含 1 条重复）和 3 条 `unbind`，合计 27 条记录，即 23 个去重后的 context/按键/动作绑定。
- 原块 4、9 的插入模式 `j k` 完全相同，后者没有引入新行为。两个 visual 块分别添加退出模式与行内助手快捷键，不是互相清空。
- `bindings: {}` 不取消任何默认键位；文件没有 `null` 动作绑定。显式取消只有表中的 3 条 `unbind`，保留了动作名与 context，不能当成全局禁用这些按键。
- `ctrl-enter` 同时出现在 normal/visual 绑定与另一个 Editor context 的 unbind 中；当条件重叠时须结合 Zed 实际 context 栈和绑定优先级理解，不能仅凭按键名认定全局生效。`>`, `&&`, `!` 等表达式均按原文保存，不改写为更宽泛的条件。
- 用户绑定叠加在 VSCode 基础键位和 Helix 模式键位之上；同键不同 context 不必然冲突。`vim_mode == normal`、`visual`、`insert` 与 `helix_normal` 并非同一条件，当前 Helix 普通模式明确新增的是 `r r` 与 `G`。

## 可完整复制的 settings.json

以下是完整用户设置，可复制到 `~/.config/zed/settings.json`。保留全部有效键和值，仅移除注释、调整排版；未省略敏感值，也不包含默认设置。JSON 是合法 JSONC。

```jsonc
{
  "git": { "diff_base": "head" },
  "agent_ui_font_family": "FiraMono Nerd Font Propo",
  "agent_buffer_font_family": "LXGW WenKai Mono GB",
  "agent_buffer_font_size": 18.0,
  "agent_ui_font_size": 16.5,
  "markdown_preview": { "limit_content_width": false },
  "language_models": {
    "openai_compatible": {
      "MIMO_TOKEN": {
        "api_url": "https://token-plan-cn.xiaomimimo.com/v1",
        "available_models": [{
          "name": "mimo-v2.6-pro",
          "max_tokens": 200000,
          "max_output_tokens": 32000,
          "max_completion_tokens": 200000,
          "capabilities": {
            "tools": true,
            "images": false,
            "parallel_tool_calls": false,
            "prompt_cache_key": false,
            "chat_completions": true,
            "interleaved_reasoning": false
          }
        }]
      }
    }
  },
  "hard_tabs": false,
  "telemetry": { "diagnostics": true, "metrics": true, "anthropic_retention": false },
  "scroll_sensitivity": 10.0,
  "fast_scroll_sensitivity": 4.0,
  "which_key": { "enabled": true },
  "autoscroll_on_clicks": false,
  "sticky_scroll": { "enabled": true },
  "horizontal_scroll_margin": 0.0,
  "scroll_beyond_last_line": "vertical_scroll_margin",
  "text_rendering_mode": "platform_default",
  "unnecessary_code_fade": 0.0,
  "cursor_shape": "bar",
  "cursor_blink": true,
  "use_system_path_prompts": true,
  "icon_theme": { "mode": "dark", "light": "Zed (Default)", "dark": "Zed (Default)" },
  "proxy": "",
  "preview_tabs": { "enable_keep_preview_on_code_navigation": true },
  "use_smartcase_search": false,
  "search": { "center_on_match": true, "case_sensitive": false, "whole_word": true },
  "helix_mode": true,
  "minimum_contrast_for_highlights": 48.0,
  "cli_default_open_behavior": "new_window",
  "bottom_dock_layout": "full",
  "outline_panel": { "dock": "right" },
  "collaboration_panel": { "dock": "left" },
  "git_panel": { "dock": "left", "tree_view": true },
  "project_panel": {
    "folder_indicator": "icon",
    "sort_order": "default",
    "sort_mode": "files_first",
    "diagnostic_badges": false,
    "auto_reveal_entries": true,
    "git_status": true,
    "file_icons": true,
    "default_width": 480.0,
    "indent_size": 25.0,
    "hide_root": true,
    "auto_fold_dirs": false,
    "dock": "left",
    "entry_spacing": "standard"
  },
  "toolbar": { "breadcrumbs": true },
  "theme": { "mode": "dark", "light": "Gruvbox Light Soft", "dark": "XY-Zed" },
  "ui_font_family": ".SystemUIFont",
  "ui_font_fallbacks": ["LXGW WenKai Mono GB", ".SystemUIFont"],
  "ui_font_weight": 480.0,
  "ui_font_size": 18.5,
  "buffer_font_family": "FiraMono Nerd Font Propo",
  "buffer_font_fallbacks": ["LXGW WenKai Mono GB", ".SystemUIFont"],
  "buffer_font_size": 18.0,
  "buffer_font_weight": 300.0,
  "buffer_line_height": "comfortable",
  "base_keymap": "VSCode",
  "vim_mode": false,
  "tab_size": 2,
  "use_auto_surround": true,
  "relative_line_numbers": "enabled",
  "vertical_scroll_margin": 20,
  "diff_view_style": "split",
  "gutter": { "line_numbers": true, "folds": true },
  "minimap": { "show": "always", "display_in": "all_editors", "thumb_border": "full", "thumb": "always" },
  "indent_guides": { "line_width": 1, "active_line_width": 2 },
  "formatter": "auto",
  "format_on_save": "off",
  "code_actions_on_format": { "source.fixAll.eslint": true },
  "languages": {
    "Vue.js": { "formatter": [], "code_actions_on_format": { "source.fixAll.eslint": true } },
    "TypeScript": { "code_actions_on_format": { "source.fixAll.eslint": true }, "formatter": [] },
    "JavaScript": { "code_actions_on_format": { "source.fixAll.eslint": true }, "formatter": [] },
    "JSON": {}
  },
  "inlay_hints": {
    "enabled": true,
    "show_value_hints": true,
    "show_type_hints": false,
    "show_parameter_hints": true,
    "show_other_hints": true,
    "show_background": false,
    "edit_debounce_ms": 700,
    "scroll_debounce_ms": 50,
    "toggle_on_modifiers_press": { "control": false, "alt": false, "shift": false, "platform": false, "function": false }
  },
  "diagnostics": {
    "button": true,
    "include_warnings": true,
    "lsp_pull_diagnostics": { "enabled": true, "debounce_ms": 50 },
    "inline": { "enabled": true, "update_debounce_ms": 150, "padding": 4, "min_column": 0, "max_severity": null }
  },
  "lsp": { "eslint": { "settings": { "workingDirectory": { "mode": "auto" } } } },
  "disable_ai": false,
  "edit_predictions": { "provider": "zed", "mode": "eager" },
  "show_edit_predictions": true,
  "agent": {
    "sidebar_side": "right",
    "default_profile": "ask",
    "dock": "right",
    "tool_permissions": { "default": "allow", "tools": {} },
    "use_modifier_to_send": true,
    "play_sound_when_agent_done": "always",
    "default_model": { "enable_thinking": false, "provider": "MIMO_TOKEN", "model": "mimo-v2.6-pro" },
    "inline_assistant_model": { "provider": "MIMO_TOKEN", "model": "mimo-v2.6-pro" },
    "commit_message_instructions": "使用 Conventional Commits 格式：<type>(<scope>): <description>。使用中文。标题不超过 50 个字符。",
    "commit_message_model": { "provider": "MIMO_TOKEN", "model": "mimo-v2.6-pro" },
    "thread_summary_model": { "provider": "MIMO_TOKEN", "model": "mimo-v2.6-pro" }
  },
  "agent_servers": { "pi-acp": { "type": "registry" }, "codex-acp": { "type": "registry" }, "opencode": { "type": "registry" } },
  "auto_update_extensions": { "vue": false },
  "file_types": { "Vue.js": ["**/*.uvue", "**/*.vue"], "TypeScript": ["**/*.uts"] },
  "file_scan_inclusions": ["**/.env", "**/.env*"],
  "terminal": {
    "shell": { "program": "/bin/zsh" },
    "font_size": 18.0,
    "font_weight": 400.0,
    "font_family": "FiraMono Nerd Font",
    "toolbar": { "breadcrumbs": true },
    "flexible": false,
    "default_height": 600
  },
  "context_servers": {
    "browseros": { "url": "http://127.0.0.1:9200/mcp", "enabled": true },
    "browseros-neo": { "url": "http://127.0.0.1:9010/mcp", "source": "custom", "enabled": true }
  }
}
```

## 可完整复制的 keymap.json

以下是完整用户键位，可复制到 `~/.config/zed/keymap.json`。保留原块顺序、重复项、空 bindings、所有 context、动作参数与 unbind；仅移除注释。

```jsonc
[
  {
    "context": "Workspace",
    "bindings": {}
  },
  {
    "bindings": {
      "ctrl-tab": "pane::ActivateNextItem",
      "ctrl-shift-tab": "pane::ActivatePreviousItem"
    }
  },
  {
    "context": "VimControl && !menu",
    "bindings": {
      "H": "vim::StartOfLine",
      "L": "vim::EndOfLine",
      "q q": "editor::Format"
    }
  },
  {
    "context": "Editor && vim_mode == insert",
    "bindings": {
      "j k": "vim::NormalBefore"
    }
  },
  {
    "context": "Editor && vim_mode == visual",
    "bindings": {
      "j k": "vim::NormalBefore"
    }
  },
  {
    "bindings": {
      "cmd-e": "project_panel::ToggleFocus",
      "alt-e": "project_panel::ToggleFocus"
    }
  },
  {
    "context": "ProjectPanel && !editing",
    "bindings": {
      "n": "project_panel::NewFile",
      "a": "project_panel::NewDirectory",
      "r": "project_panel::Rename",
      "d": "project_panel::Delete",
      "o": ["workspace::SendKeystrokes", "enter"]
    }
  },
  {
    "context": "",
    "bindings": {
      "cmd-k cmd-k": "project_panel::CollapseAllEntries"
    }
  },
  {
    "context": "Editor && vim_mode == insert",
    "bindings": {
      "j k": "vim::NormalBefore"
    }
  },
  {
    "context": "Editor && vim_mode == normal && !menu",
    "bindings": {
      "t t": "editor::FoldFunctionBodies"
    }
  },
  {
    "context": "Editor && vim_mode == visual",
    "bindings": {
      "ctrl-enter": "assistant::InlineAssist",
      "cmd-enter": "assistant::InlineAssist"
    }
  },
  {
    "context": "Editor && vim_mode == normal && !menu",
    "bindings": {
      "ctrl-enter": "assistant::InlineAssist",
      "cmd-enter": "assistant::InlineAssist"
    }
  },
  {
    "context": "!AcpThread > Editor && mode == full",
    "unbind": {
      "ctrl-enter": "assistant::InlineAssist"
    }
  },
  {
    "context": "Terminal",
    "unbind": {
      "ctrl-enter": "assistant::InlineAssist"
    }
  },
  {
    "context": "vim_mode == insert",
    "unbind": {
      "ctrl-x ctrl-a": "assistant::InlineAssist"
    }
  },
  {
    "context": "Editor && vim_mode == normal && !menu",
    "bindings": {
      "s s": "assistant::InlineAssist"
    }
  },
  {
    "context": "Editor && vim_mode == helix_normal && !menu",
    "bindings": {
      "r r": "vim::HelixJumpToWord",
      "G": "vim::EndOfDocument"
    }
  }
]
```

<!-- lazynote:end -->
