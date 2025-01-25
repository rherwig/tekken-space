import { fileURLToPath } from 'node:url'

export const BASE_URL = 'https://wavu.wiki/t'
export const MOVELIST_SUFFIX = '_movelist'
export const OUTPUT_PATH = fileURLToPath(new URL('../.output', import.meta.url))
export const COMBINATOR_FRAMES = '~'
export const COMBINATOR_DAMAGE = ','
export const COMBINATOR_HIT_LEVELS = ','
export const COMBINATOR_DAMAGE_INVALID = ';'
export const REGEX_TECH = /\(([+-]\d+)\)/
export const REGEX_FRAMES = /(?<frame>[+-i]\d+)(?<props>\w+)?/
export const REGEX_STATES = /(?<state>\w+)(?<frame>\d+)?/
export const REGEX_DAMAGE = /[^0-9;,]/g

export const selectors = {
    DAMAGE: '.movedata-damage-ctn',
    FRAMES_BLOCK: '.movedata-block',
    FRAMES_COUNTER: '.movedata-ch',
    FRAMES_HIT: '.movedata-hit',
    FRAMES_STARTUP: '.movedata-startup',
    HIT_LEVELS: '.movedata-threat .movedata-target-ctn',
    ID: '.movedata-id',
    INPUT: '.movedata-input-ctn',
    MOVE: '.movedata[id]',
    NAME: '.movedata-name',
    NOTES: '.movedata-notes',
    NOTES_SPECIAL: '.movedata-icon',
    STATES: '.movedata-crush',
}
