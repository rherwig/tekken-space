import 'dotenv/config'

import * as Discord from 'discord.js'
import { REST } from 'discord.js'

import { commands } from '@/commands/index'
import { Command } from '@/types'

async function register() {
    const { APP_ID, DISCORD_TOKEN } = process.env
    if (!DISCORD_TOKEN) {
        throw new Error(
            'You must provide a Discord token in the DISCORD_TOKEN environment variable.',
        )
    }

    if (!APP_ID) {
        throw new Error(
            'You must provide a Discord application ID in the APP_ID environment variable.',
        )
    }

    const rest = new REST().setToken(DISCORD_TOKEN)
    const commandsData = commands.map((command: Command) =>
        command.data.toJSON(),
    )

    const response = await rest.put(
        Discord.Routes.applicationCommands(APP_ID),
        {
            body: commandsData,
        },
    )

    console.log(`Successfully reloaded commands.`, response)
}

register().catch(console.error.bind(console))
