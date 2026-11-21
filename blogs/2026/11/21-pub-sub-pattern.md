---
title: 实战：TS 编写发布订阅模式
created: 2026-06-13
tags:
  - typescript
  - frontend
  - guide
  - pattern
  - events
summary: TypeScript 实现发布订阅模式，含核心代码与应用场景解析
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 39c68b1a-dec6-4da1-ace8-f733ce688650
date: 2026-11-10
source: 21-pub-sub-pattern.md
---

<!-- lazynote:body -->
---
title: 实战：TS 编写发布订阅模式
created: '2026-06-13'
tags:
  - typescript
  - frontend
  - guide
  - pattern
  - events
summary: TypeScript 实现发布订阅模式，含核心代码与应用场景解析
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 实战：TS 编写发布订阅模式

> 发布订阅模式是一种常见的设计模式，`addEventListener`、Vue 事件总线、Webpack Hooks 都是它的应用。

---

## 三个角色

```
发布者 → 调度中心 → 订阅者
         (Event)
```

| 角色 | 职责 |
| --- | --- |
| 发布者（Publisher） | 触发事件，不直接通知订阅者 |
| 调度中心（Event） | 存储事件和回调，负责分发 |
| 订阅者（Subscriber） | 注册回调，等待被触发 |

---

## 接口定义

```typescript
interface EventFace {
  on: (name: string, callback: Function) => void    // 订阅
  emit: (name: string, ...args: Array<any>) => void  // 发布
  off: (name: string, fn: Function) => void          // 解除绑定
  once: (name: string, fn: Function) => void         // 只执行一次
}

interface List {
  [key: string]: Array<Function>
}
```

---

## 完整实现

```typescript
class Dispatch implements EventFace {
  list: List;

  constructor() {
    this.list = {};
  }

  // 订阅事件
  on(name: string, callback: Function) {
    const callbackList: Array<Function> = this.list[name] || [];
    callbackList.push(callback);
    this.list[name] = callbackList;
  }

  // 发布事件
  emit(name: string, ...args: Array<any>) {
    let eventName = this.list[name];
    if (eventName) {
      eventName.forEach(fn => {
        fn.apply(this, args);
      });
    } else {
      console.error('该事件未监听');
    }
  }

  // 解除绑定
  off(name: string, fn: Function) {
    let eventName = this.list[name];
    if (eventName && fn) {
      let index = eventName.findIndex(fns => fns === fn);
      eventName.splice(index, 1);
    } else {
      console.error('该事件未监听');
    }
  }

  // 一次性订阅（触发一次后自动解除）
  once(name: string, fn: Function) {
    let decorator = (...args: Array<any>) => {
      fn.apply(this, args);
      this.off(name, decorator);
    };
    this.on(name, decorator);
  }
}
```

---

## 使用示例

```typescript
const o = new Dispatch();

// 订阅事件 'abc'
o.on('abc', (...arg: Array<any>) => {
  console.log(arg, 1);
});

// 一次性订阅（只会触发一次）
o.once('abc', (...arg: Array<any>) => {
  console.log(arg, 'once');
});

// 第一次发布 → 触发 on 和 once 的回调
o.emit('abc', 1, true, '小满');
// 输出: [1, true, '小满'] 1
// 输出: [1, true, '小满'] 'once'

// 第二次发布 → 只触发 on 的回调（once 已自动解除）
o.emit('abc', 2, true, '小满');
// 输出: [2, true, '小满'] 1
```

---

## 实际应用场景

| 场景 | 实现方式 |
| --- | --- |
| DOM 事件 | `addEventListener` / `removeEventListener` |
| Vue 2 事件总线 | `EventBus.$on` / `$emit` / `$off` |
| Webpack | Hooks 机制 |
| Electron | `ipcMain` / `ipcRenderer` |
| Node.js | `EventEmitter` |

---

## 口诀总结

> **发布订阅三角色：发布者、调度中心、订阅者。**
> **`on` 订阅存回调，`emit` 发布遍历执行，`off` 解除找索引删除。**
> **`once` 是装饰器模式：包一层函数，触发后自动 `off`。**
> **解耦发布者和订阅者，中间调度中心来通信。**

<!-- lazynote:end -->
