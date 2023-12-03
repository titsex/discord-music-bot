import StopCommand from '@command/music/stop'

import { ICommand } from '@types'
import { messages } from '@index'

const StopModule: ICommand = {
    data: StopCommand,
    type: 'music',
    execute: async (interaction, client) => {
        const savedMessageId = messages.get(interaction.guildId!)

        if (savedMessageId) {
            await interaction.channel!.messages.delete(savedMessageId)
            messages.delete(interaction.guildId!)
        }

        await interaction.send('Спасибо за прослушивание')
        return await client.distube.stop(interaction.guildId!)
    },
}

export default StopModule
