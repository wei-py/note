---
title: never 类型
created: 2026-06-13
tags:
  - typescript
  - guide
  - cheatsheet
  - frontend
summary: 详解TypeScript中never类型的含义及与void的区别
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: cde19940-1b6a-43cf-a460-4d1c22e7bdd4
date: 2026-11-10
source: 11-never.md
---

<!-- lazynote:body -->
---
title: never 类型
created: '2026-06-13'
tags:
  - typescript
  - guide
  - cheatsheet
  - frontend
summary: 详解TypeScript中never类型的含义及与void的区别
cover: /assets/default-cover.jpg
updated: '2026-06-13'
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

<!-- lazynote:end -->
