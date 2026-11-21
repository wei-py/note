---
title: 类型兼容性
created: 2026-06-13
tags:
  - typescript
  - guide
  - cheatsheet
  - frontend
summary: 详解TypeScript类型兼容性中的协变、逆变与双向协变规则
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: ee7aa6a5-8f9b-418c-b350-68eb9b305b29
date: 2026-11-10
source: 30-type-compatibility.md
---

<!-- lazynote:body -->
---
title: 类型兼容性
created: '2026-06-13'
tags:
  - typescript
  - guide
  - cheatsheet
  - frontend
summary: 详解TypeScript类型兼容性中的协变、逆变与双向协变规则
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 类型兼容性

> 类型兼容性用于确定一个类型是否能赋值给其他类型。TS 基于**结构类型**（形状），A 要兼容 B，A 至少具有 B 相同的属性。

---

## 1. 协变（鸭子类型）

> 一只鸟走路像鸭子，游泳像鸭子，做什么都像，那么这只鸟就是鸭子类型。

**规则：不能少，可以多。**

```typescript
interface A {
  name: string
  age: number
}

interface B {
  name: string
  age: number
  sex: string
}

let a: A = { name: "老墨我想吃鱼了", age: 33 }
let b: B = { name: "老墨我不想吃鱼", age: 33, sex: "女" }

a = b  // ✅ B 有 A 的所有属性，可以赋值
// b = a  // ❌ A 缺少 sex，不能赋值给 B
```

B 充当 A 的**子类型**，子类型属性 ≥ 父类型即可赋值。

---

## 2. 逆变

逆变一般发生在**函数参数**上。

```typescript
let fna = (params: A) => {}
let fnb = (params: B) => {}

fna = fnb  // ❌ 不安全：fna 调用者可能传 A（没有 sex）
fnb = fna  // ✅ 安全：fnb 调用者传 B，fna 完全能处理
```

**为什么？**
- `fnb = fna`：fnb 的调用者会传 B（有 sex），而 fna 只用 name 和 age，安全
- `fna = fnb`：fna 的调用者可能传 A（没有 sex），而 fnb 需要 sex，不安全

**参数类型方向相反：子类型赋值给父类型（参数多的赋值给参数少的）。**

---

## 3. 双向协变

在 `tsconfig.json` 中设置 `"strictFunctionTypes": false`，则允许双向赋值：

```typescript
fna = fnb  // ✅ 也允许了
fnb = fna  // ✅
```

> ⚠️ 双向协变降低了类型安全性，一般不建议开启。

---

## 对比总结

| 场景 | 规则 | 方向 |
| --- | --- | --- |
| 对象赋值（协变） | 属性不能少，可以多 | 子 → 父 |
| 函数参数（逆变） | 参数类型方向相反 | 父 → 子 |
| 双向协变 | 随便赋值 | 双向 |

---

## 口诀总结

> **协变 = 鸭子类型，属性不能少可以多，子类型赋值给父类型。**
> **逆变 = 函数参数反方向，参数多的赋值给参数少的。**
> **双向协变 = `strictFunctionTypes: false`，随便赋值但不安全。**
> **记住：对象看属性（协变），函数看参数（逆变）。**

<!-- lazynote:end -->
