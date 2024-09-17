import { z } from 'zod'

export const CHARACTER_SLUGS = [
    'alisa',
    'azucena',
    'claudio',
    'dragunov',
    'eddy',
    'jack-8',
    'bryan',
    'kazuya',
    'shaheen',
    'leo',
    'jun',
    'jin',
    'devil-jin',
    'feng',
    'yoshimitsu',
    'lidia',
    'asuka',
]

export const upsertCharacterSchema = z.object({
    id: z.string(),
    imageUrl: z.string().optional(),
    name: z.string().min(1, ''),
})

export type UpsertCharacterSchema = z.infer<typeof upsertCharacterSchema>
