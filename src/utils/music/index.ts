export * from './playerFiilterMenu.utils'
export * from './playerButtons.utils'
export * from './playerEmbed.utils'

import { DiscordAPIError, MessageCreateOptions, MessageEditOptions, MessagePayload, TextChannel } from 'discord.js'
import { generatePlayerButtons, generatePlayerEmbeds, generatePlayerFilterMenu } from '@utils'
import { messages } from '@index'
import { Queue } from 'distube'

export function getQueueSpeedFilterValue(queue: Queue) {
    const filter = queue.filters.values.find((filter) => filter.name === 'speed')

    if (!filter) return 1

    return +filter.value.match(/sqrt\((.+?)\)/i)![1]
}

export function generatePlayer(queue: Queue): string | MessagePayload | MessageEditOptions {
    const embed = generatePlayerEmbeds(queue)
    const buttons = generatePlayerButtons(queue)
    const menu = generatePlayerFilterMenu(queue)

    return {
        embeds: [embed],
        components: [...buttons, menu],
    }
}

export async function reGeneratePlayer(queue: Queue) {
    try {
        const channel = queue.textChannel as unknown as TextChannel
        const player = generatePlayer(queue)

        const savedMessageId = messages.get(channel.guildId)
        if (savedMessageId) return await channel.messages.edit(savedMessageId, player)

        const message = await channel.send(player as MessageCreateOptions)
        messages.set(channel.guildId, message.id)
    } catch (error) {
        if (error instanceof DiscordAPIError) {
            messages.delete(queue.textChannel!.guildId)

            if (error.code === 10008) await reGeneratePlayer(queue)

            if (error.code === 10003) {
                queue.textChannel = queue.voiceChannel as unknown as TextChannel
                await reGeneratePlayer(queue)
            }
        }
    }
}
