---
title: TypeScript 学习笔记（小满zs 专栏完整版）
created: 2026-06-13
tags:
  - typescript
  - cheatsheet
  - guide
  - frontend
  - generics
summary: 从基础类型到工程实战，32章节全面掌握TypeScript
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: db343a84-6f85-41a2-b2dd-9dfaa15f1252
date: 2026-11-10
source: TypeScript完整学习笔记.md
---

<!-- lazynote:body -->
---
title: TypeScript 学习笔记（小满zs 专栏完整版）
created: '2026-06-13'
tags:
  - typescript
  - cheatsheet
  - guide
  - frontend
  - generics
summary: 从基础类型到工程实战，32章节全面掌握TypeScript
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# TypeScript 学习笔记（小满zs 专栏完整版）

> 从基础类型到工程实战，32 个章节全面掌握 TypeScript。

---

## 📚 目录

| 章节 | 主题 | 核心要点 |
| --- | --- | --- |
| 01 - any vs unknown | 基础类型 | `any` 放飞，`unknown` 先检查 |
| 02 - interface | 接口 | 必选只读加函数，继承合并任意补 |
| 03 - 数组类型 | 数组 | 方括号、泛型、不定参数 |
| 04 - 函数扩展 | 函数 | 参数返回值、可选默认剩余、重载 |
| 05 - 类型断言/联合/交叉 | 类型运算 | `|` 联合、`&` 交叉、`as` 断言 |
| 06 - 内置对象 | 内置类型 | Date、RegExp、DOM、Promise |
| 07 - Class 类 | 面向对象 | 继承实现、四修饰符 |
| 08 - 元组类型 | 元组 | 定长有序、只读具名、as const |
| 09 - 枚举类型 | 枚举 | 数字/字符串/const enum |
| 10 - 类型推论/别名 | 类型推导 | 推论、type 别名、条件类型 |
| 11 - never 类型 | 特殊类型 | void vs never |
| 12 - symbol 类型 | Symbol | 唯一键、遍历、iterator |
| 13 - 泛型 | 泛型 | 函数/接口/类泛型、约束 |
| 14 - tsconfig.json | 工程配置 | 常用配置 + 完整参考 |
| 15 - namespace | 命名空间 | 定义、嵌套、合并、ES Module 替代 |
| 16 - 模块解析 | 模块系统 | CommonJS/AMD/UMD、导入导出 |
| 17 - 声明文件 .d.ts | 声明文件 | declare、手写模板、三斜线指令 |
| 18 - Mixins 混入 | 混入 | 对象混入、类混入、多继承替代方案 |
| 19 - 装饰器 Decorator | 装饰器 | 类/方法/属性/参数装饰器、装饰器工厂、元数据 |
| 20 - Webpack 构建 TS+Vue3 | 工程化 | Webpack + TS + Vue3 完整配置 |
| 21 - 实战：发布订阅模式 | 设计模式 | on/emit/off/once 完整实现 |
| 22 - Set / Map / WeakSet / WeakMap | 数据结构 | Set 去重、Map 任意键、Weak 弱引用 |
| 23 - Proxy & Reflect | 进阶 | 对象代理、陷阱函数、观察者模式实现 |
| 24 - 泛型工具（上） | 工具类型 | Partial/Required/Pick/Exclude/Omit |
| 25 - 泛型工具（下） | 工具类型 | Record/Readonly/ReturnType |
| 26 - infer 类型推断 | 进阶 | 协变/逆变、递归推断、Promise 返回值提取 |
| 27 - infer 类型提取 | 进阶 | First/Last/Shift/Pop 元组操作 |
| 28 - infer 递归 | 进阶 | 元组反转、递归类型推断 |
| 29 - 类型守卫 | 进阶 | typeof/instanceof/自定义守卫/类型谓词 |
| 30 - 类型兼容性 | 进阶 | 协变/逆变/双向协变/鸭子类型 |
| 31 - 封装 LocalStorage | 实战 | 泛型封装、过期时间、Rollup 打包 |
| 32 - object/Object/{} 区别 | 加餐 | 大小写 Object、空对象类型辨析 |

---


# any vs unknown

| 特性                     | `any`      | `unknown` |
| ------------------------ | ---------- | --------- |
| 可以接收任意类型         | 可以       | 可以      |
| 可直接赋给其他具体类型   | 可以       | 不可以    |
| 可直接访问属性、调用方法 | 可以       | 不可以    |
| 是否保留类型安全         | 基本不保留 | 保留      |
| 推荐程度                 | 尽量少用   | 优先使用  |

## 口诀

> **`any` 放飞自我，`unknown` 先检查再用。**

---


# interface 接口

| 功能     | 写法                     |
| -------- | ------------------------ |
| 必填属性 | `name: string`           |
| 可选属性 | `age?: number`           |
| 只读属性 | `readonly id: number`    |
| 任意属性 | `[key: string]: unknown` |
| 函数属性 | `callback: () => void`   |
| 接口继承 | `interface B extends A`  |
| 接口合并 | 声明多个同名 `interface` |

## 口诀

> **必选只读加函数，继承合并任意补。**

---


# 数组类型

| 场景               | 推荐写法          |
| ------------------ | ----------------- |
| 数字数组           | `number[]`        |
| 字符串数组         | `string[]`        |
| 泛型数组           | `Array<number>`   |
| 二维数组           | `number[][]`      |
| 任意元素数组       | `any[]`，但应慎用 |
| 函数类数组对象     | `IArguments`      |
| 不定数量的函数参数 | `...args: 类型[]` |

## 口诀

> **基础方括号，泛型用 `Array`，不定参数三点铺。**

---


# 函数扩展

| 功能       | 写法                             |
| ---------- | -------------------------------- |
| 参数类型   | `name: string`                   |
| 返回值类型 | `(): string`                     |
| 可选参数   | `age?: number`                   |
| 默认参数   | `age: number = 18`               |
| 函数接口   | `(a: number, b: number): number` |
| 剩余参数   | `...args: string[]`              |
| 函数重载   | 多个签名加一个实现               |

## 口诀

> **参数类型返回值，可选默认和剩余，重载签名要成对。**

---


# 类型断言 | 联合类型 | 交叉类型

| 功能             | 写法              | 含义                         |
| ---------------- | ----------------- | ---------------------------- |
| 联合类型         | `A \| B`          | 值可以是 A 或 B              |
| 交叉类型         | `A & B`           | 值必须同时满足 A 和 B        |
| 类型断言         | `value as Type`   | 告诉编译器将值视为某类型     |
| 临时关闭检查     | `value as any`    | 绕过大部分类型检查           |
| 常量断言         | `value as const`  | 保留字面量类型并增加只读约束 |
| 安全识别联合类型 | `typeof`、`in` 等 | 通过检查完成类型收窄         |

## 口诀

> **联合或 `|` 交叉与 `&`，断言 `as` 来收窄，`const` 锁字面量。**

---


# 内置对象

| 知识点        | 典型写法                        |
| ------------- | ------------------------------- |
| 日期类型      | `Date`                          |
| 正则类型      | `RegExp`                        |
| 错误类型      | `Error`                         |
| DOM 元素      | `HTMLElement`、`HTMLDivElement` |
| DOM 集合      | `NodeListOf<T>`                 |
| 鼠标事件      | `MouseEvent`                    |
| 异步结果      | `Promise<T>`                    |
| Canvas 元素   | `HTMLCanvasElement`             |
| Canvas 上下文 | `CanvasRenderingContext2D`      |

## 口诀

> **日期正则加错误，DOM 事件 `Promise`，Canvas 两件套。**

---


# Class 类

