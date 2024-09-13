'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { TsNotationInput } from '@tekken-space/ui/components'
import { Button } from '@tekken-space/ui/base'

export default function Share() {
    const router = useRouter()
    const params = useSearchParams()

    useEffect(() => {})

    return (
        <div className="container py-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                Share Notation
            </h1>

            {params.get('n')}
            <p className="my-4 leading-7">
                Enter a Tekken Notation in the textbox below and use the buttons
                to share the URL or export is as image.
            </p>

            <TsNotationInput />

            <div className="mt-4 flex justify-end gap-2">
                <Button>Copy URL</Button>
                <Button>Export as Image (beta)</Button>
            </div>
        </div>
    )
}
