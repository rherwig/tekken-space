import { ScrapedNotes, ScrapedState } from '@tekken-space/types'

import {
    COMBINATOR_DAMAGE,
    COMBINATOR_DAMAGE_INVALID,
    COMBINATOR_HIT_LEVELS,
    REGEX_DAMAGE,
    REGEX_STATES,
    selectors,
} from '../constants'

export const stripSpaces = (_raw: string) => {
    return _raw.replace(/[\s\u200B]/g, '')
}

export const scrapeNotes = ($root: Element): ScrapedNotes => {
    const result: ScrapedNotes = {
        notes: [],
        specials: [],
    }

    const $notesRoot = $root.querySelector(selectors.NOTES)
    if (!$notesRoot) {
        return result
    }

    const $specials = $notesRoot.querySelectorAll(selectors.NOTES_SPECIAL)
    $specials.forEach(($special) => {
        const special = $special.textContent?.trim()
        if (!special) {
            return
        }

        result.specials.push(special)
    })

    const $notes = $notesRoot.querySelectorAll('li')
    $notes.forEach(($note) => {
        if ($note.classList.length > 0) {
            return
        }

        const note = $note.textContent?.trim()
        if (!note) {
            return
        }

        result.notes.push(note)
    })

    return result
}

export const scrapeDamage = ($root: Element): number[] => {
    const raw = $root.querySelector(selectors.DAMAGE)?.textContent
    if (!raw) {
        return []
    }

    const normalized = raw
        .replace(REGEX_DAMAGE, '')
        .replace(COMBINATOR_DAMAGE_INVALID, COMBINATOR_DAMAGE)

    return normalized.split(',').map((damage) => {
        return parseInt(stripSpaces(damage), 10)
    })
}

export const scrapeHitLevels = ($root: Element) => {
    const raw = $root.querySelector(selectors.HIT_LEVELS)?.textContent
    if (!raw) {
        return []
    }

    return raw.split(COMBINATOR_HIT_LEVELS).map(stripSpaces)
}

export const scrapeState = ($root: Element): ScrapedState => {
    const result: ScrapedState = {
        _raw: '',
    }

    const raw = $root.querySelector(selectors.STATES)?.textContent
    if (!raw) {
        return result
    }

    const match = stripSpaces(raw).match(REGEX_STATES)
    if (match?.groups) {
        // result._raw = raw
        // result.key = match.groups.state
        // result.frame = match.groups.frame
    }

    return result
}

export const scrapeName = ($root: Element): string | undefined => {
    return $root.querySelector(selectors.NAME)?.textContent ?? undefined
}

export const scrapeNotation = ($root: Element): string => {
    const notation = $root.querySelector(selectors.INPUT)?.textContent ?? ''

    return stripSpaces(notation)
}
