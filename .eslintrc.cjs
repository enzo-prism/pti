module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "next/typescript"],
  ignorePatterns: ["dist", ".next"],
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
  },
};
