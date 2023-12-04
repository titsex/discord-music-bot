import SkipCommand from '@command/music/skip.command'

import { ICommand } from '@types'

const SkipModule: ICommand = {
    data: SkipCommand,
    type: 'music',
    execute: async (interaction, client) => {
        try {
            await client.distube.skip(interaction.guildId!)
            return await interaction.send('Пропускаю...')
        } catch (error) {
            await interaction.send('Данная песня последняя в очереди')
        }
    },
}

export default SkipModule
