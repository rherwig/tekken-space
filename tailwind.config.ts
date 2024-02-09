import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import typography from '@tailwindcss/typography';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default <Config>{
    content: [
        'layouts/**/*.{ts,vue}',
        'pages/**/*.{ts,vue}',
        'components/**/*.{ts,vue}',
        'ui/**/*.{ts,vue}',
        'assets/**/*.scss',
        'app.vue',
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },

            colors: {
                primary: '#05070D',
                accent: colors.red[500],
                error: colors.red[500],
                success: colors.green[500],
                info: colors.blue[500],
                background: '#05070D',
                copy: colors.zinc[100],
            },

            fontSize: {
                display: '8rem',
            },

            fontFamily: {
                logo: "'Tarrget', serif",
            },
        },
    },
    plugins: [
        typography,
        scrollbar({
            nocompatible: true,
        }),
    ],
};
