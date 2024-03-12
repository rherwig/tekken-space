import { prisma } from 'prisma/client';
import { type Move } from 'prisma/types';

/**
 * Retrieves all moves from the database.
 *
 * @returns {Promise<Move[]>} A promise that resolves with an array of Move objects.
 */
export async function getAll(): Promise<Move[]> {
    return prisma.move.findMany();
}
