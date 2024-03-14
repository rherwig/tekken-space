import { computed, type ComputedRef, ref } from 'vue';
import { defineStore } from 'pinia';
import Prisma from '@prisma/client';
import {
    ControllerLayout,
    Move,
    type MoveList,
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
     * @param dto
     */
    async function createMoveList(dto: Partial<MoveList>) {
        try {
            const moveList = await $fetch<PopulatedMoveList>('/api/move-lists', {
                method: 'PUT',
                body: JSON.stringify(dto),
            });

            if (!dto.id) {
                moveLists.value.push(moveList);
            } else {
                const index = moveLists.value.findIndex((list) => list.id === dto.id);
                moveLists.value[index] = moveList;
            }

            return moveList;
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }

    /**
     * Creates a new move for the user and adds it to a move list.
     * @param dto
     * @param moveListId
     */
    async function createMove(dto: Partial<Move>, moveListId: string) {
        try {
            const move = await $fetch<Prisma.Move>(`/api/move-lists/${moveListId}/moves`, {
                method: 'PUT',
                body: JSON.stringify(dto),
            });

            const moveList = moveLists.value.find((list) => list.id === moveListId);
            if (moveList) {
                if (!dto.id) {
                    moveList.moves.push(move);
                } else {
                    const index = moveList.moves.findIndex((m) => m.id === dto.id);
                    moveList.moves[index] = move;
                }
            }

            return move;
        } catch (error: any) {
            console.error(error);
            return null;
        }
    }

    /**
     * Deletes a move from the user's account.
     * @param id
     * @param moveListId
     */
    async function deleteMove(id: string, moveListId: string) {
        try {
            await $fetch<PopulatedMoveList>(`/api/moves/${id}`, {
                method: 'DELETE',
            });

            const moveList = moveLists.value.find((list) => list.id === moveListId);
            if (moveList) {
                moveList.moves = moveList.moves.filter((move) => move.id !== id);
            }

            return true;
        } catch (error: any) {
            console.error(error);
            return [];
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
        deleteMove,
    };
});
