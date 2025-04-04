import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'
import { Command } from '@/types'
import { movesList } from '@/resources'
import { WavuMove } from '@tekken-space/types'

const NOTATION_SANITIZATION_REGEX = /(?<=[ufdb])\+/g

function isMatchingMove(query: string, move: WavuMove) {
    const notation = move.input.toString().toLowerCase()

    if (
        notation.startsWith(query) ||
        notation.replace(NOTATION_SANITIZATION_REGEX, '').startsWith(query)
    ) {
        return true
    }

    return !!move.name?.toLowerCase()?.startsWith(query)
}

function findMove(character: string, move: string) {
    const characterMoves = movesList.find(
        (item) => item.character === character,
    )

    if (!characterMoves) {
        return
    }

    return characterMoves.moves.find((item: WavuMove) =>
        isMatchingMove(move, item),
    )
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

        const moveName = moveInfo.name ? ` (${moveInfo.name})` : ''
        const moveHeader = `**${moveInfo.input}${moveName}**`
        const moveStartup = `Startup: ${moveInfo.startup ?? '?'}`
        const moveOnBlock = `On Block: ${moveInfo.onBlock ?? '?'}`
        const moveOnHit = `On Hit: ${moveInfo.onHit ?? '?'}`
        const moveOnCH = `On Counter Hit: ${moveInfo.onCH ?? '?'}`

        const moveOutput = [
            moveHeader,
            moveStartup,
            moveOnBlock,
            moveOnHit,
            moveOnCH,
        ].join('\n')

        await interaction.reply(moveOutput)
    },
} satisfies Command
