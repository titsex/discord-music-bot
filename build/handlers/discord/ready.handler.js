"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const _utils_1 = require("../../utils");
const Logger_1 = require("../../classes/Logger");
function readyHandler(commands) {
    return async (client) => {
        await (0, _utils_1.updateCommands)(commands);
        client.user?.setPresence({
            status: 'online',
            activities: [
                {
                    type: discord_js_1.ActivityType.Watching,
                    name: 'за всеми',
                },
            ],
        });
        Logger_1.Logger.info('Бот успешно запущен');
    };
}
exports.default = readyHandler;
