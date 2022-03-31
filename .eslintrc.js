module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "prettier"],
  rules: {
    quotes: ["error", "double"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        exports: "always-multiline",
        functions: "never",
        imports: "always-multiline",
        objects: "always-multiline",
      },
    ],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "react/jsx-handler-names": [
      "error",
      {
        // airbnb is disabling this rule
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on",
      },
    ],
    "react/sort-prop-types": ["error", { sortShapeProp: true }],
    "import/prefer-default-export": 0,
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
    "prettier/prettier": "error",
  },
};
