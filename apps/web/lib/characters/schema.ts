import { z } from 'zod'

export const upsertCharacterFormSchema = z.object({
    name: z.string().trim().min(1, 'Please provider a character name.'),
})
