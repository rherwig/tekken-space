'use client'

import { FormEvent, useRef, useState } from 'react'
import { TsNotationInput } from '@tekken-space/ui/components'
import { Button } from '@tekken-space/ui/base'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useToast } from '@tekken-space/ui/hooks'
import html2canvas from 'html2canvas'

export function ShareNotationForm() {
    const pathname = usePathname()
    const params = useSearchParams()
    const router = useRouter()
    const { toast } = useToast()
    const notationRef = useRef<HTMLInputElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [notation, setNotation] = useState(
        decodeURIComponent(params.get('n') ?? ''),
    )

    function handleInput(event: FormEvent<HTMLInputElement>) {
        const nextNotation = event.currentTarget.value

        setNotation(nextNotation)
        router.push(`${pathname}?n=${encodeURIComponent(nextNotation)}`)
    }

    async function handleCopyUrl() {
        try {
            await navigator.clipboard.writeText(window.location.href)

            toast({
                description: 'URL copied to clipboard.',
                title: 'Success',
            })
        } catch {
            toast({
                description: 'Failed to copy URL to clipboard.',
                title: 'Failure',
            })
        }
    }

    async function handleExportImage() {
        if (!notationRef.current) {
            return
        }

        const canvas = await html2canvas(notationRef.current, {
            backgroundColor: null,
            removeContainer: true,
            scale: 2,
            useCORS: true,
            width: notationRef.current.clientWidth ?? 0,
        })

        const imageUrl = canvas.toDataURL('image/png')

        const link = document.createElement('a')
        link.href = imageUrl
        link.download = `${notation}.png`
        document.body.appendChild(link)

        link.click()
        document.body.removeChild(link)

        toast({
            description: 'Image exported successfully.',
            title: 'Success',
        })
    }

    return (
        <>
            <TsNotationInput
                value={notation}
                onInput={handleInput}
                notationRef={notationRef}
            />

            <div className="mt-4 flex justify-end gap-2">
                <Button onClick={handleCopyUrl}>Copy URL</Button>
                <Button onClick={handleExportImage}>
                    Export as Image (beta)
                </Button>
            </div>

            <canvas ref={canvasRef} />
        </>
    )
}
