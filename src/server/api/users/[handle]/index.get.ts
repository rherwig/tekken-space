import { createError, defineEventHandler, getRouterParam } from 'h3';

import * as usersService from '~/server/services/users';

export default defineEventHandler(async (event) => {
    const handle = getRouterParam(event, 'handle');

    if (!handle) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No handle specified.',
        });
    }

    return usersService.getByHandle(handle);
});
