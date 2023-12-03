import FilterCommand from '@command/music/filter'

import { ICommand } from '@types'

const FilterModule: ICommand = {
    data: FilterCommand,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId!)!
        const filter = interaction.options.getString('фильтр', true)

        if (queue.filters.has(filter)) queue.filters.remove(filter)
        else queue.filters.add(filter)

        return await interaction.send('Фильтры обновлены.')
    },
}

export default FilterModule
