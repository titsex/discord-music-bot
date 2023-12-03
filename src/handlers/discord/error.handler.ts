import { Logger } from '@class/Logger'

export default async function discordErrorHandler(error: Error) {
    Logger.error(error)
}
