---
title: TypeScript 类型与配置速查表
created: 2026-06-13
tags:
  - typescript
  - frontend
  - guide
  - config
  - cheatsheet
summary: 涵盖 TypeScript 常用类型、泛型、枚举及 tsconfig 配置的速查手册
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 8a0b3322-aa55-4f19-ae0e-d1dcafc56bf0
date: 2026-11-10
source: ts.md
---

<!-- lazynote:body -->
---
title: TypeScript 类型与配置速查表
created: '2026-06-13'
tags:
  - typescript
  - frontend
  - guide
  - config
  - cheatsheet
summary: 涵盖 TypeScript 常用类型、泛型、枚举及 tsconfig 配置的速查手册
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# TypeScript 类型与配置速查表

> 从基础类型到工程配置，一个文件一个章节，逐章掌握。

---

## 📚 目录

| 章节 | 主题 | 核心要点 |
| --- | --- | --- |
| [01 - any vs unknown](./01-any-unknown.md) | 基础类型 | `any` 放飞，`unknown` 先检查 |
| [02 - interface](./02-interface.md) | 接口 | 必选只读加函数，继承合并任意补 |
| [03 - 数组类型](./03-array.md) | 数组 | 方括号、泛型、不定参数 |
| [04 - 函数扩展](./04-function.md) | 函数 | 参数返回值、可选默认剩余、重载 |
| [05 - 类型断言/联合/交叉](./05-assertion-union-intersection.md) | 类型运算 | `|` 联合、`&` 交叉、`as` 断言 |
| [06 - 内置对象](./06-built-in-objects.md) | 内置类型 | Date、RegExp、DOM、Promise |
| [07 - Class 类](./07-class.md) | 面向对象 | 继承实现、四修饰符 |
| [08 - 元组类型](./08-tuple.md) | 元组 | 定长有序、只读具名、as const |
| [09 - 枚举类型](./09-enum.md) | 枚举 | 数字/字符串/const enum |
| [10 - 类型推论/别名](./10-type-inference-alias.md) | 类型推导 | 推论、type 别名、条件类型 |
| [11 - never 类型](./11-never.md) | 特殊类型 | void vs never |
| [12 - symbol 类型](./12-symbol.md) | Symbol | 唯一键、遍历、iterator |
| [13 - 泛型](./13-generics.md) | 泛型 | 函数/接口/类泛型、约束 |
| [14 - tsconfig.json](./14-tsconfig.md) | 工程配置 | 常用配置 + 完整参考 |
| [15 - namespace](./15-namespace.md) | 命名空间 | 定义、嵌套、合并、ES Module 替代 |
| [16 - 模块解析](./16-module-resolution.md) | 模块系统 | CommonJS/AMD/UMD、导入导出 |
| [17 - 声明文件 .d.ts](./17-declaration-files.md) | 声明文件 | declare、手写模板、三斜线指令 |
| [18 - Mixins 混入](./18-mixins.md) | 混入 | 对象混入、类混入、多继承替代方案 |
| [19 - 装饰器 Decorator](./19-decorator.md) | 装饰器 | 类/方法/属性/参数装饰器、装饰器工厂、元数据 |
| [20 - Webpack 构建 TS+Vue3](./20-webpack-ts-vue3.md) | 工程化 | Webpack + TS + Vue3 完整配置 |
| [21 - 实战：发布订阅模式](./21-pub-sub-pattern.md) | 设计模式 | on/emit/off/once 完整实现 |
| [22 - Set / Map / WeakSet / WeakMap](./22-set-map.md) | 数据结构 | Set 去重、Map 任意键、Weak 弱引用 |
| [23 - Proxy & Reflect](./23-proxy-reflect.md) | 进阶 | 对象代理、陷阱函数、观察者模式实现 |
| [24 - 泛型工具（上）](./24-utility-types-1.md) | 工具类型 | Partial/Required/Pick/Exclude/Omit |
| [25 - 泛型工具（下）](./25-utility-types-2.md) | 工具类型 | Record/Readonly/ReturnType |
| [26 - infer 类型推断](./26-infer.md) | 进阶 | 协变/逆变、递归推断、Promise 返回值提取 |
| [27 - infer 类型提取](./27-infer-extract.md) | 进阶 | First/Last/Shift/Pop 元组操作 |
| [28 - infer 递归](./28-infer-recursive.md) | 进阶 | 元组反转、递归类型推断 |
| [29 - 类型守卫](./29-type-guards.md) | 进阶 | typeof/instanceof/自定义守卫/类型谓词 |
| [30 - 类型兼容性](./30-type-compatibility.md) | 进阶 | 协变/逆变/双向协变/鸭子类型 |
| [31 - 封装 LocalStorage](./31-localstorage-expire.md) | 实战 | 泛型封装、过期时间、Rollup 打包 |
| [32 - object/Object/{} 区别](./32-object-vs-Object.md) | 加餐 | 大小写 Object、空对象类型辨析 |

---

## 🧭 学习路线建议

```
基础类型 (01~05)
    ↓
复合类型 (06~12)
    ↓
泛型 (13)
    ↓
工程配置 (14)
    ↓
模块与命名空间 (15~16)
    ↓
声明文件 (17)
    ↓
Mixins 混入 (18)
    ↓
装饰器 Decorator (19)
    ↓
Webpack 构建 TS+Vue3 (20)
    ↓
实战：发布订阅模式 (21)
    ↓
Set / Map / WeakSet / WeakMap (22)
    ↓
Proxy & Reflect (23)
    ↓
泛型工具（上）(24)
    ↓
泛型工具（下）(25)
    ↓
infer 类型推断 (26)
    ↓
infer 类型提取 (27)
    ↓
infer 递归 (28)
    ↓
类型守卫 (29)
    ↓
类型兼容性 (30)
    ↓
封装 LocalStorage (31)
    ↓
object/Object/{} 区别 (32)
```

<!-- lazynote:end -->
