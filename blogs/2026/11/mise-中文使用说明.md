---
title: mise 中文使用说明书
cover: /assets/default-cover.jpg
created: 2026-08-27
summary: 本文是 mise 工具的中文使用说明书，详细介绍了 mise
  作为统一开发工具版本管理器的功能，包括全局和项目版本管理、安装激活方法、常用命令速查、Node.js、Python、Java 和 pnpm
  的具体设置、环境变量配置、项目任务执行以及常见故障排查指南。
tags:
  - 版本管理
  - mise
  - Node.js
  - Python
  - Java
  - pnpm
  - 开发工具
updated: 2026-08-27
lazynote_generated: true
lazynote_id: ccbe52b8-8d2e-426c-8cfe-fa5c2bc16e80
date: 2026-11-10
source: mise-中文使用说明.md
---

<!-- lazynote:body -->
---
cover: /assets/default-cover.jpg
created: "2026-08-27"
summary: 本文是 mise 工具的中文使用说明书，详细介绍了 mise 作为统一开发工具版本管理器的功能，包括全局和项目版本管理、安装激活方法、常用命令速查、Node.js、Python、Java 和 pnpm 的具体设置、环境变量配置、项目任务执行以及常见故障排查指南。
tags:
  - 版本管理
  - mise
  - Node.js
  - Python
  - Java
  - pnpm
  - 开发工具
title: mise 中文使用说明书
updated: "2026-08-27"
---

# mise 中文使用说明书

> 适用范围：macOS、Linux、Windows；重点覆盖 Node.js、Python、Java 和 pnpm 的版本管理。

## 1. mise 是什么

`mise` 是一个统一的开发工具版本管理器。它可以替代或整合：

- Node.js：`n`、`nvm`、`fnm`、`volta`
- Python：`pyenv`
- Java：`sdkman`
- 其他工具：pnpm、Go、Ruby、Rust CLI，以及 npm、pipx、GitHub Release 中的 CLI

mise 主要解决三个问题：

1. **全局版本**：为整台机器设置默认版本。
2. **项目版本**：进入项目目录时自动切换版本。
3. **统一环境**：在 `mise.toml` 中维护工具版本、环境变量和项目任务。

---

## 2. 当前这台 Mac 的配置

当前全局配置文件：

```text
~/.config/mise/config.toml
```

当前版本：

```toml
[tools]
java = "temurin-17.0.19+10"
node = "26.7.0"
pnpm = "11.9.0"
python = "3.14.6"
```

Zsh 激活配置位于 `~/.zshrc`：

```zsh
eval "$(mise activate zsh)"
```

查看当前实际状态：

```sh
mise current
mise which node
mise which python
mise which java
mise which pnpm
```

当前命令应解析到：

```text
~/.local/share/mise/installs/node/26.7.0/bin/node
~/.local/share/mise/installs/python/3.14.6/bin/python
~/.local/share/mise/installs/java/temurin-17.0.19+10/bin/java
~/.local/share/mise/installs/pnpm/11.9.0/pnpm
```

说明：这台 Mac 的 Java 和 pnpm 通过 `mise link` 注册到 mise。mise 负责版本选择和 PATH；删除 mise 链接不等于删除原始安装文件。

---

## 3. 安装和激活

### 3.1 macOS / Linux 官方安装方式

```sh
curl https://mise.run | sh
```

Zsh：

```sh
echo 'eval "$(~/.local/bin/mise activate zsh)"' >> ~/.zshrc
exec zsh
```

Bash：

```sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
exec bash
```

也可以通过 Homebrew 安装：

```sh
brew install mise
```

Homebrew + Zsh：

```sh
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
exec zsh
```

检查安装：

```sh
mise --version
mise doctor
```

### 3.2 Windows 推荐安装方式

使用 Scoop：

```powershell
scoop install mise
```

PowerShell 激活：

```powershell
Add-Content $PROFILE '(&mise activate pwsh) | Out-String | Invoke-Expression'
```

如果 `$PROFILE` 或其父目录不存在：

```powershell
New-Item -ItemType Directory -Force (Split-Path $PROFILE)
New-Item -ItemType File -Force $PROFILE
Add-Content $PROFILE '(&mise activate pwsh) | Out-String | Invoke-Expression'
```

重新打开 PowerShell，然后检查：

```powershell
mise --version
mise doctor
```

---

## 4. 最常用命令速查

