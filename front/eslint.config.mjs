// eslint.config.mjs
import eslintPluginReact from 'eslint-plugin-react';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'react': eslintPluginReact,
    },
    rules: {
      // Your custom rules go here
      '@typescript-eslint/no-unused-vars': 'off', // Ignore args prefixed with _
      '@typescript-eslint/no-explicit-any': 'off', // Disallow 'any' type usage
      'react/display-name': 'off', // Disable display-name warnings
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];