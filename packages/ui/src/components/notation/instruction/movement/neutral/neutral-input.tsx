import Image from 'next/image'
import neutralImage from './assets/neutral.png'

export default function NeutralInput() {
    return (
        <Image
            className="block"
            src={neutralImage.src}
            width={48}
            height={48}
            alt="Neutral"
        />
    )
}
