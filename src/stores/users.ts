import Prisma from '@prisma/client';
import { defineStore } from 'pinia';
import { $fetch } from 'ofetch';
import { ref } from 'vue';

import { useIsomorphicUrl } from '~/composables/isomorphic-url';

export const useUsers = defineStore('users', () => {
    const byHandle = ref<Record<string, Prisma.User>>({});

    async function fetchByHandle(handle: string) {
        try {
            const url = useIsomorphicUrl(`/api/users/${handle}`);
            const user = await $fetch<Prisma.User>(url);

            byHandle.value[handle] = user;

            return user;
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }

    return {
        byHandle,
        fetchByHandle,
    };
});
