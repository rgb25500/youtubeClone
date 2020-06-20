module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: "off",
    "linebreak-style": "off",
    "no-console": "off",
    "eslintspaced-comment": "off",
    "prettier/prettier": "off",
    "spaced-comment": "off",
    "no-undef": "off",
    "no-unused-vars": "off",
    "comma-dangle": "off",
    "no-else-return": "off",
  },
};
