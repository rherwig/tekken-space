import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const characters = pgTable('characters', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
})

export const charactersSchema = createSelectSchema(characters)
export const createCharacterSchema = createInsertSchema(characters)

export type Character = z.infer<typeof charactersSchema>
export type CreateCharacter = z.infer<typeof createCharacterSchema>
