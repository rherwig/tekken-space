import { eq, and } from 'drizzle-orm'

import { db } from '../connection'
import { CreateMove, moves } from '../schema'

export async function findAll() {
    return db.select().from(moves)
}

export async function findOne(id: string) {
    const [result] = await db.select().from(moves).where(eq(moves.id, id))

    return result
}

export async function findByCharacterId(characterId: string) {
    return db
        .select()
        .from(moves)
        .where(
            and(eq(moves.characterId, characterId), eq(moves.isCombo, false)),
        )
}

export async function create(data: CreateMove) {
    const [result] = await db.insert(moves).values(data).returning()

    return result
}

export async function createMany(data: CreateMove[]) {
    const [result] = await db.insert(moves).values(data).returning()

    return result
}

export async function remove(id: string) {
    return db.delete(moves).where(eq(moves.id, id))
}

export async function removeByCharacterId(id: string) {
    return db
        .delete(moves)
        .where(and(eq(moves.characterId, id), eq(moves.isCombo, false)))
}
