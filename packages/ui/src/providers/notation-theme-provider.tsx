'use client'

import { createContext, useContext, useState } from 'react'

export enum NotationThemes {
    GAMEPAD = 'gamepad',
    ARCADE = 'arcade',
}

export type NotationTheme = {
    id?: NotationThemes
}

const useNotationThemeState = (initialState: NotationTheme) => {
    return useState<NotationTheme>(initialState)
}

export const NotationThemeContext = createContext<ReturnType<
    typeof useNotationThemeState
> | null>(null)

export function useNotationTheme() {
    const context = useContext(NotationThemeContext)

    if (!context) {
        throw new Error(
            'useNotationTheme must be used within a NotationThemeProvider',
        )
    }

    return context
}

export function NotationThemeProvider({
    children,
    theme,
}: {
    children: React.ReactNode
    theme: NotationTheme
}) {
    const notationTheme = useNotationThemeState(theme)

    return (
        <NotationThemeContext.Provider value={notationTheme}>
            {children}
        </NotationThemeContext.Provider>
    )
}
