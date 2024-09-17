'use server'

import { signOut } from '@/auth'

export async function onLogoutAction() {
    await signOut()
}
