import { createResolver, defineNuxtModule, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
    meta: {
        name: 'moves',
    },

    async setup() {
        // @ts-ignore
        const { resolve } = createResolver(import.meta.url);

        await addComponentsDir({
            path: resolve('./components'),
        });
    },
});