| 知识点     | 典型写法      |
| ---------- | ------------- |
| 类定义     | `class`       |
| 构造函数   | `constructor` |
| 方法       | `method()`    |
| 属性       | `property`    |
| 继承       | `extends`     |
| 实现       | `implements`  |
| 静态成员   | `static`      |
| 私有成员   | `private`     |
| 受保护成员 | `protected`   |
| 公共成员   | `public`      |

```typescript
class 子类 extends 父类 implements 接口 {
  public 公共成员;
  protected 受保护成员;
  private 私有成员;
  static 静态成员;
}
```

## 口诀

> **继承 `extends` 实现 `implements`，公私静保四修饰。**

---


# 元组类型

| 功能     | 写法                         |
| -------- | ---------------------------- |
| 普通元组 | `[number, string]`           |
| 只读元组 | `readonly [number, string]`  |
| 具名元组 | `[id: number, name: string]` |
| 可选元素 | `[x: number, y?: number]`    |
| 剩余元素 | `[string, ...number[]]`      |
| 元组数组 | `[string, number][]`         |
| 常量元组 | `[1, 'a'] as const`          |

## 口诀

> **定长有序方括号，只读具名可选余，`as const` 锁值。**

---


# 枚举类型

| 类型         | 示例                 | 特点                     |
| ------------ | -------------------- | ------------------------ |
| 数字枚举     | `Up, Down`           | 默认从 0 自动递增        |
| 指定数字枚举 | `Up = 1, Down`       | 后续继续递增             |
| 字符串枚举   | `Up = 'up'`          | 值可读、适合序列化       |
| 异构枚举     | 数字和字符串混用     | 允许，但通常不推荐       |
| 成员类型     | `value: Enum.Member` | 只能使用指定成员         |
| 普通枚举     | `enum E`             | 编译后通常存在运行时对象 |
| 常量枚举     | `const enum E`       | 通常被移除并内联         |
| 反向映射     | `Enum[0]`            | 只有数字枚举支持         |

## 口诀

> **数字自增字符串读，`const enum` 内联无运行时，反向映射仅数字。**

---


# 类型推论 | 类型别名

| 知识点   | 核心含义                                        |
| -------- | ----------------------------------------------- |
| 类型推论 | TypeScript 根据初始值和上下文自动推断类型       |
| 类型别名 | 使用 `type` 给任意类型表达式命名                |
| 条件类型 | 使用 `T extends U ? X : Y` 根据类型关系选择结果 |

## 口诀

> **能推就推不手写，`type` 起名随处用，三目判断是条件类型。**

---


# never 类型

| 类型      | 大致含义                       |
| --------- | ------------------------------ |
| `unknown` | 什么值都可能有，但使用前要检查 |
| `any`     | 什么都可以，基本放弃类型检查   |
| `void`    | 没有返回值                     |
| `never`   | 根本不会有值                   |

## 口诀

> **`void` 没返回，`never` 不会有，死循环和抛错是 `never` 的家。**

---


# symbol 类型

| 知识点            | 说明                                           |
| ----------------- | ---------------------------------------------- |
| `symbol`          | ES2015 引入的原始类型                          |
| `Symbol()`        | 创建唯一 Symbol 值                             |
| Symbol 唯一性     | 即使描述相同，也不相等                         |
| Symbol 属性键     | 可避免普通字符串属性名冲突                     |
| 常规遍历          | `for...in`、`Object.keys` 等拿不到 Symbol 属性 |
| 获取 Symbol 属性  | `Object.getOwnPropertySymbols()`               |
| 获取全部属性键    | `Reflect.ownKeys()`                            |
| `Symbol.iterator` | 定义对象如何被迭代                             |
| `for...of`        | 会调用对象的迭代器                             |
| 普通对象          | 默认不可迭代，需手动实现 `[Symbol.iterator]`   |

## 口诀

> **`Symbol` 生成唯一键，遍历不到要专用 API，迭代协议靠 `iterator`。**

---


# 泛型

| 知识点       | 写法                        | 含义                       |
| ------------ | --------------------------- | -------------------------- |
| 函数泛型     | `function fn<T>(arg: T): T` | 调用时决定类型             |
| 多泛型参数   | `<T, U>`                    | 多个类型占位符             |
| 泛型接口     | `interface Box<T>`          | 接口可复用不同类型         |
| 泛型函数接口 | `{ <T>(arg: T): T }`        | 描述泛型函数               |
| 泛型约束     | `T extends Len`             | 限制 T 必须满足某结构      |
| 对象键约束   | `K extends keyof T`         | key 必须是对象已有属性     |
| 泛型类       | `class Store<T>`            | 类实例化时确定内部数据类型 |

## 口诀

> **尖括号占类型位，`extends` 加约束，`keyof` 限属性，函数接口类都能泛。**

---


# tsconfig.json 配置文件

## 常用配置速查

| 配置                | 作用                  |
| ------------------- | --------------------- |
| `target`            | 控制输出 JS 版本      |
| `module`            | 控制模块格式          |
| `strict`            | 开启严格类型检查      |
| `rootDir`           | 源码根目录            |
| `outDir`            | 输出目录              |
| `include`           | 指定参与编译的文件    |
| `exclude`           | 排除部分文件          |
| `lib`               | 指定可用标准库类型    |
| `moduleResolution`  | 控制模块解析方式      |
| `baseUrl` / `paths` | 配置路径别名          |
| `noEmit`            | 只检查类型，不输出 JS |
| `declaration`       | 生成 `.d.ts` 类型声明 |

## 完整配置参考

```json
"compilerOptions": {
  "incremental": true,                    // 增量编译，第二次编译在第一次基础上进行
  "tsBuildInfoFile": "./buildFile",       // 增量编译文件存储位置
  "diagnostics": true,                    // 打印诊断信息
  "target": "ES5",                        // 目标语言版本
  "module": "CommonJS",                   // 模块标准
  "outFile": "./app.js",                  // 合并输出单文件（配合 AMD 模块）
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // 引用的标准库
  "allowJS": true,                        // 允许编译 JS/JSX 文件
  "checkJs": true,                        // 对 JS 文件做类型检查
  "outDir": "./dist",                     // 输出目录
  "rootDir": "./",                        // 源码根目录
  "declaration": true,                    // 自动生成 .d.ts 声明文件
  "declarationDir": "./file",             // 声明文件存放目录
  "emitDeclarationOnly": true,            // 只生成声明文件，不生成 JS
  "sourceMap": true,                      // 生成 sourceMap
  "inlineSourceMap": true,                // 内联 sourceMap
  "declarationMap": true,                 // 为声明文件生成 sourceMap
  "typeRoots": [],                        // 声明文件目录，默认 node_modules/@types
  "types": [],                            // 指定加载的声明文件包
  "removeComments": true,                 // 删除注释
  "noEmit": true,                         // 不输出文件
  "noEmitOnError": true,                  // 有错误时不输出
  "noEmitHelpers": true,                  // 不生成 helper 函数
  "importHelpers": true,                  // 通过 tslib 引入 helper
  "downlevelIteration": true,             // 降级遍历器实现（ES3/5）
  "strict": true,                         // 开启所有严格检查
  "alwaysStrict": true,                   // 注入 'use strict'
  "noImplicitAny": true,                  // 不允许隐式 any
  "strictNullChecks": true,              // 不允许 null/undefined 赋值给其他类型
  "strictFunctionTypes": true,           // 不允许函数参数双向协变
  "strictPropertyInitialization": true,   // 类实例属性必须初始化
  "strictBindCallApply": true,           // 严格的 bind/call/apply 检查
  "noImplicitThis": true,                // 不允许 this 隐式 any
  "noUnusedLocals": true,                // 检查未使用的局部变量
  "noUnusedParameters": true,            // 检查未使用的函数参数
  "noFallthroughCasesInSwitch": true,    // 防止 switch 穿透
  "noImplicitReturns": true,             // 每个分支都要有返回值
  "esModuleInterop": true,               // 允许 export= 由 import from 导入
  "allowUmdGlobalAccess": true,          // 允许模块中全局访问 UMD 模块
  "moduleResolution": "node",            // 模块解析策略
  "baseUrl": "./",                        // 非相对模块解析基地址
  "paths": {                              // 路径映射
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src", "out"],            // 虚拟目录合并
  "listEmittedFiles": true,              // 打印输出文件
  "listFiles": true                       // 打印编译的文件
}

"include": ["src/**/*"],   // 自动匹配所有 TS 文件
"exclude": ["demo.ts"],    // 排除文件
"files": ["demo.ts"]       // 手动指定文件
```

