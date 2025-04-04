export enum WavuTables {
    Move = 'Move',
}

export enum WavuFields {
    Tables = 'tables',
    Fields = 'fields',
    Where = 'where',
    JoinOn = 'join_on',
    GroupBy = 'group_by',
    Having = 'having',
    OrderBy = 'order_by[0]',
    OrderByOptions = 'order_by_options[0]',
    Limit = 'limit',
    Offset = 'offset',
    Format = 'format',
}

export interface WavuMove {
    /**
     * Unique identifier for the move, typically character name + input notation
     */
    id: string

    /**
     * Reference to the parent move ID for combo moves, null for base moves
     */
    parent: string | null

    /**
     * Name of the move, can be null for some moves
     */
    name: string | null

    /**
     * Input command to execute the move (can be number or string)
     */
    input: number | string

    /**
     * Startup frames of the move, e.g. "i10" for 10 frames, can be null
     */
    startup: string | null

    /**
     * Hit level of the move (h = high, m = mid, etc.), can be null
     */
    hitLevels: string | null

    /**
     * Damage value of the move, can be number or string (for complex damage notations)
     */
    damage: number | string | null

    /**
     * Frame advantage when move is blocked, can be number or string
     */
    onBlock: number | string | null

    /**
     * Frame advantage when move hits, can be number or string
     */
    onHit: number | string | null

    /**
     * Frame advantage on counter hit, can be null if same as normal hit
     */
    onCounterHit: string | null

    /**
     * Special states the move can cause or properties it has, can be null
     */
    states: string | null

    /**
     * Index value for the move, can be null
     */
    index: number | null
}
