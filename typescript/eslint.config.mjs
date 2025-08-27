import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: {
    quotes: "double",
    semi: true,
  },
  typescript: true,
  rules: {
    "style/max-len": ["error", { code: 100 }],
    "unused-imports/no-unused-vars": ["warn"],
  },
});