## 口诀

> **`target` 定版本，`module` 定规范，`strict` 全开保平安。**
> **`outDir` 管输出，`include` 管参与，`declaration` 生声明。**
> **`paths` 别名要配 `baseUrl`，`skipLibCheck` 加速编译。**

---


# namespace 命名空间

| 知识点      | 写法                                      | 说明               |
| ----------- | ----------------------------------------- | ------------------ |
| 定义命名空间 | `namespace A {}`                          | 创建一个代码分组   |
| 暴露成员    | `export const a = 1`                      | 外部才能访问       |
| 访问成员    | `A.a`                                     | 通过命名空间路径访问 |
| 嵌套命名空间 | `namespace A { export namespace B {} }`   | 多层组织代码       |
| 抽离文件    | `export namespace V {}`                   | 可以配合模块导入   |
| 简化路径    | `import X = A.B.C`                        | 给长路径起别名     |
| 命名空间合并 | 多个 `namespace A`                        | 同名命名空间会合并 |
| 现代替代方案 | ES Module                                 | 现代项目更推荐     |

## 口诀

> **`export` 暴露不导出就看不见，同名自动合并，现代项目用 ES Module 替代。**

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

---


# Mixins 混入

TypeScript 混入 Mixins，可以理解为合并。Vue 中也有 `mixins` 这个东西。

---

## 1. 对象混入

使用 ES6 的 `Object.assign` 合并多个对象。

```typescript
interface Name {
  name: string
}
interface Age {
  age: number
}
interface Sex {
  sex: number
}

let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }

const people = Object.assign(people1, people2, people3)
// people 被推断为交叉类型: Name & Age & Sex
```

---

## 2. 类的混入

### 第一步：声明两个 mixins 类

> 注意：严格模式下要关闭 `strict`，不然编译不过。

```typescript
class A {
  type: boolean = false;
  changeType() {
    this.type = !this.type
  }
}

class B {
  name: string = '张三';
  getName(): string {
    return this.name;
  }
}
```

### 第二步：创建目标类，用 `implements` 而非 `extends`

把类当接口使用，为混入的属性和方法创建**占位属性**，告诉编译器这些成员在运行时是可用的。

```typescript
class C implements A, B {
  type: boolean
  changeType: () => void;
  name: string;
  getName: () => string
}
```

### 第三步：编写 Mixins 帮助函数

遍历 mixins 上的所有属性，复制到目标原型上，把占位属性替换成真正的实现。

```typescript
function Mixins(curCls: any, itemCls: any[]) {
  itemCls.forEach(item => {
    Object.getOwnPropertyNames(item.prototype).forEach(name => {
      curCls.prototype[name] = item.prototype[name]
    })
  })
}

Mixins(C, [A, B])
```

`Object.getOwnPropertyNames()` 获取对象自身的属性（不含继承），遍历所有属性名并复制。

---

## 对比总结

| 方式 | 关键字 | 作用 | 说明 |
| --- | --- | --- | --- |
| 对象混入 | `Object.assign` | 合并对象 | 返回交叉类型 |
| 类混入 | `implements` + 帮助函数 | 组合多个类 | 用 `implements` 代替 `extends`，占位 + 复制原型 |

---

## 为什么需要 Mixins？

- TS 只支持**单继承**（`extends` 只能一个），不支持多继承
- Mixins 可以间接实现**多继承**的效果
- 复用多个类的行为，避免深层继承链

---

## 口诀总结

> **对象混入 `Object.assign`，返回交叉类型合多为一。**
> **类混入 `implements` 不用 `extends`，占位属性先声明，原型复制后填充。**
> **单继承不够用，Mixins 来补位，多类行为可组合。**

---


# 装饰器 Decorator

> 装饰器是一项实验性特性，未来版本可能改变。需在 tsconfig 中启用 `"experimentalDecorators": true`。

装饰器是一种特殊类型的声明，能够附加到**类声明、方法、访问符、属性或参数**上，增加或修改类的功能。

---

## 1. 类装饰器

接收类的构造函数作为参数。

```typescript
const watcher: ClassDecorator = (target: Function) => {
  target.prototype.getParams = <T>(params: T): T => {
    return params
  }
}

@watcher
class A {
  constructor() {}
}

const a = new A();
console.log((a as any).getParams('123')); // '123'
```

---

## 2. 装饰器工厂

本质是**高阶函数**：外层接受配置参数，内层接收类的构造函数。

```typescript
const watcher = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getParams = <T>(params: T): T => {
      return params
    }
    target.prototype.getOptions = (): string => {
      return name
    }
  }
}

@watcher('name')
class A {
  constructor() {}
}

const a = new A();
console.log((a as any).getParams('123'));
```

---

## 3. 装饰器组合

可以使用多个装饰器，**从下往上执行**（先 `watcher`，再 `watcher2`）。

```typescript
@watcher2('name2')
@watcher('name')
class A {
  constructor() {}
}
```

---

## 4. 方法装饰器

返回三个参数：

| 参数 | 含义 |
| --- | --- |
| `target` | 静态成员 → 类的构造函数；实例成员 → 类的原型对象 |
| `key` | 成员的名字 |
| `descriptor` | 成员的属性描述符 |

```typescript
const met: MethodDecorator = (target, key, descriptor) => {
  console.log(target, key, descriptor)
}

class A {
  constructor() {}
  @met
  getName(): string {
    return '小满'
  }
}
```

---

## 5. 属性装饰器

返回两个参数：

| 参数 | 含义 |
| --- | --- |
| `target` | 静态成员 → 类的构造函数；实例成员 → 类的原型对象 |
| `key` | 属性的名字 |

```typescript
const met: PropertyDecorator = (target, key) => {
  console.log(target, key)
}

class A {
  @met
  name: string
  constructor() {}
}
```

---

## 6. 参数装饰器

返回三个参数：

| 参数 | 含义 |
| --- | --- |
| `target` | 静态成员 → 类的构造函数；实例成员 → 类的原型对象 |
| `key` | 成员的名字 |
| `index` | 参数在函数参数列表中的索引 |

```typescript
const met: ParameterDecorator = (target, key, index) => {
  console.log(target, key, index)
}

class A {
  constructor() {}
  setParasm(@met name: string = '213') {}
}
```

---

## 7. 元数据存储 reflect-metadata

```typescript
import 'reflect-metadata'

// 存储元数据
Reflect.defineMetadata('key', 'result', target)

// 读取元数据
const key = Reflect.getMetadata('key', target)
```

---

## 8. 实战：装饰器封装 axios 请求

```typescript
import axios from 'axios'
import 'reflect-metadata'

const Base = (base: string): ClassDecorator => {
  return (target) => {
    target.prototype.base = base;
  }
}

const Get = (url: string): MethodDecorator => {
  return (target: any, key, descriptor: PropertyDescriptor) => {
    axios.get(url).then(res => {
      const key = Reflect.getMetadata('key', target)
      descriptor.value(key ? res.data[key] : res.data)
    })
  }
}

const result = (): ParameterDecorator => {
  return (target: any, key, index) => {
    Reflect.defineMetadata('key', 'result', target)
  }
}

const Bt: PropertyDecorator = (target, key) => {
  console.log(target, key)
}

@Base('/api')
class Http {
  @Bt
  xiaoman: string
  constructor() {
    this.xiaoman = 'xiaoman'
  }
  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  getList(@result() data: any) {}
}

const http = new Http() as any
```

