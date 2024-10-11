import { STANCE_KEYWORDS } from './constants/stances'
import {
    type ConsumeTokenResult,
    type InstructionMatchResult,
    InstructionSubType,
    type InstructionToken,
    InstructionTypes,
    MetaTypes,
    type ParsedInstruction,
    type ParserResult,
    type TekkenKeywordsList,
} from './types'

/**
 * Creates a regular expression that matches a list of keywords.
 * @param keywords
 * @param flags
 */
const expressionFromKeywords = (keywords: string[], flags = 'gi') =>
    new RegExp(`^(${keywords.join('|')})`, flags)

/**
 * Creates a regular expression that matches a list of movement pairs.
 * @param pairs
 */
const expressionFromMovementPairs = (pairs: string[][]) => {
    const expressions = pairs.map((pair) => pair.join('/?')).join('|')

    return new RegExp(`^(${expressions})`, 'gi')
}

/**
 * Separator character for moves in a combo.
 */
const MOVE_SEPARATOR = ';'

/**
 * List of special keywords, like WS, WR, etc.
 */
const SPECIAL_KEYWORDS: TekkenKeywordsList = {
    BACKDASH: {
        value: 'Backdash',
    },
    BT: {
        value: 'Back-Turned',
    },
    CD: {
        value: 'Crouch Dash',
    },
    CH: {
        value: 'Counter Hit',
    },
    DASH: {
        value: 'Dash',
    },
    FC: {
        value: 'Full Crouch',
    },
    HCB: {
        value: 'Half Circle Backward',
    },
    HCF: {
        value: 'Half Circle Forward',
    },
    iFC: {
        value: 'Instant Full Crouch',
    },
    iWR: {
        value: 'Instant While Running',
    },
    iWS: {
        value: 'Instant While Rising',
    },
    OTG: {
        value: 'Opponent Grounded',
    },
    QCB: {
        value: 'Quarter Circle Backward',
    },
    QCF: {
        value: 'Quarter Circle Forward',
    },
    SS: {
        value: 'Side Step',
    },
    SSL: {
        value: 'Side Step Left',
    },
    SSR: {
        value: 'Side Step Right',
    },
    SW: {
        value: 'Side Walk',
    },
    SWL: {
        value: 'Side Walk Left',
    },
    SWR: {
        value: 'Side Walk Right',
    },
    WAVEDASH: {
        value: 'Wavedash',
    },
    WR: {
        value: 'While Running',
    },
    WS: {
        value: 'While Rising',
    },
    ws: {
        value: 'While Rising',
    },
}

/**
 * List of Rage keywords.
 */
const RAGE_KEYWORDS: TekkenKeywordsList = {
    R: {
        notation: 'R',
        value: 'In Rage',
    },
    'R!': {
        notation: 'R!',
        value: 'Rage Art',
    },
    RAGE: {
        notation: 'R!',
        value: 'Rage Art',
    },
    RAGEART: {
        notation: 'R!',
        value: 'Rage Art',
    },
}

/**
 * List of Heat keywords.
 */
const HEAT_KEYWORDS: TekkenKeywordsList = {
    'H!': {
        notation: 'H!',
        value: 'Heat',
    },
    'H.': {
        notation: 'H!',
        value: 'Heat',
    },
    HEAT: {
        notation: 'H!',
        value: 'Heat',
    },
}

/**
 * List of Tornado keywords.
 */
const TORNADO_KEYWORDS: TekkenKeywordsList = {
    'T!': {
        notation: 'T!',
        value: 'Tornado',
    },
    TORNADO: {
        notation: 'T!',
        value: 'Tornado',
    },
}

/**
 * Tokens used for parsing instructions.
 * The order is relevant, since it implies the token precedence.
 */
