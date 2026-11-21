---
title: infer 类型推断
created: 2026-06-13
tags:
  - typescript
  - infer
  - generics
  - guide
  - frontend
summary: 详解 TypeScript infer 关键字在条件类型中的用法与协变逆变规则
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: f8b2197e-965b-4796-9d84-9d00bffd1424
date: 2026-11-10
source: 26-infer.md
---

<!-- lazynote:body -->
---
title: infer 类型推断
created: '2026-06-13'
tags:
  - typescript
  - infer
  - generics
  - guide
  - frontend
summary: 详解 TypeScript infer 关键字在条件类型中的用法与协变逆变规则
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# infer 类型推断

> `infer` 是 TypeScript 新增的关键字，用于在条件类型中推导泛型参数。`infer` 声明只能出现在 `extends` 子语句中。

---

## 基础用法：获取 Promise 返回值

```typescript
interface User {
  name: string
  age: number
}

type Result = Promise<User>

type PromiseRes<T> = T extends Promise<infer R> ? R : never

type r = PromiseRes<Result>  // User
```

---

## 递归处理多层嵌套

遇到 `Promise<Promise<Promise<User>>>` 多层嵌套时，用递归逐层剥离：

```typescript
type Result = Promise<Promise<Promise<User>>>

type PromiseRes<T> = T extends Promise<infer R> ? PromiseRes<R> : T

type r = PromiseRes<Result>  // User
```

---

## infer 的协变

当同一个 `infer` 变量出现在多个位置时，产生**协变**，返回**联合类型**。

```typescript
let obj = {
  name: '小满',
  age: 123
}

// 不同变量 → 元组
type ProtKey<T> = T extends { name: infer N, age: infer A } ? [N, A] : T
type res = ProtKey<typeof obj>  // [string, number]

// 同一个变量 → 联合类型（协变）
type ProtKey2<T> = T extends { name: infer U, age: infer U } ? U : T
type res2 = ProtKey2<typeof obj>  // string | number
```

---

## infer 的逆变

在函数参数位置上，同一个 `infer` 变量的多个候选类型会被推断为**交叉类型**。

```typescript
type FnType<T> = T extends {
  a: (args: infer U) => void
  b: (args: infer U) => void
} ? U : never

type T = FnType<{
  a: (args: number) => void
  b: (args: string) => void
}>

// 结果：number & string → never（不可能同时是 number 又是 string）
```

---

## 协变 vs 逆变 总结

| 位置 | 同一 infer 变量的多个候选 | 结果 |
| --- | --- | --- |
| 协变（属性位置） | 多个候选类型 | **联合类型** `\|` |
| 逆变（函数参数位置） | 多个候选类型 | **交叉类型** `&` |

---

## 口诀总结

> **`infer` 是占位符，只能在 `extends` 里用，用来"抓住"推断出的类型。**
> **属性位置是协变，多个候选变联合 `|`。**
> **函数参数是逆变，多个候选变交叉 `&`。**
> **多层嵌套用递归，`infer R` 逐层剥洋葱。**

<!-- lazynote:end -->
