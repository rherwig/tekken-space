import { computed, type ComputedRef, ref } from 'vue';
import { defineStore } from 'pinia';
import Prisma from '@prisma/client';
import {
    ControllerLayout,
    type PopulatedMoveList,
    type TemporaryUserPreferences,
    type User,
    type UserPreferences,
} from 'prisma/types';
import { $fetch } from 'ofetch';

import { useAuth, useIsomorphicUrl } from '#build/imports';

export const useProfile = defineStore('profile', () => {
    const auth = useAuth();

    /**
     * The user's preferences.
     */
    const preferences = ref<UserPreferences>({
        layout: ControllerLayout.GAMEPAD,
    });

    /**
     * The user's temporary preferences, used for remembering form selections and other QoL features.
     */
    const temporaryPreferences = ref<TemporaryUserPreferences>({});

    /**
     * The user's move lists.
     */
    const moveLists = ref<PopulatedMoveList[]>([]);

    /**
     * The user's data.
     */
    const user: ComputedRef<User | undefined> = computed(() => {
        return auth.session.value?.user;
    });

    /**
     * Fetches the user's move lists from the API.
     */
    async function fetchMoveLists(handle: string) {
        try {
            const url = useIsomorphicUrl(`/api/users/${handle}/move-lists`);

            moveLists.value = await $fetch<PopulatedMoveList[]>(url);

            return moveLists.value;
        } catch (error: any) {
            console.error(error);
            return [];
        }
    }

    /**
     * Deletes a move list from the user's account.
     * @param id
     */
    async function deleteMoveList(id: string) {
        try {
            await $fetch<PopulatedMoveList>(`/api/move-lists/${id}`, {
                method: 'DELETE',
            });

            moveLists.value = moveLists.value.filter((list) => list.id !== id);

            return moveLists.value;
        } catch (error: any) {
            console.error(error);
            return [];
        }
    }

    /**
     * Creates a new move list for the user.
     * @param name
     * @param characterId
     */
    async function createMoveList(name: string, characterId: string, authorId?: string) {
        try {
            const moveList = await $fetch<PopulatedMoveList>('/api/move-lists', {
                method: 'PUT',
                body: JSON.stringify({ name, characterId, authorId }),
            });

            moveLists.value.push(moveList);

            return moveList;
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }

    /**
     * Creates a new move for the user and adds it to a move list.
     * @param notation
     * @param moveListId
     * @param damage
     * @param metadata
     */
    async function createMove(
        notation: string,
        moveListId: string,
        damage: any = {},
        metadata: any = {},
    ) {
        try {
            const move = await $fetch<Prisma.Move>(`/api/move-lists/${moveListId}/moves`, {
                method: 'POST',
                body: JSON.stringify({ notation, moveListId, damage, metadata }),
            });

            const moveList = moveLists.value.find((list) => list.id === moveListId);
            if (moveList) {
                moveList.moves.push(move);
            }

            return move;
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }

    return {
        user,
        preferences,
        temporaryPreferences,
        moveLists,
        fetchMoveLists,
        createMoveList,
        deleteMoveList,
        createMove,
    };
});
