import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
// Ignorar todos tus warnings/errores actuales:
  'react-hooks/exhaustive-deps': 'off',   // ignora deps faltantes en useEffect/useMemo
  'prefer-const': 'off',                  // ignora "usar const en vez de let"

  // (Opcional) si quieres ignorar aún más advertencias:
  '@typescript-eslint/no-unused-vars': 'off',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  'no-constant-condition': 'off',
  'no-console': 'off',
  'no-debugger': 'off'
    },
  },
)
