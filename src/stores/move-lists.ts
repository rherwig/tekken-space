import { defineStore } from 'pinia';
import { $fetch } from 'ofetch';
import type { MoveList } from 'prisma/types';

import { useIsomorphicUrl } from '~/composables/isomorphic-url';

export const useMoveLists = defineStore('users', () => {
    async function fetchById(id: string): Promise<MoveList | null> {
        try {
            const url = useIsomorphicUrl(`/api/move-lists/${id}`);

            return $fetch<MoveList>(url);
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }

    return {
        fetchById,
    };
});
