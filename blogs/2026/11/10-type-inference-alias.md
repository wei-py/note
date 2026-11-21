---
title: 类型推论 | 类型别名
created: 2026-06-13
tags:
  - typescript
  - frontend
  - guide
  - cheatsheet
summary: TypeScript 类型推论、类型别名与条件类型的速查笔记
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: ba948b28-30dc-4748-b44b-963bdeb8b556
date: 2026-11-10
source: 10-type-inference-alias.md
---

<!-- lazynote:body -->
---
title: 类型推论 | 类型别名
created: '2026-06-13'
tags:
  - typescript
  - frontend
  - guide
  - cheatsheet
summary: TypeScript 类型推论、类型别名与条件类型的速查笔记
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 类型推论 | 类型别名

| 知识点   | 核心含义                                        |
| -------- | ----------------------------------------------- |
| 类型推论 | TypeScript 根据初始值和上下文自动推断类型       |
| 类型别名 | 使用 `type` 给任意类型表达式命名                |
| 条件类型 | 使用 `T extends U ? X : Y` 根据类型关系选择结果 |

## 口诀

> **能推就推不手写，`type` 起名随处用，三目判断是条件类型。**

<!-- lazynote:end -->
