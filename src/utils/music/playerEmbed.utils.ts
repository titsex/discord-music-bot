import { getQueueSpeedFilterValue } from '@utils'
import { formatDuration, Queue } from 'distube'
import { EmbedBuilder } from 'discord.js'

export function generatePlayerEmbeds(queue: Queue) {
    const song = queue.songs[0]
    const embed = new EmbedBuilder().setTitle(song.name!)

    const thumbnail = song.thumbnail || song.playlist?.thumbnail
    if (thumbnail) embed.setImage(thumbnail)

    if (song.user)
        embed.setAuthor({
            name: song.user.displayName,
            iconURL: song.user.avatarURL() || song.user.defaultAvatarURL,
            url: `https://discordapp.com/users/${song.user.id}`,
        })

    embed.addFields([
        {
            name: 'Длительность',
            value: formatDuration(song.duration),
            inline: true,
        },
        {
            name: 'Источник',
            value: song.source,
            inline: true,
        },
        {
            name: 'Песен в очереди',
            value: String(queue.songs.length - 1 || 'нет'), 
            inline: true,
        },
        {
            name: 'Режим повтора',
            value: ['отключен', 'песня', 'очередь'][queue.repeatMode],
            inline: true,
        },
        {
            name: 'Громкость',
            value: `${queue.volume}%`,
            inline: true,
        },
        {
            name: 'Скорость',
            value: `${getQueueSpeedFilterValue(queue)}x`,
            inline: true,
        },
    ])

    return embed.setColor('Random')
}
