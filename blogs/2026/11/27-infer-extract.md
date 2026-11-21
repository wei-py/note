---
title: infer 类型提取
created: 2026-06-13
tags:
  - typescript
  - generics
  - cheatsheet
  - guide
  - infer
summary: 用 infer 实现 TypeScript 元组头部尾部提取与增删操作
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 8a5776c2-ac5d-4741-8690-f3bed3005afe
date: 2026-11-10
source: 27-infer-extract.md
---

<!-- lazynote:body -->
---
title: infer 类型提取
created: '2026-06-13'
tags:
  - typescript
  - generics
  - cheatsheet
  - guide
  - infer
summary: 用 infer 实现 TypeScript 元组头部尾部提取与增删操作
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# infer 类型提取

> 用 `infer` 实现元组/数组的头部、尾部提取，以及 Shift、Pop 操作。

---

## 1. 提取头部元素 First

```typescript
type Arr = ['a', 'b', 'c']

type First<T extends any[]> = T extends [infer First, ...any[]] ? First : []

type a = First<Arr>  // 'a'
```

**思路：** `T` 约束为数组，用 `infer First` 抓住第一个元素，后面 `...any[]` 匹配剩余任意元素。

---

## 2. 提取尾部元素 Last

```typescript
type Arr = ['a', 'b', 'c']

type Last<T extends any[]> = T extends [...any[], infer Last] ? Last : []

type c = Last<Arr>  // 'c'
```

**思路：** 反过来，`...any[]` 匹配前面任意元素，`infer Last` 抓住最后一个。

---

## 3. 剔除第一个元素 Shift

```typescript
type Arr = ['a', 'b', 'c']

type Shift<T extends any[]> = T extends [unknown, ...infer Rest] ? Rest : []

type a = Shift<Arr>  // ['b', 'c']
```

**思路：** 第一个位置用 `unknown` 占位丢弃，`infer Rest` 抓住剩余元素。

---

## 4. 剔除尾部元素 Pop

```typescript
type Arr = ['a', 'b', 'c']

type Pop<T extends any[]> = T extends [...infer Rest, unknown] ? Rest : []

type a = Pop<Arr>  // ['a', 'b']
```

**思路：** 反过来，`infer Rest` 抓住前面元素，最后用 `unknown` 占位丢弃。

---

## 对比总结

| 操作 | 模式 | 结果 |
| --- | --- | --- |
| First（取头部） | `[infer F, ...any[]]` | 第一个元素 |
| Last（取尾部） | `[...any[], infer L]` | 最后一个元素 |
| Shift（去头部） | `[unknown, ...infer R]` | 去掉第一个的剩余数组 |
| Pop（去尾部） | `[...infer R, unknown]` | 去掉最后一个的剩余数组 |

---

## 口诀总结

> **`infer` 抓元素，`unknown` 丢元素。**
> **头部在左 `[infer F, ...any[]]`，尾部在右 `[...any[], infer L]`。**
> **Shift 左丢右抓，Pop 右丢左抓，位置决定一切。**

<!-- lazynote:end -->
