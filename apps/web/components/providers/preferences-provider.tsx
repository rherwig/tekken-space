'use client'

import { createContext } from 'react'

export type Preferences = {
    theme: 'light' | 'dark'
}

export const PreferencesContext = createContext<Preferences>({
    theme: 'dark',
})

export function PreferencesProvider({
    children,
    preferences,
}: {
    children: React.ReactNode
    preferences: Preferences
}) {
    return (
        <PreferencesContext.Provider value={preferences}>
            {children}
        </PreferencesContext.Provider>
    )
}
