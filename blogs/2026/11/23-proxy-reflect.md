---
title: Proxy & Reflect
created: 2026-06-13
tags:
  - typescript
  - proxy
  - reflect
  - frontend
  - guide
summary: Proxy拦截器与Reflect详解及MobX观察者模式实现
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 80138c9c-c3c0-4116-ba15-8a04d87fd6c8
date: 2026-11-10
source: 23-proxy-reflect.md
---

<!-- lazynote:body -->
---
title: Proxy & Reflect
created: '2026-06-13'
tags:
  - typescript
  - proxy
  - reflect
  - frontend
  - guide
summary: Proxy拦截器与Reflect详解及MobX观察者模式实现
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# Proxy & Reflect

> Proxy 是 ES6 新增的对象拦截器，Vue3 响应式的核心原理。Reflect 配合 Proxy 使用。

---

## Proxy 基础

`Proxy` 对象用于创建一个对象的代理，拦截基本操作（属性查找、赋值、枚举、函数调用等）。

```typescript
new Proxy(target, handler)
```

| 参数 | 含义 |
| --- | --- |
| `target` | 被代理的目标对象 |
| `handler` | 定义拦截行为的对象（陷阱函数） |

### 常用陷阱函数

| 陷阱 | 触发时机 | 对应 Reflect 方法 |
| --- | --- | --- |
| `get(target, prop, receiver)` | 读取属性 | `Reflect.get()` |
| `set(target, prop, value, receiver)` | 设置属性 | `Reflect.set()` |
| `has(target, prop)` | `in` 操作符 | `Reflect.has()` |
| `deleteProperty(target, prop)` | `delete` 操作符 | `Reflect.deleteProperty()` |
| `apply(target, thisArg, args)` | 函数调用 | `Reflect.apply()` |
| `construct(target, args)` | `new` 操作符 | `Reflect.construct()` |

---

## Reflect

`Reflect` 不是构造函数，所有属性和方法都是静态的（类似 `Math`）。

```typescript
Reflect.get(target, name, receiver)   // 查找并返回 target 的 name 属性
Reflect.set(target, name, value, receiver)  // 设置 target 的 name 属性
```

---

## 基础示例：属性访问日志

```typescript
type Person = {
  name: string
  age: number
  text: string
}

const proxy = (object: any, key: any) => {
  return new Proxy(object, {
    get(target, prop, receiver) {
      console.log(`get key======>${key}`);
      return Reflect.get(target, prop, receiver)
    },
    set(target, prop, value, receiver) {
      console.log(`set key======>${key}`);
      return Reflect.set(target, prop, value, receiver)
    }
  })
}

const logAccess = (object: Person, key: 'name' | 'age' | 'text') => {
  return proxy(object, key)
}

let man = logAccess({ name: "小满", age: 20, text: "我的很小" }, 'age')
man.age = 30  // set key======>age
```

---

## 泛型 + keyof 优化

```typescript
const logAccess = <T>(object: T, key: keyof T): T => {
  return proxy(object, key)
}

let man = logAccess({ name: "小满", age: 20, text: "我的很小" }, 'age')
let man2 = logAccess({ id: 1, name: "小满2" }, 'name')
```

---

## 实战：简单实现 MobX 观察者模式

```typescript
const list: Set<Function> = new Set()

const autorun = (cb: Function) => {
  if (cb) {
    list.add(cb)
  }
}

const observable = <T extends object>(params: T) => {
  return new Proxy(params, {
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      list.forEach(fn => fn())  // 数据变化时，执行所有观察者
      return result
    }
  })
}

const person = observable({ name: "小满", attr: "威猛先生" })

autorun(() => {
  console.log('我变化了')
})

person.attr = '威猛个捶捶'  // 触发 autorun 回调
```

---

## Proxy vs Object.defineProperty

| 特性 | Proxy | Object.defineProperty |
| --- | --- | --- |
| 拦截范围 | 13 种操作（get/set/has/delete...） | 只能 get/set |
| 新增属性 | 自动拦截 | 需要手动处理 |
| 数组变化 | 自动拦截 | 需要重写数组方法 |
| 性能 | 惰性代理，按需触发 | 初始化时全部递归 |
| 兼容性 | ES6+ | ES5 |
| Vue 版本 | Vue3 | Vue2 |

---

## 口诀总结

> **Proxy 是拦截器，`new Proxy(target, handler)` 创建代理。**
> **`get` 读 `set` 写，`Reflect` 配对用，保持默认行为不丢失。**
> **`keyof T` 约束属性名，泛型代理更安全。**
> **观察者模式：`Set` 存回调，`set` 陷阱里遍历执行，数据变自动触发。**
> **Vue3 用 Proxy 替代 Vue2 的 `defineProperty`，支持新增属性和数组。**

<!-- lazynote:end -->
