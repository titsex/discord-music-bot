import PlayCommand from '@command/music/play.command'

import { TextChannel } from 'discord.js'
import { ICommand } from '@types'

const PlayModule: ICommand = {
    data: PlayCommand,
    type: 'music',
    execute: async (interaction, client, member) => {
        const argument = interaction.options.getString('аргумент', true)

        await interaction.send('Добавляю в очередь...')

        return await client.distube.play(member!.voice.channel!, argument, {
            member,
            textChannel: interaction.channel as TextChannel,
        })
    },
}

export default PlayModule
