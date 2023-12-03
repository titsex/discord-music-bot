import { GuildTextBasedChannel } from 'discord.js'
import { Logger } from '@class/Logger'

export default async function distubeErrorHandler(channel: GuildTextBasedChannel | undefined, error: Error) {
    Logger.error(error)
}
