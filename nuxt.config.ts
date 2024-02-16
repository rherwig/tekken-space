import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src',

    alias: {
        packages: fileURLToPath(new URL('./packages', import.meta.url)),
        prisma: fileURLToPath(new URL('./prisma', import.meta.url)),
    },

    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },

    css: ['~/assets/css/main.scss'],

    devtools: {
        enabled: true,

        timeline: {
            enabled: true,
        },
    },

    devServer: {
        host: 'localhost',
        port: 4200,
    },

    imports: {
        autoImport: false,
    },

    eslint: {
        lintOnStart: false,
        emitWarning: false,
    },

    modules: [
        '@nuxtjs/eslint-module',
        '@pinia/nuxt',
        '@nuxt/image',
        '@vueuse/nuxt',
        '@nuxt/ui',
    ],
});
