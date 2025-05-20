import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  {
    react: true,
    typescript: true,
    // apps are independent lints
    ignores: ['apps/**'],
  },
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'no-console': 'off',
      'react/no-forward-ref': 'off',
      'react/no-use-context': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
)
