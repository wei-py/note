---
title: TypeScript 类型守卫详解
created: 2026-06-13
tags:
  - typescript
  - guide
  - frontend
  - cheatsheet
summary: TypeScript 类型守卫详解：typeof、instanceof 与自定义类型谓词
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: d596c0a9-859a-41bc-96f0-a3b6e34b9499
date: 2026-11-10
source: 29-type-guards.md
---

<!-- lazynote:body -->
---
title: TypeScript 类型守卫详解
created: '2026-06-13'
tags:
  - typescript
  - guide
  - frontend
  - cheatsheet
summary: TypeScript 类型守卫详解：typeof、instanceof 与自定义类型谓词
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 类型守卫

> 类型守卫（Type Guards）是在运行时检查类型的机制，用于缩小变量的类型范围。

---

## typeof 类型收缩

```typescript
const isString = (str: any) => {
  return typeof str === 'string'
}
```

`typeof` 只能返回：`"string"`、`"number"`、`"boolean"`、`"symbol"`、`"undefined"`、`"object"`、`"function"`。

> ⚠️ `typeof null` 和 `typeof []` 都返回 `"object"`，无法区分复杂类型。

---

## instanceof

检查对象是否是某个类的实例，通过原型链判断。

```typescript
const isArr = (value: unknown) => {
  if (value instanceof Array) {
    value.length  // ✅ 类型被收窄为 Array
  }
}

class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
}

const person = new Person("Alice")
console.log(person instanceof Person)  // true
```

> ⚠️ `instanceof` 无法检查基本类型，也无法检查字面量创建的对象。

---

## typeof vs instanceof 对比

| 特性 | typeof | instanceof |
| --- | --- | --- |
| 检查对象 | 基本类型 | 类的实例 |
| 返回值 | `"string"` 等字符串 | `boolean` |
| 原型链 | 不检查 | 检查 |
| 适用场景 | `string`/`number`/`boolean`/`function` | 自定义类 |

---

## 自定义类型守卫（类型谓词）

当内置守卫不够用时，用 **`参数 is 类型`** 语法自定义守卫：

```typescript
const isString = (str: any): str is string => typeof str === 'string'
const isNumber = (num: any): num is number => typeof num === 'number'
const isFn = (fn: any): fn is Function => typeof fn === 'function'
const isObj = (obj: any): obj is object => ({}).toString.call(obj) === '[object Object]'
```

> `str is string` 是**类型谓词**，告诉 TS：当函数返回 `true` 时，`str` 的类型被收窄为 `string`。

---

## 实战：智能处理任意类型

实现一个函数：如果是对象就遍历属性，number 取两位小数，string 去除空格，function 就执行。

```typescript
const isString = (str: any): str is string => typeof str === 'string'
const isNumber = (num: any): num is number => typeof num === 'number'
const isFn = (fn: any): fn is Function => typeof fn === 'function'
const isObj = (obj: any): obj is object => ({}).toString.call(obj) === '[object Object]'

const fn = (data: any) => {
  if (isObj(data)) {
    Object.keys(data).forEach(key => {
      let value = data[key]
      if (isString(value)) data[key] = value.trim()
      if (isNumber(value)) data[key] = value.toFixed(2)
      if (isFn(value)) data[key]()  // 注意：用 data[key]() 而非 value()，保持 this 指向
    })
  }
}

const obj = {
  a: 100.22222,
  b: '  test  ',
  c: function () {
    console.log(this)
    return this.a
  }
}

fn(obj)
// obj.a → "100.22"
// obj.b → "test"
// obj.c → 执行并输出 this.a
```

> ⚠️ 函数调用要用 `data[key]()` 而非 `value()`，否则 `this` 会指向全局对象。

---

## 口诀总结

> **`typeof` 查基本类型，`instanceof` 查类实例。**
> **自定义守卫用 `参数 is 类型`，告诉 TS 缩小类型范围。**
> **类型谓词 = 代码提示神器，收窄类型后自动补全。**
> **调用对象方法用 `data[key]()`，保持 `this` 指向不变。**

<!-- lazynote:end -->