---

## 装饰器类型速查

| 类型 | 签名 | 参数个数 |
| --- | --- | --- |
| 类装饰器 | `ClassDecorator` | 1（target） |
| 方法装饰器 | `MethodDecorator` | 3（target, key, descriptor） |
| 属性装饰器 | `PropertyDecorator` | 2（target, key） |
| 参数装饰器 | `ParameterDecorator` | 3（target, key, index） |
| 装饰器工厂 | 返回装饰器的函数 | 可自定义配置参数 |

---

## 口诀总结

> **装饰器是高阶函数，`@` 挂在类方法属性参数上。**
> **类装一参方法三，属性两个参数三，顺序 target key desc/index。**
> **工厂模式外层配，内层返回真装饰，组合使用从下往上执行。**
> **`reflect-metadata` 存元数据，`define` 存 `get` 取，配合装饰器做依赖注入。**

---


# Webpack 构建 TS + Vue3 项目

> 从零搭建 Webpack + TypeScript + Vue3 项目，逐步添加功能。

---

## 项目目录结构

```
src/
  ├── main.ts
  ├── App.vue
  └── shim.d.ts
webpack.config.js
index.html
package.json
tsconfig.json
```

---

## 第一步：基础构建

```bash
npm install webpack webpack-dev-server webpack-cli -D
```

`package.json` 添加命令：

```json
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  }
}
```

`webpack.config.js`：

```javascript
const { Configuration } = require('webpack')
const path = require('path')
/** @type {Configuration} */
const config = {
  mode: "development",
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  }
}
module.exports = config
```

---

## 第二步：支持 TypeScript

```bash
npm install ts-loader typescript -D
```

配置 `tsconfig.json`：

```json
{
  "include": ["src/**/*"]
}
```

webpack 添加 loader：

```javascript
module: {
  rules: [
    { test: /\.ts$/, use: 'ts-loader' }
  ]
}
```

---

## 第三步：支持 Vue

```bash
npm install vue-loader html-webpack-plugin -D
```

`src/main.ts`：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

让 TS 识别 `.vue` 文件（`shim.d.ts`）：

```typescript
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

完整 webpack 配置：

```javascript
const { Configuration } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
/** @type {Configuration} */
const config = {
  mode: "development",
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  stats: 'errors-only',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}
module.exports = config
```

---

## 第四步：支持 CSS + Less

```bash
npm install css-loader style-loader less less-loader -D
```

添加规则：

```javascript
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader'] // 从右向左解析
},
{
  test: /\.less$/,
  use: ['style-loader', 'css-loader', 'less-loader']
}
```

---

## 第五步：代码分包

性能优化，避免所有代码打包到一个文件：

```javascript
optimization: {
  splitChunks: {
    cacheGroups: {
      moment: {
        name: "moment",
        test: /[\\/]node_modules[\\/]moment[\\/]/,
        chunks: "all"
      },
      common: {
        name: "common",
        chunks: "all",
        minChunks: 2
      }
    }
  }
}
```

---

## 第六步：单独提取 CSS

通过 `link` 标签引入 CSS，而非 `style` 标签动态插入：

```bash
npm install mini-css-extract-plugin -D
```

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

plugins: [
  new MiniCssExtractPlugin()
],

// 替换 style-loader 为 MiniCssExtractPlugin.loader
{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
{ test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] }
```

---

## 依赖清单

| 依赖 | 作用 |
| --- | --- |
| `webpack` | 打包核心 |
| `webpack-cli` | 命令行工具 |
| `webpack-dev-server` | 开发服务器 |
| `ts-loader` | 编译 TypeScript |
| `vue-loader` | 编译 Vue 单文件组件 |
| `html-webpack-plugin` | 生成 HTML 模板 |
| `css-loader` | 解析 CSS |
| `style-loader` | 动态插入 style |
| `less` / `less-loader` | 编译 Less |
| `mini-css-extract-plugin` | 提取 CSS 为独立文件 |

---

## 口诀总结

> **webpack 四件套：loader 编译、plugin 增强、entry 入口、output 出口。**
> **TS 加 `ts-loader`，Vue 加 `vue-loader`，`.vue` 要声明模块。**
> **CSS 从右向左解析：`style-loader` → `css-loader` → `less-loader`。**
> **分包用 `splitChunks`，提取 CSS 用 `mini-css-extract-plugin`。**

---


# 实战：TS 编写发布订阅模式

> 发布订阅模式是一种常见的设计模式，`addEventListener`、Vue 事件总线、Webpack Hooks 都是它的应用。

---

## 三个角色

```
发布者 → 调度中心 → 订阅者
         (Event)
```

| 角色 | 职责 |
| --- | --- |
| 发布者（Publisher） | 触发事件，不直接通知订阅者 |
| 调度中心（Event） | 存储事件和回调，负责分发 |
| 订阅者（Subscriber） | 注册回调，等待被触发 |

---

## 接口定义

```typescript
interface EventFace {
  on: (name: string, callback: Function) => void    // 订阅
  emit: (name: string, ...args: Array<any>) => void  // 发布
  off: (name: string, fn: Function) => void          // 解除绑定
  once: (name: string, fn: Function) => void         // 只执行一次
}

interface List {
  [key: string]: Array<Function>
}
```

---

## 完整实现

```typescript
class Dispatch implements EventFace {
  list: List;

  constructor() {
    this.list = {};
  }

  // 订阅事件
  on(name: string, callback: Function) {
    const callbackList: Array<Function> = this.list[name] || [];
    callbackList.push(callback);
    this.list[name] = callbackList;
  }

  // 发布事件
  emit(name: string, ...args: Array<any>) {
    let eventName = this.list[name];
    if (eventName) {
      eventName.forEach(fn => {
        fn.apply(this, args);
      });
    } else {
      console.error('该事件未监听');
    }
  }

  // 解除绑定
  off(name: string, fn: Function) {
    let eventName = this.list[name];
    if (eventName && fn) {
      let index = eventName.findIndex(fns => fns === fn);
      eventName.splice(index, 1);
    } else {
      console.error('该事件未监听');
    }
  }

  // 一次性订阅（触发一次后自动解除）
  once(name: string, fn: Function) {
    let decorator = (...args: Array<any>) => {
      fn.apply(this, args);
      this.off(name, decorator);
    };
    this.on(name, decorator);
  }
}
```

---

## 使用示例

```typescript
const o = new Dispatch();

// 订阅事件 'abc'
o.on('abc', (...arg: Array<any>) => {
  console.log(arg, 1);
});

// 一次性订阅（只会触发一次）
o.once('abc', (...arg: Array<any>) => {
  console.log(arg, 'once');
});

// 第一次发布 → 触发 on 和 once 的回调
o.emit('abc', 1, true, '小满');
// 输出: [1, true, '小满'] 1
// 输出: [1, true, '小满'] 'once'

// 第二次发布 → 只触发 on 的回调（once 已自动解除）
o.emit('abc', 2, true, '小满');
// 输出: [2, true, '小满'] 1
```

---

## 实际应用场景

| 场景 | 实现方式 |
| --- | --- |
| DOM 事件 | `addEventListener` / `removeEventListener` |
| Vue 2 事件总线 | `EventBus.$on` / `$emit` / `$off` |
| Webpack | Hooks 机制 |
| Electron | `ipcMain` / `ipcRenderer` |
| Node.js | `EventEmitter` |

---

## 口诀总结

> **发布订阅三角色：发布者、调度中心、订阅者。**
> **`on` 订阅存回调，`emit` 发布遍历执行，`off` 解除找索引删除。**
> **`once` 是装饰器模式：包一层函数，触发后自动 `off`。**
> **解耦发布者和订阅者，中间调度中心来通信。**

