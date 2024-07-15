import { lucia, validateRequest } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const { session } = await validateRequest()
    if (!session) {
        return new Response(null, {
            status: 401,
        })
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    )

    return Response.redirect(new URL('/', request.url))
}
