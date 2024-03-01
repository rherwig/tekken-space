import { defineNuxtConfig } from 'nuxt/config';
import { fileURLToPath } from 'node:url';
import { provider } from 'std-env';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src',

    alias: {
        packages: fileURLToPath(new URL('./packages', import.meta.url)),
        prisma: fileURLToPath(new URL('./prisma', import.meta.url)),
        cookie: fileURLToPath(new URL('./node_modules/cookie', import.meta.url)),
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

    runtimeConfig: {
        authJs: {
            secret: process.env.NUXT_AUTH_JS_SECRET,
        },
        github: {
            clientId: process.env.NUXT_GITHUB_CLIENT_ID,
            clientSecret: process.env.NUXT_GITHUB_CLIENT_SECRET,
        },
        public: {
            authJs: {
                baseUrl: process.env.NUXT_PUBLIC_AUTH_JS_BASE_URL,
                verifyClientOnEveryRequest: true,
            },
        },
    },

    eslint: {
        lintOnStart: false,
        emitWarning: false,
    },

    tailwindcss: {
        viewer: false,
    },

    modules: [
        '@hebilicious/authjs-nuxt',
        '@nuxtjs/eslint-module',
        '@pinia/nuxt',
        '@nuxt/image',
        '@vueuse/nuxt',
        '@nuxt/ui',
    ],
});
