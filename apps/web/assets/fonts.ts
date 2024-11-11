import localFont from 'next/font/local'

export const logoFont = localFont({
    src: [
        {
            path: './fonts/tarrget.ttf',
            style: 'normal',
        },
        {
            path: './fonts/tarrgetital.ttf',
            style: 'italic',
        },
    ],
    variable: '--font-logo',
})
