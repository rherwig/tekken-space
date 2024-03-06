import Prisma from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GithubProvider from '@auth/core/providers/github';
import type { AuthConfig } from '@auth/core/types';
import { prisma } from 'prisma/client';

import { useRuntimeConfig } from '#imports';
import { NuxtAuthHandler } from '#auth';

const runtimeConfig = useRuntimeConfig();

// Refer to Auth.js docs for more details
export const authOptions: AuthConfig = {
    // @ts-ignore
    adapter: PrismaAdapter(prisma),
    secret: runtimeConfig.authJs.secret,
    providers: [
        GithubProvider({
            clientId: runtimeConfig.github.clientId,
            clientSecret: runtimeConfig.github.clientSecret,
        }),
    ],
    callbacks: {
        session({ session, user }) {
            session.user = user as Prisma.User;
            return session;
        },
    },
};

export default NuxtAuthHandler(authOptions, runtimeConfig);
