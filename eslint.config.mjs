import antfu from '@antfu/eslint-config'
import globals from 'globals'

export default antfu(
  { react: true, typescript: true },
  { languageOptions: { globals: globals.browser } },
)
