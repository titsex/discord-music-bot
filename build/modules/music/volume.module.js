"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const volume_command_1 = tslib_1.__importDefault(require("../../commands/music/volume.command"));
const VolumeModule = {
    data: volume_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        const volume = interaction.options.getNumber('громкость', true);
        client.distube.setVolume(interaction.guildId, volume);
        return await interaction.send(`Изменяю громкость...`);
    },
};
exports.default = VolumeModule;
