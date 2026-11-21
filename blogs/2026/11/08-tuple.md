---
title: 元组类型
created: 2026-06-13
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
summary: TypeScript 元组类型声明方式与记忆口诀
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 9c207919-7fe0-4045-a4e5-565aa4256108
date: 2026-11-10
source: 08-tuple.md
---

<!-- lazynote:body -->
---
title: 元组类型
created: '2026-06-13'
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
summary: TypeScript 元组类型声明方式与记忆口诀
cover: /assets/default-cover.jpg
updated: '2026-06-13'
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

<!-- lazynote:end -->
