import { defineEventHandler } from 'h3';

import * as charactersService from '~/server/services/characters';

export default defineEventHandler(async () => {
    return charactersService.getAll();
});
