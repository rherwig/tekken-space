import { addServerHandler, createResolver, defineNuxtModule, addComponentsDir } from '@nuxt/kit';

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
    },
});
