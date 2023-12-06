"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const pause_command_1 = tslib_1.__importDefault(require("../../commands/music/pause.command"));
const PauseModule = {
    data: pause_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId);
        if (queue?.paused)
            return await interaction.send('Песня уже стоит на паузе');
        client.distube.pause(interaction.guildId);
        return await interaction.send('Ставлю песню на паузу...');
    },
};
exports.default = PauseModule;
