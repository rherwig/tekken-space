import { Card, CardBody, CardHeader } from '@nextui-org/react'
import CheatCard from '@/components/cheat-sheet/cheat-card'
import SimpleMoveDisplay from '@/components/notation/simple-move-display'

function DemoCard({ title }: { title: string }) {
    const punishmentStanding = [
        {
            frames: 10,
            notation: '1,2',
        },
        {
            frames: 12,
            notation: 'b+1,2_d+1+2',
        },
        {
            frames: 13,
            notation: 'b+1,2_d+1+2',
        },
        {
            frames: 14,
            notation: 'b+1,2_d+1+2',
        },
        {
            frames: 15,
            notation: 'b+1,2_d+1+2',
        },
    ]

    return (
        <Card>
            <CardHeader>{title}</CardHeader>
            <CardBody>
                <div className="inline-grid grid-cols-[min-content_1fr] items-center gap-x-8 gap-y-4 text-sm">
                    {punishmentStanding.map((move, index) => (
                        <>
                            <div key={index}>{move.frames}</div>
                            <SimpleMoveDisplay
                                key={index}
                                notation={move.notation}
                            />
                        </>
                    ))}
                </div>
            </CardBody>
        </Card>
    )
}

const punishers = [
    {
        key: '10f',
        notation: '1,2',
        description: undefined,
    },
    {
        key: '12f',
        notation: 'b+1,2_d+1+2',
        description: undefined,
    },
]

const throws = [
    {
        key: '',
        notation: 'u/f+1+2',
        description: '1+2 break',
    },
    {
        key: '',
        notation: 'f,F+1+2',
        description: '1+2 break',
    },
    {
        key: '',
        notation: '2+4,B',
        description: '2 break',
    },
]

export default async function Character() {
    return (
        <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
                <CheatCard title="Punishment" items={punishers} />
                <CheatCard title="Throws" items={throws} />
                <CheatCard title="Heat" items={punishers} />
                <CheatCard title="Sample Combos" items={punishers} />
                <CheatCard title="Wall Combos" items={punishers} />
            </div>
        </div>
    )
}
