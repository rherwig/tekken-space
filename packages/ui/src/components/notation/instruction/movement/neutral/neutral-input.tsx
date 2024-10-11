import Image from 'next/image'
import neutralImage from './assets/neutral.png'

export default function NeutralInput() {
    return (
        <Image
            className="block"
            src={neutralImage.src}
            width={52}
            height={52}
            alt="Neutral"
        />
    )
}
