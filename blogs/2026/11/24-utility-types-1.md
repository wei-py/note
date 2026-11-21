---
title: 泛型工具类型（上）
created: 2026-06-13
tags:
  - typescript
  - generics
  - frontend
  - guide
  - cheatsheet
summary: 详解TypeScript内置泛型工具类型Partial、Required、Pick、Exclude和Omit的用法与原理
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 057a2256-dfcf-401c-bdc1-86f2950ad31f
date: 2026-11-10
source: 24-utility-types-1.md
---

<!-- lazynote:body -->
---
title: 泛型工具类型（上）
created: '2026-06-13'
tags:
  - typescript
  - generics
  - frontend
  - guide
  - cheatsheet
summary: 详解TypeScript内置泛型工具类型Partial、Required、Pick、Exclude和Omit的用法与原理
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 泛型工具类型（上）

> 泛型工具是一组预定义的泛型类型和操作符，用于操作和转换类型。

---

## Partial & Required

### Partial（可选）

将类型的所有属性变为**可选**。

```typescript
interface User {
  name: string;
  age: number;
}

type test = Partial<User>
// { name?: string; age?: number; }

// 原理
type CustomPartial<T, K extends keyof T> = {
  [P in K]?: T[P]
}
```

### Required（必选）

将类型的所有属性变为**必选**。

```typescript
interface User {
  name?: string;
  age?: number;
}

type test = Required<User>
// { name: string; age: number; }

// 原理：-? 移除可选修饰符
type CustomRequired<T> = {
  [P in keyof T]-?: T[P]
}
```

---

## Pick & Exclude

### Pick（选取）

从类型中**选取**指定的属性。

```typescript
interface User {
  name?: string;
  age?: number;
}

type test = Pick<User, 'age'>
// { age?: number }

// 原理
type CustomPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Exclude（排除）

从联合类型中**排除**指定的成员。

```typescript
type test = Exclude<'a' | 'b' | 'c', 'a' | 'b'>
// 'c'

// 原理：never 在联合类型中会被忽略
type CustomExclude<T, K> = T extends K ? never : T
```

---

## Omit（排除属性）

创建一个新类型，从原始类型中**排除**指定的属性。

```typescript
interface User {
  address?: string;
  name?: string;
  age?: number;
}

type test = Omit<User, 'age'>
// { address?: string; name?: string }

// 原理：Pick + Exclude 组合
type CustomOmit<T, K> = Pick<T, Exclude<keyof T, K>>
```

---

## 工具类型关系图

```
Partial   → 所有属性变可选    [+?]
Required  → 所有属性变必选    [-?]
Pick      → 选取指定属性      [K in keyof T]
Exclude   → 排除联合成员      [never]
Omit      → 排除指定属性      [Pick + Exclude]
```

---

## 口诀总结

> **`Partial` 加问号，`Required` 减问号。**
> **`Pick` 选属性，`Exclude` 排成员。**
> **`Omit` 是组合技：`Pick<T, Exclude<keyof T, K>>`。**
> **`never` 在联合类型中自动消失，这是 Exclude 的核心。**

<!-- lazynote:end -->
