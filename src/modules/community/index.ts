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

        await addComponentsDir({
            path: resolve('./components'),
        });

        extendPages((pages) => {
            pages.unshift({
                name: 'community',
                path: '/community',
                file: resolve('./pages/community.vue'),
            });
        });
    },
});
