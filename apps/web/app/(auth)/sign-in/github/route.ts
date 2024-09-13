import { generateState } from 'arctic'
import { gitHub } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function GET(): Promise<Response> {
    const state = generateState()
    const url = await gitHub.createAuthorizationURL(state)

    cookies().set('github_oauth_state', state, {
        httpOnly: true,
        maxAge: 60 * 10,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    })

    return Response.redirect(url)
}
