'use client'

import { createContext, useContext, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

export type Preferences = {
    theme: Theme
}

const usePreferencesState = (initialState: Preferences) =>
    useState<Preferences>(initialState)

export const PreferencesContext = createContext<ReturnType<
    typeof usePreferencesState
> | null>(null)

export function usePreferences() {
    const context = useContext(PreferencesContext)

    if (!context) {
        throw new Error(
            'usePreferences must be used within a PreferencesProvider',
        )
    }

    return context
}

export function PreferencesProvider({
    children,
    preferences: initialPreferences,
}: {
    children: React.ReactNode
    preferences: Preferences
}) {
    const preferences = usePreferencesState(initialPreferences)

    return (
        <PreferencesContext.Provider value={preferences}>
            {children}
        </PreferencesContext.Provider>
    )
}
