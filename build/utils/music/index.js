"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reGeneratePlayer = exports.generatePlayer = exports.getQueueSpeedFilterValue = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./playerFiilterMenu.utils"), exports);
tslib_1.__exportStar(require("./playerButtons.utils"), exports);
tslib_1.__exportStar(require("./playerEmbed.utils"), exports);
const discord_js_1 = require("discord.js");
const _utils_1 = require("..");
const _index_1 = require("../../index");
function getQueueSpeedFilterValue(queue) {
    const filter = queue.filters.values.find((filter) => filter.name === 'speed');
    if (!filter)
        return 1;
    return +filter.value.match(/sqrt\((.+?)\)/i)[1];
}
exports.getQueueSpeedFilterValue = getQueueSpeedFilterValue;
function generatePlayer(queue) {
    const embed = (0, _utils_1.generatePlayerEmbeds)(queue);
    const buttons = (0, _utils_1.generatePlayerButtons)(queue);
    const menu = (0, _utils_1.generatePlayerFilterMenu)(queue);
    return {
        embeds: [embed],
        components: [...buttons, menu],
    };
}
exports.generatePlayer = generatePlayer;
async function reGeneratePlayer(queue) {
    try {
        const channel = queue.textChannel;
        const player = generatePlayer(queue);
        const savedMessageId = _index_1.messages.get(channel.guildId);
        if (savedMessageId)
            return await channel.messages.edit(savedMessageId, player);
        const message = await channel.send(player);
        _index_1.messages.set(channel.guildId, message.id);
    }
    catch (error) {
        if (error instanceof discord_js_1.DiscordAPIError) {
            _index_1.messages.delete(queue.textChannel.guildId);
            if (error.code === 10008)
                await reGeneratePlayer(queue);
            if (error.code === 10003) {
                queue.textChannel = queue.voiceChannel;
                await reGeneratePlayer(queue);
            }
        }
    }
}
exports.reGeneratePlayer = reGeneratePlayer;
