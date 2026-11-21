---
title: 装饰器 Decorator
created: 2026-06-13
tags:
  - typescript
  - decorator
  - frontend
  - guide
  - cheatsheet
summary: 详解TypeScript装饰器语法及实战应用
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 8da35e68-89ed-4655-9dcf-979e88762eac
date: 2026-11-10
source: 19-decorator.md
---

<!-- lazynote:body -->
---
title: 装饰器 Decorator
created: '2026-06-13'
tags:
  - typescript
  - decorator
  - frontend
  - guide
  - cheatsheet
summary: 详解TypeScript装饰器语法及实战应用
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# 装饰器 Decorator

> 装饰器是一项实验性特性，未来版本可能改变。需在 tsconfig 中启用 `"experimentalDecorators": true`。

装饰器是一种特殊类型的声明，能够附加到**类声明、方法、访问符、属性或参数**上，增加或修改类的功能。

---

## 1. 类装饰器

接收类的构造函数作为参数。

```typescript
const watcher: ClassDecorator = (target: Function) => {
  target.prototype.getParams = <T>(params: T): T => {
    return params
  }
}

@watcher
class A {
  constructor() {}
}

const a = new A();
console.log((a as any).getParams('123')); // '123'
```

---

## 2. 装饰器工厂

本质是**高阶函数**：外层接受配置参数，内层接收类的构造函数。

```typescript
const watcher = (name: string): ClassDecorator => {
  return (target: Function) => {
    target.prototype.getParams = <T>(params: T): T => {
      return params
    }
    target.prototype.getOptions = (): string => {
      return name
    }
  }
}

@watcher('name')
class A {
  constructor() {}
}

const a = new A();
console.log((a as any).getParams('123'));
```

---

## 3. 装饰器组合

可以使用多个装饰器，**从下往上执行**（先 `watcher`，再 `watcher2`）。

```typescript
@watcher2('name2')
@watcher('name')
class A {
  constructor() {}
}
```

---

## 4. 方法装饰器

返回三个参数：

| 参数 | 含义 |
| --- | --- |
| `target` | 静态成员 → 类的构造函数；实例成员 → 类的原型对象 |
| `key` | 成员的名字 |
| `descriptor` | 成员的属性描述符 |

```typescript
const met: MethodDecorator = (target, key, descriptor) => {
  console.log(target, key, descriptor)
}

class A {
  constructor() {}
  @met
  getName(): string {
    return '小满'
  }
}
```

---

## 5. 属性装饰器

返回两个参数：

| 参数 | 含义 |
| --- | --- |
| `target` | 静态成员 → 类的构造函数；实例成员 → 类的原型对象 |
| `key` | 属性的名字 |

```typescript
const met: PropertyDecorator = (target, key) => {
  console.log(target, key)
}

class A {
  @met
  name: string
  constructor() {}
}
```

---

## 6. 参数装饰器

返回三个参数：

| 参数 | 含义 |
| --- | --- |
| `target` | 静态成员 → 类的构造函数；实例成员 → 类的原型对象 |
| `key` | 成员的名字 |
| `index` | 参数在函数参数列表中的索引 |

```typescript
const met: ParameterDecorator = (target, key, index) => {
  console.log(target, key, index)
}

class A {
  constructor() {}
  setParasm(@met name: string = '213') {}
}
```

---

## 7. 元数据存储 reflect-metadata

```typescript
import 'reflect-metadata'

// 存储元数据
Reflect.defineMetadata('key', 'result', target)

// 读取元数据
const key = Reflect.getMetadata('key', target)
```

---

## 8. 实战：装饰器封装 axios 请求

```typescript
import axios from 'axios'
import 'reflect-metadata'

const Base = (base: string): ClassDecorator => {
  return (target) => {
    target.prototype.base = base;
  }
}

const Get = (url: string): MethodDecorator => {
  return (target: any, key, descriptor: PropertyDescriptor) => {
    axios.get(url).then(res => {
      const key = Reflect.getMetadata('key', target)
      descriptor.value(key ? res.data[key] : res.data)
    })
  }
}

const result = (): ParameterDecorator => {
  return (target: any, key, index) => {
    Reflect.defineMetadata('key', 'result', target)
  }
}

const Bt: PropertyDecorator = (target, key) => {
  console.log(target, key)
}

@Base('/api')
class Http {
  @Bt
  xiaoman: string
  constructor() {
    this.xiaoman = 'xiaoman'
  }
  @Get('https://api.apiopen.top/api/getHaoKanVideo?page=0&size=10')
  getList(@result() data: any) {}
}

const http = new Http() as any
```

---

## 装饰器类型速查

| 类型 | 签名 | 参数个数 |
| --- | --- | --- |
| 类装饰器 | `ClassDecorator` | 1（target） |
| 方法装饰器 | `MethodDecorator` | 3（target, key, descriptor） |
| 属性装饰器 | `PropertyDecorator` | 2（target, key） |
| 参数装饰器 | `ParameterDecorator` | 3（target, key, index） |
| 装饰器工厂 | 返回装饰器的函数 | 可自定义配置参数 |

---

## 口诀总结

> **装饰器是高阶函数，`@` 挂在类方法属性参数上。**
> **类装一参方法三，属性两个参数三，顺序 target key desc/index。**
> **工厂模式外层配，内层返回真装饰，组合使用从下往上执行。**
> **`reflect-metadata` 存元数据，`define` 存 `get` 取，配合装饰器做依赖注入。**

<!-- lazynote:end -->