---


# Set / Map / WeakSet / WeakMap

> ES6 新增的数据结构，Set 类似数组（去重），Map 类似对象（任意类型作键）。

---

## 1. Set

集合是由一组**无序且唯一**的项组成的，可以想象成没有重复元素的数组。

### 属性

| 属性 | 说明 |
| --- | --- |
| `size` | 返回集合元素个数 |

### 操作方法

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `add(value)` | 添加值 | Set 本身 |
| `delete(value)` | 删除值 | `boolean` |
| `has(value)` | 是否存在 | `boolean` |
| `clear()` | 清除所有 | `void` |

```typescript
let set: Set<number> = new Set([1, 2, 3, 4])
set.add(5)
set.has(5)      // true
set.delete(5)   // true
set.size         // 4
```

### 去重

```typescript
let arr = [...new Set([1, 1, 1, 2, 2, 3, 4, 5, 5, 5, 5])]
console.log(arr) // [1, 2, 3, 4, 5]
```

---

## 2. Map

键值对的集合，但**键的范围不限于字符串**，任何类型（包括对象）都可以当作键。

```typescript
let obj = { name: '小满' }
let map: Map<object, Function> = new Map()

map.set(obj, () => 123)
map.get(obj)      // () => 123
map.has(obj)      // true
map.delete(obj)   // true
map.size          // 0
```

**Map vs Object：**
| 特性 | Map | Object |
| --- | --- | --- |
| 键的类型 | 任意类型 | 只能是 string/symbol |
| 大小 | `size` 属性 | 需要手动计算 |
| 遍历 | 可直接 `for...of` | 需要 `Object.keys()` |
| 性能 | 频繁增删场景更优 | 一般场景足够 |

---

## 3. WeakSet & WeakMap

**Weak** = 弱引用，不会被计入垃圾回收引用计数。

### WeakMap

- 键必须是**对象**
- 键是**弱引用**，不阻止垃圾回收
- **不能遍历**，**不能获取大小**
- 适合存储对象的私有数据或缓存

```typescript
let obj: any = { name: '小满zs' }
let aahph: any = obj
let wmap: WeakMap<object, string> = new WeakMap()

wmap.set(obj, '爱安徽潘慧')

obj = null    // 引用 -1
aahph = null  // 引用 -1，对象可被 GC 回收
// wmap 中的条目也会随之消失
```

### WeakSet

- 成员必须是**对象**
- 成员是**弱引用**
- **不能遍历**，**不能获取大小**
- 适合存储对象的临时标记

---

## 对比速查

| 特性 | Set | WeakSet | Map | WeakMap |
| --- | --- | --- | --- | --- |
| 成员/键类型 | 任意 | 对象 | 任意 | 对象 |
| 可遍历 | ✅ | ❌ | ✅ | ❌ |
| 有 size | ✅ | ❌ | ✅ | ❌ |
| 弱引用 | ❌ | ✅ | ❌ | ✅ |
| 垃圾回收 | 阻止 | 不阻止 | 阻止 | 不阻止 |

---

## 口诀总结

> **Set 去重唯一值，Map 任意类型作键，比 Object 更灵活。**
> **Weak 弱引用不计数，GC 自动回收不阻止。**
> **Weak 不能遍历不能取 size，适合存对象的临时数据。**
> **高频增删用 Map/Set，对象缓存用 WeakMap/WeakSet。**

---


# Proxy & Reflect

> Proxy 是 ES6 新增的对象拦截器，Vue3 响应式的核心原理。Reflect 配合 Proxy 使用。

---

## Proxy 基础

`Proxy` 对象用于创建一个对象的代理，拦截基本操作（属性查找、赋值、枚举、函数调用等）。

```typescript
new Proxy(target, handler)
```

| 参数 | 含义 |
| --- | --- |
| `target` | 被代理的目标对象 |
| `handler` | 定义拦截行为的对象（陷阱函数） |

### 常用陷阱函数

| 陷阱 | 触发时机 | 对应 Reflect 方法 |
| --- | --- | --- |
| `get(target, prop, receiver)` | 读取属性 | `Reflect.get()` |
| `set(target, prop, value, receiver)` | 设置属性 | `Reflect.set()` |
| `has(target, prop)` | `in` 操作符 | `Reflect.has()` |
| `deleteProperty(target, prop)` | `delete` 操作符 | `Reflect.deleteProperty()` |
| `apply(target, thisArg, args)` | 函数调用 | `Reflect.apply()` |
| `construct(target, args)` | `new` 操作符 | `Reflect.construct()` |

---

## Reflect

`Reflect` 不是构造函数，所有属性和方法都是静态的（类似 `Math`）。

```typescript
Reflect.get(target, name, receiver)   // 查找并返回 target 的 name 属性
Reflect.set(target, name, value, receiver)  // 设置 target 的 name 属性
```

---

## 基础示例：属性访问日志

```typescript
type Person = {
  name: string
  age: number
  text: string
}

const proxy = (object: any, key: any) => {
  return new Proxy(object, {
    get(target, prop, receiver) {
      console.log(`get key======>${key}`);
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      console.log(`set key======>${key}`);
      return Reflect.set(target, prop, value, receiver)
    }
  })
}

const logAccess = (object: Person, key: 'name' | 'age' | 'text') => {
  return proxy(object, key)
}

let man = logAccess({ name: "小满", age: 20, text: "我的很小" }, 'age')
man.age = 30  // set key======>age
```

---

## 泛型 + keyof 优化

```typescript
const logAccess = <T>(object: T, key: keyof T): T => {
  return proxy(object, key)
}

let man = logAccess({ name: "小满", age: 20, text: "我的很小" }, 'age')
let man2 = logAccess({ id: 1, name: "小满2" }, 'name')
```

---

## 实战：简单实现 MobX 观察者模式

```typescript
const list: Set<Function> = new Set()

const autorun = (cb: Function) => {
  if (cb) {
    list.add(cb)
  }
}

const observable = <T extends object>(params: T) => {
  return new Proxy(params, {
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      list.forEach(fn => fn())  // 数据变化时，执行所有观察者
      return result
    }
  })
}

const person = observable({ name: "小满", attr: "威猛先生" })

autorun(() => {
  console.log('我变化了')
})

person.attr = '威猛个捶捶'  // 触发 autorun 回调
```

---

## Proxy vs Object.defineProperty

| 特性 | Proxy | Object.defineProperty |
| --- | --- | --- |
| 拦截范围 | 13 种操作（get/set/has/delete...） | 只能 get/set |
| 新增属性 | 自动拦截 | 需要手动处理 |
| 数组变化 | 自动拦截 | 需要重写数组方法 |
| 性能 | 惰性代理，按需触发 | 初始化时全部递归 |
| 兼容性 | ES6+ | ES5 |
| Vue 版本 | Vue3 | Vue2 |

---

## 口诀总结

> **Proxy 是拦截器，`new Proxy(target, handler)` 创建代理。**
> **`get` 读 `set` 写，`Reflect` 配对用，保持默认行为不丢失。**
> **`keyof T` 约束属性名，泛型代理更安全。**
> **观察者模式：`Set` 存回调，`set` 陷阱里遍历执行，数据变自动触发。**
> **Vue3 用 Proxy 替代 Vue2 的 `defineProperty`，支持新增属性和数组。**

---


# 泛型工具类型（上）

> 泛型工具是一组预定义的泛型类型和操作符，用于操作和转换类型。

---

## Partial & Required

### Partial（可选）

将类型的所有属性变为**可选**。

```typescript
interface User {
  name: string;
  age: number;
}

type test = Partial<User>
// { name?: string; age?: number; }

// 原理
type CustomPartial<T, K extends keyof T> = {
  [P in K]?: T[P]
}
```

