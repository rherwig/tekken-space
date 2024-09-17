import { auth } from '@/auth'

export const useAuth = async () => {
    const session = await auth()
    const user = session?.user ?? null

    return {
        session,
        user,
    }
}
