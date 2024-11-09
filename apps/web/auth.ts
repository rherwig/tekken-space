import NextAuth from 'next-auth'
import authConfig from '@/auth.config'

import { dbAdapter } from '@tekken-space/database/adapters'
import { profilesService } from '@tekken-space/database/services'
import { type User } from '@tekken-space/database/schema'

declare module 'next-auth' {
    interface Session {
        user: User
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: dbAdapter,
    callbacks: {
        async session({ session }) {
            if (!session.user?.email) {
                return session
            }

            const profile = await profilesService.findByEmail(
                session.user.email,
            )
            return {
                ...session,
                user: profile as User,
            }
        },
    },
    ...authConfig,
})
