import { iconNames } from 'lucide-react/dynamic'
import { useMemo, useState } from 'react'
import { Input } from '#base/input'

import { IconTile } from './icon-tile'

export function IconLibrary() {
    const [query, setQuery] = useState('')

    const filteredIconNames = useMemo(() => {
        return iconNames.filter((name) => name.includes(query))
    }, [query])

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value)
    }

    return (
        <div className="space-y-2">
            <Input
                autoFocus={true}
                placeholder="Search for an icon..."
                onInput={handleSearch}
                value={query}
            />

            <div className="grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-2">
                {filteredIconNames.map((name) => (
                    <IconTile key={name} name={name} />
                ))}
            </div>
        </div>
    )
}
