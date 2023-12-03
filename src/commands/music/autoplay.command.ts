import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('автовоспроизведение')
    .setDescription('автоматически добавляет в конец очереди песни, схожие с последней играющей')
