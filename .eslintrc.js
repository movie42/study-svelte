module.exports = {
  settings: {
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    "import/resolver": {
      node: {},
      typescript: {},
    },
  },
  plugins: ["import", "prettier", "unused-imports", "@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "_" }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "import/named": "off",
    "import/no-unresolved": "off",
    "import/export": "off",
    "import/first": 1,
    "import/newline-after-import": ["error", { count: 1 }],
    "import/order": [
      "warn",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
      },
    ],
    "unused-imports/no-unused-imports": ["error"],
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "no-console": "error",
    "prettier/prettier": "off",
  },
};
