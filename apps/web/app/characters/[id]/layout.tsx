import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tekken-space/ui/base'

export default async function CharactersLayout({
    cheatsheet,
    children,
    combos,
    moves,
}: {
    children: React.ReactNode
    combos: React.ReactNode
    cheatsheet: React.ReactNode
    moves: React.ReactNode
}) {
    return (
        <div className="container">
            {children}

            <Tabs defaultValue="moves">
                <TabsList className="flex w-full">
                    <TabsTrigger value="moves" className="flex-1">
                        Moves
                    </TabsTrigger>
                    <TabsTrigger
                        value="combos"
                        className="flex-1"
                        disabled={true}
                    >
                        Combos
                    </TabsTrigger>
                    <TabsTrigger
                        value="cheatsheet"
                        className="flex-1"
                        disabled={true}
                    >
                        Cheat Sheet
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="moves" className="pt-2">
                    {moves}
                </TabsContent>
                <TabsContent value="combos">{combos}</TabsContent>
                <TabsContent value="cheatsheet">{cheatsheet}</TabsContent>
            </Tabs>
        </div>
    )
}
