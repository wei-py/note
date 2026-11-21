---
title: Class 类
created: 2026-06-13
tags:
  - typescript
  - cheatsheet
  - guide
  - frontend
summary: TypeScript 类的继承、修饰符与静态成员速查表
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: ea78eae6-8bc7-40f6-9e83-5fdf8296f197
date: 2026-11-10
source: 07-class.md
---

<!-- lazynote:body -->
---
title: Class 类
created: '2026-06-13'
tags:
  - typescript
  - cheatsheet
  - guide
  - frontend
summary: TypeScript 类的继承、修饰符与静态成员速查表
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# Class 类

| 知识点     | 典型写法      |
| ---------- | ------------- |
| 类定义     | `class`       |
| 构造函数   | `constructor` |
| 方法       | `method()`    |
| 属性       | `property`    |
| 继承       | `extends`     |
| 实现       | `implements`  |
| 静态成员   | `static`      |
| 私有成员   | `private`     |
| 受保护成员 | `protected`   |
| 公共成员   | `public`      |

```typescript
class 子类 extends 父类 implements 接口 {
  public 公共成员;
  protected 受保护成员;
  private 私有成员;
  static 静态成员;
}
```

## 口诀

> **继承 `extends` 实现 `implements`，公私静保四修饰。**

<!-- lazynote:end -->
