import { and, eq } from 'drizzle-orm'

import { db } from '../connection'
import { CreateMove, Move, moves } from '../schema'

export async function findAll() {
    return db.select().from(moves)
}

export async function findOne(id: string) {
    const [result] = await db.select().from(moves).where(eq(moves.id, id))

    return result
}

export async function findByCharacterId(characterId: string): Promise<Move[]> {
    const result = await db
        .select()
        .from(moves)
        .where(
            and(eq(moves.characterId, characterId), eq(moves.isCombo, false)),
        )
        .orderBy(moves.notation)

    return result as Move[]
}

export async function create(data: CreateMove) {
    const [result] = await db.insert(moves).values(data).returning()

    return result as Move
}

export async function createMany(data: CreateMove[]) {
    return db.insert(moves).values(data).returning()
}

export async function update(data: Move) {
    const [result] = await db
        .update(moves)
        .set(data)
        .where(eq(moves.id, data.id))
        .returning()

    return result
}

export async function upsert(data: Move) {
    const existing = await findOne(data.id)

    return !existing ? create(data) : update(data)
}

export async function remove(id: string) {
    return db.delete(moves).where(eq(moves.id, id))
}

export async function removeByCharacterId(id: string) {
    return db
        .delete(moves)
        .where(and(eq(moves.characterId, id), eq(moves.isCombo, false)))
}
