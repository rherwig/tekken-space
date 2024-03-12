import {
    addServerHandler,
    createResolver,
    defineNuxtModule,
    addComponentsDir,
    extendPages,
} from '@nuxt/kit';

export default defineNuxtModule({
    meta: {
        name: 'community',
    },

    async setup() {
        // @ts-ignore
        const { resolve } = createResolver(import.meta.url);

        await addComponentsDir({
            path: resolve('./components'),
        });

        addServerHandler({
            route: '/api/creators',
            handler: resolve('./server/api/creators/index.get.ts'),
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
