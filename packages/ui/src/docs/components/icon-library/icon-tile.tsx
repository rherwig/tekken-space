import { DynamicIcon, iconNames } from 'lucide-react/dynamic'

export function IconTile({ name }: { name: (typeof iconNames)[number] }) {
    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(name)
            console.log(`Copied ${name} to clipboard`)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div
            onClick={copyToClipboard}
            className="bg-primary/5 hover:bg-primary/10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-md transition-colors"
        >
            <DynamicIcon name={name} />
        </div>
    )
}
