import { defineConfig } from "eslint-define-config";
import pluginReact from "eslint-plugin-react";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: {
      react: pluginReact
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2025
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'no-unused-vars': 'error',
      'semi': ['error', 'always'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off'
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime'
    ]
  }
]);
