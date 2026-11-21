---
title: 实战：封装 LocalStorage 支持过期时间
created: 2026-06-13
tags:
  - typescript
  - frontend
  - guide
  - utils
  - generics
  - storage
summary: 使用TypeScript二次封装localStorage实现过期时间功能
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 824af7f8-e914-4474-ad9a-f82d08022747
date: 2026-11-10
source: 31-localstorage-expire.md
---

<!-- lazynote:body -->
---
title: 实战：封装 LocalStorage 支持过期时间
created: '2026-06-13'
tags:
  - typescript
  - frontend
  - guide
  - utils
  - generics
  - storage
summary: 使用TypeScript二次封装localStorage实现过期时间功能
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 实战：封装 LocalStorage 支持过期时间

> localStorage 本身没有过期机制，用 TypeScript 二次封装实现类似 cookie 的有效期功能。

---

## 实现思路

存储时设置过期时间，数据格式化统一校验；读取时获取当前时间判断是否过期，过期则删除。

---

## 目录结构

```
src/
  ├── enum/index.ts    # 枚举定义
  ├── type/index.ts    # 类型定义
  └── index.ts         # 主逻辑实现
rollup.js              # 打包配置
```

---

## 1. 枚举定义

```typescript
// 字典：expire = 过期时间 key，permanent = 永久不过期
export enum Dictionaries {
  expire = '__expire__',
  permanent = 'permanent'
}
```

---

## 2. 类型定义

```typescript
import { Dictionaries } from "../enum"

export type Key = string
export type expire = Dictionaries.permanent | number

export interface Data<T> {
  value: T
  [Dictionaries.expire]: Dictionaries.expire | number
}

export interface Result<T> {
  message: string
  value: T | null
}

export interface StorageCls {
  set: <T>(key: Key, value: T, expire: expire) => void
  get: <T>(key: Key) => Result<T | null>
  remove: (key: Key) => void
  clear: () => void
}
```

---

## 3. 主逻辑实现

```typescript
import { StorageCls, Key, expire, Data, Result } from "./type"
import { Dictionaries } from "./enum"

export class Storage implements StorageCls {
  // 存储：key + value + 过期时间（默认永久）
  public set<T = any>(key: Key, value: T, expire: expire = Dictionaries.permanent) {
    const data = {
      value,
      [Dictionaries.expire]: expire
    }
    localStorage.setItem(key, JSON.stringify(data))
  }

  // 读取：校验是否过期
  public get<T = any>(key: Key): Result<T | null> {
    const value = localStorage.getItem(key)
    if (value) {
      const obj: Data<T> = JSON.parse(value)
      const now = new Date().getTime()
      // 是数字类型且已过期 → 删除并提示
      if (typeof obj[Dictionaries.expire] == 'number' && obj[Dictionaries.expire] < now) {
        this.remove(key)
        return { message: `您的${key}已过期`, value: null }
      } else {
        return { message: "成功读取", value: obj.value }
      }
    } else {
      console.warn('key值无效')
      return { message: `key值无效`, value: null }
    }
  }

  public remove(key: Key) {
    localStorage.removeItem(key)
  }

  public clear() {
    localStorage.clear()
  }
}
```

---

## 4. 使用示例

```typescript
import { Storage } from './dist/index.js'

const sl = new Storage()

// 5 秒后过期
sl.set('a', 123, new Date().getTime() + 5000)

setInterval(() => {
  const a = sl.get('a')
  console.log(a)
}, 500)

// 5秒内：{ message: "成功读取", value: 123 }
// 5秒后：{ message: "您的a已过期", value: null }
```

---

## 5. Rollup 打包配置

```javascript
import ts from 'rollup-plugin-typescript2'
import path from 'path'
import { fileURLToPath } from 'url'

const metaUrl = fileURLToPath(import.meta.url)
const dirName = path.dirname(metaUrl)

export default {
  input: './src/index.ts',
  output: {
    file: path.resolve(dirName, './dist/index.js')
  },
  plugins: [ts()]
}
```

---

## 关键知识点

| 知识点 | 说明 |
| --- | --- |
| 枚举 | 定义字典常量 |
| 泛型 | `<T>` 支持任意类型存储 |
| 接口约束 | `StorageCls` 约束 class 方法 |
| 格式化存储 | `{ value, expire }` 统一结构 |
| 时间判断 | `Date().getTime()` 比较过期时间 |

---

## 口诀总结

> **localStorage 永不过期，封装后加 `expire` 字段。**
> **存储格式化 `{ value, expire }`，读取时 `getTime()` 比大小。**
> **过期自动删除返回 null，枚举 + 泛型 + 接口三件套。**

<!-- lazynote:end -->
