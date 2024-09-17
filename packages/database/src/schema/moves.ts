import { z } from 'zod'
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { characters } from './characters'
import { moveLists } from './move-lists'
import { cuid, cuidReference } from '../utils/schema'
import { sql } from 'drizzle-orm'

export const moves = pgTable('moves', {
    characterId: cuidReference('character_id', characters.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    damageHits: text('damage_hits'),
    damageTotal: text('damage_total'),
    framesOnBlock: text('frames_on_block'),
    framesOnCounterHit: text('frames_on_counter_hit'),
    framesOnHit: text('frames_on_hit'),
    framesOnStartup: text('frames_on_startup'),
    hitLevels: text('hit_levels')
        .array()
        .notNull()
        .default(sql`ARRAY[]::text[]`),
    id: cuid('id').primaryKey(),
    isCombo: boolean('is_combo').notNull().default(false),
    moveListId: cuidReference('move_list_id', moveLists.id),
    name: text('name'),
    notation: text('notation').notNull(),
    notes: text('notes'),
    properties: text('properties')
        .array()
        .notNull()
        .default(sql`ARRAY[]::text[]`),
    updatedAt: timestamp('updated_at'),
})

export const movesSchema = createSelectSchema(moves, {
    hitLevels: z.array(z.string()),
    properties: z.array(z.string()),
})
export const createMoveSchema = createInsertSchema(moves, {
    hitLevels: z.array(z.string()),
    properties: z.array(z.string()),
})

export type Move = z.infer<typeof movesSchema>
export type CreateMove = z.infer<typeof createMoveSchema>
