'use client'

import { Gamepad2, Joystick } from 'lucide-react'
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@tekken-space/ui/base'

export function ControllerLayoutSwitch() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Gamepad2 className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Joystick className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => {}}>Gamepad</DropdownMenuItem>
                <DropdownMenuItem onClick={() => {}}>
                    Arcade Stick
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
