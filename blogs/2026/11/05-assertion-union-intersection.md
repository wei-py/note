---
title: 类型断言 | 联合类型 | 交叉类型
created: 2026-06-13
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
summary: TypeScript 类型断言、联合类型与交叉类型的速查指南
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: f251c1d0-3257-4c87-b5e6-6be6bda8a649
date: 2026-11-10
source: 05-assertion-union-intersection.md
---

<!-- lazynote:body -->
---
title: 类型断言 | 联合类型 | 交叉类型
created: '2026-06-13'
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
summary: TypeScript 类型断言、联合类型与交叉类型的速查指南
cover: /assets/default-cover.jpg
updated: '2026-06-13'
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

<!-- lazynote:end -->
