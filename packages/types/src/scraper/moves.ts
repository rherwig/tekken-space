export interface ScrapedMove {
    name?: string
    input: string
    hitLevels: string[]
    damage: (number | null)[]
    framesOnBlock: ScrapedFrameData
    framesOnHit: ScrapedFrameData
    framesOnCounter: ScrapedFrameData
    framesOnStartup: ScrapedFrameData
    state: ScrapedState
    notes: string[]
    specials: string[]
}

export interface ScrapedState {
    _raw: string
    key?: string
    frame?: string
}

export interface ScrapedFrameData {
    _raw: string
    lower: string
    upper?: string
    tech?: string
    properties: string[]
}

export interface ScrapedNotes {
    specials: string[]
    notes: string[]
}
