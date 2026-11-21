---
title: 泛型工具类型（下）
created: 2026-06-13
tags:
  - typescript
  - generics
  - cheatsheet
  - frontend
summary: TypeScript 泛型工具类型进阶用法与原理解析
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: f6a7a007-0cb0-4b75-894a-e41f5d5e59e1
date: 2026-11-10
source: 25-utility-types-2.md
---

<!-- lazynote:body -->
---
title: 泛型工具类型（下）
created: '2026-06-13'
tags:
  - typescript
  - generics
  - cheatsheet
  - frontend
summary: TypeScript 泛型工具类型进阶用法与原理解析
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 泛型工具类型（下）

> Record、Readonly、ReturnType 等进阶工具类型。

---

## Record

`Record<K, T>` 接受两个泛型参数：
- **K**：对象的属性名（联合类型）
- **T**：对象属性的类型

```typescript
type Key = "c" | "x" | "k"
type Value = '唱' | '跳' | 'rap' | '篮球'

let obj: Record<Key, Value> = {
  'c': '唱',
  "x": '跳',
  "k": 'rap'
}
```

### Record 源码

```typescript
type CustomRecord<K extends keyof any, T> = {
  [P in K]: T
}
```

> `keyof any` 返回 `string | number | symbol`，正好是对象 key 允许的所有类型。

### 嵌套约束

```typescript
let obj: Record<Key, Record<Key, Value>> = {
  'c': { 'c': '唱', 'x': '跳', 'k': 'rap' },
  "x": { 'c': '唱', 'x': '跳', 'k': 'rap' },
  "k": { 'c': '唱', 'x': '跳', 'k': 'rap' }
}
```

---

## Readonly

将类型的所有属性变为**只读**。

```typescript
interface User {
  name: string
  age: number
}

type ReadonlyUser = Readonly<User>
// { readonly name: string; readonly age: number }

// 原理
type CustomReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

const user: ReadonlyUser = { name: "小满", age: 20 }
user.name = "大满"  // ❌ Cannot assign to 'name' because it is a read-only property
```

---

## ReturnType

提取函数的**返回值类型**。

```typescript
const fn = () => [1, 2, 3, 'sad']

type num = ReturnType<typeof fn>
// (string | number)[]
```

### ReturnType 源码

```typescript
type CustomFn<F extends Function> = F extends (...args: any[]) => infer Res ? Res : never
```

> 使用 `infer` 推断返回值类型，匹配成功返回 `Res`，否则返回 `never`。

---

## 工具类型总览

| 工具类型 | 作用 | 原理关键词 |
| --- | --- | --- |
| `Partial<T>` | 全部可选 | `+?` |
| `Required<T>` | 全部必选 | `-?` |
| `Readonly<T>` | 全部只读 | `readonly` |
| `Pick<T, K>` | 选取属性 | `in K` |
| `Omit<T, K>` | 排除属性 | `Pick + Exclude` |
| `Exclude<T, U>` | 排除联合成员 | `never` |
| `Extract<T, U>` | 提取联合成员 | `条件类型` |
| `Record<K, T>` | 键值对约束 | `keyof any` |
| `ReturnType<F>` | 提取返回类型 | `infer` |
| `NonNullable<T>` | 排除 null/undefined | `never` |

---

## 口诀总结

> **`Record` 约束键值对，`keyof any` 限 key 类型。**
> **`Readonly` 加 `readonly`，`ReturnType` 用 `infer` 提取返回值。**
> **工具类型十兄弟，`Partial` `Required` `Readonly` 三修饰，`Pick` `Omit` `Record` 三构造，`Exclude` `Extract` `NonNullable` 三过滤，`ReturnType` 推返回。**

<!-- lazynote:end -->
