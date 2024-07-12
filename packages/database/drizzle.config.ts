import type { Config } from 'drizzle-kit'

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env

export const CONNECTION_STRING = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`

console.log(CONNECTION_STRING)

export default {
    dialect: 'postgresql',
    schema: './src/schema/index.ts',
    out: './migrations',
    dbCredentials: {
        host: POSTGRES_HOST ?? '0.0.0.0',
        port: Number.parseInt(POSTGRES_PORT ?? '5432', 10),
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB ?? 'tmp',
    },
} satisfies Config
