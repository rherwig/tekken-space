import { Card, CardBody, CardHeader } from '@nextui-org/react'
import TsSimpleMoveDisplay from '@tekken-space/ui/simple-move-display'

interface Props {
    title: string
    items: {
        key?: string
        notation: string
        description?: string
    }[]
}

export default function CheatCard({ items, title }: Props) {
    return (
        <Card>
            <CardHeader>
                <h3 className="mr-2 font-bold">{title}</h3>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col gap-4">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                            {item.key && (
                                <div className="min-w-16">{item.key}</div>
                            )}

                            <TsSimpleMoveDisplay notation={item.notation} />

                            {item.description && (
                                <div className="flex-1">{item.description}</div>
                            )}
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    )
}
