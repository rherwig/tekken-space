'use client'
import { useState } from 'react'
import { Button } from '@tekken-space/ui/base'

export default function TheSignInButton() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = () => {
        setIsLoading(true)
    }

    return (
        <form action="/sign-in/github" onSubmit={handleSubmit}>
            <Button type="submit" data-loading={isLoading}>
                Sign In
            </Button>
        </form>
    )
}
