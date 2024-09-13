import neutralImage from './assets/neutral.png'

export default function NeutralInput() {
    return (
        <img
            className="block"
            src={neutralImage.src}
            width={64}
            height={64}
            alt="Neutral"
        />
    )
}