| 目的                 | 命令                            |
| -------------------- | ------------------------------- |
| 查看 mise 版本       | `mise --version`                |
| 检查配置和 PATH      | `mise doctor`                   |
| 查看当前生效版本     | `mise current`                  |
| 查看已安装工具       | `mise ls`                       |
| 查看远程可用版本     | `mise ls-remote node`           |
| 查看命令来自哪里     | `mise which node`               |
| 查看工具安装目录     | `mise where node`               |
| 设置全局版本         | `mise use --global node@26.7.0` |
| 设置项目版本         | `mise use node@26.7.0`          |
| 安装配置中缺失的工具 | `mise install`                  |
| 临时运行指定版本     | `mise exec node@22 -- node -v`  |
| 查看可升级版本       | `mise outdated`                 |
| 升级配置中的工具     | `mise upgrade`                  |
| 卸载某个版本         | `mise uninstall node@22.0.0`    |
| 查看配置来源         | `mise config`                   |

`mise use` 的短写是 `mise u`，`mise exec` 的短写是 `mise x`，但说明书和脚本中建议使用完整命令，便于阅读。

---

## 5. 全局版本管理

全局版本适用于没有项目级配置覆盖的目录。

### 5.1 设置精确版本

```sh
mise use --global node@26.7.0
mise use --global python@3.14.6
mise use --global java@temurin-17.0.19+10
mise use --global pnpm@11.9.0
```

也可以一次设置多个工具：

```sh
mise use --global \
  node@26.7.0 \
  python@3.14.6 \
  'java@temurin-17.0.19+10' \
  pnpm@11.9.0
```

Java 版本包含 `+` 时，建议加引号，避免不同 shell 的解析差异。

### 5.2 使用主版本或 latest

```sh
mise use --global node@26
mise use --global python@3.14
mise use --global java@temurin-17
mise use --global pnpm@11
```

```sh
mise use --global node@latest
```

建议：

- 个人机器可以使用主版本，例如 `node@26`。
- 项目和团队配置应固定精确版本，例如 `node@26.7.0`。
- 生产构建、CI 和可复现环境不要使用 `latest`。

### 5.3 查看可用版本

```sh
mise ls-remote node
mise ls-remote python
mise ls-remote java
mise ls-remote pnpm
```

按前缀筛选 Java Temurin 17：

```sh
mise ls-remote java temurin-17
```

---

## 6. 项目级版本管理

在项目根目录执行不带 `--global` 的 `mise use`：

```sh
cd my-project
mise use node@26.7.0
mise use pnpm@11.9.0
mise use python@3.14.6
```

mise 会在项目中创建或更新：

```text
mise.toml
```

示例：

```toml
[tools]
node = "26.7.0"
pnpm = "11.9.0"
python = "3.14.6"
java = "temurin-17.0.19+10"
```

其他开发者克隆项目后执行：

```sh
mise install
```

进入该目录时，已经激活 mise 的 shell 会自动切换版本；离开目录后恢复全局版本。

验证：

```sh
mise current
node --version
python --version
java -version
pnpm --version
```

### 6.1 项目配置的优先级

通常可以理解为：

```text
项目目录中的 mise.toml
    > 用户全局 ~/.config/mise/config.toml
    > 系统 PATH 中的其他安装
```

因此，项目配置可以覆盖全局默认值，而不用卸载全局版本。

### 6.2 提交到 Git

项目的 `mise.toml` 应提交到 Git：

```sh
git add mise.toml
git commit -m "chore: pin development tool versions"
```

不要把 `~/.config/mise/config.toml` 提交到某个项目；它是个人机器的全局配置。

---

## 7. 临时使用其他版本

不修改全局或项目配置，临时执行 Node 22：

```sh
mise exec node@22 -- node --version
```

临时执行 Python 3.13：

```sh
mise exec python@3.13 -- python --version
```

同时指定多个工具：

```sh
mise exec node@22 pnpm@10 -- pnpm install
```

这种方式适合：

- 验证项目是否兼容其他版本
- 运行一次性脚本
- CI 中明确指定运行环境
- 不希望修改 `mise.toml` 的情况

---

## 8. Node.js 和 pnpm

### 8.1 设置 Node.js

```sh
mise use --global node@26.7.0
node --version
npm --version
```

npm 随 Node.js 一起安装。除非项目明确要求独立固定 npm 版本，否则不需要单独管理 npm。

如果需要固定 npm：

```sh
mise use --global npm@11.19.0
```

### 8.2 设置 pnpm

```sh
mise use --global pnpm@11.9.0
pnpm --version
```

项目中固定 pnpm：

```sh
mise use pnpm@11.9.0
```

### 8.3 检查 PATH 冲突

macOS / Linux：

