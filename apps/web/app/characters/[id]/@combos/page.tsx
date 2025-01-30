export default async function CharacterPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    return <div>Combos for {id}</div>
}
