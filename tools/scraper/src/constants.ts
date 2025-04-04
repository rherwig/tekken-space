import { fileURLToPath } from 'node:url'

export const ORIGINAL_FILES_PATH = fileURLToPath(
    new URL('./resources/0-original', import.meta.url),
)
export const OVERRIDDEN_FILES_PATH = fileURLToPath(
    new URL('./resources/1-overridden', import.meta.url),
)
export const LINKED_FILES_PATH = fileURLToPath(
    new URL('./resources/2-linked', import.meta.url),
)
export const HARMONIZED_FILES_PATH = fileURLToPath(
    new URL('./resources/3-harmonized', import.meta.url),
)
export const OVERRIDE_FILES_PATH = fileURLToPath(
    new URL('./resources/_overrides', import.meta.url),
)

export const COMBINATOR_FRAMES = '~'
export const COMBINATOR_DAMAGE = ','
export const COMBINATOR_HIT_LEVELS = ','
export const COMBINATOR_DAMAGE_INVALID = ';'
export const REGEX_TECH = /\(([+-]\d+)\)/
export const REGEX_FRAMES = /(?<frame>[+-i]\d+)(?<props>\w+)?/
export const REGEX_STATES = /(?<state>\w+)(?<frame>\d+)?/
export const REGEX_DAMAGE = /[^0-9;,]/g
