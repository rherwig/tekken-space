import { Lucia, TimeSpan } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { GitHub } from 'arctic'

import { db, sessions, users, type Profile } from '@tekken-space/database'

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users)

export { validateRequest } from './validate-session'

export const lucia = new Lucia(adapter, {
    getSessionAttributes: () => {
        return {}
    },
    getUserAttributes: (attributes) => {
        return {
            handle: attributes.handle,
            id: attributes.id,
            image: attributes.image,
            isPro: attributes.isPro,
            isVirtual: attributes.isVirtual,
            role: attributes.role,
        }
    },
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === 'production',
        },
        expires: false,
        name: 'session',
    },
    sessionExpiresIn: new TimeSpan(30, 'd'),
})

export const gitHub = new GitHub(
    process.env.AUTH_GITHUB_ID!,
    process.env.AUTH_GITHUB_SECRET!,
)

type DatabaseUserAttributes = Profile

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: DatabaseUserAttributes
    }
}
