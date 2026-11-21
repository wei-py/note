---
title: "GitHub - Miaotofu01/Study-Mate: 你的AI学习搭档：定路线、讲知识、做项目，边学边做，学透一门科目"
lazynote_generated: true
lazynote_id: bcd882e8-fde2-4d7b-98cc-9cc1abb98c93
tags:
  - AI学习助手
  - 学习工作流
  - DSH 插件
  - 多智能体
date: 2026-11-11
source: links.md
url: https://github.com/Miaotofu01/Study-Mate
resource_type: article
description: 你的AI学习搭档：定路线、讲知识、做项目，边学边做，学透一门科目. Contribute to
  Miaotofu01/Study-Mate development by creating an account on GitHub.
site_name: GitHub
author: null
resolved_url: https://github.com/Miaotofu01/Study-Mate
metadata_status: saved
metadata_error: null
collection_status: saved
collection_error: null
tag_status: tagged
tag_error: null
---

<!-- lazynote:body -->
[StudyMate](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/images/logo.png)

# StudyMate

**你的AI学习搭档：定计划、讲知识、做项目，学透一门科目**

[DSH 学习模式预设](https://camo.githubusercontent.com/3624f28382fe60dc2a1f5cd2390c4bf11661eb2d7eb3d9c65d1dfa313a93b75e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4453482d2545352541442541362545342542392541302545362541382541312545352542432538462545392541322538342545382541452542452d316335613430) [Antigravity 插件](https://camo.githubusercontent.com/bb6e2ba96e997ae32c18235c1f70fd4d28111aa5831feb40456e024f5dc5e1d6/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f416e7469677261766974792d2545352541342539412545362539392542412545382538332542442545342542442539332545362538462539322545342542422542362d343238356634) [Node.js](https://camo.githubusercontent.com/1abfce997050e46884f8d56d9ec65aede4ea251091bdca85102e8bfd50cc482c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d32322e313925324225323025374325323032342d333339393333) [MIT License](https://camo.githubusercontent.com/eb370e4398ea4782cc311865b81f42f70786a47fe16cf4bc74e19fc2ffb08d76/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f4d69616f746f667530312f53747564792d4d617465)

StudyMate 是面向数学与计算机科目学习的助手，原则是「learn with doing」

简体中文 · [English](https://github.com/Miaotofu01/Study-Mate/blob/main/README.en.md)

[快速开始](https://github.com/Miaotofu01/Study-Mate#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B) · [它是什么](https://github.com/Miaotofu01/Study-Mate#%E5%AE%83%E6%98%AF%E4%BB%80%E4%B9%88) · [核心功能](https://github.com/Miaotofu01/Study-Mate#%E6%A0%B8%E5%BF%83%E5%8A%9F%E8%83%BD) · [常见问题](https://github.com/Miaotofu01/Study-Mate#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98) · [使用说明](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md) · [Antigravity 说明](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/Antigravity.md)

[StudyMate：看板娘 + 手写体品牌字 + 覆盖科目（线代／微积分／概率论／C++／Python／机器学习／深度学习）+「任何科目，一站式搞定 / Learn With Doing」](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/images/taitou.png)

## 前言

本项目原先是vibe出来给自己用的一个小项目，没想到有这么多人喜欢。但是vibe出来的东西有很多的问题，包括但不限于「文档过于臃肿且充满AI味、可读性极差」、「海量且无用的防御性代码」、「混乱的功能模块」。

虽然现在跑起来的效果也不差，但是跟我理想中的效果还是有很大差距

我觉得这样的东西对不起这么多的信任与star，我会直视这些问题，并且人工修改审查每一个文件，在未来的更新维护中给大家带来更好的体验，感谢大家的使用与支持，有任何建议都可以提个issue，本项目将长期维护。

## 快速开始

### DeepSeek Harness

**DSH 依赖**：DSH 0.1.7-alpha.1+

#### 安装

-   web端

```shell
dsh plugin --profile web add @yunmiao/studymate
```

-   桌面端

```shell
dsh plugin --profile desktop add @yunmiao/studymate
```

#### 更新

-   web端

```shell
dsh plugin --profile web update @yunmiao/studymate@latest
```

-   桌面端

```shell
dsh plugin --profile desktop update @yunmiao/studymate@latest
```

-   **第一次学习**：新建会话时选「学习模式」，说一句「我想学 \[某个科目\]」。学习数据直接写进配置好的学习工作区（暂存模式已删，没有"收尾问落点再搬一次"这一步）。
-   **还没想好学什么**：在学习对话里说「我不知道学什么，帮我选方向」，可选探索后再决定是否开课；已有明确科目或恢复学习直接走原流程。
-   **学习工作区默认在 `~/StudyMate`，所有课件与记忆均存放在工作区**；已有配置会沿用。
-   **阅读在 DSH 的阅读端**：装好后新建会话时选「学习模式」，从侧边栏切到阅读端就能读课件、作答、搜资料——页面由阅读端实时渲染，不再预生成 HTML。

工作区、更新、桌面端与换机器续学、以及老版本 DSH 的替代装法见 [安装说明](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/%E5%AE%89%E8%A3%85.md)。

### Codex 和 ChatGPT Work

> **支持范围：只有 `v1.0.0`。** 1.1.0 起的版本不再保证在这一侧可用。

从 [`v1.0.0` 的 Release](https://github.com/Miaotofu01/Study-Mate/releases/tag/v1.0.0)（[ZIP 直链](https://github.com/Miaotofu01/Study-Mate/releases/download/v1.0.0/studymate-openai.zip)）下载 **studymate-openai.zip**，通过 Codex/ChatGPT 提供的插件导入入口导入（详见 [导入说明](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/Codex%E4%B8%8EChatGPT.md)）。这一侧没有后续版本可换，换机器时用同一个 ZIP。

### Google Antigravity

> **支持范围：只有 `v1.0.0`。** 1.1.0 起的版本不再保证在这一侧可用。

用 `v1.0.0` 那棵树构建并安装（不要用 `main`）：

```shell
git checkout v1.0.0
node bin/studymate.mjs build-antigravity --install
```

或者通过 `npm run build:antigravity` 构建 ZIP 包手动导入（详见 [Antigravity 说明](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/Antigravity.md)）。

## 它是什么

StudyMate 是一套**数学/计算机学习工作流、SKILL 与 DSH 插件**，支持 DSH（DeepSeek Harness）的「学习模式」预设、Google Antigravity 原生多智能体插件，也可打包为 Codex 和 ChatGPT Work 插件。它按需组织收集资料、采图、课程设计、讲解、练习评估五个角色；宿主支持时可委派给子代理，否则依次完成各角色工作。

-   **课程组成：讲解|练习|项目实操**：每门课一份大纲——知识点按前置依赖排成路线图，每个知识点标课的类型「概念课 | 实操课 | 实验课」（大纲里写 `概念`／`实操`／`实验`）。学习进度落在文件里，每次新对话可继承已有进度。
-   **跨科目共享记忆**：记住你的现有水平、哪种讲法有效、常见卡点，下一门课不用重新自我介绍。

## 为什么用它

| 常见做法 | 卡在哪 | StudyMate 的做法 |
| --- | --- | --- |
| 直接跟 AI 聊天学 | 会话一长上下文就吃不下；聊完不留痕，下次从零开始 | 信息与偏好由记忆文件保存；每次会话只带相关记忆、上下文短；课件是教科书式的讲解与配图 |
| 看视频课 / 网课 | 质量参差不齐；付费；无法跟随前沿发展的节奏 | 讲解方式定制化；收集最新的资料与标准；完全开源 |

## 核心功能

**课程总览与大纲路线图**：总览页列全部科目与当前节点，点进去是那门课的知识点路线图，按依赖分层排开、按状态着色，点节点原地展开课件子卡片。

[路线图示例](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/images/preview-index.png)

**课件是学习的主载体**：经典教材的讲解风格，丰富的配图，定制化的题目与项目目标。

[课件示例](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/images/preview-lesson.png)

阅读端就是产出本身：课件页由阅读端实时渲染，公式、配图、题目都在里面；需要一份能离线打开的副本时走导出（`npx -y @yunmiao/studymate export`，产物在 `<工作区>/export/`）。仓库里**不再入库示例工作区**——测试用的科目现造现弃（[ADR-0009](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/adr/0009-%E7%A4%BA%E4%BE%8B%E4%B8%8E%E7%94%9F%E6%88%90%E4%BA%A7%E7%89%A9%E4%B8%8D%E5%86%8D%E5%85%A5%E5%BA%93.md)），示例截图见上面的预览图。

## 用法示例

-   **「我不知道学什么，帮我选方向」** → 一次聊一个问题，可跳过或先看建议；选定方向后补齐开课信息，确认后接回建课与首课流程（见 [可选方向探索](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md#%E5%8F%AF%E9%80%89%E5%85%88%E6%8E%A2%E7%B4%A2%E5%AD%A6%E4%B9%A0%E6%96%B9%E5%90%91)）。
-   **「我想学 C++ 打竞赛」** → 先盘问目的/程度/项目/实验方式，再产出大纲路线图与科目主页，开第一课。
-   **带着指定教材自学** → 盘问结束后主动提供本地资料路径（讲义、笔记或教材目录），系统把教材转成 Markdown 放进 `reference/`（学生能翻），把它收集到的在线来源转成 Markdown 放进 `sources/`（写课对齐用）；大纲与课件都对着这批原文写。
-   **贴一段看不懂的课文 + 「这里没懂」** → 主教练当场答一小段，记一条档案，送你回原位接着读。
-   **「考考我」** → 现场出题 + 按可运行证据核验，给一份评估记录并更新进度。
-   **「太简单了 / 没听懂」** → 换讲法（加边界与反例，或降一层抽象），并把这条偏好记进共享记忆。

[对话示例](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/images/preview-chat.png)

## 配置与维护

日常要跑的命令只有一条，就是你装完之后自检的那条：

```shell
npm test
```

它不需要真实 DSH、浏览器或模型服务；测试自己造临时科目，不碰你的学习工作区。引擎脚本已经没有了（Python 随 #83 退役），**原生工具的清单与参数**只有两个出处：代码是 [`lib/tools/index.ts`](https://github.com/Miaotofu01/Study-Mate/blob/main/lib/tools/index.ts)，人读的那份是[原生工具契约](https://github.com/Miaotofu01/Study-Mate/blob/main/preset/skills/learning-system/references/tools.md)；各命令的前置、按需入口（真实浏览器、真实 DSH）与退出码语义见[测试说明](https://github.com/Miaotofu01/Study-Mate/blob/main/scripts/tests/README.md)——几处各是唯一出处，本文不重抄。

独立 Web 运行时（`study-mate-web/`，FastAPI + Next.js）曾落在主线，现已移出到分支 [`web/0.7.0-beta`](https://github.com/Miaotofu01/Study-Mate/tree/web/0.7.0-beta)——它自带一套引擎，与插件端读写同一份学习工作区，等有人把它适配到新引擎后合回。为什么移出、合回前必须满足什么，见 [ADR-0013](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/adr/0013-Web%E8%BF%90%E8%A1%8C%E6%97%B6%E7%A7%BB%E5%87%BA%E4%B8%BB%E7%BA%BF.md)。

## 项目结构

目录树、每个目录干什么、哪个文件归谁维护，见[工程约束](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E8%A7%84%E8%8C%83/%E5%B7%A5%E7%A8%8B%E7%BA%A6%E6%9D%9F.md) §二 目录与规则归属 与[文件归属](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E8%A7%84%E8%8C%83/%E6%96%87%E4%BB%B6%E5%BD%92%E5%B1%9E.md)——两处各有唯一出处，这里不再抄一份。

DSH 侧就是**一个插件包**（`@yunmiao/studymate`）：Host 半注册原生工具与阅读端数据路由，Client 半是阅读端本体；预设与工作区配置由安装器写。学习数据默认位于独立的 `~/StudyMate`，无需保留源码仓库；详见 [安装说明](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/%E5%AE%89%E8%A3%85.md)。

学习工作区里面长什么样（科目文件夹、课件、lab、档案、课型与题型），见 [使用说明 §六](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md#%E5%85%AD%E5%AD%A6%E4%B9%A0%E6%95%B0%E6%8D%AE%E5%AD%98%E5%9C%A8%E5%93%AA)。

## 常见问题

**装完看不到课件页**

课件由**阅读端实时渲染**，不再预生成 HTML（页面模板已随 #83 退役）。在 DSH 里新建会话选「学习模式」，从侧边栏切到阅读端即可。要一份能离线打开的，跑 `npx -y @yunmiao/studymate export`，产物在 `<工作区>/export/`。

**还需要装 Python 吗**

不需要。引擎从 Python 脚本迁到了随包发的 TypeScript 插件（[ADR-0002](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/adr/0002-%E5%BC%95%E6%93%8E%E6%94%B9%E7%94%A8TypeScript.md)），安装器也不再探测 Python。只有一件事另外要 Node：导出静态页面时要一份 React（`npm i -g react react-dom`，或用 `STUDYMATE_REACT_DIR` 指过去）。

更多问题（手改 YAML 的坑、大纲改节点后指针为什么会错、能不能离线）见 [使用说明 §八 常见问题](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md#%E5%85%AB%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)。

## 贡献 / License

-   **项目交流群**(QQ)：161914370
-   **参与开发**：[CONTRIBUTING.md](https://github.com/Miaotofu01/Study-Mate/blob/main/CONTRIBUTING.md)（改哪块先读哪份、本地怎么验、提交信息规范）
-   **变更日志**：[CHANGELOG.md](https://github.com/Miaotofu01/Study-Mate/blob/main/CHANGELOG.md)
-   **文档**：[使用说明](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E.md)（日常怎么用、课型与题型、检查与档案规则）· [Codex 与 ChatGPT](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/Codex%E4%B8%8EChatGPT.md)（OpenAI 插件构建、安装与工作区）· [Antigravity 说明](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E4%BD%BF%E7%94%A8/Antigravity.md)（Antigravity 插件构建、多智能体协同与安装）· [课件内容格式](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E8%A7%84%E8%8C%83/%E8%AF%BE%E4%BB%B6%E5%86%85%E5%AE%B9%E6%A0%BC%E5%BC%8F.md)（内容文件与题目位置的语法）· [阅读端呈现](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E8%A7%84%E8%8C%83/%E9%98%85%E8%AF%BB%E7%AB%AF%E5%91%88%E7%8E%B0.md)（四个面「看起来对不对」的意图判据）· [文件归属](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E8%A7%84%E8%8C%83/%E6%96%87%E4%BB%B6%E5%BD%92%E5%B1%9E.md)（代称 ↔ 路径 ↔ 维护者）· [Agent 交接协议](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E8%A7%84%E8%8C%83/Agent%E4%BA%A4%E6%8E%A5%E5%8D%8F%E8%AE%AE.md)（staged 子代理交付的机器边界）· [目标态规格](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E8%AE%BE%E8%AE%A1/%E7%9B%AE%E6%A0%87%E6%80%81%E8%A7%84%E6%A0%BC.md)（重构后系统的形状与门禁）· [工程约束](https://github.com/Miaotofu01/Study-Mate/blob/main/docs/%E8%A7%84%E8%8C%83/%E5%B7%A5%E7%A8%8B%E7%BA%A6%E6%9D%9F.md)（目录约定、规则归属、原生工具指针）· [工作区数据骨架](https://github.com/Miaotofu01/Study-Mate/blob/main/templates/README.md)

### 提改动前先跑这几条

规矩见 [CONTRIBUTING.md](https://github.com/Miaotofu01/Study-Mate/blob/main/CONTRIBUTING.md)；各命令要跑什么、前置是什么见 [测试说明](https://github.com/Miaotofu01/Study-Mate/blob/main/scripts/tests/README.md)。

### License

MIT（见 [LICENSE](https://github.com/Miaotofu01/Study-Mate/blob/main/LICENSE)，版权 Cattofu）。

## Star 趋势

  [Star History Chart](https://star-history.com/#miaotofu01/study-mate&Date)
<!-- lazynote:end -->
