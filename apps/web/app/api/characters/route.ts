import {
    charactersService,
    createCharacterSchema,
} from '@tekken-space/database'
import { validateRequest } from '@/lib/auth'
import { isAdmin } from '@/lib/utils/auth'

export async function GET() {
    const characters = await charactersService.findAll()

    return Response.json(characters)
}

export async function POST(request: Request) {
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

    const body = await request.json()

    const validation = createCharacterSchema.safeParse(body)
    if (validation.error) {
        return new Response(null, {
            status: 400,
        })
    }

    const result = await charactersService.create(validation.data)

    return Response.json(result)
}

export async function PUT(request: Request) {
    const { user } = await validateRequest()
    // if (!user) {
    //     return new Response(null, {
    //         status: 401,
    //     })
    // }
    //
    // if (!isAdmin(user)) {
    //     return new Response(null, {
    //         status: 403,
    //     })
    // }

    const body = await request.json()
    const validation = createCharacterSchema.safeParse(body)
    if (validation.error) {
        return new Response(null, {
            status: 400,
        })
    }

    const result = await charactersService.update(validation.data)

    return Response.json(result)
}

export async function DELETE(request: Request) {
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

    const body = await request.json()
    if (!body.id) {
        return new Response(null, {
            status: 400,
        })
    }

    await charactersService.remove(body.id)

    return new Response(null, {
        status: 204,
    })
}
