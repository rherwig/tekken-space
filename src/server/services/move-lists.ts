import { prisma } from 'prisma/client';
import { type MoveList } from 'prisma/types';

/**
 * Retrieves all move lists from the database.
 *
 * @returns {Promise<MoveList[]>} A promise that resolves with an array of MoveList objects.
 */
export async function getAll(): Promise<MoveList[]> {
    return prisma.moveList.findMany();
}

/**
 * Retrieves a move list by the ID of its author.
 *
 * @param {string} authorId The ID of the move list's author.
 * @returns {Promise<MoveList | null>} A promise that resolves with a MoveList object, or null if no move list was found.
 */
export async function getByAuthorId(authorId: string): Promise<MoveList[]> {
    return prisma.moveList.findMany({
        where: {
            authorId,
        },
        include: {
            character: true,
            moves: true,
        },
    });
}
