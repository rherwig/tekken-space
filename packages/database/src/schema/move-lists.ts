import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

import { cuid, cuidReference } from '../utils/schema'
import { characters } from './characters'
import { users } from './users'

export const moveLists = pgTable('move_lists', {
    authorId: text('author_id').references(() => users.id),
    characterId: cuidReference('character_id', characters.id),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    id: cuid('id').primaryKey(),

    name: text('name').notNull(),
    updatedAt: timestamp('updated_at'),
})

export const moveListsSchema = createSelectSchema(moveLists)
export const createMoveListSchema = createInsertSchema(moveLists)

export type MoveList = z.infer<typeof moveListsSchema>
export type CreateMoveList = z.infer<typeof createMoveListSchema>