const TOKENS: InstructionToken[] = [
    {
        expression: expressionFromKeywords(Object.keys(SPECIAL_KEYWORDS)),
        keywords: SPECIAL_KEYWORDS,
        subType: InstructionSubType.NONE,
        type: InstructionTypes.SPECIAL,
    },
    {
        expression: expressionFromKeywords(Object.keys(STANCE_KEYWORDS)),
        keywords: STANCE_KEYWORDS,
        subType: InstructionSubType.STANCE,
        type: InstructionTypes.SPECIAL,
    },
    {
        expression: expressionFromKeywords(Object.keys(RAGE_KEYWORDS)),
        keywords: RAGE_KEYWORDS,
        subType: InstructionSubType.RAGE,
        type: InstructionTypes.SPECIAL,
    },
    {
        expression: expressionFromKeywords(Object.keys(HEAT_KEYWORDS)),
        keywords: HEAT_KEYWORDS,
        subType: InstructionSubType.HEAT,
        type: InstructionTypes.SPECIAL,
    },
    {
        expression: expressionFromKeywords(Object.keys(TORNADO_KEYWORDS)),
        keywords: TORNADO_KEYWORDS,
        subType: InstructionSubType.TORNADO,
        type: InstructionTypes.SPECIAL,
    },
    {
        expression: /^(\[)/g,
        subType: InstructionSubType.BRACKET_LEFT,
        type: InstructionTypes.CONTROL,
    },
    {
        expression: /^(])/g,
        subType: InstructionSubType.BRACKET_RIGHT,
        type: InstructionTypes.CONTROL,
    },
    {
        expression: /^\((.+)\)/gi,
        type: InstructionTypes.TEXT,
    },
    {
        expression: expressionFromMovementPairs([
            ['u', 'f'],
            ['u', 'b'],
            ['d', 'f'],
            ['d', 'b'],
        ]),
        type: InstructionTypes.MOVEMENT,
    },
    {
        expression: /^[ufdbn]/gi,
        type: InstructionTypes.MOVEMENT,
    },
    {
        expression: /^([1234])(([+])([1234]))+/gi,
        type: InstructionTypes.ATTACK,
    },
    {
        expression: /^([1234])/gi,
        type: InstructionTypes.ATTACK,
    },
    {
        expression: /^([:~<])/gi,
        type: InstructionTypes.COMBINATOR,
    },
    {
        expression: /^(_)/gi,
        type: InstructionTypes.ALTERNATIVE,
    },
    {
        expression: /^([+.,])/gi,
        type: InstructionTypes.HIDDEN,
    },
]

/**
 * Sanitizes the notation to be easier to search via RegExp.
 * @param notation
 */
const sanitize = (notation: string) => {
    return notation.replace(/,/g, '').trim()
}

/**
 * Tries to consume the specified token from the start of the notation.
 * On success, it will return the matching token as well as the remainder
 * of the notation after the match.
 * @param token
 * @param notation
 */
const consumeToken = (
    token: RegExp,
    notation: string,
): ConsumeTokenResult | null => {
    const matches = notation.match(token)
    if (matches === null) {
        return null
    }

    const value = matches.at(0)
    if (value === undefined) {
        return null
    }

    const index = notation.indexOf(value)
    const remainder = sanitize(notation.substring(index + value.length))

    return {
        index,
        remainder,
        value,
    }
}

/**
 * Iterates all possible instructions and returns the first matching one.
 * @param notation
 */
const matchInstruction = (notation: string): InstructionMatchResult => {
    const result: InstructionMatchResult = {
        instruction: null,
        remainder: notation,
    }

    for (const token of TOKENS) {
        const match = consumeToken(token.expression, notation)
        if (!match) {
            continue
        }

        // Try to find the visual representation of the keyword, such as "While Standing" for WS.
        const value =
            token.keywords && token.keywords[match.value]
                ? token.keywords[match.value]?.value
                : match.value

        result.remainder = match.remainder
        result.instruction = {
            $type: MetaTypes.INSTRUCTION,
            notation: match.value,
            subType: token.subType,
            type: token.type,
            value: value ?? '',
        }

        break
    }

    return result
}

/**
 * Parses the notation of a move to split it into separate instructions.
 * @param notation
 * @param result
 */
const parseInstructions = (
    notation: string,
    result: ParsedInstruction[] = [],
): ParsedInstruction[] => {
    if (notation.length === 0) {
        return result
    }

    const { instruction, remainder } = matchInstruction(notation)
    if (!instruction || remainder === notation) {
        return result
    }

    const instructions =
        instruction.type === InstructionTypes.HIDDEN
            ? result
            : result.concat(instruction)

    return parseInstructions(remainder, instructions)
}

/**
 * Parses a Tekken notation string and returns an array of parsed moves.
 *
 * @param {string} notation - The Tekken notation to parse.
 * @returns {ParsedMove[]} - An array of parsed moves.
 */
export const parseTekkenNotation = (notation: string): ParserResult => {
    const moveNotations: string[] = notation.split(MOVE_SEPARATOR)

    const moves = moveNotations.map((moveNotation: string) => {
        const instructions = parseInstructions(moveNotation)

        return {
            $type: MetaTypes.MOVE,
            instructions,
            notation: moveNotation,
        }
    })

    return {
        moves,
        notation,
    }
}
