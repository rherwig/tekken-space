export type RawMoveList = RawMove[]

export interface RawMove {
    name: string
    input: string
    hitLevel: string[]
    damage: string
    startup: string
    onBlock: string
    onHit: string
    onCH: string
    properties: string[]
}
