import 'dotenv/config'
import { Client, Events, Interaction } from 'discord.js'
import { registerCommands } from '@/commands/index'
import { Command } from '@/types'

const client = new Client({ intents: ['Guilds'] })

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Client is ready. Logged in as ${readyClient.user.tag}.`)
})

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) {
        return
    }

    const command = client.commands.get(interaction.commandName) as Command
    if (!command) {
        console.warn(`No command named ${interaction.commandName} was found.`)
        return
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                flags: 'Ephemeral',
            })
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                flags: 'Ephemeral',
            })
        }
    }
})

registerCommands(client)

client.login(process.env.DISCORD_TOKEN).catch(console.error.bind(console))
