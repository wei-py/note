---
title: Set / Map / WeakSet / WeakMap
created: 2026-06-13
tags:
  - typescript
  - javascript
  - cheatsheet
  - frontend
  - guide
summary: ES6新增Set、Map、WeakSet、WeakMap数据结构详解及对比速查
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: f441e328-7aef-4c15-a2bf-ae6165204f85
date: 2026-11-10
source: 22-set-map.md
---

<!-- lazynote:body -->
---
title: Set / Map / WeakSet / WeakMap
created: '2026-06-13'
tags:
  - typescript
  - javascript
  - cheatsheet
  - frontend
  - guide
summary: ES6新增Set、Map、WeakSet、WeakMap数据结构详解及对比速查
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# Set / Map / WeakSet / WeakMap

> ES6 新增的数据结构，Set 类似数组（去重），Map 类似对象（任意类型作键）。

---

## 1. Set

集合是由一组**无序且唯一**的项组成的，可以想象成没有重复元素的数组。

### 属性

| 属性 | 说明 |
| --- | --- |
| `size` | 返回集合元素个数 |

### 操作方法

| 方法 | 说明 | 返回值 |
| --- | --- | --- |
| `add(value)` | 添加值 | Set 本身 |
| `delete(value)` | 删除值 | `boolean` |
| `has(value)` | 是否存在 | `boolean` |
| `clear()` | 清除所有 | `void` |

```typescript
let set: Set<number> = new Set([1, 2, 3, 4])
set.add(5)
set.has(5)      // true
set.delete(5)   // true
set.size         // 4
```

### 去重

```typescript
let arr = [...new Set([1, 1, 1, 2, 2, 3, 4, 5, 5, 5, 5])]
console.log(arr) // [1, 2, 3, 4, 5]
```

---

## 2. Map

键值对的集合，但**键的范围不限于字符串**，任何类型（包括对象）都可以当作键。

```typescript
let obj = { name: '小满' }
let map: Map<object, Function> = new Map()

map.set(obj, () => 123)
map.get(obj)      // () => 123
map.has(obj)      // true
map.delete(obj)   // true
map.size          // 0
```

**Map vs Object：**
| 特性 | Map | Object |
| --- | --- | --- |
| 键的类型 | 任意类型 | 只能是 string/symbol |
| 大小 | `size` 属性 | 需要手动计算 |
| 遍历 | 可直接 `for...of` | 需要 `Object.keys()` |
| 性能 | 频繁增删场景更优 | 一般场景足够 |

---

## 3. WeakSet & WeakMap

**Weak** = 弱引用，不会被计入垃圾回收引用计数。

### WeakMap

- 键必须是**对象**
- 键是**弱引用**，不阻止垃圾回收
- **不能遍历**，**不能获取大小**
- 适合存储对象的私有数据或缓存

```typescript
let obj: any = { name: '小满zs' }
let aahph: any = obj
let wmap: WeakMap<object, string> = new WeakMap()

wmap.set(obj, '爱安徽潘慧')

obj = null    // 引用 -1
aahph = null  // 引用 -1，对象可被 GC 回收
// wmap 中的条目也会随之消失
```

### WeakSet

- 成员必须是**对象**
- 成员是**弱引用**
- **不能遍历**，**不能获取大小**
- 适合存储对象的临时标记

---

## 对比速查

| 特性 | Set | WeakSet | Map | WeakMap |
| --- | --- | --- | --- | --- |
| 成员/键类型 | 任意 | 对象 | 任意 | 对象 |
| 可遍历 | ✅ | ❌ | ✅ | ❌ |
| 有 size | ✅ | ❌ | ✅ | ❌ |
| 弱引用 | ❌ | ✅ | ❌ | ✅ |
| 垃圾回收 | 阻止 | 不阻止 | 阻止 | 不阻止 |

---

## 口诀总结

> **Set 去重唯一值，Map 任意类型作键，比 Object 更灵活。**
> **Weak 弱引用不计数，GC 自动回收不阻止。**
> **Weak 不能遍历不能取 size，适合存对象的临时数据。**
> **高频增删用 Map/Set，对象缓存用 WeakMap/WeakSet。**

<!-- lazynote:end -->
