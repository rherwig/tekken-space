import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const characters = pgTable('characters', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    imageUrl: text('image_url'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
})

export const charactersSchema = createSelectSchema(characters)

export type Character = z.infer<typeof charactersSchema>
