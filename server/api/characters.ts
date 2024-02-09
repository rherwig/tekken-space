import { prisma } from '~/prisma/client';

export default defineEventHandler(async (event) => {
    try {
        return await prisma.character.findMany();
    } catch (error: any) {
        return error;
    }
});