### Required（必选）

将类型的所有属性变为**必选**。

```typescript
interface User {
  name?: string;
  age?: number;
}

type test = Required<User>
// { name: string; age: number; }

// 原理：-? 移除可选修饰符
type CustomRequired<T> = {
  [P in keyof T]-?: T[P]
}
```

---

## Pick & Exclude

### Pick（选取）

从类型中**选取**指定的属性。

```typescript
interface User {
  name?: string;
  age?: number;
}

type test = Pick<User, 'age'>
// { age?: number }

// 原理
type CustomPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Exclude（排除）

从联合类型中**排除**指定的成员。

```typescript
type test = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
// 'c'

// 原理：never 在联合类型中会被忽略
type CustomExclude<T, K> = T extends K ? never : T
```

---

## Omit（排除属性）

创建一个新类型，从原始类型中**排除**指定的属性。

```typescript
interface User {
  address?: string;
  name?: string;
  age?: number;
}

type test = Omit<User, 'age'>
// { address?: string; name?: string }

// 原理：Pick + Exclude 组合
type CustomOmit<T, K> = Pick<T, Exclude<keyof T, K>>
```

---

## 工具类型关系图

```
Partial   → 所有属性变可选    [+?]
Required  → 所有属性变必选    [-?]
Pick      → 选取指定属性      [K in keyof T]
Exclude   → 排除联合成员      [never]
Omit      → 排除指定属性      [Pick + Exclude]
```

---

## 口诀总结

> **`Partial` 加问号，`Required` 减问号。**
> **`Pick` 选属性，`Exclude` 排成员。**
> **`Omit` 是组合技：`Pick<T, Exclude<keyof T, K>>`。**
> **`never` 在联合类型中自动消失，这是 Exclude 的核心。**

---


# 泛型工具类型（下）

> Record、Readonly、ReturnType 等进阶工具类型。

---

## Record

`Record<K, T>` 接受两个泛型参数：
- **K**：对象的属性名（联合类型）
- **T**：对象属性的类型

```typescript
type Key = "c" | "x" | "k"
type Value = '唱' | '跳' | 'rap' | '篮球'

let obj: Record<Key, Value> = {
  'c': '唱',
  "x": '跳',
  "k": 'rap'
}
```

### Record 源码

```typescript
type CustomRecord<K extends keyof any, T> = {
  [P in K]: T
}
```

> `keyof any` 返回 `string | number | symbol`，正好是对象 key 允许的所有类型。

### 嵌套约束

```typescript
let obj: Record<Key, Record<Key, Value>> = {
  'c': { 'c': '唱', 'x': '跳', 'k': 'rap' },
  "x": { 'c': '唱', 'x': '跳', 'k': 'rap' },
  "k": { 'c': '唱', 'x': '跳', 'k': 'rap' }
}
```

---

## Readonly

将类型的所有属性变为**只读**。

```typescript
interface User {
  name: string
  age: number
}

type ReadonlyUser = Readonly<User>
// { readonly name: string; readonly age: number }

// 原理
type CustomReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

const user: ReadonlyUser = { name: "小满", age: 20 }
user.name = "大满"  // ❌ Cannot assign to 'name' because it is a read-only property
```

---

## ReturnType

提取函数的**返回值类型**。

```typescript
const fn = () => [1, 2, 3, 'sad']

type num = ReturnType<typeof fn>
// (string | number)[]
```

### ReturnType 源码

```typescript
type CustomFn<F extends Function> = F extends (...args: any[]) => infer Res ? Res : never
```

> 使用 `infer` 推断返回值类型，匹配成功返回 `Res`，否则返回 `never`。

---

## 工具类型总览

| 工具类型 | 作用 | 原理关键词 |
| --- | --- | --- |
| `Partial<T>` | 全部可选 | `+?` |
| `Required<T>` | 全部必选 | `-?` |
| `Readonly<T>` | 全部只读 | `readonly` |
| `Pick<T, K>` | 选取属性 | `in K` |
| `Omit<T, K>` | 排除属性 | `Pick + Exclude` |
| `Exclude<T, U>` | 排除联合成员 | `never` |
| `Extract<T, U>` | 提取联合成员 | `条件类型` |
| `Record<K, T>` | 键值对约束 | `keyof any` |
| `ReturnType<F>` | 提取返回类型 | `infer` |
| `NonNullable<T>` | 排除 null/undefined | `never` |

---

## 口诀总结

> **`Record` 约束键值对，`keyof any` 限 key 类型。**
> **`Readonly` 加 `readonly`，`ReturnType` 用 `infer` 提取返回值。**
> **工具类型十兄弟，`Partial` `Required` `Readonly` 三修饰，`Pick` `Omit` `Record` 三构造，`Exclude` `Extract` `NonNullable` 三过滤，`ReturnType` 推返回。**

---


# infer 类型推断

> `infer` 是 TypeScript 新增的关键字，用于在条件类型中推导泛型参数。`infer` 声明只能出现在 `extends` 子语句中。

---

## 基础用法：获取 Promise 返回值

```typescript
interface User {
  name: string
  age: number
}

type Result = Promise<User>

type PromiseRes<T> = T extends Promise<infer R> ? R : never

type r = PromiseRes<Result>  // User
```

---

## 递归处理多层嵌套

遇到 `Promise<Promise<Promise<User>>>` 多层嵌套时，用递归逐层剥离：

```typescript
type Result = Promise<Promise<Promise<User>>>

type PromiseRes<T> = T extends Promise<infer R> ? PromiseRes<R> : T

type r = PromiseRes<Result>  // User
```

---

## infer 的协变

当同一个 `infer` 变量出现在多个位置时，产生**协变**，返回**联合类型**。

```typescript
let obj = {
  name: '小满',
  age: 123
}

// 不同变量 → 元组
type ProtKey<T> = T extends { name: infer N, age: infer A } ? [N, A] : T
type res = ProtKey<typeof obj>  // [string, number]

// 同一个变量 → 联合类型（协变）
type ProtKey2<T> = T extends { name: infer U, age: infer U } ? U : T
type res2 = ProtKey2<typeof obj>  // string | number
```

---

## infer 的逆变

在函数参数位置上，同一个 `infer` 变量的多个候选类型会被推断为**交叉类型**。

```typescript
type FnType<T> = T extends {
  a: (args: infer U) => void
  b: (args: infer U) => void
} ? U : never

type T = FnType<{
  a: (args: number) => void
  b: (args: string) => void
}>

// 结果：number & string → never（不可能同时是 number 又是 string）
```

---

## 协变 vs 逆变 总结

| 位置 | 同一 infer 变量的多个候选 | 结果 |
| --- | --- | --- |
| 协变（属性位置） | 多个候选类型 | **联合类型** `\|` |
| 逆变（函数参数位置） | 多个候选类型 | **交叉类型** `&` |

---

## 口诀总结

> **`infer` 是占位符，只能在 `extends` 里用，用来"抓住"推断出的类型。**
> **属性位置是协变，多个候选变联合 `|`。**
> **函数参数是逆变，多个候选变交叉 `&`。**
> **多层嵌套用递归，`infer R` 逐层剥洋葱。**

---


# infer 类型提取

> 用 `infer` 实现元组/数组的头部、尾部提取，以及 Shift、Pop 操作。

---

## 1. 提取头部元素 First

```typescript
type Arr = ['a', 'b', 'c']

type First<T extends any[]> = T extends [infer First, ...any[]] ? First : []

type a = First<Arr>  // 'a'
```

**思路：** `T` 约束为数组，用 `infer First` 抓住第一个元素，后面 `...any[]` 匹配剩余任意元素。

---

## 2. 提取尾部元素 Last

```typescript
type Arr = ['a', 'b', 'c']

