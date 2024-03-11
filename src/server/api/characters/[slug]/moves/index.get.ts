import { prisma } from 'prisma/client';
import { createError, defineEventHandler, getRouterParam } from 'h3';

import * as charactersService from '~/server/services/characters';

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');

    if (!slug) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing slug',
        });
    }

    try {
        return charactersService.getMovesBySlug(slug);
    } catch (error: any) {
        return error;
    }
});
