import { StringSelectMenuInteraction } from 'discord.js'
import { CustomClient, PLAYER_CUSTOM_IDS } from '@types'
import { generatePlayer } from '@utils'

export default async function selectHandler(interaction: StringSelectMenuInteraction, client: CustomClient) {
    const customId = interaction.customId

    const queue = client.distube.getQueue(interaction.guildId!)
    if (!queue) return

    if (customId === PLAYER_CUSTOM_IDS.TOGGLE_FILTER) {
        const filter = interaction.values[0]

        if (queue.filters.has(filter)) queue.filters.remove(filter)
        else queue.filters.add(filter)
    }

    await interaction.update(generatePlayer(queue))
}
