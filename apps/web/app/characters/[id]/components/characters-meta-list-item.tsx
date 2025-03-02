export function CharacterMetaListItem({
    children,
    icon,
}: {
    children: React.ReactNode
    icon: React.ReactNode
}) {
    return (
        <li className="flex gap-2">
            {icon}
            {children}
        </li>
    )
}
