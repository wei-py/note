// import { createRequire } from 'node:module'
import antfu from "@antfu/eslint-config";

// const require = createRequire(import.meta.url)
// const autoImportJson = require('./types/.eslintrc-auto-import.json')

export default antfu({
  // pnpm: true,
  stylistic: {
    quotes: "double",
    semi: true,
  },
  markdown: false,
  react: true,
  typescript: true,
  languageOptions: {

    // ...autoImportJson,
  },
  rules: {
    "no-console": ["off"],
  },
});
