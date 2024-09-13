// @ts-check
import { join } from 'node:path'

import ts from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import perfectionist from 'eslint-plugin-perfectionist'

export default ts.config(
    ...ts.configs.recommended,
    {
        ignores: ['**/node_modules/**', 'dist/', 'public/'],
        languageOptions: {
            globals: {
                JSX: true,
                process: true,
                React: true,
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
    prettier,
)
