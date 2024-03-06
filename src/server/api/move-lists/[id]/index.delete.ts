import { defineEventHandler, getRouterParam } from 'h3';
import { prisma } from 'prisma/client';

import { getServerSession } from '#auth';
import { authOptions } from '~/modules/auth/server/api/auth/[...]';

export default defineEventHandler(async (event) => {
    const session = await getServerSession(event, authOptions);
    if (!session?.user) {
        return {
            status: 401,
            body: 'Unauthorized',
        };
    }

    const id = getRouterParam(event, 'id');
    if (!id) {
        return {
            status: 400,
            body: 'Missing id',
        };
    }

    try {
        const moveList = await prisma.moveList.findUnique({
            where: {
                id,
            },
        });

        if (!moveList) {
            return {
                status: 404,
                body: 'Not found',
            };
        }

        if (moveList.authorId !== session.user.id) {
            return {
                status: 403,
                body: 'Forbidden',
            };
        }

        await prisma.moveList.delete({
            where: {
                id,
            },
        });
    } catch (error: any) {
        return {
            status: 500,
            body: error,
        };
    }
});
