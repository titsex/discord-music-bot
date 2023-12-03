import { reGeneratePlayer } from '@utils'
import { messages } from '@index'
import { Queue } from 'distube'

export default async function addQueueHandler(queue: Queue) {
    if (!messages.get(queue.textChannel!.guildId)) return
    else await reGeneratePlayer(queue)
}
