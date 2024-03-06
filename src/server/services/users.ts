import { prisma } from 'prisma/client';
import { type User } from 'prisma/types';

/**
 * Retrieves all users from the database.
 *
 * @returns {Promise<User[]>} A promise that resolves with an array of User objects.
 */
export async function getAll(): Promise<User[]> {
    return prisma.user.findMany();
}

/**
 * Retrieves a user from the database by their handle.
 *
 * @param {string} handle The handle of the user to retrieve.
 * @returns {Promise<User | null>} A promise that resolves with a User object, or null if no user was found.
 */
export async function getByHandle(handle: string): Promise<User | null> {
    return prisma.user.findFirst({
        where: {
            handle,
        },
        include: {
            moveLists: {
                include: {
                    character: true,
                    moves: true,
                },
            },
        },
    });
}
