import {
    createResolver,
    defineNuxtModule,
    addComponentsDir,
    extendRouteRules,
    extendPages,
} from '@nuxt/kit';

export default defineNuxtModule({
    meta: {
        name: 'characters',
    },

    async setup() {
        // @ts-ignore
        const { resolve } = createResolver(import.meta.url);

        await addComponentsDir({
            path: resolve('./components'),
        });
    },
});