```sh
which -a node npm pnpm
mise which node
mise which pnpm
```

PowerShell：

```powershell
Get-Command node -All
Get-Command pnpm -All
mise which node
mise which pnpm
```

判断标准：当前实际执行的第一个命令必须来自 mise 的安装目录。

### 8.4 项目建议

```toml
[tools]
node = "26.7.0"
pnpm = "11.9.0"
```

安装依赖：

```sh
mise install
pnpm install --frozen-lockfile
```

---

## 9. Python

### 9.1 设置 Python

```sh
mise use --global python@3.14.6
python --version
python3 --version
pip --version
```

mise 管理 Python 解释器版本，但项目依赖仍建议放进虚拟环境。

### 9.2 创建项目虚拟环境

```sh
cd my-python-project
mise use python@3.14.6
python -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
```

Windows PowerShell：

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
```

推荐组合：

- mise：管理 Python 解释器版本
- `.venv`：隔离项目依赖
- `uv`、`pip`、Poetry 或 PDM：管理依赖

不要把 `.venv` 提交到 Git。

### 9.3 调试 Python 路径

```sh
mise which python
python -c 'import sys; print(sys.executable)'
python -m pip --version
```

始终优先使用：

```sh
python -m pip install PACKAGE
```

相比直接调用 `pip`，这种写法能确保 pip 属于当前 Python。

---

## 10. Java

### 10.1 设置 Temurin JDK

```sh
mise use --global java@temurin-17.0.19+10
java -version
printf '%s\n' "$JAVA_HOME"
```

mise 通过 shell activation 自动设置 `JAVA_HOME`。仅使用 shims 时，`JAVA_HOME` 不会自动更新，因此交互式终端推荐使用 `mise activate`。

### 10.2 切换 Java 版本

```sh
mise use java@temurin-21
java -version
printf '%s\n' "$JAVA_HOME"
```

回到精确版本：

```sh
mise use java@temurin-17.0.19+10
```

### 10.3 Java 厂商前缀

常见示例：

```sh
mise use java@temurin-21
mise use java@zulu-21
mise use java@corretto-21
mise use java@openjdk-21
```

团队项目应同时固定厂商和版本，避免不同 JDK 构建结果不一致。

### 10.4 JAVA_HOME 不正确

先执行：

```sh
cd .
printf '%s\n' "$JAVA_HOME"
mise current java
mise which java
```

`cd .` 会触发 mise 重新计算当前目录环境。IDE 在启动时读取 `JAVA_HOME`，修改版本后通常需要完全重启 IDE。

---

## 11. 环境变量

在项目 `mise.toml` 中定义：

```toml
[env]
NODE_ENV = "development"
APP_PORT = "3000"
```

进入项目后：

```sh
printf '%s\n' "$NODE_ENV"
printf '%s\n' "$APP_PORT"
```

也可以显式运行：

```sh
mise exec -- node -e 'console.log(process.env.NODE_ENV)'
```

安全要求：

- 不要把密码、Token、私钥直接提交到 `mise.toml`。
- 项目配置可能包含任务和钩子，只信任自己确认过的配置。
- 机密信息应使用系统密钥链、密码管理器、CI Secret 或不提交的本地环境文件。

---

## 12. 项目任务

mise 也可以统一项目命令。

`mise.toml`：

```toml
[tasks.install]
description = "安装项目依赖"
run = "pnpm install"

[tasks.dev]
description = "启动开发服务器"
run = "pnpm dev"

