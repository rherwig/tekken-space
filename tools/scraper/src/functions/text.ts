import { ScrapedState } from '@tekken-space/types'

import {
    COMBINATOR_DAMAGE,
    COMBINATOR_DAMAGE_INVALID,
    COMBINATOR_HIT_LEVELS,
    REGEX_DAMAGE,
} from '../constants'

export const stripSpaces = (_raw: string) => {
    return _raw.replace(/[\s\u200B]/g, '')
}

export const harmonizeIndex = (maybeIndex: unknown): number | undefined => {
    if (!maybeIndex) {
        return undefined
    }

    return parseInt(maybeIndex.toString() ?? '', 10)
}

export const harmonizeName = (maybeName: unknown): string | undefined => {
    return maybeName?.toString()
}

export const harmonizeNotation = (maybeNotation: unknown): string => {
    return stripSpaces(maybeNotation?.toString() ?? '')
}

export const harmonizeHitLevels = (maybeHitLevels: unknown) => {
    if (!maybeHitLevels) {
        return []
    }

    return maybeHitLevels
        .toString()
        .split(COMBINATOR_HIT_LEVELS)
        .map(stripSpaces)
}

export const harmonizeDamage = (maybeDamage: unknown): number[] => {
    if (!maybeDamage) {
        return []
    }

    const normalized = maybeDamage
        .toString()
        .replace(REGEX_DAMAGE, '')
        .replace(COMBINATOR_DAMAGE_INVALID, COMBINATOR_DAMAGE)

    return normalized.split(',').map((damage) => {
        return parseInt(stripSpaces(damage), 10)
    })
}

export const harmonizeState = (): ScrapedState => {
    return {
        _raw: '',
    }
}
