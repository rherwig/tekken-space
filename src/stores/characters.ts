import { defineStore } from 'pinia';
import { computed, type ComputedRef, ref } from 'vue';
import Prisma from '@prisma/client';
import { $fetch } from 'ofetch';

export const useCharacters = defineStore('characters', () => {
    /**
     * List of all characters.
     */
    const all = ref<Prisma.Character[]>([]);

    /**
     * The currently selected character's id.
     */
    const selectedId = ref<string | null>(null);

    /**
     * The currently selected character.
     */
    const selected: ComputedRef<Prisma.Character | undefined> = computed(() => {
        return all.value.find((character) => character.id === selectedId.value);
    });

    /**
     * Fetches all characters from the API.
     */
    async function fetchAll() {
        try {
            all.value = await $fetch('/api/characters');

            return all.value;
        } catch (error: any) {
            console.error(error);
            return [];
        }
    }

    return {
        all,
        selectedId,
        selected,
        fetchAll,
    };
});
