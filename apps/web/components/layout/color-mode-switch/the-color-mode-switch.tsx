'use client'

import { TsColorModeSwitch } from '@tekken-space/ui/components'
import {
    type Theme,
    usePreferences,
} from '@/components/providers/preferences-provider'

export function TheColorModeSwitch() {
    const [, setPreferences] = usePreferences()

    function handleThemeChange(theme: Theme) {
        setPreferences((prevState) => ({
            ...prevState,
            theme,
        }))
    }

    return <TsColorModeSwitch onChange={handleThemeChange} />
}
