import VolumeCommand from '@command/music/volume'

import { ICommand } from '@types'

const VolumeModule: ICommand = {
    data: VolumeCommand,
    type: 'music',
    execute: async (interaction, client) => {
        const volume = interaction.options.getNumber('громкость', true)

        client.distube.setVolume(interaction.guildId!, volume)

        return await interaction.send(`Изменяю громкость...`)
    },
}

export default VolumeModule
