export interface Meta {
    $type: MetaTypes
}

export enum MetaTypes {
    MOVE,
    INSTRUCTION,
}

export enum InstructionTypes {
    TEXT,
    MOVEMENT,
    ATTACK,
    COMBINATOR,
    SPECIAL,
    ALTERNATIVE,
    HIDDEN,
    CONTROL,
}

export enum InstructionSubType {
    NONE,
    TORNADO,
    HEAT,
    RAGE,
    STANCE,
    BRACKET_LEFT,
    BRACKET_RIGHT,
    HOLD,
}

export interface InstructionToken {
    type: InstructionTypes
    subType?: InstructionSubType
    expression: RegExp
    keywords?: TekkenKeywordsList
}

export interface ParserResult {
    notation: string
    moves: ParsedMove[]
}

export interface ParsedMove extends Meta {
    notation: string
    instructions: ParsedInstruction[]
}

export interface ParsedInstruction extends Meta {
    type: InstructionTypes
    subType?: InstructionSubType
    notation: string
    value: string
}

export interface ConsumeTokenResult {
    index: number
    value: string
    remainder: string
}

export interface InstructionMatchResult {
    remainder: string
    instruction: ParsedInstruction | null
}

export interface TekkenKeyword {
    notation?: string
    value: string
}

export type TekkenKeywordsList = Record<string, TekkenKeyword>
