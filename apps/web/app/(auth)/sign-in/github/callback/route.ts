import { OAuth2RequestError } from 'arctic'
import { generateId } from 'lucia'
import { cookies } from 'next/headers'
import { db, sql, users } from '@tekken-space/database'
import { gitHub, lucia } from '@/lib/auth'

interface GitHubUser {
    id: string
    login: string
    email: string
    avatar_url: string
}

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const storedState = cookies().get('github_oauth_state')?.value ?? null

    if (!code || !state || !storedState || state !== storedState) {
        return new Response(null, {
            status: 400,
        })
    }

    try {
        const tokens = await gitHub.validateAuthorizationCode(code)

        const githubUserResponse = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        })
        const githubUser: GitHubUser = await githubUserResponse.json()

        const existingUser = await db
            .select()
            .from(users)
            .where(sql`github_id=${githubUser.id}`)

        if (existingUser[0]) {
            const session = await lucia.createSession(existingUser[0].id, {})
            const sessionCookie = lucia.createSessionCookie(session.id)
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            )
            return new Response(null, {
                headers: {
                    Location: '/',
                },
                status: 302,
            })
        }

        const userId = generateId(15)

        await db.insert(users).values({
            email: githubUser.email,
            gitHubId: githubUser.id,
            id: userId,
            image: githubUser.avatar_url,
            name: githubUser.login,
        })

        const session = await lucia.createSession(userId, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        )

        return new Response(null, {
            headers: {
                Location: '/',
            },
            status: 302,
        })
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            return new Response(null, {
                status: 400,
            })
        }
        return new Response(null, {
            status: 500,
        })
    }
}
