import { defineAppConfig } from 'nuxt/app';

export default defineAppConfig({
    ui: {
        badge: {
            rounded: 'rounded-sm',
        },
        icons: {
            dynamic: true,
        },
        notifications: {
            position: 'bottom-0 top-auto',
        },
    },
});
