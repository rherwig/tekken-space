import {
    type ConsumeTokenResult,
    type InstructionMatchResult,
    InstructionSubType,
    type InstructionToken,
    InstructionTypes,
    MetaTypes,
    type ParsedInstruction,
    type ParserResult,
} from './types';

/**
 * Creates a regular expression that matches a list of keywords.
 * @param keywords
 * @param flags
 */
const expressionFromKeywords = (keywords: string[], flags = 'gi') =>
    new RegExp(`^(${keywords.join('|')})`, flags);

/**
 * Separator character for moves in a combo.
 */
const MOVE_SEPARATOR = ';';

/**
 * List of special keywords, like WS, WR, etc.
 */
const SPECIAL_KEYWORDS: string[] = [
    'WS',
    'WR',
    'iWS',
    'iWR',
    'FC',
    'iFC',
    'CH',
    'CD',
    'BT',
    'SSL',
    'SWL',
    'SSR',
    'SWR',
    'DASH',
    'BACKDASH',
    'WAVEDASH',
];

/**
 * List of all stances.
 */
const STANCE_KEYWORDS: string[] = ['LIB', 'JGS'];

/**
 * List of Rage keywords.
 */
const RAGE_KEYWORDS: string[] = ['RAGE', 'IN RAGE', 'DURING RAGE', 'R!'];

/**
 * List of Heat keywords.
 */
const HEAT_KEYWORDS: string[] = ['HEAT', 'IN HEAT', 'DURING HEAT', 'H!'];

/**
 * List of Tornado keywords.
 */
const TORNADO_KEYWORDS: string[] = ['TORNADO', 'T!'];

/**
 * Tokens used for parsing instructions.
 * The order is relevant, since it implies the token precedence.
 */
const TOKENS: InstructionToken[] = [
    {
        type: InstructionTypes.SPECIAL,
        subType: InstructionSubType.NONE,
        expression: expressionFromKeywords(SPECIAL_KEYWORDS),
    },
    {
        type: InstructionTypes.SPECIAL,
        subType: InstructionSubType.STANCE,
        expression: expressionFromKeywords(STANCE_KEYWORDS),
    },
    {
        type: InstructionTypes.SPECIAL,
        subType: InstructionSubType.RAGE,
        expression: expressionFromKeywords(RAGE_KEYWORDS),
    },
    {
        type: InstructionTypes.SPECIAL,
        subType: InstructionSubType.HEAT,
        expression: expressionFromKeywords(HEAT_KEYWORDS),
    },
    {
        type: InstructionTypes.SPECIAL,
        subType: InstructionSubType.TORNADO,
        expression: expressionFromKeywords(TORNADO_KEYWORDS),
    },
    {
        type: InstructionTypes.MOVEMENT,
        expression: /^([ufdbn])([/:~])([ufdbn])/gi,
    },
    {
        type: InstructionTypes.MOVEMENT,
        expression: /^[ufdbn]/gi,
    },
    {
        type: InstructionTypes.ATTACK,
        expression: /^([1234])([+])([1234])/gi,
    },
    {
        type: InstructionTypes.ATTACK,
        expression: /^([1234])/gi,
    },
    {
        type: InstructionTypes.COMBINATOR,
        expression: /^([:~<])/gi,
    },
    {
        type: InstructionTypes.ALTERNATIVE,
        expression: /^(_)/gi,
    },
    {
        type: InstructionTypes.HIDDEN,
        expression: /^([+])/gi,
    },
];

/**
 * Sanitizes the notation to be easier to search via RegExp.
 * @param notation
 */
const sanitize = (notation: string) => {
    return notation.replace(/,/g, '').trim();
};

/**
 * Tries to consume the specified token from the start of the notation.
 * On success, it will return the matching token as well as the remainder
 * of the notation after the match.
 * @param token
 * @param notation
 */
const consumeToken = (token: RegExp, notation: string): ConsumeTokenResult | null => {
    const matches = notation.match(token);
    if (matches === null) {
        return null;
    }

    const value = matches.at(0);
    if (value === undefined) {
        return null;
    }

    const index = notation.indexOf(value);
    const remainder = sanitize(notation.substring(index + value.length));

    return {
        index,
        value,
        remainder,
    };
};

/**
 * Iterates all possible instructions and returns the first matching one.
 * @param notation
 */
const matchInstruction = (notation: string): InstructionMatchResult => {
    const result: InstructionMatchResult = {
        remainder: notation,
        instruction: null,
    };

    for (const token of TOKENS) {
        const match = consumeToken(token.expression, notation);
        if (!match) {
            continue;
        }

        result.remainder = match.remainder;
        result.instruction = {
            $type: MetaTypes.INSTRUCTION,
            type: token.type,
            subType: token.subType,
            notation: match.value,
            value: match.value,
        };

        break;
    }

    return result;
};

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
        return result;
    }

    const { instruction, remainder } = matchInstruction(notation);
    if (!instruction || remainder === notation) {
        return result;
    }

    const instructions =
        instruction.type === InstructionTypes.HIDDEN ? result : result.concat(instruction);

    return parseInstructions(remainder, instructions);
};

/**
 * Parses a Tekken notation string and returns an array of parsed moves.
 *
 * @param {string} notation - The Tekken notation to parse.
 * @returns {ParsedMove[]} - An array of parsed moves.
 */
export const parseTekkenNotation = (notation: string): ParserResult => {
    const moveNotations: string[] = notation.split(MOVE_SEPARATOR);

    const moves = moveNotations.map((moveNotation: string) => {
        const instructions = parseInstructions(sanitize(moveNotation));

        return {
            $type: MetaTypes.MOVE,
            notation: moveNotation,
            instructions,
        };
    });

    return {
        notation,
        moves,
    };
};