type Last<T extends any[]> = T extends [...any[], infer Last] ? Last : []

type c = Last<Arr>  // 'c'
```

**思路：** 反过来，`...any[]` 匹配前面任意元素，`infer Last` 抓住最后一个。

---

## 3. 剔除第一个元素 Shift

```typescript
type Arr = ['a', 'b', 'c']

type Shift<T extends any[]> = T extends [unknown, ...infer Rest] ? Rest : []

type a = Shift<Arr>  // ['b', 'c']
```

**思路：** 第一个位置用 `unknown` 占位丢弃，`infer Rest` 抓住剩余元素。

---

## 4. 剔除尾部元素 Pop

```typescript
type Arr = ['a', 'b', 'c']

type Pop<T extends any[]> = T extends [...infer Rest, unknown] ? Rest : []

type a = Pop<Arr>  // ['a', 'b']
```

**思路：** 反过来，`infer Rest` 抓住前面元素，最后用 `unknown` 占位丢弃。

---

## 对比总结

| 操作 | 模式 | 结果 |
| --- | --- | --- |
| First（取头部） | `[infer F, ...any[]]` | 第一个元素 |
| Last（取尾部） | `[...any[], infer L]` | 最后一个元素 |
| Shift（去头部） | `[unknown, ...infer R]` | 去掉第一个的剩余数组 |
| Pop（去尾部） | `[...infer R, unknown]` | 去掉最后一个的剩余数组 |

---

## 口诀总结

> **`infer` 抓元素，`unknown` 丢元素。**
> **头部在左 `[infer F, ...any[]]`，尾部在右 `[...any[], infer L]`。**
> **Shift 左丢右抓，Pop 右丢左抓，位置决定一切。**

---


# infer 递归

> 用 `infer` + 递归实现元组反转等高级类型操作。

---

## 实战：元组反转

将 `[1, 2, 3, 4]` 变成 `[4, 3, 2, 1]`。

```typescript
type Arr = [1, 2, 3, 4]

type ReveArr<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...ReveArr<Rest>, First]
  : T

type Res = ReveArr<Arr>  // [4, 3, 2, 1]
```

### 思路解析

1. **泛型约束**：`T extends any[]` 约束只能传入数组
2. **提取头部**：`infer First` 抓住第一个元素
3. **剩余部分**：`infer Rest` 抓住剩余数组
4. **递归调用**：`ReveArr<Rest>` 对剩余部分继续反转
5. **拼接结果**：`[...ReveArr<Rest>, First]` 把第一个放到末尾
6. **终止条件**：匹配不到时返回原数组 `T`（空数组）

### 递归过程

```
ReveArr<[1, 2, 3, 4]>
→ [...ReveArr<[2, 3, 4]>, 1]
→ [...[...ReveArr<[3, 4]>, 2], 1]
→ [...[...[...ReveArr<[4]>, 3], 2], 1]
→ [...[...[...[...ReveArr<[]>, 4], 3], 2], 1]
→ [...[...[...[..., 4], 3], 2], 1]
→ [4, 3, 2, 1]
```

---

## infer 递归模式总结

| 模式 | 写法 | 用途 |
| --- | --- | --- |
| 头部提取 + 递归 | `[infer F, ...infer R] ? [...递归<R>, F]` | 反转 |
| 尾部提取 + 递归 | `[...infer R, infer L] ? [L, ...递归<R>]` | 反转（另一种写法） |
| 逐层剥离 | `T extends Promise<infer R> ? 递归<R> : T` | 深层 Promise 解包 |
| 条件过滤 | `T extends [infer F, ...infer R] ? F extends X ? ... : ...` | 按条件过滤元素 |

---

## 口诀总结

> **递归三要素：提取 `infer`、递归调用、终止条件。**
> **`[infer First, ...infer Rest]` 拆头存尾，`[...递归, First]` 头放末尾实现反转。**
> **终止条件：匹配不到时返回原类型（空数组/非 Promise 等）。**
> **infer 递归 = 类型系统的循环，剥洋葱一层一层来。**

---


# 类型守卫

> 类型守卫（Type Guards）是在运行时检查类型的机制，用于缩小变量的类型范围。

---

## typeof 类型收缩

```typescript
const isString = (str: any) => {
  return typeof str === 'string'
}
```

`typeof` 只能返回：`"string"`、`"number"`、`"boolean"`、`"symbol"`、`"undefined"`、`"object"`、`"function"`。

> ⚠️ `typeof null` 和 `typeof []` 都返回 `"object"`，无法区分复杂类型。

---

## instanceof

检查对象是否是某个类的实例，通过原型链判断。

```typescript
const isArr = (value: unknown) => {
  if (value instanceof Array) {
    value.length  // ✅ 类型被收窄为 Array
  }
}

class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

const person = new Person("Alice")
console.log(person instanceof Person)  // true
```

> ⚠️ `instanceof` 无法检查基本类型，也无法检查字面量创建的对象。

---

## typeof vs instanceof 对比

| 特性 | typeof | instanceof |
| --- | --- | --- |
| 检查对象 | 基本类型 | 类的实例 |
| 返回值 | `"string"` 等字符串 | `boolean` |
| 原型链 | 不检查 | 检查 |
| 适用场景 | `string`/`number`/`boolean`/`function` | 自定义类 |

---

## 自定义类型守卫（类型谓词）

当内置守卫不够用时，用 **`参数 is 类型`** 语法自定义守卫：

```typescript
const isString = (str: any): str is string => typeof str === 'string'
const isNumber = (num: any): num is number => typeof num === 'number'
const isFn = (fn: any): fn is Function => typeof fn === 'function'
const isObj = (obj: any): obj is object => ({}).toString.call(obj) === '[object Object]'
```

> `str is string` 是**类型谓词**，告诉 TS：当函数返回 `true` 时，`str` 的类型被收窄为 `string`。

---

## 实战：智能处理任意类型

实现一个函数：如果是对象就遍历属性，number 取两位小数，string 去除空格，function 就执行。

```typescript
const isString = (str: any): str is string => typeof str === 'string'
const isNumber = (num: any): num is number => typeof num === 'number'
const isFn = (fn: any): fn is Function => typeof fn === 'function'
const isObj = (obj: any): obj is object => ({}).toString.call(obj) === '[object Object]'

const fn = (data: any) => {
  if (isObj(data)) {
    Object.keys(data).forEach(key => {
      let value = data[key]
      if (isString(value)) data[key] = value.trim()
      if (isNumber(value)) data[key] = value.toFixed(2)
      if (isFn(value)) data[key]()  // 注意：用 data[key]() 而非 value()，保持 this 指向
    })
  }
}

const obj = {
  a: 100.22222,
  b: '  test  ',
  c: function () {
    console.log(this)
    return this.a
  }
}

fn(obj)
// obj.a → "100.22"
// obj.b → "test"
// obj.c → 执行并输出 this.a
```

> ⚠️ 函数调用要用 `data[key]()` 而非 `value()`，否则 `this` 会指向全局对象。

---

## 口诀总结

> **`typeof` 查基本类型，`instanceof` 查类实例。**
> **自定义守卫用 `参数 is 类型`，告诉 TS 缩小类型范围。**
> **类型谓词 = 代码提示神器，收窄类型后自动补全。**
> **调用对象方法用 `data[key]()`，保持 `this` 指向不变。**

---


# 类型兼容性

> 类型兼容性用于确定一个类型是否能赋值给其他类型。TS 基于**结构类型**（形状），A 要兼容 B，A 至少具有 B 相同的属性。

---

## 1. 协变（鸭子类型）

> 一只鸟走路像鸭子，游泳像鸭子，做什么都像，那么这只鸟就是鸭子类型。

**规则：不能少，可以多。**

```typescript
interface A {
  name: string
  age: number
}

