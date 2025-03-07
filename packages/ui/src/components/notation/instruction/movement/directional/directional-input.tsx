import Image from 'next/image'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '#utils'

import arrowImage from './assets/arrow.png'
import arrowHoldImage from './assets/arrow-hold.png'

const variants = cva('size-[3em]', {
    variants: {
        direction: {
            b: 'rotate-180',
            d: 'rotate-90',
            db: 'rotate-135',
            df: 'rotate-45',
            f: 'rotate-0',
            u: '-rotate-90',
            ub: 'rotate-225',
            uf: '-rotate-45',
        },
    },
})

type Direction = VariantProps<typeof variants>['direction']

export default function DirectionalInput({ direction }: { direction: string }) {
    const slug = direction.toLowerCase().replace(/\//, '')
    const isHoldInput = direction.toUpperCase() === direction
    const image = isHoldInput ? arrowHoldImage : arrowImage

    return (
        <Image
            className={cn(variants({ direction: slug as Direction }))}
            src={image.src}
            width={64}
            height={64}
            alt={slug}
        />
    )
}
