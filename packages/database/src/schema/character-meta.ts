import { z } from 'zod'
import { sql } from 'drizzle-orm'
import { pgTable, pgEnum, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { cuid, cuidReference } from '../utils/schema'
import { characters } from './characters'

export const characterDifficulty = pgEnum('character_difficulty', [
    'beginner',
    'easy',
    'intermediate',
    'hard',
    'challenge',
])

export const characterMeta = pgTable('character_meta', {
    archetypes: text('archetypes')
        .array()
        .notNull()
        .default(sql`ARRAY[]::text[]`),
    characterId: cuidReference('character_id', characters.id),
    cons: text('cons')
        .array()
        .notNull()
        .default(sql`ARRAY[]::text[]`),
    difficulty: characterDifficulty('difficulty'),
    id: cuid('id').primaryKey(),
    pros: text('pros')
        .array()
        .notNull()
        .default(sql`ARRAY[]::text[]`),
    title: text('title'),
})

export const characterMetaSchema = createSelectSchema(characterMeta, {
    archetypes: z.array(z.string()),
    cons: z.array(z.string()),
    pros: z.array(z.string()),
})
export const createCharacterMetaSchema = createInsertSchema(characterMeta)

export type CharacterMeta = z.infer<typeof characterMetaSchema>
export type CreateCharacterMeta = z.infer<typeof createCharacterMetaSchema>
