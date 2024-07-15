import { z } from 'zod'
import { profilesService } from '@tekken-space/database'
import { validateRequest } from '@/lib/auth'

const handleSchema = z.object({
    handle: z.string().min(3),
})

export async function POST(request: Request) {
    const { user } = await validateRequest()
    const body = await request.json()

    const validatedBody = handleSchema.safeParse(body)
    if (validatedBody.error) {
        return new Response(null, {
            status: 400,
        })
    }

    if (!user) {
        return new Response(null, {
            status: 401,
        })
    }

    try {
        await profilesService.updateHandle(user.id, validatedBody.data.handle)

        return Response.json(true)
    } catch (error: unknown) {
        console.error(error)
    }

    return Response.json(false)
}
