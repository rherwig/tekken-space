import { prisma } from 'prisma/client';
import { Move } from 'prisma/types';

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
