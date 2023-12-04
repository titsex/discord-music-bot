"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const stop_module_1 = tslib_1.__importDefault(require("../../modules/music/stop.module"));
const _utils_1 = require("../../utils");
const _types_1 = require("../../types");
const speed_filter_1 = require("../../filters/speed.filter");
const isFilterCustomId = /toggle-(.+?)-filter/i;
const volumeRounder = (volume, type) => {
    if (type === _types_1.PLAYER_CUSTOM_IDS.VOLUME_DECREASE)
        return volume % 10 === 0 ? volume - 10 : volume - (volume % 10);
    return volume % 10 === 0 ? volume + 10 : volume + (10 - (volume % 10));
};
async function buttonHandler(interaction, client) {
    const customId = interaction.customId;
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue)
        return;
    if (customId === _types_1.PLAYER_CUSTOM_IDS.START_SONG_AGAIN)
        queue.seek(0);
    if (customId === _types_1.PLAYER_CUSTOM_IDS.PREVIOUS)
        await queue.previous();
    if (customId === _types_1.PLAYER_CUSTOM_IDS.TOGGLE_PLAY_MODE)
        queue.playing ? queue.pause() : queue.resume();
    if (customId === _types_1.PLAYER_CUSTOM_IDS.NEXT)
        await queue.skip();
    if (customId === _types_1.PLAYER_CUSTOM_IDS.TOGGLE_REPEAT_MODE)
        queue.setRepeatMode();
    if (customId === _types_1.PLAYER_CUSTOM_IDS.VOLUME_DECREASE)
        queue.setVolume(volumeRounder(queue.volume, _types_1.PLAYER_CUSTOM_IDS.VOLUME_DECREASE));
    if (customId === _types_1.PLAYER_CUSTOM_IDS.STOP)
        return stop_module_1.default.execute((0, _utils_1.extendInteraction)(interaction), client);
    if (customId === _types_1.PLAYER_CUSTOM_IDS.VOLUME_INCREASE)
        queue.setVolume(volumeRounder(queue.volume, _types_1.PLAYER_CUSTOM_IDS.VOLUME_INCREASE));
    if (customId === _types_1.PLAYER_CUSTOM_IDS.SPEED_UP || customId === _types_1.PLAYER_CUSTOM_IDS.SPEED_DOWN) {
        const speed = (0, _utils_1.getQueueSpeedFilterValue)(queue);
        const newSpeed = customId === _types_1.PLAYER_CUSTOM_IDS.SPEED_UP ? speed + 0.25 : speed - 0.25;
        if (newSpeed === 1)
            queue.filters.remove({ name: 'speed', value: (0, _utils_1.getQueueSpeedFilterValue)(queue).toString() });
        else
            queue.filters.add((0, speed_filter_1.genSpeedFilter)(newSpeed), true);
    }
    if (isFilterCustomId.test(customId)) {
        const [, filter] = customId.match(isFilterCustomId);
        if (queue.filters.has(filter))
            queue.filters.remove(filter);
        else
            queue.filters.add(filter);
    }
    await interaction.update((0, _utils_1.generatePlayer)(queue));
}
exports.default = buttonHandler;
