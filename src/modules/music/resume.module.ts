import ResumeCommand from '@command/music/resume'

import { ICommand } from '@types'

const ResumeModule: ICommand = {
    data: ResumeCommand,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId!)

        if (queue?.playing) return await interaction.send('Песня не стоит на паузе')

        client.distube.resume(interaction.guildId!)

        return await interaction.send('Снимаю паузу с песни...')
    },
}

export default ResumeModule
