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

    return charactersService.getMovesBySlug(slug);
});
