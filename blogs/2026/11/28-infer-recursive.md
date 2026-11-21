---
title: infer 递归
created: 2026-06-13
tags:
  - typescript
  - generics
  - cheatsheet
  - guide
  - infer
  - recursion
summary: 详解 infer 递归实现 TypeScript 元组反转等高级类型
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 92a1c0b1-5375-4e3a-ae87-76e2c93a479b
date: 2026-11-10
source: 28-infer-recursive.md
---

<!-- lazynote:body -->
---
title: infer 递归
created: '2026-06-13'
tags:
  - typescript
  - generics
  - cheatsheet
  - guide
  - infer
  - recursion
summary: 详解 infer 递归实现 TypeScript 元组反转等高级类型
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# infer 递归

> 用 `infer` + 递归实现元组反转等高级类型操作。

---

## 实战：元组反转

将 `[1, 2, 3, 4]` 变成 `[4, 3, 2, 1]`。

```typescript
type Arr = [1, 2, 3, 4]

type ReveArr<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...ReveArr<Rest>, First]
  : T

type Res = ReveArr<Arr>  // [4, 3, 2, 1]
```

### 思路解析

1. **泛型约束**：`T extends any[]` 约束只能传入数组
2. **提取头部**：`infer First` 抓住第一个元素
3. **剩余部分**：`infer Rest` 抓住剩余数组
4. **递归调用**：`ReveArr<Rest>` 对剩余部分继续反转
5. **拼接结果**：`[...ReveArr<Rest>, First]` 把第一个放到末尾
6. **终止条件**：匹配不到时返回原数组 `T`（空数组）

### 递归过程

```
ReveArr<[1, 2, 3, 4]>
→ [...ReveArr<[2, 3, 4]>, 1]
→ [...[...ReveArr<[3, 4]>, 2], 1]
→ [...[...[...ReveArr<[4]>, 3], 2], 1]
→ [...[...[...[...ReveArr<[]>, 4], 3], 2], 1]
→ [...[...[...[..., 4], 3], 2], 1]
→ [4, 3, 2, 1]
```

---

## infer 递归模式总结

| 模式 | 写法 | 用途 |
| --- | --- | --- |
| 头部提取 + 递归 | `[infer F, ...infer R] ? [...递归<R>, F]` | 反转 |
| 尾部提取 + 递归 | `[...infer R, infer L] ? [L, ...递归<R>]` | 反转（另一种写法） |
| 逐层剥离 | `T extends Promise<infer R> ? 递归<R> : T` | 深层 Promise 解包 |
| 条件过滤 | `T extends [infer F, ...infer R] ? F extends X ? ... : ...` | 按条件过滤元素 |

---

## 口诀总结

> **递归三要素：提取 `infer`、递归调用、终止条件。**
> **`[infer First, ...infer Rest]` 拆头存尾，`[...递归, First]` 头放末尾实现反转。**
> **终止条件：匹配不到时返回原类型（空数组/非 Promise 等）。**
> **infer 递归 = 类型系统的循环，剥洋葱一层一层来。**

<!-- lazynote:end -->
