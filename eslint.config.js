// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import { defineConfig, globalIgnores } from 'eslint/config'
//
// export default defineConfig([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{js,jsx}'],
//     extends: [
//       js.configs.recommended,
//       reactHooks.configs['recommended-latest'],
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         ecmaFeatures: { jsx: true },
//         sourceType: 'module',
//       },
//     },
//
//     rules: {
//       // --- Style and Formatting ---
//
//       // Enforce no semicolons at the end of statements
//       'semi': ['error', 'never'],
//
//       // Enforce 2-space indentation
//       'indent': ['error', 2],
//
//       // Enforce single quotes for strings
//       'quotes': ['error', 'single'],
//
//       // Require trailing commas for multiline arrays and objects
//       'comma-dangle': ['error', 'always-multiline'],
//
//       // Disallow trailing whitespace at the end of lines
//       'no-trailing-spaces': 'error',
//
//       // --- Best Practices & Code Quality ---
//
//       // Require the use of `===` and `!==` instead of `==` and `!=`
//       'eqeqeq': 'error',
//
//       // Disallow the use of `var`; require `let` or `const` instead
//       'no-var': 'error',
//
//       // Suggest using `const` for variables that are never reassigned
//       'prefer-const': 'error',
//
//       // Warn about unused variables, but allow unused function arguments that start with an underscore
//       // This is useful for Express middleware like `(req, res, _next) => { ... }`
//       'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
//
//       // Warn about the use of `console.log`, `console.warn`, etc.
//       // "no-console": "warn",
//       // Disallow more than one consecutive empty line
//       'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
//
//       // Enforce padding lines between statements for readability
//       'padding-line-between-statements': [
//         'error',
//         // Always require a blank line AFTER a block of variable declarations
//         { blankLine: 'always', prev: ['const', 'let'], next: '*' },
//         // But don't require it if the next statement is also a variable declaration
//         { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
//
//         // Always require a blank line BEFORE and after a `return` statement
//         { blankLine: 'always', prev: '*', next: 'return' },
//         { blankLine: 'always', prev: 'return', next: '*' },
//
//         // Always require a blank line BEFORE and AFTER control structures
//         { blankLine: 'always', prev: '*', next: ['if', 'for', 'while', 'switch', 'try'] },
//         { blankLine: 'always', prev: ['if', 'for', 'while', 'switch', 'try'], next: '*' },
//       ],
//     },
//   },
// ])
