import { db } from '../connection'
import { users } from '../schema'
import { eq } from 'drizzle-orm'

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
