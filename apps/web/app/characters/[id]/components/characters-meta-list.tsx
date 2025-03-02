export function CharacterMetaList({
    children,
    title,
}: {
    title: string
    children: React.ReactNode
}) {
    return (
        <div className="">
            <div className="mb-2">{title}</div>
            <ul className="m-0 flex list-none flex-col gap-y-2 p-0">
                {children}
            </ul>
        </div>
    )
}
