import {
    ChatInputCommandInteraction,
    Collection,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder,
} from 'discord.js'

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, unknown>
    }
}

export interface Command {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}
