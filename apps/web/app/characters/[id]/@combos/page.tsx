export default async function CharacterPage({
    params,
}: {
    params: { id: string }
}) {
    return <div>Combos for {params.id}</div>
}
