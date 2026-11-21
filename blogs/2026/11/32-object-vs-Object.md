---
title: 加餐：object、Object、{} 的区别
created: 2026-06-13
tags:
  - typescript
  - frontend
  - guide
  - cheatsheet
summary: 搞懂 TypeScript 中 object、Object、{} 三种类型的区别
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 6709d88b-9ba9-4a12-beec-6dad3e0ed1b6
date: 2026-11-10
source: 32-object-vs-Object.md
---

<!-- lazynote:body -->
---
title: '加餐：object、Object、{} 的区别'
created: '2026-06-13'
tags:
  - typescript
  - frontend
  - guide
  - cheatsheet
summary: '搞懂 TypeScript 中 object、Object、{} 三种类型的区别'
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 加餐：object、Object、{} 的区别

> 这三个类型容易混淆，本质区别在于包含范围不同。

---

## 1. Object（大写 O）

原型链顶层就是 `Object`，值类型和引用类型最终都指向它，**包含所有类型**。

```typescript
let a: Object = '123'    // ✅
let b: Object = 123      // ✅
let c: Object = true     // ✅
let d: Object = {}       // ✅
let e: Object = []       // ✅
let f: Object = () => 123 // ✅
```

> 由 `Object` 接口（定义原型属性）和 `ObjectConstructor` 接口（定义 `Object.create()` 等）定义。

---

## 2. object（小写 o）

代表**所有非值类型**（引用类型），常用于泛型约束。

```typescript
let o: object = {}           // ✅
let o1: object = []          // ✅
let o2: object = () => 123   // ✅
let b: object = '123'        // ❌
let c: object = 123          // ❌
```

---

## 3. {}（空对象类型）

可以理解为 `new Object()`，和大写 `Object` 基本一样，**包含所有类型**。

```typescript
let a1: {} = { name: 1 }    // ✅
let a2: {} = () => 123      // ✅
let a3: {} = 123             // ✅
```

> ⚠️ 字面量模式下不能修改值（只能读取继承的属性和方法）。

---

## 对比总结

| 类型 | 包含范围 | 能赋值基本类型 | 用途 |
| --- | --- | --- | --- |
| `Object`（大写） | 所有类型 | ✅ | 一般不直接用 |
| `object`（小写） | 仅引用类型 | ❌ | 泛型约束 `extends object` |
| `{}` | 所有类型 | ✅ | 空对象字面量 |

---

## 口诀总结

> **大写 `Object` 全包含，小写 `object` 只引用，`{}` 等同 `new Object()`。**
> **泛型约束用小写 `object`，日常开发少用这三个，用具体类型更安全。**

<!-- lazynote:end -->
