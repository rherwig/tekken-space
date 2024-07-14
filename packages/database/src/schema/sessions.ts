import { pgTable, varchar, timestamp, index } from 'drizzle-orm/pg-core'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const sessions = pgTable(
    'sessions',
    {
        id: varchar('id', { length: 255 }).primaryKey(),
        userId: varchar('user_id', { length: 21 }).notNull(),
        expiresAt: timestamp('expires_at', {
            withTimezone: true,
            mode: 'date',
        }).notNull(),
    },
    (t) => ({
        userIdx: index('session_user_idx').on(t.userId),
    }),
)

export const sessionSchema = createSelectSchema(sessions)
export const createSessionSchema = createInsertSchema(sessions)

export type Session = z.infer<typeof sessionSchema>
export type CreateSession = z.infer<typeof createSessionSchema>