[tasks.check]
description = "执行类型检查和测试"
run = [
  "pnpm typecheck",
  "pnpm test",
]
```

查看任务：

```sh
mise tasks
```

运行任务：

```sh
mise run install
mise run dev
mise run check
```

任务会在 mise 管理的工具版本和环境变量中运行，适合替代散落在文档里的长命令。

---

## 13. 信任项目配置

首次进入包含 `mise.toml` 的陌生项目时，mise 可能要求信任配置。

检查文件后执行：

```sh
mise trust
```

查看信任状态：

```sh
mise trust --show
```

不要对来源不明的项目盲目执行 `mise trust`。`mise.toml` 可以定义环境、任务和钩子，因此具备执行代码的能力。

---

## 14. 更新与卸载

### 14.1 查看过期工具

```sh
mise outdated
```

### 14.2 升级工具

```sh
mise upgrade
```

升级后检查：

```sh
mise current
node --version
python --version
java -version
pnpm --version
```

项目要求可复现时，不要无条件升级所有工具；应修改项目中的精确版本并经过测试。

### 14.3 安装配置中的所有工具

```sh
mise install
```

适用于：

- 新电脑
- 新克隆的项目
- CI 环境
- `mise.toml` 刚发生变化时

### 14.4 卸载某个版本

```sh
mise uninstall node@22.0.0
mise uninstall python@3.13.0
```

先确认没有项目仍在使用：

```sh
mise ls
mise current
```

如果版本通过 `mise link` 注册，卸载通常只会移除 mise 中的链接；原始工具目录需要由其原安装方式单独管理。

### 14.5 清理缓存

```sh
mise cache clear
```

仅在缓存损坏或需要释放空间时使用。缓存清除后，后续安装可能需要重新下载文件。

---

## 15. 常见故障排查

### 15.1 修改配置后版本没有变化

```sh
exec zsh
```

或者：

```sh
cd .
mise current
```

### 15.2 命令仍来自 Homebrew、nvm 或系统目录

```sh
which -a node python python3 java pnpm
mise which node
mise which python
mise which java
mise which pnpm
```

检查 shell 配置中是否仍有旧管理器：

```sh
# 常见冲突内容
NVM_DIR
PYENV_ROOT
JAVA_HOME
PNPM_HOME
nvm init
pyenv init
```

删除旧 activation 后重新启动 shell：

```sh
exec zsh
```

不要因为 Homebrew 中仍存在某个运行时就直接认定冲突。关键是 `which` 返回的第一个实际命令是否来自 mise。Homebrew 软件可能仍把 Node 或 Python 作为依赖。

### 15.3 `mise current` 正确，但命令路径错误

```sh
hash -r 2>/dev/null || true
rehash 2>/dev/null || true
exec zsh
```

然后重新检查：

```sh
mise which node
command -v node
```

### 15.4 Java 版本正确，但 JAVA_HOME 错误

确认使用的是 shell activation，而不是只使用 shims：

```zsh
eval "$(mise activate zsh)"
```

然后：

```sh
exec zsh
printf '%s\n' "$JAVA_HOME"
```

### 15.5 下载失败或连接中断

先直接重试：

```sh
mise install
```

查看详细日志：

```sh
mise --verbose install
```

如果网络代理、镜像或公司防火墙修改了下载内容，应先修复网络来源；不要跳过校验或使用来源不明的二进制文件。

### 15.6 综合诊断

```sh
mise doctor
mise current
mise config
mise ls
```

---

## 16. 推荐工作流

### 16.1 新项目

```sh
mkdir my-project
cd my-project
mise use node@26.7.0
mise use pnpm@11.9.0
pnpm init
```

提交配置：

```sh
git add mise.toml package.json
```

### 16.2 克隆已有项目

```sh
git clone REPOSITORY_URL
cd PROJECT
mise trust
mise install
```

然后执行项目包管理器安装命令：

```sh
pnpm install
```

### 16.3 升级项目版本

```sh
mise use node@26.8.0
mise use pnpm@11.10.0
```

验证项目后提交：

```sh
git add mise.toml
git commit -m "chore: update development runtimes"
```

### 16.4 CI

CI 中建议显式执行：

```sh
mise install
mise exec -- pnpm install --frozen-lockfile
mise exec -- pnpm test
```

项目的 `mise.toml` 应固定精确版本，避免 CI 随 `latest` 自动变化。

---

## 17. 管理原则

1. **全局配置提供舒适默认值，项目配置保证可复现。**
2. **项目固定精确版本，不使用 `latest`。**
3. **先确认 PATH 已由 mise 接管，再卸载旧版本管理器。**
4. **Homebrew 依赖的 Node/Python 可以保留，但不应排在 mise 前面。**
5. **Python 解释器交给 mise，Python 项目依赖交给 `.venv`。**
6. **Java 同时检查 `java` 路径和 `JAVA_HOME`。**
7. **陌生项目的 `mise.toml` 必须先审查，再信任。**
8. **版本升级后运行项目自身的构建、测试和锁文件检查。**

---

## 18. 官方参考

- Getting Started：<https://mise.jdx.dev/getting-started.html>
- 安装 mise：<https://mise.jdx.dev/installing-mise.html>
- 工具版本管理：<https://mise.jdx.dev/dev-tools/>
- Node.js：<https://mise.jdx.dev/lang/node.html>
- Python：<https://mise.jdx.dev/lang/python.html>
- Java：<https://mise.jdx.dev/lang/java.html>
- Tasks：<https://mise.jdx.dev/tasks/>
- CLI Reference：<https://mise.jdx.dev/cli/>

<!-- lazynote:end -->
