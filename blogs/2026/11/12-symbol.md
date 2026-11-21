---
title: symbol 类型
created: 2026-06-13
tags:
  - typescript
  - guide
  - cheatsheet
  - frontend
summary: 详解Symbol类型的唯一性、属性键及迭代器协议
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 0f1650f2-b634-4f1a-b7fb-87cfb2532730
date: 2026-11-10
source: 12-symbol.md
---

<!-- lazynote:body -->
---
title: symbol 类型
created: '2026-06-13'
tags:
  - typescript
  - guide
  - cheatsheet
  - frontend
summary: 详解Symbol类型的唯一性、属性键及迭代器协议
cover: /assets/default-cover.jpg
updated: '2026-06-13'
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

<!-- lazynote:end -->
