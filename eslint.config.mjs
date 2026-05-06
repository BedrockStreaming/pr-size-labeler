import github from 'eslint-plugin-github';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

export default tseslint.config(
  // Base github recommended rules (without TypeScript-specific ones)
  github.getFlatConfigs().recommended,

  // TypeScript-specific rules from github plugin
  ...github.getFlatConfigs().typescript,

  // Prettier integration (must come after other formatting rules)
  prettierPlugin,

  // TypeScript files
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
      globals: {
        ...globals.node,
        ...globals.es2022,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.eslint.json',
        },
      },
    },
    rules: {
      // Disabled: filenames rule conflicts with .js extension imports in ESM
      'github/filenames-match-regex': 'off',
      // Disabled: English is fine for this action
      'i18n-text/no-en': 'off',
      // Allow namespace imports for @actions/github (used as `github.context` etc.)
      'import/no-namespace': 'off',
    },
  },

  // Jest test files
  {
    files: ['**/*.test.ts'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },

  // Config files are not processed by TypeScript - disable import resolution checks
  {
    files: ['*.mjs', '*.cjs', '*.js'],
    rules: {
      'import/no-unresolved': 'off',
    },
  },

  // Ignore built artifacts and dependencies
  {
    ignores: ['dist/**', 'lib/**', 'node_modules/**'],
  },
);
