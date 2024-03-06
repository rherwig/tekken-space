import { defineEventHandler, readBody } from 'h3';
import { prisma } from 'prisma/client';

import { getServerSession } from '#auth';
import { authOptions } from '~/modules/auth/server/api/auth/[...]';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name, characterId } = body;
    if (!name) {
        return {
            status: 400,
            body: 'Name is required',
        };
    }

    if (!characterId) {
        return {
            status: 400,
            body: 'Character ID is required',
        };
    }

    const session = await getServerSession(event, authOptions);
    if (!session?.user) {
        return {
            status: 401,
            body: 'Unauthorized',
        };
    }

    const authorId = session.user.id;

    try {
        const moveList = await prisma.moveList.create({
            data: {
                name,
                characterId,
                authorId,
            },
        });

        return prisma.moveList.findUnique({
            where: {
                id: moveList.id,
            },
            include: {
                character: true,
                moves: true,
            },
        });
    } catch (error: any) {
        return error;
    }
});
