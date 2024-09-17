import { pgTable, pgEnum, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const role = pgEnum('role', ['admin', 'user'])

export const users = pgTable('user', {
    createdAt: timestamp('created_at').notNull().defaultNow(),
    email: text('email').notNull(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    gitHubId: text('github_id').unique(),
    handle: text('handle').unique(),
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    image: text('image'),
    isPro: boolean('is_pro').notNull().default(false),
    isVirtual: boolean('is_virtual').notNull().default(false),
    name: text('name'),
    role: role('role').notNull().default('user'),
    updatedAt: timestamp('updated_at'),
})

export const userSchema = createSelectSchema(users)
export const createUserSchema = createInsertSchema(users)

export type User = z.infer<typeof userSchema>
export type CreateUser = z.infer<typeof createUserSchema>

export type Profile = Pick<
    User,
    'id' | 'handle' | 'role' | 'image' | 'isPro' | 'isVirtual'
>
