// @ts-check
import { join } from 'node:path'

import ts from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { FlatCompat } from '@eslint/eslintrc'
import vercelNext from '@vercel/style-guide/eslint/next'
import perfectionist from 'eslint-plugin-perfectionist'

const compat = new FlatCompat()

export default ts.config(
    ...ts.configs.recommended,
    ...compat.config(vercelNext),
    prettier,
    {
        ignores: ['**/node_modules/**', 'dist/'],
        languageOptions: {
            globals: {
                JSX: true,
                React: true,
                process: true,
            },
        },
        plugins: {
            perfectionist,
        },
        rules: {
            'perfectionist/sort-objects': [
                'error',
                {
                    order: 'asc',
                    type: 'natural',
                },
            ],
        },
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
