// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    alias: {
        cookie: 'cookie',
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
    eslint: {
        lintOnStart: false,
    },
    runtimeConfig: {
        authJs: {
            secret: process.env.AUTH_SECRET,
        },
        github: {
            clientId: process.env.GITHUB_OAUTH_CLIENT_ID,
            clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
        },
        public: {
            authJs: {
                baseUrl: process.env.AUTH_URL,
                verifyClientOnEveryRequest: true,
            },
        },
    },
    modules: [
        // '@hebilicious/authjs-nuxt',
        '@nuxtjs/eslint-module',
        '@pinia/nuxt',
        '@nuxt/image',
        '@vueuse/nuxt',
        '@nuxt/ui',
    ],
});
