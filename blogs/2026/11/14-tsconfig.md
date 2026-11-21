---
title: tsconfig.json 配置文件
created: 2026-06-13
tags:
  - typescript
  - config
  - cheatsheet
  - guide
summary: tsconfig.json 编译选项速查与完整配置参考
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: bcce9759-72af-4845-9b52-378a9f4da3bd
date: 2026-11-10
source: 14-tsconfig.md
---

<!-- lazynote:body -->
---
title: tsconfig.json 配置文件
created: '2026-06-13'
tags:
  - typescript
  - config
  - cheatsheet
  - guide
summary: tsconfig.json 编译选项速查与完整配置参考
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# tsconfig.json 配置文件

## 常用配置速查

| 配置                | 作用                  |
| ------------------- | --------------------- |
| `target`            | 控制输出 JS 版本      |
| `module`            | 控制模块格式          |
| `strict`            | 开启严格类型检查      |
| `rootDir`           | 源码根目录            |
| `outDir`            | 输出目录              |
| `include`           | 指定参与编译的文件    |
| `exclude`           | 排除部分文件          |
| `lib`               | 指定可用标准库类型    |
| `moduleResolution`  | 控制模块解析方式      |
| `baseUrl` / `paths` | 配置路径别名          |
| `noEmit`            | 只检查类型，不输出 JS |
| `declaration`       | 生成 `.d.ts` 类型声明 |

## 完整配置参考

```json
"compilerOptions": {
  "incremental": true,                    // 增量编译，第二次编译在第一次基础上进行
  "tsBuildInfoFile": "./buildFile",       // 增量编译文件存储位置
  "diagnostics": true,                    // 打印诊断信息
  "target": "ES5",                        // 目标语言版本
  "module": "CommonJS",                   // 模块标准
  "outFile": "./app.js",                  // 合并输出单文件（配合 AMD 模块）
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // 引用的标准库
  "allowJS": true,                        // 允许编译 JS/JSX 文件
  "checkJs": true,                        // 对 JS 文件做类型检查
  "outDir": "./dist",                     // 输出目录
  "rootDir": "./",                        // 源码根目录
  "declaration": true,                    // 自动生成 .d.ts 声明文件
  "declarationDir": "./file",             // 声明文件存放目录
  "emitDeclarationOnly": true,            // 只生成声明文件，不生成 JS
  "sourceMap": true,                      // 生成 sourceMap
  "inlineSourceMap": true,                // 内联 sourceMap
  "declarationMap": true,                 // 为声明文件生成 sourceMap
  "typeRoots": [],                        // 声明文件目录，默认 node_modules/@types
  "types": [],                            // 指定加载的声明文件包
  "removeComments": true,                 // 删除注释
  "noEmit": true,                         // 不输出文件
  "noEmitOnError": true,                  // 有错误时不输出
  "noEmitHelpers": true,                  // 不生成 helper 函数
  "importHelpers": true,                  // 通过 tslib 引入 helper
  "downlevelIteration": true,             // 降级遍历器实现（ES3/5）
  "strict": true,                         // 开启所有严格检查
  "alwaysStrict": true,                   // 注入 'use strict'
  "noImplicitAny": true,                  // 不允许隐式 any
  "strictNullChecks": true,              // 不允许 null/undefined 赋值给其他类型
  "strictFunctionTypes": true,           // 不允许函数参数双向协变
  "strictPropertyInitialization": true,   // 类实例属性必须初始化
  "strictBindCallApply": true,           // 严格的 bind/call/apply 检查
  "noImplicitThis": true,                // 不允许 this 隐式 any
  "noUnusedLocals": true,                // 检查未使用的局部变量
  "noUnusedParameters": true,            // 检查未使用的函数参数
  "noFallthroughCasesInSwitch": true,    // 防止 switch 穿透
  "noImplicitReturns": true,             // 每个分支都要有返回值
  "esModuleInterop": true,               // 允许 export= 由 import from 导入
  "allowUmdGlobalAccess": true,          // 允许模块中全局访问 UMD 模块
  "moduleResolution": "node",            // 模块解析策略
  "baseUrl": "./",                        // 非相对模块解析基地址
  "paths": {                              // 路径映射
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src", "out"],            // 虚拟目录合并
  "listEmittedFiles": true,              // 打印输出文件
  "listFiles": true                       // 打印编译的文件
}

"include": ["src/**/*"],   // 自动匹配所有 TS 文件
"exclude": ["demo.ts"],    // 排除文件
"files": ["demo.ts"]       // 手动指定文件
```

## 口诀

> **`target` 定版本，`module` 定规范，`strict` 全开保平安。**
> **`outDir` 管输出，`include` 管参与，`declaration` 生声明。**
> **`paths` 别名要配 `baseUrl`，`skipLibCheck` 加速编译。**

<!-- lazynote:end -->
