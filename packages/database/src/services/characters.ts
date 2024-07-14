import { eq } from 'drizzle-orm'

import { db } from '../connection'
import { characters, type CreateCharacter } from '../schema'

export async function findAll() {
    return db.select().from(characters)
}

export async function findOne(id: string) {
    const [result] = await db
        .select()
        .from(characters)
        .where(eq(characters.id, id))

    return result
}

export async function create(data: CreateCharacter) {
    const [result] = await db.insert(characters).values(data).returning()

    return result
}

export async function update(data: CreateCharacter) {
    const [result] = await db
        .update(characters)
        .set(data)
        .where(eq(characters.id, data.id))
        .returning()

    return result
}

export async function upsert(data: CreateCharacter) {
    const existing = await findOne(data.id)

    return !existing ? create(data) : update(data)
}

export async function remove(id: string) {
    return db.delete(characters).where(eq(characters.id, id))
}
