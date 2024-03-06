import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit';

export default defineNuxtModule({
    meta: {
        name: 'share',
    },

    async setup() {
        // @ts-ignore
        const { resolve } = createResolver(import.meta.url);

        extendPages((pages) => {
            pages.unshift({
                name: 'share',
                path: '/share',
                file: resolve('./pages/share.vue'),
            });
        });
    },
});
