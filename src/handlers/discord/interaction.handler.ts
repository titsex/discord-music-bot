import selectHandler from '@handler/discord/select'
import buttonHandler from '@handler/discord/button'
import PlayCommand from '@command/music/play'

import { CustomClient, CustomInteraction, ICommand } from '@types'
import { extendInteraction, reGeneratePlayer } from '@utils'
import { Interaction } from 'discord.js'
import { messages } from '@index'

export default function interactionHandler(commands: ICommand[], client: CustomClient) {
    return async (interaction: Interaction): Promise<any> => {
        if (interaction.isButton()) return await buttonHandler(interaction, client)
        if (interaction.isStringSelectMenu()) return await selectHandler(interaction, client)
        if (!interaction.isChatInputCommand()) return

        const context = extendInteraction(interaction as CustomInteraction)
        const command = commands.find((item) => item.data.name === interaction.commandName)

        if (command) {
            let member

            if (command.type === 'music') {
                member = 'voice' in interaction.member! ? interaction.member : null

                if (!member || !member?.voice.channel)
                    return await context.send('Сначала подключитесь к голосовому каналу')

                const bot = client.distube.getQueue(context.guildId!)

                if (!bot && command.data.name !== PlayCommand.name)
                    return await context.send('Бот не состоит ни в одном из голосовых каналов')

                if (bot?.voice.channelId && bot.voice.channelId !== member.voice.channelId)
                    return await context.send('Бот в данный момент находится в другом голосовом канале')
            }

            await command.execute(context, client, member)

            if (command.type === 'music' && command.data.name !== PlayCommand.name) {
                const queue = client.distube.queues.get(interaction.guildId!)
                if (!queue) return

                if (!messages.get(queue.textChannel!.guildId)) return
                else await reGeneratePlayer(queue)
            }
        }
    }
}
