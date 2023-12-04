import ShuffleCommand from '@command/music/shuffle.command'

import { ICommand } from '@types'

const ShuffleModule: ICommand = {
    data: ShuffleCommand,
    type: 'music',
    execute: async (interaction, client) => {
        await client.distube.shuffle(interaction.guildId!)
        return await interaction.send('Перемешиваю...')
    },
}

export default ShuffleModule
