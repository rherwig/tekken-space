import { eq } from 'drizzle-orm'

import { db } from '../connection'
import { CharacterMeta, characterMeta } from '../schema'

export async function findByCharacterId(id: string) {
    const [result] = await db
        .select()
        .from(characterMeta)
        .where(eq(characterMeta.characterId, id))

    return result
}

export async function create(data: CharacterMeta) {
    const [result] = await db.insert(characterMeta).values(data).returning()

    return result
}

export async function removeByCharacterId(id: string) {
    return db.delete(characterMeta).where(eq(characterMeta.characterId, id))
}
