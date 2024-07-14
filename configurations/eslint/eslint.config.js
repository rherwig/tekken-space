// @ts-check
import { join } from 'node:path'

import js from '@eslint/js'
import ts from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { FlatCompat } from '@eslint/eslintrc'
import vercelNext from '@vercel/style-guide/eslint/next'

const compat = new FlatCompat()

export default ts.config(
    js.configs.recommended,
    ...ts.configs.recommended,
    ...compat.config(vercelNext),
    prettier,
    {
        languageOptions: {
            globals: {
                JSX: true,
                React: true,
                process: true,
            },
        },
        ignores: ['**/node_modules/**', 'dist/'],
    },
    {
        files: ['**/*.ts(x)?'],
        languageOptions: {
            parserOptions: {
                project: join(process.cwd(), 'tsconfig.(*.)?json'),
                tsconfigRootDir: process.cwd(),
            },
        },
        rules: {
            '@typescript-eslint/ban-ts-comment': 'off',
        },
    },
)
