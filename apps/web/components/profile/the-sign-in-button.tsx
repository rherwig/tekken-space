'use client'

import { useState } from 'react'
import { Button } from '@tekken-space/ui/base'
import { onLoginAction } from '@/lib/auth/actions/login'

export default function TheSignInButton() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = () => {
        setIsLoading(true)
    }

    return (
        <form action={onLoginAction} onSubmit={handleSubmit}>
            <Button type="submit" data-loading={isLoading}>
                Sign In
            </Button>
        </form>
    )
}
