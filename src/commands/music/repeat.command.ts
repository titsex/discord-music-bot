import { SlashCommandBuilder } from 'discord.js'

export default new SlashCommandBuilder()
    .setName('повтор')
    .setDescription('переключает режим повтора')
    .addNumberOption((option) =>
        option
            .setName('режим')
            .setDescription('песня/очередь или вообще отключить режим повтора? выбирайте')
            .addChoices({ name: 'песня', value: 1 }, { name: 'очередь', value: 2 }, { name: 'отключит', value: 0 })
            .setRequired(true)
    )
