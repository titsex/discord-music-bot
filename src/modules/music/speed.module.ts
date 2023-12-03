import SpeedCommand from '@command/music/speed'

import { getQueueSpeedFilterValue } from '@utils'
import { genSpeedFilter } from '@filter/speed'
import { ICommand } from '@types'

const SpeedModule: ICommand = {
    data: SpeedCommand,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId!)!
        const speed = interaction.options.getNumber('скорость', true)

        if (speed === 1) queue.filters.remove({ name: 'speed', value: getQueueSpeedFilterValue(queue).toString() })
        else queue.filters.add(genSpeedFilter(speed), true)

        return await interaction.send(`Меняю скорость воспроизведения...`)
    },
}

export default SpeedModule
