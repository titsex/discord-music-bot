"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePlayerButtons = void 0;
const discord_js_1 = require("discord.js");
const _utils_1 = require("..");
const distube_1 = require("distube");
const _types_1 = require("../../types");
function generatePlayerButtons(queue) {
    const action = new discord_js_1.ActionRowBuilder();
    const playerManagement = new discord_js_1.ActionRowBuilder();
    const queueSpeedFilterValue = (0, _utils_1.getQueueSpeedFilterValue)(queue);
    const startSongAgainButton = generatePlayerStartSongAgainButton();
    const prevButton = generatePlayerPreviousButton(!queue.previousSongs.length);
    const togglePlayModeButton = generatePlayerTogglePlayModeButton(queue.playing);
    const nextButton = generatePlayerNextButton(!(queue.songs.length - 1));
    const toggleRepeatModeButton = generatePlayerToggleRepeatModeButton(queue.repeatMode);
    const speedDownButton = generatePlayerSpeedDownButton(queueSpeedFilterValue === 0.25);
    const decreaseVolumeButton = generatePlayerVolumeDecreaseButton(!queue.volume);
    const stopButton = generatePlayerStopButton();
    const increaseVolumeButton = generatePlayerVolumeIncreaseButton(queue.volume === 100);
    const speedUpButton = generatePlayerSpeedUpButton(queueSpeedFilterValue === 2);
    return [
        action.addComponents(startSongAgainButton, prevButton, togglePlayModeButton, nextButton, toggleRepeatModeButton),
        playerManagement.addComponents(speedDownButton, decreaseVolumeButton, stopButton, increaseVolumeButton, speedUpButton),
    ];
}
exports.generatePlayerButtons = generatePlayerButtons;
function generatePlayerPreviousButton(disabled) {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: '⏪' },
        disabled,
        style: discord_js_1.ButtonStyle.Secondary,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.PREVIOUS,
    });
}
function generatePlayerNextButton(disabled) {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: '⏩' },
        disabled,
        style: discord_js_1.ButtonStyle.Secondary,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.NEXT,
    });
}
function generatePlayerTogglePlayModeButton(playing) {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: playing ? '⏸' : '▶️' },
        style: discord_js_1.ButtonStyle.Secondary,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.TOGGLE_PLAY_MODE,
    });
}
function generatePlayerToggleRepeatModeButton(mode) {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: mode === distube_1.RepeatMode.DISABLED || mode === distube_1.RepeatMode.QUEUE ? '🔁' : '🔂' },
        style: mode === distube_1.RepeatMode.DISABLED ? discord_js_1.ButtonStyle.Secondary : discord_js_1.ButtonStyle.Success,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.TOGGLE_REPEAT_MODE,
    });
}
function generatePlayerVolumeIncreaseButton(disabled) {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: '🔊' },
        style: discord_js_1.ButtonStyle.Secondary,
        disabled,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.VOLUME_INCREASE,
    });
}
function generatePlayerVolumeDecreaseButton(disabled) {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: '🔈' },
        style: discord_js_1.ButtonStyle.Secondary,
        disabled,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.VOLUME_DECREASE,
    });
}
function generatePlayerStopButton() {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: '⏹' },
        style: discord_js_1.ButtonStyle.Danger,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.STOP,
    });
}
function generatePlayerStartSongAgainButton() {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: '🔄' },
        style: discord_js_1.ButtonStyle.Secondary,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.START_SONG_AGAIN,
    });
}
function generatePlayerSpeedDownButton(disabled) {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: '⏬' },
        style: discord_js_1.ButtonStyle.Secondary,
        disabled,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.SPEED_DOWN,
    });
}
function generatePlayerSpeedUpButton(disabled) {
    return new discord_js_1.ButtonBuilder({
        emoji: { name: '⏫' },
        style: discord_js_1.ButtonStyle.Secondary,
        disabled,
        custom_id: _types_1.PLAYER_CUSTOM_IDS.SPEED_UP,
    });
}
