import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'
import { users } from './users'

export const sessions = pgTable('session', {
    expires: timestamp('expires', { mode: 'date' }).notNull(),
    sessionToken: text('sessionToken').primaryKey(),
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
})

export const sessionSchema = createSelectSchema(sessions)
export const createSessionSchema = createInsertSchema(sessions)

export type Session = z.infer<typeof sessionSchema>
export type CreateSession = z.infer<typeof createSessionSchema>
