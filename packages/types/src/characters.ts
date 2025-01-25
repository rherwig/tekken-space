import { z } from 'zod'

export const CHARACTER_SLUGS = [
    'alisa',
    'asuka',
    'azucena',
    'bryan',
    'claudio',
    'clive',
    'devil-jin',
    'dragunov',
    'eddy',
    'feng',
    'heihachi',
    'hwoarang',
    'jack-8',
    'jin',
    'jun',
    'kazuya',
    'king',
    'kuma',
    'lars',
    'law',
    'lee',
    'leo',
    'leroy',
    'lidia',
    'lili',
    'nina',
    'panda',
    'paul',
    'raven',
    'reina',
    'shaheen',
    'steve',
    'victor',
    'xiaoyu',
    'yoshimitsu',
    'zafina',
]

export const upsertCharacterSchema = z.object({
    id: z.string(),
    imageUrl: z.string().optional(),
    name: z.string().min(1, ''),
})

export type UpsertCharacterSchema = z.infer<typeof upsertCharacterSchema>
