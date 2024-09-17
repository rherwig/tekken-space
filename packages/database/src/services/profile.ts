import { db } from '../connection'
import { Profile, users } from '../schema'
import { eq } from 'drizzle-orm'

export async function findByEmail(email: string) {
    const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

    if (!user) {
        return null
    }

    const profile: Profile = {
        handle: user.handle,
        id: user.id,
        image: user.image,
        isPro: user.isPro,
        isVirtual: user.isVirtual,
        role: user.role,
    }

    return profile
}

export async function isHandleAvailable(handle: string) {
    const results = await db
        .select({ handle: users.handle })
        .from(users)
        .where(eq(users.handle, handle))

    return results.length === 0
}

export async function updateHandle(userId: string, handle: string) {
    await db
        .update(users)
        .set({
            handle,
        })
        .where(eq(users.id, userId))
}
