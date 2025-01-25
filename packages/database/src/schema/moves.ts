import { z } from 'zod'
import { sql } from 'drizzle-orm'
import { boolean, pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

import { characters } from './characters'
import { moveLists } from './move-lists'
import { cuid, cuidReference } from '../utils/schema'

export const moves = pgTable('moves', {
    characterId: cuidReference('character_id', characters.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    damageHits: integer('damage_hits')
        .array()
        .default(sql`ARRAY[]::integer[]`), // Array of damage integers (e.g., [12])
    framesOnBlockLower: text('frames_on_block_lower'),
    framesOnBlockProperties: text('frames_on_block_properties')
        .array()
        .default(sql`ARRAY[]::text[]`),
    framesOnBlockRaw: text('frames_on_block_raw'),
    framesOnBlockTech: text('frames_on_block_tech'),
    framesOnBlockUpper: text('frames_on_block_upper'),
    framesOnCounterLower: text('frames_on_counter_lower'),
    framesOnCounterProperties: text('frames_on_counter_properties')
        .array()
        .default(sql`ARRAY[]::text[]`),
    framesOnCounterRaw: text('frames_on_counter_raw'),
    framesOnCounterTech: text('frames_on_counter_tech'),
    framesOnCounterUpper: text('frames_on_counter_upper'),
    framesOnHitLower: text('frames_on_hit_lower'),
    framesOnHitProperties: text('frames_on_hit_properties')
        .array()
        .default(sql`ARRAY[]::text[]`),
    framesOnHitRaw: text('frames_on_hit_raw'),
    framesOnHitTech: text('frames_on_hit_tech'),
    framesOnHitUpper: text('frames_on_hit_upper'),
    framesOnStartupLower: text('frames_on_startup_lower'),
    framesOnStartupProperties: text('frames_on_startup_properties')
        .array()
        .default(sql`ARRAY[]::text[]`),
    framesOnStartupRaw: text('frames_on_startup_raw'),
    framesOnStartupTech: text('frames_on_startup_tech'),
    framesOnStartupUpper: text('frames_on_startup_upper'),
    hitLevels: text('hit_levels')
        .array()
        .default(sql`ARRAY[]::text[]`),
    id: cuid('id').primaryKey(),
    index: integer('index').default(0),
    isCombo: boolean('is_combo').notNull().default(false),
    moveListId: cuidReference('move_list_id', moveLists.id),
    name: text('name'),
    notation: text('notation').notNull(),
    notes: text('notes')
        .array()
        .default(sql`ARRAY[]::text[]`),
    specials: text('specials')
        .array()
        .default(sql`ARRAY[]::text[]`),
    stateKey: text('state_key'),
    stateRaw: text('state_raw'),
    updatedAt: timestamp('updated_at'),
})

export const movesSchema = createSelectSchema(moves, {
    framesOnBlockProperties: z.array(z.string()),
    framesOnCounterProperties: z.array(z.string()),
    framesOnHitProperties: z.array(z.string()),
    framesOnStartupProperties: z.array(z.string()),
    hitLevels: z.array(z.string()),
    notes: z.array(z.string()),
    specials: z.array(z.string()),
})

export const createMoveSchema = createInsertSchema(moves, {
    framesOnBlockProperties: z.array(z.string()),
    framesOnCounterProperties: z.array(z.string()),
    framesOnHitProperties: z.array(z.string()),
    framesOnStartupProperties: z.array(z.string()),
    hitLevels: z.array(z.string()),
    notes: z.array(z.string()),
    specials: z.array(z.string()),
})

export type Move = z.infer<typeof movesSchema>
export type CreateMove = z.infer<typeof createMoveSchema>
