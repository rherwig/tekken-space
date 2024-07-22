import { Image } from '@nextui-org/react'
import clsx from 'clsx'

import arrowImage from './assets/arrow.png'
import arrowHoldImage from './assets/arrow-hold.png'
import styles from './directional-input.module.scss'

export default function DirectionalInput({ direction }: { direction: string }) {
    const slug = direction.toLowerCase().replace(/\//, '')
    const isHoldInput = direction.toUpperCase() === direction
    const image = isHoldInput ? arrowHoldImage : arrowImage

    return (
        <Image
            className={clsx(styles[slug], 'size-[3em]')}
            src={image.src}
            width={64}
            height={64}
        />
    )
}
