---
title: interface 接口
created: 2026-06-13
tags:
  - typescript
  - cheatsheet
  - guide
  - frontend
summary: TypeScript 接口属性类型速查表及记忆口诀
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 0332815a-c5a4-4b60-97bc-d02d5d99d705
date: 2026-11-10
source: 02-interface.md
---

<!-- lazynote:body -->
---
title: interface 接口
created: '2026-06-13'
tags:
  - typescript
  - cheatsheet
  - guide
  - frontend
summary: TypeScript 接口属性类型速查表及记忆口诀
cover: /assets/default-cover.jpg
updated: '2026-06-13'
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

<!-- lazynote:end -->
