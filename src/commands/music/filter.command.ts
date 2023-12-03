import { SlashCommandBuilder } from 'discord.js'
import { defaultFilters, Filter } from 'distube'

export const filterList: Filter[] = Object.keys(defaultFilters).map((item) => ({ name: item, value: item }))

export default new SlashCommandBuilder()
    .setName('фильтр')
    .setDescription('добавляет/удаляет филтры к песням')
    .addStringOption((option) =>
        option
            .setName('фильтр')
            .setDescription('выберите фильтр который нужно наложить/снять')
            .addChoices(...filterList)
            .setRequired(true)
    )
