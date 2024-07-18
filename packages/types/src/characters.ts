import { z } from 'zod'

export const upsertCharacterSchema = z.object({
    id: z.string(),
    name: z.string().min(1, ''),
})

export type UpsertCharacterSchema = z.infer<typeof upsertCharacterSchema>
