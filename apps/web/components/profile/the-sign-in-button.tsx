'use client'
import { Button } from '@nextui-org/react'
import { useState } from 'react'

export default function TheSignInButton() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSubmit = () => {
        setIsLoading(true)
    }

    return (
        <form action="/sign-in/github" onSubmit={handleSubmit}>
            <Button type="submit" isLoading={isLoading}>
                Sign In
            </Button>
        </form>
    )
}
