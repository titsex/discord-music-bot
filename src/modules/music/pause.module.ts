import PauseCommand from '@command/music/pause'

import { ICommand } from '@types'

const PauseModule: ICommand = {
    data: PauseCommand,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId!)

        if (queue?.paused) return await interaction.send('Песня уже стоит на паузе')

        client.distube.pause(interaction.guildId!)

        return await interaction.send('Ставлю песню на паузу...')
    },
}

export default PauseModule
