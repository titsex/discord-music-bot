"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("../../utils");
const _index_1 = require("../../index");
async function addQueueHandler(queue) {
    if (!_index_1.messages.get(queue.textChannel.guildId))
        return;
    else
        await (0, _utils_1.reGeneratePlayer)(queue);
}
exports.default = addQueueHandler;
