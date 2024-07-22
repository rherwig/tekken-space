import neutralImage from './assets/neutral.png'
import { Image } from '@nextui-org/react'

export default function NeutralInput() {
    return (
        <Image
            className="block"
            src={neutralImage.src}
            width={64}
            height={64}
            alt="Neutral"
        />
    )
}
