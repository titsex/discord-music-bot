import { TextChannel } from 'discord.js'
import { messages } from '@index'
import { Queue } from 'distube'

export default async function emptyHandler(queue: Queue) {
    const channel = queue.textChannel as TextChannel

    const savedMessageId = messages.get(channel.guildId)
    if (savedMessageId) await channel.messages.delete(savedMessageId)

    messages.delete(channel.guildId)
}
