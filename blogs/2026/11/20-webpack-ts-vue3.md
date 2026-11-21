---
title: Webpack 构建 TS + Vue3 项目
created: 2026-06-13
tags:
  - webpack
  - typescript
  - vue3
  - guide
  - config
  - frontend
summary: 从零搭建 Webpack + TypeScript + Vue3 项目的完整配置指南
cover: /assets/default-cover.jpg
updated: 2026-06-13
lazynote_generated: true
lazynote_id: 2385c1ac-d657-4564-b347-8693579a5d73
date: 2026-11-10
source: 20-webpack-ts-vue3.md
---

<!-- lazynote:body -->
---
title: Webpack 构建 TS + Vue3 项目
created: '2026-06-13'
tags:
  - webpack
  - typescript
  - vue3
  - guide
  - config
  - frontend
summary: 从零搭建 Webpack + TypeScript + Vue3 项目的完整配置指南
cover: /assets/default-cover.jpg
updated: '2026-06-13'
---
# Webpack 构建 TS + Vue3 项目

> 从零搭建 Webpack + TypeScript + Vue3 项目，逐步添加功能。

---

## 项目目录结构

```
src/
  ├── main.ts
  ├── App.vue
  └── shim.d.ts
webpack.config.js
index.html
package.json
tsconfig.json
```

---

## 第一步：基础构建

```bash
npm install webpack webpack-dev-server webpack-cli -D
```

`package.json` 添加命令：

```json
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack-dev-server"
  }
}
```

`webpack.config.js`：

```javascript
const { Configuration } = require('webpack')
const path = require('path')
/** @type {Configuration} */
const config = {
  mode: "development",
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  }
}
module.exports = config
```

---

## 第二步：支持 TypeScript

```bash
npm install ts-loader typescript -D
```

配置 `tsconfig.json`：

```json
{
  "include": ["src/**/*"]
}
```

webpack 添加 loader：

```javascript
module: {
  rules: [
    { test: /\.ts$/, use: 'ts-loader' }
  ]
}
```

---

## 第三步：支持 Vue

```bash
npm install vue-loader html-webpack-plugin -D
```

`src/main.ts`：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
createApp(App).mount('#app')
```

让 TS 识别 `.vue` 文件（`shim.d.ts`）：

```typescript
declare module "*.vue" {
  import { DefineComponent } from "vue"
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

完整 webpack 配置：

```javascript
const { Configuration } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
/** @type {Configuration} */
const config = {
  mode: "development",
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  stats: 'errors-only',
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './index.html' })
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      },
      { test: /\.vue$/, use: 'vue-loader' }
    ]
  }
}
module.exports = config
```

---

## 第四步：支持 CSS + Less

```bash
npm install css-loader style-loader less less-loader -D
```

添加规则：

```javascript
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader'] // 从右向左解析
},
{
  test: /\.less$/,
  use: ['style-loader', 'css-loader', 'less-loader']
}
```

---

## 第五步：代码分包

性能优化，避免所有代码打包到一个文件：

```javascript
optimization: {
  splitChunks: {
    cacheGroups: {
      moment: {
        name: "moment",
        test: /[\\/]node_modules[\\/]moment[\\/]/,
        chunks: "all"
      },
      common: {
        name: "common",
        chunks: "all",
        minChunks: 2
      }
    }
  }
}
```

---

## 第六步：单独提取 CSS

通过 `link` 标签引入 CSS，而非 `style` 标签动态插入：

```bash
npm install mini-css-extract-plugin -D
```

```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

plugins: [
  new MiniCssExtractPlugin()
],

// 替换 style-loader 为 MiniCssExtractPlugin.loader
{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
{ test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] }
```

---

## 依赖清单

| 依赖 | 作用 |
| --- | --- |
| `webpack` | 打包核心 |
| `webpack-cli` | 命令行工具 |
| `webpack-dev-server` | 开发服务器 |
| `ts-loader` | 编译 TypeScript |
| `vue-loader` | 编译 Vue 单文件组件 |
| `html-webpack-plugin` | 生成 HTML 模板 |
| `css-loader` | 解析 CSS |
| `style-loader` | 动态插入 style |
| `less` / `less-loader` | 编译 Less |
| `mini-css-extract-plugin` | 提取 CSS 为独立文件 |

---

## 口诀总结

> **webpack 四件套：loader 编译、plugin 增强、entry 入口、output 出口。**
> **TS 加 `ts-loader`，Vue 加 `vue-loader`，`.vue` 要声明模块。**
> **CSS 从右向左解析：`style-loader` → `css-loader` → `less-loader`。**
> **分包用 `splitChunks`，提取 CSS 用 `mini-css-extract-plugin`。**

<!-- lazynote:end -->
