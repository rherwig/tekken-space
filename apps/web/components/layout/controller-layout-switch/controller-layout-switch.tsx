'use client'

import { Gamepad2, Joystick } from 'lucide-react'
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@tekken-space/ui/base'
import { NotationThemes, useNotationTheme } from '@tekken-space/ui/providers'

export function ControllerLayoutSwitch() {
    const [theme, setTheme] = useNotationTheme()

    function handleThemeChange(id: NotationThemes) {
        setTheme((prevState) => ({
            ...prevState,
            id,
        }))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    {theme.id === NotationThemes.GAMEPAD ? (
                        <Gamepad2 className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    ) : (
                        <Joystick className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => handleThemeChange(NotationThemes.GAMEPAD)}
                >
                    Gamepad
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleThemeChange(NotationThemes.ARCADE)}
                >
                    Arcade Stick
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
