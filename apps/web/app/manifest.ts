import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        background_color: '#05070D',
        description: 'Your source for combos, moves and more things Tekken 8.',
        display: 'standalone',
        icons: [
            {
                sizes: '36x36',
                src: '/icons/android-icon-36x36.png',
                type: 'image/png',
            },
            {
                sizes: '48x48',
                src: '/icons/android-icon-48x48.png',
                type: 'image/png',
            },
            {
                sizes: '72x72',
                src: '/icons/android-icon-72x72.png',
                type: 'image/png',
            },
            {
                sizes: '96x96',
                src: '/icons/android-icon-96x96.png',
                type: 'image/png',
            },
            {
                sizes: '144x144',
                src: '/icons/android-icon-144x144.png',
                type: 'image/png',
            },
            {
                sizes: '192x192',
                src: '/icons/android-icon-192x192.png',
                type: 'image/png',
            },
            {
                purpose: 'maskable',
                sizes: '512x512',
                src: '/icons/android-icon-512x512.png',
                type: 'image/png',
            },
        ],
        name: 'Tekken Space',
        short_name: 'TekkenSpace',
        start_url: '.',
        theme_color: '#05070D',
    }
}
