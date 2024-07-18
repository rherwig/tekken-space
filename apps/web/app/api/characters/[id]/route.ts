import { charactersService } from '@tekken-space/database'
import { validateRequest } from '@/lib/auth'
import { isAdmin } from '@/lib/utils/auth'

export async function GET() {
    const characters = await charactersService.findAll()

    return Response.json(characters)
}

export async function DELETE(
    _: Request,
    { params }: { params: { id: string } },
) {
    const { user } = await validateRequest()
    if (!user) {
        return new Response(null, {
            status: 401,
        })
    }

    if (!isAdmin(user)) {
        return new Response(null, {
            status: 403,
        })
    }

    if (!params.id) {
        return new Response(null, {
            status: 400,
        })
    }

    await charactersService.remove(params.id)

    return new Response(null, {
        status: 204,
    })
}
