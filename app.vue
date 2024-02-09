<script lang="ts" setup>
const SITE_TITLE = 'Tekken Space';

useHead({
    titleTemplate(title) {
        return title ? `${title} - ${SITE_TITLE}` : SITE_TITLE;
    },
    htmlAttrs: {
        lang: 'en',
    },
    meta: [
        {
            name: 'description',
            content:
                'Find combos, frame data, and more for your favorite Tekken 8 characters. Easy to use, free, without ads.',
        },
        {
            name: 'msapplication-TileColor',
            content: '#05070D',
        },
        {
            name: 'msapplication-TileImage',
            content: '/icons/ms-icon-144x144.png',
        },
        {
            name: 'theme-color',
            content: '#05070D',
        },
    ],
    link: [
        {
            rel: 'apple-touch-icon',
            sizes: '57x57',
            href: '/icons/apple-icon-57x57.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '60x60',
            href: '/icons/apple-icon-60x60.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '72x72',
            href: '/icons/apple-icon-72x72.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '76x76',
            href: '/icons/apple-icon-76x76.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '114x114',
            href: '/icons/apple-icon-114x114.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '120x120',
            href: '/icons/apple-icon-120x120.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '144x144',
            href: '/icons/apple-icon-144x144.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '152x152',
            href: '/icons/apple-icon-152x152.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/icons/apple-icon-180x180.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '192x192',
            href: '/icons/android-icon-192x192.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/icons/favicon-16x16',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/icons/favicon-32x32',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '96x96',
            href: '/icons/favicon-96x96',
        },
        {
            rel: 'manifest',
            href: '/manifest.json',
        },
    ],
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
        <UNotifications />
    </NuxtLayout>
</template>
