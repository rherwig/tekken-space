import { varchar, type PgColumn } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const cuid = (name: string) => {
    return varchar(name, { length: 128 }).$defaultFn(() => createId())
}

export const cuidReference = (name: string, column: PgColumn) => {
    return varchar(name, { length: 128 }).references(() => column)
}
