import { defineStore } from 'pinia';
import { computed, type ComputedRef, ref } from 'vue';
import { $fetch } from 'ofetch';
import type { Character } from 'prisma/types';

export const useCharacters = defineStore('characters', () => {
    /**
     * List of all characters.
     */
    const all = ref<Character[]>([]);

    /**
     * The currently selected character's id.
     */
    const selectedId = ref<string | null>(null);

    /**
     * The currently selected character.
     */
    const selected: ComputedRef<Character | undefined> = computed(() => {
        return all.value.find((character) => character.id === selectedId.value);
    });

    /**
     * Fetches all characters from the API.
     */
    async function fetchAll() {
        try {
            all.value = await $fetch<Character[]>('/api/characters');

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
