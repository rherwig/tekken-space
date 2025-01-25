import { COMBINATOR_FRAMES, REGEX_FRAMES, REGEX_TECH } from '../constants'
import { ScrapedFrameData } from '@tekken-space/types'

const parseFrameDataPart = (_part: string) => {
    const match = _part.match(REGEX_FRAMES)
    if (!match?.groups) {
        return {}
    }

    return {
        properties: match.groups.props ? [match.groups.props] : [],
        value: match.groups.frame,
    }
}

export const parseFrameDataString = (_raw: string) => {
    const frames: ScrapedFrameData = {
        _raw,
        lower: '',
        properties: [],
    }

    const [, tech] = _raw.match(REGEX_TECH) ?? []
    if (tech) {
        frames.tech = tech
    }

    const [lower, upper] = _raw.replace(REGEX_TECH, '').split(COMBINATOR_FRAMES)

    if (lower) {
        const { properties, value } = parseFrameDataPart(lower)

        frames.lower = value ?? ''

        if (properties?.length) {
            frames.properties.push(...properties)
        }
    }

    if (upper) {
        const { properties, value } = parseFrameDataPart(upper)

        frames.upper = value ?? ''

        if (properties?.length) {
            frames.properties.push(...properties)
        }
    }

    return frames
}

export const scrapeFrameData = (
    $root: Element,
    selector: string,
): ScrapedFrameData => {
    const frameDataString = $root.querySelector(selector)?.textContent
    if (!frameDataString) {
        return {
            _raw: '',
            lower: '',
            properties: [],
        }
    }

    return parseFrameDataString(frameDataString)
}
