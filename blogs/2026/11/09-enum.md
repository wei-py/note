---
title: 枚举类型
created: 2026-06-13
tags:
  - typescript
  - cheatsheet
  - guide
  - frontend
summary: TypeScript枚举类型速查表，涵盖数字枚举、字符串枚举、常量枚举及反向映射
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: ced454ae-f8bd-4da0-994c-3c830949074b
date: 2026-11-10
source: 09-enum.md
---

<!-- lazynote:body -->
---
title: 枚举类型
created: '2026-06-13'
tags:
  - typescript
  - cheatsheet
  - guide
  - frontend
summary: TypeScript枚举类型速查表，涵盖数字枚举、字符串枚举、常量枚举及反向映射
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 枚举类型

| 类型         | 示例                 | 特点                     |
| ------------ | -------------------- | ------------------------ |
| 数字枚举     | `Up, Down`           | 默认从 0 自动递增        |
| 指定数字枚举 | `Up = 1, Down`       | 后续继续递增             |
| 字符串枚举   | `Up = 'up'`          | 值可读、适合序列化       |
| 异构枚举     | 数字和字符串混用     | 允许，但通常不推荐       |
| 成员类型     | `value: Enum.Member` | 只能使用指定成员         |
| 普通枚举     | `enum E`             | 编译后通常存在运行时对象 |
| 常量枚举     | `const enum E`       | 通常被移除并内联         |
| 反向映射     | `Enum[0]`            | 只有数字枚举支持         |

## 口诀

> **数字自增字符串读，`const enum` 内联无运行时，反向映射仅数字。**

<!-- lazynote:end -->
