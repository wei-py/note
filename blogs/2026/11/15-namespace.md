---
title: namespace 命名空间
created: 2026-06-13
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
  - namespace
summary: TypeScript命名空间的语法用法及ES Module替代方案速查
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: b9199c65-4892-4d36-b9c0-48a685028414
date: 2026-11-10
source: 15-namespace.md
---

<!-- lazynote:body -->
---
title: namespace 命名空间
created: '2026-06-13'
tags:
  - typescript
  - cheatsheet
  - frontend
  - guide
  - namespace
summary: TypeScript命名空间的语法用法及ES Module替代方案速查
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# namespace 命名空间

| 知识点      | 写法                                      | 说明               |
| ----------- | ----------------------------------------- | ------------------ |
| 定义命名空间 | `namespace A {}`                          | 创建一个代码分组   |
| 暴露成员    | `export const a = 1`                      | 外部才能访问       |
| 访问成员    | `A.a`                                     | 通过命名空间路径访问 |
| 嵌套命名空间 | `namespace A { export namespace B {} }`   | 多层组织代码       |
| 抽离文件    | `export namespace V {}`                   | 可以配合模块导入   |
| 简化路径    | `import X = A.B.C`                        | 给长路径起别名     |
| 命名空间合并 | 多个 `namespace A`                        | 同名命名空间会合并 |
| 现代替代方案 | ES Module                                 | 现代项目更推荐     |

## 口诀

> **`export` 暴露不导出就看不见，同名自动合并，现代项目用 ES Module 替代。**

<!-- lazynote:end -->
