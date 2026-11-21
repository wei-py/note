---
title: 模块解析
created: 2026-06-13
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
  - modules
summary: TypeScript 模块解析速查表，涵盖各种模块系统写法
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 63d8c201-9725-40d1-9fa0-f8445fc14697
date: 2026-11-10
source: 16-module-resolution.md
---

<!-- lazynote:body -->
---
title: 模块解析
created: '2026-06-13'
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
  - modules
summary: TypeScript 模块解析速查表，涵盖各种模块系统写法
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 模块解析

| 知识点      | 写法                            | 说明               |
| ----------- | ------------------------------- | ------------------ |
| CommonJS    | `require` / `module.exports`    | Node.js 传统模块规范 |
| AMD         | `define` / `require`            | RequireJS 使用     |
| CMD         | `define(function(require){})`   | SeaJS 使用         |
| UMD         | 兼容 AMD、CommonJS、浏览器全局  | 老库常见           |
| 默认导出    | `export default xxx`            | 一个模块通常只有一个 |
| 默认导入    | `import xxx from './test'`      | 名字可以自定义     |
| 命名导出    | `export const a = 1`            | 可以导出多个       |
| 命名导入    | `import { a } from './test'`    | 名字通常要对应     |
| 导入重命名  | `import { a as b }`             | 解决命名冲突       |
| 动态导入    | `import('./test')`              | 返回 Promise，可按需加载 |

## 口诀

> **`default` 一个 `export` 多个，`as` 重命名解冲突，动态 `import()` 按需加载。**

<!-- lazynote:end -->
