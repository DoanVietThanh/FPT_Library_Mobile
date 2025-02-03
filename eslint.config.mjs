import pluginJs from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettierConfig, // Disables conflicting ESLint rules with Prettier
  {
    ignores: ['node_modules/', 'android/', 'ios/', 'build/'],
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      'react/no-unescaped-entities': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-native/no-inline-styles': 'off',
      '@typescript-eslint/no-explicit-any': 'error', // Disallow usage of any
      '@typescript-eslint/no-require-imports': 'off',
      'react/display-name': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]
