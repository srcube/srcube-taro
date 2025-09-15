import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    react: true,
    typescript: true,
    // apps are independent lints
    ignores: ['apps/docs', '**/*.md'],
  },
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'no-console': 'off',
      'node/prefer-global/process': 'off',
      'style/jsx-one-expression-per-line': 'off',
      'react/no-forward-ref': 'off',
      'react/no-use-context': 'off',
      'react/no-children-to-array': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
)
