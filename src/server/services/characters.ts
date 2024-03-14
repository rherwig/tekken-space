import { prisma } from 'prisma/client';
import { Character, Move } from 'prisma/types';

/**
 * Get all characters from the database.
 */
export function getAll(): Promise<Character[]> {
    return prisma.character.findMany({
        orderBy: {
            name: 'asc',
        },
    });
}

/**
 * Get all moves of a character by their slug.
 *
 * @param slug
 */
export async function getMovesBySlug(slug: string): Promise<Move[]> {
    const character = await prisma.character.findFirst({
        where: {
            slug,
        },
    });

    if (!character) {
        return [];
    }

    return prisma.move.findMany({
        where: {
            characterId: character.id,
        },
    });
}
