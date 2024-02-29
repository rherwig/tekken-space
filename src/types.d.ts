import Prisma from '@prisma/client';

declare module '@auth/core/types' {
    interface Session {
        user?: Prisma.User;
    }
}

export {};
