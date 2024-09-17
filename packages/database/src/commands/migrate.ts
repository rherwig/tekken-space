import 'dotenv/config'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import config from '../../drizzle.config'
import * as schema from '../schema'

const { database, host, password, port, user } = config.dbCredentials
const connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`

const connection = postgres(connectionString, {
    max: 1,
})

const db = drizzle(connection, {
    schema,
})

try {
    await migrate(db, {
        migrationsFolder: config.out,
    })
} catch (error: unknown) {
    console.error(error)
    process.exit(1)
} finally {
    connection.end().then(() => process.exit(0))
}
