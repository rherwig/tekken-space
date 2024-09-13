'use client'

import { TsHeadline } from '@tekken-space/ui/components'
import { Button } from '@tekken-space/ui/base'

function TsParagraph({ children }: { children?: React.ReactNode }) {
    return <p className="my-6 leading-7">{children}</p>
}

export default function Dev() {
    return (
        <div className="container py-4">
            <TsHeadline variant="h1">Development</TsHeadline>
            <TsParagraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                commodi distinctio dolorem doloremque, dolores eligendi
                explicabo impedit in iure modi molestiae non odio porro quasi
                qui repudiandae similique tempora voluptates.
            </TsParagraph>

            <div className="bg-warning">Test</div>

            <TsHeadline variant="h2">Buttons</TsHeadline>
            <TsParagraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
                commodi distinctio dolorem doloremque, dolores eligendi
                explicabo impedit in iure modi molestiae non odio porro quasi
                qui repudiandae similique tempora voluptates.
            </TsParagraph>
            <Button variant="default">Primary Button</Button>
        </div>
    )
}
