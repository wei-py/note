---
title: TypeScript 泛型速查表
created: 2026-06-13
tags:
  - typescript
  - generics
  - cheatsheet
  - frontend
  - guide
summary: TypeScript 泛型语法速查表，涵盖函数泛型、接口、约束与类泛型
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: b2a55307-1a05-4ce0-963d-d528d3248ee1
date: 2026-11-10
source: 13-generics.md
---

<!-- lazynote:body -->
---
title: TypeScript 泛型速查表
created: '2026-06-13'
tags:
  - typescript
  - generics
  - cheatsheet
  - frontend
  - guide
summary: TypeScript 泛型语法速查表，涵盖函数泛型、接口、约束与类泛型
cover: /assets/default-cover.jpg
updated: '2026-06-13'
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

<!-- lazynote:end -->
