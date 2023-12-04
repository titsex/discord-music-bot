import StopModule from '@module/music/stop.module'

import { generatePlayer, getQueueSpeedFilterValue, extendInteraction } from '@utils'
import { CustomClient, CustomInteraction, PLAYER_CUSTOM_IDS } from '@types'
import { ButtonInteraction } from 'discord.js'
import { genSpeedFilter } from '@filter/speed.filter'

const isFilterCustomId = /toggle-(.+?)-filter/i

const volumeRounder = (volume: number, type: PLAYER_CUSTOM_IDS.VOLUME_DECREASE | PLAYER_CUSTOM_IDS.VOLUME_INCREASE) => {
    if (type === PLAYER_CUSTOM_IDS.VOLUME_DECREASE) return volume % 10 === 0 ? volume - 10 : volume - (volume % 10)
    return volume % 10 === 0 ? volume + 10 : volume + (10 - (volume % 10))
}

export default async function buttonHandler(interaction: ButtonInteraction, client: CustomClient) {
    const customId = interaction.customId

    const queue = client.distube.getQueue(interaction.guildId!)
    if (!queue) return

    if (customId === PLAYER_CUSTOM_IDS.START_SONG_AGAIN) queue.seek(0)
    if (customId === PLAYER_CUSTOM_IDS.PREVIOUS) await queue.previous()
    if (customId === PLAYER_CUSTOM_IDS.TOGGLE_PLAY_MODE) queue.playing ? queue.pause() : queue.resume()
    if (customId === PLAYER_CUSTOM_IDS.NEXT) await queue.skip()
    if (customId === PLAYER_CUSTOM_IDS.TOGGLE_REPEAT_MODE) queue.setRepeatMode()

    if (customId === PLAYER_CUSTOM_IDS.VOLUME_DECREASE)
        queue.setVolume(volumeRounder(queue.volume, PLAYER_CUSTOM_IDS.VOLUME_DECREASE))

    if (customId === PLAYER_CUSTOM_IDS.STOP)
        return StopModule.execute(extendInteraction(interaction as unknown as CustomInteraction), client)

    if (customId === PLAYER_CUSTOM_IDS.VOLUME_INCREASE)
        queue.setVolume(volumeRounder(queue.volume, PLAYER_CUSTOM_IDS.VOLUME_INCREASE))

    if (customId === PLAYER_CUSTOM_IDS.SPEED_UP || customId === PLAYER_CUSTOM_IDS.SPEED_DOWN) {
        const speed = getQueueSpeedFilterValue(queue)
        const newSpeed = customId === PLAYER_CUSTOM_IDS.SPEED_UP ? speed + 0.25 : speed - 0.25

        if (newSpeed === 1) queue.filters.remove({ name: 'speed', value: getQueueSpeedFilterValue(queue).toString() })
        else queue.filters.add(genSpeedFilter(newSpeed), true)
    }

    if (isFilterCustomId.test(customId)) {
        const [, filter] = customId.match(isFilterCustomId)!

        if (queue.filters.has(filter)) queue.filters.remove(filter)
        else queue.filters.add(filter)
    }

    await interaction.update(generatePlayer(queue))
}
