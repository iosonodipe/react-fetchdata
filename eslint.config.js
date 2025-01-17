import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {ignores: ['dist']},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        ignores: ['**/*.{ts,tsx}'],
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
                {allowConstantExport: true},
            ],
        },
    },
    {
        // Specifica regole per i file di test
        files: ['**/*.test.ts', '**/*.spec.ts'],
        rules: {
            'no-unused-vars': 'off', // Disattiva il controllo sulle variabili inutilizzate
            '@typescript-eslint/no-unused-vars': 'off', // Disattiva il controllo sulle variabili inutilizzate specifico per TypeScript
            'import/no-unused-modules': 'off', // Disattiva il controllo sugli import inutilizzati
        },
    },
)
