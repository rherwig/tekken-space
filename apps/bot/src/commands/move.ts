import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { Command } from '@/types'
import { movesList } from '@/resources'

function findMove(character: string, move: string) {
    const characterMoves = movesList.find(
        (item) => item.character === character,
    )

    if (!characterMoves) {
        return
    }

    return characterMoves.moves.find((item) => item.input.startsWith(move))
}

export default {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Get information about a move.')
        .addStringOption((option) =>
            option
                .setName('character')
                .setDescription('Character name.')
                .setRequired(true),
        )
        .addStringOption((option) =>
            option
                .setName('move')
                .setDescription('Move notation.')
                .setRequired(true),
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const character = interaction.options.getString('character', true)
        const move = interaction.options.getString('move', true)

        const moveInfo = findMove(character, move)
        if (!moveInfo) {
            await interaction.reply('Move not found.')
            return
        }

        await interaction.reply(
            `**${moveInfo.name}**\nStartup: ${moveInfo.startup}\nOn Block: ${moveInfo.onBlock}\nOn Hit: ${moveInfo.onHit}\nOn Counter Hit: ${moveInfo.onCH}\n`,
        )
    },
} satisfies Command
