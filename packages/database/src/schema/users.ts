import { pgTable, pgEnum, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import type { z } from 'zod'

export const role = pgEnum('role', ['admin', 'user'])

export const users = pgTable('users', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').notNull(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    image: text('image'),

    role: role('role').notNull().default('user'),
    handle: text('handle').unique(),
    isVirtual: boolean('is_virtual').notNull().default(false),
    isPro: boolean('is_pro').notNull().default(false),

    gitHubId: text('github_id').unique(),

    createdAt: timestamp('created_at').notNull().defaultNow(),
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
