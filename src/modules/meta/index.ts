import {
    addServerHandler,
    createResolver,
    defineNuxtModule,
    addComponentsDir,
    extendPages,
} from '@nuxt/kit';

export default defineNuxtModule({
    meta: {
        name: 'importer',
    },

    async setup() {
        // @ts-ignore
        const { resolve } = createResolver(import.meta.url);

        // await addComponentsDir({
        //     path: resolve('./components'),
        // });

        extendPages((pages) => {
            pages.unshift({
                name: 'imprint',
                path: '/imprint',
                file: resolve('./pages/imprint.vue'),
            });

            pages.unshift({
                name: 'privacy',
                path: '/privacy',
                file: resolve('./pages/privacy.vue'),
            });
        });
    },
});
