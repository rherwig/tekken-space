import { Client, Collection } from 'discord.js'

import { Command } from '@/types'
import moveCommand from './move'

export const commands: Command[] = [moveCommand]

export function registerCommands(client: Client) {
    const registeredCommands = new Collection<string, Command>()

    commands.forEach((command) => {
        registeredCommands.set(command.data.name, command)
    })

    client.commands = registeredCommands
}
