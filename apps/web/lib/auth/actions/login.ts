'use server'

import { signIn } from '@/auth'

export async function onLoginAction() {
    await signIn('github')
}
