import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('громкость')
    .setDescription('изменяет громкость проигрывания песен')
    .addNumberOption((option) =>
        option
            .setName('громкость')
            .setDescription('значение в процентах')
            .setMinValue(0)
            .setMaxValue(100)
            .setRequired(true)
    )
