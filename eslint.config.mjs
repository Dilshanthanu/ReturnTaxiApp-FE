// eslint.config.mjs
import expoConfig from "eslint-config-expo/flat.js";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import pluginI18nJson from "eslint-plugin-i18n-json";
import tseslint from "typescript-eslint";

export default tseslint.config([
  expoConfig,
  ...tseslint.configs.recommended,

  {
    name: "custom-rules",
    plugins: {
      unicorn: pluginUnicorn,
      "unused-imports": pluginUnusedImports,
      "i18n-json": pluginI18nJson,
      prettier: pluginPrettier,
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },

    rules: {
      // ✅ Prettier integration
      "prettier/prettier": "error",
      ...configPrettier.rules,

      // General
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "warn",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ✅ Import order
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "react-native",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "never",
        },
      ],

      // Unicorn plugin
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": [
        "warn",
        { cases: { camelCase: true, pascalCase: true } },
      ],

      // Unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],

      // i18n JSON validation
      "i18n-json/valid-message-syntax": "error",
    },

    ignores: ["dist/*", "build/*", "node_modules/*", ".expo/*"],
  },
]);
