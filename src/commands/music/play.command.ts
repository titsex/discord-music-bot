import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('играть')
    .setDescription('проиграть музыку')
    .addStringOption((option) =>
        option.setName('аргумент').setDescription('название или ссылка на источник').setRequired(true)
    )
