---
title: 数组类型
created: 2026-06-13
tags:
  - typescript
  - frontend
  - cheatsheet
  - guide
summary: TypeScript 数组类型声明方式与记忆口诀
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 1f5352ac-afe9-4288-a914-790175b942b8
date: 2026-11-10
source: 03-array.md
---

<!-- lazynote:body -->
---
title: 数组类型
created: '2026-06-13'
tags:
  - typescript
  - frontend
  - cheatsheet
  - guide
summary: TypeScript 数组类型声明方式与记忆口诀
cover: /assets/default-cover.jpg
updated: '2026-06-13'
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

<!-- lazynote:end -->
