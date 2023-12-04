"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const autoplay_command_1 = tslib_1.__importDefault(require("../../commands/music/autoplay.command"));
const AutoplayModule = {
    data: autoplay_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId);
        if (!['youtube'].includes(queue.songs.at(-1).source))
            return await interaction.send('Данный режим доступен только если источник последней песни в очереди - YouTube');
        client.distube.toggleAutoplay(interaction.guildId);
        return await interaction.send(`Переключаю режим автопроигрывания...`);
    },
};
exports.default = AutoplayModule;
