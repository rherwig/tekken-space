import { validateRequest } from '@/lib/auth'

export default async function Debug() {
    const { user } = await validateRequest()

    return (
        <>
            <div>Debug</div>
            <div>
                <a href="/api/auth/github">GitHub</a>
            </div>
            <div>{JSON.stringify(user, null, 2)}</div>
        </>
    )
}
