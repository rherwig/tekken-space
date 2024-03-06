import { addServerHandler, createResolver, defineNuxtModule, addComponentsDir } from '@nuxt/kit';

export default defineNuxtModule({
    meta: {
        name: 'auth',
    },

    async setup() {
        // @ts-ignore
        const { resolve } = createResolver(import.meta.url);

        addServerHandler({
            route: '/api/auth/:action',
            handler: resolve('./server/api/auth/[...].ts'),
        });

        await addComponentsDir({
            path: resolve('./components'),
        });
    },
});
