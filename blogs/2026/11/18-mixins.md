---
title: Mixins 混入
created: 2026-06-13
tags:
  - typescript
  - guide
  - frontend
  - cheatsheet
  - mixins
summary: TypeScript混入通过对象合并与类组合实现多继承效果
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 41cb0e8a-47cb-4b9a-af36-3ce664978a6e
date: 2026-11-10
source: 18-mixins.md
---

<!-- lazynote:body -->
---
title: Mixins 混入
created: '2026-06-13'
tags:
  - typescript
  - guide
  - frontend
  - cheatsheet
  - mixins
summary: TypeScript混入通过对象合并与类组合实现多继承效果
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# Mixins 混入

TypeScript 混入 Mixins，可以理解为合并。Vue 中也有 `mixins` 这个东西。

---

## 1. 对象混入

使用 ES6 的 `Object.assign` 合并多个对象。

```typescript
interface Name {
  name: string
}
interface Age {
  age: number
}
interface Sex {
  sex: number
}

let people1: Name = { name: "小满" }
let people2: Age = { age: 20 }
let people3: Sex = { sex: 1 }

const people = Object.assign(people1, people2, people3)
// people 被推断为交叉类型: Name & Age & Sex
```

---

## 2. 类的混入

### 第一步：声明两个 mixins 类

> 注意：严格模式下要关闭 `strict`，不然编译不过。

```typescript
class A {
  type: boolean = false;
  changeType() {
    this.type = !this.type
  }
}

class B {
  name: string = '张三';
  getName(): string {
    return this.name;
  }
}
```

### 第二步：创建目标类，用 `implements` 而非 `extends`

把类当接口使用，为混入的属性和方法创建**占位属性**，告诉编译器这些成员在运行时是可用的。

```typescript
class C implements A, B {
  type: boolean
  changeType: () => void;
  name: string;
  getName: () => string
}
```

### 第三步：编写 Mixins 帮助函数

遍历 mixins 上的所有属性，复制到目标原型上，把占位属性替换成真正的实现。

```typescript
function Mixins(curCls: any, itemCls: any[]) {
  itemCls.forEach(item => {
    Object.getOwnPropertyNames(item.prototype).forEach(name => {
      curCls.prototype[name] = item.prototype[name]
    })
  })
}

Mixins(C, [A, B])
```

`Object.getOwnPropertyNames()` 获取对象自身的属性（不含继承），遍历所有属性名并复制。

---

## 对比总结

| 方式 | 关键字 | 作用 | 说明 |
| --- | --- | --- | --- |
| 对象混入 | `Object.assign` | 合并对象 | 返回交叉类型 |
| 类混入 | `implements` + 帮助函数 | 组合多个类 | 用 `implements` 代替 `extends`，占位 + 复制原型 |

---

## 为什么需要 Mixins？

- TS 只支持**单继承**（`extends` 只能一个），不支持多继承
- Mixins 可以间接实现**多继承**的效果
- 复用多个类的行为，避免深层继承链

---

## 口诀总结

> **对象混入 `Object.assign`，返回交叉类型合多为一。**
> **类混入 `implements` 不用 `extends`，占位属性先声明，原型复制后填充。**
> **单继承不够用，Mixins 来补位，多类行为可组合。**

<!-- lazynote:end -->
