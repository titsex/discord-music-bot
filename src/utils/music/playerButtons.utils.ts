import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'
import { getQueueSpeedFilterValue } from '@utils'
import { Queue, RepeatMode } from 'distube'
import { PLAYER_CUSTOM_IDS } from '@types'

export function generatePlayerButtons(queue: Queue) {
    const action = new ActionRowBuilder<ButtonBuilder>()
    const playerManagement = new ActionRowBuilder<ButtonBuilder>()

    const queueSpeedFilterValue = getQueueSpeedFilterValue(queue)

    const startSongAgainButton = generatePlayerStartSongAgainButton()
    const prevButton = generatePlayerPreviousButton(!queue.previousSongs.length)
    const togglePlayModeButton = generatePlayerTogglePlayModeButton(queue.playing)
    const nextButton = generatePlayerNextButton(!(queue.songs.length - 1))
    const toggleRepeatModeButton = generatePlayerToggleRepeatModeButton(queue.repeatMode)

    const speedDownButton = generatePlayerSpeedDownButton(queueSpeedFilterValue === 0.25)
    const decreaseVolumeButton = generatePlayerVolumeDecreaseButton(!queue.volume)
    const stopButton = generatePlayerStopButton()
    const increaseVolumeButton = generatePlayerVolumeIncreaseButton(queue.volume === 100)
    const speedUpButton = generatePlayerSpeedUpButton(queueSpeedFilterValue === 2)

    return [
        action.addComponents(
            startSongAgainButton,
            prevButton,
            togglePlayModeButton,
            nextButton,
            toggleRepeatModeButton
        ),
        playerManagement.addComponents(
            speedDownButton,
            decreaseVolumeButton,
            stopButton,
            increaseVolumeButton,
            speedUpButton
        ),
    ]
}

function generatePlayerPreviousButton(disabled: boolean) {
    return new ButtonBuilder({
        emoji: { name: '⏪' },
        disabled,
        style: ButtonStyle.Secondary,
        custom_id: PLAYER_CUSTOM_IDS.PREVIOUS,
    })
}

function generatePlayerNextButton(disabled: boolean) {
    return new ButtonBuilder({
        emoji: { name: '⏩' },
        disabled,
        style: ButtonStyle.Secondary,
        custom_id: PLAYER_CUSTOM_IDS.NEXT,
    })
}

function generatePlayerTogglePlayModeButton(playing: boolean) {
    return new ButtonBuilder({
        emoji: { name: playing ? '⏸' : '▶️' },
        style: ButtonStyle.Secondary,
        custom_id: PLAYER_CUSTOM_IDS.TOGGLE_PLAY_MODE,
    })
}

function generatePlayerToggleRepeatModeButton(mode: RepeatMode) {
    return new ButtonBuilder({
        emoji: { name: mode === RepeatMode.DISABLED || mode === RepeatMode.QUEUE ? '🔁' : '🔂' },
        style: mode === RepeatMode.DISABLED ? ButtonStyle.Secondary : ButtonStyle.Success,
        custom_id: PLAYER_CUSTOM_IDS.TOGGLE_REPEAT_MODE,
    })
}

function generatePlayerVolumeIncreaseButton(disabled: boolean) {
    return new ButtonBuilder({
        emoji: { name: '🔊' },
        style: ButtonStyle.Secondary,
        disabled,
        custom_id: PLAYER_CUSTOM_IDS.VOLUME_INCREASE,
    })
}

function generatePlayerVolumeDecreaseButton(disabled: boolean) {
    return new ButtonBuilder({
        emoji: { name: '🔈' },
        style: ButtonStyle.Secondary,
        disabled,
        custom_id: PLAYER_CUSTOM_IDS.VOLUME_DECREASE,
    })
}

function generatePlayerStopButton() {
    return new ButtonBuilder({
        emoji: { name: '⏹' },
        style: ButtonStyle.Danger,
        custom_id: PLAYER_CUSTOM_IDS.STOP,
    })
}

function generatePlayerStartSongAgainButton() {
    return new ButtonBuilder({
        emoji: { name: '🔄' },
        style: ButtonStyle.Secondary,
        custom_id: PLAYER_CUSTOM_IDS.START_SONG_AGAIN,
    })
}

function generatePlayerSpeedDownButton(disabled: boolean) {
    return new ButtonBuilder({
        emoji: { name: '⏬' },
        style: ButtonStyle.Secondary,
        disabled,
        custom_id: PLAYER_CUSTOM_IDS.SPEED_DOWN,
    })
}

function generatePlayerSpeedUpButton(disabled: boolean) {
    return new ButtonBuilder({
        emoji: { name: '⏫' },
        style: ButtonStyle.Secondary,
        disabled,
        custom_id: PLAYER_CUSTOM_IDS.SPEED_UP,
    })
}
