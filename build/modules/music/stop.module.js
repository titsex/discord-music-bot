"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const stop_command_1 = tslib_1.__importDefault(require("../../commands/music/stop.command"));
const _index_1 = require("../../index");
const StopModule = {
    data: stop_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        const savedMessageId = _index_1.messages.get(interaction.guildId);
        if (savedMessageId) {
            await interaction.channel.messages.delete(savedMessageId);
            _index_1.messages.delete(interaction.guildId);
        }
        await interaction.send('Спасибо за прослушивание');
        return await client.distube.stop(interaction.guildId);
    },
};
exports.default = StopModule;
