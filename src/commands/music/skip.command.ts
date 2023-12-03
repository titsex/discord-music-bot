import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('пропустить')
    .setDescription('пропускает текущую песню и включает следующую из очереди')
