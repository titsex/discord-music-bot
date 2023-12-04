import { ActionRowBuilder, SelectMenuComponentOptionData, StringSelectMenuBuilder } from 'discord.js'
import { filterList } from '@command/music/filter.command'
import { PLAYER_CUSTOM_IDS } from '@types'
import { Queue } from 'distube'

export function generatePlayerFilterMenu(queue: Queue) {
    const filters = new ActionRowBuilder<StringSelectMenuBuilder>()

    const filterMenu = new StringSelectMenuBuilder({
        customId: PLAYER_CUSTOM_IDS.TOGGLE_FILTER,
        placeholder: 'Выберите фильтр',
    })

    for (const { name, value } of filterList) {
        const hasFilter = !!queue.filters.names.find((filter) => filter === value)

        const option: SelectMenuComponentOptionData = {
            label: name,
            value: value,
            description: hasFilter ? 'включен' : 'отключен',
        }

        if (hasFilter) option.emoji = { name: '✅' }

        filterMenu.addOptions(option)
    }

    return filters.addComponents(filterMenu)
}
