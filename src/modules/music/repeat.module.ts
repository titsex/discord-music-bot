import RepeatCommand from '@command/music/repeat'

import { ICommand } from '@types'

const RepeatModule: ICommand = {
    data: RepeatCommand,
    type: 'music',
    execute: async (interaction, client) => {
        const mode = interaction.options.getNumber('режим', true)

        client.distube.setRepeatMode(interaction.guildId!, mode)

        return await interaction.send(`Переключаю режим повтора...`)
    },
}

export default RepeatModule
