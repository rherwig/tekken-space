import { TsCombobox } from '@tekken-space/ui/components'
import { Character } from '@tekken-space/database'

export function CharacterSelect({ characters }: { characters: Character[] }) {
    const options = characters.map((character) => ({
        label: character.name,
        value: character.id,
    }))

    return <TsCombobox options={options} placeholder="Select a Character..." />
}
