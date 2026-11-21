---
title: 声明文件 .d.ts
created: 2026-06-13
tags:
  - typescript
  - guide
  - declaration
  - cheatsheet
summary: TypeScript 声明文件 .d.ts 的完整指南，涵盖声明语法与配置
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 426c8ae4-5df5-4d14-9910-4e8c1ae7983f
date: 2026-11-10
source: 17-declaration-files.md
---

<!-- lazynote:body -->
---
title: 声明文件 .d.ts
created: '2026-06-13'
tags:
  - typescript
  - guide
  - declaration
  - cheatsheet
summary: TypeScript 声明文件 .d.ts 的完整指南，涵盖声明语法与配置
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 声明文件 .d.ts

## 为什么需要声明文件

JS 库没有类型信息，TS 无法推断 → 需要 `.d.ts` 文件告诉 TS "这个模块里有什么"。

- 有声明文件 → 智能提示、类型检查正常工作
- 没有声明文件 → 报错 `Could not find a declaration file for module 'xxx'`

## 声明文件的来源

| 来源 | 方式 | 举例 |
| --- | --- | --- |
| 库自带 | `package.json` 中 `types` 字段指向 `.d.ts` | axios、lodash |
| 社区维护 | 安装 `@types/xxx` | `npm i @types/express -D` |
| 自己手写 | 创建 `xxx.d.ts` 文件 | 自定义未收录的库 |
| 自动生成 | `tsconfig` 中 `"declaration": true` | 编译时自动生成 |

## declare 关键字

`declare` 只做声明，不生成任何 JS 代码。

| 声明什么 | 语法 | 示例 |
| --- | --- | --- |
| 全局变量 | `declare const/var` | `declare const $: JQuery` |
| 全局函数 | `declare function` | `declare function alert(msg: string): void` |
| 全局类 | `declare class` | `declare class Animal { name: string }` |
| 全局枚举 | `declare enum` | `declare enum Direction { Up, Down }` |
| 全局命名空间 | `declare namespace` | `declare namespace JQ { function ajax(): void }` |
| 模块声明 | `declare module` | `declare module 'xxx' { ... }` |

## 手写声明文件模板

```typescript
// express.d.ts — 为没有类型定义的模块声明
declare module 'express' {
  interface Request {
    body: any
    params: Record<string, string>
    query: Record<string, string>
  }
  interface Response {
    json(data: any): void
    send(body: any): void
    status(code: number): Response
  }
  interface Router {
    get(path: string, cb: (req: Request, res: Response) => void): void
    post(path: string, cb: (req: Request, res: Response) => void): void
  }
  interface App {
    use(...args: any[]): void
    listen(port: number, cb?: () => void): void
  }
  interface Express {
    (): App
    Router(): Router
  }
  const express: Express
  export default express
}
```

```typescript
// global.d.ts — 声明全局变量/类型
declare const API_BASE: string

declare interface AppConfig {
  debug: boolean
  version: string
}

// 给 window 扩展属性
declare interface Window {
  __INITIAL_STATE__: Record<string, unknown>
}
```

## 三斜线指令

用于在声明文件中引用另一个声明文件，必须放在文件最顶部。

```typescript
/// <reference path="./global.d.ts" />
/// <reference types="node" />
```

| 指令 | 作用 |
| --- | --- |
| `/// <reference path="..." />` | 引用本地声明文件 |
| `/// <reference types="..." />` | 引用 `@types` 包 |

## tsconfig 中的类型相关配置

| 配置 | 作用 |
| --- | --- |
| `declaration` | 编译时自动生成 `.d.ts` 文件 |
| `declarationDir` | 指定生成的 `.d.ts` 存放目录 |
| `emitDeclarationOnly` | 只生成 `.d.ts`，不生成 `.js` |
| `typeRoots` | 声明文件目录，默认 `node_modules/@types` |
| `types` | 指定加载哪些声明文件包 |
| `skipLibCheck` | 跳过 `.d.ts` 文件的类型检查，加快编译 |

## 第三方声明文件查找

👉 [npmjs.com/~types](https://www.npmjs.com/~types?activeTab=packages) — 社区维护的 `@types` 包合集

## 口诀总结

> **库自带的直接用，没有就装 `@types`，再没有就手写 `.d.ts`。**
> **`declare` 只声明不实现，写类型不写逻辑。**
> **变量函数和类，枚举命名空间模块，六种声明全覆盖。**
> **全局扩展 `declare global`，模块扩展 `declare module`。**
> **三斜线放顶部，引用声明不遗漏。**
> **`typeRoots` 管目录，`types` 管加载，`skipLibCheck` 提速度。**

<!-- lazynote:end -->
