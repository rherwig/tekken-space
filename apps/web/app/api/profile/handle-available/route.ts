import { z } from 'zod'
import { profilesService } from '@tekken-space/database'

const handleSchema = z.object({
    handle: z.string().min(3),
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const validatedBody = handleSchema.safeParse(body)
        if (validatedBody.error) {
            return Response.json(false)
        }

        const isAvailable = await profilesService.isHandleAvailable(
            validatedBody.data.handle,
        )

        return Response.json(isAvailable)
    } catch (error: unknown) {
        console.error(error)
    }

    return Response.json(false)
}
