import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const characters = pgTable('characters', {
    createdAt: timestamp('created_at').notNull().defaultNow(),
    id: text('id').primaryKey(),
    imageUrl: text('image_url'),
    name: text('name').notNull(),
    updatedAt: timestamp('updated_at'),
})

export const charactersSchema = createSelectSchema(characters)

export type Character = z.infer<typeof charactersSchema>
