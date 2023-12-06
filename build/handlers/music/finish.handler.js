"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _index_1 = require("../../index");
async function finishHandler(queue) {
    const channel = queue.textChannel;
    const savedMessageId = _index_1.messages.get(channel.guildId);
    if (savedMessageId)
        await channel.messages.delete(savedMessageId);
    _index_1.messages.delete(channel.guildId);
}
exports.default = finishHandler;
