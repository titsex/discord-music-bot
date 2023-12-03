import AutoplayCommand from '@command/music/autoplay'

import { ICommand } from '@types'

const AutoplayModule: ICommand = {
    data: AutoplayCommand,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId!)

        if (!['youtube'].includes(queue!.songs.at(-1)!.source))
            return await interaction.send(
                'Данный режим доступен только если источник последней песни в очереди - YouTube'
            )

        client.distube.toggleAutoplay(interaction.guildId!)

        return await interaction.send(`Переключаю режим автопроигрывания...`)
    },
}

export default AutoplayModule
