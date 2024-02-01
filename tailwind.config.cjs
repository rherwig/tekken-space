const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'pages/**/*.{ts,vue}',
        'components/**/*.{ts,vue}',
        'assets/**/*.scss',
        'app.vue'
    ],
    theme: {
        extend: {
            container: {
                center: true,
            },

            colors: {
                primary: colors.teal[500],
                error: colors.red[500],
                success: colors.green[500],
                info: colors.blue[500],
                background: colors.zinc[900],
                copy: colors.zinc[100],
            },

            fontSize: {
                display: '8rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwind-scrollbar')({
            nocompatible: true,
        }),
        require('tailwindcss-debug-screens'),
    ],
};
