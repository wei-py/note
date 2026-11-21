---
title: any vs unknown
created: 2026-06-13
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
summary: 比较TypeScript中any与unknown类型的差异与使用建议
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 453e559e-24cc-4a4f-a246-1219b9f84561
date: 2026-11-10
source: 01-any-unknown.md
---

<!-- lazynote:body -->
---
title: any vs unknown
created: '2026-06-13'
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
summary: 比较TypeScript中any与unknown类型的差异与使用建议
cover: /assets/default-cover.jpg
updated: '2026-06-13'
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

<!-- lazynote:end -->
