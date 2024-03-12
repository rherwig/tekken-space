import type { User as PrismaUser } from 'prisma/types';

declare module '@auth/core/types' {
    interface Session {
        user?: PrismaUser;
    }

    type User = PrismaUser;
}

export {};
