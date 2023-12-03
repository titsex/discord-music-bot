import { Client, ActivityType } from 'discord.js'
import { updateCommands } from '@utils'
import { Logger } from '@class/Logger'
import { ICommand } from '@types'

export default function readyHandler(commands: ICommand[]) {
    return async (client: Client) => {
        await updateCommands(commands)

        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    type: ActivityType.Watching,
                    name: 'за всеми',
                },
            ],
        })

        Logger.info('Бот успешно запущен')
    }
}
