import { type NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'

export default {
    providers: [GitHub],
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        strategy: 'jwt',
    },
} satisfies NextAuthConfig