interface B {
  name: string
  age: number
  sex: string
}

let a: A = { name: "老墨我想吃鱼了", age: 33 }
let b: B = { name: "老墨我不想吃鱼", age: 33, sex: "女" }

a = b  // ✅ B 有 A 的所有属性，可以赋值
// b = a  // ❌ A 缺少 sex，不能赋值给 B
```

B 充当 A 的**子类型**，子类型属性 ≥ 父类型即可赋值。

---

## 2. 逆变

逆变一般发生在**函数参数**上。

```typescript
let fna = (params: A) => {}
let fnb = (params: B) => {}

fna = fnb  // ❌ 不安全：fna 调用者可能传 A（没有 sex）
fnb = fna  // ✅ 安全：fnb 调用者传 B，fna 完全能处理
```

**为什么？**
- `fnb = fna`：fnb 的调用者会传 B（有 sex），而 fna 只用 name 和 age，安全
- `fna = fnb`：fna 的调用者可能传 A（没有 sex），而 fnb 需要 sex，不安全

**参数类型方向相反：子类型赋值给父类型（参数多的赋值给参数少的）。**

---

## 3. 双向协变

在 `tsconfig.json` 中设置 `"strictFunctionTypes": false`，则允许双向赋值：

```typescript
fna = fnb  // ✅ 也允许了
fnb = fna  // ✅
```

> ⚠️ 双向协变降低了类型安全性，一般不建议开启。

---

## 对比总结

| 场景 | 规则 | 方向 |
| --- | --- | --- |
| 对象赋值（协变） | 属性不能少，可以多 | 子 → 父 |
| 函数参数（逆变） | 参数类型方向相反 | 父 → 子 |
| 双向协变 | 随便赋值 | 双向 |

---

## 口诀总结

> **协变 = 鸭子类型，属性不能少可以多，子类型赋值给父类型。**
> **逆变 = 函数参数反方向，参数多的赋值给参数少的。**
> **双向协变 = `strictFunctionTypes: false`，随便赋值但不安全。**
> **记住：对象看属性（协变），函数看参数（逆变）。**

---


# 实战：封装 LocalStorage 支持过期时间

> localStorage 本身没有过期机制，用 TypeScript 二次封装实现类似 cookie 的有效期功能。

---

## 实现思路

存储时设置过期时间，数据格式化统一校验；读取时获取当前时间判断是否过期，过期则删除。

---

## 目录结构

```
src/
  ├── enum/index.ts    # 枚举定义
  ├── type/index.ts    # 类型定义
  └── index.ts         # 主逻辑实现
rollup.js              # 打包配置
```

---

## 1. 枚举定义

```typescript
// 字典：expire = 过期时间 key，permanent = 永久不过期
export enum Dictionaries {
  expire = '__expire__',
  permanent = 'permanent'
}
```

---

## 2. 类型定义

```typescript
import { Dictionaries } from "../enum"

export type Key = string
export type expire = Dictionaries.permanent | number

export interface Data<T> {
  value: T
  [Dictionaries.expire]: Dictionaries.expire | number
}

export interface Result<T> {
  message: string
  value: T | null
}

export interface StorageCls {
  set: <T>(key: Key, value: T, expire: expire) => void
  get: <T>(key: Key) => Result<T | null>
  remove: (key: Key) => void
  clear: () => void
}
```

---

## 3. 主逻辑实现

```typescript
import { StorageCls, Key, expire, Data, Result } from "./type"
import { Dictionaries } from "./enum"

export class Storage implements StorageCls {
  // 存储：key + value + 过期时间（默认永久）
  public set<T = any>(key: Key, value: T, expire: expire = Dictionaries.permanent) {
    const data = {
      value,
      [Dictionaries.expire]: expire
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  // 读取：校验是否过期
  public get<T = any>(key: Key): Result<T | null> {
    const value = localStorage.getItem(key)
    if (value) {
      const obj: Data<T> = JSON.parse(value)
      const now = new Date().getTime()
      // 是数字类型且已过期 → 删除并提示
      if (typeof obj[Dictionaries.expire] == 'number' && obj[Dictionaries.expire] < now) {
        this.remove(key)
        return { message: `您的${key}已过期`, value: null }
      } else {
        return { message: "成功读取", value: obj.value }
      }
    } else {
      console.warn('key值无效')
      return { message: `key值无效`, value: null }
    }
  }

  public remove(key: Key) {
    localStorage.removeItem(key)
  }

  public clear() {
    localStorage.clear()
  }
}
```

---

## 4. 使用示例

```typescript
import { Storage } from './dist/index.js'

const sl = new Storage()

// 5 秒后过期
sl.set('a', 123, new Date().getTime() + 5000)

setInterval(() => {
  const a = sl.get('a')
  console.log(a)
}, 500)

// 5秒内：{ message: "成功读取", value: 123 }
// 5秒后：{ message: "您的a已过期", value: null }
```

---

## 5. Rollup 打包配置

```javascript
import ts from 'rollup-plugin-typescript2'
import path from 'path'
import { fileURLToPath } from 'url'

const metaUrl = fileURLToPath(import.meta.url)
const dirName = path.dirname(metaUrl)

export default {
  input: './src/index.ts',
  output: {
    file: path.resolve(dirName, './dist/index.js')
  },
  plugins: [ts()]
}
```

---

## 关键知识点

| 知识点 | 说明 |
| --- | --- |
| 枚举 | 定义字典常量 |
| 泛型 | `<T>` 支持任意类型存储 |
| 接口约束 | `StorageCls` 约束 class 方法 |
| 格式化存储 | `{ value, expire }` 统一结构 |
| 时间判断 | `Date().getTime()` 比较过期时间 |

---

## 口诀总结

> **localStorage 永不过期，封装后加 `expire` 字段。**
> **存储格式化 `{ value, expire }`，读取时 `getTime()` 比大小。**
> **过期自动删除返回 null，枚举 + 泛型 + 接口三件套。**

---


# 加餐：object、Object、{} 的区别

> 这三个类型容易混淆，本质区别在于包含范围不同。

---

## 1. Object（大写 O）

原型链顶层就是 `Object`，值类型和引用类型最终都指向它，**包含所有类型**。

```typescript
let a: Object = '123'    // ✅
let b: Object = 123      // ✅
let c: Object = true     // ✅
let d: Object = {}       // ✅
let e: Object = []       // ✅
let f: Object = () => 123 // ✅
```

> 由 `Object` 接口（定义原型属性）和 `ObjectConstructor` 接口（定义 `Object.create()` 等）定义。

---

## 2. object（小写 o）

代表**所有非值类型**（引用类型），常用于泛型约束。

```typescript
let o: object = {}           // ✅
let o1: object = []          // ✅
let o2: object = () => 123   // ✅
let b: object = '123'        // ❌
let c: object = 123          // ❌
```

---

## 3. {}（空对象类型）

可以理解为 `new Object()`，和大写 `Object` 基本一样，**包含所有类型**。

```typescript
let a1: {} = { name: 1 }    // ✅
let a2: {} = () => 123      // ✅
let a3: {} = 123             // ✅
```

> ⚠️ 字面量模式下不能修改值（只能读取继承的属性和方法）。

---

## 对比总结

| 类型 | 包含范围 | 能赋值基本类型 | 用途 |
| --- | --- | --- | --- |
| `Object`（大写） | 所有类型 | ✅ | 一般不直接用 |
| `object`（小写） | 仅引用类型 | ❌ | 泛型约束 `extends object` |
| `{}` | 所有类型 | ✅ | 空对象字面量 |

---

## 口诀总结

> **大写 `Object` 全包含，小写 `object` 只引用，`{}` 等同 `new Object()`。**
> **泛型约束用小写 `object`，日常开发少用这三个，用具体类型更安全。**

---

<!-- lazynote:end -->
