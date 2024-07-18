import { Character } from '@tekken-space/database'
import { Image } from '@nextui-org/react'

export default function CharactersGrid({
    characters,
}: {
    characters: Character[]
}) {
    return (
        <div className="grid grid-cols-8 gap-2">
            {characters.map((character) => (
                <div className="relative aspect-square" key={character.id}>
                    <Image
                        src={character.imageUrl ?? undefined}
                        className="object-fit h-full w-full"
                        alt=""
                        width={256}
                        height={256}
                    />

                    <div className="absolute bottom-0 left-0 z-10 flex w-full justify-center bg-black/70 py-2">
                        {character.name}
                    </div>
                </div>
            ))}
        </div>
    )
}
